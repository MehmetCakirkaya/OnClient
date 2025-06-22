import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    {
      id: 5,
      title: 'Kampanya Performansı',
      message: 'Bu ayki reklam kampanyanız hedefi %120 oranında aştı.',
      type: 'system',
      read: false,
      createdAt: '2024-01-13T15:30:00Z',
    },
    {
      id: 6,
      title: 'Müşteri Geri Bildirimi',
      message: 'Ayşe Demir sizin için 5 yıldız değerlendirme bıraktı.',
      type: 'customer',
      read: true,
      createdAt: '2024-01-12T11:20:00Z',
      customerName: 'Ayşe Demir',
    },
  ]);

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
    Alert.alert(
      'Bildirimi Sil',
      'Bu bildirimi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => prev.filter(notification => notification.id !== id));
          }
        }
      ]
    );
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

          {/* Empty State */}
          {notifications.length === 0 && (
            <View style={styles.emptyState}>
              <LinearGradient
                colors={[Colors.surface, Colors.surface]}
                style={styles.emptyStateGradient}
              >
                <View style={styles.emptyIcon}>
                  <Ionicons name="notifications-off" size={48} color={Colors.gray[400]} />
                </View>
                <Text style={styles.emptyTitle}>Henüz bildiriminiz yok</Text>
                <Text style={styles.emptyDescription}>
                  Yeni müşteriler, hatırlatmalar ve sistem güncellemeleri burada görünecek.
                </Text>
              </LinearGradient>
            </View>
          )}

          {/* Notifications List */}
          <View style={styles.notificationsList}>
            {notifications.map((notification) => {
              const iconInfo = getNotificationIcon(notification.type);
              return (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => !notification.read && markAsRead(notification.id)}
                  style={styles.notificationCard}
                >
                  <LinearGradient
                    colors={[Colors.surface, Colors.surface]}
                    style={styles.notificationGradient}
                  >
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <View style={[
                          styles.notificationIcon,
                          { backgroundColor: `${iconInfo.color}20` }
                        ]}>
                          <Ionicons 
                            name={iconInfo.name as any} 
                            size={24} 
                            color={iconInfo.color} 
                          />
                        </View>
                        
                        <View style={styles.notificationInfo}>
                          <Text style={[
                            styles.notificationTitle,
                            { fontWeight: notification.read ? '500' : '700' }
                          ]}>
                            {notification.title}
                          </Text>
                          <Text style={styles.notificationTime}>
                            {formatTime(notification.createdAt)}
                          </Text>
                        </View>

                        <View style={styles.notificationActions}>
                          {!notification.read && (
                            <View style={styles.unreadDot} />
                          )}
                          <TouchableOpacity
                            onPress={() => deleteNotification(notification.id)}
                            style={styles.deleteButton}
                          >
                            <Ionicons name="trash-outline" size={20} color={Colors.error} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text style={[
                        styles.notificationMessage,
                        { color: notification.read ? Colors.text.secondary : Colors.text.primary }
                      ]}>
                        {notification.message}
                      </Text>

                      {notification.customerName && (
                        <View style={styles.customerTag}>
                          <Ionicons name="person" size={16} color={Colors.primary[600]} />
                          <Text style={styles.customerTagText}>
                            {notification.customerName}
                          </Text>
                        </View>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: Spacing.xs / 2,
  },
  markAllButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  markAllGradient: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  markAllButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.onPrimary,
  },
  emptyState: {
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  emptyStateGradient: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  emptyIcon: {
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  notificationsList: {
    marginTop: Spacing.md,
  },
  notificationCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  notificationGradient: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  notificationContent: {
    padding: Spacing.md,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    marginBottom: Spacing.xs / 2,
  },
  notificationTime: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  notificationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary[500],
    marginRight: Spacing.sm,
  },
  deleteButton: {
    padding: Spacing.xs,
    backgroundColor: Colors.error + '10',
    borderRadius: BorderRadius.sm,
  },
  notificationMessage: {
    fontSize: FontSizes.base,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  customerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  customerTagText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.primary[700],
    marginLeft: Spacing.xs / 2,
  },
  bottomSpacing: {
    height: Spacing.xxl,
  },
}); 