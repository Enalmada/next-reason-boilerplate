

self.addEventListener("fetch", event => {
    event.respondWith(handleRequest(event))
});

async function handleRequest(event) {

    const response = await fetch(event.request);

    if (event.request.url.indexOf("https://fonts.googleapis.com/css") === 0 && response.status < 400) {

        const cache = await caches.open("google-fonts-stylesheets");
        const cacheResponse = await cache.match(event.request);

        if (cacheResponse) {
            return cacheResponse;
        }

        const css = await response.text();
        const patched = css.replace(/}/g, "font-display: swap; }");
        const newResponse = new Response(patched, {headers: response.headers});
        cache.put(event.request, newResponse.clone());
        return newResponse;
    }
    return response;
}
