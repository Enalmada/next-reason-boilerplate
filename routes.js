const routes = require("next-routes")();

// Add every page route here to enable next-link, static assets in response added to link headers.
// Most proxy convert preload link header to server push for you for
// lower time to interactive latency as another round trip isn't necessary for critical css and js.

// for more info, please look at next-routes
// Also https://github.com/Sly777/ran/blob/master/docs/Routing.md
//
// ------------ ROUTES ---------------
routes.add("index", "/", "index");
routes.add("reducer", "/reducer", "reducer");
routes.add("sentry", "/sentry", "sentry");
routes.add("mobileIframe", "/mobile/iframePage/:slug", "/mobile/iframePage");
routes.add("mobileStyleguide", "/mobile/styleguide/:slug", "/mobile/styleguide");
// ------------ ROUTES ---------------
//
//

module.exports = routes;
