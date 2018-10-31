open AntdMobile;

type state = {
  listDisabled: bool,
  drawerOpen: bool,
  popoverVisible: bool,
  selectedTab: string,
  switchChecked: bool,
  modal1: bool,
  modal2: bool,
};

type action =
  | DisableList
  | DrawerClick
  | PopoverVisible(bool)
  | PopoverClick
  | TabBarClick(string)
  | SwitchClick
  | ShowModal1
  | HideModal1
  | ShowModal2
  | HideModal2;

let component = ReasonReact.reducerComponent("MobileIframe");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

[@bs.deriving jsConverter]
type myResponseVariant = [ | `Button | `WingBlank];

/*
 import "../../../assets/antdMobile.less";
 background-color: #f5f5f9;
 */

[%bs.raw {| require("../../../assets/antdMobile.less") |}];
[%bs.raw {| require("../../../assets/antd-mobile-examples.less") |}];

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="Button");

let t = text => ReasonReact.string(text);

let placeHolder =
  <div
    style={
      ReactDOMRe.Style.make(
        ~backgroundColor="#ebebef",
        ~color="#bbb",
        ~textAlign="center",
        ~height="30px",
        ~lineHeight="30px",
        ~width="100%",
        (),
      )
    }>
    {t("Block")}
  </div>;

module PlaceHolder = {
  module PlaceHolderStyles = {
    open Css;

    let inlineRaw = [
      backgroundColor(hex("ebebef")),
      color(hex("bbb")),
      textAlign(center),
      height(px(30)),
      lineHeight(px(30)),
      width(pct(100.)),
    ];

    let style = (overrides: list(Css.rule)) => style(merge([overrides, inlineRaw]));
  };

  let finalClassName = className =>
    switch (className) {
    | None => PlaceHolderStyles.style([])
    | Some(actualClassName) => actualClassName
    };
  let pComponent = ReasonReact.statelessComponent("PlaceHolder");

  let make = (~className=?, ~_style=?, _children) => {
    ...pComponent,
    render: _self => <div className={finalClassName(className)}> {t("Block")} </div>,
  };
};

module FlexStyles = {
  open Css;

  let inlineRaw = [important(width(px(80))), margin4(~top=px(9), ~right=px(9), ~bottom=px(9), ~left=px(0))];
  let inline = style(inlineRaw);
  let smallRaw = [important(height(px(20))), important(lineHeight(px(20)))];
  let small = style(smallRaw);
  let inlineSmallRaw = merge([smallRaw, inlineRaw]);
  let inlineSmall = style(inlineSmallRaw);

  let subTitle = style([color(rgb(187, 187, 187))]);
};

let inline = ReactDOMRe.Style.make(~width="80px!important", ~margin="9px 9px 9px 0", ());
let small = ReactDOMRe.Style.make(~height="20px!important", ~lineHeight="20px!important", ());
let subTitle = ReactDOMRe.Style.make(~color="#888", ~fontSize="14px", ~padding="30px 0 18px 0", ());

