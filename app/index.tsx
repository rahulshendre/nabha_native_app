import React from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useI18n } from "../contexts/I18nContext";
import { Button } from "../components/ui/Button";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useTheme } from "../contexts/ThemeContext";

export default function HomeScreen() {
  const { t } = useI18n();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: 24,
      justifyContent: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: colors.primary,
      marginBottom: 8,
      textAlign: "center",
      letterSpacing: 0.3,
    },
    subtitle: {
      fontSize: 16,
      color: colors.muted,
      textAlign: "center",
      marginBottom: 28,
    },
    buttons: {
      flexDirection: "row",
      gap: 12,
      justifyContent: "center",
      marginBottom: 28,
      flexWrap: "wrap",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("welcome")}</Text>
      <Text style={styles.subtitle}>{t("dashboard")}</Text>

      <View style={styles.buttons}>
        <Link href="/student-login" asChild>
          <Button
            title={t("studentLogin")}
            accessibilityLabel={t("studentLogin")}
          />
        </Link>
        <Link href="/teacher-login" asChild>
          <Button
            title={t("teacherLogin")}
            variant="outline"
            accessibilityLabel={t("teacherLogin")}
          />
        </Link>
        <Link href="/learn" asChild>
          <Button
            title={t("learn") || "Learn"}
            accessibilityLabel={t("learn") || "Learn"}
          />
        </Link>
      </View>

      <LanguageSwitcher />
    </View>
  );
}
