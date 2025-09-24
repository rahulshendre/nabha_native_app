import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from '../ui/Card';
import { getAssignmentsV2, V2Assignment } from '../../services/assignments.v2';
import { AssignmentRow } from './AssignmentRow';
import { useI18n } from '../../contexts/I18nContext';

export const AssignmentsBlock: React.FC = () => {
  const [items, setItems] = useState<V2Assignment[]>([]);
  const { t } = useI18n();
  useEffect(() => { getAssignmentsV2().then(setItems); }, []);
  return (
    <Card>
      <View style={styles.headerRow}>
        <Text style={styles.header}>{t('recentAssignments')}</Text>
        <Text style={styles.viewAll}>{t('viewAll')}</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <AssignmentRow item={item as any} onToggle={(id, done) => setItems((prev) => prev.map((x) => x.id === id ? { ...x, completed: done } : x))} />
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  header: { fontSize: 18, fontWeight: '600' },
  viewAll: { opacity: 0.7 },
});


