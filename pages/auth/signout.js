import React from "react";
import {destroyCookie} from "nookies";
import redirect from "../../util/redirect";
import checkLoggedIn from "../../util/checkLoggedIn";

// TODO: make this reason-react
export default class Index extends React.Component {
    static async getInitialProps(context) {
        const {loggedInUser} = await checkLoggedIn(context.apolloClient);

        if (!loggedInUser.user) {
            // If not signed in, send them somewhere more useful
            redirect(context, "/");
        }

        destroyCookie(context, "token");

        context.apolloClient.cache.reset().then(() => {
            redirect({}, "/");
        });

        return {loggedInUser};
    }

    render() {
        return (
            <div>Signing Out</div>
        );
    }
}
