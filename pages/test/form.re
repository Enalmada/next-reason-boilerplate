open Antd;
let component = ReasonReact.statelessComponent("Index");

let formPrefix = <Icon type_="user" style={ReactDOMRe.Style.make(~color="rgba(0,0,0,.25)", ())} />;

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage nav=`form>
      <NextSeo title="form" />
      <p> {ReasonReact.string("BS Index here - next7")} </p>
      <Form layout=`Inline> <Form.Item> <Input prefix=formPrefix placeholder="Username" /> </Form.Item> </Form>
      <Spin />
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
