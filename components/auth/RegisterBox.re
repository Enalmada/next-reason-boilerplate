let ste = React.string;

module CreateUser = [%graphql
  {|
      mutation Create($name: String!, $email: String!, $password: String!) {
             createUser(name: $name, authProvider: { email: { email: $email, password: $password }}) {
                 id
             }
             signinUser(email: { email: $email, password: $password }) {
                 token
         }
     }
|}
];

type state = {
  name: string,
  email: string,
  password: string,
};

type action =
  | ChangeName(string)
  | ChangeEmail(string)
  | ChangePassword(string);

module CreateUserMutation = ReasonApollo.CreateMutation(CreateUser);
let formStyle =
  ReactDOMRe.Style.make(~width="200px", ~marginBottom="10px", ());

[@react.component]
let make = () => {
  let createUserMutation = (name, email, password) =>
    CreateUser.make(~name, ~email, ~password, ());

  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | ChangeName(name) => {...state, name}
        | ChangeEmail(email) => {...state, email}
        | ChangePassword(password) => {...state, password}
        },
      {name: "", email: "", password: ""},
    );

  <ApolloConsumer>
    ...{_apolloClient =>
      <CreateUserMutation
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
              <h1> {"Create User!" |> ste} </h1>
              <Antd_Form>
                <div>
                  <Antd_Input
                    placeholder="name"
                    value={state.name}
                    onChange={event =>
                      dispatch(
                        ChangeName(ReactEvent.Form.target(event)##value),
                      )
                    }
                    style=formStyle
                  />
                </div>
                <div>
                  <Antd_Input
                    placeholder="email"
                    autoComplete="username"
                    value={state.email}
                    onChange={event =>
                      dispatch(
                        ChangeEmail(ReactEvent.Form.target(event)##value),
                      )
                    }
                    style=formStyle
                  />
                </div>
                <div>
                  <Antd_Input
                    placeholder="password"
                    autoComplete="new-password"
                    value={state.password}
                    onChange={event =>
                      dispatch(
                        ChangePassword(ReactEvent.Form.target(event)##value),
                      )
                    }
                    style=formStyle
                  />
                </div>
                <Antd_Button
                  _type=`primary
                  style={ReactDOMRe.Style.make(~marginTop="10px", ())}
                  onClick={_ => {
                    mutation(
                      ~variables=
                        createUserMutation(
                          state.name,
                          state.email,
                          state.password,
                        )##variables,
                      (),
                    )
                    |> ignore;
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
        </CreateUserMutation>
    }
  </ApolloConsumer>;
};
