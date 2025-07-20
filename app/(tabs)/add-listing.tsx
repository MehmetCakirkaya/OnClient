import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image, ViewStyle, TextStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

export default function AddListingScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'house' | 'land' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [houseData, setHouseData] = useState({
    title: '',
    description: '',
    address: '',
    roomType: '',
    condition: '',
    yearBuilt: '',
    rentalPeriod: '',
    price: '',
    currency: '₺',
    location: null as { latitude: number; longitude: number } | null,
    features: [] as string[],
    media: [] as string[],
  });
  const [newFeature, setNewFeature] = useState('');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showRentalDropdown, setShowRentalDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'team' | 'customers'>('team');
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [teamSearchText, setTeamSearchText] = useState('');
  const [customerSearchText, setCustomerSearchText] = useState('');
  const [addedTeamMembers, setAddedTeamMembers] = useState<string[]>([]);
  const [addedCustomers, setAddedCustomers] = useState<string[]>([]);
  const [listingType, setListingType] = useState<'rent' | 'sale'>('rent'); // Kiralık varsayılan
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Örnek takım üyeleri
  const teamMembers = [
    { id: '1', name: 'Ahmet Yılmaz', role: 'Kıdemli Emlak Danışmanı', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: '2', name: 'Fatma Demir', role: 'Emlak Uzmanı', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { id: '3', name: 'Mehmet Kaya', role: 'Satış Danışmanı', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: '4', name: 'Ayşe Özkan', role: 'Müşteri İlişkileri', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { id: '5', name: 'Ali Çelik', role: 'Emlak Danışmanı', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { id: '6', name: 'Zeynep Korkmaz', role: 'Satış Müdürü', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { id: '7', name: 'Hasan Özkan', role: 'Emlak Uzmanı', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: '8', name: 'Elif Yıldız', role: 'Müşteri Temsilcisi', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { id: '9', name: 'Murat Demir', role: 'Emlak Danışmanı', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: '10', name: 'Selin Arslan', role: 'Satış Danışmanı', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
    { id: '11', name: 'Burak Çelik', role: 'Emlak Uzmanı', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { id: '12', name: 'Deniz Kaya', role: 'Müşteri İlişkileri', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  ];

  // Örnek müşteriler
  const customers = [
    { id: '1', name: 'Zeynep Arslan', role: 'Potansiyel Alıcı', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
    { id: '2', name: 'Hasan Yıldız', role: 'Yatırımcı', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
    { id: '3', name: 'Elif Korkmaz', role: 'İlk Ev Alıcısı', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
    { id: '4', name: 'Murat Şahin', role: 'Kira Arayan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: '5', name: 'Selin Özkan', role: 'Lüks Emlak Alıcısı', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
    { id: '6', name: 'Ahmet Demir', role: 'Aile Alıcısı', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { id: '7', name: 'Fatma Çelik', role: 'Emekli Alıcı', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { id: '8', name: 'Mehmet Korkmaz', role: 'Genç Profesyonel', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: '9', name: 'Ayşe Yıldız', role: 'İş Kadını', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { id: '10', name: 'Ali Arslan', role: 'Doktor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: '11', name: 'Zeynep Kaya', role: 'Mühendis', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
    { id: '12', name: 'Hasan Özkan', role: 'Avukat', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
    { id: '13', name: 'Elif Demir', role: 'Öğretmen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
    { id: '14', name: 'Murat Çelik', role: 'Mimar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: '15', name: 'Selin Korkmaz', role: 'Diş Hekimi', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
  ];

  const handleTypeSelection = (type: 'house' | 'land') => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  const handleNextStep = () => {
    if (currentStep === 2) {
      // Step 2'den Step 3'e geçerken önizleme için veri hazırla
      console.log('Önizleme için veri hazırlanıyor:', {
        listingType,
        houseData,
        addedTeamMembers,
        addedCustomers
      });
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      setSelectedType(null);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setHouseData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setHouseData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addMedia = async () => {
    try {
      // İzinleri kontrol et
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'İzin Gerekli',
          'Fotoğraf seçmek için galeri izni gereklidir.',
          [{ text: 'Tamam' }]
        );
        return;
      }

      // Medya seçiciyi aç
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets) {
        const newMedia = result.assets.map(asset => asset.uri);
        setHouseData(prev => ({
          ...prev,
          media: [...prev.media, ...newMedia]
        }));
      }
    } catch (error) {
      Alert.alert('Hata', 'Medya seçilirken bir hata oluştu.');
    }
  };

  const removeMedia = (index: number) => {
    setHouseData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleTeamMemberToggle = (id: string) => {
    setSelectedTeamMembers(prev => 
      prev.includes(id) 
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    );
  };

  const handleCustomerToggle = (id: string) => {
    setSelectedCustomers(prev => 
      prev.includes(id) 
        ? prev.filter(customerId => customerId !== id)
        : [...prev, id]
    );
  };

  const handleAddPeople = () => {
    // Seçilen kişileri kaydet
    const selectedPeople = {
      teamMembers: selectedTeamMembers,
      customers: selectedCustomers
    };
    console.log('Seçilen kişiler:', selectedPeople);
    
    // Seçilen kişileri eklenen listelere ekle
    setAddedTeamMembers(prev => [...prev, ...selectedTeamMembers]);
    setAddedCustomers(prev => [...prev, ...selectedCustomers]);
    
    setShowPersonModal(false);
    setSelectedTeamMembers([]);
    setSelectedCustomers([]);
    setTeamSearchText('');
    setCustomerSearchText('');
  };

  const removeAddedTeamMember = (id: string) => {
    setAddedTeamMembers(prev => prev.filter(memberId => memberId !== id));
  };

  const removeAddedCustomer = (id: string) => {
    setAddedCustomers(prev => prev.filter(customerId => customerId !== id));
  };

  // Filtreleme fonksiyonları
  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(teamSearchText.toLowerCase()) ||
    member.role.toLowerCase().includes(teamSearchText.toLowerCase())
  );

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchText.toLowerCase()) ||
    customer.role.toLowerCase().includes(customerSearchText.toLowerCase())
  );

  // Debug için console.log ekleyelim
  console.log('showPersonModal:', showPersonModal);
  console.log('selectedTab:', selectedTab);
  console.log('teamMembers count:', teamMembers.length);
  console.log('customers count:', customers.length);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              onPress={handleBackStep}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {currentStep === 1 ? 'İlan Ekle' : `Aşama ${currentStep}`}
            </Text>
            <View style={styles.placeholder} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>

          {currentStep === 1 && (
            <>
              <Text style={styles.stepTitle}>Mülk Türü Seçin</Text>
              <Text style={styles.stepSubtitle}>
                Hangi türde mülk ilanı eklemek istiyorsunuz?
              </Text>

              <View style={styles.cardsContainer}>
            {/* Ev Kart */}
            <TouchableOpacity
              style={[
                styles.card,
                selectedType === 'house' && styles.cardSelected
              ]}
              onPress={() => handleTypeSelection('house')}
            >
              <LinearGradient
                colors={
                  selectedType === 'house' 
                    ? [Colors.primary[100], Colors.primary[200]]
                    : [Colors.surface, Colors.primary[50]]
                }
                style={styles.cardGradient}
              >
                <View style={styles.cardIconContainer}>
                  <Ionicons 
                    name="home-outline" 
                    size={48} 
                    color={selectedType === 'house' ? Colors.primary[700] : Colors.primary[600]} 
                  />
                </View>
                <Text style={[
                  styles.cardTitle,
                  selectedType === 'house' && styles.cardTitleSelected
                ]}>
                  Ev
                </Text>
                <Text style={[
                  styles.cardSubtitle,
                  selectedType === 'house' && styles.cardSubtitleSelected
                ]}>
                  Konut mülkü
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Arsa Kart */}
            <TouchableOpacity
              style={[
                styles.card,
                selectedType === 'land' && styles.cardSelected
              ]}
              onPress={() => handleTypeSelection('land')}
            >
              <LinearGradient
                colors={
                  selectedType === 'land' 
                    ? [Colors.success[100], Colors.success[200]]
                    : [Colors.surface, Colors.primary[50]]
                }
                style={styles.cardGradient}
              >
                <View style={styles.cardIconContainer}>
                  <Ionicons 
                    name="map-outline" 
                    size={48} 
                    color={selectedType === 'land' ? Colors.success[700] : Colors.success[600]} 
                  />
                </View>
                <Text style={[
                  styles.cardTitle,
                  selectedType === 'land' && styles.cardTitleSelected
                ]}>
                  Arsa
                </Text>
                <Text style={[
                  styles.cardSubtitle,
                  selectedType === 'land' && styles.cardSubtitleSelected
                ]}>
                  Arazi mülkü
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
            </>
          )}

          {currentStep === 2 && selectedType === 'house' && (
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.stepTitle}>Ev Bilgileri</Text>
              <Text style={styles.stepSubtitle}>
                Ev ile ilgili detaylı bilgileri girin
              </Text>

              {/* İlan Tipi Toggle */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>İlan Tipi</Text>
                <View style={styles.listingTypeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.listingTypeButton,
                      listingType === 'rent' && styles.listingTypeButtonActive
                    ]}
                    onPress={() => setListingType('rent')}
                  >
                    <Text style={[
                      styles.listingTypeText,
                      listingType === 'rent' && styles.listingTypeTextActive
                    ]}>
                      Kiralık
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.listingTypeButton,
                      listingType === 'sale' && styles.listingTypeButtonActive
                    ]}
                    onPress={() => setListingType('sale')}
                  >
                    <Text style={[
                      styles.listingTypeText,
                      listingType === 'sale' && styles.listingTypeTextActive
                    ]}>
                      Satılık
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Başlık */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>İlan Başlığı</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Örn: Merkezi konumda 3+1 daire"
                  placeholderTextColor={Colors.gray[400]}
                  value={houseData.title}
                  onChangeText={(text) => setHouseData(prev => ({ ...prev, title: text }))}
                />
              </View>

              {/* Açıklama */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>İlan Açıklaması</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Ev hakkında detaylı açıklama yazın..."
                  placeholderTextColor={Colors.gray[400]}
                  value={houseData.description}
                  onChangeText={(text) => setHouseData(prev => ({ ...prev, description: text }))}
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Adres */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Adres</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Tam adres bilgisi"
                  placeholderTextColor={Colors.gray[400]}
                  value={houseData.address}
                  onChangeText={(text) => setHouseData(prev => ({ ...prev, address: text }))}
                />
              </View>

              {/* Konum */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Konum</Text>
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={() => setShowLocationModal(true)}
                >
                  <LinearGradient
                    colors={[Colors.primary[50], Colors.primary[100]]}
                    style={styles.locationButtonGradient}
                  >
                    <Ionicons name="location" size={20} color={Colors.primary[600]} />
                    <Text style={styles.locationButtonText}>
                      {houseData.location ? 'Konum Seçildi' : 'Konum Ayarla'}
                    </Text>
                    {houseData.location && (
                      <Text style={styles.locationCoordinates}>
                        {houseData.location.latitude.toFixed(4)}, {houseData.location.longitude.toFixed(4)}
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Oda Bilgisi */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Oda Bilgisi</Text>
                <View style={styles.roomTypeContainer}>
                  {['1+0', '1+1', '2+1', '3+1', '3+2', '4+1', '4+2', '5+1', '5+2'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.roomTypeButton,
                        houseData.roomType === type && styles.roomTypeButtonSelected
                      ]}
                      onPress={() => setHouseData(prev => ({ ...prev, roomType: type }))}
                    >
                      <Text style={[
                        styles.roomTypeText,
                        houseData.roomType === type && styles.roomTypeTextSelected
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Ev Durumu */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ev Durumu</Text>
                <View style={styles.conditionContainer}>
                  {['Koçan', 'Yarı Koçan', 'Eşyalı', 'Boş'].map((condition) => (
                    <TouchableOpacity
                      key={condition}
                      style={[
                        styles.conditionButton,
                        houseData.condition === condition && styles.conditionButtonSelected
                      ]}
                      onPress={() => setHouseData(prev => ({ ...prev, condition: condition }))}
                    >
                      <Text style={[
                        styles.conditionText,
                        houseData.condition === condition && styles.conditionTextSelected
                      ]}>
                        {condition}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Kaç Yıllık Yapı */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Kaç Yıllık Yapı</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowYearDropdown(!showYearDropdown)}
                >
                  <Text style={[
                    styles.dropdownButtonText,
                    !houseData.yearBuilt && styles.dropdownPlaceholder
                  ]}>
                    {houseData.yearBuilt || 'Yapı yaşını seçin'}
                  </Text>
                  <Ionicons 
                    name={showYearDropdown ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={Colors.gray[500]} 
                  />
                </TouchableOpacity>
                
                {showYearDropdown && (
                  <View style={styles.dropdownList}>
                    {['1-5', '6-10', '11-15', '15-20', '21+'].map((age) => (
                      <TouchableOpacity
                        key={age}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setHouseData(prev => ({ ...prev, yearBuilt: age }));
                          setShowYearDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{age} yıl</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Ödeme Tipi */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ödeme Tipi</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowRentalDropdown(!showRentalDropdown)}
                >
                  <Text style={[
                    styles.dropdownButtonText,
                    !houseData.rentalPeriod && styles.dropdownPlaceholder
                  ]}>
                    {houseData.rentalPeriod || 'Ödeme tipini seçin'}
                  </Text>
                  <Ionicons 
                    name={showRentalDropdown ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={Colors.gray[500]} 
                  />
                </TouchableOpacity>
                
                {showRentalDropdown && (
                  <View style={styles.dropdownList}>
                    {['Aylık', '3 Aylık', '6 Aylık', '1 Yıllık'].map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setHouseData(prev => ({ ...prev, rentalPeriod: period }));
                          setShowRentalDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{period}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Fiyat */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Fiyat</Text>
                <View style={styles.priceContainer}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Fiyat girin"
                    placeholderTextColor={Colors.gray[400]}
                    value={houseData.price}
                    onChangeText={(text) => setHouseData(prev => ({ ...prev, price: text }))}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.currencyButton}
                    onPress={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  >
                    <Text style={styles.currencyButtonText}>{houseData.currency}</Text>
                    <Ionicons 
                      name={showCurrencyDropdown ? "chevron-up" : "chevron-down"} 
                      size={16} 
                      color={Colors.gray[500]} 
                    />
                  </TouchableOpacity>
                  
                  {showCurrencyDropdown && (
                    <View style={styles.currencyDropdownList}>
                      {['₺', '$', '€', '£'].map((currency) => (
                        <TouchableOpacity
                          key={currency}
                          style={styles.currencyDropdownItem}
                          onPress={() => {
                            setHouseData(prev => ({ ...prev, currency: currency }));
                            setShowCurrencyDropdown(false);
                          }}
                        >
                          <Text style={styles.currencyDropdownItemText}>{currency}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* Özellikler */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Özellikler</Text>
                <View style={styles.featureInputContainer}>
                  <TextInput
                    style={styles.featureInput}
                    placeholder="Örn: Manzara, Asansör, Otopark..."
                    placeholderTextColor={Colors.gray[400]}
                    value={newFeature}
                    onChangeText={setNewFeature}
                  />
                  <TouchableOpacity
                    style={styles.addFeatureButton}
                    onPress={addFeature}
                  >
                    <Ionicons name="add" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                
                {/* Eklenen Özellikler */}
                {houseData.features.length > 0 && (
                  <View style={styles.featuresList}>
                    {houseData.features.map((feature, index) => (
                      <View key={index} style={styles.featureTag}>
                        <Text style={styles.featureTagText}>{feature}</Text>
                        <TouchableOpacity
                          onPress={() => removeFeature(index)}
                          style={styles.removeFeatureButton}
                        >
                          <Ionicons name="close" size={16} color={Colors.error} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* Medya */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Medya</Text>
                <View style={styles.mediaContainer}>
                  {/* Mevcut medyalar */}
                  {houseData.media.map((media, index) => (
                    <View key={index} style={styles.mediaItem}>
                      <View style={styles.mediaPreview}>
                        <Image 
                          source={{ uri: media }} 
                          style={styles.mediaImage}
                          resizeMode="cover"
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.removeMediaButton}
                        onPress={() => removeMedia(index)}
                      >
                        <Ionicons name="close-circle" size={20} color={Colors.error} />
                      </TouchableOpacity>
                    </View>
                  ))}
                  
                  {/* Medya Ekleme Butonu */}
                  <TouchableOpacity
                    style={styles.addMediaButton}
                    onPress={addMedia}
                  >
                    <LinearGradient
                      colors={[Colors.surface, Colors.primary[50]]}
                      style={styles.addMediaGradient}
                    >
                      <Ionicons name="add" size={32} color={Colors.primary[600]} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Kişi Ekle */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Kişi Ekle</Text>
                <TouchableOpacity
                  style={styles.addPersonButton}
                  onPress={() => setShowPersonModal(true)}
                >
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.addPersonGradient}
                  >
                    <Ionicons name="people" size={24} color={Colors.primary[600]} />
                    <Text style={styles.addPersonText}>Kişi veya Müşteri Ekle</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.primary[600]} />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Seçilen Kişiler */}
                {(addedTeamMembers.length > 0 || addedCustomers.length > 0) && (
                  <View style={styles.selectedPeopleContainer}>
                    <Text style={styles.selectedPeopleLabel}>Seçilen Kişiler:</Text>
                    <View style={styles.selectedPeopleGrid}>
                      {/* Takım Üyeleri */}
                      {addedTeamMembers.map((memberId) => {
                        const member = teamMembers.find(m => m.id === memberId);
                        if (!member) return null;
                        return (
                          <View key={memberId} style={styles.selectedPersonBadge}>
                            <Image source={{ uri: member.avatar }} style={styles.selectedPersonAvatar} />
                            <Text style={styles.selectedPersonName} numberOfLines={1}>
                              {member.name}
                            </Text>
                            <TouchableOpacity
                              style={styles.removeSelectedPersonButton}
                              onPress={() => removeAddedTeamMember(memberId)}
                            >
                              <Ionicons name="close" size={16} color={Colors.error} />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                      
                      {/* Müşteriler */}
                      {addedCustomers.map((customerId) => {
                        const customer = customers.find(c => c.id === customerId);
                        if (!customer) return null;
                        return (
                          <View key={customerId} style={[styles.selectedPersonBadge, styles.selectedCustomerBadge]}>
                            <Image source={{ uri: customer.avatar }} style={styles.selectedPersonAvatar} />
                            <Text style={styles.selectedPersonName} numberOfLines={1}>
                              {customer.name}
                            </Text>
                            <TouchableOpacity
                              style={styles.removeSelectedPersonButton}
                              onPress={() => removeAddedCustomer(customerId)}
                            >
                              <Ionicons name="close" size={16} color={Colors.error} />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>

              {/* İleri Butonu */}
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextStep}
              >
                <LinearGradient
                  colors={[Colors.primary[500], Colors.primary[600]]}
                  style={styles.nextButtonGradient}
                >
                  <Text style={styles.nextButtonText}>İleri</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* Step 3: Önizleme */}
          {currentStep === 3 && selectedType === 'house' && (
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.stepTitle}>İlan Önizlemesi</Text>
              <Text style={styles.stepSubtitle}>
                İlanınızın nasıl görüneceğini kontrol edin
              </Text>

              {/* Fotoğraf Slider */}
              {houseData.media.length > 0 && (
                <View style={styles.previewImageContainer}>
                  <View style={styles.imageSlider}>
                    <Image 
                      source={{ uri: houseData.media[currentImageIndex] }} 
                      style={styles.previewMainImage}
                      resizeMode="cover"
                    />
                    
                    {/* Slider Dots */}
                    {houseData.media.length > 1 && (
                      <View style={styles.sliderDots}>
                        {houseData.media.map((_, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.sliderDot,
                              index === currentImageIndex && styles.sliderDotActive
                            ]}
                            onPress={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </View>
                    )}

                    {/* Slider Navigation */}
                    {houseData.media.length > 1 && (
                      <>
                        <TouchableOpacity
                          style={[styles.sliderNav, styles.sliderNavLeft]}
                          onPress={() => setCurrentImageIndex(prev => 
                            prev === 0 ? houseData.media.length - 1 : prev - 1
                          )}
                        >
                          <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          style={[styles.sliderNav, styles.sliderNavRight]}
                          onPress={() => setCurrentImageIndex(prev => 
                            prev === houseData.media.length - 1 ? 0 : prev + 1
                          )}
                        >
                          <Ionicons name="chevron-forward" size={24} color="white" />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>

                  {/* Thumbnail Gallery */}
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.thumbnailGallery}
                  >
                    {houseData.media.map((media, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.thumbnail,
                          index === currentImageIndex && styles.thumbnailActive
                        ]}
                        onPress={() => setCurrentImageIndex(index)}
                      >
                        <Image 
                          source={{ uri: media }} 
                          style={styles.thumbnailImage}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

                             {/* İlan Detayları */}
               <View style={styles.previewDetailsContainer}>
                 {/* Başlık, Tip ve Özellikler */}
                 <View style={styles.previewHeader}>
                   <View style={styles.previewTitleContainer}>
                     <Text style={styles.previewTitle}>{houseData.title || 'İlan Başlığı'}</Text>
                     <View style={styles.previewHeaderRow}>
                       <View style={[
                         styles.previewTypeBadge,
                         listingType === 'rent' ? styles.previewTypeRent : styles.previewTypeSale
                       ]}>
                         <Text style={styles.previewTypeText}>
                           {listingType === 'rent' ? 'Kiralık' : 'Satılık'}
                         </Text>
                       </View>
                       
                       {/* Özellikler Badge'leri */}
                       <View style={styles.previewFeaturesBadgeContainer}>
                         {houseData.roomType && (
                           <View style={styles.previewFeatureBadge}>
                             <Ionicons name="bed" size={12} color={Colors.primary[600]} />
                             <Text style={styles.previewFeatureBadgeText}>{houseData.roomType}</Text>
                           </View>
                         )}
                         {houseData.condition && (
                           <View style={styles.previewFeatureBadge}>
                             <Ionicons name="home" size={12} color={Colors.primary[600]} />
                             <Text style={styles.previewFeatureBadgeText}>{houseData.condition}</Text>
                           </View>
                         )}
                         {houseData.yearBuilt && (
                           <View style={styles.previewFeatureBadge}>
                             <Ionicons name="time" size={12} color={Colors.primary[600]} />
                             <Text style={styles.previewFeatureBadgeText}>{houseData.yearBuilt} yıl</Text>
                           </View>
                         )}
                         {houseData.rentalPeriod && (
                           <View style={styles.previewFeatureBadge}>
                             <Ionicons name="calendar" size={12} color={Colors.primary[600]} />
                             <Text style={styles.previewFeatureBadgeText}>{houseData.rentalPeriod}</Text>
                           </View>
                         )}
                       </View>
                     </View>
                   </View>
                   <Text style={styles.previewPrice}>
                     {houseData.price ? `${houseData.price} ${houseData.currency}` : 'Fiyat Belirtilmemiş'}
                   </Text>
                 </View>

                 {/* Konum */}
                 {houseData.location && (
                   <View style={styles.previewLocationContainer}>
                     <Ionicons name="location" size={16} color={Colors.primary[600]} />
                     <Text style={styles.previewLocationText}>
                       {houseData.address || 'Konum seçildi'}
                     </Text>
                   </View>
                 )}

                 {/* Açıklama */}
                 {houseData.description && (
                   <View style={styles.previewDescriptionContainer}>
                     <Text style={styles.previewDescriptionText}>{houseData.description}</Text>
                   </View>
                 )}

                 {/* Ek Özellikler */}
                 {houseData.features.length > 0 && (
                   <View style={styles.previewExtraFeaturesContainer}>
                     <Text style={styles.previewSectionTitle}>Ek Özellikler</Text>
                     <View style={styles.previewExtraFeaturesGrid}>
                       {houseData.features.map((feature, index) => (
                         <View key={index} style={styles.previewExtraFeatureBadge}>
                           <Ionicons name="checkmark-circle" size={12} color={Colors.success[600]} />
                           <Text style={styles.previewExtraFeatureBadgeText}>{feature}</Text>
                         </View>
                       ))}
                     </View>
                   </View>
                 )}

                 {/* Seçilen Kişiler */}
                 {(addedTeamMembers.length > 0 || addedCustomers.length > 0) && (
                   <View style={styles.previewPeopleContainer}>
                     <Text style={styles.previewSectionTitle}>İlgili Kişiler</Text>
                     <View style={styles.previewPeopleGrid}>
                       {addedTeamMembers.map((memberId) => {
                         const member = teamMembers.find(m => m.id === memberId);
                         if (!member) return null;
                         return (
                           <View key={memberId} style={styles.previewPersonItem}>
                             <Image source={{ uri: member.avatar }} style={styles.previewPersonAvatar} />
                             <View style={styles.previewPersonInfo}>
                               <Text style={styles.previewPersonName}>{member.name}</Text>
                               <Text style={styles.previewPersonRole}>{member.role}</Text>
                             </View>
                           </View>
                         );
                       })}
                       {addedCustomers.map((customerId) => {
                         const customer = customers.find(c => c.id === customerId);
                         if (!customer) return null;
                         return (
                           <View key={customerId} style={styles.previewPersonItem}>
                             <Image source={{ uri: customer.avatar }} style={styles.previewPersonAvatar} />
                             <View style={styles.previewPersonInfo}>
                               <Text style={styles.previewPersonName}>{customer.name}</Text>
                               <Text style={styles.previewPersonRole}>{customer.role}</Text>
                             </View>
                           </View>
                         );
                       })}
                     </View>
                   </View>
                 )}
               </View>

              {/* Aksiyon Butonları */}
              <View style={styles.previewActionsContainer}>
                <TouchableOpacity
                  style={styles.previewBackButton}
                  onPress={handleBackStep}
                >
                  <LinearGradient
                    colors={[Colors.gray[100], Colors.gray[200]]}
                    style={styles.previewBackButtonGradient}
                  >
                    <Ionicons name="arrow-back" size={20} color={Colors.text.secondary} />
                    <Text style={styles.previewBackButtonText}>Geri</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.previewPublishButton}
                  onPress={() => {
                    console.log('İlan yayınlanıyor:', {
                      listingType,
                      houseData,
                      addedTeamMembers,
                      addedCustomers
                    });
                    // Burada ilan yayınlama işlemi yapılacak
                  }}
                >
                  <LinearGradient
                    colors={[Colors.success[500], Colors.success[600]]}
                    style={styles.previewPublishButtonGradient}
                  >
                    <Ionicons name="checkmark" size={20} color="white" />
                    <Text style={styles.previewPublishButtonText}>İlanı Yayınla</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}

          {/* Konum Seçimi Modal */}
          {showLocationModal && (
            <View style={styles.modalOverlay}>
              <View style={styles.locationModal}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Konum Seç</Text>
                  <TouchableOpacity
                    onPress={() => setShowLocationModal(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color={Colors.text.primary} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: 35.1167,
                      longitude: 33.9167,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
                  >
                    {selectedLocation && (
                      <Marker
                        coordinate={selectedLocation}
                        title="Seçilen Konum"
                        description="Bu konum ilanınız için kaydedilecek"
                      />
                    )}
                  </MapView>
                  <View style={styles.mapOverlay}>
                    <Text style={styles.mapInstructions}>
                      Haritada istediğiniz konumu işaretleyin
                    </Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowLocationModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>İptal</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      if (selectedLocation) {
                        setHouseData(prev => ({
                          ...prev,
                          location: selectedLocation
                        }));
                      }
                      setShowLocationModal(false);
                      setSelectedLocation(null);
                    }}
                  >
                    <LinearGradient
                      colors={[Colors.primary[500], Colors.primary[600]]}
                      style={styles.confirmButtonGradient}
                    >
                      <Text style={styles.confirmButtonText}>Konumu Kaydet</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}


        </View>
      </LinearGradient>

      {/* Kişi Seçimi Modal - En üst seviyede */}
      {showPersonModal && (
        <View style={[styles.modalOverlay, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 99999 }]}>
          <View style={[styles.personModal, { backgroundColor: Colors.primary[50], padding: 20, margin: 20, borderRadius: 10, flex: 1, maxHeight: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Kişi Seç</Text>
              <TouchableOpacity
                onPress={() => setShowPersonModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>

            {/* Tab Butonları */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedTab === 'team' && styles.tabButtonActive
                ]}
                onPress={() => setSelectedTab('team')}
              >
                <Text style={[
                  styles.tabButtonText,
                  selectedTab === 'team' && styles.tabButtonTextActive
                ]}>
                  Arkadaşlar
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedTab === 'customers' && styles.tabButtonActive
                ]}
                onPress={() => setSelectedTab('customers')}
              >
                <Text style={[
                  styles.tabButtonText,
                  selectedTab === 'customers' && styles.tabButtonTextActive
                ]}>
                  Müşteriler
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab İçeriği */}
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
              {console.log('Rendering team tab, teamMembers:', teamMembers.length)}
              {selectedTab === 'team' && (
                <>
                  {/* Arama Input */}
                  <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                      <Ionicons name="search" size={20} color={Colors.gray[500]} style={styles.searchIcon} />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Arkadaş ara..."
                        placeholderTextColor={Colors.gray[400]}
                        value={teamSearchText}
                        onChangeText={setTeamSearchText}
                      />
                      {teamSearchText.length > 0 && (
                        <TouchableOpacity onPress={() => setTeamSearchText('')} style={styles.clearButton}>
                          <Ionicons name="close-circle" size={20} color={Colors.gray[500]} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.peopleList}>
                    {filteredTeamMembers.map((member) => (
                    <TouchableOpacity
                      key={member.id}
                      style={[
                        styles.personCard,
                        selectedTeamMembers.includes(member.id) && styles.personCardSelected
                      ]}
                      onPress={() => handleTeamMemberToggle(member.id)}
                    >
                      <Image source={{ uri: member.avatar }} style={styles.personAvatar} />
                      <View style={styles.personInfo}>
                        <Text style={styles.personName}>{member.name}</Text>
                        <Text style={styles.personRole}>{member.role}</Text>
                      </View>
                      {selectedTeamMembers.includes(member.id) && (
                        <View style={styles.selectedIndicator}>
                          <Ionicons name="checkmark-circle" size={24} color={Colors.primary[600]} />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                </>
              )}

              {selectedTab === 'customers' && (
                <>
                  {/* Arama Input */}
                  <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                      <Ionicons name="search" size={20} color={Colors.gray[500]} style={styles.searchIcon} />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Müşteri ara..."
                        placeholderTextColor={Colors.gray[400]}
                        value={customerSearchText}
                        onChangeText={setCustomerSearchText}
                      />
                      {customerSearchText.length > 0 && (
                        <TouchableOpacity onPress={() => setCustomerSearchText('')} style={styles.clearButton}>
                          <Ionicons name="close-circle" size={20} color={Colors.gray[500]} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.peopleList}>
                    {filteredCustomers.map((customer) => (
                    <TouchableOpacity
                      key={customer.id}
                      style={[
                        styles.personCard,
                        selectedCustomers.includes(customer.id) && styles.personCardSelectedCustomer
                      ]}
                      onPress={() => handleCustomerToggle(customer.id)}
                    >
                      <Image source={{ uri: customer.avatar }} style={styles.personAvatar} />
                      <View style={styles.personInfo}>
                        <Text style={styles.personName}>{customer.name}</Text>
                        <Text style={styles.personRole}>{customer.role}</Text>
                      </View>
                      {selectedCustomers.includes(customer.id) && (
                        <View style={styles.selectedIndicator}>
                          <Ionicons name="checkmark-circle" size={24} color={Colors.blue[600]} />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                </>
              )}
            </ScrollView>

            {/* Alt Butonlar */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowPersonModal(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.addPeopleButton,
                  (selectedTeamMembers.length === 0 && selectedCustomers.length === 0) && styles.addPeopleButtonDisabled
                ]}
                onPress={handleAddPeople}
                disabled={selectedTeamMembers.length === 0 && selectedCustomers.length === 0}
              >
                <LinearGradient
                  colors={
                    (selectedTeamMembers.length === 0 && selectedCustomers.length === 0)
                      ? [Colors.gray[300], Colors.gray[400]]
                      : [Colors.primary[500], Colors.primary[600]]
                  }
                  style={styles.addPeopleButtonGradient}
                >
                  <Text style={[
                    styles.addPeopleButtonText,
                    (selectedTeamMembers.length === 0 && selectedCustomers.length === 0) && styles.addPeopleButtonTextDisabled
                  ]}>
                    Seçilenleri Ekle
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  scrollContent: {
    paddingBottom: Spacing.tabBarHeight + Spacing.xl,
  },

  stepTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  stepSubtitle: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl + 12,
  },
  cardsContainer: {
    gap: Spacing.lg,
  },
  card: {
    borderRadius: BorderRadius.xl,
    ...Shadows.lg,
    overflow: 'hidden',
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: Colors.primary[400],
  },
  cardGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  cardIconContainer: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  cardTitleSelected: {
    color: Colors.text.primary,
  },
  cardSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  cardSubtitleSelected: {
    color: Colors.text.secondary,
  },
  // Step 2 styles
  inputContainer: {
    marginBottom: Spacing.lg,
    overflow: 'visible',
  },
  inputLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.sm,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  roomTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'start',
  },
  roomTypeButton: {
    width: '18%', // 5'li düzen için (100% / 5 - gap)
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    alignItems: 'center',
    ...Shadows.sm,
  },
  roomTypeButtonSelected: {
    backgroundColor: Colors.primary[50],
    borderWidth: 2,
    borderColor: Colors.primary[400],
    ...Shadows.md,
  },
  roomTypeText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  roomTypeTextSelected: {
    color: Colors.primary[700],
    fontWeight: '600',
  },
  conditionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  conditionButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.sm,
  },
  conditionButtonSelected: {
    backgroundColor: Colors.primary[50],
    borderWidth: 2,
    borderColor: Colors.primary[400],
    ...Shadows.md,
  },
  conditionText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  conditionTextSelected: {
    color: Colors.primary[700],
    fontWeight: '600',
  },
  featureInputContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  featureInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.sm,
  },
  addFeatureButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    ...Shadows.sm,
  },
  featureTagText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[700],
    fontWeight: '500',
  },
  removeFeatureButton: {
    padding: 2,
  },
  nextButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.tabBarHeight + Spacing.lg,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.md,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  nextButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.onPrimary,
  },
  // Media styles
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  mediaItem: {
    position: 'relative',
    width: '30%',
    aspectRatio: 1,
  },
  mediaPreview: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Shadows.sm,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.lg - 2,
  },
  removeMediaButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 2,
    ...Shadows.md,
  },
  addMediaButton: {
    width: '30%',
    aspectRatio: 1,
  },
  addMediaGradient: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  // Dropdown styles
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
  // Price styles
  priceContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.sm,
  },
  currencyButton: {
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minWidth: 60,
    justifyContent: 'center',
    ...Shadows.sm,
  },
  currencyButtonText: {
    fontSize: FontSizes.base,
    color: Colors.primary[700],
    fontWeight: '600',
  },
  currencyDropdownList: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    zIndex: 1000,
    ...Shadows.lg,
  },
  currencyDropdownItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  currencyDropdownItemText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  // Location styles
  locationButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  locationButtonGradient: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  locationButtonText: {
    fontSize: FontSizes.base,
    color: Colors.primary[700],
    fontWeight: '600',
    flex: 1,
  },
  locationCoordinates: {
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
    fontFamily: 'monospace',
  },
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
  },
  locationModal: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    width: '90%',
    maxHeight: '80%',
    ...Shadows.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  mapContainer: {
    height: 300,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: Spacing.sm,
    alignItems: 'center',
  },
  mapInstructions: {
    fontSize: FontSizes.sm,
    color: Colors.primary[700],
    fontWeight: '500',
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: FontSizes.base,
    color: Colors.text.onPrimary,
    fontWeight: '600',
  },
  // Person selection styles
  addPersonButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  addPersonGradient: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  addPersonText: {
    fontSize: FontSizes.base,
    color: Colors.primary[700],
    fontWeight: '600',
    flex: 1,
  },
  personModal: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    width: '90%',
    maxHeight: '85%',
    zIndex: 10000,
    elevation: 10000,
    ...Shadows.xl,
  },
  tabContainer: {
    flexDirection: 'row',
    // paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  tabButtonText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: Colors.primary[700],
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    // paddingHorizontal: Spacing.lg,
    maxHeight: 400, // Sabit yükseklik ekleyelim
  },
  peopleList: {
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.sm,
  },
  personCardSelected: {
    backgroundColor: Colors.primary[50],
    borderWidth: 2,
    borderColor: Colors.primary[300],
    ...Shadows.md,
  },
  personCardSelectedCustomer: {
    backgroundColor: Colors.blue[50],
    borderWidth: 2,
    borderColor: Colors.blue[300],
    ...Shadows.md,
  },
  personAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.md,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  personRole: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  selectedIndicator: {
    marginLeft: Spacing.sm,
  },
  addPeopleButton: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  addPeopleButtonDisabled: {
    opacity: 0.5,
  },
  addPeopleButtonGradient: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  addPeopleButtonText: {
    fontSize: FontSizes.base,
    color: Colors.text.onPrimary,
    fontWeight: '600',
  },
  addPeopleButtonTextDisabled: {
    color: Colors.gray[500],
  },
  // Arama input styles
  searchContainer: {
    marginBottom: Spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.sm,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  clearButton: {
    padding: Spacing.sm,
  },
  // Seçilen kişiler badge styles
  selectedPeopleContainer: {
    marginTop: Spacing.md,
  },
  selectedPeopleLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  selectedPeopleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  selectedPersonBadge: {
    width: '48%', // 2'li düzen için
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50], // İlk hali - çok açık mor
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.md, // X butonu için extra padding
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary[200], // Eski border
    ...Shadows.sm,
    overflow: 'visible', // X butonunun kesilmemesi için
    position: 'relative', // Absolute positioning için
  },
  selectedCustomerBadge: {
    backgroundColor: Colors.blue[50],
    borderColor: Colors.blue[200],
  },
  selectedPersonAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: Spacing.sm,
  },
  selectedPersonName: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  removeSelectedPersonButton: {
    padding: 2,
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    ...Shadows.sm,
  },
  // İlan tipi toggle styles
  listingTypeContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  listingTypeButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[200],
    ...Shadows.sm,
  },
  listingTypeButtonActive: {
    backgroundColor: Colors.primary[50],
    borderWidth: 2,
    borderColor: Colors.primary[400],
    ...Shadows.md,
  },
  listingTypeText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  listingTypeTextActive: {
    color: Colors.primary[700],
    fontWeight: '600',
  },
  // Önizleme sayfası styles
  previewImageContainer: {
    marginBottom: Spacing.lg,
  },
  imageSlider: {
    position: 'relative',
    height: 300,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.lg,
  },
  previewMainImage: {
    width: '100%',
    height: '100%',
  },
  sliderDots: {
    position: 'absolute',
    bottom: Spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  sliderDotActive: {
    backgroundColor: Colors.primary[500],
  },
  sliderNav: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: Spacing.sm,
  },
  sliderNavLeft: {
    left: Spacing.md,
  },
  sliderNavRight: {
    right: Spacing.md,
  },
  thumbnailGallery: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.gray[200],
  },
  thumbnailActive: {
    borderColor: Colors.primary[500],
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  previewDetailsContainer: {
    gap: Spacing.md,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  previewTitleContainer: {
    flex: 1,
  },
  previewTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  previewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  previewTypeBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  previewTypeRent: {
    backgroundColor: Colors.primary[50],
  },
  previewTypeSale: {
    backgroundColor: Colors.success[50],
  },
  previewTypeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary[700],
  },
  previewFeaturesBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  previewFeatureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.full,
  },
  previewFeatureBadgeText: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  previewPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.success[600],
  },
  previewLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.lg,
  },
  previewLocationText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    flex: 1,
  },
  previewSectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  previewDescriptionContainer: {
    paddingVertical: Spacing.sm,
  },
  previewDescriptionText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  previewExtraFeaturesContainer: {
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  previewExtraFeaturesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  previewExtraFeatureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.success[50],
    borderRadius: BorderRadius.full,
  },
  previewExtraFeatureBadgeText: {
    fontSize: FontSizes.xs,
    color: Colors.success[700],
    fontWeight: '500',
  },
  previewPeopleContainer: {
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  previewPeopleGrid: {
    gap: Spacing.sm,
  },
  previewPersonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.sm,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.lg,
  },
  previewPersonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  previewPersonInfo: {
    flex: 1,
  },
  previewPersonName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  previewPersonRole: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  previewActionsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.tabBarHeight + Spacing.lg,
  },
  previewBackButton: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  previewBackButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  previewBackButtonText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    fontWeight: '600',
  },
  previewPublishButton: {
    flex: 2,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  previewPublishButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  previewPublishButtonText: {
    fontSize: FontSizes.base,
    color: Colors.text.onPrimary,
    fontWeight: '600',
  },
} as const); 