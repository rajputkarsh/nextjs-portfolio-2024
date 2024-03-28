import registerFirebaseServiceWorker from "./firebase";
import registerWorkboxServiceWorker from "./workbox";

async function waitForServiceWorkerReady() {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    const promises = registrations.map(
      (registration) => registration.waiting || registration.active
    );
    await Promise.all(promises);
  }
}

export default async function registerServiceWorkers() {
  console.log(`waiting for service workers`);
  waitForServiceWorkerReady()
    .then(() => {
      console.log(`1`);
      registerFirebaseServiceWorker().then(() => {
        console.log(`2`);
        registerWorkboxServiceWorker()?.then(() => {
          console.log(`3`);
        });
      });
    })
    .catch((error) => {
      console.error("Error while waiting for service workers:", error);
    });
}
