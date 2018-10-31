let component = ReasonReact.statelessComponent("ConsumerPage");
open Antd;

[%bs.raw {| require("../../../assets/styles.less") |}];

/* https://stackoverflow.com/questions/49039433/how-to-add-a-copyright-symbol-in-reason-react-component */
let copy = [%raw {|'\u00a9'|}];

let make = children => {
  ...component,
  render: _self =>
    <Layout>
      <Layout.Header> <ConsumerHeader /> </Layout.Header>
      <Layout.Content> <AppRe> ...children </AppRe> </Layout.Content>
      <Layout.Footer>
        <div
          style={
            ReactDOMRe.Style.make(
              ~height="50px",
              ~color="lightgrey",
              ~backgroundColor="black",
              ~display="flex",
              ~justifyContent="center",
              ~alignItems="center",
              (),
            )
          }>
          {ReasonReact.string("Sticky Footer Example ")}
          copy
          {ReasonReact.string(" 2018")}
        </div>
      </Layout.Footer>
    </Layout>,
};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));
