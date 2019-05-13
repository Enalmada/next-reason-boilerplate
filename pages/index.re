open ReactIntl;
let ste = React.string;

/*
 type user = {
   name: string
 };

     /*
       <h2>Auth</h2>
       {ReasonReact.string("Hello ")}
       {ReasonReact.string(loggedInUser.user.name)}
       */

 [@bs.deriving abstract]
 type jsProps = {loggedInUser: {..}};

 let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(~t=jsProps->loggedInUserGet, [||]));



 */
[@react.component]
let make = (~onServer) => {
  /* let intl = ReactIntl.useIntl(); */
  /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
  <ConsumerPage nav=`index>
    /*<NextSeo title="index" /> */

      <h1>
        {ReasonReact.string(
           "nextjs reason-react boilerplate demonstrating some concepts",
         )}
      </h1>
      <h2>
        {ReasonReact.string("Font awesome icon loaded without flicker")}
      </h2>
      <FontAwesomeIcon icon=[|"fas", "comments"|] className="fa-5x" />
      <h2>
        {ReasonReact.string(
           "rendering based on user agent (use chrome devtools pass iphone, etc)",
         )}
      </h2>
      <UserAgent mobile={Some(true)} tablet={Some(true)}>
        {(uaIsMobile, uaIsTablet) =>
           uaIsMobile || uaIsTablet
             ? <p>
                 {ste("This will ONLY be rendered on mobile/tablet!!")}
               </p>
             : <p> {ste("This will be rendered on desktop!!")} </p>}
      </UserAgent>
      <h2> {ste("react-intl translations")} </h2>
      /*
       <FormattedMessage
         id="greeting"
         defaultMessage="Hello, Default!"
         values={"0": "Person"}
       />
       */
      /*
       <a
         href="#"
         title={
           intl->Intl.formatMessageWithValues(
             {"id": "greeting", "defaultMessage": "Hello Default!"},
             {"0": "Person"},
           )
         }>
         <div>
           {ReasonReact.string("Link with title using intl api for string")}
         </div>
       </a>
       */
      <h2> {ReasonReact.string("Auth")} </h2>
      {ReasonReact.string("Hello ")}
      <h2>
        {ReasonReact.string(
           "Preload getInitialProps on hover (* only in production)",
         )}
      </h2>
      <Link
        href="/preload"
        withHover=true
        withData=true
        style={ReactDOMRe.Style.make(~marginTop="10px", ())}>
        {ReasonReact.string("hover me")}
      </Link>
      <h2> {ReasonReact.string("getInitialProps")} </h2>
      {ReasonReact.string("onServer: " ++ string_of_bool(onServer))}
      <h2> {ReasonReact.string("Context")} </h2>
    </ConsumerPage>;
    /*
     <SiteContext.Consumer>
       ...{context => ReasonReact.string(string_of_int(context##someValue))}
     </SiteContext.Consumer>
     */
};

let default = make;

let getInitialProps = context =>
  Js.Promise.make((~resolve, ~reject as _) => {
    let onServer =
      switch (Js.Nullable.toOption(context##req)) {
      | None => false
      | Some(_) => true
      };
    resolve(. {"onServer": onServer});
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
