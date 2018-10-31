open Antd;

type state = {listDisabled: bool};

type action =
  | DisableList;

let component = ReasonReact.reducerComponent("AntdMobileExamples");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/mobile/antdMobile", ~title="Ant Design Mobile");

let styles = ReactDOMRe.Style.make(~lineHeight="64px", ());

let nextLink = (~todo=false, component: string) =>
  <Next.Link href={"/mobile/styleguide/" ++ component}>
    <a>
      {ReasonReact.string(component)}
      {
        todo ?
          <span style={ReactDOMRe.Style.make(~fontSize="10px", ())}> {ReasonReact.string(" (todo)")} </span> :
          ReasonReact.string("")
      }
    </a>
  </Next.Link>;

/*
 let buttonCode = <Button _type=`primary> {ReasonReact.string("Button here")} </Button>;

 let buttonText = "<Button _type=`primary>{ReasonReact.string(\"Button here\")}</Button>";

 let buttonExample = buttonCode;
 */

let iframePage = which => "/mobile/iframePage/" ++ which;
let copy = [%raw {|'\u00a9'|}];

let make = (~which, _children) => {
  ...component,
  initialState: () => {listDisabled: false},
  reducer: (action, _state) =>
    switch (action) {
    | DisableList => ReasonReact.Update({listDisabled: false})
    },
  render: _self =>
    <Layout id="components-layout-demo-top-side">
      <Layout.Header className="header" style={ReactDOMRe.Style.make(~height="64px", ())}>
        <div className="logo" />
        <Menu theme=`Dark mode=`Horizontal defaultSelectedKeys=["2"] style=styles>
          <Menu.Item key="1"> {ReasonReact.string("nav 1")} </Menu.Item>
          <Menu.Item key="2"> {ReasonReact.string("nav 2")} </Menu.Item>
          <Menu.Item key="3"> {ReasonReact.string("nav 3")} </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content style={ReactDOMRe.Style.make(~padding="0 50px", ())}>
        <Breadcrumb style={ReactDOMRe.Style.make(~margin="16px 0", ())}>
          <Breadcrumb.Item> {ReasonReact.string("Home")} </Breadcrumb.Item>
          <Breadcrumb.Item> {ReasonReact.string("List")} </Breadcrumb.Item>
          <Breadcrumb.Item> {ReasonReact.string("App")} </Breadcrumb.Item>
        </Breadcrumb>
        <Layout hasSider=true style={ReactDOMRe.Style.make(~padding="24px 0", ~background="#fff", ())}>
          <Layout.Sider width=200 style={ReactDOMRe.Style.make(~background="#fff", ())}>
            <Menu
              mode=`Inline
              selectedKeys=[which]
              defaultSelectedKeys=["1"]
              defaultOpenKeys=["sub1", "sub2", "sub3", "sub4", "sub5", "sub6", "sub7"]
              style={ReactDOMRe.Style.make(~height="100%", ())}>
              <Menu.SubMenu key="sub1" title={<span> {ReasonReact.string("Layout")} </span>}>
                <Menu.Item key="Flex"> {nextLink("Flex")} </Menu.Item>
                <Menu.Item key="WingBlank"> {nextLink("WingBlank")} </Menu.Item>
                <Menu.Item key="WhiteSpace"> {nextLink("WhiteSpace")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub2" title={<span> {ReasonReact.string("Navigation")} </span>}>
                <Menu.Item key="Drawer"> {nextLink("Drawer")} </Menu.Item>
                <Menu.Item key="Menu"> {nextLink("Menu (not)")} </Menu.Item>
                <Menu.Item key="NavBar"> {nextLink("NavBar")} </Menu.Item>
                <Menu.Item key="Popover"> {nextLink("Popover")} </Menu.Item>
                <Menu.Item key="Pagination"> {nextLink("Pagination")} </Menu.Item>
                <Menu.Item key="SegmentedControl"> {nextLink("SegmentedControl")} </Menu.Item>
                <Menu.Item key="Tabs"> {nextLink("Tabs")} </Menu.Item>
                <Menu.Item key="TabBar"> {nextLink("TabBar")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub3" title={<span> {ReasonReact.string("Data Entry")} </span>}>
                <Menu.Item key="Button"> {nextLink("Button")} </Menu.Item>
                <Menu.Item key="Calendar"> {nextLink("Calendar", ~todo=true)} </Menu.Item>
                <Menu.Item key="Checkbox"> {nextLink("Checkbox")} </Menu.Item>
                <Menu.Item key="DatePicker"> {nextLink("DatePicker", ~todo=true)} </Menu.Item>
                <Menu.Item key="DatePickerView"> {nextLink("DatePickerView", ~todo=true)} </Menu.Item>
                <Menu.Item key="ImagePicker"> {nextLink("ImagePicker", ~todo=true)} </Menu.Item>
                <Menu.Item key="InputItem"> {nextLink("InputItem", ~todo=true)} </Menu.Item>
                <Menu.Item key="PickerView"> {nextLink("PickerView", ~todo=true)} </Menu.Item>
                <Menu.Item key="Picker"> {nextLink("Picker")} </Menu.Item>
                <Menu.Item key="Radio"> {nextLink("Radio")} </Menu.Item>
                <Menu.Item key="Range"> {nextLink("Range", ~todo=true)} </Menu.Item>
                <Menu.Item key="Switch"> {nextLink("Switch")} </Menu.Item>
                <Menu.Item key="SearchBar"> {nextLink("SearchBar")} </Menu.Item>
                <Menu.Item key="Slider"> {nextLink("Slider", ~todo=true)} </Menu.Item>
                <Menu.Item key="Stepper"> {nextLink("Stepper", ~todo=true)} </Menu.Item>
                <Menu.Item key="TextareaItem"> {nextLink("TextareaItem")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub4" title={<span> {ReasonReact.string("Data Display")} </span>}>
                <Menu.Item key="Accordian"> {nextLink("Accordian", ~todo=true)} </Menu.Item>
                <Menu.Item key="Badge"> {nextLink("Badge")} </Menu.Item>
                <Menu.Item key="Carousel"> {nextLink("Carousel", ~todo=true)} </Menu.Item>
                <Menu.Item key="Card"> {nextLink("Card")} </Menu.Item>
                <Menu.Item key="Grid"> {nextLink("Grid")} </Menu.Item>
                <Menu.Item key="Icon"> {nextLink("Icon")} </Menu.Item>
                <Menu.Item key="List"> {nextLink("List")} </Menu.Item>
                <Menu.Item key="NoticeBar"> {nextLink("NoticeBar")} </Menu.Item>
                <Menu.Item key="Steps"> {nextLink("Steps", ~todo=true)} </Menu.Item>
                <Menu.Item key="Tag"> {nextLink("Tag", ~todo=true)} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub5" title={<span> {ReasonReact.string("Feedback")} </span>}>
                <Menu.Item key="ActionSheet"> {nextLink("ActionSheet", ~todo=true)} </Menu.Item>
                <Menu.Item key="ActivityIndicator"> {nextLink("ActivityIndicator")} </Menu.Item>
                <Menu.Item key="Modal"> {nextLink("Modal")} </Menu.Item>
                <Menu.Item key="Progress"> {nextLink("Progress", ~todo=true)} </Menu.Item>
                <Menu.Item key="Toast"> {nextLink("Toast")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub6" title={<span> {ReasonReact.string("Gesture")} </span>}>
                <Menu.Item key="PullToRefresh"> {nextLink("PullToRefresh", ~todo=true)} </Menu.Item>
                <Menu.Item key="SwipeAction"> {nextLink("SwipeAction", ~todo=true)} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub7" title={<span> {ReasonReact.string("Combination")} </span>}>
                <Menu.Item key="ListView"> {nextLink("ListView", ~todo=true)} </Menu.Item>
                <Menu.Item key="Result"> {nextLink("Result", ~todo=true)} </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Layout.Sider>
          <Layout.Content style={ReactDOMRe.Style.make(~padding="0 24px", ~minHeight="700px", ~minWidth="377px", ())}>
            <div style={ReactDOMRe.Style.make(~padding="0 24px", ~minHeight="620px", ~minWidth="377px", ())}>
              <Iframe url={iframePage(which)} width="377px" height="620px" position="relative" />
            </div>
          </Layout.Content>
        </Layout>
      </Layout.Content>
      <Layout.Footer style={ReactDOMRe.Style.make(~textAlign="center", ())}>
        {ReasonReact.string("Gell.com ")}
        copy
        {ReasonReact.string(" 2018 Created by Gell")}
      </Layout.Footer>
    </Layout>,
};

[@bs.deriving abstract]
type jsProps = {which: string};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(~which=jsProps->whichGet, [||]));
