import { Workbox } from 'workbox-window';
import Firebase from '@/utils/firebase';

export default function registerServiceWorker() {
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', { scope: '/' });

    wb.register().then((registration) => {
      const firebase = new Firebase(false);
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted" && registration) {
          await navigator.serviceWorker.ready;
          const token = await firebase.getMessagingToken(registration);
          console.log(`adding FCM token -- `, token);
          firebase.onMessageCallback((payload) => {
            console.log(`message received: payload : `, payload);
          });
        }
      });        
    });
  }
}
