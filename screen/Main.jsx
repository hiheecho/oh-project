import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import { BRAND_COLOR } from "../color";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { query, onSnapshot, orderBy } from "@firebase/firestore";
import { dbService } from "../firebase";
import { collection } from "@firebase/firestore";
import MainList from "../components/MainList";

const Main = () => {
  const { navigate } = useNavigation();
  const [contentList, setContentList] = useState([]);
  //const [ data: contentListData ] = useQuery(["ContenList", ])

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
      //이벤트 리스너

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
