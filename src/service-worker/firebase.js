import Firebase from "../utils/firebase";

export default function registerFirebaseServiceWorker() {
  return new Promise((resolve) => {
    if ("serviceWorker" in navigator) {
      Notification.requestPermission().then((permission) => {
        console.log(`permission - `, permission);
        if (permission === "granted") {
          console.log(`registering service worker`);
          navigator.serviceWorker
            .register("../firebase-messaging-sw.js")
            .then(function (registration) {
              console.log(`fb sw registered - `, registration);
              navigator.serviceWorker.ready.then((serviceWorker) => {
                console.log(`fb sw ready - `, serviceWorker);
                const firebase = new Firebase(false);
                navigator.serviceWorker.ready.then((ready) => {
                  console.log(`awaited SW - `, ready);
                  firebase.getMessagingToken().then((token) => {
                    console.log(`adding FCM token -- `, token);
                    firebase.onMessageCallback((payload) => {
                      console.log(`message received: payload : `, payload);
                    });
                  });
                });
              });
            });
        }
      });
    }
    resolve(true);
  });
}
