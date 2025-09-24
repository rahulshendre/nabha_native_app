import React, { createContext, useContext, useMemo } from "react";
import { ColorTokens, lightColors } from "../theme/colors";

type ThemeValue = { colors: ColorTokens; scheme: "light" | "dark" };
const ThemeContext = createContext<ThemeValue>({
  colors: lightColors,
  scheme: "light",
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const scheme: "light" | "dark" = "light"; // Force previous light palette
  const value = useMemo<ThemeValue>(() => ({ colors: lightColors, scheme }), []);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
