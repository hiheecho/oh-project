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
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryFirestoreProvider } from "react-query-firestore";
const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
