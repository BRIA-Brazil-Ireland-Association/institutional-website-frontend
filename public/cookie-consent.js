(function () {
  if (window.__briaCookieConsent) {
    return;
  }
  window.__briaCookieConsent = true;

  var GA_ID = "G-MZVWM336V1";
  var STORAGE_KEY = "bria_consent";
  var BANNER_ID = "bria-cookie-banner";

  var COPY = {
    en: {
      label: "Cookie consent",
      text: "We use Google Analytics cookies to understand how visitors use our website and to improve it. They are only set if you accept.",
      policy: "Privacy Policy",
      policyHref: "/en/privacy#cookies-and-analytics",
      accept: "Accept",
      decline: "Decline",
    },
    pt: {
      label: "Consentimento de cookies",
      text: "Usamos cookies do Google Analytics para entender como os visitantes usam o nosso site e melhorá-lo. Eles só são gravados se você aceitar.",
      policy: "Política de Privacidade",
      policyHref: "/pt-BR/privacy#cookies-and-analytics",
      accept: "Aceitar",
      decline: "Recusar",
    },
  };

  var STYLES =
    "#" +
    BANNER_ID +
    "{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:420px;box-sizing:border-box;padding:20px;border-radius:16px;background:#fff;color:#1a1a1a;box-shadow:0 18px 40px rgba(0,0,0,.22);font-family:inherit;font-size:14px;line-height:1.5}" +
    "#" +
    BANNER_ID +
    " p{margin:0;color:#3d3d3d}" +
    "#" +
    BANNER_ID +
    " a{color:#104722;font-weight:600;text-decoration:underline;text-underline-offset:2px}" +
    "#" +
    BANNER_ID +
    " .bcb-actions{display:flex;gap:12px;margin-top:16px}" +
    "#" +
    BANNER_ID +
    " button{flex:1;min-height:44px;padding:10px 16px;border-radius:999px;border:2px solid #104722;font:inherit;font-weight:600;cursor:pointer;transition:background-color .15s ease,color .15s ease}" +
    "#" +
    BANNER_ID +
    " .bcb-accept{background:#104722;color:#fff}" +
    "#" +
    BANNER_ID +
    " .bcb-accept:hover{background:#0b461b;border-color:#0b461b}" +
    "#" +
    BANNER_ID +
    " .bcb-decline{background:#fff;color:#104722}" +
    "#" +
    BANNER_ID +
    " .bcb-decline:hover{background:rgba(16,71,34,.1)}" +
    "#" +
    BANNER_ID +
    " button:focus-visible,#" +
    BANNER_ID +
    " a:focus-visible{outline:2px solid #169b62;outline-offset:3px}" +
    "@media (min-width:640px){#" +
    BANNER_ID +
    "{left:24px;right:auto;bottom:24px}}";

  var gaLoaded = false;

  var getCopy = function () {
    var lang = (document.documentElement.lang || "en").toLowerCase();
    return lang.indexOf("pt") === 0 ? COPY.pt : COPY.en;
  };

  var readChoice = function () {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  var saveChoice = function (choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
  };

  var gtag = function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  };

  var loadAnalytics = function () {
    if (gaLoaded) {
      gtag("consent", "update", { analytics_storage: "granted" });
      return;
    }
    gaLoaded = true;
    window.gtag = gtag;
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
    gtag("js", new Date());
    gtag("config", GA_ID);
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);
  };

  var removeAnalyticsCookies = function () {
    var host = window.location.hostname;
    var parts = host.split(".");
    var domains = ["", host];
    for (var i = 1; i < parts.length - 1; i++) {
      domains.push("." + parts.slice(i).join("."));
    }
    document.cookie.split(";").forEach(function (cookie) {
      var name = cookie.split("=")[0].trim();
      if (name.indexOf("_ga") !== 0) {
        return;
      }
      domains.forEach(function (domain) {
        document.cookie =
          name +
          "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" +
          (domain ? "; domain=" + domain : "");
      });
    });
  };

  var hideBanner = function () {
    var banner = document.getElementById(BANNER_ID);
    if (banner) {
      banner.remove();
    }
  };

  var applyChoice = function (choice) {
    saveChoice(choice);
    hideBanner();
    if (choice === "granted") {
      loadAnalytics();
      return;
    }
    if (gaLoaded) {
      gtag("consent", "update", { analytics_storage: "denied" });
    }
    removeAnalyticsCookies();
  };

  var showBanner = function () {
    if (document.getElementById(BANNER_ID)) {
      return;
    }
    if (!document.getElementById(BANNER_ID + "-styles")) {
      var style = document.createElement("style");
      style.id = BANNER_ID + "-styles";
      style.textContent = STYLES;
      document.head.appendChild(style);
    }

    var copy = getCopy();
    var banner = document.createElement("div");
    banner.id = BANNER_ID;
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", copy.label);

    var text = document.createElement("p");
    text.textContent = copy.text + " ";
    var link = document.createElement("a");
    link.href = copy.policyHref;
    link.textContent = copy.policy;
    text.appendChild(link);
    text.appendChild(document.createTextNode("."));

    var actions = document.createElement("div");
    actions.className = "bcb-actions";

    var decline = document.createElement("button");
    decline.type = "button";
    decline.className = "bcb-decline";
    decline.textContent = copy.decline;
    decline.addEventListener("click", function () {
      applyChoice("denied");
    });

    var accept = document.createElement("button");
    accept.type = "button";
    accept.className = "bcb-accept";
    accept.textContent = copy.accept;
    accept.addEventListener("click", function () {
      applyChoice("granted");
    });

    actions.appendChild(decline);
    actions.appendChild(accept);
    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  };

  window.briaOpenCookieSettings = showBanner;

  document.addEventListener("click", function (event) {
    var target = event.target;
    var trigger =
      target && target.closest
        ? target.closest('[data-cookie-settings], a[href$="#cookie-settings"]')
        : null;
    if (!trigger) {
      return;
    }
    event.preventDefault();
    showBanner();
  });

  var start = function () {
    var choice = readChoice();
    if (choice === "granted") {
      loadAnalytics();
      return;
    }
    if (choice !== "denied") {
      showBanner();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
