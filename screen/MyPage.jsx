import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
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
import { DARK_BTN } from "../color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { dbService, auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { launchImageLibraryAsync } from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MainList from "../components/main/MainList";

const MyPage = () => {
  const [userName, setUserName] = useState(auth.currentUser.displayName);
  const [disPlayName, setDisPlayName] = useState("");

  const [detailItem, setDetailItem] = useState({});
  const [detailItemContent, setDetailItemContent] = useState("");

  const [image, setImage] = useState();

  const [myComments, setMyComments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [uploading, setUploading] = useState();

  const onLogOutClick = () => {
    auth.signOut();
  };

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
      setImage(auth.currentUser.photoURL);
    };

    getData();
    getUserData();

    return unsubscribe;
  }, []);

  const updateDocProfile = async () => {
    const newDetailItem = {
      ...detailItem,
      content: detailItemContent,
    };

    await updateProfile(auth.currentUser, {
      displayName: disPlayName,
    }).catch((error) => alert(error.message));
    setUserName(disPlayName);

    await setDoc(doc(dbService, "users", auth.currentUser.uid), newDetailItem);

    setDetailItem(newDetailItem);
    setEdit(newDetailItem);
    setIsEdit(false);
  };

  const setEdit = async (detailItem) => {
    setDetailItem({ ...detailItem });
    setIsEdit(true);
  };

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <ActivityIndicatorBox>
          <ActivityIndicator color="#fff" animating size="large" />
        </ActivityIndicatorBox>
      );
    }
  };

  const _maybeRenderImage = () => {
    if (!auth.currentUser.photoURL) {
      return <MyImg source={require("../assets/icon.png")} />;
    }

    return <MyImg source={{ uri: image }} />;
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

        updateProfile(auth.currentUser, {
          displayName: auth.currentUser.displayName,
          photoURL: uploadUrl,
        });

        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("이런! 사진을 선택하는 중에 문제가 발생했네요!");
    } finally {
      setUploading(false);
    }
  };

  const uploadImageAsync = async (uri) => {
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

    blob.close();

    return await getDownloadURL(fileRef);
  };

  return (
    <>
      <DimensionView>
        <TouchableOpacity
          onPress={() => {
            _pickImage();
          }}
        >
          {_maybeRenderImage()}
          {_maybeRenderUploadingOverlay()}
        </TouchableOpacity>

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
        renderItem={({ item }) => <MainList item={item} />}
      />
    </>
  );
};
const DimensionView = styled.View`
  height: ${SCREEN_HEIGHT / 4.5 + "px"};
  flex-direction: row;
`;

const MyImg = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  margin: 20px;
`;

const ActivityIndicatorBox = styled.View`
  top: 20px;
  left: 20px;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
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
const LogOutText = styled.Text`
  font-size: 16px;
  font-weight: bold;
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

export default MyPage;
