importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener("install", (event) => {
  if (event.isUpdate) {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage.postMessage({ type: "installed" });
      });
    });
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: "activated" });
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