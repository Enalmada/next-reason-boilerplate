/* eslint camelcase: "off", react/jsx-no-undef: 0,  no-unused-vars: 0, no-console: 0 */
import App, {Container} from "next/app";
import React from "react";
import {ApolloProvider} from "react-apollo";
import NextSeo from "next-seo";
import {LocaleProvider} from "antd";
import en_US from "antd/lib/locale-provider/en_US";
import {compose} from "recompose";
import {throttle} from "throttle-debounce";

import {config, library as fontawesome} from "@fortawesome/fontawesome-svg-core";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {NamespacesConsumer} from "react-i18next";
import {UserAgentProvider} from "@quentin-sommer/react-useragent";
import RUM from "next-rum";
import withApollo from "../apollo/withApollo";
// import your default seo configuration
import SEO from "../next-seo.config";

import i18n from "../i18next/i18n";


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

class MyApp extends App {
    /**
     * Don't reload with every single resize input, need to throttle or debounce.
     */
    reloadPageThrottled = throttle(500, this.reloadPage);

    // TODO: only reload on platform (mobile/tablet/desktop) state change rather than any resize
    reloadPage() {
        // This works but I would prefer not to have to reload the whole page
        window.location.reload();

        // For some reason this does not work to switch user agent stuff
        // this.forceUpdate();
    }

    /**
     * componentDidMount is only executed client side
     * https://github.com/zeit/next.js/issues/2473#issuecomment-313190903
     */
    componentDidMount() {
        window.addEventListener("resize", this.reloadPageThrottled.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.reloadPageThrottled.bind(this));
    }

    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const ua = ctx.req
            ? ctx.req.headers["user-agent"]
            : navigator.userAgent;

        const i18nProps = i18n.getInitialProps(ctx.req);
        return {pageProps, i18nProps, ua};
    }

    render() {
        const {
            Component, pageProps, apolloClient, i18nProps, ua,
        } = this.props;
        return (
            <Container>
                <RUM navigated={navigated}>

                    <UserAgentProvider ua={ua}>
                        <NamespacesConsumer
                            {...pageProps}
                            ns="common"
                            i18n={(pageProps && pageProps.i18n) || i18n}
                            wait={process.browser}
                            initialI18nStore={i18nProps.initialI18nStore}
                            initialLanguage={i18nProps.initialLanguage}
                        >
                            {t => (
                                <LocaleProvider locale={en_US}>
                                    <ApolloProvider client={apolloClient}>
                                        {/* Here we call NextSeo and pass our default configuration to it  */}
                                        <NextSeo config={SEO}/>
                                        <Component t={t} {...pageProps} />
                                    </ApolloProvider>
                                </LocaleProvider>
                            )}
                        </NamespacesConsumer>
                    </UserAgentProvider>
                </RUM>
            </Container>
        );
    }
}

export default compose(withApollo)(MyApp);
