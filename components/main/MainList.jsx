
import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import Likes from "./Likes";
import DropDown from "../DropDown";

const MainList = ({ item }) => {
  const { navigate } = useNavigation();

  const goToDetail = () => {
    navigate("Stacks", {
      screen: "PostDetail",
      params: { item },
    });
  };

  const _maybeRenderImage = (item) => {
    if (!auth.currentUser.photoURL) {
      return (
        <UserImg
          style={StyleSheet.absoluteFill}
          source={require("../../assets/icon.png")}
        />
      );
    }

    return (
      <UserImg
        style={StyleSheet.absoluteFill}
        source={{ uri: item.userImage }}
      />
    );
  };

  if (isLoadingDeleting) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={goToDetail}>
      <CommentRow>
        {_maybeRenderImage(item)}

        <CommentName>
          {" "}
          {auth.currentUser.uid === item.userId
            ? auth.currentUser.displayName
            : item.userName}
        </CommentName>
        <CommentText>{item.text}</CommentText>
        <Likes item={item} />
        {item.userId === auth.currentUser.uid ? <DropDown item={item} /> : null}
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
  padding-bottom: 3%;
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
  width: 100%;
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
