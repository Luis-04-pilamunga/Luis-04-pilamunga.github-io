import { Tabs } from 'expo-router';
import { Chrome as Home, Book, Star } from 'lucide-react-native';
import { useAppSettings } from '@/hooks/useAppSettings';

export default function TabLayout() {
  const { getThemeColors, getFontFamily } = useAppSettings();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 12,
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Diccionario',
          tabBarIcon: ({ size, color }) => (
            <Book size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: 'Suscripciones',
          tabBarIcon: ({ size, color }) => (
            <Star size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}