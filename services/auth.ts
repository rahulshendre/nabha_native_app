import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'student' | 'teacher';
export type AuthUser = { id: string; name: string; role: UserRole };

const STORAGE_TOKEN_KEY = 'auth_token';
const STORAGE_USER_KEY = 'auth_user';

// Mock auth provider; swap with Firebase/Auth API later
const mockUsers: Record<string, { password: string; user: AuthUser }> = {
  'student123': { password: 'password123', user: { id: 's1', name: 'Priya Sharma', role: 'student' } },
  'teacher123': { password: 'password123', user: { id: 't1', name: 'Rajesh Kumar', role: 'teacher' } },
};

export async function signIn(username: string, password: string): Promise<AuthUser> {
  const record = mockUsers[username];
  await delay(300);
  if (!record || record.password !== password) throw new Error('Invalid credentials');
  const token = `mock-token-${record.user.id}-${Date.now()}`;
  await AsyncStorage.multiSet([[STORAGE_TOKEN_KEY, token], [STORAGE_USER_KEY, JSON.stringify(record.user)]]);
  return record.user;
}

export async function signOut(): Promise<void> {
  await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const val = await AsyncStorage.getItem(STORAGE_USER_KEY);
  return val ? JSON.parse(val) as AuthUser : null;
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}


