import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';

export default function RemindersScreen() {
  const router = useRouter();

  const reminders = [
    {
      id: '1',
      customerId: '1',
      customerName: 'Ahmet Yılmaz',
      customerCompany: 'Teknoloji A.Ş.',
      type: 'call',
      title: 'Arama hatırlatıcısı',
      description: 'Müşteri ile görüşme planlandı',
      eventDate: '2024-01-20T14:30:00',
      reminderTime: '15 dakika önce',
      status: 'upcoming',
      createdAt: '2024-01-15T10:00:00'
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'Ayşe Demir',
      customerCompany: 'Pazarlama Ltd.',
      type: 'email',
      title: 'E-posta hatırlatıcısı',
      description: 'Teklif gönderilecek',
      eventDate: '2024-01-21T09:00:00',
      reminderTime: '1 saat önce',
      status: 'upcoming',
      createdAt: '2024-01-16T15:30:00'
    },
    {
      id: '3',
      customerId: '3',
      customerName: 'Mehmet Kaya',
      customerCompany: 'Satış Corp.',
      type: 'meeting',
      title: 'Toplantı hatırlatıcısı',
      description: 'Proje sunumu yapılacak',
      eventDate: '2024-01-19T16:00:00',
      reminderTime: '30 dakika önce',
      status: 'completed',
      createdAt: '2024-01-14T11:15:00'
    },
    {
      id: '4',
      customerId: '1',
      customerName: 'Ahmet Yılmaz',
      customerCompany: 'Teknoloji A.Ş.',
      type: 'follow-up',
      title: 'Takip hatırlatıcısı',
      description: 'Müşteri geri dönüşü bekleniyor',
      eventDate: '2024-01-22T11:00:00',
      reminderTime: '1 gün önce',
      status: 'upcoming',
      createdAt: '2024-01-17T09:20:00'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return 'call';
      case 'email':
        return 'mail';
      case 'meeting':
        return 'people';
      case 'follow-up':
        return 'refresh';
      default:
        return 'notifications';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call':
        return Colors.primary[500];
      case 'email':
        return Colors.info;
      case 'meeting':
        return Colors.success[500];
      case 'follow-up':
        return '#f59e0b';
      default:
        return Colors.gray[500];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return Colors.primary[500];
      case 'completed':
        return Colors.success[500];
      case 'missed':
        return Colors.error;
      default:
        return Colors.gray[500];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Yaklaşan';
      case 'completed':
        return 'Tamamlandı';
      case 'missed':
        return 'Kaçırıldı';
      default:
        return 'Bilinmiyor';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Bugün';
    } else if (diffDays === 2) {
      return 'Yarın';
    } else if (diffDays <= 7) {
      return `${diffDays} gün sonra`;
    } else {
      return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <Text style={styles.headerTitle}>Hatırlatıcılar</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Reminders List */}
          <View style={styles.remindersList}>
            {reminders.map((reminder) => (
              <TouchableOpacity
                key={reminder.id}
                style={styles.reminderCard}
                onPress={() => router.push(`/(modal)/customer-detail?id=${reminder.customerId}` as any)}
              >
                <LinearGradient
                  colors={[Colors.surface, Colors.primary[100]]}
                  style={styles.reminderCardGradient}
                >
                  <View style={styles.reminderHeader}>
                    <View style={styles.customerInfo}>
                      <View style={styles.customerAvatar}>
                        <Text style={styles.customerInitials}>
                          {reminder.customerName.split(' ').map(n => n[0]).join('')}
                        </Text>
                      </View>
                      
                      <View style={styles.customerDetails}>
                        <Text style={styles.customerName}>{reminder.customerName}</Text>
                        <Text style={styles.customerCompany}>{reminder.customerCompany}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.statusContainer}>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(reminder.status) + '20' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(reminder.status) }]}>
                          {getStatusText(reminder.status)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.reminderContent}>
                    <View style={styles.reminderInfo}>
                      <View style={styles.typeContainer}>
                        <View style={[styles.typeIcon, { backgroundColor: getTypeColor(reminder.type) + '20' }]}>
                          <Ionicons 
                            name={getTypeIcon(reminder.type) as any} 
                            size={20} 
                            color={getTypeColor(reminder.type)} 
                          />
                        </View>
                        <View style={styles.reminderText}>
                          <Text style={styles.reminderTitle}>{reminder.title}</Text>
                          <Text style={styles.reminderDescription}>{reminder.description}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.reminderTiming}>
                      <View style={styles.timingRow}>
                        <Ionicons name="calendar" size={16} color={Colors.text.secondary} />
                        <Text style={styles.timingText}>
                          {formatDate(reminder.eventDate)} - {formatTime(reminder.eventDate)}
                        </Text>
                      </View>
                      
                      <View style={styles.timingRow}>
                        <Ionicons name="alarm" size={16} color={Colors.text.secondary} />
                        <Text style={styles.timingText}>
                          {reminder.reminderTime} hatırlatılacak
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {reminders.length === 0 && (
            <View style={styles.emptyState}>
              <LinearGradient
                colors={[Colors.surface, Colors.primary[100]]}
                style={styles.emptyStateGradient}
              >
                <Ionicons name="alarm-outline" size={64} color={Colors.gray[400]} />
                <Text style={styles.emptyStateTitle}>Henüz hatırlatıcı yok</Text>
                <Text style={styles.emptyStateText}>
                  Müşteri detay sayfalarından hatırlatıcı oluşturabilirsiniz
                </Text>
              </LinearGradient>
            </View>
          )}
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
  remindersList: {
    gap: Spacing.md,
  },
  reminderCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  reminderCardGradient: {
    padding: Spacing.lg,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    color: Colors.surface,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  customerDetails: {
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
  },
  statusContainer: {
    alignItems: 'flex-end',
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
  reminderContent: {
    gap: Spacing.md,
  },
  reminderInfo: {
    marginBottom: Spacing.sm,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  reminderText: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  reminderDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  reminderTiming: {
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  timingText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  emptyState: {
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  emptyStateGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyStateText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 