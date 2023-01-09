import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//여기부터 테스트용 코드
// import { useEffect, useState } from "react";

// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// import { dbService } from "../firebase";
// import ReviewList from "../components/ReviewList";
//여기까지

const Main = () => {
  const { navigate } = useNavigation();

  //여기부터 테스트용 코드

  // const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   const q = query(
  //     collection(dbService, "contents"),
  //     orderBy("createdAt", "desc")
  //   );
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const newReviews = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setReviews(newReviews);
  //   });
  //   return unsubscribe;
  // }, []);

  //여기까지

  return (
    <View>
      <Text>Main</Text>
      <TouchableOpacity onPress={() => navigate("Stacks", { screen: "Post" })}>
        <Text>임시 글작성 버튼</Text>
      </TouchableOpacity>
      {/* text용 List 임시컴포넌트 */}
      {/* {reviews.map((review) => {
        return <ReviewList key={review.id} review={review} />;
      })} */}

      {/* 여기까지 */}
    </View>
  );
};
export default Main;
