import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Settings, Hand, FileText, Volume2 } from 'lucide-react-native';
import { useAppSettings } from '@/hooks/useAppSettings';

export default function HomeScreen() {
  const { getThemeColors, getFontFamily } = useAppSettings();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  const translationOptions = [
    {
      id: 'signs-to-text',
      title: 'Señas a Texto',
      description: 'Traduce lenguaje de señas a texto',
      icon: <Hand size={32} color={colors.primary} strokeWidth={2} />,
      emoji: '👋',
    },
    {
      id: 'text-to-signs',
      title: 'Texto a Señas',
      description: 'Convierte texto en lenguaje de señas',
      icon: <FileText size={32} color={colors.success} strokeWidth={2} />,
      emoji: '📝',
    },
    {
      id: 'audio-to-signs',
      title: 'Audio a Señas',
      description: 'Traduce audio a lenguaje de señas',
      icon: <Volume2 size={32} color={colors.warning} strokeWidth={2} />,
      emoji: '🔊',
    },
  ];

  const handleTranslationPress = (type: string) => {
    router.push(`/translation/${type}`);
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.greeting, { fontFamily: fonts.bold, color: colors.text }]}>
            ¡Hola! 👋
          </Text>
          <Text style={[styles.subtitle, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            ¿Qué quieres traducir hoy?
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: colors.primary }]}
          onPress={handleSettingsPress}
        >
          <Settings size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.optionsContainer}>
          {translationOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleTranslationPress(option.id)}
            >
              <View style={styles.optionHeader}>
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                {option.icon}
              </View>
              <Text style={[styles.optionTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
                {option.title}
              </Text>
              <Text style={[styles.optionDescription, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
            💡 Consejo del día
          </Text>
          <Text style={[styles.infoText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            Practica el alfabeto en lenguaje de señas visitando nuestro diccionario visual. 
            ¡Es la mejor manera de comenzar a aprender!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    paddingVertical: 20,
    gap: 16,
  },
  optionCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionEmoji: {
    fontSize: 32,
  },
  optionTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});