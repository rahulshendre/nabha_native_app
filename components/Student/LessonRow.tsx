import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LessonRecord } from "../../services/data";
import { Card } from "../ui/Card";
import { colors } from "../../theme/colors";

type Props = { lesson: LessonRecord; lang: "en" | "hi" | "pa" };

const LessonRowComponent: React.FC<Props> = ({ lesson, lang }) => {
  return (
    <Card
      accessibilityLabel={`Lesson ${lesson.title[lang]}`}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.subject}>{lesson.subject}</Text>
        {lesson.offlineAvailable ? (
          <Text style={styles.offline}>Offline</Text>
        ) : null}
      </View>
      <Text style={styles.title}>{lesson.title[lang]}</Text>
      <Text style={styles.desc}>{lesson.description[lang]}</Text>
    </Card>
  );
};

export const LessonRow = React.memo(LessonRowComponent);

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  subject: { color: colors.primary, fontWeight: "600" },
  offline: { color: colors.accent, fontWeight: "600" },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: colors.text,
  },
  desc: { color: "#6B7280" },
});