let flexExample =
  <div className="flex-container" style={ReactDOMRe.Style.make(~margin="0 15px", ())}>
    <div className="sub-title" style=subTitle> {t("Basic")} </div>
    <Flex> <Flex.Item> <PlaceHolder /> </Flex.Item> <Flex.Item> <PlaceHolder /> </Flex.Item> </Flex>
    <WhiteSpace size=`lg />
    <Flex>
      <Flex.Item> <PlaceHolder /> </Flex.Item>
      <Flex.Item> <PlaceHolder /> </Flex.Item>
      <Flex.Item> <PlaceHolder /> </Flex.Item>
    </Flex>
    <WhiteSpace size=`lg />
    <Flex>
      <Flex.Item> <PlaceHolder /> </Flex.Item>
      <Flex.Item> <PlaceHolder /> </Flex.Item>
      <Flex.Item> <PlaceHolder /> </Flex.Item>
      <Flex.Item> <PlaceHolder /> </Flex.Item>
    </Flex>
    <WhiteSpace size=`lg />
    <div className="sub-title" style=subTitle> {t("Wrap")} </div>
    <Flex wrap=`wrap>
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
    </Flex>
    <WhiteSpace size=`lg />
    <div className="sub-title" style=subTitle> {t("Align")} </div>
    <Flex justify=`center>
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
    </Flex>
    <WhiteSpace />
    <Flex justify=`flexEnd>
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
    </Flex>
    <WhiteSpace />
    <Flex justify=`between>
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
    </Flex>
    <WhiteSpace />
    <Flex align=`start>
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineSmallRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
    </Flex>
    <WhiteSpace />
    <Flex align=`flexEnd>
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineSmallRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
    </Flex>
    <WhiteSpace />
    <Flex align=`baseline>
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineSmallRaw)} />
      <PlaceHolder className={PlaceHolder.PlaceHolderStyles.style(FlexStyles.inlineRaw)} />
    </Flex>
  </div>;

let wingBlankExample =
  <div style={ReactDOMRe.Style.make(~paddingTop="15px", ())}>
    <WingBlank> placeHolder </WingBlank>
    <WhiteSpace size=`lg />
    <WingBlank size=`md> placeHolder </WingBlank>
    <WhiteSpace size=`lg />
    <WingBlank size=`sm> placeHolder </WingBlank>
  </div>;

let whiteSpaceExample =
  <div>
    <WhiteSpace size=`xs />
    <PlaceHolder />
    <WhiteSpace size=`sm />
    <PlaceHolder />
    <WhiteSpace />
    <PlaceHolder />
    <WhiteSpace size=`lg />
    <PlaceHolder />
    <WhiteSpace size=`xl />
    <PlaceHolder />
  </div>;

let sideBar =
  <List>
    {
      ListLabels.map(
        ~f=
          x =>
            if (x === 0) {
              <List.Item
                key={string_of_int(x)}
                thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                multipleLine=true>
                {t("Category")}
              </List.Item>;
            } else {
              <List.Item key={string_of_int(x)} thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">
                {t("Category")}
                {t(string_of_int(x))}
              </List.Item>;
            },
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      )
    }
  </List>;

let sideBar2 =
  <List>
    <List.Item key="0" thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png" multipleLine=true>
      {t("Category")}
    </List.Item>
  </List>;

let drawerStyle = ReactDOMRe.Style.make(~minHeight="100vh", ());
let drawerContentStyle = ReactDOMRe.Style.make(~color="#A6A6A6", ~textAlign="center", ~paddingTop="42px", ());

let drawerExample = (open_, drawerClick) =>
  <div>
    <NavBar icon={<Icon _type=`ellipsis />} onLeftClick=drawerClick> {t("Basic")} </NavBar>
    <Drawer
      className="my-drawer"
      style=drawerStyle
      enableDragHandle=true
      contentStyle=drawerContentStyle
      sidebar=sideBar2
      _open=open_
      onOpenChange=drawerClick>
      {t("Click upper-left corner")}
    </Drawer>
  </div>;

let listExample = (disabled, onClick) =>
  <div>
    <List renderHeader="Basic Style" className="my-list">
      <List.Item extra={t("extra content")}> {t("Title")} </List.Item>
    </List>
    <List renderHeader="Subtitle" className="my-list">
      <List.Item arrow=`horizontal multipleLine=true onClick={_event => ()}>
        {t("Title")}
        <List.Item.Brief> {t("subtitle")} </List.Item.Brief>
      </List.Item>
      <List.Item arrow=`horizontal multipleLine=true platform=`android onClick={_event => ()}>
        {t("ListItem ?Android")}
        <List.Item.Brief>
          {t("There may have water ripple effect of")}
          <br />
          {t("material if you set the click event.")}
        </List.Item.Brief>
      </List.Item>
      <List.Item
        arrow=`horizontal thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine=true>
        {t("Title")}
        <List.Item.Brief> {t("subtitle")} </List.Item.Brief>
      </List.Item>
    </List>
    <List renderHeader="Customized Right Side?Empty Content / Text / Image?" className="my-list">
      <List.Item> {t("Title")} </List.Item>
      <List.Item arrow=`horizontal> {t("Title")} </List.Item>
      <List.Item extra={t("extra content")} arrow=`horizontal> {t("Title")} </List.Item>
      <List.Item
        extra={t("10:30")}
        align=`top
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        multipleLine=true>
        {t("Title")}
        <List.Item.Brief> {t("subtitle")} </List.Item.Brief>
      </List.Item>
    </List>
    <List renderHeader="Align Vertical Center" className="my-list">
      <List.Item multipleLine=true extra={t("extra content")}>
        {t("Title")}
        <List.Item.Brief> {t("subtitle")} </List.Item.Brief>
      </List.Item>
    </List>
    <List renderHeader="Icon in the left">
      <List.Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" arrow=`horizontal>
        {t("My wallet")}
      </List.Item>
      <List.Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow=`horizontal>
        {t("My Cost Ratio")}
      </List.Item>
    </List>
    <List renderHeader="Text Wrapping" className="my-list">
      <List.Item> {t("Single line?long text will be hidden with ellipsis")} </List.Item>
      <List.Item wrap=true>
        {t("Multiple line?long text will wrap?Long Text Long Text Long Text Long Text Long Text Long Text")}
      </List.Item>
      <List.Item extra={t("extra content")} multipleLine=true align=`top wrap=true>
        {t("Multiple line and long text will wrap. Long Text Long Text Long Text")}
      </List.Item>
      <List.Item extra={t("no arrow")} arrow=`empty className="spe" wrap=true>
        {
          t(
            "In rare cases, the text of right side will wrap in the single line with long text. long text long text long text",
          )
        }
      </List.Item>
    </List>
    <List renderHeader="Other" className="my-list">
      <List.Item disabled extra={t("")} onClick> {t("Click to disable")} </List.Item>
      <List.Item>
        <select defaultValue="1">
          <option value="1"> {t("Html select element")} </option>
          <option value="2" disabled> {t("Unable to select")} </option>
          <option value="3"> {t("option 3")} </option>
        </select>
      </List.Item>
    </List>
  </div>;

let buttonExample =
  <div style={ReactDOMRe.Style.make(~paddingTop="15px", ())}>
    <WingBlank> <Button _type=`primary> {t("Button Mobile")} </Button> </WingBlank>
  </div>;

