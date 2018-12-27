let component = ReasonReact.statelessComponent("SignIn");

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

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage nav=`signin>
      <NextSeo title="Sign In" />
      <SigninBox />
      {ReasonReact.string("New? ")}
      <Next.Link prefetch=true href="/auth/createAccount">
        <a> {ReasonReact.string(" Create account")} </a>
      </Next.Link>
    </ConsumerPage>,
};

/*
 [@bs.deriving abstract]
 type jsProps = {myname: string};

 let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(~myname=jsProps->mynameGet, [||]));
 */

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
