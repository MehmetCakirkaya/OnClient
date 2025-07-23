import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface FilterState {
  priceMin: string;
  priceMax: string;
  areaMin: string;
  areaMax: string;
  rooms: string[];
  propertyTypes: string[];
  statuses: string[];
  locations: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function ListingFiltersModal() {
  const router = useRouter();
  
  const [filters, setFilters] = useState<FilterState>({
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    rooms: [],
    propertyTypes: [],
    statuses: [],
    locations: [],
    sortBy: 'price',
    sortOrder: 'desc',
  });

  const roomOptions = [
    '1+0', '1+1', '2+1', '3+1', '4+1', '5+1', '6+1'
  ];

  const propertyTypeOptions = [
    { id: 'daire', label: 'Daire', icon: 'business-outline' },
    { id: 'villa', label: 'Villa', icon: 'home-outline' },
    { id: 'dubleks', label: 'Dubleks', icon: 'layers-outline' },
    { id: 'mustakil', label: 'Müstakil Ev', icon: 'home' },
    { id: 'ofis', label: 'Ofis', icon: 'briefcase-outline' },
    { id: 'magaza', label: 'Mağaza', icon: 'storefront-outline' },
  ];

  const statusOptions = [
    { id: 'satilik', label: 'Satılık', color: Colors.success[500] },
    { id: 'kiralik', label: 'Kiralık', color: Colors.primary[500] },
    { id: 'satilib', label: 'Satıldı', color: Colors.error },
    { id: 'kiralandi', label: 'Kiralandı', color: Colors.warning },
  ];

  const locationOptions = [
    'Beşiktaş, İstanbul',
    'Kadıköy, İstanbul',
    'Üsküdar, İstanbul',
    'Şişli, İstanbul',
    'Beyoğlu, İstanbul',
    'Bakırköy, İstanbul',
    'Maltepe, İstanbul',
    'Ataşehir, İstanbul',
  ];



  const toggleRoom = (room: string) => {
    setFilters(prev => ({
      ...prev,
      rooms: prev.rooms.includes(room)
        ? prev.rooms.filter(r => r !== room)
        : [...prev.rooms, room]
    }));
  };

  const togglePropertyType = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(typeId)
        ? prev.propertyTypes.filter(t => t !== typeId)
        : [...prev.propertyTypes, typeId]
    }));
  };

  const toggleStatus = (statusId: string) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(statusId)
        ? prev.statuses.filter(s => s !== statusId)
        : [...prev.statuses, statusId]
    }));
  };

  const toggleLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const validatePriceRange = () => {
    const minPrice = parseFloat(filters.priceMin.replace(/,/g, ''));
    const maxPrice = parseFloat(filters.priceMax.replace(/,/g, ''));
    
    if (filters.priceMin && filters.priceMax && minPrice >= maxPrice) {
      Alert.alert(
        'Hatalı Fiyat Aralığı',
        'Minimum fiyat, maksimum fiyattan küçük olmalıdır.',
        [{ text: 'Tamam' }]
      );
      return false;
    }
    return true;
  };

  const validateAreaRange = () => {
    const minArea = parseFloat(filters.areaMin);
    const maxArea = parseFloat(filters.areaMax);
    
    if (filters.areaMin && filters.areaMax && minArea >= maxArea) {
      Alert.alert(
        'Hatalı Metrekare Aralığı',
        'Minimum metrekare, maksimum metrekareden küçük olmalıdır.',
        [{ text: 'Tamam' }]
      );
      return false;
    }
    return true;
  };

  const applyFilters = () => {
    if (!validatePriceRange() || !validateAreaRange()) {
      return;
    }

    // TODO: Redux action ile filtreleri uygula
    console.log('Listing filters applied:', filters);
    router.back();
  };

  const clearAllFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      areaMin: '',
      areaMax: '',
      rooms: [],
      propertyTypes: [],
      statuses: [],
      locations: [],
      sortBy: 'price',
      sortOrder: 'desc',
    });
  };

  const formatNumberInput = (value: string) => {
    // Sadece rakamları al
    const numbers = value.replace(/[^\d]/g, '');
    // Binlik ayırıcı ekle
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceMinChange = (value: string) => {
    const formatted = formatNumberInput(value);
    setFilters(prev => ({ ...prev, priceMin: formatted }));
  };

  const handlePriceMaxChange = (value: string) => {
    const formatted = formatNumberInput(value);
    setFilters(prev => ({ ...prev, priceMax: formatted }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>İlan Filtreleri</Text>
          <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Temizle</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Fiyat Aralığı (₺)</Text>
            <View style={styles.rangeRow}>
              <View style={styles.rangeInput}>
                <Text style={styles.rangeLabel}>Minimum</Text>
                <View style={styles.inputContainer}>
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.inputGradient}
                  >
                    <TextInput
                      style={styles.textInput}
                      placeholder="0"
                      placeholderTextColor={Colors.text.secondary}
                      value={filters.priceMin}
                      onChangeText={handlePriceMinChange}
                      keyboardType="numeric"
                    />
                    <Text style={styles.inputSuffix}>₺</Text>
                  </LinearGradient>
                </View>
              </View>
              
              <View style={styles.rangeSeparator}>
                <Ionicons name="remove" size={20} color={Colors.text.secondary} />
              </View>
              
              <View style={styles.rangeInput}>
                <Text style={styles.rangeLabel}>Maksimum</Text>
                <View style={styles.inputContainer}>
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.inputGradient}
                  >
                    <TextInput
                      style={styles.textInput}
                      placeholder="∞"
                      placeholderTextColor={Colors.text.secondary}
                      value={filters.priceMax}
                      onChangeText={handlePriceMaxChange}
                      keyboardType="numeric"
                    />
                    <Text style={styles.inputSuffix}>₺</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>

          {/* Area Range */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Metrekare Aralığı (m²)</Text>
            <View style={styles.rangeRow}>
              <View style={styles.rangeInput}>
                <Text style={styles.rangeLabel}>Minimum</Text>
                <View style={styles.inputContainer}>
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.inputGradient}
                  >
                    <TextInput
                      style={styles.textInput}
                      placeholder="0"
                      placeholderTextColor={Colors.text.secondary}
                      value={filters.areaMin}
                      onChangeText={(value) => setFilters(prev => ({ ...prev, areaMin: value.replace(/[^\d]/g, '') }))}
                      keyboardType="numeric"
                    />
                    <Text style={styles.inputSuffix}>m²</Text>
                  </LinearGradient>
                </View>
              </View>
              
              <View style={styles.rangeSeparator}>
                <Ionicons name="remove" size={20} color={Colors.text.secondary} />
              </View>
              
              <View style={styles.rangeInput}>
                <Text style={styles.rangeLabel}>Maksimum</Text>
                <View style={styles.inputContainer}>
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.inputGradient}
                  >
                    <TextInput
                      style={styles.textInput}
                      placeholder="∞"
                      placeholderTextColor={Colors.text.secondary}
                      value={filters.areaMax}
                      onChangeText={(value) => setFilters(prev => ({ ...prev, areaMax: value.replace(/[^\d]/g, '') }))}
                      keyboardType="numeric"
                    />
                    <Text style={styles.inputSuffix}>m²</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>

          {/* Room Count */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Oda Sayısı</Text>
            <View style={styles.roomGrid}>
              {roomOptions.map((room) => (
                <TouchableOpacity
                  key={room}
                  onPress={() => toggleRoom(room)}
                  style={styles.roomItem}
                >
                  <LinearGradient
                    colors={filters.rooms.includes(room) 
                      ? [Colors.primary[500], Colors.primary[600]] 
                      : [Colors.surface, Colors.primary[100]]
                    }
                    style={styles.roomGradient}
                  >
                    <Text style={[
                      styles.roomText,
                      { color: filters.rooms.includes(room) ? Colors.text.onPrimary : Colors.text.primary }
                    ]}>
                      {room}
                    </Text>
                    {filters.rooms.includes(room) && (
                      <Ionicons name="checkmark" size={16} color={Colors.text.onPrimary} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Property Type */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Emlak Türü</Text>
            <View style={styles.propertyGrid}>
              {propertyTypeOptions.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => togglePropertyType(type.id)}
                  style={styles.propertyItem}
                >
                  <LinearGradient
                    colors={filters.propertyTypes.includes(type.id) 
                      ? [Colors.primary[500], Colors.primary[600]] 
                      : [Colors.surface, Colors.primary[100]]
                    }
                    style={styles.propertyGradient}
                  >
                    <Ionicons 
                      name={type.icon as any} 
                      size={20} 
                      color={filters.propertyTypes.includes(type.id) ? Colors.text.onPrimary : Colors.primary[600]} 
                    />
                    <Text style={[
                      styles.propertyText,
                      { color: filters.propertyTypes.includes(type.id) ? Colors.text.onPrimary : Colors.text.primary }
                    ]}>
                      {type.label}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Status */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>İlan Durumu</Text>
            <View style={styles.statusGrid}>
              {statusOptions.map((status) => (
                <TouchableOpacity
                  key={status.id}
                  onPress={() => toggleStatus(status.id)}
                  style={styles.statusItem}
                >
                  <LinearGradient
                    colors={filters.statuses.includes(status.id) 
                      ? [status.color, status.color] 
                      : [Colors.surface, Colors.primary[100]]
                    }
                    style={styles.statusGradient}
                  >
                    <View style={styles.statusContent}>
                      <Ionicons 
                        name={filters.statuses.includes(status.id) ? "checkmark-circle" : "ellipse-outline"} 
                        size={20} 
                        color={filters.statuses.includes(status.id) ? Colors.text.onPrimary : Colors.text.secondary} 
                      />
                      <Text style={[
                        styles.statusText,
                        { color: filters.statuses.includes(status.id) ? Colors.text.onPrimary : Colors.text.primary }
                      ]}>
                        {status.label}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Konum</Text>
            <View style={styles.locationGrid}>
              {locationOptions.map((location) => (
                <TouchableOpacity
                  key={location}
                  onPress={() => toggleLocation(location)}
                  style={styles.locationItem}
                >
                  <LinearGradient
                    colors={filters.locations.includes(location) 
                      ? [Colors.primary[500], Colors.primary[600]] 
                      : [Colors.surface, Colors.primary[100]]
                    }
                    style={styles.locationGradient}
                  >
                    <Ionicons 
                      name="location-outline" 
                      size={16} 
                      color={filters.locations.includes(location) ? Colors.text.onPrimary : Colors.primary[600]} 
                    />
                    <Text style={[
                      styles.locationText,
                      { color: filters.locations.includes(location) ? Colors.text.onPrimary : Colors.text.primary }
                    ]}>
                      {location}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>


        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
              <LinearGradient
                colors={[Colors.gray[100], Colors.gray[200]]}
                style={styles.cancelButtonGradient}
              >
                <Ionicons name="close" size={20} color={Colors.text.secondary} />
                <Text style={styles.cancelButtonText}>İptal</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
              <LinearGradient
                colors={[Colors.primary[500], Colors.primary[600]]}
                style={styles.applyButtonGradient}
              >
                <Ionicons name="funnel" size={20} color={Colors.text.onPrimary} />
                <Text style={styles.applyButtonText}>Filtrele</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary[200],
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  clearButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  clearButtonText: {
    fontSize: FontSizes.base,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  filterSection: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  // Range Inputs
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.md,
  },
  rangeInput: {
    flex: 1,
  },
  rangeLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    paddingVertical: Spacing.sm,
  },
  inputSuffix: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
  },
  rangeSeparator: {
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  // Room Grid
  roomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  roomItem: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  roomGradient: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minWidth: 60,
    justifyContent: 'center',
  },
  roomText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  // Property Grid
  propertyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  propertyItem: {
    flex: 1,
    minWidth: '48%',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  propertyGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  propertyText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  // Status Grid
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  statusItem: {
    flex: 1,
    minWidth: '48%',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  statusGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  // Location Grid
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  locationItem: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  locationGradient: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  locationText: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
  },
  // Bottom Container
  bottomContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.primary[200],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  cancelButtonGradient: {
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  cancelButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  applyButton: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.md,
  },
  applyButtonGradient: {
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  applyButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.onPrimary,
  },
}); 