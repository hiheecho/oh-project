import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import styled from "@emotion/native";
import {
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
  DROPDOWN_BACKGROUND_COLOR,
} from "../color";
import { useColorScheme } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { deletePost } from "../posts";
import { useMutation } from "react-query";
import { Alert } from "react-native";
import DropDown from "./DropDown";

const MainList = ({ item }) => {
  const { navigate } = useNavigation();
  const goToDetail = () => {
    navigate("Stacks", {
      screen: "PostDetail",
      params: { item },
    });
  };

  // 삭제
  const { isLoading: isLoadingDeleting, mutate: del } = useMutation(
    ["deletePost", item.id],
    (body) => deletePost(body),
    {
      onSuccess: () => {
        console.log("삭제 완료");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const onDeletePost = async () => {
    Alert.alert("포스트 삭제", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "destructive" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            await del(item.id);
          } catch (error) {
            console.log("error", error);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <CommentRow>
        <UserImg
          style={StyleSheet.absoluteFill}
          source={require("../assets/icon.png")}
        />
        <CommentName>
          {auth.currentUser.uid === item.userId
            ? auth.currentUser.displayName
            : item.userName}
        </CommentName>
        <CommentText>
          {item.text.slice(0, 60)}
          {item.text.length > 60 && "..."}
        </CommentText>
        {auth.currentUser.uid === item.userid ? item.content : null}
        {item.userId === auth.currentUser.uid ? (
          <DropDown
            onDeletePost={onDeletePost}
            isLoadingDeleting={isLoadingDeleting}
          />
        ) : null}
      </CommentRow>
    </TouchableOpacity>
  );
};

const CommentRow = styled.View`
  width: 93%;
  margin-top: 3%;
  margin-left: 3.5%;
  margin-bottom: 3%;
  border-radius: 10px;
  padding-top: 20%;
  padding-left: 2%;
  padding-right: 2%;
  background-color: ${(props) => props.theme.gray};
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
  margin-bottom: 20px;
  color: ${(props) => props.theme.color};
`;
const CommentName = styled.Text`
  position: absolute;
  margin-left: 80px;
  margin-top: 24px;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;

export default MainList;
