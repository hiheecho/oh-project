import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import styled from "@emotion/native";
import { DARK_COLOR, LIGHT_COLOR } from "../color";
import { DARK_GRAY, LIGHT_GRAY } from "../color";
import { useColorScheme } from "react-native";

import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const MainList = ({ item }) => {
  const { navigate } = useNavigation();
  const goToDetail = () => {
    navigate("Stacks", {
      screen: "PostDetail",
      params: { item },
    });
  };
  const isDark = useColorScheme() === "dark";
  return (
    <TouchableOpacity onPress={goToDetail}>
      <CommentRow style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}>
        <UserImg
          style={StyleSheet.absoluteFill}
          source={require("../assets/icon.png")}
        />
        <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
          {item.userName}
        </CommentName>
        <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
          {item.text.slice(0, 60)}
          {item.text.length > 60 && "..."}
        </CommentText>
        <EditDeleteBtn>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
          </TouchableOpacity>
        </EditDeleteBtn>
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
  right: 15px;
  top: 10px;
`;
export default MainList;
