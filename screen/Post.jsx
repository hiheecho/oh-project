import React, { useState } from "react";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "../firebase";
import { useNavigation } from "@react-navigation/native";
// import useKeyboardHeight from "react-native-use-keyboard-height";

const Post = ({ navigation: { goBack } }) => {
  const [text, setText] = useState();

  const { navigate } = useNavigation();

  // 키보드 높이에 따른 TextArea height 변경 작업(미완료)
  // const keyboardHeight = useKeyboardHeight();

  const newPost = {
    text,
    createdAt: Date.now(),
    isEdit: false,
  };

  // useMutation()으로 Create 구현한 부분
  // 추후에 사용할 수도 있으므로 주석처리
  // const onSuccess = () => {
  //   console.log("작성 완료");
  // };

  // const onError = () => {
  //   console.log("작성 실패");
  // };

  // const { data, isLoading } = useNewPostData(onSuccess, onError);

  // const { mutate } = useAddPostData();

  // const addPostSubmit = () => {
  //   mutate(newPost);
  //   goBack();
  // };

  const addBtn = async () => {
    await addDoc(collection(dbService, "posts"), newPost);
    // goBack();
    navigate("Tabs", { screen: "Main" });
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
          <PostBtnActive onPress={addBtn}>글쓰기</PostBtnActive>
        )}
      </FakeNavi>
      <TextArea
        value={text}
        onChangeText={setText}
        placeholder="추천곡을 입력해주세요."
        placeholderTextColor="#a1a1a1"
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

export default Post;

const Contents = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.gray};
`;

const FakeNavi = styled.View`
  height: ${SCREEN_HEIGHT / 9.3 + "px"};
  background-color: #e43434;
  flex-direction: row;
  padding: 0 10px;
`;

const BackBtn = styled.TouchableOpacity`
  margin-top: ${SCREEN_HEIGHT / 15 + "px"};
`;

const PostBtnActive = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 17px;
  margin-left: auto;
  margin-top: ${SCREEN_HEIGHT / 13.8 + "px"};
`;

const PostBtnInactive = styled.Text`
  color: white;
  opacity: 0.6;
  font-weight: bold;
  font-size: 17px;
  margin-left: auto;
  margin-top: ${SCREEN_HEIGHT / 13.8 + "px"};
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
  color: #e43434;
`;
