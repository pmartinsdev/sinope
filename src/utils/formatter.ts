const defaultLocale = "en";

export const dateFormatter = new Intl.DateTimeFormat(defaultLocale, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const priceFormatter = new Intl.NumberFormat(defaultLocale, {
  style: "currency",
  currency: "USD",
});
