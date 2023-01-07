import React, { useState } from "react";
import styled from "@emotion/native";
import { useColorScheme } from "react-native";
import { DARK_COLOR, LIGHT_COLOR } from "../color";
import { collection } from "firebase/firestore";
import { dbService } from "../firebase";
import { addDoc } from "firebase/firestore";

const Post = ({ navigation: { goBack } }) => {
  const isDark = useColorScheme() === "dark";
  const [text, setText] = useState();

  const newPost = {
    text,
    createdAt: Date.now(),
    isEdit: false,
  };

  const addPost = async () => {
    await addDoc(collection(dbService, "posts"), newPost);
    goBack();
  };

  return (
    <Contents>
      <TextArea
        value={text}
        onChangeText={setText}
        placeholder="추천곡을 입력해주세요."
        placeholderTextColor={isDark ? DARK_COLOR : LIGHT_COLOR}
        multiline={true}
        textAlignVertical="top"
      ></TextArea>
      {text && text.length <= 150 ? (
        <LettersCount>{150 - text.length}</LettersCount>
      ) : (
        <LettersOver>
          {text ? 150 - text.length : <LettersCount>0</LettersCount>}
        </LettersOver>
      )}
      {(text && text.length > 150) || !text ? (
        <BtnInactive>임시 글쓰기 버튼</BtnInactive>
      ) : (
        <BtnActive onPress={addPost}>임시 글쓰기 버튼</BtnActive>
      )}
    </Contents>
  );
};

export default Post;

const Contents = styled.View`
  flex: 1;
`;

const TextArea = styled.TextInput`
  flex: 1;
  padding: 20px;
  font-size: 17px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
  text-decoration: ${(post) =>
    post.length > 10 ? "underline dotted red" : "none"};
`;

const LettersCount = styled.Text`
  color: ${(props) => props.theme.color};
  text-align: right;
  padding: 10px;
  font-size: 18px;
`;

const LettersOver = styled.Text`
  color: red;
  text-align: right;
  padding: 10px;
  font-size: 18px;
`;

const BtnActive = styled.Text`
  flex: 1;
  color: ${(props) => props.theme.color};
`;

const BtnInactive = styled.Text`
  flex: 1;
  color: #a1a1a1;
`;
