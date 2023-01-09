import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  // 임시
  apiKey: "AIzaSyBxwMsO8gzmNCM4MT7MlbhdOMQID5ATtYA",
  authDomain: "rn-todolist-94a8d.firebaseapp.com",
  projectId: "rn-todolist-94a8d",
  storageBucket: "rn-todolist-94a8d.appspot.com",
  messagingSenderId: "412199444502",
  appId: "1:412199444502:web:b5b06bdc61f234a843d537",
  measurementId: "G-WM0WC6YDE3",
};
const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export { app, authService, dbService, storageService };
