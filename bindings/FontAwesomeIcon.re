[@bs.module "@fortawesome/react-fontawesome"] [@react.component]
external make:
  (
    ~icon: array(string),
    ~id: string=?,
    ~className: string=?,
    ~style: ReactDOMRe.Style.t=?
  ) =>
  React.element =
  "FontAwesomeIcon";
