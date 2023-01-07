import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import Post from "../screen/Post";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { Ionicons } from "@expo/vector-icons";
import { BRAND_COLOR } from "../color";
// import { authService } from "../firebase";
// import { signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack } }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: BRAND_COLOR },
        headerTintColor: "#fff",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons name="chevron-back-sharp" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      {/* <Stack.Screen name="Detail" component={Detail} /> */}
      <Stack.Screen
        name="글쓰기"
        component={Post}
        options={{
          headerTintColor: BRAND_COLOR,
          headerRight: () => (
            <TouchableOpacity>
              <PostBtn>글쓰기</PostBtn>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;

const PostBtn = styled.Text`
  color: #fff;
  font-weight: bold;
`;
