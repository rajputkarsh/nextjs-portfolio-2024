import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', { scope: '/' });

    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        console.log(`self -- `, self);
        console.log(`self.clients -- `, self.clients);
        console.log(`self.windowClientId -- `, self.windowClientId);
        self.clients
          .get(self.windowClientId)
          .postMessage({ type: "installed" });
      }
    });

    wb.addEventListener("push", (event) => {
      try {
        console.log(`event.data == `, event.data);
        const data = JSON.parse(event.data);
        console.log(`data == `, data);

        const title = data?.title || "Utkarsh";

        const options = {
          body: data.body,
          icon: data.icon,
          data: {
            url: data.url,
          }
        };
        event.waitUntil(self.registration.showNotification(title, options));        
      } catch(error) {
        console.log('Error in SW "PUSH" - ', error);
      }
    });

    wb.addEventListener("notificationclick", (event) => {
      try {
        const notificationData = event.notification.data;

        if (notificationData.url) {
          clients.openWindow(notificationData.url);
        }

        event.notification.close();
      } catch (error) {
        console.log('Error in SW "PUSH" - ', error);
      }
    });

    wb.register();
  }
}
