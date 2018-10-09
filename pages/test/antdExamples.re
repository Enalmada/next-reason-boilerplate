open Antd;
open Antd.Grid;

[%bs.raw {|require("antd/lib/notification/style")|}];
[%bs.raw {|require("antd/lib/message/style")|}];

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

type state = {
  current: string,
  something: string,
  modalVisible: bool,
};

type action =
  | Click(string)
  | ModalShow
  | ModalHide;

let component = ReasonReact.reducerComponent("Index");

/*
 let handleClick = (e) => {
     Js.log("this is reason" ++ e);
     self.send(Click, "app"))
     /*
     this.setState({
       current: e.key,
     });
     */
   }
   */

/*
 let handleSubmitEscapeHatch = (clickParams:Menu.clickParams) => {

 Js.log("keyx:" ++ clickParams##key);
 }
 */

let config = nextSeoConfig(~canonical="https://www.example.com/antDesign", ~title="Ant Design");

let styles = ReactDOMRe.Style.make(~lineHeight="64px", ());

let menu =
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        {ReasonReact.string("1st menu item")}
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        {ReasonReact.string("2nd menu item")}
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        {ReasonReact.string("3rd menu item")}
      </a>
    </Menu.Item>
  </Menu>;

let codeCollapse = (name, code, text) =>
  <div id=name>
    <h1> {ReasonReact.string(name)} </h1>
    code
    <Collapse bordered=false style={ReactDOMRe.Style.make(~marginTop="10px", ~marginBottom="30px", ())}>
      <Panel header="Code" key=name> text </Panel>
    </Collapse>
  </div>;

let nextLink = component =>
  <Next.Link href={"/test/antdExamples#" ++ component}> <a> {ReasonReact.string(component)} </a> </Next.Link>;

