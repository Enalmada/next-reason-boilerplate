let component = ReasonReact.statelessComponent("ConsumerPage");
open Antd;

[%bs.raw {| require("../../../assets/styles.less") |}];

/* https://stackoverflow.com/questions/49039433/how-to-add-a-copyright-symbol-in-reason-react-component */
let copy = [%raw {|'\u00a9'|}];
let linkStyles = ReactDOMRe.Style.make(~marginRight="10px", ());

/*
 <MyProfileModule />
 */

let make = children => {
  ...component,
  render: _self =>
    <Layout>
      <Layout.Header>
        <div>
          <Link href="/" style=linkStyles> {ReasonReact.string("Index")} </Link>
          <Link href="/reducer" style=linkStyles> {ReasonReact.string("Reducer")} </Link>
          <Link href="/sentry" style=linkStyles> {ReasonReact.string("Sentry")} </Link>
          <Link href="/test/antdExamples" style=linkStyles> {ReasonReact.string("Ant Desktop")} </Link>
          <Link href="/mobile/styleguide/Button" style=linkStyles> {ReasonReact.string("Antd Mobile")} </Link>
          <Link href="/health" style=linkStyles> {ReasonReact.string("Health")} </Link>
          <Link href="/intl" style=linkStyles> {ReasonReact.string("intl")} </Link>
          <div className="float-right"> <ProfileModule /> </div>
        </div>
      </Layout.Header>
      <Layout.Content> <AppRe> ...children </AppRe> </Layout.Content>
      <Layout.Footer>
        <div
          style={ReactDOMRe.Style.make(
            ~height="50px",
            ~color="lightgrey",
            ~backgroundColor="black",
            ~display="flex",
            ~justifyContent="center",
            ~alignItems="center",
            (),
          )}>
          {ReasonReact.string("Sticky Footer Example ")}
          copy
          {ReasonReact.string(" 2018")}
        </div>
      </Layout.Footer>
    </Layout>,
};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));
