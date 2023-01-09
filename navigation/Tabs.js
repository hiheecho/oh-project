import React from "react";
import Main from "../screen/Main";
import MyPage from "../screen/MyPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import {
  DARK_BACKGROUNDCOLOR,
  LIGHT_BACKGROUNDCOLOR,
  BRAND_COLOR,
  LIGHT_COLOR,
} from "../color";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? DARK_BACKGROUNDCOLOR : LIGHT_BACKGROUNDCOLOR,
      }}
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: BRAND_COLOR },
        tabBarStyle: { backgroundColor: BRAND_COLOR },
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#FFF",
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="md-home-sharp" size={24} color="white" />
            ) : (
              <Ionicons name="md-home-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: "My",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="md-person" size={24} color="white" />
            ) : (
              <Ionicons name="md-person-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
