'use client';

import { useEffect } from "react";
import Firebase from "@/utils/firebase";

function FirebaseMessagingPermission() {

  useEffect(() => {
    try {
      const firebase = new Firebase(false);
      console.log(
        `window.location.hostname !== "localhost" == `,
        window.location.hostname !== "localhost"
      );
      console.log(`navigator -- `, navigator)
      Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
        await navigator.serviceWorker.ready;
        const token = await firebase.getMessagingToken();
        console.log(`token == `, token)
      }
      });      
    } catch(error) {
      console.log(`Error -- `, error)
    }
  }, []); 

  return <></>;
}

export default FirebaseMessagingPermission