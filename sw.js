importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js"
);

workbox.core.clientsClaim();
self.skipWaiting();

self.__WB_MANIFEST;

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
