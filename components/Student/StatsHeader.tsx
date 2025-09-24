import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { colors } from '../../theme/colors';
import { useI18n } from '../../contexts/I18nContext';

export const StatsHeader: React.FC<{ subjects: number; achievements: number; hours: number }> = ({ subjects, achievements, hours }) => {
  const { t } = useI18n();
  return (
    <View style={styles.row}>
      <StatCard icon="📚" value={`${subjects}`} label={t('subjects')} />
      <StatCard icon="🏆" value={`${achievements}`} label={t('achievements')} />
      <StatCard icon="⏱️" value={`${hours}`} label={t('hoursStudied')} />
    </View>
  );
};

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <Card style={styles.card}>
      <View style={styles.icon}><Text>{icon}</Text></View>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: 20, fontWeight: '700', color: colors.primary },
  label: { color: colors.muted },
});


