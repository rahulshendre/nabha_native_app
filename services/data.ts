import AsyncStorage from "@react-native-async-storage/async-storage";

type Translated = { en: string; hi: string; pa: string };
export type LessonContent =
  | { type: "text"; body: Translated }
  | { type: "image"; uri: string };

export type LessonRecord = {
  id: string;
  title: Translated;
  description: Translated;
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  offlineAvailable: boolean;
  contents: LessonContent[];
};

export type AssignmentRecord = {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // ISO
  status: "pending" | "completed";
};

const STORE = {
  lessons: "data_lessons_cache_v1",
  assignments: "data_assignments_cache_v1",
};

export async function loadBundledLessons(): Promise<LessonRecord[]> {
  const data = require("../data/lessons.json");
  return data as LessonRecord[];
}

export async function loadBundledAssignments(): Promise<AssignmentRecord[]> {
  const data = require("../data/assignments.json");
  return data as AssignmentRecord[];
}

export async function getLessons(): Promise<LessonRecord[]> {
  const cached = await AsyncStorage.getItem(STORE.lessons);
  if (cached) {
    try {
      return JSON.parse(cached) as LessonRecord[];
    } catch {}
  }
  const lessons = await loadBundledLessons();
  await AsyncStorage.setItem(STORE.lessons, JSON.stringify(lessons));
  return lessons;
}

export async function getAssignments(): Promise<AssignmentRecord[]> {
  const cached = await AsyncStorage.getItem(STORE.assignments);
  if (cached) {
    try {
      return JSON.parse(cached) as AssignmentRecord[];
    } catch {}
  }
  const assignments = await loadBundledAssignments();
  await AsyncStorage.setItem(STORE.assignments, JSON.stringify(assignments));
  return assignments;
}

export async function refreshCaches(): Promise<void> {
  const [l, a] = await Promise.all([
    loadBundledLessons(),
    loadBundledAssignments(),
  ]);
  await AsyncStorage.multiSet([
    [STORE.lessons, JSON.stringify(l)],
    [STORE.assignments, JSON.stringify(a)],
  ]);
}
