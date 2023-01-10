import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { LIGHT_GRAY, LIGHT_BTN } from "../color";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../util";

const DetailContent = ({ item }) => {
  return (
    <DetailContentWrapper>
      <ContentHeader>
        <UserInfo>
          <UserImage
            source={require("../assets/icon.png")}
            style={{ width: 70, height: 70 }}
          />
          <Nickname>{item.userName}</Nickname>
        </UserInfo>
        <TouchableOpacity>
          <EditBtn>글 수정</EditBtn>
        </TouchableOpacity>
      </ContentHeader>
      {/* <Youtube /> */}
      <ContentText>{item.text}</ContentText>
    </DetailContentWrapper>
  );
};
const DetailContentWrapper = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.gray};
  padding-bottom: 15%;
`;
//콘텐츠,코멘트 헤더 (프로필 + 버튼)
const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${SCREEN_WIDTH / 1.15 + "px"};
  margin: 10% auto 0 auto;
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
  margin-right: 10%;
`;
const Nickname = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;
const EditBtn = styled.Text`
  color: ${(props) => props.theme.btn};
`;

//콘텐츠 내용
const ContentText = styled.Text`
  width: 85%;
  margin: auto;
  font-size: 18px;
  line-height: ${SCREEN_HEIGHT / 30 + "px"};
  margin-top: 5%;
  color: ${(props) => props.theme.color};
`;
export default DetailContent;
