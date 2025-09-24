import AsyncStorage from "@react-native-async-storage/async-storage";

export type V2Content =
  | { type: "text"; body: string }
  | { type: "image"; body: string; imageUri?: string }
  | {
      type: "quiz";
      body: string;
      quiz?: {
        question: string;
        options: string[];
        correctAnswer: number;
      }[];
    };

export type V2Lesson = {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  offlineAvailable: boolean;
  contents: V2Content[];
};

const STORE = {
  lessons: "v2_lessons_cache",
  progress: "v2_lessons_progress",
};

export async function loadBundledLessonsV2(): Promise<V2Lesson[]> {
  const data = require("../data/lessons.v2.json");
  return data as V2Lesson[];
}

export async function getLessonsV2(): Promise<V2Lesson[]> {
  const cached = await AsyncStorage.getItem(STORE.lessons);
  if (cached) {
    try {
      return JSON.parse(cached) as V2Lesson[];
    } catch {}
  }
  const lessons = await loadBundledLessonsV2();
  await AsyncStorage.setItem(STORE.lessons, JSON.stringify(lessons));
  return lessons;
}

export async function markLessonCompleted(id: string): Promise<void> {
  const raw = await AsyncStorage.getItem(STORE.progress);
  const arr = raw ? (JSON.parse(raw) as string[]) : [];
  if (!arr.includes(id)) arr.push(id);
  await AsyncStorage.setItem(STORE.progress, JSON.stringify(arr));
}

export async function getCompletedLessons(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(STORE.progress);
  return raw ? (JSON.parse(raw) as string[]) : [];
}
