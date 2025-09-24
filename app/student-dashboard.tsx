import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { StatsHeader } from "../components/Student/StatsHeader";
import { AnalyticsBlock } from "../components/Student/AnalyticsBlock";
import { useI18n } from "../contexts/I18nContext";
import { Link } from "expo-router";
import { Button } from "../components/ui/Button";

const subjects = [
  { icon: "📐", title: "Mathematics", progress: 75 },
  { icon: "🧪", title: "Science", progress: 60 },
  { icon: "🔤", title: "English", progress: 85 },
  { icon: "📖", title: "Hindi", progress: 90 },
];

export default function StudentDashboard() {
  const { t } = useI18n();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("myLearningDashboard")}</Text>
        <StatsHeader subjects={12} achievements={8} hours={45} />
        <View style={{ marginTop: 12, gap: 8 }}>
          <Link href="/lessons" asChild>
            <Button title={t("browseLessons")} accessibilityLabel={t("browseLessons")} />
          </Link>
          <Link href="/assignments" asChild>
            <Button title={t("assignments")} accessibilityLabel={t("assignments")} />
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("mySubjects")}</Text>
          <Text style={styles.viewAll}>{t("viewAll")}</Text>
        </View>
        <View style={styles.grid}>
          {subjects.map((s) => (
            <View key={s.title} style={styles.subjectCard}>
              <View style={styles.subjectIcon}>
                <Text style={{ fontSize: 18 }}>{s.icon}</Text>
              </View>
              <Text style={styles.subjectTitle}>{s.title}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${s.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{s.progress}% {t("progress")}</Text>
              <TouchableOpacity style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>{t("continue")}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>


      <AnalyticsBlock />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("achievements")}</Text>
          <Text style={styles.viewAll}>{t("viewAll")}</Text>
        </View>
        <View style={styles.grid}>
          <Badge title="Math Master" desc="Completed 10 math lessons" earned />
          <Badge title="Bookworm" desc="Read 5 English stories" earned />
          <Badge title="Science Explorer" desc="Completed 3 science experiments" earned />
          <Badge title="Perfect Score" desc="Get 100% on any quiz" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("quickActions")}</Text>
        </View>
        <View style={styles.grid}>
          <ActionCard title={t("downloadOfflineContent")} desc={t("lessons")} />
          <ActionCard title={t("askQuestions")} desc={t("teacherLogin")} />
          <ActionCard title={t("viewProgressCta")} desc={t("performance")} />
          <ActionCard title={t("settings")} desc={t("dashboard")} />
        </View>
      </View>
    </ScrollView>
  );
}

function Badge({ title, desc, earned }: { title: string; desc: string; earned?: boolean }) {
  return (
    <View style={[styles.badge, earned ? styles.badgeEarned : styles.badgeLocked]}>
      <View style={styles.badgeIcon}>
        <Text>🏅</Text>
      </View>
      <Text style={styles.badgeTitle}>{title}</Text>
      <Text style={styles.badgeDesc}>{desc}</Text>
    </View>
  );
}

function ActionCard({ title, desc }: { title: string; desc: string }) {
  return (
    <View style={styles.actionCard}>
      <View style={styles.actionIcon}>
        <Text style={{ color: "white" }}>⚙️</Text>
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF9F6" },
  content: { padding: 16 },
  header: { marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#1E3A8A", marginBottom: 12 },
  section: { backgroundColor: "white", borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB", padding: 16, marginBottom: 16 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" },
  viewAll: { color: "#F59E0B", fontWeight: "500" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  subjectCard: { width: "48%", backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 12 },
  subjectIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#10B981", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  subjectTitle: { color: "#1E3A8A", fontWeight: "600", marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: "#E5E7EB", borderRadius: 4, overflow: "hidden", marginBottom: 6 },
  progressFill: { height: "100%", backgroundColor: "#10B981" },
  progressText: { color: "#6B7280", fontSize: 12, marginBottom: 8 },
  smallBtn: { backgroundColor: "#F59E0B", paddingVertical: 8, borderRadius: 6, alignItems: "center" },
  smallBtnText: { color: "white", fontWeight: "600" },
  badge: { width: "48%", backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 12 },
  badgeEarned: { backgroundColor: "#FFE08A" },
  badgeLocked: { opacity: 0.7 },
  badgeIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.6)", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  badgeTitle: { fontWeight: "600", marginBottom: 4 },
  badgeDesc: { color: "#6B7280", fontSize: 12 },
  actionCard: { width: "48%", backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 12 },
  actionIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FF8C42", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  actionTitle: { color: "#1E3A8A", fontWeight: "600", marginBottom: 4 },
  actionDesc: { color: "#6B7280", fontSize: 12 },
});
