# Next.js production ready boilerplate 

I am new to node/react/next.  This project is to confirm the technology can do everything I feel a production site needs.
This is still in active development but does contain some concepts worthy of consideration.
Feel free to push anything here you think would benefit the community.

RAN is my starting point and I recommended contributing to it if you can: https://www.rantoolkit.com
This project builds on it and I eventually will push things back that end up working/being a good idea.
Also read this: https://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

Install it and run:

```bash
npm install
npm run dev
(in another tab) npm run bsb-watch
```

Build and run:

```bash
npm run build
npm run start
```
(after running production build, make sure to unregister service worker)

## KNOWN ISSUES
* ant design elements need hard reload on development - it will all run fine on production
Next.js v7 has a critical bug with less/css right now: https://spectrum.chat/?t=2183fc55-236d-42cb-92b9-3ab10acc6303
The only workaround I could get going is not to load less/css files.  This impacts ant design hot reload because 
on development I normally would import antd.less globally only in dev mode to make hot deploy work.
* bs-moment warnings during build - known issue fixed waiting for next release
* add .env to your .gitignore.  It is only there so you can have a local copy

##This example features:

* Reason-React (https://github.com/zeit/next.js/tree/master/examples/with-reasonml)
* CI testing: CodeBuild files currently deploying to AWS Beanstalk (but could go anywhere)
* Deployment testing
  * Beanstalk - config files, sumologic logging 
  * Lambda - tested before antd made this dist file too big. Cold starts occasional issue even with warming enabled.
    Avg response ~150ms vs beanstalk ~40ms (not a big deal but not )
  * Now - recommended due to ease of deployments, superior compression (br), support for server push.
* Ant Design - designed for react.  Note it is so huge we really need rollup (or equivalent) working
* Font-Awesome - (no flicker) https://spectrum.chat/thread/56b0396d-8b7d-447d-9f46-24ba6192936e
* Sentry - (troublesome SSR) https://github.com/zeit/next.js/issues/1852 
* next-less/next-css only loading during dev/build.  See next.config.js
* cors whitelist - necessary for service-worker preload to cache response correctly (see server.js)
* healthcheck - just basic page returning now
* helmet - basic ssr security best practices
* next-link - server push of critical assets for minimum "time to interactive" latency 
* offline support - next-offline mostly.  See server.js manifest prefix with assetPrefix hack 
* SEO - robots.txt in server.js.  meta with next-seo
* PM2 - necessary to enable multicore support.  see start:multicore in package.json
* create zip distributions - using repack-zip-alt until rollup is fixed 
* PWA Manifest - originally using next-manifest but found it unnecessary.  See static/manifest dir for placeholders.
* non-critical css loaded async with loadCSS (https://github.com/filamentgroup/loadCSS) see _document.js (note I may have hacked this to handle crossorigin)
* RUM (Real User Monitoring) via next-rum (see _app.js) or site24x7 (see end of _document.js) 
* Node Performance Monitoring via site24x7 (see top of server.js)
* br compression - you may want to disable if proxy already supports br

TODO: 
* make it look better 
* reason-apollo - perhaps the next.js "with-apollo" examples working in reason
* desktop/mobile conditional rendering based on device - https://deviceatlas.com/blog/javascript-server-side-rendering-device-detection
* ant-mobile reason bindings
* localization - likely https://react.i18next.com.   
* health check hit critical stuff (database, cdn)
* push notification (next-offline seems to support that)
* next-routes - need to learn this more
* best way to generate site map
* rollup - need dist file without the unused code bloat (see rollup.config.js for current issue)
* beanstalk br compression and server push (would be best to put cloudflare in front instead but I am curious)
* placeholder favicons so everything loads without console errors (i removed my corporate ones to make this boilerplate generic)
* dotenv only runs on local machine (but still during local production build testing)
* nextLink looks at assetPrefix rather than CDN_URL
* sentry code only enabled everywhere if a valid DSN environment variable exists (so uncommenting code isn't necessary)
* bundle analyzer from RAN 
* put babel legacy decorators back per https://github.com/zeit/next.js/pull/5263

What else does every production next.js app need?


## Tips for new users (things experienced users may take for granted)
- npm-check-updates is very helpful for keeping an eye on dependencies
