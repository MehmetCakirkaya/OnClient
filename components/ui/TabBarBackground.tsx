import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BlurTabBarBackground() {
  return (
    <View style={[StyleSheet.absoluteFill, {
      backdropFilter: 'blur(20px)', // Web için blur
      backgroundColor: 'rgba(255, 255, 255, 0.3)', // Daha açık arka plan
    }]} />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
