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

const UserInfo = ({ item }) => {

  const isDark = useColorScheme() === "dark";

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
          {item.userName}
        </MyInfoName>
        <MyInfoComment style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
          {item.text.slice(0, 140)}
          {item.text.length > 140 && "..."}
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
