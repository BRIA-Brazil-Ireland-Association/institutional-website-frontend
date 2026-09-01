export const formatEventDate = (
  dateText: string | undefined,
  locale: string,
) => {
  if (!dateText) {
    return undefined;
  }

  const [year, month, day] = dateText.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  const eventDate = new Date(Date.UTC(year, month - 1, day));
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  })
    .format(eventDate)
    .replace(/\./g, "");

  return { day: String(day), month: monthLabel };
};
