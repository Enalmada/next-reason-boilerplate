/* eslint jsx-a11y/html-has-lang: "off", react/no-danger: "off", max-len: "off", import/first: "off"  */
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// CustomHead/CustomNextScript overridden to add crossorigin until nextjs fixes that natively
import Document, {Head, Main, NextScript} from "next/document";
import React from "react";

export default class MyDocument extends Document {

    render() {
        return (
            <html lang="en" itemScope itemType="http://schema.org/WebPage">
            <Head>
                <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
