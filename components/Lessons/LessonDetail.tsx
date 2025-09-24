import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { V2Lesson, markLessonCompleted } from '../../services/data.v2';
import { colors } from '../../theme/colors';
import { useI18n } from '../../contexts/I18nContext';

export const LessonDetail: React.FC<{ lesson: V2Lesson; initialCompleted: boolean; onCompleted: () => void }> = ({ lesson, initialCompleted, onCompleted }) => {
  const { t } = useI18n();
  const [completed, setCompleted] = useState<boolean>(initialCompleted);
  const [selected, setSelected] = useState<{ [idx: number]: number | undefined }>({});

  const blocks = useMemo(() => lesson.contents, [lesson]);

  return (
    <View>
      {blocks.map((b, idx) => {
        if (b.type === 'text') {
          return (
            <Card key={idx} style={styles.block}><Text style={styles.body}>{b.body}</Text></Card>
          );
        }
        if (b.type === 'image') {
          return (
            <Card key={idx} style={styles.block}><Image source={{ uri: (b as any).imageUri || '' }} style={styles.image} /></Card>
          );
        }
        if (b.type === 'quiz') {
          const q = (b as any).quiz?.[0];
          const chosen = selected[idx];
          return (
            <Card key={idx} style={styles.block} accessibilityRole="radiogroup">
              <Text style={styles.quizQ}>{b.body}</Text>
              {q?.options?.map((opt: string, i: number) => {
                const isCorrect = i === q.correctAnswer;
                const isChosen = chosen === i;
                const stateStyle = isChosen ? (isCorrect ? styles.optCorrect : styles.optWrong) : undefined;
                return (
                  <TouchableOpacity
                    key={i}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isChosen }}
                    onPress={() => setSelected((prev) => ({ ...prev, [idx]: i }))}
                    style={[styles.option, stateStyle]}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </Card>
          );
        }
        return null;
      })}

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={t('overallProgress')}
        onPress={() => {
          markLessonCompleted(lesson.id).then(() => { setCompleted(true); onCompleted(); });
        }}
        style={[styles.button, completed && styles.buttonDone]}
        disabled={completed}
      >
        <Text style={styles.buttonText}>{completed ? t('achievements') : t('overallProgress')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: { marginBottom: 12 },
  body: { color: colors.text },
  image: { height: 200, borderRadius: 8 },
  quizQ: { fontWeight: '700', marginBottom: 8 },
  option: { paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, marginBottom: 6 },
  optCorrect: { backgroundColor: '#D1FAE5' },
  optWrong: { backgroundColor: '#FEE2E2' },
  optionText: { color: colors.text },
  button: { backgroundColor: colors.accent, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  buttonDone: { backgroundColor: colors.success },
  buttonText: { color: 'white', fontWeight: '600' },
});


