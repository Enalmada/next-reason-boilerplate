import React from "react";
import Link from "next/link";

import redirect from "../util/redirect";
import checkLoggedIn from "../util/checkLoggedIn";

import SigninBox from "../components/auth/SigninBox";

export default class Signinjs extends React.Component {
    static async getInitialProps(context) {
        const {loggedInUser} = await checkLoggedIn(context.apolloClient);

        if (loggedInUser.user) {
            // Already signed in? No need to continue.
            // Throw them back to the main page
            redirect(context, "/");
        }

        return {};
    }

    render() {
        return (
            <React.Fragment>
                {/* SigninBox handles all login logic. */}
                <SigninBox />
                <hr />
        New? <Link prefetch href="/create-account"><a>Create account</a></Link>
            </React.Fragment>
        );
    }
}
