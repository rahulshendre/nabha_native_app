import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/Button';
import { colors } from '../theme/colors';
import { signIn } from '../services/auth';

export default function TeacherLoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  function handleSubmit() {
    setMessage(null);
    if (!username || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    setLoading(true);
    signIn(username, password)
      .then((u) => {
        if (u.role !== 'teacher') throw new Error('Please use a teacher account');
        setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' });
        setTimeout(() => router.replace('/teacher-dashboard'), 600);
      })
      .catch((e) => {
        setMessage({ type: 'error', text: e.message || 'Login failed' });
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Teacher Login</Text>
        <Text style={styles.subtitle}>Access your teaching dashboard</Text>

        <View style={styles.demo}>
          <Text style={styles.demoTitle}>Demo Credentials</Text>
          <Text style={styles.demoText}>Username: teacher123</Text>
          <Text style={styles.demoText}>Password: password123</Text>
        </View>

        {message && (
          <View style={[styles.msg, message.type === 'error' ? styles.msgError : styles.msgSuccess]}>
            <Text style={message.type === 'error' ? styles.msgErrorText : styles.msgSuccessText}>{message.text}</Text>
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Username or Teacher ID</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username or teacher ID"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Button title={loading ? 'Logging in...' : 'Login to Dashboard'} onPress={handleSubmit} disabled={loading} accessibilityLabel="Teacher login" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  subtitle: { color: colors.muted, marginBottom: 16 },
  demo: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8, marginBottom: 12 },
  demoTitle: { color: colors.primary, fontWeight: '600', marginBottom: 4 },
  demoText: { color: colors.muted, fontSize: 12 },
  field: { marginBottom: 12 },
  label: { color: '#374151', marginBottom: 6, fontWeight: '500' },
  input: { borderWidth: 2, borderColor: '#E5E7EB', borderRadius: 8, padding: 12 },
  msg: { padding: 10, borderRadius: 6, marginBottom: 10 },
  msgError: { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5', borderWidth: 1 },
  msgSuccess: { backgroundColor: '#D1FAE5', borderColor: '#A7F3D0', borderWidth: 1 },
  msgErrorText: { color: '#DC2626' },
  msgSuccessText: { color: '#059669' },
});


