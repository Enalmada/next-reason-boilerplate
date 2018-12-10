/* [@bs.module "../routes"] external link: ReasonReact.reactClass = "default"; */
[@bs.module "../routes"] external myJSReactClass: ReasonReact.reactClass = "Link";

let make =
    (
      ~route=?,
      ~href=?,
      ~_as=?,
      ~prefetch: option(bool)=?,
      ~replace: option(bool)=?,
      ~shallow: option(bool)=?,
      ~passHref: option(bool)=?,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=myJSReactClass,
    ~props=
      Js.Undefined.{
        "route": fromOption(route),
        "href": fromOption(href),
        "as": fromOption(_as),
        "prefetch": fromOption(prefetch),
        "replace": fromOption(replace),
        "shallow": fromOption(shallow),
        "passHref": fromOption(passHref),
      },
    children,
  );
