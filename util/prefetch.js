// On hover, prefetch getInitialProps.  Normal link prefetch only gets the page js ready.
// https://github.com/scaleapi/data-prefetch-link
// https://scale.ai/blog/increasing-the-performance-of-dynamic-next-js-websites
import Router from "next/router";
import {format, resolve, parse} from "url";

const prefetch = async (href) => {
    console.log("prefetch start");
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
    console.log(`prefetch ${parsedHref} ${Component}`);

    // fetch the component props
    // and cache locally, handled within getInitialProps
    if (Component && Component.getInitialProps) {
        console.log("prefetch getInitialProps");
        const ctx = {pathname: href, query, isVirtualCall: true};
        await Component.getInitialProps(ctx);
    }
};

export default prefetch;
