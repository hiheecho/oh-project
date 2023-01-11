import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import Post from "../screen/Post";
import { BRAND_COLOR } from "../color";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import PostDetail from "../screen/PostDetail";
import PostEditing from "../screen/PostEditing";
// import { authService } from "../firebase";
// import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

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
        name="Post"
        component={Post}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color="white"
              onPress={() => goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PostEditing"
        component={PostEditing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
