import react from "react";
import styled from "@emotion/native";
import {
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
  DROPDOWN_BACKGROUND_COLOR,
} from "../color";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const DropDown = ({ onDeletePost, goToPostEditing }) => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        setCheck(false);
      };
    }, [])
  );

  const [check, setCheck] = useState(false);

  return (
    <EditDeleteBtn>
      <TouchableOpacity
        onPress={() => {
          setCheck(!check);
        }}
      >
        <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
        {check === true ? (
          <DropDownView>
            <DropDownEdit onPress={goToPostEditing}>
              <DropDownText>글 수정</DropDownText>
            </DropDownEdit>
            <DropDownDelete onPress={onDeletePost}>
              <DropDownText>글 삭제</DropDownText>
            </DropDownDelete>
          </DropDownView>
        ) : null}
      </TouchableOpacity>
    </EditDeleteBtn>
  );
};

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

export default DropDown;
