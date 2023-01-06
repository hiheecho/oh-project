import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC0TYZa90Ok67aUUG_EjuOdvvp2uRJKKes",
  authDomain: "oh-project-205fc.firebaseapp.com",
  projectId: "oh-project-205fc",
  storageBucket: "oh-project-205fc.appspot.com",
  messagingSenderId: "1057452344249",
  appId: "1:1057452344249:web:15aa2eb11dc7b5573a2c68",
};
const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export { app, authService, dbService, storageService };
