import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAppSettings } from '@/hooks/useAppSettings';

export default function SplashScreen() {
  const { getThemeColors, getFontFamily } = useAppSettings();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary, '#6366F1', '#8B5CF6']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
            }}
            style={styles.handImage}
          />
          <View style={styles.logoOverlay}>
            <Text style={[styles.handEmoji, { fontFamily: fonts.bold }]}>👋</Text>
          </View>
        </View>
        
        <Text style={[styles.appName, { fontFamily: fonts.bold }]}>
          SignaApp
        </Text>
        
        <Text style={[styles.tagline, { fontFamily: fonts.regular }]}>
          Conectando mundos a través de las señas
        </Text>
        
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <View style={styles.loadingProgress} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  handImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.3,
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handEmoji: {
    fontSize: 60,
  },
  appName: {
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 60,
  },
  loadingContainer: {
    width: 200,
  },
  loadingBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});