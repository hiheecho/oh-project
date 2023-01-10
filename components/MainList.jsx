import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import styled from "@emotion/native";
import {
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
  DROPDOWN_BACKGROUND_COLOR,
} from "../color";

import { useColorScheme } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

const MainList = ({ item }) => {
  const { navigate } = useNavigation();
  const goToDetail = () => {
    navigate("Stacks", {
      screen: "PostDetail",
      params: { item },
    });
  };
  const isDark = useColorScheme() === "dark";

  //DropDown
  const [check, setState] = useState(false);
  const click = () => setState(!check);

  return (
    <TouchableOpacity onPress={goToDetail}>
      <CommentRow>
        <UserImg
          style={StyleSheet.absoluteFill}
          source={require("../assets/icon.png")}
        />
        <CommentName>{item.userName}</CommentName>
        <CommentText>
          {item.text.slice(0, 60)}
          {item.text.length > 60 && "..."}
        </CommentText>
        {item.userId === auth.currentUser.uid ? (
          <EditDeleteBtn>
            <TouchableOpacity onPress={click}>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
              <DropDownView
                style={{
                  display: check ? "flex" : "none",
                }}
              >
                <DropDownEdit>
                  <DropDownText>글 수정</DropDownText>
                </DropDownEdit>
                <DropDownDelete>
                  <DropDownText>글 삭제</DropDownText>
                </DropDownDelete>
              </DropDownView>
            </TouchableOpacity>
          </EditDeleteBtn>
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

const EditDeleteBtn = styled.View`
  position: absolute;
  right: 15px;
  top: 10px;
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
