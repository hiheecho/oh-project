import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
// import { authService } from "../firebase";
// import { signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function Stacks({ navigation: { goBack } }) {
  const isDark = useColorScheme() === "dark";
  return (
    <Stack.Navigator>
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
