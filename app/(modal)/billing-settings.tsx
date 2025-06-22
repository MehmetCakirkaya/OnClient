import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';

export default function BillingSettingsScreen() {
  const router = useRouter();

  const currentPlan = {
    name: 'Premium',
    price: '₺99',
    period: 'aylık',
    features: [
      'Sınırsız müşteri',
      'Gelişmiş raporlama',
      'Öncelikli destek',
      'API erişimi',
      'Özel entegrasyonlar'
    ],
    nextBilling: '15 Şubat 2024',
    status: 'active'
  };

  const billingAddress = {
    name: 'Mehmet Çelik',
    company: 'OnClient',
    street: 'Atatürk Caddesi No: 123',
    city: 'İstanbul',
    district: 'Kadıköy',
    postalCode: '34710',
    country: 'Türkiye'
  };

  const paymentHistory = [
    {
      id: '1',
      date: '15 Ocak 2024',
      amount: '₺99',
      status: 'paid',
      description: 'Premium Plan - Aylık Abonelik'
    },
    {
      id: '2',
      date: '15 Aralık 2023',
      amount: '₺99',
      status: 'paid',
      description: 'Premium Plan - Aylık Abonelik'
    },
    {
      id: '3',
      date: '15 Kasım 2023',
      amount: '₺99',
      status: 'paid',
      description: 'Premium Plan - Aylık Abonelik'
    },
    {
      id: '4',
      date: '15 Ekim 2023',
      amount: '₺99',
      status: 'failed',
      description: 'Premium Plan - Aylık Abonelik'
    }
  ];

  const handleCancelSubscription = () => {
    Alert.alert(
      'Aboneliği İptal Et',
      'Aboneliğinizi iptal etmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve bir sonraki faturalama döneminde hesabınız ücretsiz plana geçecektir.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        { 
          text: 'İptal Et', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Abonelik İptal Edildi',
              'Aboneliğiniz başarıyla iptal edildi. 15 Şubat 2024 tarihine kadar Premium özelliklerini kullanmaya devam edebilirsiniz.',
              [{ text: 'Tamam' }]
            );
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return Colors.success[500];
      case 'failed':
        return Colors.error;
      case 'pending':
        return '#f59e0b';
      default:
        return Colors.gray[500];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Ödendi';
      case 'failed':
        return 'Başarısız';
      case 'pending':
        return 'Bekliyor';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plan & Faturalama</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Current Plan */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mevcut Plan</Text>
            
            <View style={styles.planCard}>
              <LinearGradient
                colors={[Colors.primary[500], Colors.primary[600]]}
                style={styles.planCardGradient}
              >
                <View style={styles.planHeader}>
                  <View style={styles.planInfo}>
                    <Text style={styles.planName}>{currentPlan.name}</Text>
                    <Text style={styles.planPrice}>
                      {currentPlan.price}/{currentPlan.period}
                    </Text>
                  </View>
                  <View style={styles.planBadge}>
                    <Ionicons name="diamond" size={16} color="#f59e0b" />
                    <Text style={styles.planBadgeText}>Aktif</Text>
                  </View>
                </View>

                <View style={styles.planFeatures}>
                  {currentPlan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.surface} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.planFooter}>
                  <Text style={styles.nextBillingText}>
                    Sonraki faturalama: {currentPlan.nextBilling}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Billing Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fatura Adresi</Text>
            
            <View style={styles.card}>
              <LinearGradient
                colors={[Colors.surface, Colors.primary[100]]}
                style={styles.cardGradient}
              >
                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>{billingAddress.name}</Text>
                  <Text style={styles.addressCompany}>{billingAddress.company}</Text>
                  <Text style={styles.addressText}>{billingAddress.street}</Text>
                  <Text style={styles.addressText}>
                    {billingAddress.district}, {billingAddress.city} {billingAddress.postalCode}
                  </Text>
                  <Text style={styles.addressText}>{billingAddress.country}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => router.push('/(modal)/account-settings')}
                >
                  <Ionicons name="pencil" size={16} color={Colors.primary[600]} />
                  <Text style={styles.editButtonText}>Düzenle</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          {/* Payment History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ödeme Geçmişi</Text>
            
            <View style={styles.historyContainer}>
              {paymentHistory.map((payment) => (
                                 <View key={payment.id} style={styles.historyItem}>
                   <LinearGradient
                     colors={[Colors.surface, Colors.primary[100]]}
                     style={styles.historyItemGradient}
                  >
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyDate}>{payment.date}</Text>
                      <Text style={styles.historyDescription}>{payment.description}</Text>
                    </View>
                    
                    <View style={styles.historyRight}>
                      <Text style={styles.historyAmount}>{payment.amount}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) + '20' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(payment.status) }]}>
                          {getStatusText(payment.status)}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>

          {/* Cancel Subscription */}
          <View style={styles.section}>
            <View style={styles.dangerCard}>
              <LinearGradient
                colors={[Colors.surface, Colors.error + '10']}
                style={styles.dangerCardGradient}
              >
                <View style={styles.dangerInfo}>
                  <Ionicons name="warning" size={24} color={Colors.error} />
                  <View style={styles.dangerText}>
                    <Text style={styles.dangerTitle}>Aboneliği İptal Et</Text>
                    <Text style={styles.dangerDescription}>
                      Aboneliğinizi iptal ederseniz bir sonraki faturalama döneminde ücretsiz plana geçeceksiniz.
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity onPress={handleCancelSubscription} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>İptal Et</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    position: 'relative',
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  scrollViewContent: {
    paddingBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  planCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  planCardGradient: {
    padding: Spacing.lg,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.surface,
    marginBottom: Spacing.xs,
  },
  planPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.surface,
    opacity: 0.9,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  planBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.surface,
  },
  planFeatures: {
    marginBottom: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    gap: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.sm,
    color: Colors.surface,
    opacity: 0.9,
  },
  planFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.surface + '20',
    paddingTop: Spacing.md,
  },
  nextBillingText: {
    fontSize: FontSizes.sm,
    color: Colors.surface,
    opacity: 0.8,
    textAlign: 'center',
  },
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  cardGradient: {
    padding: Spacing.lg,
  },
  addressInfo: {
    flex: 1,
    marginBottom: Spacing.md,
  },
  addressName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  addressCompany: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  addressText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.xs,
  },
  editButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary[600],
  },
  historyContainer: {
    gap: Spacing.sm,
  },
  historyItem: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  historyItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  historyDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmount: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  dangerCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  dangerCardGradient: {
    padding: Spacing.lg,
  },
  dangerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  dangerText: {
    flex: 1,
  },
  dangerTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  dangerDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  cancelButton: {
    backgroundColor: Colors.error,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.surface,
  },
}); 