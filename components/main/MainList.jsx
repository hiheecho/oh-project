import React from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import Likes from "./Likes";
import DropDown from "../DropDown";

const MainList = ({ item }) => {
  const { navigate } = useNavigation();

  const goToDetail = () => {
    navigate("Stacks", {
      screen: "PostDetail",
      params: { item },
    });
  };

  const _maybeRenderImage = (item) => {
    if (!item.userImage) {
      return <UserImg source={require("../../assets/icon.png")} />;
    }

    return <UserImg source={{ uri: item.userImage }} />;
  };

  return (
    <MainListContainer onPress={goToDetail}>
      <CommentRow>
        <CommentHeader>
          {_maybeRenderImage(item)}
          <CommentName>{item.userName}</CommentName>
        </CommentHeader>
        {item.userId === auth.currentUser.uid ? <DropDown item={item} /> : null}

        <CommentText numberOfLines={3}>{item.text}</CommentText>
        <LikeBox>
          <Likes item={item} />
        </LikeBox>
      </CommentRow>
    </MainListContainer>
  );
};

const MainListContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

const CommentRow = styled.View`
  width: 95%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.gray};
`;

const CommentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
const CommentName = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;
const CommentText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.color};
  width: 100%;
`;

const LikeBox = styled.View`
  margin: 10px 0 0 10px;
`;

export default MainList;
