const SHEET_NAME = "Leads";

const HEADERS = [
  "submitted_at",
  "name",
  "email",
  "organisation",
  "profile",
  "consent",
  "updates",
  "lang",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "landing_url",
  "referrer",
  "report_email",
];

const TRACKING = [
  "lang",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "landing_url",
  "referrer",
];

const FORMS = {
  rsvp: {
    sheet: "RSVP",
    required: ["name", "email", "institution"],
    headers: ["submitted_at", "name", "email", "institution", "consent", "updates"].concat(TRACKING, ["phone"]),
  },
  interest: {
    sheet: "Event interest",
    required: ["name", "email"],
    headers: ["submitted_at", "name", "email", "consent", "updates"].concat(TRACKING, ["phone"]),
  },
};

// Logos shown on the launch event pages (Sponsors) and on the report landing (Supporters).
// They live in their own Sheet, so whoever
// updates them never sees the leads, and the logos in a Drive folder. Script properties:
//   SPONSORS_SHEET_ID   id of the sponsors Sheet (from its URL, between /d/ and /edit)
//   SPONSORS_FOLDER_ID  id of the logos folder (from its URL, after /folders/)
// Tab "Sponsors", header row: order | name | logo | website | event | report
//   logo     the file name in the folder (e.g. H&A.png) or the file's Drive link
//   event    tick the checkbox (or write yes / sim / x) to show it on the event pages
//   report   tick it to show it on the report landing
const SPONSORS = {
  sheet: "Sponsors",
  maxBytes: 500 * 1024,
  yes: ["true", "yes", "sim", "x", "1"],
  types: ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"],
};

