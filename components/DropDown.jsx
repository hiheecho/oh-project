import styled from "@emotion/native";
import { DROPDOWN_FONT_COLOR, DROPDOWN_BACKGROUND_COLOR } from "../color";
import { Entypo } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useState, useCallback } from "react";
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
    <DropDownBtn
      onPress={() => {
        setCheck(!check);
      }}
    >
      <Entypo name="dots-three-horizontal" size={25} color="#AAAAAA" />

      {check === true ? (
        <DropDownView>
          <DropDownbox onPress={goToPostEditing}>
            <DropDownText>수정</DropDownText>
          </DropDownbox>
          <DropDownbox onPress={onDeletePost}>
            <DropDownText>삭제</DropDownText>
          </DropDownbox>
        </DropDownView>
      ) : null}
    </DropDownBtn>
  );
};

const DropDownBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 15px;
  z-index: 300;
`;

const DropDownView = styled.View`
  position: absolute;
  top: 30px;
  right: 0;
  width: 80px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${DROPDOWN_BACKGROUND_COLOR};
`;

const DropDownbox = styled.TouchableOpacity`
  margin: 0 15px;
  padding: 10px 0;
  border-bottom-width: 0.3px;
  border-color: ${(props) => props.theme.btn};
`;

const DropDownText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${DROPDOWN_FONT_COLOR};
`;

export default DropDown;
