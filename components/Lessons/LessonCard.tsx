import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { colors } from '../../theme/colors';
import { useI18n } from '../../contexts/I18nContext';
import { Link } from 'expo-router';
import { V2Lesson } from '../../services/data.v2';

export const LessonCard: React.FC<{ lesson: V2Lesson; completed: boolean }> = ({ lesson, completed }) => {
  const { t } = useI18n();
  return (
    <Card style={styles.card} accessibilityLabel={`Lesson ${lesson.title}`}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{lesson.title}</Text>
        {completed ? <Text style={styles.completed}>{t('overallProgress')}: 100%</Text> : null}
      </View>
      <Text style={styles.desc}>{lesson.description}</Text>
      <View style={styles.row}>
        <Text style={styles.tag}>{lesson.difficulty}</Text>
        {lesson.offlineAvailable ? <Text style={styles.offline}>{t('offline')}</Text> : null}
      </View>
      <Link href={{ pathname: '/lesson/[id]', params: { id: lesson.id } }} asChild>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel={`View lesson ${lesson.title}`} style={styles.button}>
          <Text style={styles.buttonText}>{t('open')}</Text>
        </TouchableOpacity>
      </Link>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  completed: { color: colors.success, fontWeight: '700' },
  desc: { color: '#6B7280', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 10 },
  tag: { color: colors.primary, fontWeight: '600' },
  offline: { color: colors.accent, fontWeight: '600' },
  button: { marginTop: 10, backgroundColor: colors.accent, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
});


