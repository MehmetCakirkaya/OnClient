import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  
  const stats = [
    { 
      title: 'Toplam Müşteri', 
      value: '24', 
      icon: 'people', 
      color: Colors.primary[500],
      change: '+12%',
      changeType: 'positive'
    },
    { 
      title: 'Aktif Kampanya', 
      value: '8', 
      icon: 'trending-up', 
      color: Colors.success[500],
      change: '+3',
      changeType: 'positive'
    },
    { 
      title: 'Bekleyen Görev', 
      value: '5', 
      icon: 'time', 
      color: Colors.warning,
      change: '-2',
      changeType: 'negative'
    },
    { 
      title: 'Bu Ay Gelir', 
      value: '₺12.5K', 
      icon: 'wallet', 
      color: Colors.primary[600],
      change: '+8%',
      changeType: 'positive'
    },
  ];

  const quickActions = [
    { title: 'Yeni Müşteri Oluştur', icon: 'person-add', color: Colors.primary[500], onPress: () => console.log('Yeni Müşteri') },
    { title: 'Kampanya Oluştur', icon: 'megaphone', color: Colors.success[500], onPress: () => console.log('Kampanya') },
    { title: 'Rapor Al', icon: 'document-text', color: Colors.info, onPress: () => console.log('Rapor') },
    { title: 'Hatırlatıcı', icon: 'alarm', color: '#f59e0b', onPress: () => router.push('/(modal)/reminders') },
  ];

  const recentCustomers = [
    { id: '1', name: 'Ahmet Yılmaz', company: 'Teknoloji A.Ş.', status: 'active', lastContact: '2 saat önce' },
    { id: '2', name: 'Ayşe Demir', company: 'Pazarlama Ltd.', status: 'pending', lastContact: '1 gün önce' },
    { id: '3', name: 'Mehmet Kaya', company: 'Satış Corp.', status: 'active', lastContact: '3 gün önce' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[50]]}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Hoş Geldiniz 👋</Text>
              <Text style={styles.headerTitle}>OnClient Dashboard</Text>
            </View>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push('/(tabs)/notifications')}
            >
              <Ionicons name="notifications" size={24} color={Colors.primary[600]} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Genel Durum</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.statCardGradient}
                  >
                    <View style={styles.statHeader}>
                      <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                        <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                      </View>
                      <View style={[
                        styles.changeIndicator,
                        { backgroundColor: stat.changeType === 'positive' ? Colors.success[50] : Colors.error + '20' }
                      ]}>
                        <Text style={[
                          styles.changeText,
                          { color: stat.changeType === 'positive' ? Colors.success[600] : Colors.error }
                        ]}>
                          {stat.change}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statTitle}>{stat.title}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Hızlı Eylemler</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.quickActionCard}
                  onPress={action.onPress}
                >
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.quickActionGradient}
                  >
                    <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                      <Ionicons name={action.icon as any} size={28} color={action.color} />
                    </View>
                    <Text style={styles.quickActionTitle}>{action.title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Customers */}
          <View style={styles.recentContainer}>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>Son Müşteriler</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/customers')}>
                <Text style={styles.viewAllText}>Tümünü Gör</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recentList}>
              {recentCustomers.map((customer, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.customerCard}
                  onPress={() => router.push(`/(modal)/customer-detail?id=${customer.id}` as any)}
                >
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.customerCardGradient}
                  >
                    <View style={styles.customerAvatar}>
                      <Text style={styles.customerInitials}>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <View style={styles.customerInfo}>
                      <Text style={styles.customerName}>{customer.name}</Text>
                      <Text style={styles.customerCompany}>{customer.company}</Text>
                      <Text style={styles.customerLastContact}>{customer.lastContact}</Text>
                    </View>
                    <View style={styles.customerStatus}>
                      <View style={[
                        styles.statusDot,
                        { backgroundColor: customer.status === 'active' ? Colors.success[500] : Colors.warning }
                      ]} />
                      <Text style={[
                        styles.statusText,
                        { color: customer.status === 'active' ? Colors.success[600] : Colors.warning }
                      ]}>
                        {customer.status === 'active' ? 'Aktif' : 'Bekliyor'}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  scrollViewContent: {
    paddingBottom: Spacing.tabBarHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  welcomeText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
  },
  notificationButton: {
    position: 'relative',
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: Colors.text.onPrimary,
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  statCardGradient: {
    padding: Spacing.lg,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeIndicator: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  changeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  statValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  quickActionsContainer: {
    marginBottom: Spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  quickActionGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  quickActionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
  },
  recentContainer: {
    marginBottom: Spacing.xl,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  viewAllText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
    fontWeight: '600',
  },
  recentList: {
    gap: Spacing.md,
  },
  customerCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  customerCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  customerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  customerInitials: {
    color: Colors.text.onPrimary,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  customerCompany: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  customerLastContact: {
    fontSize: FontSizes.xs,
    color: Colors.text.light,
  },
  customerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
});
