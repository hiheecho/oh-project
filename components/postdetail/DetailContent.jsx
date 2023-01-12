import React, { useState, useCallback } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import styled from "@emotion/native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../util";
import { getDetail } from "../../posts";
import { useQuery } from "react-query";
import DropDown from "../DropDown";
import { auth } from "../../firebase";
import YoutubePlayer from "react-native-youtube-iframe";

const DetailContent = ({ item }) => {
  // youtube 업로드
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const postId = item.id;

  const { isLoading, data } = useQuery(["contents", postId], getDetail, {
    onSuccess: () => {
      console.log("로딩되었습니다!");
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

      <ContentText>{data?.data().text}</ContentText>
    </DetailContainer>
  );
};

//콘텐츠,코멘트 헤더 (프로필 + 버튼)

const DetailContainer = styled.View`
  padding: 10px;
`;
const ContentHeader = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  width: ${SCREEN_WIDTH / 1.15 + "px"};
`;
const Line = styled.View`
  width: 98%;
  height: 0.5px;
  margin: 30px auto;
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

//콘텐츠 내용
const ContentText = styled.Text`
  width: 100%;
  font-size: 18px;
  line-height: 27px;
  color: ${(props) => props.theme.color};
  margin: 10px;
`;

// 콘텐츠 내용 ( 유튜브영상 )
const YoutubeWrapper = styled.View`
  width: 100%;
  height: ${SCREEN_HEIGHT / 3 + "px"};
  margin: auto;
`;
export default DetailContent;
