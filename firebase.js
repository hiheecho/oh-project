import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA2EbkUCP0-kT1OL5zW2QEqh24euDeUO8E",
  authDomain: "todolist-a2034.firebaseapp.com",
  projectId: "todolist-a2034",
  storageBucket: "todolist-a2034.appspot.com",
  messagingSenderId: "914656940447",
  appId: "1:914656940447:web:41684f3d62dfee252dadaa",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export { app, auth, dbService, storageService };
