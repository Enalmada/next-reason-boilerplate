let component = ReasonReact.statelessComponent("About");



[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string
};

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="About")



let make = _children => {
  ...component,
  render: _self =>
    <Fragment>
        <NextSeo config={config} />
      /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
      <ConsumerPage> <p> {ReasonReact.string("About consumer is here!")} </p> <Counter /> </ConsumerPage>
    </Fragment>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
