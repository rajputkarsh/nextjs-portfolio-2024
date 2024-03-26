'use client';

import { useEffect } from "react";
import firebase from "@/utils/firebase";

function FirebaseMessagingPermission() {

  useEffect(() => {
    try {
      Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
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