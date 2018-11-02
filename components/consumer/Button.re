let component = ReasonReact.statelessComponent("Button");

let make = children => {...component, render: _self => <Antd_Button _type=`primary> ...children </Antd_Button>};

let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));
