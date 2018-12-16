/* eslint camelcase: "off", react/jsx-no-undef: 0,  no-unused-vars: 0, no-console: 0, no-underscore-dangle: 0 */
import App, {Container} from "next/app";
import React from "react";
import {ApolloProvider} from "react-apollo";
import NextSeo from "next-seo";
import {LocaleProvider} from "antd";
import en_US from "antd/lib/locale-provider/en_US";
import {throttle} from "throttle-debounce";

import {config, library as fontawesome} from "@fortawesome/fontawesome-svg-core";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {UserAgentProvider} from "@quentin-sommer/react-useragent";
import RUM from "next-rum";
import {IntlProvider, addLocaleData} from "react-intl";
import withApollo from "../util/withApollo";
// import your default seo configuration
import SEO from "../next-seo.config";
import {captureException} from "../util/sentry";

config.autoAddCss = false;
fontawesome.add(faComments);

/**
 * Implement your custom tracker/analytics here to receive the RUM data.
 * https://www.npmjs.com/package/next-rum
 * Note this only works client side so no ssr response is logged though if you want that
 * the author is willing to consider pull request
 *
 * @param {String} url The URL that we navigated to.
 * @param {Object} rum The measured navigation data.
 * @private
 */
function navigated(url, rum) {
    console.log("the page has navigated to", url, rum);

    /*
    // GA example
    for (let metricName in rum) {
        ga('send', 'event', {
          eventCategory: 'Performance Metrics',
          eventValue: rum[metricName],
          eventAction: metricName,
          nonInteraction: true,
        });
      }
    */
}


// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== "undefined" && window.ReactIntlLocaleData) {
    Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
        addLocaleData(window.ReactIntlLocaleData[lang]);
    });
}


class MyApp extends App {
    /*

      // Don't reload with every single resize input, need to throttle or debounce.

    reloadPageThrottled = throttle(500, this.reloadPage);

    // TODO: only reload on platform (mobile/tablet/desktop) state change rather than any resize
    reloadPage() {
        // This works but I would prefer not to have to reload the whole page
        if (process.browser) {
            window.location.reload();
        }

        // For some reason this does not work to switch user agent stuff
        // this.forceUpdate();
    }


     //componentDidMount is only executed client side
     //  https://github.com/zeit/next.js/issues/2473#issuecomment-313190903

    componentDidMount() {
        window.addEventListener("resize", this.reloadPageThrottled.bind(this));
    }

    //
    componentWillUnmount() {
        window.removeEventListener("resize", this.reloadPageThrottled.bind(this));
    }
    */

    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};

        // https://github.com/zeit/next.js/pull/5727/files
        try {
            if (Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx);
            }
        } catch (e) {
            captureException(e, ctx);
            throw e; // you can also skip re-throwing and set property on pageProps
        }

        const ua = ctx.req
            ? ctx.req.headers["user-agent"]
            : navigator.userAgent;

        // Get the `locale` and `messages` from the request object on the server.
        // In the browser, use the same values that the server serialized.
        const {req} = ctx;
        const {locale, messages} = req || window.__NEXT_DATA__.props;

        // const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);


        return {
            pageProps, locale, messages, ua,
        };
    }

    // This reports errors thrown while rendering components
    componentDidCatch(error, errorInfo) {
        captureException(error, {errorInfo});
        super.componentDidCatch(error, errorInfo);
    }

    render() {
        const {
            Component, pageProps, apolloClient, ua, locale, messages,
        } = this.props;
        const now = Date.now();

        return (
            <Container>
                <RUM navigated={navigated}>

                    <UserAgentProvider ua={ua}>
                        <IntlProvider locale={locale} messages={messages} initialNow={now}>
                            <LocaleProvider locale={en_US}>
                                <ApolloProvider client={apolloClient}>
                                    {/* Here we call NextSeo and pass our default configuration to it  */}
                                    <NextSeo config={SEO}/>
                                    <Component {...pageProps} />
                                </ApolloProvider>
                            </LocaleProvider>
                        </IntlProvider>
                    </UserAgentProvider>
                </RUM>
            </Container>
        );
    }
}

export default withApollo(MyApp);
