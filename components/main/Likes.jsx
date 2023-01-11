import React, { useState } from "react";
import { updateLikes } from "../../posts";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { BRAND_COLOR } from "../../color";

const Likes = ({ item }) => {
  const [likes, setLikes] = useState(item.likes);
  const [liked, setLiked] = useState(item.liked);

  const changeLikes = () => {
    if (!item.liked) {
      setLikes((prev) => prev + 1);
    }
    if (item.liked && item.likes > 0) {
      setLikes((prev) => prev - 1);
    }
  };

  const changeLiked = () => {
    if (!item.liked) {
      setLiked(true);
    }
    if (item.liked && item.likes > 0) {
      setLiked(false);
    }
  };

  // const plusLikes = () => {
  //   if (!item.liked) {
  //     setLikes((prev) => prev + 1);
  //     setLiked(true);
  //   }
  // };

  // const falseLiked = () => {
  //   if (!item.liked) {
  //     setLiked(true);
  //   }
  // };

  // const minusLikes = () => {
  //   if (item.liked && item.likes > 0) {
  //     setLikes((prev) => prev - 1);
  //   }
  // };

  // const trueLiked = () => {
  //   if (item.liked && item.likes > 0) {
  //     setLiked(false);
  //   }
  // };

  // const onPlusLikes = async () => {
  //   try {
  //     plusLikes();
  //     falseLiked();
  //     await calculate({ id: item.id, likes, liked });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // const onMinusLikes = async () => {
  //   try {
  //     minusLikes();
  //     trueLiked();
  //     await calculate({ id: item.id, likes, liked });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const onChangeLikes = async () => {
    try {
      changeLiked();
      changeLikes();
      console.log(likes, liked);
      await calculate({ id: item.id, likes, liked });
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
      {/* {!item.likes ? (
        <AntDesign
          name="hearto"
          size={15}
          color={BRAND_COLOR}
          value={likes}
          onPress={onPlusLikes}
        />
      ) : !item.liked ? (
        <>
          <AntDesign
            name="heart"
            size={15}
            color="blue"
            value={likes}
            onPress={onPlusLikes}
          />
          <LikesCount>{item.likes}</LikesCount>
        </>
      ) : (
        <>
          <AntDesign
            name="heart"
            size={15}
            color={BRAND_COLOR}
            value={likes}
            onPress={onMinusLikes}
          />
          <LikesCount>{item.likes}</LikesCount>
        </>
      )} */}
      {!item.likes ? (
        <AntDesign
          name="hearto"
          size={15}
          color={BRAND_COLOR}
          value={likes}
          onPress={onChangeLikes}
        />
      ) : (
        <>
          <AntDesign
            name="heart"
            size={15}
            color={BRAND_COLOR}
            value={likes}
            onPress={onChangeLikes}
          />
          <LikesCount>{item.likes}</LikesCount>
        </>
      )}
    </LikesArea>
  );
};

export default Likes;

const LikesArea = styled.View`
  position: absolute;
  bottom: 10px;
  right: 0;
  flex-direction: row;
`;

const LikesCount = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: ${(props) => props.theme.color};
`;
