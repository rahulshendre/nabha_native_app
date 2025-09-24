/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from "@/contexts/ThemeContext";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: "text" | "background",
) {
  const { colors, scheme } = useTheme();
  const colorFromProps = props[scheme];
  return colorFromProps ?? (colorName === "text" ? colors.text : colors.bg);
}
