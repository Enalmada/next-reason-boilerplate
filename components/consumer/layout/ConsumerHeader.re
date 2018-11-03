let component = ReasonReact.statelessComponent("ConsumerHeader");

let styles = ReactDOMRe.Style.make(~marginRight="10px", ());

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <Next.Link href="/"> <a style=styles> {ReasonReact.string("Index")} </a> </Next.Link>
      <Next.Link href="/reducer"> <a style=styles> {ReasonReact.string("Reducer")} </a> </Next.Link>
      <Next.Link href="/test/sentry"> <a style=styles> {ReasonReact.string("Sentry")} </a> </Next.Link>
      <Next.Link href="/apollo"> <a style=styles> {ReasonReact.string("Apollo")} </a> </Next.Link>
      <Next.Link href="/test/antdExamples"> <a style=styles> {ReasonReact.string("Ant Desktop")} </a> </Next.Link>
      <Next.Link href="/mobile/styleguide/Button">
        <a style=styles> {ReasonReact.string("Antd Mobile")} </a>
      </Next.Link>
      <Next.Link href="/health"> <a style=styles> {ReasonReact.string("Health")} </a> </Next.Link>
    </div>,
};
