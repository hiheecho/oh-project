import {
  collection,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { dbService } from "./firebase";

// Create
export const addPost = async (newPost) => {
  await addDoc(collection(dbService, "posts"), newPost);
};

// Read
export const getDetail = ({ queryKey }) => {
  const [_, postId] = queryKey;
  return getDoc(doc(dbService, "posts", postId));
};

// Update
export const updatePost = async ({ id, text, videoLink }) => {
  await updateDoc(doc(dbService, "posts", id), { text, videoLink });
};

export const updateLikes = async ({ id, userLikes }) => {
  await updateDoc(doc(dbService, "posts", id), { userLikes });
};

// Delete
export const deletePost = async (id) => {
  await deleteDoc(doc(dbService, "posts", id));
};
