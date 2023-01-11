import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { dbService } from "./firebase";

// Create
export const addPost = async (newPost) => {
  await addDoc(collection(dbService, "posts"), newPost);
};

// Read
export const getDetail = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  return await getDoc(doc(dbService, "posts", postId));
};
// Update
export const updatePost = async ({ id, text }) => {
  await updateDoc(doc(dbService, "posts", id), { text });
};

// Delete
export const deletePost = async (id) => {
  await deleteDoc(doc(dbService, "posts", id));
};
