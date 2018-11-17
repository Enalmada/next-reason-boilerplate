open Antd;
let component = ReasonReact.statelessComponent("Index");

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage>
      <NextSeo title="calendar" />
      <p> {ReasonReact.string("BS Index here - next7")} </p>
      <Calendar />
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
