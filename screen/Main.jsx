import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Main = () => {
  const { navigate } = useNavigation();

  return (
    <View>
      <Text>Main</Text>
      <TouchableOpacity onPress={() => navigate("Stacks", { screen: "Post" })}>
        <Text>임시 글작성 버튼</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
