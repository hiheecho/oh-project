import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { LIGHT_GRAY, DARK_COLOR, LIGHT_COLOR, DARK_GRAY } from "../color";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { SCREEN_HEIGHT } from "../util";

const UserInfo = ({ posts }) => {
  const username = "영화배우 손석구";
  const myInfoComment =
    "저는 이번에 react를 배우게 된 손석구입니다. 만나서 반갑습니다. 이번 경험을 여러분과 함께해서 기쁩니다. 앞으로도 잘 부탁드립니다.";
  const isDark = useColorScheme() === "dark";

  /**  const newPost = {
    text,
    createdAt: Date.now(),
    isEdit: false,
    nickname,
    userID,
  };
 */

  return (
    <DimensionView>
      <MyImg
        style={StyleSheet.absoluteFill}
        source={require("../assets/testImg.jpg")}
      />
      <TouchableOpacity>
        <ProfileEdit style={{ paddingHorizontal: 330 }}>
          <FontAwesome5 name="edit" size={20} color="#AAAAAA" />
        </ProfileEdit>
      </TouchableOpacity>
      <MyInfo>
        <MyInfoName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
          {posts.username}
        </MyInfoName>
        <MyInfoComment style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
          {posts.text.slice(0, 140)}
          {posts.text.length > 140 && "..."}
        </MyInfoComment>
      </MyInfo>
    </DimensionView>
  );
};
export default UserInfo;

const DimensionView = styled.View`
  height: ${SCREEN_HEIGHT / 4.5 + "px"};
  /* background-color: red; */
`;

const ProfileEdit = styled.Text`
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
`;

const MyImg = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  margin-top: 37px;
  margin-left: 20px;
`;
const MyInfo = styled.View`
  margin-top: 30px;
`;
const MyInfoName = styled.Text`
  margin-left: 160px;
  margin-top: 13px;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const MyInfoComment = styled.Text`
  width: 190px;
  height: 100px;
  margin-bottom: 5px;
  margin-left: 160px;
`;
