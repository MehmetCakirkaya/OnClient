import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocationScreen() {
  const router = useRouter();

  const nearbyListings = [
    { id: '1', title: 'Lüks Villa', distance: '0.5 km', price: '₺2.5M' },
    { id: '2', title: 'Modern Daire', distance: '1.2 km', price: '₺850K' },
    { id: '3', title: 'Deniz Manzaralı', distance: '2.1 km', price: '₺1.2M' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Konum & Harita</Text>
          <Text style={styles.headerSubtitle}>Yakındaki ilanları keşfedin</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <LinearGradient
              colors={[Colors.primary[200], Colors.primary[300]]}
              style={styles.mapPlaceholder}
            >
              <Ionicons name="map" size={64} color={Colors.primary[600]} />
              <Text style={styles.mapText}>Harita Yükleniyor...</Text>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="location-outline" size={24} color={Colors.primary[600]} />
              <Text style={styles.actionText}>Konumum</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="search-outline" size={24} color={Colors.primary[600]} />
              <Text style={styles.actionText}>Ara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="filter-outline" size={24} color={Colors.primary[600]} />
              <Text style={styles.actionText}>Filtrele</Text>
            </TouchableOpacity>
          </View>

          {/* Nearby Listings */}
          <View style={styles.nearbyContainer}>
            <Text style={styles.sectionTitle}>Yakındaki İlanlar</Text>
            {nearbyListings.map((listing) => (
              <TouchableOpacity key={listing.id} style={styles.nearbyItem}>
                <LinearGradient
                  colors={[Colors.surface, Colors.primary[50]]}
                  style={styles.nearbyItemGradient}
                >
                  <View style={styles.nearbyIcon}>
                    <Ionicons name="home" size={24} color={Colors.primary[600]} />
                  </View>
                  <View style={styles.nearbyInfo}>
                    <Text style={styles.nearbyTitle}>{listing.title}</Text>
                    <Text style={styles.nearbyDistance}>{listing.distance}</Text>
                  </View>
                  <Text style={styles.nearbyPrice}>{listing.price}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Spacing.tabBarHeight,
  },
  mapContainer: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.lg,
  },
  mapPlaceholder: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: FontSizes.base,
    color: Colors.primary[700],
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  actionText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  nearbyContainer: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  nearbyItem: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  nearbyItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  nearbyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  nearbyInfo: {
    flex: 1,
  },
  nearbyTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  nearbyDistance: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  nearbyPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary[600],
  },
}); 