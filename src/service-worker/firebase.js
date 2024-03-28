import Firebase from '../utils/firebase';

export default function registerFirebaseServiceWorker() {
if ("serviceWorker" in navigator) {
  console.log(`registering service worker`);
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
     console.log(`fb sw registered`);
      navigator.serviceWorker.ready.then((serviceWorker) => {
        console.log(`fb sw ready`)
        const firebase = new Firebase(false);
        Notification.requestPermission().then(async (permission) => {
          if (permission === "granted") {
            console.log(`permission granted`);
            await navigator.serviceWorker.ready;
            console.log(`awaited SW`);
            const token = await firebase.getMessagingToken();
            console.log(`adding FCM token -- `, token);
            const unsubscribe = firebase.onMessageCallback((payload) => {
              console.log(`message received: payload : `, payload);
            });

            return () => {
              console.log(`unsubscribing`);
              unsubscribe && unsubscribe();
            };
          }
        });
      });
    });
}

}