import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { SCREEN_HEIGHT } from "../util";
import { auth } from "../firebase";
const MyPage = () => {
  const onLogOutClick = () => {
    auth.signOut();
  };
  const username = "영화배우 손석구";
  const myInfoComment =
    "저는 이번에 react를 배우게 된 손석구입니다. 만나서 반갑습니다. 이번 경험을 여러분과 함께해서 기쁩니다. 앞으로도 잘 부탁드립니다.";
  const MyComment =
    "이 노래 진짜 좋아요. 저도 영화 촬영 할 때 마다 듣고 하는데 진짜 너무 좋아요! 저는 적극 추천합니다.";

  return (
    <ScrollView>
      <DimensionView>
        <ImgBox>
          <MyImg source={require("../assets/testImg.jpg")} />
        </ImgBox>

        <ProfileEdit>
          <FontAwesome5 name="edit" size={18} color="#AAAAAA" />
        </ProfileEdit>

        <MyInfo>
          <MyInfoName>{username}</MyInfoName>
          <MyInfoComment numberOfLines={3}>{myInfoComment}</MyInfoComment>
        </MyInfo>
      </DimensionView>

      <CommentContainer>
        <MyCommentRow>
          <Box1>
            <ImgBox>
              <MyCommentImg source={require("../assets/testImg.jpg")} />
            </ImgBox>

            <MyCommentName>{username}</MyCommentName>

            <EditDeleteBtn>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </EditDeleteBtn>
          </Box1>
          <MyCommentText>{MyComment}</MyCommentText>
        </MyCommentRow>
      </CommentContainer>
      <CommentContainer>
        <MyCommentRow>
          <Box1>
            <ImgBox>
              <MyCommentImg source={require("../assets/testImg.jpg")} />
            </ImgBox>

            <MyCommentName>{username}</MyCommentName>

            <EditDeleteBtn>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </EditDeleteBtn>
          </Box1>
          <MyCommentText>{MyComment}</MyCommentText>
        </MyCommentRow>
      </CommentContainer>

      <LogOutBtn onPress={onLogOutClick}>
        <LogOutText>로그아웃</LogOutText>
      </LogOutBtn>
    </ScrollView>
  );
};
export default MyPage;
const DimensionView = styled.View`
  flex-direction: row;
`;
const ProfileEdit = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const ImgBox = styled.View``;
const MyImg = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin: 20px;
`;
const MyInfo = styled.View`
  width: 70%;
  margin: 10px 0;
`;
const MyInfoName = styled.Text`
  margin: 10px 0;
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.theme.color};
`;
const MyInfoComment = styled.Text`
  width: 80%;
  color: ${(props) => props.theme.color};
`;
const CommentContainer = styled.View`
  align-items: center;
  margin: 5px 0;
`;

const MyCommentRow = styled.View`
  width: 95%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.gray};
`;
const Box1 = styled.View`
  flex-direction: row;
  align-items: center;
`;
const MyCommentImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
const MyCommentName = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;
const MyCommentText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.color};
`;

const EditDeleteBtn = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const LogOutText = styled.Text`
  font-size: 18px;
  color: white;
`;

const LogOutBtn = styled.TouchableOpacity`
  width: 30%;
  align-items: center;
  border-radius: 50px;
  padding: 10px 15px;
  margin: 10px;
  background-color: ${(props) => props.theme.brandColor};
`;
