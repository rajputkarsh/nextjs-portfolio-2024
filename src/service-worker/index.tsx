import registerFirebaseServiceWorker from "./firebase";
import registerWorkboxServiceWorker from "./workbox";

export default async function registerServiceWorkers() {
  try {
    await registerFirebaseServiceWorker();
    await registerWorkboxServiceWorker();
  } catch(error) {
    console.log(`error while adding service worker - `, error);
  }
}
