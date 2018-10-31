/* ReactJS used by ReasonReact */
/* This component wraps a ReactJS one, so that ReasonReact components can consume it */
/* Typing the myBanner.js component's output as a `reactClass`. */
[@bs.module "./Layout"] external app: ReasonReact.reactClass = "default";

/* This is like declaring a normal ReasonReact component's `make` function, except the body is a the interop hook wrapJsForReason */
[@bs.deriving abstract]
type jsProps = {
  /* some example fields */
  language: string,
};

let make = (~language, children) =>
  ReasonReact.wrapJsForReason(~reactClass=app, ~props=jsProps(~language), children);
