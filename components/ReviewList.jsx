import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ReviewList = ({ review }) => {
  const { navigate } = useNavigation();
  const goToDetail = () => {
    navigate("Stacks", {
      screen: "PostDetail",
      params: { review },
    });
  };
  return (
    <TouchableOpacity
      style={{ borderWidth: 2, borderColor: "black" }}
      onPress={goToDetail}
    >
      <View>
        <Text>{review.nickname}</Text>
        <Text>{review.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewList;
