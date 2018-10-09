let component = ReasonReact.statelessComponent("Index");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="About");

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage>
      <NextSeo config />
      <p> {ReasonReact.string("BS Index here - next testing")} </p>
      <FontAwesomeIcon icon=["fas", "comments"] className="fa-5x" />
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
