



self.addEventListener("push", (event) => {
  try {
    const data = event.data.json();
    console.log(`data == `, data);

    const title = data?.notification?.title || "Utkarsh";

    const options = {
      body: data?.notification?.body || "",
      icon:
        data?.notification?.icon ||
        "https://utkarshrajput.com/icon-192x192.png",
      data: {
        url: data?.notification?.url || "https://utkarshrajput.com",
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
    console.log(`notificationData -- `, notificationData);

    if (notificationData.url) {
      clients.openWindow(notificationData.url);
    }

    event.notification.close();
  } catch (error) {
    console.log('Error in SW "notificationclick" - ', error);
  }
});