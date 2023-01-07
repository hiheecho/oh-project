import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { LIGHT_GRAY, LIGHT_BTN } from "../color";

const DetailContent = () => {
  return (
    <DetailContentWrapper>
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
    </DetailContentWrapper>
  );
};
const DetailContentWrapper = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${LIGHT_GRAY};
  padding-bottom: 15%;
`;
//콘텐츠,코멘트 헤더 (프로필 + 버튼)
const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
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
`;
const EditBtn = styled.Text`
  color: ${LIGHT_BTN};
`;

//콘텐츠 내용
const ContentText = styled.Text`
  width: 85%;
  margin: auto;
  font-size: 18px;
  line-height: 25px;
  margin-top: 5%;
`;
export default DetailContent;
