open I18next;

let component = ReasonReact.statelessComponent("Index");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="About");

let make = (~t: i18next, _children) => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage>
      <NextSeo config />
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
      <h2> {ReasonReact.string("i18next translations")} </h2>
      <div> {t("integrates_react-i18next", Some(Js.Dict.fromList([("0", "yay")])))} </div>
      <div>
        <a title={toString(t("translations.takeString", None))}> {ReasonReact.string("title takes string")} </a>
      </div>
      <div> <Trans i18nKey="transComponent" values=[("0", "yay!")] /> </div>
      <div> {ReasonReact.string("see i18next/example/nextjs for the most up to date example")} </div>
    </ConsumerPage>,
};

[@bs.deriving abstract]
type jsProps = {t: i18next};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(~t=jsProps->tGet, [||]));
