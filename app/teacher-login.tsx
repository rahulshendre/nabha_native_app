import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TeacherLoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const demo = { username: 'teacher123', password: 'password123' };

  function handleSubmit() {
    setMessage(null);
    if (!username || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (username === demo.username && password === demo.password) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' });
        setTimeout(() => router.replace('/teacher-dashboard'), 1000);
      } else {
        setMessage({ type: 'error', text: 'Invalid username or password. Please try again.' });
        setLoading(false);
      }
    }, 800);
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login to Dashboard'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E3A8A', justifyContent: 'center', padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#1E3A8A', marginBottom: 4 },
  subtitle: { color: '#6B7280', marginBottom: 16 },
  demo: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8, marginBottom: 12 },
  demoTitle: { color: '#1E3A8A', fontWeight: '600', marginBottom: 4 },
  demoText: { color: '#4B5563', fontSize: 12 },
  field: { marginBottom: 12 },
  label: { color: '#374151', marginBottom: 6, fontWeight: '500' },
  input: { borderWidth: 2, borderColor: '#E5E7EB', borderRadius: 8, padding: 12 },
  button: { backgroundColor: '#10B981', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
  msg: { padding: 10, borderRadius: 6, marginBottom: 10 },
  msgError: { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5', borderWidth: 1 },
  msgSuccess: { backgroundColor: '#D1FAE5', borderColor: '#A7F3D0', borderWidth: 1 },
  msgErrorText: { color: '#DC2626' },
  msgSuccessText: { color: '#059669' },
});


