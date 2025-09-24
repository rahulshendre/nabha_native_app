import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageCode = "en" | "hi" | "pa";

type Translations = Record<string, string>;

type LanguageMap = Record<LanguageCode, Translations>;

const languageContent: LanguageMap = {
  en: require("../locales/en.json"),
  hi: require("../locales/hi.json"),
  pa: require("../locales/pa.json"),
} as LanguageMap;

type I18nContextValue = {
  language: LanguageCode;
  t: (key: string) => string;
  setLanguage: (lang: LanguageCode) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("selectedLanguage");
        if (saved === "en" || saved === "hi" || saved === "pa") {
          setLanguageState(saved);
        }
      } catch {}
    })();
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    AsyncStorage.setItem("selectedLanguage", lang).catch(() => {});
    I18nManager.allowRTL(false);
  }, []);

  const t = useCallback(
    (key: string) => languageContent[language][key] ?? key,
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
