# Next.js reason-react apollo production ready boilerplate 

https://next-reason-boilerplate.now.sh/
(Note: free hosting may take minutes to fire up)

This project is an attempt to provide a production ready starting point for your cutting edge project.
Feel free to propose anything in tickets or push anything you think would benefit the community.

Setup:
- devcert will ask for a certificate password to enable https in local dev mode.
Run the first `npm run dev` in a normal terminal...editor like Intellij may hide the one time password prompt from you.
- you need to run this for reason-apollo typesafe query checks: `yarn send-introspection-query https://api.graph.cool/simple/v1/cj5geu3slxl7t0127y8sity9r
` 

Install it and run:

```bash
npm install
npm run bsb-watch
(in another tab) npm run dev
```


Build and run:

```bash
npm run build
npm run start
```
(after running production build locally, make sure to unregister service worker in chrome dev tools)

## Features:

* Server Side Rendering - Next.js provides superior performance over CRA https://medium.com/@steve_11957/nextjs-for-dummies-e7fa18719fe1
* Reason-React - ultimate type safety, native reducers, etc. (https://www.imaginarycloud.com/blog/reasonml-react-as-first-intended/)
* Apollo - https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives/
  * Hermes cache (higher performance than default for avg objects with "id" attribute)
  * offline retry with apollo-link-retry  
  * auth sample - patterned from nextjs/examples/with-apollo-auth
* Ant Design - designed for react.  Note it is so huge we really need rollup (or equivalent) working
* Font-Awesome - (no flicker) https://spectrum.chat/thread/56b0396d-8b7d-447d-9f46-24ba6192936e
* offline support - next-offline. See server.js manifest prefix with assetPrefix hack 
* Sentry - quite a mess but functional: https://github.com/zeit/next.js/pull/5727
* Source Maps - next-source-maps (production for sentry, see server.js)
* prefetch next page data on link hover (https://shaleenjain.com/blog/nextjs-apollo-prefetch/)
* non-critical css loaded async - see loadCSS in _document.js (hacked this version to handle crossorigin)
* localization - react-intl (recommended for its formatjs feature set and existing reason bindings)
* polyfill only enabled for browsers that need it - see nomodule and https://polyfill.io/v2
* modules for building only loading during dev/build.  See "phase" in next.config.js
* cors whitelist - necessary for service-worker preload to cache response correctly (see server.js)
* desktop/mobile conditional rendering - based on device using react-useragent
* healthcheck - "express-healthcheck" 
* helmet - basic ssr security best practices enabled in server.js
* styleguide - npm run storybook  (Needed some less fixes in .storybook/webpack.config.js)
* robots.txt - see server.js
* SEO - see next-seo for metadata management (replaces react-helmet-async popular in CRA)
* multicore support - see PM2 and "start:multicore" in package.json
* optimal distribution size - using repack-zip-alt to create production zip until rollup is fixed 
* PWA Manifest - originally using next-manifest but found conflict with next-offline.  See static/manifest dir for placeholders.
* RUM (Real User Monitoring) via next-rum (see _app.js) or site24x7 (see end of _document.js) 
* Node Performance Monitoring via site24x7 (see top of server.js)
* br compression - you should disable this in server.js if your proxy already supports br (ie cloudflare)
* bundle analyzer (npm run analyze)
* paramaterized routes - see server.js (next team members advise against next-routes at scale)
* purge unused css - see next.config.js for whitelist (you would normally only add components you need)
* https in dev - using devcert.  useful for service worker testing
* jest testing
* react context - sample variable in _app.js used in index

What else does every production next.js app need?

## Production Prep
* add .env to your .gitignore and remove from git: `git rm -r .env`.  It is only checked in to give you a starting point.

## Deployment suggestions
  * Now (v1)- recommended due to ease of deployments, superior compression (br), auto support for server push with their cdn. 
    The modules used in sample are currently too big to be used in now v2.
  * Beanstalk - config files, sumologic logging.  What I personally use right now. 
  * Lambda - current module set make dist file too big for aws. Before it was too big, cold starts were an issue even with scheduled warming.
    Avg response ~150ms vs beanstalk ~40ms (not a big deal for api but not optimal for consumer facing).  See this if you want to look more into 
    serverless: https://github.com/skriems/next-material-aws-lambda  
  * See https://www.rantoolkit.com/docs/Deployment/ for updates and others  


## KNOWN ISSUES
* sentry requires node 8.x (10.x has a memory leak) https://github.com/zeit/next.js/pull/5727#issuecomment-443279483
* ant design elements sometimes need hard reload in development - it will all run fine on production
Next.js v7 has a critical bug with less/css right now: https://spectrum.chat/?t=2183fc55-236d-42cb-92b9-3ab10acc6303
The only workaround I could get going is not to load less/css files.  This impacts ant design hot reload because 
on development you would import antd.less globally only in dev mode to make hot deploy work.

## Tips for new users (things experienced users may take for granted)
- npm-check-updates is very helpful for keeping an eye on dependencies (ie "ncu")


## TODO: 
* health check hit critical stuff rather than just confirm ssr working (database, cdn, etc)
* figure out best way to generate site map
* rollup - waiting on potential Next.js bug (see rollup.config.js for current issue)
* placeholder favicons for PWA manifest 
* improve desktop/mobile example to switch between antd mobile/desktop rather than just different words

## Inspired by:
* https://www.rantoolkit.com
* https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite
