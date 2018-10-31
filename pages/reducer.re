let component = ReasonReact.statelessComponent("About");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="About");

let make = _children => {
  ...component,
  render: _self =>
    <>
      <NextSeo config />
      /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
      <ConsumerPage>
        <h1> {ReasonReact.string("Counter demonstrating reason reducer component")} </h1>
        <Counter />
      </ConsumerPage>
    </>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
