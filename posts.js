import { addDoc, collection } from "firebase/firestore";
import { dbService } from "./firebase";

// Create
export const addPost = async (newPost) => {
  await addDoc(collection(dbService, "posts"), newPost);
};

// Read

// Update

// Delete
