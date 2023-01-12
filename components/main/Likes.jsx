import React from "react";
import { updateLikes } from "../../posts";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { BRAND_COLOR } from "../../color";
import { useColorScheme } from "react-native";
import { DARK_COLOR, LIGHT_COLOR } from "../../color";
import { auth } from "../../firebase";

const Likes = ({ item }) => {
  const likesArray = item.userLikes;
  const currentId = auth.currentUser.uid;

  const countLikes = () => {
    if (!likesArray.includes(currentId)) {
      likesArray.push(currentId);
    } else {
      const idx = likesArray.indexOf(currentId);
      likesArray.splice(idx, 1);
    }
  };

  const onCountLikes = async () => {
    try {
      countLikes();
      await calculate({ id: item.id, userLikes: likesArray });
    } catch (error) {
      console.log("error", error);
    }
  };

  const { mutate: calculate } = useMutation(
    ["update", item.id],
    (body) => updateLikes(body),
    {
      onSuccess: () => {
        console.log("좋아요 반영");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const isDark = useColorScheme() === "dark";

  return (
    <LikesArea>
      {likesArray?.length === 0 ? (
        <AntDesign
          name="heart"
          size={20}
          color={isDark ? DARK_COLOR : LIGHT_COLOR}
          onPress={onCountLikes}
        />
      ) : (
        <>
          <AntDesign
            name="heart"
            size={20}
            color={BRAND_COLOR}
            onPress={onCountLikes}
          />
          <LikesCount>{likesArray?.length}</LikesCount>
        </>
      )}
    </LikesArea>
  );
};

export default Likes;

const LikesArea = styled.View`
  flex-direction: row;
  height: 20px;
`;

const LikesCount = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: -3px;
  color: ${(props) => props.theme.color};
`;
