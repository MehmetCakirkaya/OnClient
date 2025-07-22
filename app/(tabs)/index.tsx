import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  
  const stats = [
    { 
      title: 'Toplam Müşteri', 
      value: '24', 
      icon: 'people', 
      color: Colors.primary[500],
      change: '+12%',
      changeType: 'positive'
    },
    { 
      title: 'Aktif Kampanya', 
      value: '8', 
      icon: 'trending-up', 
      color: Colors.success[500],
      change: '+3',
      changeType: 'positive'
    },
    { 
      title: 'Bekleyen Görev', 
      value: '5', 
      icon: 'time', 
      color: Colors.warning,
      change: '-2',
      changeType: 'negative'
    },
    { 
      title: 'Bu Ay Gelir', 
      value: '₺12.5K', 
      icon: 'wallet', 
      color: Colors.primary[600],
      change: '+8%',
      changeType: 'positive'
    },
  ];

  const quickActions = [
    { title: 'İlan Ekle', icon: 'add-circle', color: Colors.primary[500], onPress: () => router.push('/(tabs)/add-listing' as any) },
    { title: 'Yeni Müşteri', icon: 'person-add', color: Colors.success[500], onPress: () => router.push('/(modal)/add-customer' as any) },
    { title: 'Kampanya', icon: 'megaphone', color: Colors.info, onPress: () => console.log('Kampanya') },
    { title: 'Rapor Al', icon: 'document-text', color: '#f59e0b', onPress: () => console.log('Rapor') },
  ];

  const recentListings = [
    {
      id: '1',
      title: 'Lüks Villa',
      location: 'Beşiktaş, İstanbul',
      price: '₺2.500.000',
      type: 'Villa',
      rooms: '4+1',
      area: '250 m²',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      rating: 4.8,
      isNew: true
    },
    {
      id: '2',
      title: 'Modern Daire',
      location: 'Kadıköy, İstanbul',
      price: '₺850.000',
      type: 'Daire',
      rooms: '2+1',
      area: '120 m²',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      rating: 4.6,
      isNew: true
    },
    {
      id: '3',
      title: 'Deniz Manzaralı',
      location: 'Üsküdar, İstanbul',
      price: '₺1.200.000',
      type: 'Daire',
      rooms: '3+1',
      area: '180 m²',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      rating: 4.9,
      isNew: false
    },
    {
      id: '4',
      title: 'Bahçeli Ev',
      location: 'Sarıyer, İstanbul',
      price: '₺3.200.000',
      type: 'Müstakil Ev',
      rooms: '5+2',
      area: '320 m²',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
      rating: 4.7,
      isNew: true
    },
    {
      id: '5',
      title: 'Şehir Merkezi',
      location: 'Şişli, İstanbul',
      price: '₺950.000',
      type: 'Daire',
      rooms: '2+1',
      area: '110 m²',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
      rating: 4.5,
      isNew: false
    },
    {
      id: '6',
      title: 'Tarihi Konak',
      location: 'Fatih, İstanbul',
      price: '₺4.500.000',
      type: 'Konak',
      rooms: '6+3',
      area: '450 m²',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      rating: 4.8,
      isNew: true
    },
  ];

  const renderListingCard = ({ item }: { item: typeof recentListings[0] }) => (
    <TouchableOpacity 
      style={styles.listingCard}
      onPress={() => console.log('İlan detayı:', item.id)}
    >
      <View style={styles.listingImageContainer}>
        <Image source={{ uri: item.image }} style={styles.listingImage} />
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>YENİ</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color={Colors.text.onPrimary} />
        </TouchableOpacity>
      </View>
      
      <LinearGradient
        colors={[Colors.surface, Colors.primary[50]]}
        style={styles.listingInfo}
      >
        <View style={styles.listingHeader}>
          <Text style={styles.listingTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color={Colors.text.secondary} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        <View style={styles.propertyDetails}>
          <View style={styles.propertyTag}>
            <Text style={styles.propertyTagText}>{item.rooms}</Text>
          </View>
          <View style={styles.propertyTag}>
            <Text style={styles.propertyTagText}>{item.area}</Text>
          </View>
          <View style={styles.propertyTag}>
            <Text style={styles.propertyTagText}>{item.type}</Text>
          </View>
        </View>
        
        <Text style={styles.listingPrice}>{item.price}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Hoş Geldiniz 👋</Text>
              <Text style={styles.headerTitle}>OnClient Dashboard</Text>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Genel Durum</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.statCardGradient}
                  >
                    <View style={styles.statHeader}>
                      <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                        <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                      </View>
                      <View style={[
                        styles.changeIndicator,
                        { backgroundColor: stat.changeType === 'positive' ? Colors.success[50] : Colors.error + '20' }
                      ]}>
                        <Text style={[
                          styles.changeText,
                          { color: stat.changeType === 'positive' ? Colors.success[600] : Colors.error }
                        ]}>
                          {stat.change}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statTitle}>{stat.title}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Hızlı Eylemler</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.quickActionCard}
                  onPress={action.onPress}
                >
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.quickActionGradient}
                  >
                    <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                      <Ionicons name={action.icon as any} size={28} color={action.color} />
                    </View>
                    <Text style={styles.quickActionTitle}>{action.title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Listings */}
          <View style={styles.recentContainer}>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>Yeni Eklenen İlanlar</Text>
              <TouchableOpacity onPress={() => console.log('Tüm ilanları gör')}>
                <Text style={styles.viewAllText}>Tümünü Gör</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentListings}
              renderItem={renderListingCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listingsContainer}
              ItemSeparatorComponent={() => <View style={{ width: Spacing.md }} />}
            />
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
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  scrollViewContent: {
    paddingBottom: Spacing.tabBarHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  welcomeText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
  },
  statsContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  statCardGradient: {
    padding: Spacing.lg,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeIndicator: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  changeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  statValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  quickActionsContainer: {
    marginBottom: Spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  quickActionGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  quickActionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
  },
  recentContainer: {
    marginBottom: Spacing.xl,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  viewAllText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
    fontWeight: '600',
  },
  listingsContainer: {
    paddingLeft: Spacing.xs,
  },
  listingCard: {
    width: width * 0.7,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    ...Shadows.lg,
  },
  listingImageContainer: {
    position: 'relative',
    height: 180,
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
  favoriteButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  listingInfo: {
    padding: Spacing.lg,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  listingTitle: {
    fontSize: FontSizes.lg,
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
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  propertyDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  propertyTag: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  propertyTagText: {
    fontSize: FontSizes.xs,
    color: Colors.primary[700],
    fontWeight: '600',
  },
  listingPrice: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.primary[600],
  },
});

