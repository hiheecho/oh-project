import react from "react";
import styled from "@emotion/native";
import {
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
  DROPDOWN_BACKGROUND_COLOR,
} from "../color";
import { Entypo } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../util";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deletePost } from "../posts";
import { useMutation } from "react-query";

const DropDown = ({ item }) => {
  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCheck(false);
      };
    }, [])
  );

  // 삭제
  const { mutate: del } = useMutation(
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

            navigate("Tabs", {
              screen: "Main",
            });
          } catch (error) {
            console.log("error", error);
          }
        },
      },
    ]);
  };

  const goToPostEditing = () => {
    navigate("Stacks", {
      screen: "PostEditing",
      params: { item },
    });
  };
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
              <DropDownText>글 수정</DropDownText>
            </DropDownEdit>
            <DropDownDelete onPress={onDeletePost}>
              <DropDownText>글 삭제</DropDownText>
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
