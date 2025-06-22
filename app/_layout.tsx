import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { Colors } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/store';

// Splash screen'i göster
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Font yüklendikten sonra splash screen'i otomatik gizle
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modal)" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen 
            name="customer" 
            options={{ 
              headerShown: false,
              presentation: 'card',
              gestureEnabled: true 
            }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar 
          style="light" 
          backgroundColor={Colors.primary[900]}
          translucent={false}
        />
      </ThemeProvider>
    </Provider>
  );
}
