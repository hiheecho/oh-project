import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import { BRAND_COLOR } from "../color";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { query, onSnapshot, orderBy } from "@firebase/firestore";
import { dbService } from "../firebase";
import { collection } from "@firebase/firestore";
import MainList from "../components/main/MainList";

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

  return (
    <>
      <FlatList
        itemSeparatorComponent={<View style={{ height: 10 }} />}
        data={contentList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MainList item={item} />}
      />
      <PlusBtn>
        <TouchableOpacity
          onPress={() => navigate("Stacks", { screen: "Post" })}
        >
          <AntDesign name="pluscircle" size={50} color={BRAND_COLOR} />
        </TouchableOpacity>
      </PlusBtn>
    </>
  );
};

const PlusBtn = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
`;

export default Main;
