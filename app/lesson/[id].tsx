import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getLessonsV2, markLessonCompleted, getCompletedLessons, V2Lesson } from '../../services/data.v2';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { LessonDetail } from '../../components/Lessons/LessonDetail';

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lesson, setLesson] = useState<V2Lesson | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([getLessonsV2(), getCompletedLessons()]).then(([all, done]) => {
      if (!mounted) return;
      const l = all.find((x) => x.id === id) || null;
      setLesson(l);
      setCompleted(done.includes(String(id)));
    });
    return () => { mounted = false; };
  }, [id]);

  if (!lesson) {
    return (
      <View style={styles.container}><Text style={styles.loading}>Loading lesson…</Text></View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={[lesson]}
      keyExtractor={(l) => l.id}
      renderItem={() => (
        <LessonDetail lesson={lesson} initialCompleted={completed} onCompleted={() => setCompleted(true)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  content: { padding: 16 },
  loading: { color: '#6B7280', textAlign: 'center', marginTop: 24 },
});