let gridStyle = ReactDOMRe.Style.make(~padding="12.5px", ());
let gridImageStyle = ReactDOMRe.Style.make(~color="#888", ~fontSize="14px", ~marginTop="12px", ());
let gridLastStyle = ReactDOMRe.Style.make(~height="150px", ~background="rgba(0,0,0,.05)'", ());

let gridData: list(Grid.dataProps) = [
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"), ~text=t("1")),
];

let gridData1: list(Grid.dataProps) = [
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
  Grid.dataProps(~icon=t("https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png"), ~text=t("")),
];

let subTitle = ReactDOMRe.Style.make(~color="#888", ~fontSize="14px", ~padding="15px 0 9px 15px", ());

Css.(global("not-square-grid .am-grid-icon", [width(px(40)), height(px(60))]));

/*
 .not-square-grid .am-grid-icon {
   width: 40px;
   height: 60px;
 }
 */

let gridExample =
  <div>
    <div className="sub-title"> {t("Always square grid item")} </div>
    <Grid data=gridData />
    <div className="sub-title" style=subTitle> {t("Grid item adjust accroiding to img size")} </div>
    <Grid data=gridData square=false className="not-square-grid" />
    <div className="sub-title" style=subTitle> {t("ColumnNum=3")} </div>
    <Grid data=gridData columnNum=3 />
    <div className="sub-title" style=subTitle> {t("No border")} </div>
    <Grid data=gridData hasLine=false />
    <div className="sub-title" style=subTitle> {t("Carousel")} </div>
    <Grid data=gridData isCarousel=true onClick={el => Js.log(el)} />
    <div className="sub-title" style=subTitle> {t("Custom content")} </div>
    <Grid
      data=gridData1
      columnNum=3
      renderItem={
        dataItem =>
          <div style=gridStyle>
            <img src=dataItem##icon style={ReactDOMRe.Style.make(~width="75px", ~height="75px", ())} alt="" />
            <div style={ReactDOMRe.Style.make(~color="#888", ~fontSize="14px", ~marginTop="12px", ())}>
              <span> {t("I am title..")} </span>
            </div>
          </div>
      }
    />
    <div className="sub-title"> {t("Custom GridCell Style")} </div>
    <Grid data=gridData1 columnNum=3 itemStyle=gridLastStyle />
  </div>;

let menuExample = t("(not yet implemented)");

