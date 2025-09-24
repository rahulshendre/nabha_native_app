import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { ColorTokens, darkColors, lightColors } from "../theme/colors";

type ThemeValue = { colors: ColorTokens; scheme: "light" | "dark" };
const ThemeContext = createContext<ThemeValue>({
  colors: lightColors,
  scheme: "light",
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const scheme = (useColorScheme() || "light") as "light" | "dark";
  const value = useMemo<ThemeValue>(
    () => ({ colors: scheme === "dark" ? darkColors : lightColors, scheme }),
    [scheme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
