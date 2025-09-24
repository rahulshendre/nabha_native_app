import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useI18n } from '../contexts/I18nContext';
import { colors } from '../theme/colors';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();
  const langs: Array<{ code: 'en' | 'hi' | 'pa'; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  ];
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Language:</Text>
      {langs.map((l) => (
        <TouchableOpacity key={l.code} accessibilityRole="button" accessibilityLabel={`Switch to ${l.label}`} onPress={() => setLanguage(l.code)} style={[styles.btn, language === l.code && styles.active]}> 
          <Text style={[styles.btnText, language === l.code && styles.btnTextActive]}>{l.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' },
  label: { color: colors.text },
  btn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  btnText: { color: colors.text },
  btnTextActive: { color: 'white' },
});


