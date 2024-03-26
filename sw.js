importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js"
);

workbox.core.clientsClaim();
self.skipWaiting();

    self.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        console.log(`event -- `, event);
        console.log(`self -- `, self);
        console.log(`self.clients -- `, self.clients);
        console.log(`self.windowClientId -- `, self.windowClientId);
        self.clients
          .get(self.windowClientId)
          .postMessage({ type: "installed" });
      }
    });

    self.addEventListener("activated", (event) => {
      event.waitUntil(
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage(
              `Log from service worker: ${JSON.stringify(event)}`
            );
          });
        })
      );
    });

    self.addEventListener("push", (event) => {
      try {
        console.log(`event.data == `, event.data);
        const data = JSON.parse(event.data);
        console.log(`data == `, data);

        const title = data?.title || "Utkarsh";

        const options = {
          body: data.body,
          icon: data.icon,
          data: {
            url: data.url,
          },
        };
        event.waitUntil(self.registration.showNotification(title, options));
      } catch (error) {
        console.log('Error in SW "PUSH" - ', error);
      }
    });

    self.addEventListener("notificationclick", (event) => {
      try {
        const notificationData = event.notification.data;

        if (notificationData.url) {
          clients.openWindow(notificationData.url);
        }

        event.notification.close();
      } catch (error) {
        console.log('Error in SW "PUSH" - ', error);
      }
    });

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

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
