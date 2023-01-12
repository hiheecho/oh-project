import react from "react";
import styled from "@emotion/native";
import {
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
  DROPDOWN_BACKGROUND_COLOR,
} from "../color";
import { Entypo } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../util";

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
      <DropDownBtn
        style={{
          paddingLeft: check ? SCREEN_WIDTH : 50,
          paddingBottom: check ? SCREEN_HEIGHT : 50,
        }}
        onPress={() => {
          setCheck(!check);
        }}
      >
        <DropDownIcon>
          <Entypo name="dots-three-horizontal" size={20} color="#AAAAAA" />
        </DropDownIcon>
        {check === true ? (
          <DropDownView>
            <DropDownEdit onPress={goToPostEditing}>
              <DropDownText>수정</DropDownText>
            </DropDownEdit>
            <DropDownDelete onPress={onDeletePost}>
              <DropDownText>삭제</DropDownText>
            </DropDownDelete>
          </DropDownView>
        ) : null}
      </DropDownBtn>
    </EditDeleteBtn>
  );
};

const DropDownBtn = styled.TouchableOpacity`
  padding-top: 5%;
  padding-right: 5%;
`;
const DropDownIcon = styled.View`
  justify-content: right;
  padding-top: 10px;
`;
const EditDeleteBtn = styled.View`
  position: absolute;
  right: 0;
  top: 0;
`;

const DropDownView = styled.View`
  position: absolute;
  right: 40px;
  top: 20px;
  width: 80px;
  height: 100px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
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
