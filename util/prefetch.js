// https://shaleenjain.com/blog/nextjs-apollo-prefetch/
import {format, resolve, parse} from "url";
import Router from "next/router";

const prefetch = async (href, apolloClient, withData = true) => {
    // if  we're running server side do nothing
    if (typeof window === "undefined") return;

    const url = typeof href !== "string"
        ? format(href)
        : href;

    const {pathname} = window.location;

    const parsedHref = resolve(pathname, url);


    const {query} = typeof href !== "string"
        ? href
        : parse(url, true);

    // get component reference
    const Component = await Router.prefetch(parsedHref);

    // console.log(`Component:${Component} query:${JSON.stringify(query)} withData:${withData} href:${JSON.stringify(href)}`);
    // fetch the component props
    // and cache locally, handled within getInitialProps
    if (withData && Component && Component.getInitialProps) {
        // const nextRoutesQuery = nextRoutes.match(parsedHref).query;

        const ctx = {
            pathname: href, query, isVirtualCall: true, apolloClient,
        };
        await Component.getInitialProps(ctx);
    }
};

export default prefetch;
