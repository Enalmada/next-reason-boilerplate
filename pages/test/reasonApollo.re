let component = ReasonReact.statelessComponent("Index");

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage>
      <NextSeo title="Reason-Apollo" />
      <p> {ReasonReact.string("TODO - Reason-Apollo here")} </p>
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
