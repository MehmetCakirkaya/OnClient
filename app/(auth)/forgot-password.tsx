import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/Theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin');
      return;
    }

    // Basit email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin');
      return;
    }

    setIsLoading(true);
    
    // Simüle edilmiş reset işlemi
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    router.push('/(auth)/login');
  };

  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[Colors.primary[500], Colors.primary[600], Colors.primary[800]]}
          style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Success State */}
            <View style={styles.centerContainer}>
              <View style={styles.successContainer}>
                <View style={styles.successIconContainer}>
                  <Ionicons name="mail" size={64} color={Colors.primary[600]} />
                </View>
                
                <Text style={styles.successTitle}>E-posta Gönderildi!</Text>
                <Text style={styles.successSubtitle}>
                  Şifre sıfırlama bağlantısı{'\n'}
                  <Text style={styles.emailText}>{email}</Text>{'\n'}
                  adresine gönderildi.
                </Text>

                <View style={styles.instructionCard}>
                  <View style={styles.instructionItem}>
                    <Ionicons name="checkmark-circle" size={20} color={Colors.success[500]} />
                    <Text style={styles.instructionText}>E-posta kutunuzu kontrol edin</Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Ionicons name="checkmark-circle" size={20} color={Colors.success[500]} />
                    <Text style={styles.instructionText}>Spam/Gereksiz klasörünü kontrol edin</Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Ionicons name="checkmark-circle" size={20} color={Colors.success[500]} />
                    <Text style={styles.instructionText}>Bağlantıya tıklayarak şifrenizi sıfırlayın</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleBackToLogin}
                  style={styles.backToLoginButton}
                >
                  <LinearGradient
                    colors={[Colors.primary[500], Colors.primary[600]]}
                    style={styles.backToLoginGradient}
                  >
                    <Ionicons name="arrow-back" size={20} color={Colors.surface} style={styles.buttonIcon} />
                    <Text style={styles.backToLoginText}>Giriş Sayfasına Dön</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setEmailSent(false)}
                  style={styles.tryAgainButton}
                >
                  <Text style={styles.tryAgainText}>Farklı e-posta ile dene</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary[500], Colors.primary[600], Colors.primary[800]]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.surface} />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <Ionicons name="key" size={48} color={Colors.primary[600]} />
            </View>
            <Text style={styles.title}>Şifremi Unuttum</Text>
            <Text style={styles.subtitle}>
              E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
            </Text>
          </View>

          {/* Reset Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Şifre Sıfırla</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-posta Adresi</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={Colors.gray[400]} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Kayıtlı e-posta adresiniz"
                  placeholderTextColor={Colors.gray[400]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={isLoading}
              style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
            >
              <LinearGradient
                colors={isLoading ? [Colors.gray[400], Colors.gray[500]] : [Colors.primary[500], Colors.primary[600]]}
                style={styles.resetButtonGradient}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.resetButtonText}>Gönderiliyor...</Text>
                  </View>
                ) : (
                  <View style={styles.buttonContent}>
                    <Ionicons name="send" size={20} color={Colors.surface} style={styles.buttonIcon} />
                    <Text style={styles.resetButtonText}>Sıfırlama Bağlantısı Gönder</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Ionicons name="information-circle-outline" size={20} color={Colors.gray[500]} />
              <Text style={styles.helpText}>
                E-posta almadınız mı? Spam klasörünüzü kontrol edin veya birkaç dakika bekleyin.
              </Text>
            </View>
          </View>

          {/* Bottom Link */}
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Şifrenizi hatırladınız mı?</Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/login')}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
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
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.xl,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.full,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  formTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: FontSizes.base,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  inputIcon: {
    marginRight: Spacing.md,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    height: '100%',
  },
  resetButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButtonGradient: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: Spacing.sm,
  },
  resetButtonText: {
    color: Colors.surface,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  helpText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.gray[600],
    lineHeight: 18,
    marginLeft: Spacing.sm,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FontSizes.base,
  },
  loginButton: {
    marginLeft: Spacing.sm,
  },
  loginButtonText: {
    color: Colors.surface,
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  // Success State Styles
  successContainer: {
    alignItems: 'center',
    width: '100%',
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  successTitle: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  successSubtitle: {
    fontSize: FontSizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  emailText: {
    fontWeight: '600',
    color: Colors.surface,
  },
  instructionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  instructionText: {
    color: Colors.surface,
    fontSize: FontSizes.base,
    marginLeft: Spacing.md,
    flex: 1,
  },
  backToLoginButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    width: '100%',
    ...Shadows.md,
  },
  backToLoginGradient: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backToLoginText: {
    color: Colors.surface,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  tryAgainButton: {
    paddingVertical: Spacing.md,
  },
  tryAgainText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FontSizes.base,
    fontWeight: '500',
  },
}); 