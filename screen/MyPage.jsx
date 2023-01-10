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
import { BRAND_COLOR } from "../color";
import { auth } from "../firebase";
const MyPage = () => {
  const onLogOutClick = () => {
    auth.signOut();
  };
  const isDark = useColorScheme() === "dark";
  const username = "영화배우 손석구";
  const myInfoComment =
    "저는 이번에 react를 배우게 된 손석구입니다. 만나서 반갑습니다. 이번 경험을 여러분과 함께해서 기쁩니다. 앞으로도 잘 부탁드립니다.";
  const MyComment =
    "이 노래 진짜 좋아요. 저도 영화 촬영 할 때 마다 듣고 하는데 진짜 너무 좋아요! 저는 적극 추천합니다.";

  return (
    <ScrollView>
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
            {username}
          </MyInfoName>
          <MyInfoComment style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {myInfoComment.slice(0, 140)}
            {myInfoComment.length > 140 && "..."}
          </MyInfoComment>
        </MyInfo>
      </DimensionView>
      <LogOutBt
        style={{
          backgroundColor: BRAND_COLOR,
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
        onPress={onLogOutClick}
      >
        <LogOutText>로그아웃</LogOutText>
      </LogOutBt>
      <MyCommentRow
        style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
      >
        <MyCommentImg
          style={StyleSheet.absoluteFill}
          source={require("../assets/testImg.jpg")}
        />
        <MyCommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
          {username}
        </MyCommentName>
        <MyCommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
          {MyComment.slice(0, 60)}
          {MyComment.length > 60 && "..."}
        </MyCommentText>
        <EditDeleteBtn>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
          </TouchableOpacity>
        </EditDeleteBtn>
      </MyCommentRow>
    </ScrollView>
  );
};
export default MyPage;
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

const MyCommentRow = styled.View`
  width: 345px;
  height: 120px;
  margin-left: 16px;
  border-radius: 10px;
  padding-top: 70px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 12px;
`;
const MyCommentImg = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 13px;
  border-radius: 50px;
`;
const MyCommentText = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
`;
const MyCommentName = styled.Text`
  position: absolute;
  margin-left: 80px;
  margin-top: 24px;
  font-size: 17px;
  font-weight: 600;
`;

const EditDeleteBtn = styled.View`
  position: absolute;
  margin-left: 305px;
  margin-top: 15px;
`;

const LogOutText = styled.Text`
  font-size: 17px;
  color: white;
`;

const LogOutBt = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: "black";
  width: 30%;
  align-items: center;
  border-radius: 50px;
  margin-left: 130px;
  margin-bottom: 20px;
`;
