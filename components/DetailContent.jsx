import React, { useState } from "react";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import styled from "@emotion/native";
import {
  DROPDOWN_BACKGROUND_COLOR,
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
} from "../color";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../util";
import { Entypo } from "@expo/vector-icons";
import { Alert } from "react-native";
import { deletePost, getDetail } from "../posts";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "react-query";

const DetailContent = ({ item }) => {
  //dropdown
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

  const { navigate } = useNavigation();
  const postId = item.id;

  const { isLoading, data } = useQuery(["contents", postId], getDetail, {
    onSuccess: () => {
      console.log("성공!");
    },
    onError: (error) => {
      console.log("error : ", error);
    },
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const onDeletePost = async () => {
    Alert.alert("포스트 삭제", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "destructive" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            await del(item.id);
            navigate("Tabs", { screen: "Main" });
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
    <DetailContentWrapper>
      <ContentHeader>
        <UserInfo>
          <UserImage
            source={require("../assets/icon.png")}
            style={{ width: 70, height: 70 }}
          />
          <Nickname>{data?.data().userName}</Nickname>
        </UserInfo>
        <EditDeleteBtn onPress={click}>
          <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
          <DropDownView
            style={{
              display: check ? "flex" : "none",
            }}
          >
            <DropDownEdit>
              <DropDownText>수정</DropDownText>
            </DropDownEdit>
            <DropDownDelete onPress={onDeletePost}>
              <DropDownText>삭제</DropDownText>
            </DropDownDelete>
          </DropDownView>
        </EditDeleteBtn>
      </ContentHeader>
      {/* <Youtube /> */}
      <ContentText>{data?.data().text}</ContentText>
    </DetailContentWrapper>
  );
};
const DetailContentWrapper = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.gray};
  padding-bottom: 15%;
`;
//콘텐츠,코멘트 헤더 (프로필 + 버튼)
const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${SCREEN_WIDTH / 1.15 + "px"};
  margin: 10% auto 0 auto;
`;
const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  overflow: hidden;
  margin-right: 10%;
`;
const Nickname = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;
const EditBtn = styled.Text`
  color: ${(props) => props.theme.btn};
`;

//콘텐츠 내용
const ContentText = styled.Text`
  width: 85%;
  margin: auto;
  font-size: 18px;
  line-height: ${SCREEN_HEIGHT / 30 + "px"};
  margin-top: 5%;
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

export default DetailContent;
