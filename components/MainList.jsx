import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import styled from "@emotion/native";
import {
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
  DROPDOWN_BACKGROUND_COLOR,
} from "../color";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { deletePost } from "../posts";
import { useMutation } from "react-query";
import { Alert } from "react-native";
import DropDown from "./DropDown";

const MainList = ({ item }) => {
  const { navigate } = useNavigation();

  const goToDetail = () => {
    setCheck(false);
    navigate("Stacks", {
      screen: "PostDetail",
      params: { item },
    });
  };

  const goToPostEditing = () => {
    navigate("Stacks", {
      screen: "PostEditing",
      params: { item },
    });
  };

  //DropDown
  const [check, setCheck] = useState(false);
  const click = () => setCheck(!check);

  // 삭제
  const { isLoading: isLoadingDeleting, mutate: del } = useMutation(
    ["deletePost", item.id],
    (body) => deletePost(body),
    {
      onSuccess: () => {
        console.log("삭제 완료");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const onDeletePost = async () => {
    Alert.alert("포스트 삭제", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "destructive" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            await del(item.id);
          } catch (error) {
            console.log("error", error);
          }
        },
      },
    ]);
  };

  if (isLoadingDeleting) {
    return <DropDownText>삭제</DropDownText>;
  }

  return (
    <TouchableOpacity onPress={goToDetail}>
      <CommentRow>
        <UserImg
          style={StyleSheet.absoluteFill}
          source={require("../assets/icon.png")}
        />
        <CommentName>{item.userName}</CommentName>
        <CommentText>{item.text}</CommentText>
        {item.userId === auth.currentUser.uid ? (
          <DropDown
            onDeletePost={onDeletePost}
            item={item}
            goToPostEditing={goToPostEditing}
          />
        ) : null}
      </CommentRow>
    </TouchableOpacity>
  );
};

const CommentRow = styled.View`
  width: 93%;
  margin-top: 3%;
  margin-left: 3.5%;
  margin-bottom: 3%;
  border-radius: 10px;
  padding-top: 20%;
  padding-left: 2%;
  padding-right: 2%;
  background-color: ${(props) => props.theme.gray};
`;
const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 13px;
  border-radius: 50px;
`;
const CommentText = styled.Text`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 15px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.color};
`;
const CommentName = styled.Text`
  position: absolute;
  margin-left: 80px;
  margin-top: 24px;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;

// 수정 & 삭제 드롭다운
const EditDeleteBtn = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const DropDownView = styled.View`
  position: absolute;
  margin-top: 20px;
  right: 5px;
  width: 100px;
  height: 110px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${DROPDOWN_BACKGROUND_COLOR};
`;

const DropDownEdit = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 8px;
  padding-bottom: 10px;
  border-bottom-width: 0.3px;
  border-color: ${DARK_BTN};
`;
const DropDownDelete = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-width: 0.3px;
  border-color: ${DARK_BTN};
`;

const DropDownText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${DROPDOWN_FONT_COLOR};
`;

export default MainList;
