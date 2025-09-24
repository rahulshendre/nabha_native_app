import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { I18nProvider } from "../contexts/I18nContext";
import { ThemeProvider as AppThemeProvider } from "../contexts/ThemeContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppThemeProvider>
        <I18nProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="learn" options={{ title: "Learn" }} />
            <Stack.Screen
              name="student-login"
              options={{ title: "Student Login" }}
            />
            <Stack.Screen
              name="teacher-login"
              options={{ title: "Teacher Login" }}
            />
            <Stack.Screen
              name="student-dashboard"
              options={{ title: "Student Dashboard" }}
            />
            <Stack.Screen
              name="teacher-dashboard"
              options={{ title: "Teacher Dashboard" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </I18nProvider>
      </AppThemeProvider>
    </ThemeProvider>
  );
}
