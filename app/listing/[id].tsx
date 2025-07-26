// @ts-nocheck
export const unstable_settings = {
  headerShown: false,
};

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  // Fake listing data - gerçek uygulamada API'den gelecek
  const listingData = {
    id: id,
    title: 'Lüks Villa - Deniz Manzaralı',
    roomType: '4+1',
    address: 'Beşiktaş, İstanbul',
    price: '2.500.000',
    currency: '₺',
    description: 'Deniz manzaralı, lüks villa. Modern tasarım ve kaliteli malzemelerle inşa edilmiş. Geniş bahçe ve özel havuz ile.',
    squareMeters: '250',
    landSize: '500',
    bedrooms: '4',
    bathrooms: '3',
    toilets: '2',
    houseType: 'Villa',
    floor: 'Bahçe Katı',
    totalFloors: '2',
    condition: 'Sıfır',
    yearBuilt: '2023',
    rentalPeriod: 'Uzun Dönem',
    features: [
      'Havuz',
      'Bahçe',
      'Güvenlik',
      'Otopark',
      'Klima',
      'Şömine',
      'Deniz Manzarası',
      'Asansör'
    ],
    media: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
    ],
    location: {
      latitude: 41.0082,
      longitude: 28.9784,
    },
  };

  // Mock team members and customers data
  const teamMembers = [
    { id: '1', name: 'Ahmet Yılmaz', role: 'Emlak Danışmanı', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: '2', name: 'Fatma Kaya', role: 'Satış Müdürü', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  ];

  const customers = [
    { id: '1', name: 'Mehmet Demir', role: 'Müşteri', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  ];

  const addedTeamMembers = ['1', '2'];
  const addedCustomers = ['1'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary[100] }}>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.primary[100] }}>
        {/* Fotoğraf Slider ve Üst Butonlar */}
        <View style={{ position: 'relative', width: '100%' }}>
          <FlatList
            data={listingData.media}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={e => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / Dimensions.get('window').width
              );
              setCurrentImageIndex(index);
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsImageViewVisible(true)}
                style={{ width: Dimensions.get('window').width, height: 340 }}
              >
                <Image
                  source={{ uri: item }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            style={{ flexGrow: 0 }}
            snapToInterval={Dimensions.get('window').width}
            decelerationRate="fast"
          />
          {/* Üstteki Butonlar */}
          <View style={{ position: 'absolute', top: 40, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, zIndex: 10 }}>
            <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 }} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 }}>
                <Ionicons name="heart-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 }}>
                <Ionicons name="share-social-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <ImageViewing
            images={listingData.media.map(uri => ({ uri }))}
            imageIndex={currentImageIndex}
            visible={isImageViewVisible}
            onRequestClose={() => setIsImageViewVisible(false)}
          />
        </View>
        {/* Alt Kutu - Modern Tasarım */}
        <View
          style={{
            marginTop: -40,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            padding: 24,
            paddingTop: 40,
            backgroundColor: Colors.primary[100],
            minHeight: 500, // Scroll için yeterli alan
          }}
        >
          {/* Başlık ve Fiyat */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111', marginBottom: 8 }} numberOfLines={2}>
                {listingData.title || 'İlan Başlığı'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                {listingData.roomType && (
                   <View style={{ backgroundColor: '#7c3aed', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                     <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{listingData.roomType}</Text>
                   </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}>
                  <Ionicons name="location-outline" size={16} color={'#555'} style={{ marginRight: 4 }} />
                  <Text style={{ color: '#333', fontSize: 15 }} numberOfLines={1}>
                    {listingData.address || 'Konum Bilgisi'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', marginLeft: 12 }}>
              <Text style={{ color: '#111', fontSize: 26, fontWeight: '800' }}>
                {listingData.price ? `${listingData.price}${listingData.currency}` : '₺0'}
              </Text>
              <Text style={{ color: '#555', fontSize: 16, fontWeight: '500' }}>/ay</Text>
            </View>
          </View>
          
          <View style={{ borderBottomColor: Colors.gray[300], borderBottomWidth: 1, marginVertical: 20 }} />

          {/* Açıklama */}
          {listingData.description && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 8 }}>Açıklama</Text>
              <Text style={{ color: '#444', fontSize: 16, lineHeight: 24 }}>
                {listingData.description}
              </Text>
            </View>
          )}

          {/* Detaylar Listesi */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 12 }}>Detaylar</Text>
            {[
              { label: 'Metrekare (Net)', value: listingData.squareMeters && `${listingData.squareMeters} m²` },
              { label: 'Arsa Boyutu', value: listingData.landSize && `${listingData.landSize} m²` },
              { label: 'Oda Sayısı', value: listingData.bedrooms },
              { label: 'Banyo Sayısı', value: listingData.bathrooms },
              { label: 'Tuvalet Sayısı', value: listingData.toilets },
              { label: 'Bina Tipi', value: listingData.houseType },
              { label: 'Bulunduğu Kat', value: listingData.floor },
              { label: 'Toplam Kat', value: listingData.totalFloors },
              { label: 'Durumu', value: listingData.condition },
              { label: 'Yapım Yılı', value: listingData.yearBuilt },
              { label: 'Kiralama Süresi', value: listingData.rentalPeriod },
            ].filter(item => item.value).map((item, idx) => (
              <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10 }}>
                <Text style={{ color: '#555', fontSize: 16 }}>{item.label}</Text>
                <Text style={{ color: '#111', fontSize: 16, fontWeight: '600' }}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Ek Özellikler */}
          {listingData.features && listingData.features.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 12 }}>Ek Özellikler</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {listingData.features.map((feature, idx) => (
                  <View key={idx} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.gray[300], borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                     <Ionicons name="checkmark-circle-outline" size={16} color={'#7c3aed'} />
                    <Text style={{ color: '#333', fontWeight: '500', fontSize: 15 }}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

           {/* Harita */}
           {listingData.location && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 12 }}>Konum</Text>
              <View style={{ height: 200, borderRadius: 16, overflow: 'hidden' }}>
                <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: listingData.location.latitude,
                    longitude: listingData.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                >
                  <Marker coordinate={listingData.location} />
                </MapView>
              </View>
            </View>
          )}

          {/* İlgili Kişiler */}
          {(addedTeamMembers.length > 0 || addedCustomers.length > 0) && (
            <View style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 12 }}>İlgili Kişiler</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                 {addedTeamMembers.map((memberId, idx) => {
                   const member = teamMembers.find(m => m.id === memberId);
                   if (!member) return null;
                   return (
                     <TouchableOpacity 
                       key={memberId} 
                       style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 8, marginBottom: 10 }}
                       onPress={() => router.push(`/profile/${memberId}?type=team`)}
                     >
                       <Image source={{ uri: member.avatar }} style={{ width: 24, height: 24, borderRadius: 12, marginRight: 6 }} />
                       <Text style={{ color: '#333', fontWeight: '500', fontSize: 15 }}>{member.name}</Text>
                     </TouchableOpacity>
                   );
                 })}
                                 {addedCustomers.map((customerId, idx) => {
                   const customer = customers.find(c => c.id === customerId);
                   if (!customer) return null;
                   return (
                     <TouchableOpacity 
                       key={customerId} 
                       style={{ backgroundColor: '#f0fdfa', borderWidth: 1, borderColor: '#bae6fd', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 8, marginBottom: 10 }}
                       onPress={() => router.push(`/profile/${customerId}?type=customer`)}
                     >
                       <Image source={{ uri: customer.avatar }} style={{ width: 24, height: 24, borderRadius: 12, marginRight: 6 }} />
                       <Text style={{ color: '#0e7490', fontWeight: '500', fontSize: 15 }}>{customer.name}</Text>
                     </TouchableOpacity>
                   );
                 })}
              </View>
            </View>
          )}

          {/* İletişim Butonları */}
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 10, marginBottom: 30 }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 16, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ color: '#333', fontWeight: '700', fontSize: 16 }}>Ara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#7c3aed', paddingVertical: 16, borderRadius: 14, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Mesaj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 