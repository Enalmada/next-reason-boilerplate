open Antd;
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
    <ConsumerPage> <NextSeo config /> <p> {ReasonReact.string("BS Index here - next7")} </p>

   <Card
       title={ReasonReact.string("Card Title")}
       extra={<a href="#"> {ReasonReact.string("more")} </a>}
       style={ReactDOMRe.Style.make(~width="300px", ())}>
       <p> {ReasonReact.string("Card Content")} </p>
     </Card>

    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
