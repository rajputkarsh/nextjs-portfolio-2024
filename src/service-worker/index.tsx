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
    .then(async () => {
      console.log(`1`);
      await registerFirebaseServiceWorker();
      console.log(`2`);
      await registerWorkboxServiceWorker();
      console.log(`3`);
    })
    .catch((error) => {
      console.error("Error while waiting for service workers:", error);
    });
}
