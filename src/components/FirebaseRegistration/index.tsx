import Firebase from "@/utils/firebase";
import { useEffect } from "react"

function FirebaseRegistration() {

  useEffect(() => {
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
          }
        }
      });
  }, []);

  return (
    <></>
  )
}

export default FirebaseRegistration