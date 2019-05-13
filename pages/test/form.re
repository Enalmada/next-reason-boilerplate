open Antd;

let formPrefix =
  <Icon
    _type=Antd_IconName.user
    style={ReactDOMRe.Style.make(~color="rgba(0,0,0,.25)", ())}
  />;

[@react.component]
let make = () => {
  /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
  <ConsumerPage nav=`form>
    <NextSeo title="form" />
    <p> {ReasonReact.string("BS Index here - next7")} </p>
    <Form layout=`inline>
      <Form.Item>
        <Input prefix=formPrefix placeholder="Username" />
      </Form.Item>
    </Form>
    <Spin />
  </ConsumerPage>;
};
