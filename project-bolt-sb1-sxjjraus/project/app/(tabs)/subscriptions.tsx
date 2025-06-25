import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Check, Star, Crown, Zap } from 'lucide-react-native';
import { useAppSettings } from '@/hooks/useAppSettings';

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Gratis',
    price: '$0',
    period: 'Siempre',
    icon: <Zap size={24} color="#10B981" strokeWidth={2} />,
    color: '#10B981',
    features: [
      'Traducción básica de señas',
      'Diccionario del alfabeto',
      '5 traducciones por día',
      'Acceso limitado al historial',
    ],
    isPopular: false,
  },
  {
    id: 'standard',
    name: 'Estándar',
    price: '$9.99',
    period: '/mes',
    icon: <Star size={24} color="#3B82F6" strokeWidth={2} />,
    color: '#3B82F6',
    features: [
      'Traducción ilimitada',
      'Historial completo',
      'Diccionario expandido',
      'Soporte por email',
      'Sin anuncios',
    ],
    isPopular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    period: '/mes',
    icon: <Crown size={24} color="#8B5CF6" strokeWidth={2} />,
    color: '#8B5CF6',
    features: [
      'Todo lo de Estándar',
      'Animaciones HD',
      'Modo offline',
      'Múltiples idiomas',
      'Soporte prioritario',
      'Funciones experimentales',
    ],
    isPopular: false,
  },
];

export default function SubscriptionsScreen() {
  const { getThemeColors, getFontFamily } = useAppSettings();
  const colors = getThemeColors();
  const fonts = getFontFamily();

  const handleSubscribe = (planId: string) => {
    console.log(`Subscribing to plan: ${planId}`);
    // Here you would integrate with RevenueCat or payment system
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { fontFamily: fonts.bold, color: colors.text }]}>
          ⭐ Suscripciones
        </Text>
        <Text style={[styles.subtitle, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
          Elige el plan perfecto para ti
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.plansContainer}>
          {subscriptionPlans.map((plan) => (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
                plan.isPopular && { borderColor: plan.color, borderWidth: 2 }
              ]}
            >
              {plan.isPopular && (
                <View style={[styles.popularBadge, { backgroundColor: plan.color }]}>
                  <Text style={[styles.popularText, { fontFamily: fonts.bold }]}>
                    MÁS POPULAR
                  </Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <View style={[styles.planIcon, { backgroundColor: plan.color + '20' }]}>
                  {plan.icon}
                </View>
                <Text style={[styles.planName, { fontFamily: fonts.bold, color: colors.text }]}>
                  {plan.name}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={[styles.price, { fontFamily: fonts.bold, color: plan.color }]}>
                    {plan.price}
                  </Text>
                  <Text style={[styles.period, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                    {plan.period}
                  </Text>
                </View>
              </View>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={16} color={plan.color} strokeWidth={2} />
                    <Text style={[styles.featureText, { fontFamily: fonts.regular, color: colors.text }]}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.subscribeButton,
                  { backgroundColor: plan.color },
                  plan.id === 'free' && { backgroundColor: 'transparent', borderWidth: 2, borderColor: plan.color }
                ]}
                onPress={() => handleSubscribe(plan.id)}
              >
                <Text style={[
                  styles.subscribeText,
                  { fontFamily: fonts.semiBold },
                  plan.id === 'free' ? { color: plan.color } : { color: '#FFFFFF' }
                ]}>
                  {plan.id === 'free' ? 'Plan Actual' : 'Suscribirse'}
                </Text>
              </TouchableOpacity>

              {plan.id !== 'free' && (
                <Text style={[styles.trialText, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
                  7 días de prueba gratuita
                </Text>
              )}
            </View>
          ))}
        </View>

        <View style={[styles.paymentInfo, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.paymentTitle, { fontFamily: fonts.semiBold, color: colors.text }]}>
            💳 Métodos de pago aceptados
          </Text>
          <Text style={[styles.paymentMethods, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            💳 Tarjetas de crédito/débito • 📱 Apple Pay • 🤖 Google Pay • 💰 PayPal
          </Text>
          <Text style={[styles.paymentNote, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
            Cancela en cualquier momento. Sin compromisos.
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
  plansContainer: {
    paddingVertical: 20,
    gap: 20,
  },
  planCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
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
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    right: 20,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 32,
  },
  period: {
    fontSize: 16,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  subscribeButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  subscribeText: {
    fontSize: 16,
  },
  trialText: {
    fontSize: 12,
    textAlign: 'center',
  },
  paymentInfo: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 20,
  },
  paymentTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  paymentMethods: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  paymentNote: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});