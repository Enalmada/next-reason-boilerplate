/* eslint react/no-unused-state:0 */

import React from "react";
import Link from "next/link";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {raiseError: false, raiseErrorInUpdate: false, raiseErrorInRender: false};
    }

    static getInitialProps({query}) {
        if (query.raiseError) {
            throw new Error("Error in getInitialProps");
        }
    }

    componentDidUpdate() {
        if (this.state.raiseErrorInUpdate) {
            throw new Error("Error in componentDidUpdate");
        }
    }

    render() {
        if (this.state.raiseErrorInRender) {
            throw new Error("Error in render");
        }

        return (
            <div>
                <h2>Index page</h2>
                <ul>
                    <li><a href="#" onClick={() => this.setState({raiseErrorInUpdate: "1"})}>Raise the error in render</a></li>
                    <li><a href="#" onClick={() => this.setState({raiseErrorInRender: "1"})}>Raise the error in componentDidUpdate</a></li>
                    <li>
                        <Link href={{pathname: "/sentry", query: {raiseError: "1"}}}>
                            <a>Raise error in getInitialProps of client-loaded page</a>
                        </Link>
                    </li>
                    <li>
                        <a href="/sentry?raiseError=1">
                            Raise error in getInitialProps of server-loaded page
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Index;
