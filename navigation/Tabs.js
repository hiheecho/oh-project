import React from "react";
import Main from "../screen/Main";
import MyPage from "../screen/MyPage";
import Login from "../screen/Login";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import {
  DARK_BACKGROUNDCOLOR,
  LIGHT_BACKGROUNDCOLOR,
  BRAND_COLOR,
  LIGHT_COLOR,
} from "../color";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });

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
      {isLoggedIn ? (
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
            headerTitleAlign: "right",
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
      )}
      {isLoggedIn ? (
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
            headerTitleAlign: "right",
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}
