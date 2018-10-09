[@bs.module "@fortawesome/react-fontawesome"] external reactClass : ReasonReact.reactClass = "FontAwesomeIcon";

/*
[%bs.raw {|require("@fortawesome/fontawesome-svg-core/styles.css")|}];
*/

[@bs.obj]
external makeProps:
  (
    ~icon: array(string),
    ~id: string=?,
    ~className: string=?,
    ~style: ReactDOMRe.Style.t=?,
    unit
  ) =>
  _ =
  "";

let make = (~icon, ~id=?, ~className=?, ~style=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass,
    ~props=
      makeProps(
       ~icon=Array.of_list(icon),
        ~id?,
        ~className?,
        ~style?,
        (),
      ),
    children,
  );
