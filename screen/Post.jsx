import React, { useState } from "react";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { BRAND_COLOR } from "../color";
import { addPost } from "../posts.js";
import { useMutation } from "react-query";

const Post = ({ navigation: { goBack, navigate } }) => {
  const [text, setText] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const newPost = {
    text,
    createdAt: Date.now(),
    userName: auth.currentUser.displayName,
    userId: auth.currentUser?.uid,
    userImage: auth.currentUser.photoURL,
    userLikes: [],
    videoLink,
  };

  const { isLoading, mutate: add } = useMutation(
    ["addPost", newPost],
    (body) => addPost(body),
    {
      onSuccess: () => {},
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  if (isLoading) {
    return <PostBtnInactive>글쓰기</PostBtnInactive>;
  }

  const onAddPost = () => {
    try {
      add(newPost);
      navigate("Tabs", { screen: "Main" });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Contents>
      <FakeNavi>
        <BackBtn onPress={() => goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </BackBtn>
        {(text && text.length > 150) || !text ? (
          <PostBtnInactive>글쓰기</PostBtnInactive>
        ) : (
          <PostBtnActive
            disabled={!text || text.length > 150}
            onPress={onAddPost}
          >
            글쓰기
          </PostBtnActive>
        )}
      </FakeNavi>
      <YoutubeInput
        value={videoLink}
        onChangeText={setVideoLink}
        placeholder="추천곡 유튜브 링크를 입력해주세요."
        placeholderTextColor="#a1a1a1"
      />
      <TextArea
        value={text}
        onChangeText={setText}
        placeholder="추천곡을 소개해주세요."
        placeholderTextColor="#a1a1a1"
        multiline={true}
        textAlignVertical="top"
        autoFocus
      />

      <LettersCount>
        {text && text.length <= 150 ? (
          <Count enabled>{150 - text.length}</Count>
        ) : (
          <Over enabled>
            {text ? 150 - text.length : <Count enabled>0</Count>}
          </Over>
        )}
      </LettersCount>
    </Contents>
  );
};

export default Post;

const Contents = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.gray};
`;

const FakeNavi = styled.View`
  height: ${SCREEN_HEIGHT / 9.6 + "px"};
  background-color: ${BRAND_COLOR};
  flex-direction: row;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 15%;
  left: 4%;
`;

const PostBtnActive = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 17px;
  position: absolute;
  bottom: 20%;
  right: 4%;
`;

const PostBtnInactive = styled.Text`
  color: white;
  opacity: 0.6;
  font-weight: bold;
  font-size: 17px;
  position: absolute;
  bottom: 20%;
  right: 4%;
`;

const TextArea = styled.TextInput`
  height: ${SCREEN_HEIGHT / 2.5 + "px"};
  padding: 25px 20px;
  font-size: 17px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
`;
const YoutubeInput = styled.TextInput`
  height: ${SCREEN_HEIGHT / 13 + "px"};
  padding: 0px 20px;
  font-size: 17px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
  margin-bottom: 2px;
`;

const LettersCount = styled.View`
  padding: 15px;
  font-size: 18px;
  margin-left: auto;
`;

const Count = styled.Text`
  color: ${(props) => props.theme.color};
`;

const Over = styled.Text`
  color: ${BRAND_COLOR};
`;
