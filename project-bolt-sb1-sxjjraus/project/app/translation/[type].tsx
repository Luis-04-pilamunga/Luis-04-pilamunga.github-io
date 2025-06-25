import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Camera, Mic, Save, Play, Pause } from 'lucide-react-native';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useTranslations } from '@/hooks/useTranslations';

export default function TranslationScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { getThemeColors, getFontFamily } = useAppSettings();
  const { addTranslation } = useTranslations();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const getScreenConfig = () => {
    switch (type) {
      case 'signs-to-text':
        return {
          title: '👋 Señas a Texto',
          description: 'Usa la cámara para traducir señas',
          primaryAction: 'Iniciar Cámara',
          icon: <Camera size={24} color="#FFFFFF" strokeWidth={2} />,
        };
      case 'text-to-signs':
        return {
          title: '📝 Texto a Señas',
          description: 'Escribe texto para ver las señas',
          primaryAction: 'Traducir',
          icon: <Play size={24} color="#FFFFFF" strokeWidth={2} />,
        };
      case 'audio-to-signs':
        return {
          title: '🔊 Audio a Señas',
          description: 'Habla para traducir a señas',
          primaryAction: isRecording ? 'Detener' : 'Grabar',
          icon: <Mic size={24} color="#FFFFFF" strokeWidth={2} />,
        };
      default:
        return {
          title: 'Traducción',
          description: 'Traductor de lenguaje de señas',
          primaryAction: 'Traducir',
          icon: <Play size={24} color="#FFFFFF" strokeWidth={2} />,
        };
    }
  };

  const config = getScreenConfig();

  const handlePrimaryAction = async () => {
    if (type === 'audio-to-signs') {
      setIsRecording(!isRecording);
      if (!isRecording) {
        // Simulate recording
        setTimeout(() => {
          setInputText('Hola, ¿cómo estás?');
          setTranslatedText('Señas de saludo y pregunta');
          setIsRecording(false);
        }, 3000);
      }
    } else if (type === 'text-to-signs') {
      if (inputText.trim()) {
        setIsTranslating(true);
        // Simulate translation
        setTimeout(() => {
          setTranslatedText(`Señas para: "${inputText}"`);
          setIsTranslating(false);
        }, 2000);
      }
    } else if (type === 'signs-to-text') {
      // Simulate camera translation
      setIsTranslating(true);
      setTimeout(() => {
        setTranslatedText('Hola, me llamo María');
        setIsTranslating(false);
      }, 3000);
    }
  };

  const handleSaveTranslation = () => {
    if (inputText && translatedText) {
      addTranslation({
        type: type as any,
        input: inputText,
        output: translatedText,
      });
      // Show success feedback
      alert('Traducción guardada en el historial');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { fontFamily: fonts.bold, color: colors.text }]}>
            {config.title}
          </Text>
          <Text style={[styles.description, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            {config.description}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Input Section */}
        {type === 'text-to-signs' && (
          <View style={[styles.inputSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
              Escribe tu texto
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.background, 
                borderColor: colors.border,
                color: colors.text,
                fontFamily: fonts.regular,
              }]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escribe aquí lo que quieres traducir..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {/* Camera/Recording Section */}
        {(type === 'signs-to-text' || type === 'audio-to-signs') && (
          <View style={[styles.cameraSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.cameraPreview, { backgroundColor: colors.background }]}>
              {type === 'signs-to-text' ? (
                <View style={styles.cameraPlaceholder}>
                  <Camera size={48} color={colors.textSecondary} strokeWidth={2} />
                  <Text style={[styles.placeholderText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                    {isTranslating ? 'Analizando señas...' : 'Cámara lista para capturar señas'}
                  </Text>
                </View>
              ) : (
                <View style={styles.audioPlaceholder}>
                  <Mic size={48} color={isRecording ? colors.error : colors.textSecondary} strokeWidth={2} />
                  <Text style={[styles.placeholderText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                    {isRecording ? 'Grabando audio...' : 'Toca para comenzar a grabar'}
                  </Text>
                  {isRecording && (
                    <View style={styles.recordingIndicator}>
                      <View style={[styles.recordingDot, { backgroundColor: colors.error }]} />
                      <Text style={[styles.recordingText, { fontFamily: fonts.medium, color: colors.error }]}>
                        REC
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Translation Output */}
        {translatedText && (
          <View style={[styles.outputSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
              Traducción
            </Text>
            <View style={[styles.translationBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={[styles.translationText, { fontFamily: fonts.regular, color: colors.text }]}>
                {translatedText}
              </Text>
            </View>
            {type === 'text-to-signs' && (
              <View style={[styles.animationPlaceholder, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Play size={32} color={colors.primary} strokeWidth={2} />
                <Text style={[styles.animationText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                  Animación de señas aparecería aquí
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={handlePrimaryAction}
            disabled={isTranslating}
          >
            {config.icon}
            <Text style={[styles.primaryButtonText, { fontFamily: fonts.semiBold }]}>
              {isTranslating ? 'Traduciendo...' : config.primaryAction}
            </Text>
          </TouchableOpacity>

          {translatedText && (
            <TouchableOpacity
              style={[styles.secondaryButton, { backgroundColor: colors.success }]}
              onPress={handleSaveTranslation}
            >
              <Save size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={[styles.secondaryButtonText, { fontFamily: fonts.medium }]}>
                Guardar Traducción
              </Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputSection: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  cameraSection: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginVertical: 16,
  },
  cameraPreview: {
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    alignItems: 'center',
    gap: 12,
  },
  audioPlaceholder: {
    alignItems: 'center',
    gap: 12,
  },
  placeholderText: {
    fontSize: 14,
    textAlign: 'center',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recordingText: {
    fontSize: 12,
  },
  outputSection: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginVertical: 16,
  },
  translationBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  animationPlaceholder: {
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  animationText: {
    fontSize: 14,
    textAlign: 'center',
  },
  actionsContainer: {
    gap: 12,
    paddingVertical: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});