import registerFirebaseServiceWorker from "./firebase";
import registerWorkboxServiceWorker from "./workbox";

export default async function registerServiceWorkers() {
  try {
    console.log(`1`);
    await registerFirebaseServiceWorker();
    console.log(`2`);
    await registerWorkboxServiceWorker();
    console.log(`3`);
  } catch(error) {
    console.log(`error while adding service worker - `, error);
  }
}
