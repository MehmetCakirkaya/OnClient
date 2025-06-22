import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';

export default function AccountSettingsScreen() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    firstName: 'Mehmet',
    lastName: 'Çelik',
    email: 'mehmet@onclient.com',
    phone: '+90 532 123 45 67',
    company: 'OnClient',
    billingAddress: {
      street: 'Atatürk Caddesi No: 123',
      city: 'İstanbul',
      district: 'Kadıköy',
      postalCode: '34710',
      country: 'Türkiye'
    }
  });

  const handleSave = () => {
    Alert.alert(
      'Başarılı',
      'Hesap bilgileriniz güncellendi.',
      [{ text: 'Tamam' }]
    );
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
          <Text style={styles.headerTitle}>Hesap Bilgileri</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
                     {/* Personal Information */}
           <View style={styles.section}>
             <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
             
             <View style={styles.card}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Ad</Text>
                  <TextInput
                    style={styles.input}
                    value={userInfo.firstName}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, firstName: text }))}
                    placeholder="Adınızı girin"
                    placeholderTextColor={Colors.gray[400]}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Soyad</Text>
                  <TextInput
                    style={styles.input}
                    value={userInfo.lastName}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, lastName: text }))}
                    placeholder="Soyadınızı girin"
                    placeholderTextColor={Colors.gray[400]}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>E-posta</Text>
                  <TextInput
                    style={styles.input}
                    value={userInfo.email}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, email: text }))}
                    placeholder="E-posta adresinizi girin"
                    placeholderTextColor={Colors.gray[400]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Telefon</Text>
                  <TextInput
                    style={styles.input}
                    value={userInfo.phone}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, phone: text }))}
                    placeholder="Telefon numaranızı girin"
                    placeholderTextColor={Colors.gray[400]}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Şirket</Text>
                  <TextInput
                    style={styles.input}
                    value={userInfo.company}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, company: text }))}
                    placeholder="Şirket adınızı girin"
                    placeholderTextColor={Colors.gray[400]}
                  />
                </View>
            </View>
          </View>

                     {/* Billing Address */}
           <View style={styles.section}>
             <Text style={styles.sectionTitle}>Fatura Adresi</Text>
             
             <View style={styles.card}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Adres</Text>
                  <TextInput
                    style={styles.input}
                    value={userInfo.billingAddress.street}
                    onChangeText={(text) => setUserInfo(prev => ({ 
                      ...prev, 
                      billingAddress: { ...prev.billingAddress, street: text }
                    }))}
                    placeholder="Sokak/Cadde adresinizi girin"
                    placeholderTextColor={Colors.gray[400]}
                  />
                </View>

                <View style={styles.row}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>İl</Text>
                    <TextInput
                      style={styles.input}
                      value={userInfo.billingAddress.city}
                      onChangeText={(text) => setUserInfo(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, city: text }
                      }))}
                      placeholder="İl"
                      placeholderTextColor={Colors.gray[400]}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>İlçe</Text>
                    <TextInput
                      style={styles.input}
                      value={userInfo.billingAddress.district}
                      onChangeText={(text) => setUserInfo(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, district: text }
                      }))}
                      placeholder="İlçe"
                      placeholderTextColor={Colors.gray[400]}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Posta Kodu</Text>
                    <TextInput
                      style={styles.input}
                      value={userInfo.billingAddress.postalCode}
                      onChangeText={(text) => setUserInfo(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, postalCode: text }
                      }))}
                      placeholder="Posta Kodu"
                      placeholderTextColor={Colors.gray[400]}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Ülke</Text>
                    <TextInput
                      style={styles.input}
                      value={userInfo.billingAddress.country}
                      onChangeText={(text) => setUserInfo(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, country: text }
                      }))}
                      placeholder="Ülke"
                      placeholderTextColor={Colors.gray[400]}
                    />
                  </View>
                </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
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
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  inputGroup: {
    marginBottom: Spacing.md,
    flex: 1,
  },
  inputLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
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
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.surface,
  },
}); 