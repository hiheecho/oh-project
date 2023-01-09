import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import Post from "../screen/Post";
import { BRAND_COLOR } from "../color";
// import { authService } from "../firebase";
// import { signOut } from "firebase/auth";
import PostDetail from "../screen/PostDetail";

const Stack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack } }) => {
  const isDark = useColorScheme() === "dark";

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: BRAND_COLOR },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="글쓰기"
        component={Post}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default Stacks;
