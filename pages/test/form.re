open Antd;
let component = ReasonReact.statelessComponent("Index");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="Calendar");
let formPrefix = <Icon type_="user" style={ReactDOMRe.Style.make(~color="rgba(0,0,0,.25)", ())} />;

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage> <NextSeo config /> <p> {ReasonReact.string("BS Index here - next7")} </p>
      <Form layout=`Inline> <Form.Item> <Input prefix=formPrefix placeholder="Username" /> </Form.Item> </Form>
      <Spin />
</ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
