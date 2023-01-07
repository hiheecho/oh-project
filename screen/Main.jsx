import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import styled from "@emotion/native";
import { DARK_COLOR, LIGHT_COLOR, BRAND_COLOR } from "../color";
import { DARK_GRAY, LIGHT_GRAY } from "../color";
import { useColorScheme } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default MyPage = () => {
  const isDark = useColorScheme() === "dark";
  const username = "유저";
  const Comment =
    "안녕하세요 백예린 노래 좋아요. 많이 들어주세요. 백예린 노래 좋아요. 많이 들어주세요. 안녕하세요 백예린 노래 좋아요. 많이 들어주세요. 백예린 노래 좋아요. 많이 들어주세요.";
  return (
    <View>
      <ScrollView>
        <CommentRow
          style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
        >
          <UserImg
            style={StyleSheet.absoluteFill}
            source={require("../assets/icon.png")}
          />
          <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {username}
          </CommentName>
          <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {Comment.slice(0, 60)}
            {Comment.length > 60 && "..."}
          </CommentText>
          <EditDeleteBtn>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </TouchableOpacity>
          </EditDeleteBtn>
        </CommentRow>
        <CommentRow
          style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
        >
          <UserImg
            style={StyleSheet.absoluteFill}
            source={require("../assets/icon.png")}
          />
          <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {username}
          </CommentName>
          <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {Comment.slice(0, 60)}
            {Comment.length > 60 && "..."}
          </CommentText>
          <EditDeleteBtn>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </TouchableOpacity>
          </EditDeleteBtn>
        </CommentRow>
        <CommentRow
          style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
        >
          <UserImg
            style={StyleSheet.absoluteFill}
            source={require("../assets/icon.png")}
          />
          <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {username}
          </CommentName>
          <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {Comment.slice(0, 60)}
            {Comment.length > 60 && "..."}
          </CommentText>
          <EditDeleteBtn>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </TouchableOpacity>
          </EditDeleteBtn>
        </CommentRow>
        <CommentRow
          style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
        >
          <UserImg
            style={StyleSheet.absoluteFill}
            source={require("../assets/icon.png")}
          />
          <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {username}
          </CommentName>
          <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {Comment.slice(0, 60)}
            {Comment.length > 60 && "..."}
          </CommentText>
          <EditDeleteBtn>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </TouchableOpacity>
          </EditDeleteBtn>
        </CommentRow>
        <CommentRow
          style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
        >
          <UserImg
            style={StyleSheet.absoluteFill}
            source={require("../assets/icon.png")}
          />
          <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {username}
          </CommentName>
          <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {Comment.slice(0, 60)}
            {Comment.length > 60 && "..."}
          </CommentText>
          <EditDeleteBtn>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </TouchableOpacity>
          </EditDeleteBtn>
        </CommentRow>
        <CommentRow
          style={{ backgroundColor: isDark ? DARK_GRAY : LIGHT_GRAY }}
        >
          <UserImg
            style={StyleSheet.absoluteFill}
            source={require("../assets/icon.png")}
          />
          <CommentName style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {username}
          </CommentName>
          <CommentText style={{ color: isDark ? DARK_COLOR : LIGHT_COLOR }}>
            {Comment.slice(0, 60)}
            {Comment.length > 60 && "..."}
          </CommentText>
          <EditDeleteBtn>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
            </TouchableOpacity>
          </EditDeleteBtn>
        </CommentRow>
      </ScrollView>
      <PlusBtn>
        <TouchableOpacity>
          <AntDesign
            name="plus"
            size={50}
            color="white"
            style={{
              backgroundColor: BRAND_COLOR,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
      </PlusBtn>
    </View>
  );
};

const CommentRow = styled.View`
  width: 93%;
  height: 18%;
  margin: 3.5%;
  border-radius: 10px;
  padding-top: 19%;
  padding-left: 2%;
  padding-right: 2%;
`;
const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 13px;
  border-radius: 50px;
`;
const CommentText = styled.Text`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 15px;
  margin-bottom: 5px;
`;
const CommentName = styled.Text`
  position: absolute;
  margin-left: 80px;
  margin-top: 24px;
  font-size: 17px;
  font-weight: 600;
`;

const EditDeleteBtn = styled.View`
  position: absolute;
  margin-left: 340px;
  margin-top: 15px;
`;

const PlusBtn = styled.View`
  position: absolute;
  margin-left: 340px;
  margin-top: 180%;
`;
