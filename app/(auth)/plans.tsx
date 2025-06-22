import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/Theme';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanData {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
  gradient: [string, string];
  iconName: string;
}

export default function PlansScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const plans: PlanData[] = [
    {
      id: 'free',
      name: 'Ücretsiz Plan',
      price: '₺0',
      period: '/ay',
      description: 'Başlamak için ideal',
      gradient: [Colors.gray[400], Colors.gray[500]],
      iconName: 'gift-outline',
      features: [
        { text: 'En fazla 3 müşteri', included: true },
        { text: 'Temel müşteri yönetimi', included: true },
        { text: 'Durum takibi', included: true },
        { text: 'Temel raporlar', included: true },
        { text: 'Not ekleme', included: false },
        { text: 'Bildirimler', included: false },
        { text: 'Sınırsız müşteri', included: false },
        { text: 'Meta API entegrasyonu', included: false },
        { text: 'Premium destek', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '₺99',
      period: '/ay',
      description: 'Profesyonel kullanım için',
      recommended: true,
      gradient: [Colors.primary[500], Colors.primary[600]],
      iconName: 'diamond',
      features: [
        { text: 'Sınırsız müşteri', included: true },
        { text: 'Gelişmiş müşteri yönetimi', included: true },
        { text: 'Not ekleme özelliği', included: true },
        { text: 'Hatırlatma bildirimleri', included: true },
        { text: 'Detaylı raporlar', included: true },
        { text: 'Meta API entegrasyonu', included: true },
        { text: 'Tarih bazlı filtreleme', included: true },
        { text: '7/24 premium destek', included: true },
        { text: 'Öncelikli güncellemeler', included: true },
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      Alert.alert(
        'Ücretsiz Plan',
        'Ücretsiz plan ile devam etmek istediğinizden emin misiniz? Daha sonra Premium plana geçiş yapabilirsiniz.',
        [
          { text: 'İptal', style: 'cancel' },
          { 
            text: 'Devam Et', 
            onPress: () => router.replace('/(auth)/register')
          },
        ]
      );
    } else {
      Alert.alert(
        'Premium Plan',
        'Premium plana kayıt olmak istediğinizden emin misiniz? 7 gün ücretsiz deneme süreciniz başlayacak.',
        [
          { text: 'İptal', style: 'cancel' },
          { 
            text: 'Premium ile Kayıt Ol', 
            onPress: () => router.replace('/(auth)/register')
          },
        ]
      );
    }
  };

  const PlanCard = ({ plan }: { plan: PlanData }) => (
    <View style={[styles.planCard, plan.recommended && styles.recommendedCard]}>
      {plan.recommended && (
        <View style={styles.recommendedBadge}>
          <LinearGradient
            colors={[Colors.warning, '#f59e0b']}
            style={styles.recommendedGradient}
          >
            <Ionicons name="star" size={12} color={Colors.surface} />
            <Text style={styles.recommendedText}>ÖNERİLEN</Text>
          </LinearGradient>
        </View>
      )}
      
      <LinearGradient
        colors={[Colors.surface, Colors.primary[50]]}
        style={[
          styles.planGradient,
          plan.recommended && styles.recommendedBorder
        ]}
      >
        {/* Plan Header */}
        <View style={styles.planHeader}>
          <View style={styles.planIconContainer}>
            <LinearGradient
              colors={plan.gradient}
              style={styles.planIconGradient}
            >
              <Ionicons 
                name={plan.iconName as any} 
                size={32} 
                color={Colors.surface} 
              />
            </LinearGradient>
          </View>
          
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{plan.price}</Text>
            <Text style={styles.period}>{plan.period}</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[
                styles.featureIcon,
                { backgroundColor: feature.included ? Colors.success[100] : Colors.gray[100] }
              ]}>
                <Ionicons 
                  name={feature.included ? 'checkmark' : 'close'} 
                  size={12} 
                  color={feature.included ? Colors.success[600] : Colors.error} 
                />
              </View>
              <Text style={[
                styles.featureText,
                { color: feature.included ? Colors.text.primary : Colors.text.light }
              ]}>
                {feature.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Select Button */}
        <TouchableOpacity
          onPress={() => handleSelectPlan(plan.id)}
          style={styles.selectButton}
        >
          <LinearGradient
            colors={plan.gradient}
            style={styles.selectButtonGradient}
          >
            <Text style={styles.selectButtonText}>
              {plan.id === 'free' ? 'Ücretsiz Başla' : '7 Gün Ücretsiz Dene'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {plan.id === 'premium' && (
          <Text style={styles.trialText}>
            İlk 7 gün ücretsiz, sonrasında aylık ₺99
          </Text>
        )}
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100], Colors.primary[200]]}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <View style={styles.backButtonInner}>
                <Ionicons name="arrow-back" size={24} color={Colors.primary[600]} />
              </View>
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Plan Seçin</Text>
              <Text style={styles.headerSubtitle}>
                İhtiyacınıza uygun planı seçin ve müşteri yönetimine başlayın
              </Text>
            </View>
          </View>

          {/* Plans */}
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            <LinearGradient
              colors={[Colors.surface + 'CC', Colors.primary[50] + 'CC']}
              style={styles.bottomInfoGradient}
            >
              <View style={styles.infoItem}>
                <Ionicons name="shield-checkmark" size={20} color={Colors.success[500]} />
                <Text style={styles.infoText}>7 gün ücretsiz deneme</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="card" size={20} color={Colors.primary[500]} />
                <Text style={styles.infoText}>İstediğiniz zaman iptal edin</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="headset" size={20} color={Colors.info} />
                <Text style={styles.infoText}>7/24 müşteri desteği</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Security Info */}
          <View style={styles.securityInfo}>
            <Ionicons name="lock-closed" size={16} color={Colors.text.secondary} />
            <Text style={styles.securityText}>
              Tüm ödemeler SSL ile güvenli şekilde işlenir
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: Spacing.md,
    zIndex: 10,
  },
  backButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface + 'CC',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  headerTitle: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    lineHeight: 22,
  },
  planCard: {
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  recommendedCard: {
    marginTop: Spacing.md,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 10,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    ...Shadows.md,
  },
  recommendedGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  recommendedText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.surface,
    letterSpacing: 0.5,
  },
  planGradient: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.lg,
  },
  recommendedBorder: {
    borderWidth: 2,
    borderColor: Colors.warning + '40',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  planIconContainer: {
    marginBottom: Spacing.md,
  },
  planIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  planName: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  planDescription: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: FontSizes['4xl'],
    fontWeight: '800',
    color: Colors.text.primary,
  },
  period: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  featuresContainer: {
    marginBottom: Spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  featureText: {
    fontSize: FontSizes.base,
    flex: 1,
    lineHeight: 20,
  },
  selectButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  selectButtonGradient: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.surface,
  },
  trialText: {
    textAlign: 'center',
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  bottomInfo: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  bottomInfoGradient: {
    padding: Spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
    fontWeight: '500',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  securityText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
    textAlign: 'center',
  },
}); 