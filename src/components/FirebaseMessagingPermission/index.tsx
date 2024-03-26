'use client';

import { useEffect } from "react";
import firebase from "@/utils/firebase";

function FirebaseMessagingPermission() {

  useEffect(() => {
    Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      const token = await firebase.getMessagingToken();
      console.log(`token == `, token)
    }
    });
  }, []); 

  return <></>;
}

export default FirebaseMessagingPermission