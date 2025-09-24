import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageCode = 'en' | 'hi' | 'pa';

type Translations = Record<string, string>;

type LanguageMap = Record<LanguageCode, Translations>;

const languageContent: LanguageMap = {
  en: {
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-features': 'Features',
    'nav-resources': 'Resources',
    'nav-contact': 'Contact',
    'hero-title': 'Empowering Rural Students with Digital Learning in Nabha',
    'hero-subtitle': 'Bridging the digital divide through accessible, offline-first education technology',
    'hero-get-started': 'Get Started',
    'hero-learn-more': 'Learn More',
    'about-title': 'About the Project',
    'about-subtitle': 'Transforming education in rural areas through innovative digital solutions',
    'about-rural-title': 'Rural Focus',
    'about-rural-desc': 'Specifically designed for rural schools in Nabha district, addressing unique challenges of remote education.',
    'about-community-title': 'Community Driven',
    'about-community-desc': 'Built with input from local teachers, students, and community leaders to ensure relevance and usability.',
    'about-impact-title': 'Measurable Impact',
    'about-impact-desc': 'Track progress and learning outcomes with comprehensive analytics and reporting tools.',
    'features-title': 'Key Features',
    'features-subtitle': 'Designed for accessibility and effectiveness in rural settings',
    'feature-offline-title': 'Works Offline',
    'feature-offline-desc': 'Access lessons and content without internet connection, perfect for areas with limited connectivity.',
    'feature-language-title': 'Local Language Lessons',
    'feature-language-desc': 'Content available in English, Hindi, and Punjabi to ensure comprehension and cultural relevance.',
    'feature-digital-title': 'Digital Literacy for All',
    'feature-digital-desc': 'Comprehensive digital skills training for both students and teachers to bridge the technology gap.',
    'feature-teacher-title': 'Teacher Dashboard',
    'feature-teacher-desc': 'Advanced analytics and tools for teachers to monitor student progress and customize learning paths.',
    'stories-title': 'Success Stories',
    'stories-subtitle': 'Real impact from our rural education initiative',
    'story-priya-name': 'Priya Sharma',
    'story-priya-role': 'Student, Class 8',
    'story-priya-text': '"The offline lessons helped me continue studying even when our village had no internet. I can now access quality education anytime!"',
    'story-rajesh-name': 'Rajesh Kumar',
    'story-rajesh-role': 'Teacher, Nabha Primary School',
    'story-rajesh-text': '"The teacher dashboard helps me track each student\'s progress. I can now provide personalized attention to every child."',
    'story-aman-name': 'Aman Singh',
    'story-aman-role': 'Student, Class 10',
    'story-aman-text': '"Learning in Punjabi made everything so much easier to understand. I feel more confident in my studies now."',
    'announcements-title': 'Announcements',
    'announcements-subtitle': 'Latest updates and important information',
    'announcement-1-title': 'New Offline Content Available',
    'announcement-1-desc': 'Mathematics and Science modules for classes 6-10 are now available for offline download.',
    'announcement-2-title': 'Teacher Training Workshop',
    'announcement-2-desc': 'Digital literacy workshop for teachers scheduled for December 20th at Nabha District Office.',
    'announcement-3-title': 'Punjabi Language Support',
    'announcement-3-desc': 'All primary level content is now available in Punjabi language for better comprehension.',
    'footer-about': 'About Us',
    'footer-resources': 'Resources',
    'footer-government': 'Government',
    'footer-contact': 'Contact',
    'footer-copyright': '© 2024 Digital Learning Platform for Rural School Students in Nabha. Government of India Initiative.',
    'student-login-title': 'Student Login',
    'teacher-login-title': 'Teacher Login',
  },
  hi: {
    'nav-home': 'होम',
    'nav-about': 'हमारे बारे में',
    'nav-features': 'विशेषताएं',
    'nav-resources': 'संसाधन',
    'nav-contact': 'संपर्क',
    'hero-title': 'नाभा में ग्रामीण छात्रों को डिजिटल शिक्षा से सशक्त बनाना',
    'hero-subtitle': 'सुलभ, ऑफलाइन-प्रथम शिक्षा प्रौद्योगिकी के माध्यम से डिजिटल विभाजन को पाटना',
    'hero-get-started': 'शुरू करें',
    'hero-learn-more': 'और जानें',
    'about-title': 'परियोजना के बारे में',
    'about-subtitle': 'नवाचारी डिजिटल समाधानों के माध्यम से ग्रामीण क्षेत्रों में शिक्षा को बदलना',
    'about-rural-title': 'ग्रामीण फोकस',
    'about-rural-desc': 'नाभा जिले के ग्रामीण स्कूलों के लिए विशेष रूप से डिज़ाइन किया गया, दूरस्थ शिक्षा की अनूठी चुनौतियों को संबोधित करता है।',
    'about-community-title': 'समुदाय-संचालित',
    'about-community-desc': 'प्रासंगिकता और उपयोगिता सुनिश्चित करने के लिए स्थानीय शिक्षकों, छात्रों और समुदाय के नेताओं के इनपुट के साथ निर्मित।',
    'about-impact-title': 'मापनीय प्रभाव',
    'about-impact-desc': 'व्यापक विश्लेषण और रिपोर्टिंग उपकरणों के साथ प्रगति और सीखने के परिणामों को ट्रैक करें।',
    'features-title': 'मुख्य विशेषताएं',
    'features-subtitle': 'ग्रामीण सेटिंग्स में पहुंच और प्रभावशीलता के लिए डिज़ाइन किया गया',
    'feature-offline-title': 'ऑफलाइन काम करता है',
    'feature-offline-desc': 'इंटरनेट कनेक्शन के बिना पाठ और सामग्री तक पहुंचें, सीमित कनेक्टिविटी वाले क्षेत्रों के लिए आदर्श।',
    'feature-language-title': 'स्थानीय भाषा पाठ',
    'feature-language-desc': 'समझ और सांस्कृतिक प्रासंगिकता सुनिश्चित करने के लिए अंग्रेजी, हिंदी और पंजाबी में सामग्री उपलब्ध है।',
    'feature-digital-title': 'सभी के लिए डिजिटल साक्षरता',
    'feature-digital-desc': 'प्रौद्योगिकी अंतर को पाटने के लिए छात्रों और शिक्षकों दोनों के लिए व्यापक डिजिटल कौशल प्रशिक्षण।',
    'feature-teacher-title': 'शिक्षक डैशबोर्ड',
    'feature-teacher-desc': 'शिक्षकों के लिए छात्र प्रगति की निगरानी और सीखने के रास्तों को अनुकूलित करने के लिए उन्नत विश्लेषण और उपकरण।',
    'stories-title': 'सफलता की कहानियां',
    'stories-subtitle': 'हमारी ग्रामीण शिक्षा पहल से वास्तविक प्रभाव',
    'story-priya-name': 'प्रिया शर्मा',
    'story-priya-role': 'छात्रा, कक्षा 8',
    'story-priya-text': '"ऑफलाइन पाठों ने मुझे तब भी पढ़ाई जारी रखने में मदद की जब हमारे गाँव में इंटरनेट नहीं था। अब मैं कभी भी गुणवत्तापूर्ण शिक्षा तक पहुंच सकती हूं!"',
    'story-rajesh-name': 'राजेश कुमार',
    'story-rajesh-role': 'शिक्षक, नाभा प्राथमिक स्कूल',
    'story-rajesh-text': '"शिक्षक डैशबोर्ड मुझे हर छात्र की प्रगति को ट्रैक करने में मदद करता है। अब मैं हर बच्चे को व्यक्तिगत ध्यान दे सकता हूं।"',
    'story-aman-name': 'अमन सिंह',
    'story-aman-role': 'छात्र, कक्षा 10',
    'story-aman-text': '"पंजाबी में सीखना सब कुछ इतना आसान बना दिया। अब मैं अपनी पढ़ाई में अधिक आत्मविश्वास महसूस करता हूं।"',
    'announcements-title': 'घोषणाएं',
    'announcements-subtitle': 'नवीनतम अपडेट और महत्वपूर्ण जानकारी',
    'announcement-1-title': 'नई ऑफलाइन सामग्री उपलब्ध',
    'announcement-1-desc': 'कक्षा 6-10 के लिए गणित और विज्ञान मॉड्यूल अब ऑफलाइन डाउनलोड के लिए उपलब्ध हैं।',
    'announcement-2-title': 'शिक्षक प्रशिक्षण कार्यशाला',
    'announcement-2-desc': 'शिक्षकों के लिए डिजिटल साक्षरता कार्यशाला 20 दिसंबर को नाभा जिला कार्यालय में निर्धारित है।',
    'announcement-3-title': 'पंजाबी भाषा समर्थन',
    'announcement-3-desc': 'बेहतर समझ के लिए सभी प्राथमिक स्तर की सामग्री अब पंजाबी भाषा में उपलब्ध है।',
    'footer-about': 'हमारे बारे में',
    'footer-resources': 'संसाधन',
    'footer-government': 'सरकार',
    'footer-contact': 'संपर्क',
    'student-login-title': 'विद्यार्थी लॉगिन',
    'teacher-login-title': 'शिक्षक लॉगिन',
  },
  pa: {
    'nav-home': 'ਘਰ',
    'nav-about': 'ਸਾਡੇ ਬਾਰੇ',
    'nav-features': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'nav-resources': 'ਸਰੋਤ',
    'nav-contact': 'ਸੰਪਰਕ',
    'hero-title': 'ਨਾਭਾ ਵਿੱਚ ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਡਿਜੀਟਲ ਸਿੱਖਿਆ ਨਾਲ ਸਸ਼ਕਤ ਬਣਾਉਣਾ',
    'hero-subtitle': 'ਸੁਲਭ, ਆਫਲਾਈਨ-ਪਹਿਲੀ ਸਿੱਖਿਆ ਤਕਨਾਲੋਜੀ ਦੁਆਰਾ ਡਿਜੀਟਲ ਵੰਡ ਨੂੰ ਪਾਟਣਾ',
    'hero-get-started': 'ਸ਼ੁਰੂ ਕਰੋ',
    'hero-learn-more': 'ਹੋਰ ਜਾਣੋ',
    'about-title': 'ਪ੍ਰੋਜੈਕਟ ਬਾਰੇ',
    'about-subtitle': 'ਨਵੀਨਤਾਕਾਰੀ ਡਿਜੀਟਲ ਹੱਲਾਂ ਦੁਆਰਾ ਪੇਂਡੂ ਖੇਤਰਾਂ ਵਿੱਚ ਸਿੱਖਿਆ ਨੂੰ ਬਦਲਣਾ',
    'about-rural-title': 'ਪੇਂਡੂ ਫੋਕਸ',
    'about-rural-desc': 'ਨਾਭਾ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪੇਂਡੂ ਸਕੂਲਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ \'ਤੇ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ, ਦੂਰ-ਦੁਰਾਡੇ ਸਿੱਖਿਆ ਦੀਆਂ ਵਿਲੱਖਣ ਚੁਣੌਤੀਆਂ ਨੂੰ ਸੰਬੋਧਿਤ ਕਰਦਾ ਹੈ।',
    'about-community-title': 'ਕਮਿਊਨਿਟੀ-ਚਲਾਇਆ',
    'about-community-desc': 'ਪ੍ਰਸੰਗਿਕਤਾ ਅਤੇ ਉਪਯੋਗਤਾ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਸਥਾਨਕ ਅਧਿਆਪਕਾਂ, ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਕਮਿਊਨਿਟੀ ਨੇਤਾਵਾਂ ਦੇ ਇਨਪੁੱਟ ਨਾਲ ਬਣਾਇਆ ਗਿਆ।',
    'about-impact-title': 'ਮਾਪਣਯੋਗ ਪ੍ਰਭਾਵ',
    'about-impact-desc': 'ਵਿਆਪਕ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਰਿਪੋਰਟਿੰਗ ਟੂਲਾਂ ਨਾਲ ਤਰੱਕੀ ਅਤੇ ਸਿੱਖਣ ਦੇ ਨਤੀਜਿਆਂ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ।',
    'features-title': 'ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'features-subtitle': 'ਪੇਂਡੂ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਪਹੁੰਚ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ੀਲਤਾ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ',
    'feature-offline-title': 'ਆਫਲਾਈਨ ਕੰਮ ਕਰਦਾ ਹੈ',
    'feature-offline-desc': 'ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਤੋਂ ਬਿਨਾਂ ਪਾਠ ਅਤੇ ਸਮਗਰੀ ਤੱਕ ਪਹੁੰਚ, ਸੀਮਿਤ ਕਨੈਕਟੀਵਿਟੀ ਵਾਲੇ ਖੇਤਰਾਂ ਲਈ ਸੰਪੂਰਨ।',
    'feature-language-title': 'ਸਥਾਨਕ ਭਾਸ਼ਾ ਪਾਠ',
    'feature-language-desc': 'ਸਮਝ ਅਤੇ ਸੱਭਿਆਚਾਰਕ ਸੰਬੰਧਿਤਤਾ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ ਅਤੇ ਪੰਜਾਬੀ ਵਿੱਚ ਸਮਗਰੀ ਉਪਲਬਧ ਹੈ।',
    'feature-digital-title': 'ਸਭ ਲਈ ਡਿਜੀਟਲ ਸਾਖਰਤਾ',
    'feature-digital-desc': 'ਤਕਨਾਲੋਜੀ ਦੇ ਫਰਕ ਨੂੰ ਪਾਟਣ ਲਈ ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਅਧਿਆਪਕਾਂ ਦੋਵਾਂ ਲਈ ਵਿਆਪਕ ਡਿਜੀਟਲ ਹੁਨਰ ਸਿਖਲਾਈ।',
    'feature-teacher-title': 'ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ',
    'feature-teacher-desc': 'ਅਧਿਆਪਕਾਂ ਲਈ ਵਿਦਿਆਰਥੀ ਤਰੱਕੀ ਦੀ ਨਿਗਰਾਨੀ ਅਤੇ ਸਿੱਖਣ ਦੇ ਰਸਤੇ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਉਣ ਲਈ ਉੱਨਤ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਟੂਲ।',
    'stories-title': 'ਸਫਲਤਾ ਦੀਆਂ ਕਹਾਣੀਆਂ',
    'stories-subtitle': 'ਸਾਡੀ ਪੇਂਡੂ ਸਿੱਖਿਆ ਪਹਿਲ ਤੋਂ ਅਸਲ ਪ੍ਰਭਾਵ',
    'story-priya-name': 'ਪ੍ਰਿਯਾ ਸ਼ਰਮਾ',
    'story-priya-role': 'ਵਿਦਿਆਰਥੀ, ਕਲਾਸ 8',
    'story-priya-text': '"ਆਫਲਾਈਨ ਪਾਠਾਂ ਨੇ ਮੈਨੂੰ ਉਦੋਂ ਵੀ ਪੜ੍ਹਾਈ ਜਾਰੀ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕੀਤੀ ਜਦੋਂ ਸਾਡੇ ਪਿੰਡ ਵਿੱਚ ਇੰਟਰਨੈੱਟ ਨਹੀਂ ਸੀ। ਹੁਣ ਮੈਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਗੁਣਵੱਤਾਪੂਰਨ ਸਿੱਖਿਆ ਤੱਕ ਪਹੁੰਚ ਸਕਦੀ ਹਾਂ!"',
    'story-rajesh-name': 'ਰਾਜੇਸ਼ ਕੁਮਾਰ',
    'story-rajesh-role': 'ਅਧਿਆਪਕ, ਨਾਭਾ ਪ੍ਰਾਇਮਰੀ ਸਕੂਲ',
    'story-rajesh-text': '"ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ ਮੈਨੂੰ ਹਰ ਵਿਦਿਆਰਥੀ ਦੀ ਤਰੱਕੀ ਨੂੰ ਟ੍ਰੈਕ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ। ਹੁਣ ਮੈਂ ਹਰ ਬੱਚੇ ਨੂੰ ਨਿੱਜੀ ਧਿਆਨ ਦੇ ਸਕਦਾ ਹਾਂ।"',
    'story-aman-name': 'ਅਮਨ ਸਿੰਘ',
    'story-aman-role': 'ਵਿਦਿਆਰਥੀ, ਕਲਾਸ 10',
    'story-aman-text': '"ਪੰਜਾਬੀ ਵਿੱਚ ਸਿੱਖਣਾ ਸਭ ਕੁਝ ਇੰਨਾ ਆਸਾਨ ਬਣਾ ਦਿੱਤਾ। ਹੁਣ ਮੈਂ ਆਪਣੀ ਪੜ੍ਹਾਈ ਵਿੱਚ ਵਧੇਰੇ ਆਤਮਵਿਸ਼ਵਾਸ ਮਹਿਸੂਸ ਕਰਦਾ ਹਾਂ।"',
    'announcements-title': 'ਘੋਸ਼ਣਾਵਾਂ',
    'announcements-subtitle': 'ਤਾਜ਼ੇ ਅਪਡੇਟ ਅਤੇ ਮਹੱਤਵਪੂਰਨ ਜਾਣਕਾਰੀ',
    'announcement-1-title': 'ਨਵੀਂ ਆਫਲਾਈਨ ਸਮਗਰੀ ਉਪਲਬਧ',
    'announcement-1-desc': 'ਕਲਾਸ 6-10 ਲਈ ਗਣਿਤ ਅਤੇ ਵਿਗਿਆਨ ਮੋਡੀਊਲ ਹੁਣ ਆਫਲਾਈਨ ਡਾਉਨਲੋਡ ਲਈ ਉਪਲਬਧ ਹਨ।',
    'announcement-2-title': 'ਅਧਿਆਪਕ ਸਿਖਲਾਈ ਵਰਕਸ਼ਾਪ',
    'announcement-2-desc': 'ਅਧਿਆਪਕਾਂ ਲਈ ਡਿਜੀਟਲ ਸਾਖਰਤਾ ਵਰਕਸ਼ਾਪ 20 ਦਸੰਬਰ ਨੂੰ ਨਾਭਾ ਜ਼ਿਲ੍ਹਾ ਦਫਤਰ ਵਿੱਚ ਨਿਰਧਾਰਤ ਹੈ।',
    'announcement-3-title': 'ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਸਹਾਇਤਾ',
    'announcement-3-desc': 'ਬਿਹਤਰ ਸਮਝ ਲਈ ਸਾਰੀ ਪ੍ਰਾਇਮਰੀ ਪੱਧਰ ਦੀ ਸਮਗਰੀ ਹੁਣ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ ਉਪਲਬਧ ਹੈ।',
    'footer-about': 'ਸਾਡੇ ਬਾਰੇ',
    'footer-resources': 'ਸਰੋਤ',
    'footer-government': 'ਸਰਕਾਰ',
    'footer-contact': 'ਸੰਪਰਕ',
    'student-login-title': 'ਵਿਦਿਆਰਥੀ ਲੋਗਇਨ',
    'teacher-login-title': 'ਅਧਿਆਪਕ ਲੋਗਇਨ',
  },
};

type I18nContextValue = {
  language: LanguageCode;
  t: (key: string) => string;
  setLanguage: (lang: LanguageCode) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('selectedLanguage');
        if (saved === 'en' || saved === 'hi' || saved === 'pa') {
          setLanguageState(saved);
        }
      } catch {}
    })();
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    AsyncStorage.setItem('selectedLanguage', lang).catch(() => {});
    I18nManager.allowRTL(false);
  }, []);

  const t = useCallback(
    (key: string) => languageContent[language][key] ?? key,
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}


