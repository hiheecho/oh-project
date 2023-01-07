import React from "react";
import { TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import styled from "@emotion/native";
import { LIGHT_GRAY } from "../color";
import Comment from "../components/Comment";
import DetailContent from "../components/DetailContent";

const PostDetail = () => {
  return (
    <>
      <DetailContent />
      <CommentList>
        <Comment />
      </CommentList>
      {/* 키보드가 UI 가림 (수정중) */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        keyboardVerticalOffset={92}
      >
        <CommentInputContainer>
          <CommentUser source={require("../assets/icon.png")} />
          <CommentInputWrapper>
            <CommentInput placeholder="댓글을 적어주세요." />
            <TouchableOpacity>
              <Text>댓글쓰기</Text>
            </TouchableOpacity>
          </CommentInputWrapper>
        </CommentInputContainer>
      </KeyboardAvoidingView>
    </>
  );
};

// const Youtube = styled.View`
//   width: 90%;
//   height: 190px;
//   border-radius: 10px;
//   background-color: ${LIGHT_GRAY};
//   overflow: hidden;
//   margin: 20px auto;
// `;

//댓글 리스트
const CommentList = styled.ScrollView`
  height: 0;
`;

const CommentInputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  height: 60px;
  justify-content: space-evenly;
  align-items: center;
`;

const CommentInputWrapper = styled.View`
  width: 85%;
  flex-direction: row;
  height: 85%;
  background-color: ${LIGHT_GRAY};
  justify-content: space-between;
  align-items: center;
  border-radius: 60px;
  padding-right: 5%;
`;
const CommentInput = styled.TextInput`
  width: 75%;
  height: 100%;
  margin: auto;
`;
const CommentUser = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;
export default PostDetail;
