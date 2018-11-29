let component = ReasonReact.statelessComponent("PreloadExample");
let text = ReasonReact.string;

let nav = `index;

let make = _children => {
  ...component,
  render: _self =>
    <ConsumerPage>
      <NextSeo title="index" />
      <h1> {ReasonReact.string("getInitialProps preload example")} </h1>
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make([||]));

let getInitialProps = context => {
  let isVirtualCall =
    switch (Js.Nullable.toOption(context##isVirtualCall)) {
    | None => false
    | Some(isVirtualCall) => isVirtualCall
    };

  if (isVirtualCall) {
    Js.log("getInitialProps preloaded");
  };
};

let inject = [%bs.raw {| (cls, fn) => cls.getInitialProps = fn |}];

inject(default, getInitialProps);
