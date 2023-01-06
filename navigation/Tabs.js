import React from "react";
import Main from "../screen/Main";
import MyPage from "../screen/MyPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}
