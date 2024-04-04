

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
    const data = event.data.json();

    const title = data?.notification?.title || "Utkarsh";

    const options = {
      body: data?.notification?.body || "",
      icon:
        data?.notification?.icon ||
        "https://utkarshrajput.com/icon-192x192.png",
      data: {
        url: data?.data?.url || "https://utkarshrajput.com",
      },
    };

    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "notificationReceived",
            data: { title, options },
          });
        });
      })
    );

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
    console.log('Error in SW "notificationclick" - ', error);
  }
});
