// @ts-nocheck
export const unstable_settings = {
  headerShown: false,
  title: '',
};

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Theme';

export default function ProfileScreen() {
  const { id, type } = useLocalSearchParams();
  const router = useRouter();
  const [showListingFilters, setShowListingFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fiyat doğrulama fonksiyonu
  const validatePriceRange = () => {
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      
      if (min > max) {
        const message = 'Minimum fiyat maksimum fiyattan fazla olamaz';
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
          Alert.alert('Uyarı', message);
        }
        setMinPrice('');
        setMaxPrice('');
      }
    }
  };

  // Mock data - gerçek uygulamada API'den gelecek
  const getProfileData = () => {
    if (type === 'team') {
      // Team member data
      const teamMembers = {
        '1': {
          id: '1',
          name: 'Ahmet Yılmaz',
          role: 'Emlak Danışmanı',
          email: 'ahmet@company.com',
          phone: '+90 532 123 45 67',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          department: 'Satış Departmanı',
          experience: '5 yıl',
          specialization: 'Lüks Konutlar',
          activeListings: 12,
          soldListings: 45,
          totalSales: '₺15.2M',
          rating: 4.8,
          joinDate: '2019-03-15',
          bio: 'Emlak sektöründe 5 yıllık deneyime sahip. Özellikle lüks konut segmentinde uzmanlaşmış durumda.',
          achievements: [
            'Ayın Emlak Danışmanı (3 kez)',
            'En Yüksek Satış Performansı 2023',
            'Müşteri Memnuniyeti Ödülü'
          ],
          languages: ['Türkçe', 'İngilizce', 'Almanca'],
          workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
          isOnline: true,
          lastSeen: new Date(),
        },
        '2': {
          id: '2',
          name: 'Fatma Kaya',
          role: 'Satış Müdürü',
          email: 'fatma@company.com',
          phone: '+90 532 987 65 43',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          department: 'Satış Departmanı',
          experience: '8 yıl',
          specialization: 'Ticari Gayrimenkul',
          activeListings: 8,
          soldListings: 78,
          totalSales: '₺28.5M',
          rating: 4.9,
          joinDate: '2016-01-10',
          bio: 'Ticari gayrimenkul alanında uzman. Şirketimizin en deneyimli satış müdürlerinden biri.',
          achievements: [
            'Yılın Satış Müdürü 2022',
            'En Yüksek Ciro Ödülü',
            'Liderlik Ödülü'
          ],
          languages: ['Türkçe', 'İngilizce'],
          workingHours: 'Pazartesi - Cumartesi: 08:00 - 19:00',
          isOnline: false,
          lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 saat önce
        }
      };
      return teamMembers[id as string];
    } else {
      // Customer data
      const customers = {
        '1': {
          id: '1',
          name: 'Mehmet Demir',
          role: 'Müşteri',
          email: 'mehmet@email.com',
          phone: '+90 532 555 44 33',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          status: 'interested',
          budget: '₺1.5M - ₺2.5M',
          preferredLocation: 'Beşiktaş, Şişli',
          propertyType: 'Villa, Daire',
          registrationDate: '2024-01-15',
          lastContact: '2024-01-20',
          totalInquiries: 8,
          viewedProperties: 15,
          notes: 'Deniz manzaralı özellikler arıyor. Bütçesi esnek.',
          interests: ['Lüks Konutlar', 'Deniz Manzarası', 'Güvenlikli Siteler'],
          contactHistory: [
            { date: '2024-01-20', type: 'call', note: 'Villa görüşmesi yapıldı' },
            { date: '2024-01-18', type: 'email', note: 'Yeni ilanlar gönderildi' },
            { date: '2024-01-15', type: 'meeting', note: 'İlk görüşme' }
          ],
          assignedAgent: 'Ahmet Yılmaz',
          source: 'Website',
          priority: 'high'
        }
      };
      return customers[id as string];
    }
  };

  const profileData = getProfileData();

  if (!profileData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Profil bulunamadı</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    Alert.alert(
      'Arama Yap',
      `${profileData.name} kişisini aramak istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Ara', 
          onPress: () => Linking.openURL(`tel:${profileData.phone}`)
        }
      ]
    );
  };

  const handleEmail = () => {
    Alert.alert(
      'E-posta Gönder',
      `${profileData.name} kişisine e-posta göndermek istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'E-posta Gönder', 
          onPress: () => Linking.openURL(`mailto:${profileData.email}`)
        }
      ]
    );
  };

  const handleMessage = () => {
    Alert.alert('Mesaj', 'Mesajlaşma özelliği yakında aktif olacak.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interested': return Colors.success[500];
      case 'not-interested': return Colors.error;
      case 'uncertain': return Colors.gray[500];
      default: return Colors.primary[500];
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'interested': return 'İlgileniyor';
      case 'not-interested': return 'İlgilenmiyor';
      case 'uncertain': return 'Belirsiz';
      default: return 'Aktif';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{profileData.name}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <LinearGradient
              colors={[Colors.surface, Colors.surface]}
              style={styles.profileHeaderGradient}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
                {type === 'team' && profileData.isOnline && (
                  <View style={styles.onlineIndicator} />
                )}
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={styles.profileRole}>{profileData.role}</Text>
                
                {type === 'team' && profileData.department && (
                  <Text style={styles.profileDepartment}>{profileData.department}</Text>
                )}
                
                {type === 'customer' && (
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(profileData.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(profileData.status) }]}>
                      {getStatusLabel(profileData.status)}
                    </Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          </View>

          {/* Contact Info */}
          <View style={styles.infoCard}>
            <LinearGradient
              colors={[Colors.surface, Colors.surface]}
              style={styles.cardGradient}
            >
              <Text style={styles.sectionTitle}>İletişim Bilgileri</Text>
              
              <TouchableOpacity onPress={handleEmail} style={styles.contactItem}>
                <Ionicons name="mail" size={20} color={Colors.primary[600]} />
                <Text style={styles.contactText}>{profileData.email}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCall} style={styles.contactItem}>
                <Ionicons name="call" size={20} color={Colors.success[600]} />
                <Text style={styles.contactText}>{profileData.phone}</Text>
              </TouchableOpacity>

              {type === 'team' && profileData.workingHours && (
                <View style={styles.contactItem}>
                  <Ionicons name="time" size={20} color={Colors.gray[500]} />
                  <Text style={styles.contactText}>{profileData.workingHours}</Text>
                </View>
              )}
            </LinearGradient>
          </View>

          {/* Stats/Details */}
          {type === 'team' ? (
            <View style={styles.statsCard}>
              <LinearGradient
                colors={[Colors.surface, Colors.surface]}
                style={styles.cardGradient}
              >
                <Text style={styles.sectionTitle}>İstatistikler</Text>
                
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{profileData.activeListings}</Text>
                    <Text style={styles.statLabel}>Aktif İlan</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{profileData.soldListings}</Text>
                    <Text style={styles.statLabel}>Satılan</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{profileData.totalSales}</Text>
                    <Text style={styles.statLabel}>Toplam Satış</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{profileData.rating}</Text>
                    <Text style={styles.statLabel}>Puan</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.detailsCard}>
              <LinearGradient
                colors={[Colors.surface, Colors.surface]}
                style={styles.cardGradient}
              >
                <Text style={styles.sectionTitle}>Müşteri Detayları</Text>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Bütçe</Text>
                  <Text style={styles.detailValue}>{profileData.budget}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Tercih Edilen Bölge</Text>
                  <Text style={styles.detailValue}>{profileData.preferredLocation}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Mülk Tipi</Text>
                  <Text style={styles.detailValue}>{profileData.propertyType}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Kayıt Tarihi</Text>
                  <Text style={styles.detailValue}>
                    {new Date(profileData.registrationDate).toLocaleDateString('tr-TR')}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Bio/Notes */}
          <View style={styles.bioCard}>
            <LinearGradient
              colors={[Colors.surface, Colors.surface]}
              style={styles.cardGradient}
            >
              <Text style={styles.sectionTitle}>
                {type === 'team' ? 'Hakkında' : 'Notlar'}
              </Text>
              <Text style={styles.bioText}>
                {type === 'team' ? profileData.bio : profileData.notes}
              </Text>
            </LinearGradient>
          </View>

          {type === 'customer' && profileData.interests && (
            <View style={styles.interestsCard}>
              <LinearGradient
                colors={[Colors.surface, Colors.surface]}
                style={styles.cardGradient}
              >
                <Text style={styles.sectionTitle}>İlgi Alanları</Text>
                <View style={styles.interestsContainer}>
                  {profileData.interests.map((interest, index) => (
                    <View key={index} style={styles.interestTag}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Employee Listings - Only for team members */}
          {type === 'team' && (
            <View>
              <Text style={styles.listingsSectionTitle}>İlanlar</Text>
              <View style={styles.listingsCard}>
                <LinearGradient
                  colors={[Colors.surface, Colors.surface]}
                  style={styles.cardGradient}
                >
                  <View style={styles.listingsHeader}>
                    <View style={styles.searchContainer}>
                      <Ionicons name="search" size={20} color={Colors.text.secondary} />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="İlan ara..."
                        placeholderTextColor={Colors.text.secondary}
                      />
                    </View>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setShowListingFilters(true)}>
                      <Ionicons name="filter" size={20} color={Colors.text.primary} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.listingsContainer}>
                    {/* Mock listings for the employee */}
                    {profileData.activeListings > 0 && [1, 2, 3, 4].slice(0, Math.min(profileData.activeListings, 4)).map((_, index) => (
                      <TouchableOpacity key={index} style={styles.listingCard} onPress={() => router.push(`/listing/${index + 1}`)}>
                        <Image 
                          source={{ uri: `https://images.unsplash.com/photo-156401379991${9 + index}-ab600027ffc6?w=120&h=80&fit=crop` }} 
                          style={styles.listingImage} 
                        />
                        <View style={styles.listingInfo}>
                          <Text style={styles.listingTitle} numberOfLines={1}>
                            {index === 0 ? 'Lüks Villa - Deniz Manzaralı' : index === 1 ? 'Modern Daire - Merkezi Konum' : index === 2 ? 'Bahçeli Ev - Sakin Bölge' : 'Penthouse - Şehir Manzarası'}
                          </Text>
                          <View style={styles.listingDetails}>
                            <View style={styles.listingDetailItem}>
                              <Ionicons name="location-outline" size={14} color={Colors.text.secondary} />
                              <Text style={styles.listingLocation} numberOfLines={1}>
                                {index === 0 ? 'Beşiktaş, İstanbul' : index === 1 ? 'Kadıköy, İstanbul' : index === 2 ? 'Üsküdar, İstanbul' : 'Şişli, İstanbul'}
                              </Text>
                            </View>
                            <View style={styles.listingDetailItem}>
                              <Ionicons name="resize-outline" size={14} color={Colors.text.secondary} />
                              <Text style={styles.listingArea}>
                                {index === 0 ? '250 m²' : index === 1 ? '120 m²' : index === 2 ? '180 m²' : '300 m²'}
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.listingPrice}>
                            {index === 0 ? '₺2.500.000' : index === 1 ? '₺850.000' : index === 2 ? '₺1.200.000' : '₺3.200.000'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                  {profileData.activeListings > 4 && (
                    <TouchableOpacity style={styles.seeAllButton}>
                      <Text style={styles.seeAllText}>Tümünü Gör ({profileData.activeListings})</Text>
                      <Ionicons name="chevron-forward" size={16} color={Colors.primary[600]} />
                    </TouchableOpacity>
                  )}
                </LinearGradient>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={handleCall} style={styles.callButton}>
              <LinearGradient
                colors={[Colors.success[500], Colors.success[600]]}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="call" size={20} color={Colors.surface} />
                <Text style={styles.actionButtonText}>Ara</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleMessage} style={styles.messageButton}>
              <LinearGradient
                colors={[Colors.primary[500], Colors.primary[600]]}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="chatbubble" size={20} color={Colors.surface} />
                <Text style={styles.actionButtonText}>Mesaj</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Listing Filters Modal */}
        <Modal
          visible={showListingFilters}
          transparent
          animationType="slide"
          onRequestClose={() => setShowListingFilters(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>İlan Filtreleri</Text>
                <TouchableOpacity onPress={() => setShowListingFilters(false)}>
                  <Ionicons name="close" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Status */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Durum</Text>
                  <View style={styles.filterOptions}>
                    {['Aktif', 'Satıldı', 'Kiralandı', 'Pasif'].map((status) => (
                      <TouchableOpacity 
                        key={status} 
                        style={[
                          styles.filterOption,
                          selectedStatus.includes(status) && styles.filterOptionSelected
                        ]}
                        onPress={() => {
                          if (selectedStatus.includes(status)) {
                            setSelectedStatus(selectedStatus.filter(s => s !== status));
                          } else {
                            setSelectedStatus([...selectedStatus, status]);
                          }
                        }}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedStatus.includes(status) && styles.filterOptionTextSelected
                        ]}>
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Property Type */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Mülk Tipi</Text>
                  <View style={styles.filterOptions}>
                    {['Villa', 'Daire', 'Ev', 'Penthouse'].map((type) => (
                      <TouchableOpacity 
                        key={type} 
                        style={[
                          styles.filterOption,
                          selectedPropertyType.includes(type) && styles.filterOptionSelected
                        ]}
                        onPress={() => {
                          if (selectedPropertyType.includes(type)) {
                            setSelectedPropertyType(selectedPropertyType.filter(t => t !== type));
                          } else {
                            setSelectedPropertyType([...selectedPropertyType, type]);
                          }
                        }}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedPropertyType.includes(type) && styles.filterOptionTextSelected
                        ]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Room Count */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Oda Sayısı</Text>
                  <View style={styles.filterOptions}>
                    {['1+0', '1+1', '2+1', '3+1', '4+1', '5+1'].map((rooms) => (
                      <TouchableOpacity 
                        key={rooms} 
                        style={[
                          styles.filterOption,
                          selectedRooms.includes(rooms) && styles.filterOptionSelected
                        ]}
                        onPress={() => {
                          if (selectedRooms.includes(rooms)) {
                            setSelectedRooms(selectedRooms.filter(r => r !== rooms));
                          } else {
                            setSelectedRooms([...selectedRooms, rooms]);
                          }
                        }}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedRooms.includes(rooms) && styles.filterOptionTextSelected
                        ]}>
                          {rooms}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                                  {/* Price Range */}
                  <View style={styles.filterSection}>
                    <Text style={styles.filterSectionTitle}>Fiyat Aralığı</Text>
                    
                    {/* Currency Selection */}
                    <View style={styles.currencySelectContainer}>
                      <Text style={styles.currencyLabel}>Para Birimi</Text>
                      <TouchableOpacity 
                        style={styles.dropdownButton}
                        onPress={() => setShowCurrencyOptions(!showCurrencyOptions)}
                      >
                        <Text style={[
                          styles.dropdownButtonText,
                          !selectedCurrency && styles.dropdownPlaceholder
                        ]}>
                          {selectedCurrency === 'USD' && 'USD ($)'}
                          {selectedCurrency === 'TL' && 'TL (₺)'}
                          {selectedCurrency === 'EUR' && 'EUR (€)'}
                          {selectedCurrency === 'GBP' && 'GBP (£)'}
                        </Text>
                        <Ionicons 
                          name={showCurrencyOptions ? "chevron-up" : "chevron-down"} 
                          size={20} 
                          color={Colors.text.secondary} 
                        />
                      </TouchableOpacity>
                      
                      {showCurrencyOptions && (
                        <View style={styles.dropdownList}>
                          {[
                            { label: 'USD ($)', value: 'USD' },
                            { label: 'TL (₺)', value: 'TL' },
                            { label: 'EUR (€)', value: 'EUR' },
                            { label: 'GBP (£)', value: 'GBP' }
                          ].map((option) => (
                            <TouchableOpacity
                              key={option.value}
                              style={styles.dropdownItem}
                              onPress={() => {
                                setSelectedCurrency(option.value);
                                setShowCurrencyOptions(false);
                              }}
                            >
                              <Text style={styles.dropdownItemText}>{option.label}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>

                    <View style={styles.rangeInputContainer}>
                      <TextInput 
                        style={styles.rangeInput} 
                        placeholder={`Min Fiyat`}
                        placeholderTextColor={Colors.text.secondary} 
                        keyboardType="numeric" 
                        value={minPrice}
                        onChangeText={setMinPrice}
                        onBlur={() => validatePriceRange()}
                      />
                      <TextInput 
                        style={styles.rangeInput} 
                        placeholder={`Max Fiyat`}
                        placeholderTextColor={Colors.text.secondary} 
                        keyboardType="numeric" 
                        value={maxPrice}
                        onChangeText={setMaxPrice}
                        onBlur={() => validatePriceRange()}
                      />
                    </View>
                  </View>
              </ScrollView>

              <View style={styles.filterButtons}>
                <TouchableOpacity 
                  onPress={() => {
                    setSelectedStatus([]);
                    setSelectedPropertyType([]);
                    setSelectedRooms([]);
                    setSelectedCurrency('USD');
                    setMinPrice('');
                    setMaxPrice('');
                    setShowListingFilters(false);
                  }} 
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setShowListingFilters(false)} 
                  style={styles.applyButton}
                >
                  <LinearGradient
                    colors={[Colors.primary[500], Colors.primary[600]]}
                    style={styles.applyButtonGradient}
                  >
                    <Text style={styles.applyButtonText}>Filtrele</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    padding: Spacing.sm,
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
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  profileHeader: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  profileHeaderGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.surface,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.success[500],
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileRole: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  profileDepartment: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.xs,
  },
  statusText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  infoCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  statsCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  detailsCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  bioCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },

  interestsCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  listingsCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  cardGradient: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  contactText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.primary[600],
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  detailLabel: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
  },
  detailValue: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'right',
  },
  bioText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    lineHeight: 24,
  },

  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestTag: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  interestText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[700],
    fontWeight: '500',
  },
  listingsSectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  listingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  filterButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  listingsContainer: {
    gap: Spacing.sm,
  },
  listingCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
    padding: Spacing.sm,
  },
  listingImage: {
    width: 80,
    height: 60,
    borderRadius: BorderRadius.sm,
    resizeMode: 'cover',
    marginRight: Spacing.sm,
  },
  listingInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listingTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  listingDetails: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  listingDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  listingLocation: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
  },
  listingArea: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
  },
  listingPrice: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  seeAllText: {
    fontSize: FontSizes.base,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  callButton: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  messageButton: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  actionButtonGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  actionButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.surface,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  backButtonText: {
    color: Colors.surface,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  filterTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  filterSectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  rangeInputContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  rangeInput: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  filterOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    backgroundColor: Colors.surface,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary[100],
    borderColor: Colors.primary[500],
  },
  filterOptionText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
  },
  filterOptionTextSelected: {
    color: Colors.primary[600],
    fontWeight: '600',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  clearButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  applyButton: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.surface,
  },
  currencySelectContainer: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  currencyLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  // Dropdown styles (from add-listing)
  dropdownButton: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadows.sm,
  },
  dropdownButtonText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  dropdownPlaceholder: {
    color: Colors.gray[400],
  },
  dropdownList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.md,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  dropdownItemText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  rangeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  rangeInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    backgroundColor: Colors.surface,
    marginHorizontal: 4,
    ...Shadows.sm,
  },
}); 