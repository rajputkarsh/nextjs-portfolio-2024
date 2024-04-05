import Firebase from "../utils/firebase";

function handleServiceWorker(): Promise<void> {
  return navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      navigator.serviceWorker.ready.then((serviceWorker) => {
        const firebase = new Firebase(false);
        navigator.serviceWorker.ready.then((ready) => {
          firebase.getMessagingToken(registration).then((token) => {
            if(token) {
              firebase.saveToken(token).then(() => {
                const messageObserver = firebase.onMessageCallback(
                  firebase.foregroundNotificationHandler
                );
              });
            }
          });
        });
      });
    });
}

export default function registerFirebaseServiceWorker(): Promise<boolean> {
  return new Promise((resolve) => {
    if ("serviceWorker" in navigator) {
      if (Notification.permission === "granted") {
        handleServiceWorker().then(() => {
          resolve(true);
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            handleServiceWorker().then(() => {
              resolve(true);
            });
          }
        });
      }
    }
  });
}