let navbarExample =
  <div>
    <NavBar
      mode=`light
      icon={<Icon _type=`left />}
      onLeftClick={() => Js.log("onLeftClick")}
      rightContent=[
        <Icon key="0" _type=`search style={ReactDOMRe.Style.make(~marginRight="16px", ())} />,
        <Icon key="1" _type=`ellipsis />,
      ]>
      {t("NavBar")}
    </NavBar>
    <NavBar
      mode=`dark
      leftContent=[t("Back")]
      rightContent=[
        <Icon key="0" _type=`search style={ReactDOMRe.Style.make(~marginRight="16px", ())} />,
        <Icon key="1" _type=`ellipsis />,
      ]>
      {t("NavBar")}
    </NavBar>
  </div>;

let myImg = src =>
  <img src={"https://gw.alipayobjects.com/zos/rmsportal/" ++ src ++ ".svg"} className="am-icon am-icon-xs" alt="" />;

let overflow: AntdMobile_Popover.overflow = {"adjustY": 0, "adjustX": 0};

let offset = [|(-10), 0|];

let align: AntdMobile_Popover.alignConfig = {"overflow": overflow, "offset": offset};

let popoverExample = (visible, handleVisibleChange, handleSelect) =>
  <div>
    <NavBar
      mode=`light
      rightContent=[
        <Popover
          mask=true
          overlayClassName="fortest"
          overlayStyle={ReactDOMRe.Style.make(~color="currentColor", ())}
          visible
          overlay=[
            <Popover.Item key="4" value="scan" icon={myImg("tOtXhkIWzwotgGSeptou")}> {t("Scan")} </Popover.Item>,
            <Popover.Item
              key="5"
              value="special"
              icon={myImg("PKAgAqZWJVNwKsAJSmXd")}
              style={ReactDOMRe.Style.make(~whiteSpace="nowrap", ())}>
              {t("My Qrcode")}
            </Popover.Item>,
            <Popover.Item key="6" value="button ct" icon={myImg("uQIYTFeRrjPELImDRrPt")}>
              <span style={ReactDOMRe.Style.make(~marginRight="5px", ())}> {t("Help")} </span>
            </Popover.Item>,
          ]
          align
          onVisibleChange=handleVisibleChange
          onSelect=handleSelect>
          <div
            style={
              ReactDOMRe.Style.make(
                ~height="100%",
                ~padding="0 15px",
                ~marginRight="-15px",
                ~display="flex",
                ~alignItems="center",
                (),
              )
            }>
            <Icon _type=`ellipsis />
          </div>
        </Popover>,
      ]>
      {t("NavBar")}
    </NavBar>
  </div>;

let locale: Pagination.locale = {"prevText": t("Prev"), "nextText": t("Next")};

let customLocale: Pagination.locale = {
  "prevText": <span className="arrow-align"> <Icon _type=`left /> {t("L")} </span>,
  "nextText": <span className="arrow-align"> {t("R")} <Icon _type=`right /> </span>,
};

let paginationExample =
  <div className="pagination-container">
    <p className="sub-title"> {t("Button with text")} </p>
    <Pagination total=5 current=1 locale />
    <p className="sub-title"> {t("Button with text and icon")} </p>
    <Pagination total=5 className="custom-pagination-with-icon" current=1 locale=customLocale />
    <p className="sub-title"> {t("Hide number")} </p>
    <Pagination simple=true total=5 current=1 locale />
    <p className="sub-title"> {t("Show number only")} </p>
    <Pagination mode=`number total=5 current=3 />
    <p className="sub-title"> {t("Point style")} </p>
    <Pagination mode=`pointer total=5 current=2 style={ReactDOMRe.Style.make(~marginBottom="16px", ())} />
  </div>;

let segmentedOnChange: ReactEvent.Mouse.t => unit =
  _e => [%bs.raw
    {| 'console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`)' |}
    /* */
  ];
let segmentedOnValueChange: ReactEvent.Mouse.t => unit = value => Js.log(value);

