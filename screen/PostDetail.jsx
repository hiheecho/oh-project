import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "@emotion/native";
import { LIGHT_GRAY, LIGHT_BTN } from "../color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PostDetail = () => {
  return (
    <>
      <DetailContent>
        <ContentHeader>
          <UserInfo>
            <UserImage
              source={require("../assets/icon.png")}
              style={{ width: 70, height: 70 }}
            />
            <Nickname>부드라미</Nickname>
          </UserInfo>
          <TouchableOpacity>
            <EditBtn>글 수정</EditBtn>
          </TouchableOpacity>
        </ContentHeader>
        {/* <Youtube /> */}
        <ContentText>
          부드라미 BGM 너무 좋아요. {"\n"}바들바들 동물콘 브금 다들 들어보세요.
        </ContentText>
      </DetailContent>

      <ContentList>
        <Content>
          <ContentHeader>
            <UserInfo>
              <UserImage source={require("../assets/icon.png")} />
              <Nickname>부드라미</Nickname>
            </UserInfo>
            <MoreBtn>
              <Feather name="more-horizontal" size={24} color="black" />
            </MoreBtn>
          </ContentHeader>
          <CommentText>
            부드라미 BGM 너무 좋아요. {"\n"}바들바들 동물콘 브금 다들
            들어보세요.
            {"\n"}감사합니다.
          </CommentText>
        </Content>
      </ContentList>
      {/* 키보드가 UI 가림 (수정중) */}
      <KeyboardAwareScrollView>
        <CommentInputContainer>
          <CommentUser source={require("../assets/icon.png")} />
          <CommentInputWrapper>
            <CommentInput placeholder="댓글을 적어주세요." />
            <TouchableOpacity>
              <Text>댓글쓰기</Text>
            </TouchableOpacity>
          </CommentInputWrapper>
        </CommentInputContainer>
      </KeyboardAwareScrollView>
    </>
  );
};

const UserImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  overflow: hidden;
  margin-right: 10px;
`;
// const Youtube = styled.View`
//   width: 90%;
//   height: 190px;
//   border-radius: 10px;
//   background-color: ${LIGHT_GRAY};
//   overflow: hidden;
//   margin: 20px auto;
// `;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Nickname = styled.Text`
  font-size: 18px;
`;
const ContentList = styled.ScrollView`
  flex: 1;
`;
const Content = styled.View`
  margin-left: 15px;
`;
const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
  margin: 20px auto 0 auto;
`;
const EditBtn = styled.Text`
  color: ${LIGHT_BTN};
`;
const ContentText = styled.Text`
  width: 85%;
  margin: auto;
  font-size: 18px;
  line-height: 25px;
  margin-top: 30px;
`;
const CommentText = styled.Text`
  width: 85%;
  margin: auto;
  font-size: 18px;
  line-height: 25px;
  margin-top: 20px;
`;
const DetailContent = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${LIGHT_GRAY};
  padding-bottom: 60px;
`;
const MoreBtn = styled.TouchableOpacity`
  margin-top: 10px;
`;

const CommentInputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  height: 60px;
  background-color: blue;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0px;
`;

const CommentInputWrapper = styled.View`
  width: 85%;
  flex-direction: row;
  height: 50px;
  background-color: ${LIGHT_GRAY};
  justify-content: space-between;
  align-items: center;
  border-radius: 60px;
  padding-right: 25px;
`;
const CommentInput = styled.TextInput`
  width: 75%;
  height: 50px;
  margin: auto;
`;
const CommentUser = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;
export default PostDetail;
