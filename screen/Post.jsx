import React, { useEffect } from "react";
import styled from "@emotion/native";
import {
  FlatList,
  useColorScheme,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { dbService } from "../firebase";
import { authService } from "../firebase";
import { DARK_COLOR, LIGHT_COLOR, DARK_GRAY } from "../color";
import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  TouchableOpacity,
} from "@firebase/firestore";
import { query } from "@firebase/firestore";
import { Entypo } from "@expo/vector-icons";

const Post = () => {
  const isDark = useColorScheme() === "dark";

  const [content, setContent] = useState([]);

  const [text, setText] = useState("");

  const newcontent = {
    text,
    createAt: Date.now(),
  };

  const addContent = async () => {
    console.log(text);
    await addDoc(collection(dbService, "contents"), newcontent);
    setText("");
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "contents"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newcontent = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContent(newcontent);
    });
    return unsubscribe;
  }, []);

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

      {content.map((item) => {
        return (
          <View key={item.id}>
            <Text style={{ color: "white" }}>{item.text}</Text>{" "}
          </View>
        );
      })}
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
const CommentRow = styled.View`
  width: 93%;
  height: 18%;
  margin: 3.5%;
  border-radius: 10px;
  padding-top: 19%;
  padding-left: 2%;
  padding-right: 2%;
`;
const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 13px;
  border-radius: 50px;
`;
const CommentText = styled.Text`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 15px;
  margin-bottom: 5px;
`;
const CommentName = styled.Text`
  position: absolute;
  margin-left: 80px;
  margin-top: 24px;
  font-size: 17px;
  font-weight: 600;
`;

const EditDeleteBtn = styled.View`
  position: absolute;
  margin-left: 340px;
  margin-top: 15px;
`;

const PlusBtn = styled.View`
  position: absolute;
  margin-left: 340px;
  margin-top: 180%;
`;
