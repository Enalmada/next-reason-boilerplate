let ste = ReasonReact.string;

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

let component = ReasonReact.reducerComponent("RegisterBox");

module CreateUserMutation = ReasonApollo.CreateMutation(CreateUser);
let formStyle = ReactDOMRe.Style.make(~width="200px", ~marginBottom="10px", ());

let make = _children => {
  ...component,
  initialState: () => {name: "", email: "", password: ""},
  reducer: (action, state) =>
    switch (action) {
    | ChangeName(name) => ReasonReact.Update({...state, name})
    | ChangeEmail(email) => ReasonReact.Update({...state, email})
    | ChangePassword(password) => ReasonReact.Update({...state, password})
    },
  render: self => {
    let createUserMutation =
      CreateUser.make(~name=self.state.name, ~email=self.state.email, ~password=self.state.password, ());
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
                <div>
                  <Antd_Input
                    placeholder="name"
                    value={self.ReasonReact.state.name}
                    onChange={event => self.ReasonReact.send(ChangeName(ReactEvent.Form.target(event)##value))}
                    style=formStyle
                  />
                </div>
                <div>
                  <Antd_Input
                    placeholder="email"
                    value={self.ReasonReact.state.email}
                    onChange={event => self.ReasonReact.send(ChangeEmail(ReactEvent.Form.target(event)##value))}
                    style=formStyle
                  />
                </div>
                <div>
                  <Antd_Input
                    placeholder="password"
                    value={self.ReasonReact.state.password}
                    onChange={event => self.ReasonReact.send(ChangePassword(ReactEvent.Form.target(event)##value))}
                    style=formStyle
                  />
                </div>
                <Antd_Button
                  _type=`primary
                  style={ReactDOMRe.Style.make(~marginTop="10px", ())}
                  onClick={_ => {
                    mutation(~variables=createUserMutation##variables, ()) |> ignore;
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
              </div>
            }
          </CreateUserMutation>
      }
    </ApolloConsumer>;
  },
};
