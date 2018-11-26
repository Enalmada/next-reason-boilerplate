let ste = ReasonReact.string;

module GetProfileUser = [%graphql
  {|
       query getUser {
               user {
                 id
                 name
               }
             }
   |}
];

module GetProfileUserQuery = ReasonApollo.CreateQuery(GetProfileUser);

<GetProfileUserQuery>
  ...{
       ({result}) =>
         switch (result) {
         | Error(_e) => ReasonReact.string("Sign In")
         | Loading => ReasonReact.string("Sign In")
         | Data(response) =>
           switch (response##user) {
           | Some(user) =>
             switch (user##name) {
             | Some(name) => ReasonReact.string(name)
             | _ => ReasonReact.string("Sign In")
             }
           | _ => ReasonReact.string("Sign In")
           }
         }
     }
</GetProfileUserQuery>;

let component = ReasonReact.statelessComponent("ProfileModule");

let signIn =
  <Next.Link prefetch=true href="/signin">
    <a style={ReactDOMRe.Style.make(~color="red", ())}> {ReasonReact.string("Sign in")} </a>
  </Next.Link>;
let signOut =
  <Next.Link prefetch=true href="/signout">
    <a style={ReactDOMRe.Style.make(~color="red", ())}> {ReasonReact.string("Sign out")} </a>
  </Next.Link>;

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <GetProfileUserQuery>
        ...{
             ({result}) =>
               switch (result) {
               | Error(_e) => signIn
               | Loading => signIn
               | Data(response) =>
                 switch (response##user) {
                 | Some(user) =>
                   switch (user##name) {
                   | Some(name) =>
                     <div>
                       <div
                         style={
                           ReactDOMRe.Style.make(~color="white", ~marginRight="20px", ~display="inline-block", ())
                         }>
                         {ReasonReact.string(name)}
                       </div>
                       signOut
                     </div>
                   | _ => ReasonReact.string("no name")
                   }
                 | _ => signIn
                 }
               }
           }
      </GetProfileUserQuery>
    </div>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
