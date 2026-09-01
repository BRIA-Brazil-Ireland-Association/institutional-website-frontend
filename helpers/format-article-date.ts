export const formatArticleDate = (
  dateText: string | null | undefined,
  locale: string,
) => {
  if (!dateText) {
    return undefined;
  }

  const date = new Date(dateText);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};
