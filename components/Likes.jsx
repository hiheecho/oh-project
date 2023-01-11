import React, { useState } from "react";
import { updateLikes } from "../posts";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";

const Likes = ({ item }) => {
  const [likes, setLikes] = useState(item.heart);
  const [liked, setLiked] = useState(item.liked);

  const changeLikes = () => {
    if (!item.liked) {
      setLikes(+1);
      setLiked(true);
    }
    if (item.liked) {
      setLikes(-1);
      setLiked(false);
    }
  };

  const { isLoading, mutate: calculate } = useMutation(
    ["update", item.id],
    (body) => updateLikes(body),
    {
      onSuccess: () => {
        console.log("좋아요");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const onUpdateLikes = async () => {
    try {
      changeLikes();
      await calculate({ id: item.id, likes, liked });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <LikesArea>
      {item.likes ? (
        <>
          <AntDesign
            name="heart"
            size={15}
            color="black"
            value={likes}
            onPress={onUpdateLikes}
          />
          <LikesCount>{item.likes}</LikesCount>
        </>
      ) : (
        <AntDesign
          name="hearto"
          size={15}
          color="black"
          value={likes}
          onPress={onUpdateLikes}
        />
      )}
    </LikesArea>
  );
};

export default Likes;

const LikesArea = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  flex-direction: row;
`;

const LikesCount = styled.Text`
  font-size: 15;
  margin-left: 5px;
`;
