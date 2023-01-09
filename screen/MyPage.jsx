import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { LIGHT_GRAY, DARK_COLOR, LIGHT_COLOR, DARK_GRAY } from "../color";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { SCREEN_HEIGHT } from "../util";
import UserInfo from "../components/UserInfo";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "../firebase";
import { async } from "@firebase/util";

/** 참고contents 
    const newPost = {
    text,
    createdAt: Date.now(),
    isEdit: false,
    username,
    userID,
  }; */

const MyPage = () => {
  // const username = "영화배우 손석구";
  // const myInfoComment =
  //   "저는 이번에 react를 배우게 된 손석구입니다. 만나서 반갑습니다. 이번 경험을 여러분과 함께해서 기쁩니다. 앞으로도 잘 부탁드립니다.";
  // const MyComment =
  //   "이 노래 진짜 좋아요. 저도 영화 촬영 할 때 마다 듣고 하는데 진짜 너무 좋아요! 저는 적극 추천합니다.";

  /**code시작 */
  const isDark = useColorScheme() === "dark";
  const { navigate } = useNavigation();
  const [myContents, setMyContents] = useState([]);
  console.log("myContents", myContents);
  /**console.log("myContents", myContents);
    에러 문제점 찾기 
  */

  /**작성한 글 불러오기 */
  useEffect(() => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newContents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyContents(newContents);
    });
    return unsubscribe;
  }, []);

  /**유저 정보 수정하기 */

  /**유저 이미지 수정하기 */

  /**유저 이미지 없으면 기본 이미지로 하기 */

  /**유저 게시물 수정하기 */

  /**유저 게시물 삭제하기 */

  return (
    <FlatList
      data={myContents}
      renderItem={(item) => item.id}
      keyExtractor={({ item }) => {
        <>
          <UserInfo posts={item} />

          <MyCommentRow
            style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
          >
            <MyCommentImg
              style={StyleSheet.absoluteFill}
              source={require("../assets/testImg.jpg")}
            />
            <MyCommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
              {item.createdAt}
            </MyCommentName>
            <MyCommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
              {item.text.slice(0, 60)}
              {item.text.length > 60 && "..."}
            </MyCommentText>
            <EditDeleteBtn>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-horizontal"
                  size={17}
                  color="#AAAAAA"
                />
              </TouchableOpacity>
            </EditDeleteBtn>
          </MyCommentRow>
        </>;
      }}
    />
  );
};
export default MyPage;

const MyCommentRow = styled.View`
  width: 345px;
  height: 120px;
  margin-left: 16px;
  border-radius: 10px;
  padding-top: 70px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 12px;
`;
const MyCommentImg = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 13px;
  border-radius: 50px;
`;
const MyCommentText = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
`;
const MyCommentName = styled.Text`
  position: absolute;
  margin-left: 80px;
  margin-top: 24px;
  font-size: 17px;
  font-weight: 600;
`;

const EditDeleteBtn = styled.View`
  position: absolute;
  margin-left: 305px;
  margin-top: 15px;
`;
