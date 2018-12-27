import Router from "next/router";

export default (context, target, code = 303) => {
    if (context.res || !process.browser) {
        // server
        // 303: "See other"
        context.res.writeHead(code, {Location: target});
        context.res.end();
    } else {
        // In the browser, we just pretend like this never even happened ;)
        Router.replace(target);
    }
};
