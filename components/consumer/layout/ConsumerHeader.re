let component = ReasonReact.statelessComponent("ConsumerHeader");

let styles = ReactDOMRe.Style.make(~marginRight="10px", ());

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <Next.Link href="/"> <a style=styles> {ReasonReact.string("Index")} </a> </Next.Link>
      <Next.Link href="/about"> <a style=styles> {ReasonReact.string("About")} </a> </Next.Link>
      <Next.Link href="/test/sentry"> <a style=styles> {ReasonReact.string("Sentry")} </a> </Next.Link>
      <Next.Link href="/test/reasonApollo"> <a style=styles> {ReasonReact.string("Apollo (tbd)")} </a> </Next.Link>
      <Next.Link href="/test/antdExamples"> <a style=styles> {ReasonReact.string("Ant Desktop")} </a> </Next.Link>
      <Next.Link href="/mobile/home"> <a style=styles> {ReasonReact.string("Ant Mobile")} </a> </Next.Link>
    </div>,
};
