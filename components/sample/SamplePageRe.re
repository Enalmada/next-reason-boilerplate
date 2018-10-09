/* ReactJS used by ReasonReact */
/* This component wraps a ReactJS one, so that ReasonReact components can consume it */
/* Typing the myBanner.js component's output as a `reactClass`. */
[@bs.module "./SamplePage"] external app : ReasonReact.reactClass = "default";

/* This is like declaring a normal ReasonReact component's `make` function, except the body is a the interop hook wrapJsForReason */
let make = (children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=app,
    ~props=Js.Obj.empty(),
    children,
  );

