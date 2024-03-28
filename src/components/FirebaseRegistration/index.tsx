'use client';

import Firebase from "@/utils/firebase";
import { useEffect } from "react"

function FirebaseRegistration() {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
      navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      navigator.serviceWorker.ready.then((serviceWorker) => {
      const firebase = new Firebase(false);
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          await navigator.serviceWorker.ready;
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
  }, []);

  return (
    <></>
  )
}

export default FirebaseRegistration