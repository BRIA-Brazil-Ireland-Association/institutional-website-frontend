import globalEn from "@/content/en/global.json";

const REPORT_RELEASE_AT = Date.parse(globalEn.announcementBar.startsAt);

export const isReportReleased = () => Date.now() >= REPORT_RELEASE_AT;
