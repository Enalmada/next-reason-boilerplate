/* eslint no-unused-vars:0, no-multi-assign:0, no-console:0 */
import {Mutation, withApollo} from "react-apollo";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../../util/redirect";

const SIGN_IN = gql`
    mutation Signin($email: String!, $password: String!) {
        signinUser(email: { email: $email, password: $password}) {
            token
        }
    }
`;

// TODO: Find a better name for component.
const SigninBox = ({client}) => {
    let email; let
        password;

    return (
        <Mutation mutation={SIGN_IN} onCompleted={(data) => {
            // Store the token in cookie
            document.cookie = cookie.serialize("token", data.signinUser.token, {
                maxAge: 30 * 24 * 60 * 60, // 30 days
            });
            // Force a reload of all the current queries now that the user is
            // logged in
            client.cache.reset().then(() => {
                redirect({}, "/");
            });
        }} onError={(error) => {
            // If you want to send error to external service?
            console.log(error);
        }}>
            {(signinUser, {data, error}) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    signinUser({
                        variables: {
                            email: email.value,
                            password: password.value,
                        },
                    });

                    email.value = password.value = "";
                }}>
                    {error && <p>No user found with that information.</p>}
                    <input name="email" placeholder="Email" ref={(node) => { email = node; }} /><br />
                    <input name="password" placeholder="Password" ref={(node) => { password = node; }} type="password" /><br />
                    <button type="submit">Sign in</button>
                </form>
            )}
        </Mutation>
    );
};

export default withApollo(SigninBox);
