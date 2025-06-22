import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);
    
    // Simüle edilmiş login işlemi
    setTimeout(() => {
      setIsLoading(false);
      // Başarılı login sonrası ana ekrana yönlendir
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.primary[500], Colors.primary[600], Colors.primary[800]]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo ve Başlık */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Ionicons name="business" size={48} color={Colors.primary[600]} />
            </View>
            <Text style={styles.title}>OnClient'e Hoş Geldiniz</Text>
            <Text style={styles.subtitle}>
              Müşteri yönetim sisteminize giriş yapın
            </Text>
          </View>

          {/* Login Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Giriş Yap</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-posta Adresi</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={Colors.gray[400]} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="ornek@email.com"
                  placeholderTextColor={Colors.gray[400]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.gray[400]} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, styles.passwordInput]}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.gray[400]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={Colors.gray[400]} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            >
              <LinearGradient
                colors={isLoading ? [Colors.gray[400], Colors.gray[500]] : [Colors.primary[500], Colors.primary[600]]}
                style={styles.loginButtonGradient}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.loginButtonText}>Giriş Yapılıyor...</Text>
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Giriş Yap</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.forgotPasswordButton}
            >
              <Text style={styles.forgotPasswordText}>
                Şifrenizi mi unuttunuz?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Links */}
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Hesabınız yok mu?</Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>

          {/* Plans Link */}
          <TouchableOpacity
            onPress={() => router.push('/(auth)/plans')}
            style={styles.plansButton}
          >
            <View style={styles.plansButtonContent}>
              <Ionicons name="diamond-outline" size={20} color={Colors.primary[600]} />
              <Text style={styles.plansButtonText}>Planları İncele</Text>
            </View>
          </TouchableOpacity>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.xxl,
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
    fontSize: FontSizes.lg,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
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
  passwordInput: {
    paddingRight: 0,
  },
  eyeIcon: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  loginButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.surface,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  forgotPasswordText: {
    color: Colors.primary[600],
    fontSize: FontSizes.base,
    fontWeight: '500',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  bottomText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FontSizes.base,
  },
  registerButton: {
    marginLeft: Spacing.sm,
  },
  registerButtonText: {
    color: Colors.surface,
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  plansButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  plansButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plansButtonText: {
    color: Colors.surface,
    fontSize: FontSizes.base,
    fontWeight: '500',
    marginLeft: Spacing.sm,
  },
}); 