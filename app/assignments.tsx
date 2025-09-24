import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getAssignmentsV2, V2Assignment } from '../services/assignments.v2';
import { AssignmentRow } from '../components/Student/AssignmentRow';
import { useI18n } from '../contexts/I18nContext';

export default function AssignmentsScreen() {
  const [items, setItems] = useState<V2Assignment[]>([]);
  const { t } = useI18n();

  useEffect(() => { getAssignmentsV2().then(setItems); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('assignments')}</Text>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <AssignmentRow item={item as any} onToggle={(id, done) => setItems((prev) => prev.map((x) => x.id === id ? { ...x, completed: done } : x))} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  title: { fontSize: 22, fontWeight: '700', padding: 16 },
});


