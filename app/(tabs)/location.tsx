import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LocationScreen() {
  const router = useRouter();
  const [selectedListing, setSelectedListing] = useState<any>(null);

  // Magusa koordinatları ve çevresindeki ev ilanları
  const listings = [
    {
      id: '1',
      title: 'Lüks Villa',
      price: '₺2.500.000',
      rooms: '4+1',
      area: '250 m²',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop',
      coordinate: {
        latitude: 35.1264,
        longitude: 33.9344,
      },
    },
    {
      id: '2',
      title: 'Sahil Dairesi',
      price: '₺1.200.000',
      rooms: '3+1',
      area: '180 m²',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
      coordinate: {
        latitude: 35.1184,
        longitude: 33.9454,
      },
    },
    {
      id: '3',
      title: 'Modern Daire',
      price: '₺850.000',
      rooms: '2+1',
      area: '120 m²',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop',
      coordinate: {
        latitude: 35.1344,
        longitude: 33.9234,
      },
    },
    {
      id: '4',
      title: 'Bahçeli Ev',
      price: '₺1.800.000',
      rooms: '5+2',
      area: '320 m²',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop',
      coordinate: {
        latitude: 35.1124,
        longitude: 33.9564,
      },
    },
    {
      id: '5',
      title: 'Merkez Ofis',
      price: '₺950.000',
      rooms: '2+1',
      area: '110 m²',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300&h=200&fit=crop',
      coordinate: {
        latitude: 35.1384,
        longitude: 33.9384,
      },
    },
  ];

  const handleMarkerPress = (listing: any) => {
    console.log('Marker pressed:', listing.title);
    setSelectedListing(listing);
  };

  const handleMarkerDirectPress = (listing: any) => {
    console.log('Marker direct press:', listing.title);
    router.push(`/listing/${listing.id}`);
  };

  const handleListingCardPress = (listing: any) => {
    console.log('Listing card pressed:', listing.title);
    router.push(`/listing/${listing.id}`);
  };

  const handleMapPress = () => {
    setSelectedListing(null);
  };

  return (
    <View style={styles.container}>
      {/* Geri Butonu */}
      <SafeAreaView style={styles.backButtonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Bilgi Mesajı */}
      <SafeAreaView style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color={Colors.primary[600]} />
          <Text style={styles.infoText}>
            Pin'e tıklayın: Detay sayfasına gidin • Uzun basın: Önizleme gösterin
          </Text>
        </View>
      </SafeAreaView>

      {/* Tam Ekran Harita */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.1264,
          longitude: 33.9344,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            coordinate={listing.coordinate}
            onPress={(e) => {
              e.stopPropagation();
              handleMarkerPress(listing);
            }}
          >
            <TouchableOpacity 
              onPress={() => handleMarkerDirectPress(listing)}
              onLongPress={() => handleMarkerPress(listing)}
              style={styles.markerContainer}
            >
              <View style={styles.marker}>
                <Ionicons name="home" size={20} color="white" />
              </View>
              <View style={styles.markerArrow} />
            </TouchableOpacity>
          </Marker>
        ))}
      </MapView>

      {/* Seçili İlan Detayı */}
      {selectedListing && (
        <TouchableOpacity 
          style={styles.listingCard}
          onPress={() => handleListingCardPress(selectedListing)}
        >
          <Image 
            source={{ uri: selectedListing.image }} 
            style={styles.listingImage}
          />
          <View style={styles.listingInfo}>
            <Text style={styles.listingTitle}>{selectedListing.title}</Text>
            <Text style={styles.listingDetails}>
              {selectedListing.rooms} • {selectedListing.area}
            </Text>
            <Text style={styles.listingPrice}>{selectedListing.price}</Text>
            <View style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Detayları Gör</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary[600]} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    paddingTop: Spacing.sm,
    paddingLeft: Spacing.lg,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  map: {
    width: width,
    height: height,
  },
  markerContainer: {
    alignItems: 'center',
  },
     marker: {
     backgroundColor: Colors.primary[600],
     borderRadius: 25,
     width: 50,
     height: 50,
     alignItems: 'center',
     justifyContent: 'center',
     borderWidth: 3,
     borderColor: 'white',
     ...Shadows.md,
   },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.primary[600],
    marginTop: -2,
  },
  listingCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    ...Shadows.xl,
  },
  listingImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
  },
  listingInfo: {
    flex: 1,
  },
  listingTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  listingDetails: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  listingPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  detailButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary[600],
    marginRight: Spacing.xs,
  },
  infoContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.md,
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
    flex: 1,
  },
}); 