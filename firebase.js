import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7y3T7_HSlFcV9lxTEmYlZ4dIdFM-ORPo",
  authDomain: "musiq-21488.firebaseapp.com",
  projectId: "musiq-21488",
  storageBucket: "musiq-21488.appspot.com",
  messagingSenderId: "932366444903",
  appId: "1:932366444903:web:81393b553d1f2468ec27c2",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);

export { app, auth, dbService, storageService };
