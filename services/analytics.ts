import AsyncStorage from "@react-native-async-storage/async-storage";

export type AttendancePt = { date: string; present: boolean };
export type PerformancePt = { subject: string; score: number };
export type AnalyticsData = {
  attendance: AttendancePt[];
  performance: PerformancePt[];
  overallProgress: number;
};

const STORE = { analytics: "analytics_cache_v1" };

export async function loadBundledAnalytics(): Promise<AnalyticsData> {
  const data = require("../data/analytics.json");
  return data as AnalyticsData;
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const cached = await AsyncStorage.getItem(STORE.analytics);
  if (cached) {
    try {
      return JSON.parse(cached) as AnalyticsData;
    } catch {}
  }
  const data = await loadBundledAnalytics();
  await AsyncStorage.setItem(STORE.analytics, JSON.stringify(data));
  return data;
}
