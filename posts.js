import { addDoc, collection, getDoc, doc } from "firebase/firestore";
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

// Delete
