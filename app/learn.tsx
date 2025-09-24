import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function LearnScreen() {
  const { colors } = useTheme();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.h1, { color: colors.primary }]}>Digital Literacy Curriculum (Ages 10–15)</Text>
      <Text style={[styles.p, { color: colors.text }]}>Digital literacy means using digital technologies confidently, critically, and safely for information, communication, and problem-solving. This complete module covers beginner-friendly computer skills plus English grammar and vocabulary.</Text>

      <Text style={[styles.h2, { color: colors.primary }]}>Module Overview</Text>
      <Text style={[styles.p, { color: colors.text }]}>This literacy module is split into two main branches:</Text>
      <View style={{ marginLeft: 12 }}>
        <Text style={[styles.li, { color: colors.text }]}>• Computer Skills: Basics of computers, typing, internet safety, and essential tools.</Text>
        <Text style={[styles.li, { color: colors.text }]}>• English: Grammar & Vocabulary: Focus on grammar basics, vocabulary building, and language practice.</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Recommended learning order: Start with the overview, then do each lesson in sequence.</Text>
      </View>

      <Image source={{ uri: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80' }} style={styles.img} accessibilityLabel="Kids learning computers" />

      <Text style={[styles.h1, { color: colors.primary }]}>Part 1: Computer Skills</Text>
      <Text style={[styles.p, { color: colors.text }]}>Each lesson builds basic digital literacy, with activities and visuals.</Text>

      <Text style={[styles.h2, { color: colors.primary }]}>Lesson 1: What Is a Computer?</Text>
      <Text style={[styles.h3, { color: colors.text }]}>What is a Computer?</Text>
      <Text style={[styles.p, { color: colors.text }]}>A computer is an electronic device that stores, processes, and displays information.</Text>
      <Text style={[styles.h3, { color: colors.text }]}>Main Parts of a Computer</Text>
      <View style={{ marginLeft: 12 }}>
        <Text style={[styles.li, { color: colors.text }]}>• Monitor: The screen for displaying information.</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Keyboard: Used for typing.</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Mouse: Hand-held device to select and move.</Text>
      </View>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2014/04/02/10/47/computer-303800_960_720.png' }} style={styles.img} accessibilityLabel="Computer Parts" />
      <Text style={[styles.activity, { color: colors.accent }]}>Activity: Label each part. Discuss: Which part is used the most?</Text>

      <Text style={[styles.h2, { color: colors.primary }]}>Lesson 2: Basic Computer Operations</Text>
      <Text style={[styles.h3, { color: colors.text }]}>Operations</Text>
      <View style={{ marginLeft: 12 }}>
        <Text style={[styles.li, { color: colors.text }]}>• Turning On: Press the power button</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Logging In: Enter password when needed</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Using Programs: Find and open software like Paint or Word</Text>
      </View>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80' }} style={styles.img} accessibilityLabel="Typing on Keyboard" />
      <Text style={[styles.activity, { color: colors.accent }]}>Activity: Type your name and a hobby in WordPad or Notepad.</Text>

      <Text style={[styles.h2, { color: colors.primary }]}>Lesson 3: Internet Safety</Text>
      <Text style={[styles.h3, { color: colors.text }]}>What is the Internet?</Text>
      <Text style={[styles.p, { color: colors.text }]}>The internet helps you find, share, and communicate information.</Text>
      <Text style={[styles.h3, { color: colors.text }]}>Tips for Staying Safe Online</Text>
      <View style={{ marginLeft: 12 }}>
        <Text style={[styles.li, { color: colors.text }]}>• Use strong passwords</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Never share personal details with strangers</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Ask adults when unsure</Text>
      </View>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/10/19/05/hacker-1972289_960_720.jpg' }} style={styles.img} accessibilityLabel="Online Safety" />
      <Text style={[styles.activity, { color: colors.accent }]}>Activity: Create a poster about staying safe online.</Text>

      <Text style={[styles.h1, { color: colors.primary }]}>Part 2: English Grammar & Vocabulary</Text>
      <Text style={[styles.p, { color: colors.text }]}>Lessons in this section target English grammar basics and vocabulary for the 10–15 age group.</Text>

      <Text style={[styles.h2, { color: colors.primary }]}>Lesson 1: The Verb "To Be"</Text>
      <Text style={[styles.h3, { color: colors.text }]}>Using "To Be"</Text>
      <Text style={[styles.p, { color: colors.text }]}>Present Simple: am, is, are. Example: I am 12. She is a student. Past Simple: was, were. Example: He was happy. They were late.</Text>
      <Image source={{ uri: 'https://www.grammar.cl/Notes/Grammar_Chart_Be.png' }} style={styles.img} accessibilityLabel="Verb Usage" />
      <Text style={[styles.activity, { color: colors.accent }]}>Practice: Write five sentences about yourself using "am," "is," and "are."</Text>

      <Text style={[styles.h2, { color: colors.primary }]}>Lesson 2: Everyday Vocabulary</Text>
      <Text style={[styles.h3, { color: colors.text }]}>Common Categories</Text>
      <View style={{ marginLeft: 12 }}>
        <Text style={[styles.li, { color: colors.text }]}>• Colors: red, blue, green</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Animals: dog, cat, lion</Text>
        <Text style={[styles.li, { color: colors.text }]}>• Actions: run, eat, jump</Text>
      </View>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/31/19/05/animal-2029196_1280.png' }} style={styles.img} accessibilityLabel="Vocabulary Chart" />
      <Text style={[styles.activity, { color: colors.accent }]}>Activity: List five favorite animals and describe their colors.</Text>

      <Text style={[styles.h2, { color: colors.primary }]}>Lesson 3: Adjectives — Describing Words</Text>
      <Text style={[styles.h3, { color: colors.text }]}>What Are Adjectives?</Text>
      <Text style={[styles.p, { color: colors.text }]}>Adjectives describe nouns (people, places, things). Examples: big dog, happy child, fast car.</Text>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/31/20/37/adjectives-1297667_1280.png' }} style={styles.img} accessibilityLabel="Adjectives" />
      <Text style={[styles.activity, { color: colors.accent }]}>Practice: Describe these objects with adjectives: Ball, Apple, Book.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
  h2: { fontSize: 20, fontWeight: '700', marginTop: 16, marginBottom: 6 },
  h3: { fontSize: 16, fontWeight: '600', marginTop: 10, marginBottom: 4 },
  p: { fontSize: 14, lineHeight: 20, marginBottom: 6 },
  li: { fontSize: 14, lineHeight: 20 },
  activity: { fontSize: 14, fontWeight: '700', marginVertical: 8 },
  img: { width: '100%', height: 200, borderRadius: 8, marginVertical: 10, backgroundColor: '#E5E7EB' },
});