let buttonCode = <Button _type=`primary> {ReasonReact.string("Button here")} </Button>;

let buttonText = "<Button _type=`primary>{ReasonReact.string(\"Button here\")}</Button>";

let buttonExample = codeCollapse("Button", buttonCode, buttonText);

let iconCode = <Icon type_="laptop" />;
let iconText = "<Icon type_=\"laptop\" />";
let iconExample = codeCollapse("Icon", iconCode, iconText);

let gridCode =
  <div>
    <Row
      style={ReactDOMRe.Style.make(~color="white", ~background="blue", ~textAlign="center", ~marginBottom="10px", ())}>
      <Col span=12> {ReasonReact.string("col-12")} </Col>
      <Col span=12> {ReasonReact.string("col-12")} </Col>
    </Row>
    <Row
      style={ReactDOMRe.Style.make(~color="white", ~background="blue", ~textAlign="center", ~marginBottom="10px", ())}>
      <Col span=8> {ReasonReact.string("col-8")} </Col>
      <Col span=8> {ReasonReact.string("col-8")} </Col>
      <Col span=8> {ReasonReact.string("col-8")} </Col>
    </Row>
    <Row
      style={ReactDOMRe.Style.make(~color="white", ~background="blue", ~textAlign="center", ~marginBottom="10px", ())}>
      <Col span=6> {ReasonReact.string("col-6")} </Col>
      <Col span=6> {ReasonReact.string("col-6")} </Col>
      <Col span=6> {ReasonReact.string("col-6")} </Col>
      <Col span=6> {ReasonReact.string("col-6")} </Col>
    </Row>
  </div>;

let gridText = "<Row
                            style={
                              ReactDOMRe.Style.make(~color=\"white\", ~background=\"blue\", ~textAlign=\"center\", ~marginBottom=\"10px\", ())
                            }>
                            <Col span=12> {ReasonReact.string(\"col-12\")} </Col>
                            <Col span=12> {ReasonReact.string(\"col-12\")} </Col>
                          </Row>";

let gridExample = codeCollapse("Grid", gridCode, gridText);

let layoutCode =
  <Layout>
    <Header style={ReactDOMRe.Style.make(~color="white", ())}> {ReasonReact.string("Header")} </Header>
    <Content> {ReasonReact.string("Content")} </Content>
    <Footer> {ReasonReact.string("Footer")} </Footer>
  </Layout>;

let layoutText = "<Layout>
 <Header>{ReasonReact.string(\"Header\")}</Header>
 <Content>{ReasonReact.string(\"Content\")}</Content>
 <Footer>{ReasonReact.string(\"Footer\")}</Footer>
</Layout>";

let layoutExample = codeCollapse("Layout", layoutCode, layoutText);

let affixCode = <Affix offsetTop=0> <Button _type=`primary> {ReasonReact.string("Header")} </Button> </Affix>;

let affixText = "";
let affixExample = codeCollapse("Affix", affixCode, affixText);

let dropdownCode =
  <Dropdown overlay=menu>
    <a className="ant-dropdown-link" href="#"> {ReasonReact.string("Hover me")} <Icon type_=IconName.down /> </a>
  </Dropdown>;

let dropdownText = "<Dropdown overlay=menu>
                                                                                        <a className=\"ant-dropdown-link\" href=\"#\">
                                                                                          {ReasonReact.string(\"Hover me\")}
                                                                                          <Icon type_=IconName.down />
                                                                                        </a>
                                                                                      </Dropdown>";

let dropdownExample = codeCollapse("Dropdown", dropdownCode, dropdownText);

let breadcrumbCode =
  <Breadcrumb>
    <Breadcrumb.Item> {ReasonReact.string("Home")} </Breadcrumb.Item>
    <Breadcrumb.Item> <a href=""> {ReasonReact.string("Application Center")} </a> </Breadcrumb.Item>
    <Breadcrumb.Item> <a href=""> {ReasonReact.string("Application List")} </a> </Breadcrumb.Item>
    <Breadcrumb.Item> {ReasonReact.string("An Application")} </Breadcrumb.Item>
  </Breadcrumb>;

let breadcrumbText = "<Breadcrumb>
    <Breadcrumb.Item>{ReasonReact.string(\"Home\")}</Breadcrumb.Item>
    <Breadcrumb.Item><a href=\"\">{ReasonReact.string(\"Application Center\")}</a></Breadcrumb.Item>
    <Breadcrumb.Item><a href=\"\">{ReasonReact.string(\"Application List\")}</a></Breadcrumb.Item>
    <Breadcrumb.Item>{ReasonReact.string(\"An Application\")}</Breadcrumb.Item>
  </Breadcrumb>";

let breadcrumbExample = codeCollapse("Breadcrumb", breadcrumbCode, breadcrumbText);

let menuCode =
  <Menu mode=`Horizontal>
    <Menu.Item key="mail"> <Icon type_="mail" /> {ReasonReact.string("Navigation One")} </Menu.Item>
    <Menu.Item key="app" disabled=false> <Icon type_="appstore" /> {ReasonReact.string("Navigation Two")} </Menu.Item>
  </Menu>;

let menuText = "<Menu
  onClick=(event => self.send(Click(event##key)))
  selectedKeys=[self.state.current]
  mode=`Horizontal
>
  <Menu.Item key=\"mail\">
    <Icon type_=\"mail\" />{ReasonReact.string(\"Navigation One\")}
  </Menu.Item>
  <Menu.Item key=\"app\" disabled=false>
    <Icon type_=\"appstore\" />{ReasonReact.string(\"Navigation Two\")}
  </Menu.Item>
</Menu>";

let menuExample = codeCollapse("Menu", menuCode, menuText);

let paginationCode = <Pagination defaultCurrent=1 total=50 />;
let paginationText = "<Pagination defaultCurrent={1} total={50} />";
let paginationExample = codeCollapse("Pagination", paginationCode, paginationText);

let autocompleteCode =
  <AutoComplete
    dataSource=["bla"]
    style={ReactDOMRe.Style.make(~width="200px", ())}
    placeholder="input here"
  />;

let autocompleteText = "<AutoComplete
   dataSource=[\"bla\"]
   style={ReactDOMRe.Style.make(~width=\"200px\", ())}
   placeholder=\"input here\"
 />";

let autocompleteExample = codeCollapse("AutoComplete", autocompleteCode, autocompleteText);

let checkboxCode = <Checkbox> {ReasonReact.string("Checkbox")} </Checkbox>;
let checkboxText = "<Checkbox onChange={onChange}>{ReasonReact.string(\"Checkbox\")}</Checkbox>";
let checkboxExample = codeCollapse("Checkbox", checkboxCode, checkboxText);

let datepickerCode = <DatePicker />;
let datepickerText = "<DatePicker />";
let datepickerExample = codeCollapse("DatePicker", datepickerCode, datepickerText);

let formPrefix = <Icon type_="user" style={ReactDOMRe.Style.make(~color="rgba(0,0,0,.25)", ())} />;

let formCode =
  <Form layout=`Inline> <Form.Item> <Input prefix=formPrefix placeholder="Username" /> </Form.Item> </Form>;

let formText = "<Form layout=`Inline> <Form.Item> <Input prefix=formPrefix placeholder=\"Username\" /> </Form.Item> </Form>";
let formExample = codeCollapse("Form", formCode, formText);

let inputNumberCode = <InputNumber min=1. max=10. defaultValue=3. />;

let inputNumberText = "<InputNumber min=1. max=10. defaultValue=3. />";
let inputNumberExample = codeCollapse("InputNumber", inputNumberCode, inputNumberText);

let radioCode =
  <Radio.Group value="1">
    <Radio value="1"> {ReasonReact.string("A")} </Radio>
    <Radio value="2"> {ReasonReact.string("B")} </Radio>
  </Radio.Group>;

let radioText = " <Radio.Group value=\"1\">
                                                               <Radio value=\"1\">{ReasonReact.string(\"A\")}</Radio>
                                                               <Radio value=\"2\">{ReasonReact.string(\"B\")}</Radio>
                                                             </Radio.Group> * Note: don't worry about not changing. Need code for that.";
let radioExample = codeCollapse("Radio", radioCode, radioText);

let rateCode = <Rate />;
let rateText = "<Rate />";
let rateExample = codeCollapse("Rate", rateCode, rateText);

let selectCode =
  <Select defaultValue="lucy" style={ReactDOMRe.Style.make(~width="120px", ())}>
    <Select.Option value="jack"> {ReasonReact.string("Jack")} </Select.Option>
    <Select.Option value="lucy"> {ReasonReact.string("Lucy")} </Select.Option>
    <Select.Option value="disabled" disabled=true> {ReasonReact.string("Disabled")} </Select.Option>
    <Select.Option value="Yiminghe"> {ReasonReact.string("yiminghe")} </Select.Option>
  </Select>;

let selectText = "<Select defaultValue=\"lucy\" style={ReactDOMRe.Style.make(~width=\"120px\", ())}>
                                                              <Select.Option value=\"jack\">{ReasonReact.string(\"Jack\")}</Select.Option>

                                                            </Select>";
let selectExample = codeCollapse("Select", selectCode, selectText);

let paragraphParams: Antd_Skeleton.paragraphProps = {"rows": 4, "width": 20};

let skeletonCode = <Skeleton title=false active=true paragraph=paragraphParams />;
let skeletonText = "let paragraphParams: Antd_Skeleton.paragraphProps = {\"rows\": 4, \"width\": 20}; <Skeleton title=false active=true paragraph=paragraphParams />";
let skeletonExample = codeCollapse("Skeleton", skeletonCode, skeletonText);

let switchCode = <Switch defaultChecked=true />;
let switchText = "<Switch defaultChecked=true  />";
let switchExample = codeCollapse("Switch", switchCode, switchText);

/*
 Getting this Warning:
 React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: object.
 */

let timepickerCode = <TimePicker use12Hours=true />;
let timepickerText = "<TimePicker use12Hours=true  />";
let timepickerExample = codeCollapse("TimePicker", timepickerCode, timepickerText);

let uploadCode =
  <Upload action=""> <Button> <Icon type_="upload" /> {ReasonReact.string("Click to Upload")} </Button> </Upload>;

let uploadText = "";

let uploadExample = codeCollapse("Upload", uploadCode, uploadText);

/* DATA DISPLAY */

let avatarCode = <Avatar size=64 icon=Antd.Avatar.IconName.user />;
let avatarText = "<Avatar size=64 icon=\"user\" />";
let avatarExample = codeCollapse("Avatar", avatarCode, avatarText);

let badgeCode = <Badge count=5> <a href="#" className="head-example" /> </Badge>;

let badgeText = "<Badge count={5}>
                                                           <a href=\"#\" className=\"head-example\" />
                                                         </Badge>";

let badgeExample = codeCollapse("Badge", badgeCode, badgeText);

let cardCode =
  <Card
    title={ReasonReact.string("Card Title")}
    extra={<a href="#"> {ReasonReact.string("more")} </a>}
    style={ReactDOMRe.Style.make(~width="300px", ())}>
    <p> {ReasonReact.string("Card Content")} </p>
  </Card>;

let cardText = "<Card
                                   title={ReasonReact.string(\"Card Title\")}
                                   extra={<a href=\"#\">{ReasonReact.string(\"more\")}</a>}
                                   style={ReactDOMRe.Style.make(~width=\"300px\", ())}
                                 >
                                   <p>{ReasonReact.string(\"Card Content\")}</p>
                                 </Card>";

let cardExample = codeCollapse("Card", cardCode, cardText);

let calendarCode =
  <div style={ReactDOMRe.Style.make(~width="300", ~border="1px solid #d9d9d9", ~borderRadius="4", ())}>
    <Calendar fullscreen=false />
  </div>;

let calendarText = "<div style={ReactDOMRe.Style.make(~width=\"300\", ~border=\"1px solid #d9d9d9\", ~borderRadius=\"4\", ())}>
                                          <Calendar fullscreen=false  />
                                        </div>";

let calendarExample = codeCollapse("Calendar", calendarCode, calendarText);

let collapseCode =
  <Collapse defaultActiveKey=["1"] >
    <Panel header="This is panel header 1" key="1"> <p> {ReasonReact.string("text 1")} </p> </Panel>
    <Panel header="This is panel header 2" key="2"> <p> {ReasonReact.string("text 2")} </p> </Panel>
  </Collapse>;

let collapseText = "<Collapse defaultActiveKey=[\"1\"]>
                       <Panel header=\"This is panel header 1\" key=\"1\">
                         <p>{ReasonReact.string(\"text 1\")}</p>
                       </Panel>
                       <Panel header=\"This is panel header 2\" key=\"2\">
                         <p>{ReasonReact.string(\"text 2\")}</p>
                       </Panel>
                     </Collapse>";

let collapseExample = codeCollapse("Collapse", collapseCode, collapseText);

let listData = [
  ReasonReact.string("Racing car sprays burning fuel into crowd."),
  ReasonReact.string("Japanese princess to wed commoner."),
  ReasonReact.string("Australian walks 100km after outback crash."),
  ReasonReact.string("Man charged over missing wedding girl."),
  ReasonReact.string("Los Angeles battles huge wildfires."),
];

let listHeader = <div> {ReasonReact.string("Header")} </div>;
let listFooter = <div> {ReasonReact.string("Footer")} </div>;
let listRender = item => <List.Item> item </List.Item>;
let listCode =
  <List
    header=listHeader
    footer=listFooter
    bordered=true
    dataSource=listData
    renderItem=listRender
  />;

let listText = " <List
                    header=listHeader
                    footer=listFooter
                    bordered=true
                    dataSource=listData
                    renderItem=listRender
                  />;";
let listExample = codeCollapse("List", listCode, listText);

let popoverContent = <div> <p> {ReasonReact.string("Content")} </p> </div>;

let popoverCode =
  <Popover content=popoverContent title={ReasonReact.string("Title")}>
    <Button _type=`primary> {ReasonReact.string("Hover Me")} </Button>
  </Popover>;

let popoverText = "<Popover content=popoverContent title={ReasonReact.string(\"Title\")}>
                                         <Button _type=`primary>{ReasonReact.string(\"Hover Me\")}</Button>
                                       </Popover>";
let popoverExample = codeCollapse("Popover", popoverCode, popoverText);

let tooltipCode =
  <Tooltip title={ReasonReact.string("Title")}> <span> {ReasonReact.string("hover me")} </span> </Tooltip>;

let tooltipText = "<Tooltip title={ReasonReact.string(\"Title\")}>
                                         <span>{ReasonReact.string(\"hover me\")}</span>
                                       </Tooltip>";

let tooltipExample = codeCollapse("Tooltip", tooltipCode, tooltipText);

let popconfirmCode =
  <Popconfirm title={ReasonReact.string("Title")} okText="Yes" cancelText="No">
    <Button> {ReasonReact.string("Delete")} </Button>
  </Popconfirm>;

let popconfirmText = "<Popconfirm title={ReasonReact.string(\"Title\")}  okText=\"Yes\" cancelText=\"No\">
                                                <a href=\"#\">{ReasonReact.string(\"Delete\")}</a>
                                              </Popconfirm>";

let popconfirmExample = codeCollapse("Popconfirm", popconfirmCode, popconfirmText);

let tableColumns: list(Antd_Table.columnParams) = [
  {"title": ReasonReact.string("Name"), "dataIndex": "name", "key": "name"},
  {"title": ReasonReact.string("Age"), "dataIndex": "age", "key": "age"},
  {"title": ReasonReact.string("Address"), "dataIndex": "address", "key": "address"},
];

type tableExampleFormat = {
  .
  "key": string,
  "name": string,
  "age": int,
  "address": string,
};

/*
 let tableData: array(tableExampleFormat) = [| {
   "key": "1",
   "name": "John Brown",
   "age": 32,
   "address": "New York No. 1 Lake Park",
 }, {
   key: "2",
   name: "Jim Green",
   age: 42,
   address: "London No. 1 Lake Park",
 }, {
   key: "3",
   name: "Joe Black",
   age: 32,
   address: "Sidney No. 1 Lake Park",
 } |];
 */

let tableData: list(tableExampleFormat) = [
  {"key": "1", "name": "John Brown", "age": 32, "address": "New York No. 1 Lake Park"},
];

let tableCode = <Table columns=tableColumns dataSource=tableData />;
let tableText = "<Table columns=tableColumns dataSource=tableData  />";
let tableExample = codeCollapse("Table", tableCode, tableText);

let tabsCode =
  <Tabs defaultActiveKey="1">
    <TabPane tab={ReasonReact.string("Tab 1")} key="1"> {ReasonReact.string("Tab 1")} </TabPane>
    <TabPane tab={ReasonReact.string("Tab 2")} key="2"> {ReasonReact.string("Tab 2")} </TabPane>
    <TabPane tab={ReasonReact.string("Tab 3")} key="3"> {ReasonReact.string("Tab 3")} </TabPane>
  </Tabs>;
let tabsText = "<Tabs defaultActiveKey=\"1\">
                    <TabPane tab={ReasonReact.string(\"Tab 1\")} key=\"1\"> {ReasonReact.string(\"Tab 1\")} </TabPane>
                    <TabPane tab={ReasonReact.string(\"Tab 2\")} key=\"2\"> {ReasonReact.string(\"Tab 2\")} </TabPane>
                    <TabPane tab={ReasonReact.string(\"Tab 3\")} key=\"3\"> {ReasonReact.string(\"Tab 3\")} </TabPane>
                  </Tabs>";
let tabsExample = codeCollapse("Tabs", tabsCode, tabsText);

let tagCode = <Tag color="#f50"> {ReasonReact.string("#f50")} </Tag>;
let tagText = "<Tag color=\"#f50\">{ReasonReact.string(\"#f50\")}</Tag>";
let tagExample = codeCollapse("Tag", tagCode, tagText);

let timelineCode =
  <Timeline>
    <Timeline.Item> {ReasonReact.string("Create a services site 2015-09-01")} </Timeline.Item>
    <Timeline.Item> {ReasonReact.string("Solve initial network problems 2015-09-01")} </Timeline.Item>
    <Timeline.Item> {ReasonReact.string("Technical testing 2015-09-01")} </Timeline.Item>
    <Timeline.Item> {ReasonReact.string("Network problems being solved 2015-09-01")} </Timeline.Item>
  </Timeline>;

let timelineText = "<Timeline>
                        <Timeline.Item>{ReasonReact.string(\"Create a services site 2015-09-01\")}</Timeline.Item>
                        <Timeline.Item>{ReasonReact.string(\"Solve initial network problems 2015-09-01\")}</Timeline.Item>
                        <Timeline.Item>{ReasonReact.string(\"Technical testing 2015-09-01\")}</Timeline.Item>
                        <Timeline.Item>{ReasonReact.string(\"Network problems being solved 2015-09-01\")}</Timeline.Item>
                      </Timeline>";

let timelineExample = codeCollapse("Timeline", timelineCode, timelineText);

let alertCode = <Alert message={ReasonReact.string("Success Text")} _type=`error />;
let alertText = "<Alert message={ReasonReact.string(\"Success Text\")} _type=`error />";
let alertExample = codeCollapse("Alert", alertCode, alertText);

let handleModalShow = (self, event) => self.ReasonReact.send(ModalShow);

let handleModalHide = (self, event) => self.ReasonReact.send(ModalHide);

let messageInfo = event => Message.info(ReasonReact.string("Display normal message"), 1);

let messageCode =
  <Button _type=`primary onClick=messageInfo> {ReasonReact.string("Display normal message")} </Button>;
let messageText = "<Button _type=`primary onClick=messageInfo>{ReasonReact.string(\"Display normal message\")}</Button>";
let messageExample = codeCollapse("Message", messageCode, messageText);

/*
 let paragraphParams: Antd_Skeleton.paragraphProps = {"rows": 4, "width": 20};
 */

let myNotificationData: Antd.Notification.options = {
  "message": ReasonReact.string("mymessage"),
  "description": ReasonReact.string("mydescription"),
};

let openNotification = event => {
  Js.log("openNotificationx");
  Notification.success(myNotificationData);
};

let notificationCode =
  <Button _type=`primary onClick=openNotification> {ReasonReact.string("Open the notification box")} </Button>;
let notificationText = "
let myNotificationData: Antd.Notification.options = { \"message\":ReasonReact.string(\"mymessage\"), \"description\": ReasonReact.string(\"mydescription\") };
<Button _type=`primary onClick=openNotification>{ReasonReact.string(\"Open the notification box\")}</Button>";
let notificationExample = codeCollapse("Notification", notificationCode, notificationText);

let spinCode = <Spin />;
let spinText = "<Spin />";
let spinExample = codeCollapse("Spin", spinCode, spinText);

let dividerCode = <Divider> {ReasonReact.string("With Text")} </Divider>;
let dividerText = "<Divider>ReasonReact.string(\"With Text\")}</Divider>";
let dividerExample = codeCollapse("Divider", dividerCode, dividerText);

let make = _children => {
  ...component,
  initialState: () => {current: "mail", something: "special", modalVisible: false},
  reducer: (action, state) =>
    switch (action) {
    | Click(item) => ReasonReact.Update({...state, current: item})
    | ModalShow => ReasonReact.Update({...state, modalVisible: true})
    | ModalHide => ReasonReact.Update({...state, modalVisible: false})
    },
  render: self =>
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
        <Layout style={ReactDOMRe.Style.make(~padding="24px 0", ~background="#fff", ())}>
          <Layout.Sider width=200 style={ReactDOMRe.Style.make(~background="#fff", ())}>
            <Menu
              mode=`Inline
              defaultSelectedKeys=["1"]
              defaultOpenKeys=["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"]
              style={ReactDOMRe.Style.make(~height="100%", ())}>
              <Menu.SubMenu key="sub1" title={<span> {ReasonReact.string("General")} </span>}>
                <Menu.Item key="1"> {nextLink("Button")} </Menu.Item>
                <Menu.Item key="2"> {nextLink("Icon")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub2" title={<span> {ReasonReact.string("Layout")} </span>}>
                <Menu.Item key="Layout:Grid"> {nextLink("Grid")} </Menu.Item>
                <Menu.Item key="Layout:Layout"> {nextLink("Layout")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub3" title={<span> {ReasonReact.string("Navigation")} </span>}>
                <Menu.Item key="Navigation:Affix"> {nextLink("Affix")} </Menu.Item>
                <Menu.Item key="Navigation:Breadcrumb"> {nextLink("Breadcrumb")} </Menu.Item>
                <Menu.Item key="Navigation:Dropdown"> {nextLink("Dropdown")} </Menu.Item>
                <Menu.Item key="Navigation:Menu"> {nextLink("Menu")} </Menu.Item>
                <Menu.Item key="Navigation:Pagination"> {nextLink("Pagination")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub4" title={<span> {ReasonReact.string("Data Entry")} </span>}>
                <Menu.Item key="DataEntry:AutoComplete"> {nextLink("AutoComplete")} </Menu.Item>
                <Menu.Item key="DataEntry:Checkbox"> {nextLink("Checkbox")} </Menu.Item>
                <Menu.Item key="DataEntry:Datepicker"> {nextLink("Datepicker")} </Menu.Item>
                <Menu.Item key="DataEntry:Form"> {nextLink("Form")} </Menu.Item>
                <Menu.Item key="DataEntry:InputNumber"> {nextLink("InputNumber")} </Menu.Item>
                <Menu.Item key="DataEntry:Radio"> {nextLink("Radio")} </Menu.Item>
                <Menu.Item key="DataEntry:Rate"> {nextLink("Rate")} </Menu.Item>
                <Menu.Item key="DataEntry:Select"> {nextLink("Select")} </Menu.Item>
                <Menu.Item key="DataEntry:Skeleton"> {nextLink("Skeleton")} </Menu.Item>
                <Menu.Item key="DataEntry:Switch"> {nextLink("Switch")} </Menu.Item>
                <Menu.Item key="DataEntry:TimePicker"> {nextLink("TimePicker")} </Menu.Item>
                <Menu.Item key="DataEntry:Upload"> {nextLink("Upload")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub5" title={<span> {ReasonReact.string("Data Display")} </span>}>
                <Menu.Item key="DataDisplay:Avatar"> {nextLink("Avatar")} </Menu.Item>
                <Menu.Item key="DataDisplay:Badge"> {nextLink("Badge")} </Menu.Item>
                <Menu.Item key="DataDisplay:Calendar"> {nextLink("Calendar")} </Menu.Item>
                <Menu.Item key="DataDisplay:Card"> {nextLink("Card")} </Menu.Item>
                <Menu.Item key="DataDisplay:Collapse"> {nextLink("Collapse")} </Menu.Item>
                <Menu.Item key="DataDisplay:List"> {nextLink("List")} </Menu.Item>
                <Menu.Item key="DataDisplay:Popover"> {nextLink("Popover")} </Menu.Item>
                <Menu.Item key="DataDisplay:Tooltip"> {nextLink("Tooltip")} </Menu.Item>
                <Menu.Item key="DataDisplay:Table"> {nextLink("Table")} </Menu.Item>
                <Menu.Item key="DataDisplay:Tabs"> {nextLink("Tabs")} </Menu.Item>
                <Menu.Item key="DataDisplay:Tag"> {nextLink("Tag")} </Menu.Item>
                <Menu.Item key="DataDisplay:Timeline"> {nextLink("Timeline")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub6" title={<span> {ReasonReact.string("Feedback")} </span>}>
                <Menu.Item key="Feedback:Alert"> {nextLink("Alert")} </Menu.Item>
                <Menu.Item key="Feedback:Modal"> {nextLink("Modal")} </Menu.Item>
                <Menu.Item key="Feedback:Message"> {nextLink("Message")} </Menu.Item>
                <Menu.Item key="Feedback:Notification"> {nextLink("Notification")} </Menu.Item>
                <Menu.Item key="Feedback:Popconfirm"> {nextLink("Popconfirm")} </Menu.Item>
                <Menu.Item key="Feedback:Spin"> {nextLink("Spin")} </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="sub7" title={<span> {ReasonReact.string("Other")} </span>}>
                <Menu.Item key="Feedback:Divider"> {nextLink("Divider")} </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Layout.Sider>
          <Layout.Content style={ReactDOMRe.Style.make(~padding="0 24px", ~minHeight="280", ())}>
            buttonExample
            iconExample
            gridExample
            layoutExample
            /*affixExample */
            breadcrumbExample
            dropdownExample
            menuExample
            paginationExample
            autocompleteExample
            checkboxExample
            datepickerExample
            formExample
            inputNumberExample
            radioExample
            rateExample
            selectExample
            skeletonExample
            switchExample
            timepickerExample
            uploadExample
            avatarExample
            badgeExample
            calendarExample
            cardExample
            collapseExample
            listExample
            popoverExample
            tooltipExample
            tableExample
            tabsExample
            tagExample
            timelineExample
            alertExample
            /* need to figure out how to get self into function */
            <div id="Modal">
              <h1> {ReasonReact.string("Modal")} </h1>
              <div>
                <Button _type=`primary onClick={event => self.send(ModalShow)}>
                  {ReasonReact.string("Open Modal")}
                </Button>
                <Modal
                  title={ReasonReact.string("Basic Modal")}
                  visible={self.state.modalVisible}
                  onOk={event => self.send(ModalHide)}
                  onCancel={event => self.send(ModalHide)}>
                  <p> {ReasonReact.string("Some contents...")} </p>
                  <p> {ReasonReact.string("Some contents...")} </p>
                  <p> {ReasonReact.string("Some contents...")} </p>
                </Modal>
              </div>
              <Collapse bordered=false style={ReactDOMRe.Style.make(~marginTop="10px", ~marginBottom="30px", ())}>
                <Panel header="Code" key="Modal"> {ReasonReact.string("See code due to events necessary")} </Panel>
              </Collapse>
            </div>
            messageExample
            notificationExample
            popconfirmExample
            spinExample
            dividerExample
          </Layout.Content>
        </Layout>
      </Layout.Content>
      <Layout.Footer style={ReactDOMRe.Style.make(~textAlign="center", ())}>
        {ReasonReact.string("Created by Me")}
      </Layout.Footer>
    </Layout>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
