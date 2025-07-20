import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
        return 'Bilinmiyor';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    
    // TODO: Apply active filters from modal
    return matchesSearch;
  });

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
                onPress={() => console.log('Add customer')}
                style={styles.addButton}
              >
                <LinearGradient
                  colors={[Colors.primary[500], Colors.primary[600]]}
                  style={styles.addButtonGradient}
                >
                  <Ionicons name="add" size={20} color="white" />
                  <Text style={styles.addButtonText}>Ekle</Text>
                </LinearGradient>
              </TouchableOpacity>
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

          {/* Active Filter Tags */}
          {activeFilters.length > 0 && (
            <View style={styles.activeFiltersContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.activeFiltersContent}
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
        </View>

      {/* Customer List */}
      <ScrollView 
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
      >
        {filteredCustomers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={Colors.gray[400]} />
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz müşteri yok'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Farklı bir arama terimi deneyin' : 'İlk müşterinizi ekleyin'}
            </Text>
          </View>
        ) : (
          <View style={styles.listContent}>
            {filteredCustomers.map((customer) => (
              <TouchableOpacity
                key={customer.id}
                onPress={() => router.push(`/(modal)/customer-detail?id=${customer.id}` as any)}
                style={styles.customerCard}
              >
                <LinearGradient
                  colors={[Colors.surface, Colors.primary[50]]}
                  style={styles.customerCardGradient}
                >
                  <View style={styles.customerHeader}>
                    <View style={styles.customerInfo}>
                      <Text style={styles.customerName}>
                        {customer.name}
                      </Text>
                      <Text style={styles.customerEmail}>{customer.email}</Text>
                      <Text style={styles.customerPhone}>{customer.phone}</Text>
                    </View>
                    <View style={styles.customerMeta}>
                      <View style={[styles.statusBadge, getStatusStyle(customer.status)]}>
                        <Text style={[styles.statusText, { color: getStatusStyle(customer.status).color }]}>
                          {getStatusText(customer.status)}
                        </Text>
                      </View>
                      <Text style={styles.dateText}>
                        {new Date(customer.createdAt).toLocaleDateString('tr-TR')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customerFooter}>
                    <View style={styles.leftFooter}>
                      <View style={styles.campaignBadge}>
                        <Text style={styles.campaignText}>{customer.campaign}</Text>
                      </View>
                      {customer.notes > 0 && (
                        <View style={styles.notesContainer}>
                          <Ionicons name="document-text" size={14} color={Colors.gray[500]} />
                          <Text style={styles.notesText}>{customer.notes} not</Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.actionsContainer}>
                      <TouchableOpacity style={styles.actionButtonCall}>
                        <Ionicons name="call" size={16} color={Colors.success[600]} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButtonMail}>
                        <Ionicons name="mail" size={16} color={Colors.primary[600]} />
                      </TouchableOpacity>
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
  addButton: {
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  addButtonGradient: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.text.onPrimary,
    fontWeight: '500',
    marginLeft: Spacing.xs,
    fontSize: FontSizes.base,
  },
  searchContainer: {
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm + 2,
    color: Colors.text.primary,
    fontSize: FontSizes.base,
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl + 12,
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: Colors.text.secondary,
    marginTop: Spacing.md,
  },
  emptySubtitle: {
    color: Colors.text.light,
    textAlign: 'center',
    marginTop: Spacing.sm,
    fontSize: FontSizes.sm,
  },
  listContent: {
    gap: Spacing.sm + 2,
    paddingBottom: Spacing.tabBarHeight,
  },
  customerCard: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm + 2,
    ...Shadows.md,
  },
  customerCardGradient: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm + 2,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  customerEmail: {
    color: Colors.text.secondary,
    fontSize: FontSizes.sm,
    marginBottom: 2,
  },
  customerPhone: {
    color: Colors.text.secondary,
    fontSize: FontSizes.sm,
  },
  customerMeta: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
  },
  dateText: {
    color: Colors.text.light,
    fontSize: FontSizes.xs,
  },
  customerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: Colors.primary[200],
  },
  leftFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  campaignBadge: {
    backgroundColor: Colors.brand.lightPurple,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  campaignText: {
    color: Colors.primary[700],
    fontSize: FontSizes.xs,
    fontWeight: '500',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.sm + 2,
  },
  notesText: {
    color: Colors.text.secondary,
    fontSize: FontSizes.xs,
    marginLeft: Spacing.xs,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButtonCall: {
    backgroundColor: Colors.success[100],
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  actionButtonMail: {
    backgroundColor: Colors.brand.lightPurple,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  actionButtonMore: {
    backgroundColor: Colors.gray[100],
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  // Filter-related styles
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    overflow: 'visible',
  },
  filterButton: {
    position: 'relative',
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    overflow: 'visible',
    ...Shadows.sm,
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: Colors.text.onPrimary,
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  activeFiltersContainer: {
    marginTop: Spacing.sm,
  },
  activeFiltersContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterTag: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  filterTagGradient: {
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  filterTagText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[700],
    fontWeight: '500',
    marginRight: Spacing.xs,
  },
  filterTagClose: {
    backgroundColor: Colors.primary[300],
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 