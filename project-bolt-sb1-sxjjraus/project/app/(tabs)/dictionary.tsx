import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAppSettings } from '@/hooks/useAppSettings';

const alphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

// Simulated sign language images from Pexels
const getSignImage = (letter: string) => {
  const images = {
    'A': 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'B': 'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'C': 'https://images.pexels.com/photos/7551669/pexels-photo-7551669.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  };
  return images[letter as keyof typeof images] || 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2';
};

export default function DictionaryScreen() {
  const { getThemeColors, getFontFamily } = useAppSettings();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { fontFamily: fonts.bold, color: colors.text }]}>
          📖 Diccionario Visual
        </Text>
        <Text style={[styles.subtitle, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
          Alfabeto en lenguaje de señas
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alphabetGrid}>
          {alphabet.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={[styles.letterCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Image
                source={{ uri: getSignImage(letter) }}
                style={styles.signImage}
              />
              <View style={[styles.letterBadge, { backgroundColor: colors.primary }]}>
                <Text style={[styles.letterText, { fontFamily: fonts.bold }]}>
                  {letter}
                </Text>
              </View>
              <Text style={[styles.letterLabel, { fontFamily: fonts.medium, color: colors.text }]}>
                Letra {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.infoSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
            ℹ️ Cómo usar el diccionario
          </Text>
          <Text style={[styles.infoText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            • Toca cualquier letra para ver la seña en detalle{'\n'}
            • Practica formando las letras con tus manos{'\n'}
            • Combina letras para formar palabras{'\n'}
            • ¡La práctica hace al maestro!
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
    gap: 12,
  },
  letterCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signImage: {
    width: '80%',
    height: '60%',
    borderRadius: 8,
    marginBottom: 8,
  },
  letterBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  letterLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});