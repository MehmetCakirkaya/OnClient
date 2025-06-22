import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/Theme';

export default function NotificationSettingsScreen() {
  const router = useRouter();

  const [notificationSettings, setNotificationSettings] = useState({
    reminders: true,
    newCustomers: true,
    weeklyReports: true,
    planUpdates: true,
    emailNotifications: false,
    pushNotifications: true,
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[50]]}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.primary[600]} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bildirim Ayarları</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Notification Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bildirim Türleri</Text>
            <View style={styles.settingsCard}>
              <LinearGradient
                colors={[Colors.surface, Colors.primary[50]]}
                style={styles.settingsGradient}
              >
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.warning}20` }]}>
                      <Ionicons name="alarm" size={24} color={Colors.warning} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>Hatırlatmalar</Text>
                      <Text style={styles.settingDescription}>
                        Müşteri arama hatırlatmaları
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationSettings.reminders}
                    onValueChange={(value) => 
                      setNotificationSettings(prev => ({ ...prev, reminders: value }))
                    }
                    trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                    thumbColor={notificationSettings.reminders ? Colors.primary[500] : Colors.gray[400]}
                  />
                </View>

                <View style={styles.separator} />

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.success[500]}20` }]}>
                      <Ionicons name="person-add" size={24} color={Colors.success[500]} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>Yeni Müşteriler</Text>
                      <Text style={styles.settingDescription}>
                        Yeni müşteri kayıtları
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationSettings.newCustomers}
                    onValueChange={(value) => 
                      setNotificationSettings(prev => ({ ...prev, newCustomers: value }))
                    }
                    trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                    thumbColor={notificationSettings.newCustomers ? Colors.primary[500] : Colors.gray[400]}
                  />
                </View>

                <View style={styles.separator} />

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.info}20` }]}>
                      <Ionicons name="bar-chart" size={24} color={Colors.info} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>Haftalık Raporlar</Text>
                      <Text style={styles.settingDescription}>
                        Haftalık performans raporları
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationSettings.weeklyReports}
                    onValueChange={(value) => 
                      setNotificationSettings(prev => ({ ...prev, weeklyReports: value }))
                    }
                    trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                    thumbColor={notificationSettings.weeklyReports ? Colors.primary[500] : Colors.gray[400]}
                  />
                </View>

                <View style={styles.separator} />

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.primary[600]}20` }]}>
                      <Ionicons name="diamond" size={24} color={Colors.primary[600]} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>Plan Güncellemeleri</Text>
                      <Text style={styles.settingDescription}>
                        Abonelik ve plan bilgilendirmeleri
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationSettings.planUpdates}
                    onValueChange={(value) => 
                      setNotificationSettings(prev => ({ ...prev, planUpdates: value }))
                    }
                    trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                    thumbColor={notificationSettings.planUpdates ? Colors.primary[500] : Colors.gray[400]}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Delivery Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bildirim Şekli</Text>
            <View style={styles.settingsCard}>
              <LinearGradient
                colors={[Colors.surface, Colors.primary[50]]}
                style={styles.settingsGradient}
              >
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.secondary[500]}20` }]}>
                      <Ionicons name="phone-portrait" size={24} color={Colors.secondary[500]} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>Push Bildirimleri</Text>
                      <Text style={styles.settingDescription}>
                        Anlık telefon bildirimleri
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationSettings.pushNotifications}
                    onValueChange={(value) => 
                      setNotificationSettings(prev => ({ ...prev, pushNotifications: value }))
                    }
                    trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                    thumbColor={notificationSettings.pushNotifications ? Colors.primary[500] : Colors.gray[400]}
                  />
                </View>

                <View style={styles.separator} />

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.gray[500]}20` }]}>
                      <Ionicons name="mail" size={24} color={Colors.gray[500]} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>E-posta Bildirimleri</Text>
                      <Text style={styles.settingDescription}>
                        Önemli güncellemeler için e-posta
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationSettings.emailNotifications}
                    onValueChange={(value) => 
                      setNotificationSettings(prev => ({ ...prev, emailNotifications: value }))
                    }
                    trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                    thumbColor={notificationSettings.emailNotifications ? Colors.primary[500] : Colors.gray[400]}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton}>
            <LinearGradient
              colors={[Colors.primary[500], Colors.primary[600]]}
              style={styles.saveGradient}
            >
              <Ionicons name="checkmark" size={24} color="white" />
              <Text style={styles.saveButtonText}>Ayarları Kaydet</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
  },
  backButton: {
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
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  settingsCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  settingsGradient: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs / 2,
  },
  settingDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.primary[200],
    marginHorizontal: Spacing.md,
  },
  saveButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.md,
    marginTop: Spacing.lg,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  saveButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.onPrimary,
    marginLeft: Spacing.sm,
  },
  bottomSpacing: {
    height: Spacing.xxl,
  },
}); 