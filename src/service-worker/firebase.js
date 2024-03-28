import Firebase from "../utils/firebase";

export default function registerFirebaseServiceWorker() {
  return new Promise((resolve) => {
    if ("serviceWorker" in navigator) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          navigator.serviceWorker
            .register("../firebase-messaging-sw.js")
            .then(function (registration) {
              navigator.serviceWorker.ready.then((serviceWorker) => {
                const firebase = new Firebase(false);
                navigator.serviceWorker.ready.then((ready) => {
                  firebase.getMessagingToken(registration).then((token) => {
                    firebase.saveToken(token).then(() => {
                      firebase.onMessageCallback((payload) => {
                        console.log(`message received: payload : `, payload);
                      });
                    })
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
