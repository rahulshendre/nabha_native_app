export type ColorTokens = {
  primary: string;
  accent: string;
  bg: string;
  text: string;
  muted: string;
  success: string;
  danger: string;
  card: string;
  border: string;
};

export const lightColors: ColorTokens = {
  primary: "#1E3A8A",
  accent: "#F59E0B",
  bg: "#FAF9F6",
  text: "#1F2937",
  muted: "#6B7280",
  success: "#10B981",
  danger: "#DC2626",
  card: "#FFFFFF",
  border: "#E5E7EB",
};

export const darkColors: ColorTokens = {
  primary: "#93C5FD",
  accent: "#F59E0B",
  bg: "#0B1220",
  text: "#E5E7EB",
  muted: "#9CA3AF",
  success: "#34D399",
  danger: "#F87171",
  card: "#111827",
  border: "#374151",
};

export const colors = lightColors;
