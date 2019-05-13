let ste = React.string;

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
  ...{({result}) =>
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

let signIn =
  <Next.Link
    prefetch={Some(true)}
    href="/auth/signin"
    style={Some(ReactDOMRe.Style.make(~color="white", ()))}>
    {ReasonReact.string("Sign in")}
  </Next.Link>;
let signOut =
  <Next.Link
    prefetch={Some(true)}
    href="/auth/signout"
    style={Some(ReactDOMRe.Style.make(~color="red", ()))}>
    {ReasonReact.string("Sign out")}
  </Next.Link>;

[@react.component]
let make = () => {
  <div>
    <GetProfileUserQuery>
      ...{({result}) =>
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
                  style={ReactDOMRe.Style.make(
                    ~color="white",
                    ~marginRight="20px",
                    ~display="inline-block",
                    (),
                  )}>
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
  </div>;
};
