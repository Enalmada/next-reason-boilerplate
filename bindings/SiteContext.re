[@bs.module "../util/context"] external context: ReasonReact.reactClass = "default";

[@bs.get] external consumer: ReasonReact.reactClass => ReasonReact.reactClass = "Consumer";

[@bs.deriving abstract]
type contextProps = {. "someValue": int};

module Consumer = {
  let make = (children: contextProps => ReasonReact.reactElement) =>
    ReasonReact.wrapJsForReason(~reactClass=consumer(context), ~props=Js.Obj.empty(), children);
};
