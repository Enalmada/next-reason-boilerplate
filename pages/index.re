let component = ReasonReact.statelessComponent("Index");

open ReactIntl;

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

let make = (~onServer, _children) => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage nav=`index>
      <NextSeo title="index" />
      <h1> {ReasonReact.string("nextjs reason-react boilerplate demonstrating some concepts")} </h1>
      <h2> {ReasonReact.string("Font awesome icon loaded without flicker")} </h2>
      <FontAwesomeIcon icon=["fas", "comments"] className="fa-5x" />
      <h2> {ReasonReact.string("rendering based on user agent (use chrome devtools pass iphone, etc)")} </h2>
      <UserAgent mobile=true tablet=true>
        {(uaIsMobile, uaIsTablet) =>
           uaIsMobile || uaIsTablet ?
             <p> {ReasonReact.string("This will ONLY be rendered on mobile/tablet!!")} </p> :
             <p> {ReasonReact.string("This will be rendered on desktop!!")} </p>}
      </UserAgent>
      <h2> {ReasonReact.string("react-intl translations")} </h2>
      <FormattedMessage id="greeting" defaultMessage="Hello, Default!" values={"0": "Person"} />
      <ReactIntl.IntlInjector>
        ...{intl =>
          <a
            href="#"
            title={
              intl.formatMessageWithValues({"0": "Person"}, {"id": "greeting", "defaultMessage": "Hello Default!"})
            }>
            <div> {ReasonReact.string("Link with title using intl api for string")} </div>
          </a>
        }
      </ReactIntl.IntlInjector>
      <h2> {ReasonReact.string("Auth")} </h2>
      {ReasonReact.string("Hello ")}
      <h2> {ReasonReact.string("Preload getInitialProps on hover (* only in production)")} </h2>
      <Link href="/preload" withHover=true withData=true style={ReactDOMRe.Style.make(~marginTop="10px", ())}>
        {ReasonReact.string("hover me")}
      </Link>
      <h2> {ReasonReact.string("getInitialProps")} </h2>
      {ReasonReact.string("onServer: " ++ string_of_bool(onServer))}
      <h2> {ReasonReact.string("Context")} </h2>
      <SiteContext.Consumer>
        ...{context => ReasonReact.string(string_of_int(context##someValue))}
      </SiteContext.Consumer>
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(~onServer=jsProps##onServer, [||]));

/* The way to do getInitialProps: https://github.com/zeit/next.js/issues/4202#issuecomment-439175214 */
let getInitialProps = context =>
  Js.Promise.make((~resolve, ~reject as _) => {
    let onServer =
      switch (Js.Nullable.toOption(context##req)) {
      | None => false
      | Some(_) => true
      };
    resolve(. {"onServer": onServer});
  });

/* In 7.0.2 canary, you must remove the Js.Promise.make wrapper */
/*
 let getInitialProps = context => {
   let onServer =
     switch (Js.Nullable.toOption(context##req)) {
     | None => false
     | Some(_) => true
     };
   {"onServer": onServer};
 };
 */

let inject = [%bs.raw {| (cls, fn) => cls.getInitialProps = fn |}];

inject(default, getInitialProps);
