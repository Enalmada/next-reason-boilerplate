open Antd;

[%bs.raw {| require("../../../assets/styles.less") |}];

/* https://stackoverflow.com/questions/49039433/how-to-add-a-copyright-symbol-in-reason-react-component */
let copy = [%raw {|'\u00a9'|}];
let linkStyles = ReactDOMRe.Style.make();

/*
 <MyProfileModule />
 */

/*
 To work around ant menu jest crash
 mode={nodeEnv == "test" ? `Vertical : `Horizontal}
  */
[@react.component]
let make = (~nav, ~children) => {
  <Layout>
    <Layout.Header>
      <Antd_Menu
        theme=`dark
        selectedKeys=[|NavValues.navValueToJs(nav)|]
        mode=`horizontal
        style={ReactDOMRe.Style.make(~lineHeight="64px", ())}>
        <Antd_Menu.Item key="index">
          <Link href="/" style=linkStyles>
            {ReasonReact.string("Index")}
          </Link>
        </Antd_Menu.Item>
        <Antd_Menu.Item key="reducer">
          <Link href="/reducer" style=linkStyles>
            {ReasonReact.string("Reducer")}
          </Link>
        </Antd_Menu.Item>
        <Antd_Menu.Item key="sentry">
          <Link href="/sentry" style=linkStyles>
            {ReasonReact.string("Sentry")}
          </Link>
        </Antd_Menu.Item>
        <Antd_Menu.Item key="antdExamples">
          <Link href="/test/antdExamples" style=linkStyles>
            {ReasonReact.string("Ant Desktop")}
          </Link>
        </Antd_Menu.Item>
        <Antd_Menu.Item key="mobileStyleguide">
          <Link href="/mobile/styleguide/Button" style=linkStyles>
            {ReasonReact.string("Antd Mobile")}
          </Link>
        </Antd_Menu.Item>
        <Antd_Menu.Item key="health">
          <Link href="/health" style=linkStyles>
            {ReasonReact.string("Health")}
          </Link>
        </Antd_Menu.Item>
        <Antd_Menu.Item key="intl">
          <Link href="/intl" style=linkStyles>
            {ReasonReact.string("intl")}
          </Link>
        </Antd_Menu.Item>
        <Antd_Menu.Item
          key="signin" style={ReactDOMRe.Style.make(~float="right", ())}>
          <ProfileModule />
        </Antd_Menu.Item>
      </Antd_Menu>
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
        {ReasonReact.string(" 2019")}
      </div>
    </Layout.Footer>
  </Layout>;
};
