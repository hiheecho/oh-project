import React, { useState, useCallback, useRef } from "react";
import { View, ActivityIndicator, Button, Alert } from "react-native";
import styled from "@emotion/native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../util";
import { deletePost, getDetail } from "../posts";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "react-query";
import DropDown from "./DropDown";
import { auth } from "../firebase";
import YoutubePlayer from "react-native-youtube-iframe";

const DetailContent = ({ item }) => {
  // youtube
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  // const youtubeLink = "https://www.youtube.com/watch?v=c9zX5VYSNSc";
  // let result = youtubeLink.slice(-11);
  // console.log(result);

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
  const goToPostEditing = () => {
    navigate("Stacks", {
      screen: "PostEditing",
      params: { item },
    });
  };
  const postId = item.id;

  const { isLoading, data } = useQuery(["contents", postId], getDetail, {
    onSuccess: () => {
      console.log("로딩되었습니다!");
    },
    onError: (error) => {
      console.log("error : ", error);
    },
  });

  if (isLoading || isLoadingDeleting) {
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

  return (
    <View>
      <ContentHeader>
        <UserInfo>
          <UserImage
            source={require("../assets/icon.png")}
            style={{ width: 70, height: 70 }}
          />
          <Nickname>{data?.data().userName}</Nickname>
        </UserInfo>
      </ContentHeader>
      {item.userId === auth.currentUser.uid ? (
        <DropDown
          onDeletePost={onDeletePost}
          item={item}
          goToPostEditing={goToPostEditing}
        />
      ) : null}
      <YoutubeWrapper>
        <YoutubePlayer
          height={230}
          play={playing}
          videoId={data?.data().videoLink?.slice(-11)}
          onChangeState={onStateChange}
        />
      </YoutubeWrapper>
      <ContentText>{data?.data().text}</ContentText>
    </View>
  );
};
// const DetailContentWrapper = styled.View`
//   /* border-bottom-width: 2px;
//   border-bottom-color: ${(props) => props.theme.gray}; */
//   padding-bottom: 15%;
// `;
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

//콘텐츠 내용
const ContentText = styled.Text`
  width: 85%;
  margin: auto;
  font-size: 18px;
  line-height: ${SCREEN_HEIGHT / 50 + "px"};

  color: ${(props) => props.theme.color};
`;
const YoutubeWrapper = styled.View`
  width: 98%;
  margin: 40px auto 40px auto;
`;
export default DetailContent;
