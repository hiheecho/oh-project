import React from "react";
import { updateLikes } from "../../posts";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { BRAND_COLOR } from "../../color";

const Likes = ({ item }) => {
  const likesArray = item.userLikes;

  const countLikes = () => {
    if (!likesArray.includes(item.userId)) {
      likesArray.push(item.userId);
    } else if (likesArray.includes(item.userId)) {
      const idx = likesArray.indexOf(item.userId);
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

  return (
    <LikesArea>
      {likesArray.length === 0 ? (
        <AntDesign
          name="hearto"
          size={15}
          color={BRAND_COLOR}
          onPress={onCountLikes}
        />
      ) : (
        <>
          <AntDesign
            name="heart"
            size={15}
            color={BRAND_COLOR}
            onPress={onCountLikes}
          />
          <LikesCount>{likesArray.length}</LikesCount>
        </>
      )}
    </LikesArea>
  );
};

export default Likes;

const LikesArea = styled.View`
  flex-direction: row;
  margin-left: 3%;
`;

const LikesCount = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 1%;
  color: ${(props) => props.theme.color};
`;
