import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { dbService } from "./firebase";

// Create
export const addPost = async (newPost) => {
  await addDoc(collection(dbService, "posts"), newPost);
};

// Read

// Update

// Delete
export const deletePost = async (id) => {
  await deleteDoc(doc(dbService, "posts", id));
};
