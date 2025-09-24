import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { getAssignmentsV2, V2Assignment } from '../services/assignments.v2';
import { AssignmentRow } from '../components/Student/AssignmentRow';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

export default function AssignmentsScreen() {
  const [items, setItems] = useState<V2Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();
  const { colors } = useTheme();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAssignmentsV2()
      .then(setItems)
      .catch(() => setError(t('somethingWentWrong')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Text style={{ fontSize: 22, fontWeight: '700', padding: 16, color: colors.text }}>
        {t('assignments')}
      </Text>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <AssignmentRow item={item as any} onToggle={(id, done) => setItems((prev) => prev.map((x) => x.id === id ? { ...x, completed: done } : x))} />
        )}
        ListEmptyComponent={!loading && (
          <Text style={{ textAlign: 'center', padding: 24, color: colors.muted }}>
            {error ?? t('noData')}
          </Text>
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => {
            setLoading(true);
            setError(null);
            getAssignmentsV2()
              .then(setItems)
              .catch(() => setError(t('somethingWentWrong')))
              .finally(() => setLoading(false));
          }} />
        }
      />
    </View>
  );
}
