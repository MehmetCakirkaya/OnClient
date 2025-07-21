import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FilterState {
  statuses: string[];
  startDate: string;
  endDate: string;
  campaigns: string[];
  hasNotes: boolean | null;
}

export default function CustomerFiltersModal() {
  const router = useRouter();
  
  const [filters, setFilters] = useState<FilterState>({
    statuses: [],
    startDate: '',
    endDate: '',
    campaigns: [],
    hasNotes: null,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date>(new Date());
  const [tempEndDate, setTempEndDate] = useState<Date>(new Date());

  const statusOptions = [
    { id: 'interested', label: 'İlgileniyor', color: Colors.success[500] },
    { id: 'not-interested', label: 'İlgilenmiyor', color: Colors.error },
    { id: 'uncertain', label: 'Belirsiz', color: Colors.gray[500] },
  ];

  const campaignOptions = [
    'Yazılım Kursu',
    'Dijital Pazarlama', 
    'Web Tasarım',
    'Mobil Uygulama',
    'E-ticaret',
  ];

  const toggleStatus = (statusId: string) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(statusId)
        ? prev.statuses.filter(s => s !== statusId)
        : [...prev.statuses, statusId]
    }));
  };

  const toggleCampaign = (campaign: string) => {
    setFilters(prev => ({
      ...prev,
      campaigns: prev.campaigns.includes(campaign)
        ? prev.campaigns.filter(c => c !== campaign)
        : [...prev.campaigns, campaign]
    }));
  };

  const applyFilters = () => {
    // TODO: Redux action ile filtreleri uygula
    console.log('Filters applied:', filters);
    router.back();
  };

  const clearAllFilters = () => {
    setFilters({
      statuses: [],
      startDate: '',
      endDate: '',
      campaigns: [],
      hasNotes: null,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleStartDateSelect = () => {
    const currentDate = filters.startDate 
      ? new Date(filters.startDate.split('.').reverse().join('-')) 
      : new Date();
    setTempStartDate(currentDate);
    setShowStartDatePicker(true);
  };

  const handleEndDateSelect = () => {
    const currentDate = filters.endDate 
      ? new Date(filters.endDate.split('.').reverse().join('-')) 
      : new Date();
    setTempEndDate(currentDate);
    setShowEndDatePicker(true);
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempEndDate(selectedDate);
    }
  };

  const confirmStartDate = () => {
    const today = new Date();
    const currentEndDate = filters.endDate ? new Date(filters.endDate.split('.').reverse().join('-')) : null;
    
    // Başlangıç tarihi bitiş tarihinden sonra olamaz
    if (currentEndDate && tempStartDate > currentEndDate) {
      Alert.alert(
        'Hatalı Tarih',
        'Başlangıç tarihi bitiş tarihinden sonra olamaz.',
        [{ text: 'Tamam' }]
      );
      return;
    }

    setFilters(prev => ({
      ...prev,
      startDate: formatDate(tempStartDate),
      // Başlangıç tarihi seçilince bitiş tarihini otomatik bugün yap
      endDate: prev.endDate || formatDate(new Date())
    }));
    setShowStartDatePicker(false);
  };

  const confirmEndDate = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Bugünün sonuna ayarla
    const currentStartDate = filters.startDate ? new Date(filters.startDate.split('.').reverse().join('-')) : null;
    
    // Bitiş tarihi bugünden sonra olamaz
    if (tempEndDate > today) {
      Alert.alert(
        'Hatalı Tarih',
        'Bitiş tarihi bugünden sonra olamaz.',
        [
          { text: 'İptal', style: 'cancel' },
          { 
            text: 'Bugün Yap', 
            onPress: () => {
              const adjustedDate = new Date();
              setTempEndDate(adjustedDate);
              setFilters(prev => ({
                ...prev,
                endDate: formatDate(adjustedDate)
              }));
              setShowEndDatePicker(false);
            }
          }
        ]
      );
      return;
    }

    // Bitiş tarihi başlangıç tarihinden önce olamaz
    if (currentStartDate && tempEndDate < currentStartDate) {
      Alert.alert(
        'Hatalı Tarih',
        'Bitiş tarihi başlangıç tarihinden önce olamaz.',
        [
          { text: 'İptal', style: 'cancel' },
          { 
            text: 'Başlangıç Tarihini Sıfırla', 
            onPress: () => {
              setFilters(prev => ({
                ...prev,
                startDate: '',
                endDate: formatDate(tempEndDate)
              }));
              setShowEndDatePicker(false);
            }
          }
        ]
      );
      return;
    }

    setFilters(prev => ({
      ...prev,
      endDate: formatDate(tempEndDate)
    }));
    setShowEndDatePicker(false);
  };

  const cancelStartDate = () => {
    setShowStartDatePicker(false);
  };

  const cancelEndDate = () => {
    setShowEndDatePicker(false);
  };

  const clearStartDate = () => {
    setFilters(prev => ({
      ...prev,
      startDate: ''
    }));
  };

  const clearEndDate = () => {
    setFilters(prev => ({
      ...prev,
      endDate: ''
    }));
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
          <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Temizle</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Status Filters */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Müşteri Durumu</Text>
            <View style={styles.checkboxGrid}>
              {statusOptions.map((status) => (
                <TouchableOpacity
                  key={status.id}
                  onPress={() => toggleStatus(status.id)}
                  style={styles.checkboxItem}
                >
                  <LinearGradient
                    colors={filters.statuses.includes(status.id) 
                      ? [status.color, status.color] 
                      : [Colors.surface, Colors.primary[100]]
                    }
                    style={styles.checkboxGradient}
                  >
                    <View style={styles.checkboxContent}>
                      <Ionicons 
                        name={filters.statuses.includes(status.id) ? "checkmark-circle" : "ellipse-outline"} 
                        size={20} 
                        color={filters.statuses.includes(status.id) ? Colors.surface : Colors.gray[400]} 
                      />
                      <Text style={[
                        styles.checkboxLabel,
                        { color: filters.statuses.includes(status.id) ? Colors.surface : Colors.text.primary }
                      ]}>
                        {status.label}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date Range */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Tarih Aralığı</Text>
            <View style={styles.dateRow}>
              <View style={styles.dateInput}>
                <Text style={styles.dateLabel}>Başlangıç</Text>
                <View style={styles.dateFieldContainer}>
                  <TouchableOpacity 
                    style={styles.dateField}
                    onPress={handleStartDateSelect}
                  >
                    <LinearGradient
                      colors={[Colors.surface, Colors.primary[100]]}
                      style={styles.dateFieldGradient}
                    >
                      <Ionicons name="calendar-outline" size={20} color={Colors.gray[500]} />
                      <Text style={[
                        styles.dateText,
                        { color: filters.startDate ? Colors.text.primary : Colors.gray[500] }
                      ]}>
                        {filters.startDate || 'Seçin'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  {filters.startDate && (
                    <TouchableOpacity onPress={clearStartDate} style={styles.dateClearButton}>
                      <Ionicons name="close" size={16} color={Colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              
              <View style={styles.dateInput}>
                <Text style={styles.dateLabel}>Bitiş</Text>
                <View style={styles.dateFieldContainer}>
                  <TouchableOpacity 
                    style={styles.dateField}
                    onPress={handleEndDateSelect}
                  >
                    <LinearGradient
                      colors={[Colors.surface, Colors.primary[100]]}
                      style={styles.dateFieldGradient}
                    >
                      <Ionicons name="calendar-outline" size={20} color={Colors.gray[500]} />
                      <Text style={[
                        styles.dateText,
                        { color: filters.endDate ? Colors.text.primary : Colors.gray[500] }
                      ]}>
                        {filters.endDate || 'Seçin'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  {filters.endDate && (
                    <TouchableOpacity onPress={clearEndDate} style={styles.dateClearButton}>
                      <Ionicons name="close" size={16} color={Colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Campaign Filters */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Kampanya</Text>
            <View style={styles.campaignGrid}>
              {campaignOptions.map((campaign) => (
                <TouchableOpacity
                  key={campaign}
                  onPress={() => toggleCampaign(campaign)}
                  style={styles.campaignItem}
                >
                  <LinearGradient
                    colors={filters.campaigns.includes(campaign) 
                      ? [Colors.primary[500], Colors.primary[600]] 
                      : [Colors.surface, Colors.primary[100]]
                    }
                    style={styles.campaignGradient}
                  >
                    <Text style={[
                      styles.campaignText,
                      { color: filters.campaigns.includes(campaign) ? Colors.surface : Colors.text.primary }
                    ]}>
                      {campaign}
                    </Text>
                    {filters.campaigns.includes(campaign) && (
                      <Ionicons name="checkmark" size={16} color={Colors.surface} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Not Durumu</Text>
            <View style={styles.notesRow}>
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, hasNotes: true }))}
                style={styles.notesOption}
              >
                <LinearGradient
                  colors={filters.hasNotes === true 
                    ? [Colors.success[500], Colors.success[600]] 
                    : [Colors.surface, Colors.primary[100]]
                  }
                  style={styles.notesGradient}
                >
                  <Ionicons 
                    name="document-text" 
                    size={20} 
                    color={filters.hasNotes === true ? Colors.surface : Colors.gray[500]} 
                  />
                  <Text style={[
                    styles.notesText,
                    { color: filters.hasNotes === true ? Colors.surface : Colors.text.primary }
                  ]}>
                    Notu Var
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, hasNotes: false }))}
                style={styles.notesOption}
              >
                <LinearGradient
                  colors={filters.hasNotes === false 
                    ? [Colors.warning, '#f59e0b'] 
                    : [Colors.surface, Colors.primary[100]]
                  }
                  style={styles.notesGradient}
                >
                  <Ionicons 
                    name="document-outline" 
                    size={20} 
                    color={filters.hasNotes === false ? Colors.surface : Colors.gray[500]} 
                  />
                  <Text style={[
                    styles.notesText,
                    { color: filters.hasNotes === false ? Colors.surface : Colors.text.primary }
                  ]}>
                    Notu Yok
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
            <LinearGradient
              colors={[Colors.primary[500], Colors.primary[600]]}
              style={styles.applyButtonGradient}
            >
              <Ionicons name="funnel" size={20} color={Colors.surface} />
              <Text style={styles.applyButtonText}>Filtrele</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

             {showStartDatePicker && (
         <View style={styles.datePickerModal}>
           <View style={styles.datePickerContainer}>
             <Text style={styles.datePickerTitle}>Başlangıç Tarihi Seçin</Text>
             <DateTimePicker
               value={tempStartDate}
               mode="date"
               display="spinner"
               onChange={onStartDateChange}
               style={styles.datePicker}
               textColor={Colors.text.primary}
             />
             <View style={styles.datePickerButtons}>
               <TouchableOpacity onPress={cancelStartDate} style={styles.datePickerCancelButton}>
                 <Text style={styles.datePickerCancelText}>İptal</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={confirmStartDate} style={styles.datePickerConfirmButton}>
                 <LinearGradient
                   colors={[Colors.primary[500], Colors.primary[600]]}
                   style={styles.datePickerConfirmGradient}
                 >
                   <Text style={styles.datePickerConfirmText}>Tamam</Text>
                 </LinearGradient>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       )}

       {showEndDatePicker && (
         <View style={styles.datePickerModal}>
           <View style={styles.datePickerContainer}>
             <Text style={styles.datePickerTitle}>Bitiş Tarihi Seçin</Text>
             <DateTimePicker
               value={tempEndDate}
               mode="date"
               display="spinner"
               onChange={onEndDateChange}
               style={styles.datePicker}
               textColor={Colors.text.primary}
             />
             <View style={styles.datePickerButtons}>
               <TouchableOpacity onPress={cancelEndDate} style={styles.datePickerCancelButton}>
                 <Text style={styles.datePickerCancelText}>İptal</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={confirmEndDate} style={styles.datePickerConfirmButton}>
                 <LinearGradient
                   colors={[Colors.primary[500], Colors.primary[600]]}
                   style={styles.datePickerConfirmGradient}
                 >
                   <Text style={styles.datePickerConfirmText}>Tamam</Text>
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
    borderBottomColor: Colors.gray[200],
  },
  backButton: {
    padding: Spacing.sm,
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
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  checkboxItem: {
    flex: 1,
    minWidth: '48%',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  checkboxGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  checkboxContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: FontSizes.base,
    fontWeight: '500',
    marginLeft: Spacing.sm,
  },
  dateRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  dateFieldContainer: {
    position: 'relative',
    flex: 1,
  },
  dateField: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  dateFieldGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dateClearButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  dateText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  campaignGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  campaignItem: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  campaignGradient: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  campaignText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  notesRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  notesOption: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  notesGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  notesText: {
    fontSize: FontSizes.base,
    fontWeight: '500',
  },
  bottomContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  applyButton: {
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
    color: Colors.surface,
  },
  // Date Picker Modal Styles
  datePickerModal: {
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
  datePickerContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: Spacing.lg,
    minWidth: 300,
    ...Shadows.lg,
  },
  datePickerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
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
}); 