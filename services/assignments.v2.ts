import AsyncStorage from "@react-native-async-storage/async-storage";

export type V2Assignment = {
  id: string;
  title: string;
  subject: "Mathematics" | "Science" | "English" | "Computer Science";
  dueDate: string; // ISO
  description: string;
  completed: boolean;
};

const STORE = {
  assignments: "v2_assignments_cache",
};

export async function loadBundledAssignmentsV2(): Promise<V2Assignment[]> {
  const data = require("../data/assignments.v2.json");
  return data as V2Assignment[];
}

export async function getAssignmentsV2(): Promise<V2Assignment[]> {
  const cached = await AsyncStorage.getItem(STORE.assignments);
  if (cached) {
    try {
      return JSON.parse(cached) as V2Assignment[];
    } catch {}
  }
  const items = await loadBundledAssignmentsV2();
  await AsyncStorage.setItem(STORE.assignments, JSON.stringify(items));
  return items;
}

export async function setAssignmentCompleted(
  id: string,
  done: boolean,
): Promise<void> {
  const items = await getAssignmentsV2();
  const updated = items.map((a) =>
    a.id === id ? { ...a, completed: done } : a,
  );
  await AsyncStorage.setItem(STORE.assignments, JSON.stringify(updated));
}
