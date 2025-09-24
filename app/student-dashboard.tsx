import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const subjects = [
  { icon: '📐', title: 'Mathematics', progress: 75 },
  { icon: '🧪', title: 'Science', progress: 60 },
  { icon: '🔤', title: 'English', progress: 85 },
  { icon: '📖', title: 'Hindi', progress: 90 },
];

export default function StudentDashboard() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Learning Dashboard</Text>
        <View style={styles.statsRow}>
          <StatCard icon="📚" value="12" label="Subjects" />
          <StatCard icon="🏆" value="8" label="Achievements" />
          <StatCard icon="⏱️" value="45" label="Hours Studied" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Subjects</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={styles.grid}>
          {subjects.map((s) => (
            <View key={s.title} style={styles.subjectCard}>
              <View style={styles.subjectIcon}><Text style={{ fontSize: 18 }}>{s.icon}</Text></View>
              <Text style={styles.subjectTitle}>{s.title}</Text>
              <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${s.progress}%` }]} /></View>
              <Text style={styles.progressText}>{s.progress}% Complete</Text>
              <TouchableOpacity style={styles.smallBtn}><Text style={styles.smallBtnText}>Continue</Text></TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Assignments</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={{ gap: 10 }}>
          <AssignmentItem title="Math Problem Set #5" subject="Mathematics" due="Dec 20, 2024" status="Pending" />
          <AssignmentItem title="Science Experiment Report" subject="Science" due="Dec 18, 2024" status="Completed" />
          <AssignmentItem title="English Essay Writing" subject="English" due="Dec 22, 2024" status="Pending" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Achievements</Text><Text style={styles.viewAll}>View All</Text></View>
        <View style={styles.grid}> 
          <Badge title="Math Master" desc="Completed 10 math lessons" earned />
          <Badge title="Bookworm" desc="Read 5 English stories" earned />
          <Badge title="Science Explorer" desc="Completed 3 science experiments" earned />
          <Badge title="Perfect Score" desc="Get 100% on any quiz" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Quick Actions</Text></View>
        <View style={styles.grid}> 
          <ActionCard title="Download Offline Content" desc="Get lessons for offline study" />
          <ActionCard title="Ask Questions" desc="Get help from teachers" />
          <ActionCard title="View Progress" desc="See detailed analytics" />
          <ActionCard title="Settings" desc="Manage your account" />
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statIcon}><Text>{icon}</Text></View>
      <View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

function AssignmentItem({ title, subject, due, status }: { title: string; subject: string; due: string; status: 'Pending' | 'Completed' }) {
  return (
    <View style={styles.assignmentItem}>
      <View style={styles.assignmentIcon}><Text style={{ color: 'white' }}>📄</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.assignmentTitle}>{title}</Text>
        <Text style={styles.assignmentSubject}>{subject}</Text>
        <Text style={styles.assignmentDue}>Due: {due}</Text>
      </View>
      <View style={[styles.statusBadge, status === 'Pending' ? styles.badgePending : styles.badgeCompleted]}>
        <Text style={status === 'Pending' ? styles.badgePendingText : styles.badgeCompletedText}>{status}</Text>
      </View>
    </View>
  );
}

function Badge({ title, desc, earned }: { title: string; desc: string; earned?: boolean }) {
  return (
    <View style={[styles.badge, earned ? styles.badgeEarned : styles.badgeLocked]}>
      <View style={styles.badgeIcon}><Text>🏅</Text></View>
      <Text style={styles.badgeTitle}>{title}</Text>
      <Text style={styles.badgeDesc}>{desc}</Text>
    </View>
  );
}

function ActionCard({ title, desc }: { title: string; desc: string }) {
  return (
    <View style={styles.actionCard}>
      <View style={styles.actionIcon}><Text style={{ color: 'white' }}>⚙️</Text></View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  content: { padding: 16 },
  header: { marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#1E3A8A', marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'white', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  statIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 20, fontWeight: '700', color: '#1E3A8A' },
  statLabel: { color: '#6B7280' },
  section: { backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', padding: 16, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1E3A8A' },
  viewAll: { color: '#F59E0B', fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  subjectCard: { width: '48%', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12 },
  subjectIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  subjectTitle: { color: '#1E3A8A', fontWeight: '600', marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: '100%', backgroundColor: '#10B981' },
  progressText: { color: '#6B7280', fontSize: 12, marginBottom: 8 },
  smallBtn: { backgroundColor: '#F59E0B', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  smallBtnText: { color: 'white', fontWeight: '600' },
  assignmentItem: { flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', padding: 12 },
  assignmentIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4976bd', alignItems: 'center', justifyContent: 'center' },
  assignmentTitle: { color: '#1E3A8A', fontWeight: '600' },
  assignmentSubject: { color: '#F59E0B', fontWeight: '500', fontSize: 12 },
  assignmentDue: { color: '#6B7280', fontSize: 12 },
  statusBadge: { borderRadius: 14, paddingVertical: 4, paddingHorizontal: 8 },
  badgePending: { backgroundColor: '#F59E0B' },
  badgeCompleted: { backgroundColor: '#10B981' },
  badgePendingText: { color: '#1F2937', fontWeight: '600' },
  badgeCompletedText: { color: 'white', fontWeight: '600' },
  badge: { width: '48%', backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12 },
  badgeEarned: { backgroundColor: '#FFE08A' },
  badgeLocked: { opacity: 0.7 },
  badgeIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  badgeTitle: { fontWeight: '600', marginBottom: 4 },
  badgeDesc: { color: '#6B7280', fontSize: 12 },
  actionCard: { width: '48%', backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12 },
  actionIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FF8C42', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  actionTitle: { color: '#1E3A8A', fontWeight: '600', marginBottom: 4 },
  actionDesc: { color: '#6B7280', fontSize: 12 },
});


