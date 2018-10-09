type config = {
  .
  "canonical": Js.undefined(string),
  "title": Js.undefined(string),
};

[@bs.module "next-seo"] external nextSeoClass: ReasonReact.reactClass = "default";

let make = (~config=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=nextSeoClass,
    ~props={"config": config |> Js.Undefined.fromOption},
    children,
  );
