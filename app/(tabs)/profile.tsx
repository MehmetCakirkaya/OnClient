import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  const user = {
    name: 'Mehmet Çelik',
    email: 'mehmet@onclient.com',
    company: 'OnClient',
    phone: '+90 532 123 45 67',
    plan: 'Premium',
    joinDate: '15 Ocak 2024',
    customersCount: 24,
    campaignsCount: 8
  };

  const menuItems = [
    {
      title: 'Hesap Bilgileri',
      subtitle: 'Kişisel bilgilerinizi düzenleyin',
      icon: 'person',
      color: Colors.primary[500],
      onPress: () => router.push('/(modal)/account-settings')
    },
    {
      title: 'Plan & Faturalama',
      subtitle: 'Abonelik planınızı yönetin',
      icon: 'diamond',
      color: '#f59e0b',
      onPress: () => router.push('/(modal)/billing-settings')
    },
    {
      title: 'Bildirim Ayarları',
      subtitle: 'Bildirim tercihlerinizi ayarlayın',
      icon: 'notifications',
      color: Colors.primary[400],
      onPress: () => router.push('/(modal)/notification-settings')
    },
    {
      title: 'Veri & Gizlilik',
      subtitle: 'Veri kullanımı ve gizlilik ayarları',
      icon: 'shield-checkmark',
      color: Colors.success[500],
      onPress: () => console.log('Privacy settings')
    },
    {
      title: 'Yardım & Destek',
      subtitle: 'SSS, iletişim ve destek',
      icon: 'help-circle',
      color: Colors.gray[600],
      onPress: () => console.log('Help & Support')
    },
    {
      title: 'Hakkında',
      subtitle: 'Uygulama sürümü ve bilgiler',
      icon: 'information-circle',
      color: Colors.gray[500],
      onPress: () => console.log('About')
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Çıkış Yap', 
          style: 'destructive',
          onPress: () => router.replace('/(auth)/login')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.primary[100], Colors.primary[50]]}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profil</Text>
          </View>

          {/* User Info Card */}
          <View style={styles.userCard}>
            <LinearGradient
              colors={[Colors.primary[500], Colors.primary[600]]}
              style={styles.userCardGradient}
            >
              <View style={styles.userCardContent}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userInitials}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <View style={styles.planBadge}>
                    <Ionicons name="diamond" size={16} color="#f59e0b" />
                    <Text style={styles.planText}>{user.plan}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <LinearGradient
                colors={[Colors.surface, Colors.primary[50]]}
                style={styles.statGradient}
              >
                <Ionicons name="people" size={24} color={Colors.primary[600]} />
                <Text style={styles.statValue}>{user.customersCount}</Text>
                <Text style={styles.statLabel}>Müşteri</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.statItem}>
              <LinearGradient
                colors={[Colors.surface, Colors.primary[50]]}
                style={styles.statGradient}
              >
                <Ionicons name="trending-up" size={24} color={Colors.success[600]} />
                <Text style={styles.statValue}>{user.campaignsCount}</Text>
                <Text style={styles.statLabel}>Onay</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.statItem}>
              <LinearGradient
                colors={[Colors.surface, Colors.primary[50]]}
                style={styles.statGradient}
              >
                <Ionicons name="calendar" size={24} color={Colors.primary[500]} />
                <Text style={styles.statValue}>89</Text>
                <Text style={styles.statLabel}>Gün</Text>
              </LinearGradient>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={styles.menuItem}
              >
                <LinearGradient
                  colors={[Colors.surface, Colors.primary[50]]}
                  style={styles.menuItemGradient}
                >
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                  </View>
                  
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  
                  <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View style={styles.appInfoContainer}>
            <View style={styles.appInfoCard}>
              <LinearGradient
                colors={[Colors.surface, Colors.gray[50]]}
                style={styles.appInfoGradient}
              >
                <Text style={styles.appInfoTitle}>OnClient v1.0.0</Text>
                <Text style={styles.appInfoText}>
                  Meta reklam müşterilerinizi profesyonelce yönetin
                </Text>
                <Text style={styles.joinDate}>
                  Katılım tarihi: {user.joinDate}
                </Text>
              </LinearGradient>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LinearGradient
              colors={[Colors.error + '10', Colors.error + '20']}
              style={styles.logoutGradient}
            >
              <Ionicons name="log-out" size={24} color={Colors.error} />
              <Text style={styles.logoutText}>Çıkış Yap</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
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
    paddingVertical: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
  },
  userCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  userCardGradient: {
    padding: Spacing.xl,
  },
  userCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  userInitials: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.onPrimary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.onPrimary,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: Spacing.xs,
  },
  userCompany: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  planText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.onPrimary,
    marginLeft: Spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  statItem: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  statGradient: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  statValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  menuContainer: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  menuItem: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  menuItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  menuSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  appInfoContainer: {
    marginBottom: Spacing.xl,
  },
  appInfoCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  appInfoGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  appInfoTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  appInfoText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  joinDate: {
    fontSize: FontSizes.xs,
    color: Colors.text.light,
  },
  logoutButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  logoutText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.error,
    marginLeft: Spacing.md,
  },
  bottomSpacing: {
    height: Spacing.xl,
  },
}); 