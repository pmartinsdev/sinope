const defaultLocale = "en";

export const dateFormatter = new Intl.DateTimeFormat(defaultLocale);

export const priceFormatter = new Intl.NumberFormat(defaultLocale, {
  style: "currency",
  currency: "USD",
});
