import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7c3aed', // Mor renk
        tabBarInactiveTintColor: '#a1a1aa', // Açık gri
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          default: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: 'İlanlar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="building.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: focused ? Colors.primary[600] : Colors.primary[500],
              borderRadius: 28,
              width: 56,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              shadowColor: Colors.primary[600],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}>
              <IconSymbol size={28} name="location.fill" color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add-listing"
        options={{
          title: 'İlan Ekle',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          href: null, // Tab bar'da gizle
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null, // Tab bar'da gizle
        }}
      />
    </Tabs>
  );
}
