import React, { PropsWithChildren } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../theme/colors";

type Props = PropsWithChildren<{
  style?: ViewStyle;
  accessibilityLabel?: string;
}>;

export const Card: React.FC<Props> = ({
  children,
  style,
  accessibilityLabel,
}) => {
  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
      style={[styles.card, style]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
});
