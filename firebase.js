import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZ799wGCVYs0epUFdANY-QHIXWrDuskxk",
  authDomain: "login-1a9eb.firebaseapp.com",
  projectId: "login-1a9eb",
  storageBucket: "login-1a9eb.appspot.com",
  messagingSenderId: "74555616474",
  appId: "1:74555616474:web:c331dede03ca7607bd09e3",
  measurementId: "G-6D3BH9158R",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);

export { app, auth, dbService, storageService };
