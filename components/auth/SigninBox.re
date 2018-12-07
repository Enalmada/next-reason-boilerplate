let ste = ReasonReact.string;

module SignIn = [%graphql
  {|
     mutation Signin($email: String!, $password: String!) {
            signinUser(email: { email: $email, password: $password}) {
                token
            }
        }
|}
];

type state = {
  username: string,
  password: string,
};

type action =
  | ChangeUsername(string)
  | ChangePassword(string);

let component = ReasonReact.reducerComponent("SigninBox");

module SignInMutation = ReasonApollo.CreateMutation(SignIn);
let formStyle = ReactDOMRe.Style.make(~width="200px", ~marginBottom="10px", ());

let make = _children => {
  ...component,
  initialState: () => {username: "", password: ""},
  reducer: (action, state) =>
    switch (action) {
    | ChangeUsername(username) => ReasonReact.Update({...state, username})
    | ChangePassword(password) => ReasonReact.Update({...state, password})
    },
  render: self => {
    let signInMutation = SignIn.make(~email=self.state.username, ~password=self.state.password, ());
    <ApolloConsumer>
      ...{_apolloClient =>
        <SignInMutation
          onCompleted={_data => {
            ignore(
              {
                %bs.raw
                {| document.cookie = require("cookie").serialize('token', _data.signinUser.token, { maxAge: 30 * 24 * 60 * 60 }) |};
              },
            );

            /* https://www.apollographql.com/docs/react/recipes/authentication.html#login-logout */
            %bs.raw
            {| _apolloClient.resetStore().then(() => {require("next/router").default.replace("/")} ) |};
          }}>
          /* I can't get this working for some reason */
          /* Next_Router.replace("/"); */

            ...{(mutation, {result}) =>
              <div>
                <h1> {"Sign In!" |> ste} </h1>
                <Antd_Form>
                  <div>
                    <Antd_Input
                      placeholder="email"
                      autoComplete="username"
                      value={self.ReasonReact.state.username}
                      onChange={event =>
                        self.ReasonReact.send(ChangeUsername(ReactEvent.Form.target(event)##value))
                      }
                      style=formStyle
                    />
                  </div>
                  <div>
                    <Antd_Input
                      placeholder="password"
                      autoComplete="current-password"
                      value={self.ReasonReact.state.password}
                      onChange={event =>
                        self.ReasonReact.send(ChangePassword(ReactEvent.Form.target(event)##value))
                      }
                      style=formStyle
                    />
                  </div>
                  <Antd_Button
                    _type=`primary
                    style={ReactDOMRe.Style.make(~marginTop="10px", ())}
                    onClick={_ => {
                      mutation(~variables=signInMutation##variables, ()) |> ignore;
                      Js.log("SEND");
                    }}>
                    {ste("Submit")}
                  </Antd_Button>
                  <span>
                    {switch (result) {
                     | NotCalled =>
                       Js.log("Not called");
                       "" |> ste;
                     | Data(d) =>
                       Js.log2("data", d);
                       "Person has been signed in" |> ste;
                     | Error(e) =>
                       Js.log2("error", e);
                       e##message |> ste;
                     | Loading =>
                       Js.log("Loading");
                       "Loading" |> ste;
                     }}
                  </span>
                </Antd_Form>
              </div>
            }
          </SignInMutation>
      }
    </ApolloConsumer>;
  },
};
