open Antd;

let component = ReasonReact.statelessComponent("Index");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="Sentry");
exception InputClosed(string);

let raiseError = _event => raise(InputClosed("error for sentry!"));

let make = _children => {
  ...component,
  render: _self =>
    <ConsumerPage>
      <NextSeo config />
      <h1> {ReasonReact.string("Sentry Testing")} </h1>
      <p> {ReasonReact.string("(if you setup your sentry dsn in .env environment variables file)")} </p>
      <Button onClick={event => raiseError(event)} _type=`primary> {ReasonReact.string("Click for Error")} </Button>
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