const EMAIL = {
  en: {
    subject: "Your copy of Brazilian Talent in Ireland · BRIA Report 2026",
    greeting: "Hi",
    intro:
      "Thank you for your interest in BRIA's research. Here is your copy of Brazilian Talent in Ireland, the BRIA Report 2026.",
    button: "Download the report",
    unsubscribe:
      "You are receiving this email because you requested the report on brazilirelandassociation.org. To stop hearing from us, reply to this email with the word unsubscribe.",
    signature: "Brazil Ireland Association (BRIA)",
  },
  pt: {
    subject: "Seu exemplar de Brazilian Talent in Ireland · Relatório BRIA 2026",
    greeting: "Olá",
    intro:
      "Obrigado pelo interesse nas pesquisas da BRIA. Aqui está o seu exemplar de Brazilian Talent in Ireland, o Relatório BRIA 2026 (em inglês).",
    button: "Baixar o relatório",
    unsubscribe:
      "Você recebeu este e-mail porque pediu o relatório em brazilirelandassociation.org. Para não receber mais mensagens, responda a este e-mail com a palavra cancelar.",
    signature: "Brazil Ireland Association (BRIA)",
  },
};

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  let body;

  try {
    body = JSON.parse(e.postData.contents);
  } catch (error) {
    return json_({ ok: false, error: "BAD_JSON" });
  }

  const secret = props.getProperty("SHARED_SECRET");
  if (!secret || !body || body.secret !== secret) {
    return json_({ ok: false, error: "UNAUTHORIZED" });
  }

  if (body.action === "sponsors") {
    return json_(listSponsors_(props));
  }

  const lead = body.lead || {};
  if (FORMS[body.form]) {
    return saveForm_(FORMS[body.form], lead);
  }
  if (!lead.name || !lead.email || lead.consent !== true) {
    return json_({ ok: false, error: "VALIDATION_ERROR" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let rowIndex;
  try {
    const sheet = getSheet_();
    const row = HEADERS.map((key) => {
      if (key === "submitted_at") return new Date();
      if (key === "report_email") return "pending";
      if (key === "consent" || key === "updates") return lead[key] === true;
      return clean_(lead[key]);
    });
    sheet.appendRow(row);
    rowIndex = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  const status = sendReport_(lead, props);
  getSheet_()
    .getRange(rowIndex, HEADERS.indexOf("report_email") + 1)
    .setValue(status);

  return json_({ ok: true });
}

function saveForm_(form, lead) {
  const missing = form.required.some((key) => !lead[key]);
  if (missing || lead.consent !== true) {
    return json_({ ok: false, error: "VALIDATION_ERROR" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSheet_(form.sheet, form.headers);
    sheet.appendRow(
      form.headers.map((key) => {
        if (key === "submitted_at") return new Date();
        if (key === "consent" || key === "updates") return lead[key] === true;
        return clean_(lead[key]);
      }),
    );
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: "bria-report-leads" });
}

function listSponsors_(props) {
  const sheetId = props.getProperty("SPONSORS_SHEET_ID");
  const folderId = props.getProperty("SPONSORS_FOLDER_ID");
  if (!sheetId || !folderId) return { ok: false, error: "NOT_CONFIGURED" };

  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(SPONSORS.sheet);
  if (!sheet || sheet.getLastRow() < 2) return { ok: true, sponsors: [], skipped: [] };

  const rows = sheet.getDataRange().getValues();
  const head = rows.shift().map((h) => String(h).trim().toLowerCase());
  const cell = (row, key) => (head.indexOf(key) < 0 ? "" : row[head.indexOf(key)]);

  const files = {};
  const it = DriveApp.getFolderById(folderId).getFiles();
  while (it.hasNext()) {
    const file = it.next();
    files[file.getName().trim().toLowerCase()] = file;
  }

  const skipped = [];
  const sponsors = rows
    .map((row, i) => ({
      line: i + 2,
      order: Number(cell(row, "order")) || 999,
      name: String(cell(row, "name")).trim().slice(0, 120),
      logo: String(cell(row, "logo")).trim(),
      website: website_(cell(row, "website")),
      event: yes_(cell(row, "event")),
      report: yes_(cell(row, "report")),
    }))
    .filter((s) => (s.event || s.report) && s.name)
    .sort((a, b) => a.order - b.order || a.line - b.line)
    .map((s) => {
      const file = logoFile_(s.logo, files);
      const blob = file && file.getBlob();
      const type = blob && blob.getContentType();
      if (!blob || SPONSORS.types.indexOf(type) < 0 || blob.getBytes().length > SPONSORS.maxBytes) {
        skipped.push(`line ${s.line}: ${s.name} (logo "${s.logo}" missing, not an image or over 500 KB)`);
        return null;
      }
      return {
        name: s.name,
        url: s.website,
        logo: `data:${type};base64,${Utilities.base64Encode(blob.getBytes())}`,
        event: s.event,
        report: s.report,
      };
    })
    .filter(Boolean);

  return { ok: true, sponsors: sponsors, skipped: skipped };
}

function yes_(value) {
  return SPONSORS.yes.indexOf(String(value).trim().toLowerCase()) >= 0;
}

function logoFile_(logo, files) {
  if (!logo) return null;
  const id = logo.match(/[-\w]{25,}/);
  if (/^https?:\/\//i.test(logo) && id) {
    try {
      return DriveApp.getFileById(id[0]);
    } catch (error) {
      return null;
    }
  }
  return files[logo.toLowerCase()] || null;
}

function website_(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const url = /^https?:\/\//i.test(text) ? text : "https://" + text;
  return /^https?:\/\/[^\s/]+\.[^\s]+$/i.test(url) ? url.slice(0, 500) : "";
}

function sendReport_(lead, props) {
  const lang = lead.lang === "pt" ? "pt" : "en";
  const url =
    (lang === "pt" && props.getProperty("REPORT_URL_PT")) ||
    props.getProperty("REPORT_URL_EN");

  if (!url) return "not_sent: no report url";
  if (MailApp.getRemainingDailyQuota() < 1) return "not_sent: daily quota";

  const t = EMAIL[lang];
  const firstName = String(lead.name).trim().split(/\s+/)[0];
  const htmlBody =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:560px">' +
    "<p>" + t.greeting + " " + escape_(firstName) + ",</p>" +
    "<p>" + t.intro + "</p>" +
    '<p style="margin:28px 0"><a href="' + escape_(url) + '" style="background:#ffbb40;color:#084727;font-weight:bold;text-decoration:none;padding:14px 26px;border-radius:999px;display:inline-block">' + t.button + "</a></p>" +
    "<p>" + t.signature + "</p>" +
    '<p style="font-size:12px;color:#6b6e6e;margin-top:32px">' + t.unsubscribe + "</p>" +
    "</div>";
  const plainBody =
    t.greeting + " " + firstName + ",\n\n" + t.intro + "\n\n" + t.button + ": " + url +
    "\n\n" + t.signature + "\n\n" + t.unsubscribe;

  const options = { name: "BRIA", htmlBody: htmlBody };
  const replyTo = props.getProperty("REPLY_TO");
  if (replyTo) options.replyTo = replyTo;

  try {
    MailApp.sendEmail(String(lead.email).trim(), t.subject, plainBody, options);
    return "sent";
  } catch (error) {
    return "failed: " + String(error.message || error).slice(0, 200);
  }
}

function getSheet_(name, headers) {
  name = name || SHEET_NAME;
  headers = headers || HEADERS;
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  } else {
    // A column added at the end of the headers (e.g. "phone") gets its header cell in old tabs.
    const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    headers.forEach((header, i) => {
      if (!current[i]) sheet.getRange(1, i + 1).setValue(header).setFontWeight("bold");
    });
  }
  return sheet;
}

function clean_(value) {
  if (value === undefined || value === null) return "";
  const text = String(value).trim().slice(0, 2000);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function escape_(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function testDoPost() {
  const props = PropertiesService.getScriptProperties();
  const secret = props.getProperty("SHARED_SECRET");
  const result = doPost({
    postData: {
      contents: JSON.stringify({
        secret: secret,
        lead: {
          name: "Test Lead",
          email: props.getProperty("TEST_EMAIL"),
          organisation: "BRIA",
          profile: "Other",
          consent: true,
          updates: false,
          lang: "en",
          utm_source: "test",
        },
      }),
    },
  });
  Logger.log(result.getContent());
}

function testEventForms() {
  const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
  const lead = {
    name: "Test Lead",
    email: "test@example.com",
    institution: "BRIA",
    phone: "+353 87 123 4567",
    consent: true,
    updates: false,
    lang: "en",
    utm_source: "test",
  };
  ["rsvp", "interest"].forEach((form) => {
    const result = doPost({
      postData: { contents: JSON.stringify({ secret: secret, form: form, lead: lead }) },
    });
    Logger.log(form + ": " + result.getContent());
  });
}

// Run once after setting SPONSORS_SHEET_ID and SPONSORS_FOLDER_ID: it asks for the
// new permissions (read Sheets and Drive) and logs what each page will show.
function testSponsors() {
  const result = listSponsors_(PropertiesService.getScriptProperties());
  if (!result.ok) throw new Error(result.error);
  const names = (key) => result.sponsors.filter((s) => s[key]).map((s) => s.name).join(", ") || "none";
  Logger.log("Event pages (Sponsors): %s", names("event"));
  Logger.log("Report page (Supporters): %s", names("report"));
  result.skipped.forEach((line) => Logger.log("Skipped %s", line));
}
