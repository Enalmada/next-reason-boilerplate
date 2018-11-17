open Antd;

let component = ReasonReact.statelessComponent("Index");

exception InputClosed(string);

let raiseError = _event => raise(InputClosed("error for sentry!"));

let make = _children => {
  ...component,
  render: _self =>
    <ConsumerPage>
      <NextSeo title="Sentry" />
      <h1> {ReasonReact.string("Sentry Testing")} </h1>
      <p> {ReasonReact.string("(if you setup your sentry dsn in .env environment variables file)")} </p>
      <Button onClick={event => raiseError(event)} _type=`primary> {ReasonReact.string("Click for Error")} </Button>
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
