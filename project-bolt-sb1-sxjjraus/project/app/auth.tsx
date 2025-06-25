import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useAppSettings } from '@/hooks/useAppSettings';

export default function AuthScreen() {
  const { getThemeColors, getFontFamily } = useAppSettings();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  const handleGoogleSignIn = () => {
    // Simulate Google sign in
    router.replace('/(tabs)');
  };

  const handleGuestMode = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.logo, { fontFamily: fonts.bold, color: colors.text }]}>
            👋 SignaApp
          </Text>
          <Text style={[styles.subtitle, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            Bienvenido a tu traductor de lenguaje de señas
          </Text>
        </View>

        <View style={styles.authSection}>
          <TouchableOpacity
            style={[styles.googleButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={handleGoogleSignIn}
          >
            <Text style={[styles.googleButtonText, { fontFamily: fonts.semiBold, color: colors.text }]}>
              🔐 Iniciar sesión con Google
            </Text>
          </TouchableOpacity>

          <Text style={[styles.securityText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            🔒 Tu información está segura con nosotros
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleGuestMode}>
            <Text style={[styles.guestText, { fontFamily: fonts.medium, color: colors.primary }]}>
              Continuar como invitado
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  authSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButtonText: {
    fontSize: 18,
  },
  securityText: {
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  guestText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});