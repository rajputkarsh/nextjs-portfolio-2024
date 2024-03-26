import { FirebaseApp, initializeApp, } from "firebase/app";
import { Messaging, getMessaging, getToken } from "firebase/messaging";
import {
  Firestore,
  getFirestore,
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  orderBy,
} from "firebase/firestore";

const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

class Firebase {
  #app: FirebaseApp;
  #db: Firestore;
  #messaging: Messaging;

  constructor() {
    this.#app = initializeApp(FIREBASE_CONFIG);
    this.#db = getFirestore(this.#app);
    this.#messaging = getMessaging(this.#app);
  }

  async getDocuments<T>(name: string): Promise<Array<T>> {
    try {
      const documents = await getDocs(
        query(collection(this.#db, name), orderBy("index", "desc"))
      );
      const documentArray: Array<T> = [];
      documents.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        documentArray.push({ ...doc.data(), id: doc.id } as T);
      });

      return documentArray as Array<T>;
    } catch (error) {
      throw error;
    }
  }

  getMessagingToken() {
    return getToken(this.#messaging, {
      vapidKey: process.env.VAPID_KEY,
    });
  }
}

export default new Firebase();
