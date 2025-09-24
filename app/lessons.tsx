import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { getLessonsV2, V2Lesson, getCompletedLessons } from '../services/data.v2';
import { colors } from '../theme/colors';
import { useI18n } from '../contexts/I18nContext';
import { LessonCard } from '../components/Lessons/LessonCard';

export default function LessonsListScreen() {
  const [lessons, setLessons] = useState<V2Lesson[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const { t } = useI18n();

  useEffect(() => {
    let mounted = true;
    Promise.all([getLessonsV2(), getCompletedLessons()]).then(([ls, done]) => {
      if (!mounted) return;
      setLessons(ls);
      setCompleted(done);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={lessons}
      keyExtractor={(l) => l.id}
      renderItem={({ item }) => (
        <LessonCard lesson={item} completed={completed.includes(item.id)} />
      )}
      ListFooterComponent={<View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
});
