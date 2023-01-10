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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import styled from "@emotion/native";
import { StyleSheet, useColorScheme } from "react-native";
import {
  LIGHT_GRAY,
  DARK_COLOR,
  LIGHT_COLOR,
  DARK_GRAY,
  BRAND_COLOR,
} from "../color";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT } from "../util";
import { async } from "@firebase/util";
import { dbService, auth } from "../firebase";

/**-------------------------------postsExample---------------------------------- */
/** 참고contents 
    const newPost = {
    text,
    createdAt: Date.now(),
    isEdit: false,
    userName: auth.currentUser.displayName,
    userId: auth.currentUser?.uid,
  }; 
   * post항목에   
   * 
   * const newPost = {
    text,
    createdAt: Date.now(),
    isEdit: false,
    userName: auth.currentUser.displayName,
    userId: auth.currentUser?.uid,
  };
    추가 수정하였습니다.
   */
/**---------------------------------Poster------------------------------------- */
const MyPage = () => {
  const onLogOutClick = () => {
    auth.signOut();
  };
  const isDark = useColorScheme() === "dark";
  const { navigate } = useNavigation();
  const [myComments, setMyComments] = useState([]);

  /**console.log("myContents", myContents);
    에러 문제점 찾기 
  */

  /**작성한 글 불러오기 */
  useEffect(() => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("createdAt", "desc"),
      where("userId", "==", auth.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyComments(newPosts);
    });
    return unsubscribe;
  }, []);

  /**유저 게시물 수정하기 */

  /**유저 게시물 삭제하기 */

  /**---------------------------------Users-------------------------------------- */

  const userText =
    "안녕하세요. 손석구입니다,안녕하세요. 손석구입니다,안녕하세요. 손석구입니다,안녕하세요. ";

  const [profileText, setProfileText] = useState("");
  const [profileUser, setProfileUser] = useState([]);
  const [profileContent, setProfileContent] = useState("");
  console.log("profileUser", profileUser);

  const NewUser = {
    profileText,
    createdAt: Date.now(),
    isEdit: false,
    userName: auth.currentUser.displayName,
    userId: auth.currentUser?.uid,
  };
  console.log("auth.currentUser", auth.currentUser);

  useEffect(() => {
    const q = query(
      collection(dbService, "users"),
      orderBy("createdAt", "desc"),
      where("userId", "==", auth.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfileUser(newUsers);
    });
    return unsubscribe;
  }, []);

  /**-----------------------------------Return--------------------------------------- */
  return (
    <>
      <DimensionView>
        <MyImg
          style={StyleSheet.absoluteFill}
          source={require("../assets/testImg.jpg")}
        />
        <TouchableOpacity>
          <ProfileEdit>
            <FontAwesome5 name="edit" size={20} color="#AAAAAA" />
          </ProfileEdit>
        </TouchableOpacity>

        <>
          <MyInfo>
            <MyInfoName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
              {auth.currentUser.displayName}
            </MyInfoName>
            <MyInfoComment style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
              {/* {user.userText.slice(0, 140)}
                {user.userText.length > 140 && "..."} */}
            </MyInfoComment>
          </MyInfo>
        </>
      </DimensionView>

      <LogOutBt onPress={onLogOutClick}>
        <LogOutText>로그아웃</LogOutText>
      </LogOutBt>
      <FlatList
        data={myComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <MyCommentRow
              style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
            >
              <MyCommentImg
                style={StyleSheet.absoluteFill}
                source={require("../assets/testImg.jpg")}
              />
              <MyCommentName
                style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}
              >
                {item.userName}
              </MyCommentName>
              <MyCommentText
                style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}
              >
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
          </>
        )}
      />
    </>
  );
};
export default MyPage;

/**-----------------------------------Styled--------------------------------------- */

const DimensionView = styled.View`
  height: ${SCREEN_HEIGHT / 4.5 + "px"};
  /* background-color: red; */
`;

const ProfileEdit = styled.Text`
  position: absolute;
  top: 10px;
  left: 340px;
`;

const MyImg = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  margin-top: 37px;
  margin-left: 20px;
`;
const MyInfo = styled.View`
  margin-top: 30px;
`;
const MyInfoName = styled.Text`
  margin-left: 160px;
  margin-top: 13px;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const MyInfoComment = styled.Text`
  width: 190px;
  height: 100px;
  margin-bottom: 5px;
  margin-left: 160px;
`;

const MyCommentRow = styled.View`
  width: 355px;
  height: 120px;
  margin: auto;
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

const LogOutText = styled.Text`
  font-size: 17px;
  color: white;
`;

const LogOutBt = styled.TouchableOpacity`
  background-color: #e43434;
  align-items: center;
  border-radius: 50px;
  margin: auto;
  margin-bottom: 20px;
  width: 40%;
  height: 35px;
  padding: 9px;
`;
