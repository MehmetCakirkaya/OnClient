import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddCustomerScreen() {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    profession: '',
    company: '',
    address: '',
    status: 'uncertain' as 'interested' | 'not-interested' | 'uncertain',
    notes: '',
  });

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const statusOptions = [
    { value: 'interested', label: 'İlgileniyor', color: Colors.success[500] },
    { value: 'not-interested', label: 'İlgilenmiyor', color: '#dc2626' },
    { value: 'uncertain', label: 'Belirsiz', color: Colors.gray[500] },
  ];

  const handleSave = () => {
    if (!customerData.firstName.trim() || !customerData.lastName.trim()) {
      Alert.alert('Hata', 'İsim ve soyisim alanları zorunludur.');
      return;
    }
    
    // Yeni müşteri objesi oluştur
    const newCustomer = {
      id: Date.now(), // Basit ID üretimi
      name: `${customerData.firstName.trim()} ${customerData.lastName.trim()}`,
      email: customerData.email || `${customerData.firstName.toLowerCase()}@example.com`,
      phone: customerData.phone || '+90 555 000 0000',
      campaign: 'Manuel Eklendi', // Sabit kampanya adı
      status: customerData.status,
      createdAt: new Date().toISOString().split('T')[0],
      notes: customerData.notes ? 1 : 0, // Not varsa 1, yoksa 0
    };
    
    console.log('Yeni müşteri eklendi:', newCustomer);
    // Burada Redux store'a eklenecek
    
    Alert.alert('Başarılı', 'Müşteri başarıyla eklendi!', [
      { text: 'Tamam', onPress: () => router.back() }
    ]);
  };

  const handleCancel = () => {
    setShowCancelModal(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.stepTitle}>Müşteri Bilgileri</Text>
          <Text style={styles.stepSubtitle}>
            Yeni müşteri için gerekli bilgileri girin
          </Text>

          {/* İsim & Soyisim - Yan Yana */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>İsim *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="İsim"
                placeholderTextColor={Colors.gray[400]}
                value={customerData.firstName}
                onChangeText={(text) => setCustomerData(prev => ({ ...prev, firstName: text }))}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Soyisim *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Soyisim"
                placeholderTextColor={Colors.gray[400]}
                value={customerData.lastName}
                onChangeText={(text) => setCustomerData(prev => ({ ...prev, lastName: text }))}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
              style={styles.textInput}
              placeholder="ornek@email.com"
              placeholderTextColor={Colors.gray[400]}
              value={customerData.email}
              onChangeText={(text) => setCustomerData(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Telefon */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefon</Text>
            <TextInput
              style={styles.textInput}
              placeholder="+90 555 123 4567"
              placeholderTextColor={Colors.gray[400]}
              value={customerData.phone}
              onChangeText={(text) => setCustomerData(prev => ({ ...prev, phone: text }))}
              keyboardType="phone-pad"
            />
          </View>

          {/* Yaş & Meslek - Yan Yana */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Yaş</Text>
              <TextInput
                style={styles.textInput}
                placeholder="25"
                placeholderTextColor={Colors.gray[400]}
                value={customerData.age}
                onChangeText={(text) => setCustomerData(prev => ({ ...prev, age: text }))}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Meslek</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Yazılım Mühendisi"
                placeholderTextColor={Colors.gray[400]}
                value={customerData.profession}
                onChangeText={(text) => setCustomerData(prev => ({ ...prev, profession: text }))}
              />
            </View>
          </View>

          {/* Şirket */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Şirket</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Şirket adı"
              placeholderTextColor={Colors.gray[400]}
              value={customerData.company}
              onChangeText={(text) => setCustomerData(prev => ({ ...prev, company: text }))}
            />
          </View>

          {/* Adres */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Adres</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Tam adres bilgisi"
              placeholderTextColor={Colors.gray[400]}
              value={customerData.address}
              onChangeText={(text) => setCustomerData(prev => ({ ...prev, address: text }))}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Durum */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Durum</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <Text style={[
                styles.dropdownButtonText,
                !customerData.status && styles.dropdownPlaceholder
              ]}>
                {statusOptions.find(opt => opt.value === customerData.status)?.label || 'Durum seçin'}
              </Text>
              <Ionicons 
                name={showStatusDropdown ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={Colors.gray[400]} 
              />
            </TouchableOpacity>
            {showStatusDropdown && (
              <View style={styles.dropdownList}>
                {statusOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCustomerData(prev => ({ ...prev, status: option.value as any }));
                      setShowStatusDropdown(false);
                    }}
                  >
                    <View style={[styles.statusDot, { backgroundColor: option.color }]} />
                    <Text style={styles.dropdownItemText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Notlar */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notlar</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Müşteri hakkında notlar..."
              placeholderTextColor={Colors.gray[400]}
              value={customerData.notes}
              onChangeText={(text) => setCustomerData(prev => ({ ...prev, notes: text }))}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Butonlar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowCancelModal(true)}>
              <Text style={styles.cancelButtonText}>Vazgeç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <LinearGradient
                colors={[Colors.primary[500], Colors.primary[600]]}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Vazgeç Confirm Modal */}
      <Modal
        visible={showCancelModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Değişikliklerden vazgeçilecek. Onaylıyor musunuz?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setShowCancelModal(false)}>
                <Text style={styles.modalCancelText}>Hayır</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={handleCancel}>
                <Text style={styles.modalConfirmText}>Evet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
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
    height: 80,
    textAlignVertical: 'top',
  },
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 16,
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
}); 