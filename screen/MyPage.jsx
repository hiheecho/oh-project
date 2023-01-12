import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  LIGHT_GRAY,
  DARK_COLOR,
  LIGHT_COLOR,
  DARK_GRAY,
  DARK_BTN,
} from "../color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "@emotion/native";
import { StyleSheet, useColorScheme, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT } from "../util";
import { dbService, auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import DropDown from "../components/DropDown";
import { launchImageLibraryAsync } from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Likes from "../components/main/Likes";
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
  const [isEdit, setIsEdit] = useState(false);

  // const test = auth.currentUser.uid;

  /**작성한 글 불러오기 */
  useEffect(() => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("createdAt", "desc"),
      where("userId", "==", auth.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyComments(newUsers);
    });
    return unsubscribe;
  }, []);
  /**---------------------------------Users-------------------------------------- */
  /** 닉네임 */
  const [userName, setUserName] = useState(auth.currentUser.displayName);
  const [disPlayName, setDisPlayName] = useState("");

  /** 자기소개 */
  const [detailItem, setDetailItem] = useState({});
  const [detailItemContent, setDetailItemContent] = useState("");

  const updateDocProfile = async () => {
    const newDetailItem = {
      ...detailItem,
      content: detailItemContent,
    };

    await updateProfile(auth.currentUser, {
      displayName: disPlayName,
    }).catch((error) => alert(error.message));
    setUserName(disPlayName);

    // await updateDoc(doc(dbService, "users", test.toString()), newDetailItem);
    await setDoc(doc(dbService, "users", auth.currentUser.uid), newDetailItem);

    setDetailItem(newDetailItem);
    setEdit(newDetailItem);
    setIsEdit(false);
  };

  /**데이터 불러오기 */
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(dbService, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.data() === undefined) {
        return;
      }
      setDetailItemContent(docSnap.data().content);

      setDetailItem({
        id: docSnap.id,
        ...docSnap.data(),
      });
    };

    const getUserData = () => {
      setDisPlayName(auth.currentUser.displayName);
    };

    getData();
    getUserData();
  }, []);

  const setEdit = async (detailItem) => {
    setDetailItem({ ...detailItem });
    setIsEdit(true);
  };

  /**-----------------------------------IMAGE PICK--------------------------------------- */
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState();

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const _maybeRenderImage = () => {
    if (!auth.currentUser.photoURL) {
      return <MyImg source={require("../assets/icon.png")} />;
    }

    return <MyImg source={{ uri: auth.currentUser.photoURL }} />;
  };

  const _pickImage = async () => {
    let pickerResult = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    console.log("_pickImage 동작 확인");
    _handleImagePicked(pickerResult);
  };

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
        updateProfile(auth.currentUser, {
          displayName: auth.currentUser.displayName,
          photoURL: uploadUrl,
        });
      }
    } catch (e) {
      console.log(e);
      alert("이런! 사진을 선택하는 중에 문제가 발생했네요!");
    } finally {
      setUploading(false);
    }
  };

  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), auth.currentUser.uid);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  };

  /**-----------------------------------Return--------------------------------------- */
  return (
    <>
      <DimensionView>
        <ImgBox
          onPress={() => {
            _pickImage();
          }}
        >
          {_maybeRenderImage()}
          {_maybeRenderUploadingOverlay()}
        </ImgBox>

        {isEdit ? (
          <ProfileEdit
            onPress={() => {
              updateDocProfile();
            }}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={30}
              color="#AAAAAA"
            />
          </ProfileEdit>
        ) : (
          <ProfileEdit onPress={() => setEdit(detailItem)}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={30}
              color="#AAAAAA"
            />
          </ProfileEdit>
        )}
        <MyInfo>
          {isEdit ? (
            <>
              <NickNameInput
                placeholder="닉네임을 변경하세요"
                placeholderTextColor="#AAA"
                value={disPlayName}
                onChangeText={(text) => setDisPlayName(text)}
                onSubmitEditing={() => {
                  updateDocProfile();
                }}
              />
              <UserInfoInput
                value={detailItemContent}
                onChangeText={setDetailItemContent}
                onSubmitEditing={() => {
                  updateDocProfile();
                }}
                multiline={true}
                autoFocus
                placeholder="간단하게 자기소개 해주세요"
                placeholderTextColor="#AAA"
              />
            </>
          ) : (
            <>
              <MyInfoName>{userName}</MyInfoName>
              <MyInfoText>{detailItemContent}</MyInfoText>
            </>
          )}
        </MyInfo>
      </DimensionView>

      <LogOutBtn onPress={onLogOutClick}>
        <LogOutText>로그아웃</LogOutText>
      </LogOutBtn>

      <FlatList
        data={myComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentContainer>
            <MyCommentRow>
              <MyCommentHeader>
                <MyCommentImg source={{ uri: item.userImage }} />
                <MyCommentName>{item.userName}</MyCommentName>
              </MyCommentHeader>
              <MyCommentText numberOfLines={3}>{item.text}</MyCommentText>
              <DropDown item={item} />
              <LikesBox>
                <Likes item={item} />
              </LikesBox>
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
  flex-direction: row;
`;
const CommentContainer = styled.View`
  align-items: center;
  margin: 5px 0;
`;

const ImgBox = styled.TouchableOpacity``;
const MyImg = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  margin: 20px;
`;

const ProfileEdit = styled.TouchableOpacity`
  position: absolute;

  top: 30px;
  right: 20px;
  z-index: 100;
`;

const MyInfo = styled.View`
  width: 70%;
  margin: 20px 0;
`;
const MyInfoName = styled.Text`
  margin: 10px 0;
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.theme.color};
`;
const MyCommentRow = styled.View`
  background-color: ${(props) => props.theme.gray};
  margin: auto;
  width: 95%;
  border-radius: 10px;
  margin: 5px 0;
  padding: 10px 15px 40px 15px;
`;
const MyCommentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const MyCommentImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
const MyCommentName = styled.Text`
  margin-left: 10px;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;
const MyCommentText = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 15px;
  margin-bottom: 5px;
`;
const LogOutText = styled.Text`
  font-size: 12px;
  color: white;
`;
const LogOutBtn = styled.TouchableOpacity`
  width: 95%;
  align-items: center;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 10px auto;
  background-color: ${(props) => props.theme.brandColor};
`;
const UserInfoInput = styled.TextInput`
  width: 185px;
  height: 75px;
  color: ${DARK_BTN};
`;
const NickNameInput = styled.TextInput`
  width: 185px;
  height: 30px;
  color: ${DARK_BTN};
`;
const MyInfoText = styled.Text`
  width: 80%;
  color: ${(props) => props.theme.color};
`;

const LikesBox = styled.View`
  position: absolute;
  bottom: 10px;
  left: 15px;
`;
