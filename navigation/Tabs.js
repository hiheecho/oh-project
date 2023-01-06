import React from "react";
import Main from "../screen/Main";
import MyPage from "../screen/MyPage";
import PostDetail from "../screen/PostDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import {
  DARK_BACKGROUNDCOLOR,
  LIGHT_BACKGROUNDCOLOR,
  BRAND_COLOR,
  LIGHT_COLOR,
} from "../color";

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
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="MyPage" component={MyPage} />
      {/* 컴포넌트 테스트용 */}
      <Tab.Screen name="PostDetail" component={PostDetail} />
    </Tab.Navigator>
  );
}
