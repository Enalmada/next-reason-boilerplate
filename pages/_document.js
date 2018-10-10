/* eslint jsx-a11y/html-has-lang: "off", react/no-danger: "off", max-len: "off", import/first: "off"  */
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, {Main, NextScript} from "next/document";
import React from "react";
import Head from "../components/CustomHead";

const facebookId = "<YOUR_ID>";

/* https://css-tricks.com/prefetching-preloading-prebrowsing/ */

/* tell supportive browsers to start prefetching the DNS for that domain a fraction before it's actually needed.
This means that the DNS lookup process will already be underway by the time the browser hits the script element that actually requests the widget.
It just gives the browser a small head start.
 */
const dnsPrefetch = [
    "//fonts.googleapis.com",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
];

/*
By initiating early "preconnects", the browser can set up the necessary sockets ahead of time and eliminate the costly DNS,
TCP, and TLS roundtrips from the critical path of the actual request.
 */
const preConnect = [
    "https://fonts.gstatic.com",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
];

/* load woff2 files here to get browser downloading them while it waits for the css that normally loads them */
const preLoad = [
];

/*
The new <link rel="preload"> standard enables us to load non-critical stylesheets asynchronously, without blocking rendering
https://github.com/filamentgroup/loadCSS
*/
const cssPreload = [
    "https://fonts.googleapis.com/css?family=Open+Sans",
];

// Notes:
// you probably want to version the manifest file
// cdn.polyfill.io was recommended in a next.js training video to eliminate issues with much older browsers
// you need to fill in the icon placeholders with your own
// note the "nomodule" on polyfill which only loads it on potentially troublesome browsers (no perf impact on new ones)

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en" itemScope itemType="http://schema.org/WebPage">
                <Head>

                    <link rel="manifest" href="/static/manifest/manifest.json"/>

                    <script src="https://cdn.polyfill.io/v2/polyfill.min.js" noModule="nomodule"/>

                    <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>

                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    <meta property="fb:app_id" content={facebookId}/>

                    {/* Performance */}
                    {dnsPrefetch.map(name => <link rel="dns-prefetch" href={name} key={name}/>)}

                    {/* Look and feel
                https://github.com/h5bp/mobile-boilerplate/blob/master/index.html */}
                    <meta name="MobileOptimized" content="320"/>
                    <meta name="HandheldFriendly" content="True"/>
                    {/* Removing user-scalable=no, maximum-scale due to accessibility notes in lighthouse */}
                    <meta name="viewport" content="initial-scale=1, width=device-width, height=device-height, minimal-ui"/>
                    {/* Add to homescreen for Chrome on Android */}
                    <meta name="mobile-web-app-capable" content="yes"/>
                    {/* For iOS web apps. https://github.com/h5bp/mobile-boilerplate/issues/94 */}
                    <meta name="apple-mobile-web-app-capable" content="no"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
                    <meta name="apple-mobile-web-app-title" content="<APP_TITLE>"/>
                    <meta name="application-name" content="<APP_NAME"/>
                    <meta name="msapplication-TileColor" content="#2d89ef"/>
                    <meta name="theme-color" content="#ffffff"/>

                    <link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" href="/static/icons/favicon-32x32.png" sizes="32x32"/>
                    <link rel="icon" type="image/png" href="/static/icons/favicon-16x16.png" sizes="16x16"/>
                    <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#f05133"/>
                    <link rel="shortcut icon" href="/static/icons/favicon.ico"/>
                    <meta name="msapplication-config" content="/static/icons/browserconfig.xml"/>

                    {preConnect.map(name => <link href={name} rel="preconnect" crossOrigin="anonymous" key={name}/>)}

                    {preLoad.map(name => <link rel="preload" href={name} as="font" type="font/woff2" crossOrigin="anonymous"
                        key={name}/>)}

                    {cssPreload.map(name => <React.Fragment key={name}>
                        <link rel="preload" href={name} as="style"
                            onLoad="this.onload=null;this.rel='stylesheet'" crossOrigin="anonymous"/>
                        <noscript>
                            <link rel="stylesheet" href={name} crossOrigin="anonymous"/>
                        </noscript>
                    </React.Fragment>)}


                    <script dangerouslySetInnerHTML={{
                        __html: `
                        (function(a){a.loadCSS||(a.loadCSS=function(){});var c=loadCSS.relpreload={};c.support=function(){try{var b=a.document.createElement("link").relList.supports("preload")}catch(e){b=!1}return function(){return b}}();c.bindMediaToggle=function(b){function a(){b.media=c}var c=b.media||"all";b.addEventListener?b.addEventListener("load",a):b.attachEvent&&b.attachEvent("onload",a);setTimeout(function(){b.rel="stylesheet";b.media="only x"});setTimeout(a,3E3)};c.poly=function(){if(!c.support())for(var b=a.document.getElementsByTagName("link"),
                        e=0;e<b.length;e++){var d=b[e];"preload"!==d.rel||"style"!==d.getAttribute("as")||d.getAttribute("data-loadcss")||(d.setAttribute("data-loadcss",!0),c.bindMediaToggle(d))}};if(!c.support()){c.poly();var f=a.setInterval(c.poly,500);a.addEventListener?a.addEventListener("load",function(){c.poly();a.clearInterval(f)}):a.attachEvent&&a.attachEvent("onload",function(){c.poly();a.clearInterval(f)})}"undefined"!==typeof exports?exports.loadCSS=loadCSS:a.loadCSS=loadCSS})("undefined"!==typeof global?global:
                        this);`,
                    }}/>


                    <script dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl+
                        '&gtm_preview=${process.env.GTM_PREVIEW}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${process.env.GTM}');`,
                    }}/>

                </Head>
                <body>

                    <Main/>

                    <NextScript/>

                </body>
                <style jsx global>{`
          body {
          }
        `}</style>
            </html>

        );
    }
}
