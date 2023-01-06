import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/native";
import { useColorScheme } from "react-native";
import Root from "./navigation/Root";

export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
