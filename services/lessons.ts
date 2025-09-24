import AsyncStorage from "@react-native-async-storage/async-storage";

export type Lesson = {
  id: string;
  subject: string;
  title: string;
  content: string;
  language: "en" | "hi" | "pa";
};

const STORAGE_KEY = "cached_lessons_v1";

// Mock fetch, replace with network API later
export async function fetchLessons(): Promise<Lesson[]> {
  await sleep(300);
  return [
    {
      id: "l1",
      subject: "Mathematics",
      title: "Algebra Basics",
      content: "Intro to variables and equations...",
      language: "en",
    },
    {
      id: "l2",
      subject: "Science",
      title: "Photosynthesis",
      content: "Plants convert sunlight...",
      language: "en",
    },
  ];
}

export async function cacheLessons(lessons: Lesson[]): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ts: Date.now(), lessons }),
  );
}

export async function getCachedLessons(): Promise<Lesson[] | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { ts: number; lessons: Lesson[] };
    return parsed.lessons;
  } catch {
    return null;
  }
}

export async function ensureLessonsCached(): Promise<Lesson[]> {
  const cached = await getCachedLessons();
  if (cached && cached.length) return cached;
  const fresh = await fetchLessons();
  await cacheLessons(fresh);
  return fresh;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
