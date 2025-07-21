import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  campaign: string;
  status: 'interested' | 'not-interested' | 'uncertain';
  createdAt: string;
  lastContactDate?: string;
  notes: number;
}

export default function CustomersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Arandı', 'Web Tasarım', 'Son 7 gün'
  ]);

  // Mock data - gerçek uygulamada Redux'tan gelecek
  const customers: Customer[] = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@email.com',
      phone: '+90 555 123 4567',
      campaign: 'Yazılım Kursu',
      status: 'uncertain',
      createdAt: '2024-01-15',
      notes: 0,
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      email: 'ayse@email.com',
      phone: '+90 555 234 5678',
      campaign: 'Dijital Pazarlama',
      status: 'interested',
      createdAt: '2024-01-14',
      lastContactDate: '2024-01-16',
      notes: 2,
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      email: 'mehmet@email.com',
      phone: '+90 555 345 6789',
      campaign: 'Web Tasarım',
      status: 'interested',
      createdAt: '2024-01-13',
      lastContactDate: '2024-01-15',
      notes: 1,
    },
    {
      id: 4,
      name: 'Fatma Şahin',
      email: 'fatma@email.com',
      phone: '+90 555 456 7890',
      campaign: 'Mobil Uygulama',
      status: 'not-interested',
      createdAt: '2024-01-12',
      lastContactDate: '2024-01-14',
      notes: 1,
    },
    {
      id: 5,
      name: 'Ali Özkan',
      email: 'ali@email.com',
      phone: '+90 555 567 8901',
      campaign: 'E-ticaret',
      status: 'uncertain',
      createdAt: '2024-01-11',
      notes: 0,
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'interested':
        return { backgroundColor: Colors.success[100], color: Colors.success[600] };
      case 'not-interested':
        return { backgroundColor: '#fef2f2', color: '#dc2626' };
      case 'uncertain':
        return { backgroundColor: Colors.gray[100], color: Colors.gray[500] };
      default:
        return { backgroundColor: Colors.gray[100], color: Colors.gray[600] };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'interested':
        return 'İlgileniyor';
      case 'not-interested':
        return 'İlgilenmiyor';
      case 'uncertain':
        return 'Belirsiz';
      default:
        return 'Belirsiz';
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} gün önce`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.primary[900] }]}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Müşteriler</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                onPress={() => router.push('/(modal)/customer-filters')}
                style={styles.filterButton}
              >
                <Ionicons 
                  name="funnel" 
                  size={18} 
                  color={Colors.primary[600]} 
                />
                {activeFilters.length > 0 && (
                  <View style={styles.filterBadge}>
                    <Text style={styles.filterBadgeText}>{activeFilters.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push('/(modal)/add-customer')}
                style={styles.addButton}
              >
                <LinearGradient
                  colors={[Colors.primary[500], Colors.primary[600]]}
                  style={styles.addButtonGradient}
                >
                  <Ionicons name="add" size={20} color="white" />
                  <Text style={styles.addButtonText}>Müşteri Ekle</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={[Colors.surface, Colors.primary[50]]}
            style={styles.searchGradient}
          >
            <Ionicons name="search" size={20} color={Colors.gray[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Müşteri ara..."
              placeholderTextColor={Colors.gray[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={Colors.gray[500]} />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <View style={styles.filtersContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContent}
            >
              {activeFilters.map((filter, index) => (
                <View key={index} style={styles.filterTag}>
                  <LinearGradient
                    colors={[Colors.primary[100], Colors.primary[200]]}
                    style={styles.filterTagGradient}
                  >
                    <Text style={styles.filterTagText}>{filter}</Text>
                    <TouchableOpacity
                      onPress={() => setActiveFilters(prev => prev.filter((_, i) => i !== index))}
                      style={styles.filterTagClose}
                    >
                      <Ionicons name="close" size={14} color={Colors.primary[600]} />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Customer List */}
        <ScrollView 
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
        >
          {filteredCustomers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={64} color={Colors.gray[400]} />
              <Text style={styles.emptyTitle}>Müşteri bulunamadı</Text>
              <Text style={styles.emptySubtitle}>
                Arama kriterlerinizi değiştirmeyi deneyin
              </Text>
            </View>
          ) : (
            <View style={styles.customerList}>
              {filteredCustomers.map((customer) => (
                <TouchableOpacity
                  key={customer.id}
                  onPress={() => router.push(`/customer/${customer.id}`)}
                  style={styles.customerCard}
                >
                  <LinearGradient
                    colors={[Colors.surface, Colors.primary[50]]}
                    style={styles.customerCardGradient}
                  >
                    <View style={styles.customerHeader}>
                      <View style={styles.customerInfo}>
                        <Text style={styles.customerName}>{customer.name}</Text>
                        <Text style={styles.customerEmail}>{customer.email}</Text>
                        <Text style={styles.customerPhone}>{customer.phone}</Text>
                      </View>
                      <View style={styles.customerMeta}>
                        <View style={[styles.statusBadge, getStatusStyle(customer.status)]}>
                          <Text style={[styles.statusText, { color: getStatusStyle(customer.status).color }]}>
                            {getStatusText(customer.status)}
                          </Text>
                        </View>
                        <Text style={styles.customerDate}>
                          {formatDate(customer.createdAt)}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.customerDetails}>
                      <View style={styles.customerCampaign}>
                        <Ionicons name="megaphone-outline" size={14} color={Colors.primary[600]} />
                        <Text style={styles.campaignText}>{customer.campaign}</Text>
                      </View>
                      
                      <View style={styles.customerStats}>
                        <View style={styles.statItem}>
                          <Ionicons name="chatbubbles-outline" size={14} color={Colors.gray[500]} />
                          <Text style={styles.statText}>{customer.notes} not</Text>
                        </View>
                        {customer.lastContactDate && (
                          <View style={styles.statItem}>
                            <Ionicons name="time-outline" size={14} color={Colors.gray[500]} />
                            <Text style={styles.statText}>
                              {getDaysAgo(customer.lastContactDate)}
                            </Text>
                          </View>
                        )}
                        <TouchableOpacity style={styles.actionButtonMore}>
                          <Ionicons name="chevron-forward" size={16} color={Colors.gray[500]} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
    paddingVertical: Spacing.md,
    overflow: 'visible',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  filterButton: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
    position: 'relative',
    ...Shadows.sm,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary[500],
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: FontSizes.sm,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  filtersContainer: {
    paddingBottom: Spacing.md,
  },
  filtersContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterTag: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  filterTagGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  filterTagText: {
    color: Colors.primary[700],
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  filterTagClose: {
    backgroundColor: Colors.primary[300],
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.tabBarHeight + Spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  customerList: {
    gap: Spacing.md,
  },
  customerCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  customerCardGradient: {
    padding: Spacing.lg,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  customerEmail: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  customerMeta: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  customerDate: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
  },
  customerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerCampaign: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  campaignText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  customerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
  },
  actionButtonMore: {
    padding: 4,
  },
}); 