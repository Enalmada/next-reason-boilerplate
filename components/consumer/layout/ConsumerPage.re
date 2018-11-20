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
          <Next.Link href="/"> <a style=linkStyles> {ReasonReact.string("Index")} </a> </Next.Link>
          <Next.Link href="/reducer"> <a style=linkStyles> {ReasonReact.string("Reducer")} </a> </Next.Link>
          <Next.Link href="/test/sentry"> <a style=linkStyles> {ReasonReact.string("Sentry")} </a> </Next.Link>
          <Next.Link href="/test/antdExamples">
            <a style=linkStyles> {ReasonReact.string("Ant Desktop")} </a>
          </Next.Link>
          <Next.Link href="/mobile/styleguide/Button">
            <a style=linkStyles> {ReasonReact.string("Antd Mobile")} </a>
          </Next.Link>
          <Next.Link href="/health"> <a style=linkStyles> {ReasonReact.string("Health")} </a> </Next.Link>
          <Next.Link href="/intl"> <a style=linkStyles> {ReasonReact.string("intl")} </a> </Next.Link>
          <div className="float-right"> <ProfileModule /> </div>
        </div>
      </Layout.Header>
      <Layout.Content> <AppRe> ...children </AppRe> </Layout.Content>
      <Layout.Footer>
        <div
          style={
            ReactDOMRe.Style.make(
              ~height="50px",
              ~color="lightgrey",
              ~backgroundColor="black",
              ~display="flex",
              ~justifyContent="center",
              ~alignItems="center",
              (),
            )
          }>
          {ReasonReact.string("Sticky Footer Example ")}
          copy
          {ReasonReact.string(" 2018")}
        </div>
      </Layout.Footer>
    </Layout>,
};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));
