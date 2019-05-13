/* ReactJS used by ReasonReact */
/* This component wraps a ReactJS one, so that ReasonReact components can consume it */
/* Typing the myBanner.js component's output as a `reactClass`. */
[@bs.module "./App"] [@react.component]
external make: (~children: React.element) => React.element = "default";
