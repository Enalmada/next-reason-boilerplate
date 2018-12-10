let component = ReasonReact.statelessComponent("Header");

let styles = ReactDOMRe.Style.make(~marginRight="10px", ());

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <Link href="/sample" style=styles> {ReasonReact.string("Home")} </Link>
      <Link href="/sample/sampleAbout" style=styles> {ReasonReact.string("About")} </Link>
      <Link href="/sample/shared" style=styles> {ReasonReact.string("HomeShared")} </Link>
      <Link href="/sample/shared/about" style=styles> {ReasonReact.string("AboutShared")} </Link>
      <Link href="/sample/indexApollo" style=styles> {ReasonReact.string("IndexApollo")} </Link>
      <Link href="/sample/aboutApollo" style=styles> {ReasonReact.string("AboutApollo")} </Link>
      <Link href="/sample/ant" style=styles> {ReasonReact.string("Ant")} </Link>
      <Link href="/sample/ant/calendar" style=styles> {ReasonReact.string("Ant Calendar")} </Link>
      <Link href="/sample/ant/card" style=styles> {ReasonReact.string("Ant Card")} </Link>
      <Link href="/sample/test" style=styles> {ReasonReact.string("Test")} </Link>
    </div>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
