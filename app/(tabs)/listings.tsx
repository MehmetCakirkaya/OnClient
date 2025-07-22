import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ListingsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const listings = [
    {
      id: '1',
      title: 'Lüks Villa',
      location: 'Beşiktaş, İstanbul',
      price: 2500000,
      type: 'Villa',
      rooms: '4+1',
      area: 250,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      rating: 4.8,
      isNew: true,
      status: 'Satılık',
    },
    {
      id: '2',
      title: 'Modern Daire',
      location: 'Kadıköy, İstanbul',
      price: 850000,
      type: 'Daire',
      rooms: '2+1',
      area: 120,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      rating: 4.6,
      isNew: true,
      status: 'Satılık',
    },
    {
      id: '3',
      title: 'Deniz Manzaralı Daire',
      location: 'Üsküdar, İstanbul',
      price: 1200000,
      type: 'Daire',
      rooms: '3+1',
      area: 180,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      rating: 4.9,
      isNew: false,
      status: 'Satılık',
    },
  ];

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₺${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `₺${(price / 1000).toFixed(0)}K`;
    }
    return `₺${price}`;
  };

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>İlanlar</Text>
          <Text style={styles.headerSubtitle}>{filteredListings.length} ilan bulundu</Text>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={Colors.text.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="İlan ara..."
              placeholderTextColor={Colors.text.secondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        {/* Listings */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listingsContainer}>
            {filteredListings.map((listing) => (
              <TouchableOpacity 
                key={listing.id}
                style={styles.listingCard}
                onPress={() => console.log('İlan detayı:', listing.id)}
              >
                <LinearGradient
                  colors={[Colors.surface, Colors.primary[50]]}
                  style={styles.listingCardGradient}
                >
                  <View style={styles.listingImageContainer}>
                    <Image source={{ uri: listing.image }} style={styles.listingImage} />
                    {listing.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>YENİ</Text>
                      </View>
                    )}
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusBadgeText}>{listing.status}</Text>
                    </View>
                    <TouchableOpacity style={styles.favoriteButton}>
                      <Ionicons name="heart-outline" size={20} color={Colors.text.onPrimary} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.listingContent}>
                    <View style={styles.listingHeader}>
                      <Text style={styles.listingTitle}>{listing.title}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{listing.rating}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.locationContainer}>
                      <Ionicons name="location-outline" size={16} color={Colors.text.secondary} />
                      <Text style={styles.locationText}>{listing.location}</Text>
                    </View>
                    
                    <View style={styles.propertyDetails}>
                      <View style={styles.detailItem}>
                        <Ionicons name="home-outline" size={16} color={Colors.primary[600]} />
                        <Text style={styles.detailText}>{listing.rooms}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Ionicons name="resize-outline" size={16} color={Colors.primary[600]} />
                        <Text style={styles.detailText}>{listing.area} m²</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Ionicons name="business-outline" size={16} color={Colors.primary[600]} />
                        <Text style={styles.detailText}>{listing.type}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.priceContainer}>
                      <Text style={styles.listingPrice}>{formatPrice(listing.price)}</Text>
                      <Text style={styles.priceLabel}>{listing.status}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Simple Filter Modal */}
        <Modal
          visible={isFilterModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsFilterModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <LinearGradient
              colors={[Colors.primary[100], Colors.primary[50]]}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
                  <Ionicons name="close" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Filtreler</Text>
                <View style={{ width: 24 }} />
              </View>

              <View style={styles.modalContent}>
                <Text style={styles.comingSoonText}>Filtreleme özellikleri yakında gelecek!</Text>
                
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setIsFilterModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </SafeAreaView>
        </Modal>
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
    paddingBottom: Spacing.sm,
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
    paddingVertical: Spacing.md,
    marginLeft: Spacing.sm,
  },
  filterButton: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Spacing.tabBarHeight,
  },
  listingsContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  listingCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.lg,
  },
  listingCardGradient: {
    flex: 1,
  },
  listingImageContainer: {
    position: 'relative',
    height: 200,
  },
  listingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.success[500],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  newBadgeText: {
    color: Colors.text.onPrimary,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  statusBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: 50,
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusBadgeText: {
    color: Colors.text.onPrimary,
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  listingContent: {
    padding: Spacing.lg,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  listingTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.primary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  ratingText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  locationText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  propertyDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  detailText: {
    fontSize: FontSizes.xs,
    color: Colors.primary[700],
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingPrice: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.primary[600],
  },
  priceLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalGradient: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary[200],
  },
  modalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  comingSoonText: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  closeButton: {
    backgroundColor: Colors.primary[600],
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    ...Shadows.md,
  },
  closeButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.onPrimary,
  },
}); 