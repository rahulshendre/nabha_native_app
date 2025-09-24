import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { getAnalytics, AnalyticsData } from '../../services/analytics';
import { PerformanceBar } from '../charts/PerformanceBar';
import { AttendanceLine } from '../charts/AttendanceLine';
import { OverallProgressCircle } from '../charts/OverallProgressCircle';
import { useI18n } from '../../contexts/I18nContext';

const demoData: AnalyticsData = {
  attendance: Array.from({ length: 14 }).map((_, i) => ({
    date: `2025-09-${String(i + 1).padStart(2, '0')}`,
    present: (i % 3) !== 0,
  })),
  performance: [
    { subject: 'Mathematics', score: 78 },
    { subject: 'Science', score: 84 },
    { subject: 'English', score: 72 },
    { subject: 'Computer Science', score: 90 },
  ],
  overallProgress: 68,
};

export const AnalyticsBlock: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(demoData);
  const { t } = useI18n();
  useEffect(() => {
    let mounted = true;
    getAnalytics()
      .then((d) => { if (mounted && d) setData(d); })
      .catch(() => { /* keep demoData */ })
      ;
    return () => { mounted = false; };
  }, []);
  if (!data) return (
    <Card style={styles.card} accessibilityLabel={t('performance')}>
      <Text style={styles.header}>{t('performance')}</Text>
      <Text style={{ textAlign: 'center' }}>Loading...</Text>
    </Card>
  );
  return (
    <>
      <Card style={styles.card} accessibilityLabel={t('performance')}>
        <Text style={styles.header}>{t('performance')}</Text>
        <PerformanceBar data={data.performance} />
      </Card>
      <Card style={styles.card} accessibilityLabel={t('attendance')}>
        <Text style={styles.header}>{t('attendance')}</Text>
        <AttendanceLine data={data.attendance} />
      </Card>
      <Card style={styles.card} accessibilityLabel={t('overallProgress')}>
        <Text style={styles.header}>{t('overallProgress')}</Text>
        <OverallProgressCircle value={data.overallProgress} />
        <Text style={styles.center}>{data.overallProgress}%</Text>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  header: { fontWeight: '600', marginBottom: 8 },
  center: { textAlign: 'center', marginTop: -60, fontWeight: '700' },
});


