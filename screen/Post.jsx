import React from "react";
import styled from "@emotion/native";
import { useColorScheme, ScrollView } from "react-native";
import { useState } from "react";
import { dbService } from "../firebase";
import { DARK_COLOR, LIGHT_COLOR, DARK_GRAY } from "../color";
import { async } from "@firebase/util";
import { addDoc, collection, onSnapshot, orderBy } from "@firebase/firestore";

const Post = () => {
  //글쓰기 테스트
  const isDark = useColorScheme() === "dark";

  const [text, setText] = useState("");

  const newcontent = {
    text,
    createAt: Date.now(),
  };

  const addContent = async () => {
    console.log(text);
    await addDoc(collection(dbService, "posts"), newcontent);
    setText("");
  };

  return (
    <ScrollView>
      <TextArea
        onSubmitEditing={addContent}
        onChangeText={setText}
        vlaue={text}
        placeholder="10자 이상 작성해주세요."
        placeholderTextColor={isDark ? DARK_COLOR : LIGHT_COLOR}
        multiline={true}
        textAlignVertical="top"
      ></TextArea>
    </ScrollView>
  );
};

export default Post;

const TextArea = styled.TextInput`
  flex: 1;
  padding: 20px;
  font-size: 17px;
  color: white;
  background-color: ${(props) => props.theme.background};
`;
