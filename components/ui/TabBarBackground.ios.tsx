import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BlurTabBarBackground() {
  return (
    <View style={[StyleSheet.absoluteFill, {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }]} />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