let segmentedControlExample = (segmentedOnChange, segmentedOnValueChange) =>
  <WingBlank size=`lg className="sc-example">
    <p className="sub-title"> {t("Simplest")} </p>
    <SegmentedControl values=["Segment1", "Segment2"] />
    <p className="sub-title"> {t("Disabled")} </p>
    <SegmentedControl values=["Segment1", "Segment2"] disabled=true />
    <p className="sub-title"> {t("SelectedIndex")} </p>
    <SegmentedControl selectedIndex=1 values=["Segment1", "Segment2", "Segment3"] />
    <p className="sub-title"> {t("TintColor")} </p>
    <SegmentedControl
      values=["Segment1", "Segment2", "Segment3"]
      tintColor="#ff0000"
      style={ReactDOMRe.Style.make(~height="40px", ~width="250px", ())}
    />
    <p className="sub-title"> {t("onChange/onValueChange")} </p>
    <SegmentedControl
      values=["Segment1", "Segment2", "Segment3"]
      onChange=segmentedOnChange
      onValueChange=segmentedOnValueChange
    />
  </WingBlank>;

let tabsData: list(Tabs.tabData) = [
  {"title": <Badge text="3"> {t("First Tab")} </Badge>, "sub": "1"},
  {"title": <Badge text="Second"> {t("Second Tab")} </Badge>, "sub": "2"},
  {"title": <Badge text="third"> {t("Third Tab")} </Badge>, "sub": "3"},
];

let tabStyle =
  ReactDOMRe.Style.make(
    ~display="flex",
    ~alignItems="center",
    ~justifyContent="center",
    ~height="150px",
    ~backgroundColor="#fff",
    (),
  );

let tabsExample =
  <Tabs
    tabs=tabsData
    initialPage=1
    onChange={(_tab, _index) => [%bs.raw {| 'console.log("onChange", index, tab)' |}]}
    onTabClick={(_tab, _index) => [%bs.raw {| 'console.log("onTabClick", index, tab)' |}]}>
    <div style=tabStyle> {t("Content of first tab")} </div>
    <div style=tabStyle> {t("Content of second tab")} </div>
    <div style=tabStyle> {t("Content of third tab")} </div>
  </Tabs>;

let tabBarStyle: string => ReactDOMRe.Style.t =
  (iconUrl: string) =>
    ReactDOMRe.Style.make(
      ~width="22px",
      ~height="22px",
      ~background="url(" ++ iconUrl ++ ") center center /  21px 21px no-repeat",
      (),
    );

let tabBarExample = (selectedTab, setTabBarState) =>
  <div style={ReactDOMRe.Style.make(~height="400px", ())}>
    <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" hidden=false>
      <TabBar.Item
        title="Life"
        key="Life"
        icon={<div style={tabBarStyle("https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg")} />}
        selectedIcon={<div style={tabBarStyle("https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg")} />}
        selected={selectedTab == "blueTab"}
        badge="1"
        onPress={_unit => setTabBarState("blueTab")}>
        {t("Life")}
      </TabBar.Item>
      <TabBar.Item
        icon={<div style={tabBarStyle("https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg")} />}
        selectedIcon={
          <div style={tabBarStyle("https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg")} />
        }
        title="Koubei"
        key="Koubei"
        badge="new"
        selected={selectedTab == "redTab"}
        onPress={_unit => setTabBarState("redTab")}>
        {t("Koubei")}
      </TabBar.Item>
      <TabBar.Item
        icon={<div style={tabBarStyle("https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg")} />}
        selectedIcon={<div style={tabBarStyle("https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg")} />}
        title="Friend"
        key="Friend"
        dot=true
        selected={selectedTab == "greenTab"}
        onPress={_unit => setTabBarState("greenTab")}>
        {t("Friend")}
      </TabBar.Item>
    </TabBar>
  </div>;

let marginLeft = ReactDOMRe.Style.make(~marginLeft="12px", ());
let customOne = ReactDOMRe.Style.make(~width="26px", ~height="26px", ~background="#ddd", ~display="inline-block", ());
let customTwo =
  ReactDOMRe.Style.make(~marginLeft="12px", ~padding="0 3px", ~backgroundColor="#f19736", ~borderRadius="2", ());
let customThree =
  ReactDOMRe.Style.make(~marginLeft="12px", ~padding="0 3px", ~backgroundColor="#21b68a", ~borderRadius="2", ());

let badgeExample =
  <List>
    <List.Item extra={t("extra content")} arrow=`horizontal>
      <Badge dot=true> <span style=customOne /> </Badge>
      <span style=marginLeft> {t("Dot badge")} </span>
    </List.Item>
    <List.Item
      thumb="https://zos.alipayobjects.com/rmsportal/faMhXAxhCzLvveJ.png"
      extra={<Badge text="77" overflowCount=55 />}
      arrow=`horizontal>
      {t("Content")}
    </List.Item>
    <List.Item>
      <Badge text="Corner" corner=true> <div className="corner-badge"> {t("Use corner prop")} </div> </Badge>
    </List.Item>
    <List.Item className="special-badge" extra={<Badge text="Custom" />}> {t("Custom corner")} </List.Item>
    <List.Item extra={t("extra")} arrow=`horizontal>
      <Badge text="0" style=marginLeft> {t("Text number 0")} </Badge>
      <Badge text="new" style=marginLeft />
    </List.Item>
    <List.Item>
      {t("Marketing:")}
      <Badge text="?" hot=true style=marginLeft />
      <Badge text="?" hot=true style=marginLeft />
      <Badge text="?" hot=true style=marginLeft />
      <Badge text="?" hot=true style=marginLeft />
      <Badge text="HOT" hot=true style=marginLeft />
    </List.Item>
    <List.Item>
      {t("Customize")}
      <Badge text="?" style=customTwo />
      <Badge text="NEW" style=customThree />
    </List.Item>
  </List>;

