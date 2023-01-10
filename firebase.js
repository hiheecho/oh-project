import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBaj9DWhPp4rYQNtFdW89FTlg-25szLSMs",
  authDomain: "gogokongs.firebaseapp.com",
  projectId: "gogokongs",
  storageBucket: "gogokongs.appspot.com",
  messagingSenderId: "52837888582",
  appId: "1:52837888582:web:469af3f0a56f0c56f25047",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export { app, auth, dbService, storageService };
