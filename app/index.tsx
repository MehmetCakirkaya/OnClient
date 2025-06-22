import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/Theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  
  // Animation values
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const pulseValue = new Animated.Value(1);
  
  useEffect(() => {
    // Logo animation sequence
    const animateIn = () => {
      // Logo scale and opacity
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      // Text fade in after logo
      setTimeout(() => {
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 400);

      // Pulse animation
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 1.1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, 800);
    };

    animateIn();

    // Navigate after 5 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          Colors.primary[600],
          Colors.primary[700],
          Colors.primary[800],
          Colors.primary[900],
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background Pattern */}
        <View style={styles.backgroundPattern}>
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.patternDot,
                {
                  left: Math.random() * width,
                  top: Math.random() * height,
                  animationDelay: `${Math.random() * 2}s`,
                },
              ]}
            />
          ))}
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo Container */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [
                  { scale: logoScale },
                  { scale: pulseValue },
                ],
              },
            ]}
          >
            <View style={styles.logoInner}>
              <Ionicons name="business" size={80} color={Colors.primary[600]} />
            </View>
            
            {/* Outer rings */}
            <View style={[styles.logoRing, styles.logoRing1]} />
            <View style={[styles.logoRing, styles.logoRing2]} />
            <View style={[styles.logoRing, styles.logoRing3]} />
          </Animated.View>

          {/* Text Content */}
          <Animated.View
            style={[
              styles.textContainer,
              { opacity: textOpacity },
            ]}
          >
            <Text style={styles.title}>OnClient</Text>
            <Text style={styles.subtitle}>Müşteri Yönetimi</Text>
            <Text style={styles.description}>
              Profesyonel müşteri yönetim sistemi
            </Text>
          </Animated.View>

          {/* Loading Indicator */}
          <Animated.View
            style={[
              styles.loadingContainer,
              { opacity: textOpacity },
            ]}
          >
            <View style={styles.loadingBar}>
              <Animated.View
                style={[
                  styles.loadingProgress,
                  {
                    transform: [{ scale: pulseValue }],
                  },
                ]}
              />
            </View>
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          </Animated.View>
        </View>

        {/* Bottom Brand */}
        <Animated.View
          style={[
            styles.bottomBrand,
            { opacity: textOpacity },
          ]}
        >
          <Text style={styles.brandText}>
            Meta Reklam Müşteri Yönetimi
          </Text>
          <View style={styles.brandLine} />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  patternDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: Spacing.xxl,
  },
  logoInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    ...Shadows.xl,
  },
  logoRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1000,
    top: '50%',
    left: '50%',
  },
  logoRing1: {
    width: 160,
    height: 160,
    marginTop: -80,
    marginLeft: -80,
    borderWidth: 1,
  },
  logoRing2: {
    width: 180,
    height: 180,
    marginTop: -90,
    marginLeft: -90,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  logoRing3: {
    width: 200,
    height: 200,
    marginTop: -100,
    marginLeft: -100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSizes['5xl'],
    fontWeight: '800',
    color: Colors.surface,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSizes.lg,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  loadingProgress: {
    width: '60%',
    height: '100%',
    backgroundColor: Colors.surface,
    borderRadius: 2,
  },
  loadingText: {
    fontSize: FontSizes.base,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  bottomBrand: {
    position: 'absolute',
    bottom: Spacing.xxl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brandText: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: Spacing.md,
    fontWeight: '500',
  },
  brandLine: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
}); 