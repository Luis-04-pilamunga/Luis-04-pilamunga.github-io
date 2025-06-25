import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Palette, Type, History, Trash2 } from 'lucide-react-native';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useTranslations } from '@/hooks/useTranslations';

export default function SettingsScreen() {
  const { settings, getThemeColors, getFontFamily, updateTheme, updateFontFamily } = useAppSettings();
  const { translations, clearHistory } = useTranslations();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  const themes = [
    { key: 'light', label: 'Claro', emoji: '☀️' },
    { key: 'dark', label: 'Oscuro', emoji: '🌙' },
    { key: 'high-contrast', label: 'Alto Contraste', emoji: '🔲' },
  ];

  const fontFamilies = [
    { key: 'Inter', label: 'Inter (Recomendada)' },
    { key: 'OpenSans', label: 'Open Sans' },
    { key: 'Roboto', label: 'Roboto' },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: fonts.bold, color: colors.text }]}>
          ⚙️ Configuración
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theme Settings */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color={colors.primary} strokeWidth={2} />
            <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
              Tema y Colores
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.key}
                style={[
                  styles.option,
                  { borderColor: colors.border },
                  settings.theme === theme.key && { borderColor: colors.primary, backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => updateTheme(theme.key as any)}
              >
                <Text style={styles.optionEmoji}>{theme.emoji}</Text>
                <Text style={[styles.optionText, { fontFamily: fonts.medium, color: colors.text }]}>
                  {theme.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Font Settings */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Type size={20} color={colors.primary} strokeWidth={2} />
            <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
              Tipo de Letra
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            {fontFamilies.map((font) => (
              <TouchableOpacity
                key={font.key}
                style={[
                  styles.option,
                  { borderColor: colors.border },
                  settings.fontFamily === font.key && { borderColor: colors.primary, backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => updateFontFamily(font.key as any)}
              >
                <Text style={[styles.optionText, { fontFamily: fonts.medium, color: colors.text }]}>
                  {font.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Translation History */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <History size={20} color={colors.primary} strokeWidth={2} />
            <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
              Historial de Traducciones
            </Text>
            <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
              <Trash2 size={16} color={colors.error} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          {translations.length === 0 ? (
            <Text style={[styles.emptyText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
              No hay traducciones en el historial
            </Text>
          ) : (
            <View style={styles.historyContainer}>
              {translations.slice(0, 5).map((translation) => (
                <View key={translation.id} style={[styles.historyItem, { borderBottomColor: colors.border }]}>
                  <View style={styles.historyContent}>
                    <Text style={[styles.historyInput, { fontFamily: fonts.medium, color: colors.text }]}>
                      {translation.input}
                    </Text>
                    <Text style={[styles.historyOutput, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                      → {translation.output}
                    </Text>
                  </View>
                  <Text style={[styles.historyDate, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                    {formatDate(translation.timestamp)}
                  </Text>
                </View>
              ))}
              {translations.length > 5 && (
                <Text style={[styles.moreText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                  Y {translations.length - 5} más...
                </Text>
              )}
            </View>
          )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  optionEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  optionText: {
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  historyContainer: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  historyContent: {
    flex: 1,
    marginRight: 12,
  },
  historyInput: {
    fontSize: 14,
    marginBottom: 4,
  },
  historyOutput: {
    fontSize: 12,
  },
  historyDate: {
    fontSize: 11,
  },
  moreText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});