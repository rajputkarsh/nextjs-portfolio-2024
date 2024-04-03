



self.addEventListener("push", (event) => {
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
      },
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.log('Error in SW "PUSH" - ', error);
  }
});

self.addEventListener("notificationclick", (event) => {
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