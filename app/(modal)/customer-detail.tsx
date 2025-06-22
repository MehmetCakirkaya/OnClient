import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';

interface Notification {
  id: string;
  type: string;
  label: string;
  eventDate: Date;
  notificationDate: Date;
  reminderDuration: string;
  icon: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  campaign: string;
  status: 'interested' | 'not-interested' | 'uncertain';
  createdAt: string;
  lastContactDate?: string;
  notes: string;
  contacted: boolean;
  notifications: Notification[];
}

export default function CustomerDetailModalScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock customer data - gerçek uygulamada Redux'tan gelecek
  const [customer, setCustomer] = useState<Customer>({
    id: parseInt(id as string),
    name: 'Ayşe Kaya',
    email: 'ayse@email.com',
    phone: '+90 555 234 5678',
    campaign: 'Dijital Pazarlama',
    status: 'interested',
    createdAt: '2024-01-14',
    lastContactDate: '2024-01-16T10:30:00.000Z',
    notes: 'İlk görüşmede çok ilgili görünüyordu. Pazarlama konusunda deneyimi var.',
    contacted: true,
    notifications: [],
  });

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedNotificationType, setSelectedNotificationType] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [selectedReminderDuration, setSelectedReminderDuration] = useState('');

  const statusOptions = [
    { id: 'interested', label: 'İlgileniyor', color: Colors.success[500] },
    { id: 'not-interested', label: 'İlgilenmiyor', color: Colors.error },
    { id: 'uncertain', label: 'Belirsiz', color: Colors.gray[500] },
  ];

  const notificationTypes = [
    { id: 'call', label: 'Arama Hatırlatması', icon: 'call' },
    { id: 'email', label: 'E-posta Hatırlatması', icon: 'mail' },
    { id: 'meeting', label: 'Toplantı Hatırlatması', icon: 'calendar' },
    { id: 'follow-up', label: 'Takip Hatırlatması', icon: 'time' },
  ];

  const reminderDurations = [
    { id: '1min', label: '1 dakika önce', minutes: 1 },
    { id: '5min', label: '5 dakika önce', minutes: 5 },
    { id: '10min', label: '10 dakika önce', minutes: 10 },
    { id: '15min', label: '15 dakika önce', minutes: 15 },
    { id: '30min', label: '30 dakika önce', minutes: 30 },
    { id: '1hour', label: '1 saat önce', minutes: 60 },
    { id: '2hour', label: '2 saat önce', minutes: 120 },
    { id: '1day', label: '1 gün önce', minutes: 1440 },
    { id: '1week', label: '1 hafta önce', minutes: 10080 },
  ];

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(s => s.id === status);
    return option ? option.color : Colors.gray[500];
  };

  const getStatusLabel = (status: string) => {
    const option = statusOptions.find(s => s.id === status);
    return option ? option.label : 'Bilinmiyor';
  };

  const handlePhonePress = () => {
    Alert.alert(
      'Arama Yap',
      `${customer.name} kişisini aramak istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Ara', 
          onPress: () => Linking.openURL(`tel:${customer.phone}`)
        }
      ]
    );
  };

  const handleEmailPress = () => {
    Alert.alert(
      'E-posta Gönder',
      `${customer.name} kişisine e-posta göndermek istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'E-posta Gönder', 
          onPress: () => Linking.openURL(`mailto:${customer.email}`)
        }
      ]
    );
  };

  const handleStatusChange = (newStatus: string) => {
    setCustomer(prev => ({ ...prev, status: newStatus as any }));
    setShowStatusModal(false);
  };

  const handleContactedToggle = (value: boolean) => {
    if (!value) {
      // Switch kapatılıyorsa onay sor
      Alert.alert(
        'İletişim Durumunu Sıfırla',
        'İletişim durumunu sıfırlamak istediğinizden emin misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          { 
            text: 'Sıfırla', 
            style: 'destructive',
            onPress: () => {
              setCustomer(prev => ({ 
                ...prev, 
                contacted: false,
                lastContactDate: undefined
              }));
            }
          }
        ]
      );
    } else {
      // Switch açılıyorsa tarih ve saat ekle
      const now = new Date();
      setCustomer(prev => ({ 
        ...prev, 
        contacted: true,
        lastContactDate: now.toISOString()
      }));
    }
  };

  const handleNotificationTypeSelect = (type: string) => {
    setSelectedNotificationType(type);
    setShowNotificationModal(false);
    // Minimum 1 dakika sonra başla
    const minDate = new Date();
    minDate.setMinutes(minDate.getMinutes() + 1);
    setTempDate(minDate);
    setShowDateTimePicker(true);
  };

  const onDateTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      // Seçilen tarih şu anın en az 1 dakika sonrası olmalı
      const now = new Date();
      const minDate = new Date(now.getTime() + 60000); // 1 dakika sonra
      
      if (selectedDate < minDate) {
        setTempDate(minDate);
      } else {
        setTempDate(selectedDate);
      }
    }
  };

  const confirmEventDateTime = () => {
    setEventDate(tempDate);
    setShowDateTimePicker(false);
    setShowReminderModal(true);
  };

  const cancelDateTime = () => {
    setShowDateTimePicker(false);
    setSelectedNotificationType('');
  };

  const handleReminderSelect = (duration: string) => {
    const reminderOption = reminderDurations.find(r => r.id === duration);
    const notificationType = notificationTypes.find(n => n.id === selectedNotificationType);
    
    if (reminderOption && notificationType) {
      // Bildirim tarihini hesapla
      const notificationTime = new Date(eventDate.getTime() - (reminderOption.minutes * 60000));
      const now = new Date();
      
      // Bildirim tarihi geçmişte olamaz
      if (notificationTime <= now) {
        Alert.alert(
          'Geçersiz Bildirim Zamanı',
          `${reminderOption.label} seçeneği bu etkinlik tarihi için geçerli değil. Etkinlik tarihi çok yakın veya bildirim süresi çok uzun.`,
          [{ text: 'Tamam' }]
        );
        return;
      }
      
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: selectedNotificationType,
        label: notificationType.label,
        eventDate: eventDate,
        notificationDate: notificationTime,
        reminderDuration: reminderOption.label,
        icon: notificationType.icon,
      };
      
      setCustomer(prev => ({
        ...prev,
        notifications: [...prev.notifications, newNotification]
      }));
      
      Alert.alert(
        'Bildirim Ayarlandı',
        `${notificationType.label}\nEtkinlik: ${eventDate.toLocaleDateString('tr-TR')} ${eventDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}\nBildirim: ${reminderOption.label}`,
        [{ text: 'Tamam' }]
      );
      
      setShowReminderModal(false);
      setSelectedNotificationType('');
      setSelectedReminderDuration('');
    }
  };

  const cancelReminder = () => {
    setShowReminderModal(false);
    setSelectedNotificationType('');
    setSelectedReminderDuration('');
  };

  const handleDeleteNotification = (notificationId: string) => {
    Alert.alert(
      'Bildirimi Sil',
      'Bu bildirimi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: () => {
            setCustomer(prev => ({
              ...prev,
              notifications: prev.notifications.filter(n => n.id !== notificationId)
            }));
          }
        }
      ]
    );
  };

  const handleSave = () => {
    Alert.alert(
      'Başarılı',
      'Müşteri bilgileri güncellendi.',
      [{ text: 'Tamam' }]
    );
  };

  return (
    <LinearGradient
      colors={[Colors.background, Colors.primary[100]]}
      style={styles.container}
    >
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Müşteri Detayı</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Customer Info Card */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={[Colors.surface, Colors.primary[100]]}
            style={styles.cardGradient}
          >
            <View style={styles.customerHeader}>
              <View style={styles.customerAvatar}>
                <Text style={styles.customerInitials}>
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{customer.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(customer.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(customer.status) }]}>
                    {getStatusLabel(customer.status)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.contactInfo}>
              <TouchableOpacity onPress={handleEmailPress} style={styles.contactItem}>
                <Ionicons name="mail" size={20} color={Colors.primary[600]} />
                <Text style={styles.contactText}>{customer.email}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePhonePress} style={styles.contactItem}>
                <Ionicons name="call" size={20} color={Colors.success[600]} />
                <Text style={styles.contactText}>{customer.phone}</Text>
              </TouchableOpacity>

              <View style={styles.contactItem}>
                <Ionicons name="briefcase" size={20} color={Colors.gray[500]} />
                <Text style={styles.contactText}>{customer.campaign}</Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="calendar" size={20} color={Colors.gray[500]} />
                <Text style={styles.contactText}>
                  Kayıt: {new Date(customer.createdAt).toLocaleDateString('tr-TR')}
                </Text>
              </View>

              {customer.lastContactDate && (
                <View style={styles.contactItem}>
                  <Ionicons name="time" size={20} color={Colors.gray[500]} />
                  <Text style={styles.contactText}>
                    Son İletişim: {new Date(customer.lastContactDate).toLocaleDateString('tr-TR')} {new Date(customer.lastContactDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>

        {/* Contact Status */}
        <View style={[styles.settingsCard, { marginTop: Spacing.lg }]}>
          <LinearGradient
            colors={[Colors.surface, Colors.primary[100]]}
            style={styles.cardGradient}
          >
            <Text style={styles.sectionTitle}>İletişim Durumu</Text>
            
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchLabel}>İletişime Geçildi</Text>
                <Text style={styles.switchDescription}>
                  Bu müşteriyle iletişim kuruldu mu?
                </Text>
              </View>
              <Switch
                value={customer.contacted}
                onValueChange={handleContactedToggle}
                trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                thumbColor={customer.contacted ? Colors.primary[600] : Colors.gray[400]}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Status Selector */}
        <View style={styles.settingsCard}>
          <LinearGradient
            colors={[Colors.surface, Colors.primary[100]]}
            style={styles.cardGradient}
          >
            <Text style={styles.sectionTitle}>Müşteri Durumu</Text>
            
            <TouchableOpacity 
              onPress={() => setShowStatusModal(true)}
              style={styles.statusSelector}
            >
              <View style={styles.statusSelectorContent}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(customer.status) }]} />
                <Text style={styles.statusSelectorText}>{getStatusLabel(customer.status)}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color={Colors.gray[500]} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Notification Settings */}
        <View style={styles.settingsCard}>
          <LinearGradient
            colors={[Colors.surface, Colors.primary[100]]}
            style={styles.cardGradient}
          >
            <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
            
            <TouchableOpacity 
              onPress={() => setShowNotificationModal(true)}
              style={styles.notificationButton}
            >
              <LinearGradient
                colors={[Colors.primary[500], Colors.primary[600]]}
                style={styles.notificationButtonGradient}
              >
                <Ionicons name="notifications" size={20} color={Colors.surface} />
                <Text style={styles.notificationButtonText}>Bildirim Ayarla</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Active Notifications List */}
            {customer.notifications.length > 0 && (
              <View style={styles.notificationsList}>
                <Text style={styles.notificationsListTitle}>Aktif Bildirimler</Text>
                {customer.notifications.map((notification) => (
                  <View key={notification.id} style={styles.notificationItem}>
                    <LinearGradient
                      colors={[Colors.surface, Colors.primary[100]]}
                      style={styles.notificationItemGradient}
                    >
                      <View style={styles.notificationItemContent}>
                        <Ionicons 
                          name={notification.icon as any} 
                          size={16} 
                          color={Colors.primary[600]} 
                        />
                        <View style={styles.notificationItemInfo}>
                          <Text style={styles.notificationItemLabel}>
                            {notification.label}
                          </Text>
                          <Text style={styles.notificationItemDate}>
                            Etkinlik: {notification.eventDate.toLocaleDateString('tr-TR')} {notification.eventDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                          </Text>
                          <Text style={styles.notificationItemReminder}>
                            Bildirim: {notification.reminderDuration}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity 
                        onPress={() => handleDeleteNotification(notification.id)}
                        style={styles.notificationDeleteButton}
                      >
                        <Ionicons name="close" size={16} color={Colors.error} />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                ))}
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Notes Section */}
        <View style={styles.notesCard}>
          <LinearGradient
            colors={[Colors.surface, Colors.primary[100]]}
            style={styles.cardGradient}
          >
            <Text style={styles.sectionTitle}>Notlar</Text>
            
            <TextInput
              style={styles.notesInput}
              placeholder="Müşteri hakkında notlarınızı buraya yazın..."
              placeholderTextColor={Colors.gray[400]}
              value={customer.notes}
              onChangeText={(text) => setCustomer(prev => ({ ...prev, notes: text }))}
              multiline
              textAlignVertical="top"
            />
          </LinearGradient>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Geri</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <LinearGradient
              colors={[Colors.primary[500], Colors.primary[600]]}
              style={styles.saveButtonGradient}
            >
              <Ionicons name="checkmark" size={20} color={Colors.surface} />
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Status Modal */}
      {showStatusModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Müşteri Durumu Seçin</Text>
            
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleStatusChange(option.id)}
                style={styles.modalOption}
              >
                <View style={[styles.statusDot, { backgroundColor: option.color }]} />
                <Text style={styles.modalOptionText}>{option.label}</Text>
                {customer.status === option.id && (
                  <Ionicons name="checkmark" size={20} color={Colors.primary[600]} />
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              onPress={() => setShowStatusModal(false)}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalCancelText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Notification Type Modal */}
      {showNotificationModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Bildirim Türü Seçin</Text>
            
            {notificationTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => handleNotificationTypeSelect(type.id)}
                style={styles.modalOption}
              >
                <Ionicons name={type.icon as any} size={20} color={Colors.primary[600]} />
                <Text style={styles.modalOptionText}>{type.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              onPress={() => setShowNotificationModal(false)}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalCancelText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Date Time Picker Modal */}
      {showDateTimePicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.modalTitle}>
              {notificationTypes.find(n => n.id === selectedNotificationType)?.label} Tarihi
            </Text>
            
            <DateTimePicker
              value={tempDate}
              mode="datetime"
              display="spinner"
              onChange={onDateTimeChange}
              style={styles.datePicker}
              textColor={Colors.text.primary}
              minimumDate={new Date(Date.now() + 60000)} // Minimum 1 dakika sonra
            />
            
            <View style={styles.datePickerButtons}>
              <TouchableOpacity onPress={cancelDateTime} style={styles.datePickerCancelButton}>
                <Text style={styles.datePickerCancelText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmEventDateTime} style={styles.datePickerConfirmButton}>
                <LinearGradient
                  colors={[Colors.primary[500], Colors.primary[600]]}
                  style={styles.datePickerConfirmGradient}
                >
                  <Text style={styles.datePickerConfirmText}>Devam</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Reminder Duration Modal */}
      {showReminderModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Bildirim Zamanını Seçin</Text>
            <Text style={styles.modalSubtitle}>
              Etkinlik: {eventDate.toLocaleDateString('tr-TR')} {eventDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            
            {reminderDurations.map((duration) => (
              <TouchableOpacity
                key={duration.id}
                onPress={() => handleReminderSelect(duration.id)}
                style={styles.modalOption}
              >
                <Ionicons name="time" size={20} color={Colors.primary[600]} />
                <Text style={styles.modalOptionText}>{duration.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              onPress={cancelReminder}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalCancelText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
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
  infoCard: {
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  settingsCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  notesCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  cardGradient: {
    padding: Spacing.lg,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
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
  customerInfo: {
    flex: 1,
  },
  customerName: {
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
  contactInfo: {
    gap: Spacing.sm,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  contactText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchInfo: {
    flex: 1,
  },
  switchLabel: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  switchDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  statusSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
  },
  statusSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusSelectorText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  notificationButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  notificationButtonGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  notificationButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.surface,
  },
  notesInput: {
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    height: 120,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  saveButton: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  saveButtonGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  saveButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.surface,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    minWidth: 300,
    ...Shadows.lg,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    gap: Spacing.sm,
  },
  modalOptionText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    flex: 1,
  },
  modalCancelButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
  },
  datePickerContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: Spacing.lg,
    minWidth: 300,
    ...Shadows.lg,
  },
  datePicker: {
    backgroundColor: Colors.surface,
    color: Colors.text.primary,
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  datePickerCancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  datePickerCancelText: {
    fontSize: FontSizes.base,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  datePickerConfirmButton: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  datePickerConfirmGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  datePickerConfirmText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.surface,
  },
  notificationsList: {
    marginTop: Spacing.lg,
  },
  notificationsListTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  notificationItem: {
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  notificationItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  notificationItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm,
  },
  notificationItemInfo: {
    flex: 1,
  },
  notificationItemLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  notificationItemDate: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.xs / 2,
  },
  notificationDeleteButton: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.error + '20',
  },
  notificationItemReminder: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.xs / 2,
  },
  modalSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
}); 