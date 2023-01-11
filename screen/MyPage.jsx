import React, { useEffect, useRef, useState } from "react";
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
import {
  LIGHT_GRAY,
  DARK_COLOR,
  LIGHT_COLOR,
  DARK_GRAY,
  BRAND_COLOR,
  DROPDOWN_BACKGROUND_COLOR,
  DARK_BTN,
  DROPDOWN_FONT_COLOR,
} from "../color";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import styled from "@emotion/native";
import { StyleSheet, useColorScheme, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT } from "../util";
import { async } from "@firebase/util";
import { dbService, auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useMutation } from "react-query";
import { deletePost } from "../posts";
import DropDown from "../components/DropDown";

/**-------------------------------postsExample---------------------------------- */
/** 참고contents 
    const newPost = {
    text,
    createdAt: Date.now(),
    isEdit: false,
    userName: auth.currentUser.displayName,
    userId: auth.currentUser?.uid,
  }; 
/**---------------------------------Poster------------------------------------- */
const MyPage = () => {
  const onLogOutClick = () => {
    auth.signOut();
  };
  const isDark = useColorScheme() === "dark";
  const { navigate } = useNavigation();
  const [myComments, setMyComments] = useState([]);

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

  /**---------------------------------Users-------------------------------------- */

  const [detailItem, setDetailItem] = useState({});
  const [content, setContent] = useState("");
  // console.log("content", content);

  const newUser = {
    content,
    createdAt: Date.now(),
    isEdit: false,
    userName: auth.currentUser.displayName,
    userId: auth.currentUser?.uid,
  };
  // console.log("newUser", newUser);

  const updateProfile = async () => {
    await updateDoc(doc(dbService, "users"), {
      ...newUser,
    });
    setDetailItem(newUser);
    setContent("");
  };

  const setUser = async () => {
    await setDoc(doc(dbService, "users"), {
      content: content,
      createdAt: Date.now(),
      isEdit: false,
      userName: auth.currentUser.displayName,
      userId: auth.currentUser?.uid,
    });
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "users"),
      orderBy("createdAt", "desc"),
      where("userId", "==", auth.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newUser = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDetailItem(newUser);
    });
    return unsubscribe;
  }, []);

  const setEdit = async (detailItem) => {
    setDetailItem({ ...detailItem, isEdit: !detailItem.isEdit });
    setContent("");
  };

  /**-----------------------------------Return--------------------------------------- */
  return (
    <>
      <DimensionView>
        <MyImg
          style={StyleSheet.absoluteFill}
          source={require("../assets/testImg.jpg")}
        />
        <>
          <MyInfo>
            <MyInfoName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
              {auth.currentUser.displayName}
            </MyInfoName>
            <UserProfile>
              {detailItem.isEdit === true ? (
                <UserInfoInput
                  value={content}
                  onChangeText={setContent}
                  multiline={true}
                  autoFocus
                  placeholder="간단하게 자기소개 해주세요"
                  placeholderTextColor="#aaaaaa"
                />
              ) : (
                <TouchableOpacity onPress={setUser}>
                  <UserInfoText
                    style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}
                  >
                    {detailItem.content}
                  </UserInfoText>
                </TouchableOpacity>
              )}

              {detailItem.isEdit === true ? (
                <UserCompleteBtn onPress={() => updateProfile(detailItem)}>
                  <MaterialCommunityIcons
                    name="account-edit"
                    size={30}
                    color="#aaaaaa"
                  />
                </UserCompleteBtn>
              ) : (
                <UserEditBtn onPress={() => setEdit(detailItem)}>
                  <MaterialCommunityIcons
                    name="account-edit-outline"
                    size={30}
                    color="#aaaaaa"
                  />
                </UserEditBtn>
              )}
            </UserProfile>
          </MyInfo>
        </>
      </DimensionView>

      {/* ------------------------------------------------------------------------- */}
      <LogOutBtn onPress={onLogOutClick}>
        <LogOutText>로그아웃</LogOutText>
      </LogOutBtn>
      {/* ------------------------------------------------------------------------- */}
      <FlatList
        data={myComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentContainer>
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
                numberOfLines={3}
              >
                {item.text.slice(0, 60)}
                {item.text.length > 60 && "..."}
              </MyCommentText>
              <DropDown />
            </MyCommentRow>
          </CommentContainer>
        )}
      />
    </>
  );
};
export default MyPage;

/**-----------------------------------Styled--------------------------------------- */

const DimensionView = styled.View`
  height: ${SCREEN_HEIGHT / 4.5 + "px"};
`;
const CommentContainer = styled.View`
  align-items: center;
  margin: 5px 0;
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

const MyCommentRow = styled.View`
  width: 355px;
  height: 120px;
  margin: auto;
  border-radius: 10px;
  padding-top: 70px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 25px;
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

const LogOutText = styled.Text`
  font-size: 18px;
  color: white;
`;

const LogOutBtn = styled.TouchableOpacity`
  width: 30%;
  align-items: center;
  border-radius: 50px;
  padding: 10px 15px;
  margin: 10px;
  background-color: ${(props) => props.theme.brandColor};
`;
const UserProfile = styled.View`
  position: absolute;
  width: 185px;
  left: 150px;
  top: 45px;
  height: 75px;
`;
const UserInfoInput = styled.TextInput`
  position: absolute;
  width: 185px;
  height: 75px;
  left: 10px;
`;
const UserInfoText = styled.Text`
  position: absolute;
  width: 185px;
  height: 75px;
  left: 13px;
`;
const UserEditBtn = styled.TouchableOpacity`
  left: 182px;
  bottom: 60px;
`;
const UserCompleteBtn = styled.TouchableOpacity`
  left: 180px;
  bottom: 60px;
`;
