self.addEventListener("install", (event) => {

  self.skipWaiting();

  //TODO: uncomment code -  if (event.isUpdate) {
  console.log(`event -- `, event);
  console.log(`self -- `, self);
  console.log(`self.clients -- `, self.clients);
  console.log(`self.windowClientId -- `, self.windowClientId);
  self.clients.get(self.windowClientId).postMessage({ type: "installed" });
  // }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage(`Log from service worker: ${JSON.stringify(event)}`);
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
