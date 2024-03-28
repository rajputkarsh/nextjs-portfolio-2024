import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Messaging,
  getMessaging,
  onMessage,
  getToken,
} from "firebase/messaging";
import {
  Firestore,
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  orderBy,
} from "firebase/firestore";

const FIREBASE_CONFIG = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    process.env.FIREBASE_AUTH_DOMAIN,
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    process.env.FIREBASE_MEASUREMENT_ID,
};

class Firebase {
  #app: FirebaseApp;
  #db: Firestore;
  #messaging: Messaging | undefined;

  constructor(isServer: boolean) {
    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);

    this.#app = app;
    this.#db = db;

    if (!isServer) {
      const messaging = getMessaging(app);
      this.#messaging = messaging;
    }
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

  async saveDocument(
    collectionName: string,
    data: { [key: string]: any }
  ): Promise<void> {
    try {
      const documentRef = doc(this.#db, collectionName, crypto.randomUUID());
      const result = await setDoc(documentRef, data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async saveToken(token: string): Promise<void> {
    try {
      const TOKEN_COLLECTION: string = "fcmTokens";
      const data = {
        token: token,
        added: new Date().toISOString(),
      };

      const doesTokenExist = await this.doesTokenExist(TOKEN_COLLECTION, token);
      if (doesTokenExist) {
        return;
      }
      return this.saveDocument(TOKEN_COLLECTION, data);
    } catch (error) {
      throw error;
    }
  }

  async doesTokenExist(
    collectionName: string,
    token: string
  ): Promise<boolean> {
    try {
      const documents = await getDocs(
        query(collection(this.#db, collectionName), where("token", "==", token))
      );

      return documents.size > 0;
    } catch (error) {
      throw error;
    }
  }

  async getMessagingToken(
    registration: ServiceWorkerRegistration
  ): Promise<string | null> {
    try {
      if (!this.#messaging) return null;
      return getToken(this.#messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: process.env.VAPID_KEY,
      });
    } catch (error) {
      throw error;
    }
  }

  onMessageCallback(callback: (payload: any) => void) {
    if (!this.#messaging) return;
    return onMessage(this.#messaging, callback);
  }
}

export default Firebase;
