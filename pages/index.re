let component = ReasonReact.statelessComponent("Index");

open ReactIntl;

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage>
      <NextSeo title="index" />
      <h1> {ReasonReact.string("nextjs reason-react boilerplate demonstrating some concepts")} </h1>
      <h2> {ReasonReact.string("Font awesome icon loaded without flicker")} </h2>
      <FontAwesomeIcon icon=["fas", "comments"] className="fa-5x" />
      <h2> {ReasonReact.string("rendering based on user agent (use chrome devtools pass iphone, etc)")} </h2>
      <UserAgent mobile=true tablet=true>
        {
          (uaIsMobile, uaIsTablet) =>
            uaIsMobile || uaIsTablet ?
              <p> {ReasonReact.string("This will ONLY be rendered on mobile/tablet!!")} </p> :
              <p> {ReasonReact.string("This will be rendered on desktop!!")} </p>
        }
      </UserAgent>
      <h2> {ReasonReact.string("react-intl translations")} </h2>
      <FormattedMessage id="greeting" defaultMessage="Hello, Default!" values={"0": "Person"} />
      <ReactIntl.IntlInjector>
        ...{
             intl =>
               <a
                 href="#"
                 title={
                   intl.formatMessageWithValues(
                     {"0": "Person"},
                     {"id": "greeting", "defaultMessage": "Hello Default!"},
                   )
                 }>
                 <div> {ReasonReact.string("Link with title using intl api for string")} </div>
               </a>
           }
      </ReactIntl.IntlInjector>
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
