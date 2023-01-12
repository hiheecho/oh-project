import React from "react";
import { updateLikes } from "../../posts";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { useColorScheme } from "react-native";
import { DARK_COLOR, LIGHT_COLOR, BRAND_COLOR } from "../../color";
import { auth } from "../../firebase";

const Likes = ({ item }) => {
  const likesArray = item.userLikes;
  const currentId = auth.currentUser.uid;
  const isDark = useColorScheme() === "dark";

  const countLikes = () => {
    if (!likesArray.includes(currentId)) {
      likesArray.push(currentId);
    } else {
      const idx = likesArray.indexOf(currentId);
      likesArray.splice(idx, 1);
    }
  };

  const onCountLikes = () => {
    try {
      countLikes();
      calculate({ id: item.id, userLikes: likesArray });
    } catch (error) {
      console.log("error", error);
    }
  };

  const { mutate: calculate } = useMutation(
    ["update", item.id],
    (body) => updateLikes(body),
    {
      onSuccess: () => {},
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  return (
    <LikesArea>
      {!likesArray?.includes(currentId) ? (
        <AntDesign
          name="heart"
          size={20}
          color={isDark ? DARK_COLOR : LIGHT_COLOR}
          onPress={onCountLikes}
        />
      ) : (
        <AntDesign
          name="heart"
          size={20}
          color={BRAND_COLOR}
          onPress={onCountLikes}
        />
      )}
      <LikesCount>{likesArray?.length ? likesArray.length : null}</LikesCount>
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
  color: ${(props) => props.theme.color};
`;
