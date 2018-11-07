/* eslint no-unused-vars: 0 */

import {ApolloClient, InMemoryCache} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch;
}

function create(initialState, {getToken}) {
    const httpLink = createHttpLink({
        uri: "https://api.graph.cool/simple/v1/cjdgba1jw4ggk0185ig4bhpsn",
        credentials: "same-origin",
    });

    const authLink = setContext((_, {headers}) => {
        // const token = getToken()
        const token = "$123";
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {}),
    });
}

export default function initApollo(initialState, options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, options);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options);
    }

    return apolloClient;
}
