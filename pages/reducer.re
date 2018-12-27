let component = ReasonReact.statelessComponent("About");

let make = _children => {
  ...component,
  render: _self =>
    <>
      <NextSeo title="reducer" />
      /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
      <ConsumerPage nav=`reducer>
        <h1> {ReasonReact.string("Counter demonstrating reason reducer component")} </h1>
        <Counter />
      </ConsumerPage>
    </>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
