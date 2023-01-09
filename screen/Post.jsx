import React from "react";
import styled from "@emotion/native";
import { useColorScheme } from "react-native";

import { DARK_COLOR, LIGHT_COLOR } from "../color";

const Post = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <TextArea
      placeholder="10자 이상 작성해주세요."
      placeholderTextColor={isDark ? DARK_COLOR : LIGHT_COLOR}
      multiline={true}
      textAlignVertical="top"
    ></TextArea>
  );
};

export default Post;

const TextArea = styled.TextInput`
  flex: 1;
  padding: 20px;
  font-size: 17px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
`;
