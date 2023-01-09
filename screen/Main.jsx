import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, StyleSheet, View } from "react-native";
import styled from "@emotion/native";
import { DARK_COLOR, LIGHT_COLOR, BRAND_COLOR } from "../color";
import { DARK_GRAY, LIGHT_GRAY } from "../color";
import { useColorScheme } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { query, onSnapshot, orderBy } from "@firebase/firestore";
import { dbService, auth } from "../firebase";
import { collection } from "@firebase/firestore";
import { async } from "@firebase/util";

const Main = () => {
  const { navigate } = useNavigation();
  const [contentList, setContentList] = useState([]);

  //불러오기
  useEffect(() => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newContent = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContentList(newContent);
    });
    return unsubscribe;
  }, []);

  const isDark = useColorScheme() === "dark";

  return (
    <>
      <FlatList
        itemSeparatorComponent={<View style={{ height: 10 }} />}
        data={contentList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentRow
            style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
          >
            <UserImg
              style={StyleSheet.absoluteFill}
              source={require("../assets/icon.png")}
            />
            <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
              {item.userName}
            </CommentName>
            <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
              {item.text.slice(0, 60)}
              {item.text.length > 60 && "..."}
            </CommentText>
            <EditDeleteBtn>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-horizontal"
                  size={17}
                  color="#AAAAAA"
                />
              </TouchableOpacity>
            </EditDeleteBtn>
          </CommentRow>
        )}
      />
      <PlusBtn>
        <TouchableOpacity
          onPress={() => navigate("Stacks", { screen: "Post" })}
        >
          <AntDesign
            name="plus"
            size={50}
            color="white"
            style={{
              backgroundColor: BRAND_COLOR,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
      </PlusBtn>
    </>
  );
};

const CommentRow = styled.View`
  width: 93%;
  margin-top: 3%;
  margin-left: 3.5%;
  margin-bottom: 3%;
  border-radius: 10px;
  padding-top: 20%;
  padding-left: 2%;
  padding-right: 2%;
`;
const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 13px;
  border-radius: 50px;
`;
const CommentText = styled.Text`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 15px;
  margin-bottom: 20px;
`;
const CommentName = styled.Text`
  position: absolute;
  margin-left: 80px;
  margin-top: 24px;
  font-size: 17px;
  font-weight: 600;
`;

const EditDeleteBtn = styled.View`
  position: absolute;
  right: 15px;
  top: 10px;
`;

const PlusBtn = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 50px;
`;

export default Main;
