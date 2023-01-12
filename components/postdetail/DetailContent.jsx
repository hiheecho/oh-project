import React, { useState, useCallback } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../../util";
import { getDetail } from "../../posts";
import { useQuery } from "react-query";
import DropDown from "../DropDown";
import { auth } from "../../firebase";
import YoutubePlayer from "react-native-youtube-iframe";
import Likes from "../main/Likes";

const DetailContent = ({ item }) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const postId = item.id;

  const { isLoading, data } = useQuery(["contents", postId], getDetail, {
    onSuccess: () => {},
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

  const _maybeRenderImage = (item) => {
    if (!auth.currentUser.photoURL) {
      return <UserImage source={require("../../assets/icon.png")} />;
    }
    return <UserImage source={{ uri: item.userImage }} />;
  };

  return (
    <DetailContainer>
      <ContentHeader>
        <UserInfo>
          {_maybeRenderImage(item)}
          <Nickname>{data?.data().userName}</Nickname>
        </UserInfo>
      </ContentHeader>
      <Line />

      {item.userId === auth.currentUser.uid ? <DropDown item={item} /> : null}

      {item.videoLink ? (
        <YoutubeWrapper>
          <YoutubePlayer
            height={"100%"}
            play={playing}
            videoId={data?.data().videoLink?.slice(-11)}
            onChangeState={onStateChange}
          />
        </YoutubeWrapper>
      ) : null}
      <LikesBox>
        <Likes item={item} />
      </LikesBox>
      <Line />

      <ContentText>{data?.data().text}</ContentText>
    </DetailContainer>
  );
};

const DetailContainer = styled.View`
  padding: 10px;
`;
const ContentHeader = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  width: ${SCREEN_WIDTH / 1.15 + "px"};
`;

const LikesBox = styled.View`
  margin: 0 10px 0 auto;
`;
const Line = styled.View`
  width: 98%;
  height: 0.5px;
  margin: 20px auto;
  background-color: ${(props) => props.theme.color};
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 70px;
  overflow: hidden;
`;
const Nickname = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

const ContentText = styled.Text`
  width: 95%;
  font-size: 18px;
  line-height: 27px;
  color: ${(props) => props.theme.color};
  margin: 10px;
`;

const YoutubeWrapper = styled.View`
  width: 100%;
  height: ${SCREEN_WIDTH / 1.8 + "px"};
  margin-bottom: 10px;
`;
export default DetailContent;
