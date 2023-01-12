import React from "react";
import { TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import styled from "@emotion/native";
import { LIGHT_GRAY } from "../color";
import Comment from "../components/postdetail/Comment";
import DetailContent from "../components/postdetail/DetailContent";
import { SCREEN_HEIGHT } from "../util";

const PostDetail = ({
  route: {
    params: { item },
  },
}) => {
  return (
    <PostDetailWrapper>
      <DetailContent item={item} />
      {/* <CommentList>
        <Comment />
      </CommentList>
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
      </KeyboardAvoidingView> */}
    </PostDetailWrapper>
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
const PostDetailWrapper = styled.View`
  background-color: ${(props) => props.theme.background};
  flex: 1;
`;
// const CommentList = styled.ScrollView`
//   height: 0;
// `;

// const CommentInputContainer = styled.View`
//   width: 100%;
//   flex-direction: row;
//   height: ${SCREEN_HEIGHT / 15 + "px"};
//   justify-content: space-evenly;
//   align-items: center;
// `;

// const CommentInputWrapper = styled.View`
//   width: 85%;
//   flex-direction: row;
//   height: 85%;
//   background-color: ${LIGHT_GRAY};
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 60px;
//   padding-right: 5%;
// `;
// const CommentInput = styled.TextInput`
//   width: 75%;
//   height: 100%;
//   margin: auto;
// `;
// const CommentUser = styled.Image`
//   width: 40px;
//   height: 40px;
//   border-radius: 40px;
// `;
export default PostDetail;
