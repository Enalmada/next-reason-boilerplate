let component = ReasonReact.statelessComponent("ConsumerHeader");

let styles = ReactDOMRe.Style.make(~marginRight="10px", ());

let make = _children => {
  ...component,
  render: _self =>
    <div>

      <Next.Link href="/"> <a style=styles> {ReasonReact.string("Index")} </a> </Next.Link>
      <Next.Link href="/about"> <a style=styles> {ReasonReact.string("About")} </a> </Next.Link>

            <Next.Link href="/test/antdExamples"> <a style=styles> {ReasonReact.string("antdExamples")} </a> </Next.Link>
       <Next.Link href="/test/form"> <a style=styles> {ReasonReact.string("Form")} </a> </Next.Link>
                              <Next.Link href="/test/calendar"> <a style=styles> {ReasonReact.string("Calendar")} </a> </Next.Link>
                              <Next.Link href="/test/card"> <a style=styles> {ReasonReact.string("Cand")} </a> </Next.Link>
      <Next.Link href="/test/sentry"> <a style=styles> {ReasonReact.string("Sentry")} </a> </Next.Link>
            <Next.Link href="/test/reasonApollo"> <a style=styles> {ReasonReact.string("Apollo")} </a> </Next.Link>

    </div>,
};
