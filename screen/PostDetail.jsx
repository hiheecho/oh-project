import React from "react";
import styled from "@emotion/native";
import DetailContent from "../components/postdetail/DetailContent";

const PostDetail = ({
  route: {
    params: { item },
  },
}) => {
  return (
    <PostDetailWrapper>
      <DetailContent item={item} />
    </PostDetailWrapper>
  );
};

const PostDetailWrapper = styled.View`
  background-color: ${(props) => props.theme.background};
  flex: 1;
`;

export default PostDetail;
