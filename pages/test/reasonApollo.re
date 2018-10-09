let component = ReasonReact.statelessComponent("Index");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/test/reasonApollo", ~title="ReasonApollo");

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage> <NextSeo config /> <p> {ReasonReact.string("BS Test Apollo")} </p>


     </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
