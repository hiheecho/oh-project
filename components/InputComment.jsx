import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "@emotion/native";
import { LIGHT_GRAY } from "../color";
const InputComment = () => {
  return (
    <CommentInputContainer>
      <CommentUser source={require("../assets/icon.png")} />
      <CommentInputWrapper>
        <CommentInput placeholder="댓글을 적어주세요." />
        <TouchableOpacity>
          <Text>댓글쓰기</Text>
        </TouchableOpacity>
      </CommentInputWrapper>
    </CommentInputContainer>
  );
};

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
export default InputComment;
