import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AssignmentRecord } from "../../services/data";
import {
  V2Assignment,
  setAssignmentCompleted,
} from "../../services/assignments.v2";
import { Card } from "../ui/Card";
import { colors } from "../../theme/colors";

type Props = {
  item: AssignmentRecord | V2Assignment;
  onToggle?: (id: string, done: boolean) => void;
};

const AssignmentRowComponent: React.FC<Props> = ({ item, onToggle }) => {
  const due = new Date((item as any).dueDate);
  const isCompleted =
    (item as any).completed ?? (item as any).status === "completed";
  const badgeStyle = isCompleted ? styles.completed : styles.pending;
  const badgeText = isCompleted ? "Completed" : "Pending";
  return (
    <Card accessibilityLabel={`Assignment ${item.title}`} style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subject}>{(item as any).subject}</Text>
          <Text style={styles.due}>Due: {due.toDateString()}</Text>
        </View>
        <View style={[styles.badge, badgeStyle]}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      </View>
      {"completed" in item ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={
            isCompleted ? "Mark as pending" : "Mark as completed"
          }
          onPress={() => {
            const next = !isCompleted;
            setAssignmentCompleted((item as V2Assignment).id, next).then(() =>
              onToggle?.((item as V2Assignment).id, next),
            );
          }}
          style={[styles.toggleBtn, isCompleted && styles.toggleBtnDone]}
        >
          <Text style={styles.toggleBtnText}>
            {isCompleted ? "Mark Pending" : "Mark Completed"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </Card>
  );
};

export const AssignmentRow = React.memo(AssignmentRowComponent);

const styles = StyleSheet.create({
  card: { marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { color: colors.text, fontWeight: "600" },
  subject: { color: colors.accent, fontWeight: "500" },
  due: { color: "#6B7280" },
  badge: { borderRadius: 14, paddingVertical: 4, paddingHorizontal: 8 },
  pending: { backgroundColor: colors.accent },
  completed: { backgroundColor: colors.success },
  badgeText: { color: "white", fontWeight: "600" },
  toggleBtn: {
    marginTop: 8,
    backgroundColor: "#F59E0B",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleBtnDone: { backgroundColor: colors.success },
  toggleBtnText: { color: "white", fontWeight: "600" },
});
