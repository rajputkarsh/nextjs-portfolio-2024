'use client';

import { useEffect } from "react";
import Firebase from "@/utils/firebase";

function FirebaseMessagingPermission() {

  useEffect(() => {
    try {
      const firebase = new Firebase(false);
      Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
        await navigator.serviceWorker.ready;
        const token = await firebase.getMessagingToken();
        console.log(`adding FCM token -- `, token);
        window.localStorage.setItem("fcm_token", token || "");
      }
      });      
    } catch(error) {
      console.log(`Error -- `, error)
    }

    return () => {
      console.log(`removing FCM token`);
      window.localStorage.removeItem("fcm_token");
    }
  }, []); 

  return <></>;
}

export default FirebaseMessagingPermission