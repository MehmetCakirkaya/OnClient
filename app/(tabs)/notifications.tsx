import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/Theme';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'reminder' | 'customer' | 'system';
  read: boolean;
  createdAt: string;
  customerName?: string;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Müşteri Hatırlatması',
      message: 'Ahmet Yılmaz için planladığınız arama zamanı geldi.',
      type: 'reminder',
      read: false,
      createdAt: '2024-01-16T10:00:00Z',
      customerName: 'Ahmet Yılmaz',
    },
    {
      id: 2,
      title: 'Yeni Müşteri',
      message: 'Meta reklamınızdan yeni bir müşteri kaydı alındı.',
      type: 'customer',
      read: false,
      createdAt: '2024-01-16T09:30:00Z',
      customerName: 'Zeynep Acar',
    },
    {
      id: 3,
      title: 'Haftalık Rapor',
      message: 'Bu hafta 5 yeni müşteri kaydınız var. Raporları inceleyin.',
      type: 'system',
      read: true,
      createdAt: '2024-01-15T08:00:00Z',
    },
    {
      id: 4,
      title: 'Plan Hatırlatması',
      message: 'Premium planınızın süresi 3 gün sonra sona eriyor.',
      type: 'system',
      read: false,
      createdAt: '2024-01-14T12:00:00Z',
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    reminders: true,
    newCustomers: true,
    weeklyReports: true,
    planUpdates: true,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return { name: 'alarm', color: Colors.warning };
      case 'customer':
        return { name: 'person-add', color: Colors.success[500] };
      case 'system':
        return { name: 'information-circle', color: Colors.info };
      default:
        return { name: 'notifications', color: Colors.gray[500] };
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} saat önce`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} gün önce`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[50]]}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Bildirimler</Text>
              {unreadCount > 0 && (
                <Text style={styles.headerSubtitle}>
                  {unreadCount} okunmamış bildirim
                </Text>
              )}
            </View>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
                <LinearGradient
                  colors={[Colors.primary[500], Colors.primary[600]]}
                  style={styles.markAllGradient}
                >
                  <Text style={styles.markAllButtonText}>Tümünü Okundu İşaretle</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/* Notification Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
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

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.info}20` }]}>
                      <Ionicons name="bar-chart" size={24} color={Colors.info} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>Haftalık Raporlar</Text>
                      <Text style={styles.settingDescription}>
                        Haftalık özet raporları
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

                <View style={[styles.settingItem, styles.lastSettingItem]}>
                  <View style={styles.settingInfo}>
                    <View style={[styles.settingIcon, { backgroundColor: `${Colors.primary[500]}20` }]}>
                      <Ionicons name="diamond" size={24} color={Colors.primary[500]} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>Plan Güncellemeleri</Text>
                      <Text style={styles.settingDescription}>
                        Abonelik ve plan bildirimleri
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

          {/* Notifications List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Son Bildirimler</Text>
            
            {notifications.length === 0 ? (
              <View style={styles.emptyCard}>
                <LinearGradient
                  colors={[Colors.surface, Colors.gray[50]]}
                  style={styles.emptyGradient}
                >
                  <Ionicons name="notifications-outline" size={64} color={Colors.gray[400]} />
                  <Text style={styles.emptyTitle}>Bildirim yok</Text>
                  <Text style={styles.emptyDescription}>
                    Yeni bildirimlerin burada görünecek
                  </Text>
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.notificationsList}>
                {notifications.map((notification) => {
                  const iconData = getNotificationIcon(notification.type);
                  return (
                    <TouchableOpacity
                      key={notification.id}
                      onPress={() => markAsRead(notification.id)}
                      style={styles.notificationCard}
                    >
                      <LinearGradient
                        colors={[
                          Colors.surface, 
                          notification.read ? Colors.gray[50] : Colors.primary[50]
                        ]}
                        style={styles.notificationGradient}
                      >
                        <View style={styles.notificationHeader}>
                          <View style={[
                            styles.notificationIcon, 
                            { backgroundColor: `${iconData.color}20` }
                          ]}>
                            <Ionicons 
                              name={iconData.name as any} 
                              size={20} 
                              color={iconData.color} 
                            />
                          </View>
                          
                          <View style={styles.notificationContent}>
                            <View style={styles.notificationTitleRow}>
                              <Text style={[
                                styles.notificationTitle,
                                { fontWeight: notification.read ? '500' : '600' }
                              ]}>
                                {notification.title}
                              </Text>
                              {!notification.read && (
                                <View style={styles.unreadDot} />
                              )}
                            </View>
                            
                            <Text style={[
                              styles.notificationMessage,
                              { color: notification.read ? Colors.text.secondary : Colors.text.primary }
                            ]}>
                              {notification.message}
                            </Text>
                            
                            {notification.customerName && (
                              <View style={styles.customerTag}>
                                <Ionicons name="person" size={12} color={Colors.primary[600]} />
                                <Text style={styles.customerName}>
                                  {notification.customerName}
                                </Text>
                              </View>
                            )}
                            
                            <Text style={styles.notificationTime}>
                              {formatTime(notification.createdAt)}
                            </Text>
                          </View>

                          <View style={styles.notificationActions}>
                            <TouchableOpacity 
                              onPress={() => deleteNotification(notification.id)}
                              style={styles.deleteButton}
                            >
                              <Ionicons name="trash-outline" size={18} color={Colors.error} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  markAllButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  markAllGradient: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  markAllButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.onPrimary,
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
    padding: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    marginBottom: Spacing.xs,
  },
  settingDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  emptyCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  emptyGradient: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  notificationsList: {
    gap: Spacing.md,
  },
  notificationCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  notificationGradient: {
    padding: Spacing.lg,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  notificationTitle: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[500],
    marginLeft: Spacing.sm,
  },
  notificationMessage: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  customerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  customerName: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.primary[700],
    marginLeft: Spacing.xs,
  },
  notificationTime: {
    fontSize: FontSizes.xs,
    color: Colors.text.light,
  },
  notificationActions: {
    marginLeft: Spacing.sm,
  },
  deleteButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.error + '10',
    borderRadius: BorderRadius.sm,
  },
}); 