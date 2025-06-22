import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/Theme';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  campaign: string;
  status: 'not-contacted' | 'contacted' | 'converted' | 'not-interested';
  createdAt: string;
  lastContactDate?: string;
  notes: number;
}

export default function CustomersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - gerçek uygulamada Redux'tan gelecek
  const customers: Customer[] = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@email.com',
      phone: '+90 555 123 4567',
      campaign: 'Yazılım Kursu',
      status: 'not-contacted',
      createdAt: '2024-01-15',
      notes: 0,
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      email: 'ayse@email.com',
      phone: '+90 555 234 5678',
      campaign: 'Dijital Pazarlama',
      status: 'contacted',
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
      status: 'converted',
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
      status: 'not-contacted',
      createdAt: '2024-01-11',
      notes: 0,
    },
  ];

  const filters = [
    { id: 'all', label: 'Tümü', count: customers.length },
    { id: 'not-contacted', label: 'Aranmadı', count: customers.filter(c => c.status === 'not-contacted').length },
    { id: 'contacted', label: 'Arandı', count: customers.filter(c => c.status === 'contacted').length },
    { id: 'converted', label: 'Dönüştü', count: customers.filter(c => c.status === 'converted').length },
    { id: 'not-interested', label: 'İlgilenmiyor', count: customers.filter(c => c.status === 'not-interested').length },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'not-contacted':
        return { backgroundColor: '#fef2f2', color: '#dc2626' };
      case 'contacted':
        return { backgroundColor: Colors.brand.cream, color: Colors.primary[600] };
      case 'converted':
        return { backgroundColor: Colors.success[100], color: Colors.success[600] };
      case 'not-interested':
        return { backgroundColor: Colors.gray[100], color: Colors.gray[500] };
      default:
        return { backgroundColor: Colors.gray[100], color: Colors.gray[600] };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not-contacted':
        return 'Aranmadı';
      case 'contacted':
        return 'Arandı';
      case 'converted':
        return 'Dönüştü';
      case 'not-interested':
        return 'İlgilenmiyor';
      default:
        return 'Bilinmiyor';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    
    const matchesFilter = selectedFilter === 'all' || customer.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[50]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Müşteriler</Text>
            <TouchableOpacity 
              onPress={() => router.push('/customers/add')}
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
        </View>

              {/* Filters */}
        <View style={styles.filtersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={styles.filterButton}
              >
                <LinearGradient
                  colors={selectedFilter === filter.id 
                    ? [Colors.primary[500], Colors.primary[600]] 
                    : [Colors.surface, Colors.primary[50]]
                  }
                  style={styles.filterButtonGradient}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedFilter === filter.id ? styles.filterButtonTextActive : styles.filterButtonTextInactive
                  ]}>
                    {filter.label} ({filter.count})
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      {/* Customer List */}
      <ScrollView style={styles.listContainer}>
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
                onPress={() => router.push(`/customers/${customer.id}`)}
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
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm + 2,
    color: Colors.text.primary,
    fontSize: FontSizes.base,
  },
  filtersSection: {
    paddingVertical: Spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: Spacing.lg,
  },
  filterButton: {
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    ...Shadows.sm,
  },
  filterButtonGradient: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary[300],
    minHeight: 36,
  },
  filterButtonText: {
    fontWeight: '500',
    fontSize: FontSizes.sm,
  },
  filterButtonTextActive: {
    color: Colors.text.onPrimary,
  },
  filterButtonTextInactive: {
    color: Colors.primary[700],
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
  },
  customerCard: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm + 2,
    ...Shadows.md,
  },
  customerCardGradient: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary[200],
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
}); 