import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LocationIcon from '@/assets/images/tab-bar/pin.svg';
import AddIcon from '@/assets/images/tab-bar/add.svg';

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
        tabBarActiveTintColor: Colors.primary[600], // Mor renk
        tabBarInactiveTintColor: Colors.primary[400], // Açık mor
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
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 20,
            height: 90,
          },
          default: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 20,
            height: 90,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('@/assets/images/tab-bar/dashboard.png')}
              style={{ 
                width: 28, 
                height: 28
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: 'İlanlar',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('@/assets/images/tab-bar/apartment.png')}
              style={{ 
                width: 28, 
                height: 28
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: '',
          tabBarStyle: { display: 'none' },
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: focused ? Colors.primary[400] : Colors.primary[300],
              borderRadius: 28,
              width: 56,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
              shadowColor: Colors.primary[600],
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}>
              <Image 
                source={require('@/assets/images/tab-bar/destination.png')}
                style={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 28 
                }}
                resizeMode="cover"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add-listing"
        options={{
          title: 'İlan Ekle',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('@/assets/images/tab-bar/add.png')}
              style={{ 
                width: 28, 
                height: 28
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('@/assets/images/tab-bar/user.png')}
              style={{ 
                width: 28, 
                height: 28
              }}
              resizeMode="contain"
            />
          ),
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
