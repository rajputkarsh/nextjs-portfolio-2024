declare module "*.scss";

declare interface Window {
  dataLayer: Array<any>;
}

// Use type safe message keys with `next-intl`
type Messages = typeof import("./messages/en.json");
declare interface IntlMessages extends Messages {}
