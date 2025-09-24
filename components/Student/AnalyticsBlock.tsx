import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { getAnalytics, AnalyticsData } from '../../services/analytics';
import { PerformanceBar } from '../charts/PerformanceBar';
import { AttendanceLine } from '../charts/AttendanceLine';
import { OverallProgressCircle } from '../charts/OverallProgressCircle';
import { useI18n } from '../../contexts/I18nContext';

export const AnalyticsBlock: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const { t } = useI18n();
  useEffect(() => { getAnalytics().then(setData); }, []);
  if (!data) return null;
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


