/* eslint no-unused-vars: 0 */

import {ApolloClient} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import {concat} from "apollo-link";
import {RetryLink} from "apollo-link-retry";
import {Hermes} from "apollo-cache-hermes";

import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch;
}

// using publicRuntimeConfig because env variable has to be available to apollo on the client side
function create(initialState, {getToken}) {
    // https://medium.com/twostoryrobot/a-recipe-for-offline-support-in-react-apollo-571ad7e6f7f4
    const retry = new RetryLink({attempts: {max: Infinity}});

    const httpLink = createHttpLink({
        uri: "https://api.graph.cool/simple/v1/cj5geu3slxl7t0127y8sity9r", // with-apollo-auth
        // uri: "https://api.graph.cool/simple/v1/cjdgba1jw4ggk0185ig4bhpsn", // Reason-Apollo
        // uri: publicRuntimeConfig.graphApi, // set as process.env.GRAPHQL_API
        credentials: "same-origin",
    });

    const link = concat(retry, httpLink);

    const authLink = setContext((_, {headers}) => {
        const token = getToken();
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
        link: authLink.concat(link),
        cache: new Hermes().restore(initialState || {}),
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
