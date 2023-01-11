import React, { useState } from "react";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { BRAND_COLOR } from "../color";
import { updatePost } from "../posts.js";
import { useMutation } from "react-query";
// import useKeyboardHeight from "react-native-use-keyboard-height";

const PostEditing = ({
  navigation: { goBack },
  route: {
    params: { item },
  },
}) => {
  const [text, setText] = useState(item.text);
  const { navigate } = useNavigation();

  // 키보드 높이에 따른 TextArea height 변경 작업(미완료)
  // const keyboardHeight = useKeyboardHeight();

  const { isLoading, mutate: edit } = useMutation(
    ["update", item.id],
    (body) => updatePost(body),
    {
      onSuccess: () => {
        console.log("게시글 수정");
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
      await edit({ id: item.id, text });
      navigate("Stacks", {
        screen: "PostDetail",
        params: { item },
      });
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
  padding: 0 10px;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 57px;
  left: 8px;
`;

const PostBtnActive = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 17px;
  position: absolute;
  top: 62px;
  right: 13px;
`;

const PostBtnInactive = styled.Text`
  color: white;
  opacity: 0.6;
  font-weight: bold;
  font-size: 17px;
  position: absolute;
  top: 62px;
  right: 13px;
`;

const TextArea = styled.TextInput`
  height: ${SCREEN_HEIGHT / 2.3 + "px"};
  padding: 20px;
  font-size: 17px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
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
