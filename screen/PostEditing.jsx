import React, { useState } from "react";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BRAND_COLOR } from "../color";
import { updatePost } from "../posts.js";
import { QueryClient, useMutation } from "react-query";
// import useKeyboardHeight from "react-native-use-keyboard-height";

const PostEditing = ({
  navigation: { goBack },
  route: {
    params: { item },
  },
}) => {
  const [text, setText] = useState(item.text);
  const [videoLink, setVideoLink] = useState(item.videoLink);
  const { navigate } = useNavigation();

  // 키보드 높이에 따른 TextArea height 변경 작업(미완료)
  // const keyboardHeight = useKeyboardHeight();

  const { isLoading, mutate: edit } = useMutation(
    ["update", item.id],
    (body) => updatePost(body),
    {
      onSuccess: () => {
        console.log("게시글 수정");
        //"contents"라는 쿼리키를 가진 쿼리를 리패치 하라는 명령이 실행되는 부분
        // QueryClient.refetchQueries(["contents", 1], {
        //   active: true,
        // });
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  if (isLoading) {
    return <PostBtnInactive>수정</PostBtnInactive>;
  }

  const onUpdatePost = async () => {
    try {
      await edit({ id: item.id, text, videoLink });
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
          <PostBtnInactive>수정</PostBtnInactive>
        ) : (
          <PostBtnActive
            disabled={!text || text.length > 150}
            onPress={onUpdatePost}
          >
            수정
          </PostBtnActive>
        )}
      </FakeNavi>
      <YoutubeInput
        value={videoLink}
        onChangeText={setVideoLink}
        placeholderTextColor="#a1a1a1"
      />
      <TextArea
        value={text}
        onChangeText={setText}
        multiline={true}
        textAlignVertical="top"
        autoFocus
      />
      {/* 글자수 */}
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

export default PostEditing;

const Contents = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.gray};
`;

const FakeNavi = styled.View`
  height: ${SCREEN_HEIGHT / 9.3 + "px"};
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
