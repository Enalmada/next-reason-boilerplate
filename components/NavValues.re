[@bs.deriving jsConverter]
type navValue = [
  | [@bs.as "index"] `index
  | [@bs.as "reducer"] `reducer
  | [@bs.as "sentry"] `sentry
  | [@bs.as "antdExamples"] `antdExamples
  | [@bs.as "mobileStyleguide"] `mobileStyleguide
  | [@bs.as "health"] `health
  | [@bs.as "intl"] `intl
  | [@bs.as "preload"] `preload
  | [@bs.as "calendar"] `calendar
  | [@bs.as "card"] `card
  | [@bs.as "form"] `form
  | [@bs.as "signin"] `signin
  | [@bs.as "createAccount"] `createAccount
];