let checkboxExample =
  <div>
    <List renderHeader="CheckboxItem demo">
      <CheckboxItem key="0"> {t("PHD")} </CheckboxItem>
      <CheckboxItem key="1"> {t("Bachelor")} </CheckboxItem>
      <CheckboxItem key="2"> {t("College")} </CheckboxItem>
      <CheckboxItem key="disabled" disabled=true defaultChecked=true multipleLine=true>
        {t("Undergraduate")}
        <List.Item.Brief> {t("Auxiliary text")} </List.Item.Brief>
      </CheckboxItem>
    </List>
    <Flex>
      <Flex.Item>
        <AgreeItem onChange={_e => Js.log("checkbox")}> {t("Agree")} <a> {t("agreement")} </a> </AgreeItem>
      </Flex.Item>
    </Flex>
  </div>;

let radioExample =
  <div>
    <List renderHeader="RadioItem demo">
      <RadioItem key="2" checked=true> {t("One")} </RadioItem>
      <RadioItem key="1" checked=false> {t("Two")} </RadioItem>
    </List>
  </div>;

let switchExample = (switchChecked, handleSwitch) =>
  <List renderHeader="Form switch">
    <List.Item extra={<Switch checked=switchChecked onClick=handleSwitch />}> {t("On")} </List.Item>
  </List>;

let searchBarExample =
  <div>
    <WingBlank> <div className="sub-title"> {t("Normal")} </div> </WingBlank>
    <SearchBar placeholder="Search" maxLength=8 />
  </div>;

let textareaItemExample = <List renderHeader="Count"> <TextareaItem rows=5 count=100 /> </List>;

