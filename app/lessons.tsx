import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, Text } from 'react-native';
import { getLessonsV2, V2Lesson, getCompletedLessons } from '../services/data.v2';
import { useI18n } from '../contexts/I18nContext';
import { LessonCard } from '../components/Lessons/LessonCard';
import { useTheme } from '../contexts/ThemeContext';

export default function LessonsListScreen() {
  const [lessons, setLessons] = useState<V2Lesson[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();
  const { colors } = useTheme();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    Promise.all([getLessonsV2(), getCompletedLessons()])
      .then(([ls, done]) => {
        if (!mounted) return;
        setLessons(ls);
        setCompleted(done);
      })
      .catch(() => {
        if (!mounted) return;
        setError(t('somethingWentWrong'));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 16 }}
      data={lessons}
      keyExtractor={(l) => l.id}
      renderItem={({ item }) => (
        <LessonCard lesson={item} completed={completed.includes(item.id)} />
      )}
      ListEmptyComponent={loading ? null : (
        <View style={{ padding: 24 }}>
          <Text style={{ textAlign: 'center', color: colors.muted }}>
            {error ?? t('noData')}
          </Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => {
          setLoading(true);
          setError(null);
          Promise.all([getLessonsV2(), getCompletedLessons()])
            .then(([ls, done]) => { setLessons(ls); setCompleted(done); })
            .catch(() => setError(t('somethingWentWrong')))
            .finally(() => setLoading(false));
        }} />
      }
      ListFooterComponent={<View style={{ height: 16 }} />}
    />
  );
}

