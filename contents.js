// useMutation
// 추후에 사용할 수도 있으므로 남겨둠

import { addDoc, collection, getDocs } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";
import { dbService } from "./firebase";

// 게시글

// 조회
export const fetchPost = async () => {
  await getDocs(collection(dbService, "posts"));
};

// 작성
// addSuperHero
export const addPost = async (newPost) => {
  await addDoc(collection(dbService, "posts"), newPost);
};

// useSuperHeroesData
export const useNewPostData = (onSuccess, onError) => {
  return useQuery("new-post", fetchPost, {
    onSuccess,
    onError,
  });
};

// useAddSuperHeroData
export const useAddPostData = () => {
  return useMutation(addPost);
};
