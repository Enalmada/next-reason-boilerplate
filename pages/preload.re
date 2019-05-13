[@react.component]
let make = () => {
  <ConsumerPage nav=`preload>
    <NextSeo title="index" />
    <h1> {ReasonReact.string("getInitialProps preload example")} </h1>
  </ConsumerPage>;
};

let default = make;

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

/*
 let getInitialProps = context =>
   Js.Promise.make((~resolve, ~reject as _) => {
     let isVirtualCall =
       switch (Js.Nullable.toOption(context##req)) {
       | None => false
       | Some(_) => true
       };

     if (isVirtualCall) {
       Js.log("getInitialProps preloaded");
     };
     resolve(. {"isVirtualCall": isVirtualCall});
   });

 let inject:
   (
     Js.t('a) => React.element,
     {. "req": Js.Nullable.t(Js.t('a))} => Js.Promise.t(Js.t('a))
   ) =>
   unit = [%bs.raw
   {| (cls, fn) => cls.getInitialProps = fn |}
 ];

 inject(default, getInitialProps);
 */
