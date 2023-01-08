import React from "react";
import styled from "@emotion/native";
import { Feather } from "@expo/vector-icons";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../util";

const Comment = () => {
  return (
    <CommentWrapper>
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
        부드라미 BGM 너무 좋아요. {"\n"}바들바들 동물콘 브금 다들 들어보세요.
        {"\n"}감사합니다.
      </CommentText>
    </CommentWrapper>
  );
};
const CommentWrapper = styled.View`
  margin-left: 15px;
`;
const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${SCREEN_WIDTH / 1.2 + "px"};
  margin: 20px auto 0 auto;
`;
const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  overflow: hidden;
  margin-right: 10px;
`;
const Nickname = styled.Text`
  font-size: 18px;
`;
const CommentText = styled.Text`
  width: ${SCREEN_WIDTH / 1.2 + "px"};
  margin: auto;
  font-size: 18px;
  line-height: ${SCREEN_HEIGHT / 30 + "px"};
  margin-top: 20px;
`;
const MoreBtn = styled.TouchableOpacity`
  margin-top: 10px;
`;

export default Comment;
