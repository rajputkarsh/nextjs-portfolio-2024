import Firebase from "@/utils/firebase";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      const firebase = new Firebase(false);
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted" && registration) {
          await navigator.serviceWorker.ready;
          const token = await firebase.getMessagingToken(registration);
          console.log(`adding FCM token -- `, token);
          firebase.onMessageCallback((payload) => {
            console.log(`message received: payload : `, payload);
          });
        }
      });
    })
    .catch(function (err) {});
}

self.addEventListener("installed", (event) => {
  // if (event.isUpdate) {
    console.log(`event -- `, event);
    console.log(`self -- `, self);
    console.log(`self.clients -- `, self.clients);
    console.log(`self.windowClientId -- `, self.windowClientId);
    self.clients.get(self.windowClientId).postMessage({ type: "installed" });
  // }
});

self.addEventListener("activated", (event) => {
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
