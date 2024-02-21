import { Project } from "@/interfaces/project";
import { FirebaseApp, initializeApp } from "firebase/app";
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

  constructor() {
    this.#app = initializeApp(FIREBASE_CONFIG);
    this.#db = getFirestore(this.#app);
  }

  async getDocuments(name: string): Promise<Array<Project>> {
    try {
      const documents = await getDocs(
        query(collection(this.#db, name), orderBy("index", "desc"))
      );
      const documentArray: Array<Project> = [];
      documents.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        documentArray.push({ ...doc.data(), id: doc.id } as Project);
      });

      return documentArray as Array<Project>;
    } catch (error) {
      throw error;
    }
  }
}

export default new Firebase();
