import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyANXDksNNIobIjLTfBgE2DFcm82ucgQ_7g",
  authDomain: "react-native-prac-56143.firebaseapp.com",
  projectId: "react-native-prac-56143",
  storageBucket: "react-native-prac-56143.appspot.com",
  messagingSenderId: "53751644224",
  appId: "1:53751644224:web:45a3cc12b0b43f40301fa5",
  measurementId: "G-RG6V0ZMNTF",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export { app, auth, dbService, storageService };