let iconList = [
  `checkCircle,
  `check,
  `checkCircleO,
  `crossCircle,
  `cross,
  `crossCircleO,
  `up,
  `down,
  `left,
  `right,
  `ellipsis,
  `loading,
  `search,
];

let iconData: list(Grid.dataProps) =
  ListLabels.map(~f=item => Grid.dataProps(~icon=<Icon _type=item />, ~text=t("text")), iconList);

let iconExample = <Grid data=iconData columnNum=3 hasLine=false />;

let cardExample =
  <WingBlank size=`lg>
    <WhiteSpace size=`lg />
    <Card>
      <Card.Header
        title={t("This is title")}
        thumb={t("https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg")}
        extra={<span> {t("this is extra")} </span>}
      />
      <Card.Body> <div> {t("This is content of `Card`")} </div> </Card.Body>
      <Card.Footer content={t("footer content")} extra={<div> {t("extra footer content")} </div>} />
    </Card>
    <WhiteSpace size=`lg />
  </WingBlank>;

let marqueeStyle = ReactDOMRe.Style.make(~padding="0 7.5px", ());

let noticeBarExample =
  <div>
    <WhiteSpace size=`lg />
    <NoticeBar
      marqueeProps={NoticeBar.marqueeProps(~loop=true, ~style=marqueeStyle, ~leading=0, ~trailing=0, ~fps=40)}>
      {t("Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.")}
    </NoticeBar>
    <WhiteSpace size=`lg />
    <NoticeBar mode=`link onClick={() => Js.log("1")}>
      {t("Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.")}
    </NoticeBar>
    <WhiteSpace size=`lg />
    <NoticeBar mode=`closable> {t("Remove the default icon.")} </NoticeBar>
    <WhiteSpace size=`lg />
    <NoticeBar mode=`closable icon={<Icon _type=`checkCircleO size=`xxs />}> {t("Customized icon.")} </NoticeBar>
    <WhiteSpace size=`lg />
    <NoticeBar mode=`closable action={<span style={ReactDOMRe.Style.make(~color="a1a1a1", ())}> {t("yay")} </span>}>
      {t("Closable demo for `actionText`.")}
    </NoticeBar>
    <WhiteSpace size=`lg />
    <NoticeBar mode=`link action={<span> {t("yayagain")} </span>}> {t("Link demo for `actionText`.")} </NoticeBar>
  </div>;

let activityIndicatorExample =
  <div>
    <WingBlank>
      <div className="loading-container">
        <p className="sub-title"> {t("Without text")} </p>
        <div className="loading-example"> <ActivityIndicator animating=true /> </div>
        <p className="sub-title"> {t("With text")} </p>
        <div className="loading-example"> <ActivityIndicator text="Loading..." /> </div>
        <p className="sub-title"> {t("With large size and customized text style")} </p>
        <div className="loading-example">
          <div className="align">
            <ActivityIndicator size=`large />
            <span style={ReactDOMRe.Style.make(~marginTop="8", ())}> {t("Loading...")} </span>
          </div>
        </div>
      </div>
    </WingBlank>
  </div>;

/*
 import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';

                    function closest(el, selector) {
                      const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
                      while (el) {
                        if (matchesSelector.call(el, selector)) {
                          return el;
                        }
                        el = el.parentElement;
                      }
                      return null;
                    }

                    class App extends React.Component {
                      constructor(props) {
                        super(props);
                        this.state = {
                          modal1: false,
                          modal2: false,
                        };
                      }
                      showModal = key => (e) => {
                        e.preventDefault(); // ?? Android ?????
                        this.setState({
                          [key]: true,
                        });
                      }
                      onClose = key => () => {
                        this.setState({
                          [key]: false,
                        });
                      }

                      onWrapTouchStart = (e) => {
                        // fix touch to scroll background page on iOS
                        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
                          return;
                        }
                        const pNode = closest(e.target, '.am-modal-content');
                        if (!pNode) {
                          e.preventDefault();
                        }
                      }

                      render() {
                        return (
 */

let modalExample = (modal1, modal2, modalShow1, modalClose1, modalShow2, modalClose2) =>
  <WingBlank>
    <Button onClick=modalShow1> {t("basic")} </Button>
    <WhiteSpace />
    <Modal
      visible=modal1
      transparent=true
      maskClosable=false
      onClose=modalClose1
      title={t("Title")}
      footer=[
        Modal.footer(~text="Ok", ~onPress=() => {
          Js.log("ok");
          modalClose1();
          ();
        }),
      ]>
      <div style={ReactDOMRe.Style.make(~height="100", ~overflow="scroll", ())}>
        {t("scoll content...")}
        <br />
      </div>
    </Modal>
    <Button onClick=modalShow2> {t("popup")} </Button>
    <WhiteSpace />
    <Modal popup=true visible=modal2 onClose=modalClose2 animationType=`slideUp>
      <List renderHeader="somethingsomething" className="popup-list">
        <List.Item key="one"> {t("one")} </List.Item>
        <List.Item key="two"> {t("two")} </List.Item>
        <List.Item key="three"> {t("three")} </List.Item>
        <List.Item> <Button _type=`primary onClick={_event => modalClose2()}> {t("something")} </Button> </List.Item>
      </List>
    </Modal>
  </WingBlank>;

/*
 import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

 function showToast() {
   Toast.info('This is a toast tips !!!', 1);
 }

 function showToastNoMask() {
   Toast.info('Toast without mask !!!', 2, null, false);
 }

 function successToast() {
   Toast.success('Load success !!!', 1);
 }

 function failToast() {
   Toast.fail('Load failed !!!', 1);
 }

 function offline() {
   Toast.offline('Network connection failed !!!', 1);
 }

 function loadingToast() {
   Toast.loading('Loading...', 1, () => {
     console.log('Load complete !!!');
   });
 }

 const customIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
     <path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
   </svg>
 );

 class ToastExample extends React.Component {
   componentDidMount() {
     Toast.loading('Loading...', 30, () => {
       console.log('Load complete !!!');
     });

     setTimeout(() => {
       Toast.hide();
     }, 3000);
   }
   render() {
     return (
       <WingBlank>
         <WhiteSpace />
         <Button onClick={showToast}>text only</Button>
         <WhiteSpace />
         <Button onClick={showToastNoMask}>without mask</Button>
         <WhiteSpace />
         <Button onClick={() => Toast.info(customIcon(), 1)}>
           cumstom icon
         </Button>
         <WhiteSpace />
         <Button onClick={successToast}>success</Button>
         <WhiteSpace />
         <Button onClick={failToast}>fail</Button>
         <WhiteSpace />
         <Button onClick={offline}>network failure</Button>
         <WhiteSpace />
         <Button onClick={loadingToast}>loading</Button>
         <WhiteSpace />
       </WingBlank>
     );
   }
 }

 ReactDOM.render(<ToastExample />, mountNode);
 */

let onCloseToast = (.) => Js.log("clicked");
let showToast = () => Toast.info(t("This is a toast tips !!!"), 1, onCloseToast, true);

let toastExample =
  <WingBlank>
    <WhiteSpace />
    <Button onClick={_event => showToast()}> {t("text only")} </Button>
    <WhiteSpace />
  </WingBlank>;

let make = (~which, _children) => {
  ...component,
  initialState: () => {
    listDisabled: false,
    drawerOpen: true,
    popoverVisible: false,
    selectedTab: "redTab",
    switchChecked: true,
    modal1: false,
    modal2: false,
  },
  reducer: (action, state) =>
    switch (action) {
    | DisableList => ReasonReact.Update({...state, listDisabled: true})
    | DrawerClick => ReasonReact.Update({...state, drawerOpen: !state.drawerOpen})
    | PopoverVisible(popoverVisible) => ReasonReact.Update({...state, popoverVisible})
    | PopoverClick => ReasonReact.Update({...state, popoverVisible: false})
    | TabBarClick((selectedTab: string)) => ReasonReact.Update({...state, selectedTab})
    | SwitchClick => ReasonReact.Update({...state, switchChecked: !state.switchChecked})
    | ShowModal1 => ReasonReact.Update({...state, modal1: true})
    | HideModal1 => ReasonReact.Update({...state, modal1: false})
    | ShowModal2 => ReasonReact.Update({...state, modal2: true})
    | HideModal2 => ReasonReact.Update({...state, modal2: false})
    },
  render: self =>
    /* <ReactHelmet> <title> {t("AboutPage")} </title> </ReactHelmet> */
    /* <LayoutRe language="en"> <Button> {t("Button Mobile")} </Button> </LayoutRe>, */
    <LayoutRe language="en">
      <div>
        {
          switch (which) {
          /* Layout */
          | "Flex" => flexExample
          | "WingBlank" => wingBlankExample
          | "WhiteSpace" => whiteSpaceExample

          /* Navigation */
          | "Drawer" => drawerExample(self.state.drawerOpen, _event => self.send(DrawerClick))
          | "Menu" => menuExample
          | "NavBar" => navbarExample
          | "Popover" =>
            popoverExample(
              self.state.popoverVisible,
              popoverVisible => self.send(PopoverVisible(popoverVisible)),
              _event => self.send(PopoverClick),
            )
          | "Pagination" => paginationExample
          | "SegmentedControl" => segmentedControlExample(segmentedOnChange, segmentedOnValueChange)
          | "Tabs" => tabsExample
          | "TabBar" => tabBarExample(self.state.selectedTab, selectedTab => self.send(TabBarClick(selectedTab)))

          /* Data Entry */
          | "Button" => buttonExample
          | "Checkbox" => checkboxExample
          | "Radio" => radioExample
          | "Switch" => switchExample(self.state.switchChecked, _selectedTab => self.send(SwitchClick))
          | "SearchBar" => searchBarExample
          | "TextareaItem" => textareaItemExample

          /* Data Display */
          | "Badge" => badgeExample
          | "Card" => cardExample
          | "Grid" => gridExample
          | "Icon" => iconExample
          | "List" => listExample(self.state.listDisabled, _event => self.send(DisableList))
          | "NoticeBar" => noticeBarExample

          /* Feedback */
          | "ActivityIndicator" => activityIndicatorExample
          | "Modal" =>
            modalExample(
              self.state.modal1,
              self.state.modal2,
              _event => self.send(ShowModal1),
              _event => self.send(HideModal1),
              _event => self.send(ShowModal2),
              _event => self.send(HideModal2),
            )
          | "Toast" => toastExample
          | _ => buttonExample
          }
        }
      </div>
    </LayoutRe>,
};

[@bs.deriving abstract]
type jsProps = {which: string};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(~which=jsProps->whichGet, [||]));
