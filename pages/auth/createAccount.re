let component = ReasonReact.statelessComponent("CreateAccount");

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
    <ConsumerPage nav=`createAccount>
      <NextSeo title="Create User" />
      <RegisterBox />
      {ReasonReact.string("Already have an account? ")}
      <Next.Link prefetch=true href="/auth/signin"> <a> {ReasonReact.string(" sign in")} </a> </Next.Link>
    </ConsumerPage>,
};

/*
 [@bs.deriving abstract]
 type jsProps = {myname: string};

 let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(~myname=jsProps->mynameGet, [||]));
 */

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
