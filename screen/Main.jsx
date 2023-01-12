import React, { useEffect, useState, useCallback } from "react";
import { FlatList, View } from "react-native";
import styled from "@emotion/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { query, onSnapshot, orderBy } from "@firebase/firestore";
import { dbService } from "../firebase";
import { collection } from "@firebase/firestore";
import MainList from "../components/main/MainList";
import { useFocusEffect } from "@react-navigation/native";

const Main = () => {
  const { navigate } = useNavigation();
  const [contentList, setContentList] = useState([]);

  //불러오기
  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  return (
    <>
      <FlatList
        itemSeparatorComponent={<View style={{ height: 10 }} />}
        data={contentList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MainList item={item} />}
      />
      <PlusBtnView>
        <PlusBtn onPress={() => navigate("Stacks", { screen: "Post" })}>
          <Feather name="plus" size={40} color="white" />
        </PlusBtn>
      </PlusBtnView>
    </>
  );
};
const PlusBtnView = styled.View`
  position: absolute;
  border-radius: 50px;
  bottom: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
`;
const PlusBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.brandColor};
  border-radius: 50px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export default Main;
