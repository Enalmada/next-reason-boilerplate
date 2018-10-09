let component = ReasonReact.statelessComponent("Header");

let styles = ReactDOMRe.Style.make(~marginRight="10px", ());

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <Next.Link href="/sample"> <a style=styles> {ReasonReact.string("Home")} </a> </Next.Link>
      <Next.Link href="/sample/sampleAbout"> <a style=styles> {ReasonReact.string("About")} </a> </Next.Link>
      <Next.Link href="/sample/shared"> <a style=styles> {ReasonReact.string("HomeShared")} </a> </Next.Link>
      <Next.Link href="/sample/shared/about"> <a style=styles> {ReasonReact.string("AboutShared")} </a> </Next.Link>
      <Next.Link href="/sample/indexApollo"> <a style=styles> {ReasonReact.string("IndexApollo")} </a> </Next.Link>
      <Next.Link href="/sample/aboutApollo"> <a style=styles> {ReasonReact.string("AboutApollo")} </a> </Next.Link>
      <Next.Link href="/sample/ant"> <a style=styles> {ReasonReact.string("Ant")} </a> </Next.Link>
      <Next.Link href="/sample/ant/calendar"> <a style=styles> {ReasonReact.string("Ant Calendar")} </a> </Next.Link>
      <Next.Link href="/sample/ant/card"> <a style=styles> {ReasonReact.string("Ant Card")} </a> </Next.Link>
      <Next.Link href="/sample/test"> <a style=styles> {ReasonReact.string("Test")} </a> </Next.Link>
    </div>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
