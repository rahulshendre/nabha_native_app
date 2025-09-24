import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useI18n } from '../contexts/I18nContext';

export default function HomeScreen() {
  const { language, setLanguage, t } = useI18n();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('hero-title')}</Text>
      <Text style={styles.subtitle}>{t('hero-subtitle')}</Text>

      <View style={styles.buttons}>
        <Link href="/student-login" asChild>
          <TouchableOpacity style={[styles.btn, styles.primary]}>
            <Text style={styles.btnText}>{t('student-login-title')}</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/teacher-login" asChild>
          <TouchableOpacity style={[styles.btn, styles.outline]}>
            <Text style={styles.btnOutlineText}>{t('teacher-login-title')}</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.langRow}>
        <Text style={styles.langLabel}>Language:</Text>
        <TouchableOpacity onPress={() => setLanguage('en')} style={[styles.langBtn, language === 'en' && styles.langBtnActive]}>
          <Text style={[styles.langBtnText, language === 'en' && styles.langBtnTextActive]}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('hi')} style={[styles.langBtn, language === 'hi' && styles.langBtnActive]}>
          <Text style={[styles.langBtnText, language === 'hi' && styles.langBtnTextActive]}>हिंदी</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('pa')} style={[styles.langBtn, language === 'pa' && styles.langBtnActive]}>
          <Text style={[styles.langBtnText, language === 'pa' && styles.langBtnTextActive]}>ਪੰਜਾਬੀ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#1E3A8A', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#4B5563', textAlign: 'center', marginBottom: 24 },
  buttons: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginBottom: 24 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
  primary: { backgroundColor: '#F59E0B' },
  outline: { borderWidth: 2, borderColor: '#1E3A8A' },
  btnText: { color: 'white', fontWeight: '600' },
  btnOutlineText: { color: '#1E3A8A', fontWeight: '600' },
  langRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' },
  langLabel: { color: '#1F2937', marginRight: 8 },
  langBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  langBtnActive: { backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' },
  langBtnText: { color: '#111827' },
  langBtnTextActive: { color: 'white' },
});


