[@bs.deriving abstract]
type hrefWithQuery = {
  pathname: string,
  [@bs.optional]
  query: Js.Dict.t(string),
};

[@bs.module "../util/prefetch"]
external prefetch: (hrefWithQuery, ApolloClient.generatedApolloClient, bool) => unit = "default";
