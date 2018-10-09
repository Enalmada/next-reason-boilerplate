let component = ReasonReact.statelessComponent("ConsumerPage");
open Antd;
let make = (children) => {
  ...component,
  render: _self =>
  <Layout>
        <Layout.Header><ConsumerHeader/></Layout.Header>
        <Layout.Content><AppRe> ...children </AppRe></Layout.Content>
        <Layout.Footer>{ReasonReact.string("Sample")}</Layout.Footer>
  </Layout>,
};


let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));
