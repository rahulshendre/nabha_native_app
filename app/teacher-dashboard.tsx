import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getAssignmentsV2, V2Assignment } from '../services/assignments.v2';
import { getAnalytics } from '../services/analytics';
import { useEffect as useReactEffect } from 'react';
import { PerformanceBar } from '../components/charts/PerformanceBar';
import { Link, useRouter } from 'expo-router';
import { Button } from '../components/ui/Button';
import { useI18n } from '../contexts/I18nContext';
import { signOut } from '../services/auth';

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState<V2Assignment[]>([]);
  useEffect(() => { getAssignmentsV2().then(setAssignments); }, []);
  const summary = useMemo(() => ({
    total: assignments.length,
    completed: assignments.filter(a => a.completed).length,
    pending: assignments.filter(a => !a.completed).length,
  }), [assignments]);

  const [analytics, setAnalytics] = React.useState<any | null>(null);
  useEffect(() => { getAnalytics().then(setAnalytics); }, []);

  const router = useRouter();
  const { t } = useI18n();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}><Text style={styles.headerTitle}>{t('dashboard')}</Text></View>

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Link href="/lessons" asChild>
          <Button title={t('browseLessons')} accessibilityLabel={t('browseLessons')} />
        </Link>
        <Link href="/assignments" asChild>
          <Button title={t('assignments')} accessibilityLabel={t('assignments')} />
        </Link>
        <Button title={t('logout')} accessibilityLabel={t('logout')} variant="outline" onPress={() => { signOut().then(() => router.replace('/')); }} />
      </View>

      <View className="stats" style={styles.statsRow}>
        <StatCard icon="👥" value="45" label="Students" />
        <StatCard icon="📚" value="8" label="Subjects" />
        <StatCard icon="📝" value={`${summary.pending}`} label="Assignments Pending" />
        <StatCard icon="✅" value={`${summary.completed}`} label="Assignments Completed" />
      </View>

      <Section title="Student Performance Analytics">
        {analytics ? (
          <View style={styles.chartsRow}>
            <View style={styles.chartBox}><PerformanceBar data={analytics.performance} /></View>
            <View style={styles.chartBox}><Text style={styles.chartTitle}>Attendance %: {Math.round((analytics.attendance.filter((a: any) => a.present).length / analytics.attendance.length) * 100)}%</Text></View>
          </View>
        ) : null}
      </Section>

      <Section title="Class Overview" actionLabel="Manage Classes">
        <View style={{ gap: 10 }}>
          <ClassItem name="Class 8A - Mathematics" info="25 students • Morning Session" score="85%" present="22" />
          <ClassItem name="Class 8B - Science" info="20 students • Afternoon Session" score="78%" present="18" />
        </View>
      </Section>

      <Section title="Lesson Management" actionLabel="Upload New">
        <View style={{ gap: 10 }}>
          <LessonItem title="Algebra Basics" info="Mathematics • Class 8A" stats="25 views • 4.8/5 rating" />
          <LessonItem title="Photosynthesis Process" info="Science • Class 8B" stats="18 views • 4.6/5 rating" />
        </View>
      </Section>

      <Section title="Assignments" actionLabel="Create New (coming soon)">
        <View style={{ gap: 8 }}>
          <Text style={{ color: '#6B7280' }}>Total: {summary.total} • Pending: {summary.pending} • Completed: {summary.completed}</Text>
        </View>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children, actionLabel }: { title: string; children: React.ReactNode; actionLabel?: string }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
      </View>
      {children}
    </View>
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

function ClassItem({ name, info, score, present }: { name: string; info: string; score: string; present: string }) {
  return (
    <View style={styles.classItem}>
      <View>
        <Text style={styles.className}>{name}</Text>
        <Text style={styles.classInfo}>{info}</Text>
      </View>
      <View style={styles.classStats}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.statValueSm}>{score}</Text>
          <Text style={styles.statLabel}>Avg. Score</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.statValueSm}>{present}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
      </View>
    </View>
  );
}

function StudentItem({ name, klass, score, trend }: { name: string; klass: string; score: string; trend: 'up' | 'stable' }) {
  return (
    <View style={styles.studentItem}>
      <View style={styles.studentAvatar}><Text style={{ color: 'white' }}>👤</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentKlass}>{klass}</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.statValueSm}>{score}</Text>
        <View style={[styles.trend, trend === 'up' ? styles.trendUp : styles.trendStable]}>
          <Text style={{ color: 'white', fontSize: 10 }}>{trend === 'up' ? '↑' : '–'}</Text>
        </View>
      </View>
    </View>
  );
}

function LessonItem({ title, info, stats }: { title: string; info: string; stats: string }) {
  return (
    <View style={styles.lessonItem}>
      <View style={styles.lessonIcon}><Text style={{ color: 'white' }}>📄</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.lessonTitle}>{title}</Text>
        <Text style={styles.lessonInfo}>{info}</Text>
        <Text style={styles.lessonStats}>{stats}</Text>
      </View>
    </View>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}><Text style={{ color: 'white' }}>✓</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.activityText}>{text}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  content: { padding: 16 },
  header: { marginBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#1E3A8A' },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 12 },
  statCard: { flexBasis: '48%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'white', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  statIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#1E3A8A' },
  statLabel: { color: '#6B7280', fontSize: 12 },
  statValueSm: { fontSize: 16, fontWeight: '700', color: '#1E3A8A' },
  section: { backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', padding: 16, marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1E3A8A' },
  action: { color: '#F59E0B', fontWeight: '500' },
  chartsRow: { flexDirection: 'row', gap: 12 },
  chartBox: { flex: 1, height: 180, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  chartTitle: { color: '#6B7280' },
  classItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', padding: 12 },
  className: { color: '#1E3A8A', fontWeight: '600', marginBottom: 2 },
  classInfo: { color: '#6B7280', fontSize: 12 },
  classStats: { flexDirection: 'row', gap: 16 },
  studentItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#F3F4F6', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', padding: 12 },
  studentAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4976bd', alignItems: 'center', justifyContent: 'center' },
  studentName: { color: '#1E3A8A', fontWeight: '600' },
  studentKlass: { color: '#6B7280', fontSize: 12 },
  trend: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  trendUp: { backgroundColor: '#10B981' },
  trendStable: { backgroundColor: '#9CA3AF' },
  lessonItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#F9FAFB', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', padding: 12 },
  lessonIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center' },
  lessonTitle: { color: '#1E3A8A', fontWeight: '600' },
  lessonInfo: { color: '#6B7280', fontSize: 12 },
  lessonStats: { color: '#F59E0B', fontSize: 12 },
  activityItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#F9FAFB', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', padding: 12 },
  activityIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#4976bd', alignItems: 'center', justifyContent: 'center' },
  activityText: { color: '#374151' },
  activityTime: { color: '#9CA3AF', fontSize: 12 },
});
