import registerFirebaseServiceWorker from "./firebase";

export default async function registerServiceWorkers() {
  try {
    await registerFirebaseServiceWorker();
  } catch(error) {
    console.log(`error while adding service worker - `, error);
  }
}
