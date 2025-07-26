// @ts-nocheck
export const unstable_settings = {
  headerShown: false,
};

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Theme';

export default function EmployeesScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock employees data
  const employees = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      role: 'Emlak Danışmanı',
      department: 'Satış',
      email: 'ahmet@company.com',
      phone: '+90 532 123 45 67',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      activeListings: 12,
      soldListings: 45,
      totalSales: '₺15.2M',
      rating: 4.8,
      isOnline: true,
      joinDate: '2019-03-15',
      experience: '5 yıl',
      specialization: 'Lüks Konutlar',
    },
    {
      id: '2',
      name: 'Fatma Kaya',
      role: 'Satış Müdürü',
      department: 'Satış',
      email: 'fatma@company.com',
      phone: '+90 532 987 65 43',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      activeListings: 8,
      soldListings: 78,
      totalSales: '₺28.5M',
      rating: 4.9,
      isOnline: false,
      joinDate: '2016-01-10',
      experience: '8 yıl',
      specialization: 'Ticari Gayrimenkul',
    },
    {
      id: '3',
      name: 'Mehmet Özkan',
      role: 'Pazarlama Uzmanı',
      department: 'Pazarlama',
      email: 'mehmet@company.com',
      phone: '+90 532 456 78 90',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      activeListings: 0,
      soldListings: 0,
      totalSales: '₺0',
      rating: 4.5,
      isOnline: true,
      joinDate: '2020-07-20',
      experience: '4 yıl',
      specialization: 'Dijital Pazarlama',
    },
    {
      id: '4',
      name: 'Ayşe Demir',
      role: 'Emlak Danışmanı',
      department: 'Satış',
      email: 'ayse@company.com',
      phone: '+90 532 321 54 76',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      activeListings: 15,
      soldListings: 32,
      totalSales: '₺8.7M',
      rating: 4.7,
      isOnline: true,
      joinDate: '2021-02-12',
      experience: '3 yıl',
      specialization: 'Konut Satışı',
    },
    {
      id: '5',
      name: 'Can Yıldız',
      role: 'İnsan Kaynakları',
      department: 'İK',
      email: 'can@company.com',
      phone: '+90 532 654 32 10',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      activeListings: 0,
      soldListings: 0,
      totalSales: '₺0',
      rating: 4.6,
      isOnline: false,
      joinDate: '2018-11-05',
      experience: '6 yıl',
      specialization: 'Personel Yönetimi',
    },
  ];

  const departments = ['all', 'Satış', 'Pazarlama', 'İK'];
  const roles = ['all', 'Emlak Danışmanı', 'Satış Müdürü', 'Pazarlama Uzmanı', 'İnsan Kaynakları'];

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchText.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesRole = selectedRole === 'all' || employee.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const renderEmployeeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.employeeCard}
      onPress={() => router.push(`/profile/${item.id}?type=team`)}
    >
      <LinearGradient
        colors={[Colors.surface, Colors.primary[100]]}
        style={styles.cardGradient}
      >
        <View style={styles.employeeHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            {item.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          
          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName}>{item.name}</Text>
            <Text style={styles.employeeRole}>{item.role}</Text>
            <Text style={styles.employeeDepartment}>{item.department}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.activeListings}</Text>
              <Text style={styles.statLabel}>Aktif İlan</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#fbbf24" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.employeeDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="briefcase" size={16} color={Colors.text.secondary} />
            <Text style={styles.detailText}>{item.experience} deneyim</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="trophy" size={16} color={Colors.text.secondary} />
            <Text style={styles.detailText}>{item.specialization}</Text>
          </View>
          {item.totalSales !== '₺0' && (
            <View style={styles.detailItem}>
              <Ionicons name="trending-up" size={16} color={Colors.success[500]} />
              <Text style={[styles.detailText, { color: Colors.success[600] }]}>{item.totalSales} toplam satış</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const clearFilters = () => {
    setSelectedDepartment('all');
    setSelectedRole('all');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.primary[100]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Çalışanlar</Text>
          <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
            <Ionicons name="filter" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={Colors.text.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Çalışan ara..."
              placeholderTextColor={Colors.text.secondary}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color={Colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Active Filters */}
        {(selectedDepartment !== 'all' || selectedRole !== 'all') && (
          <View style={styles.activeFiltersContainer}>
            <Text style={styles.activeFiltersText}>Aktif Filtreler:</Text>
            <View style={styles.activeFilterTags}>
              {selectedDepartment !== 'all' && (
                <View style={styles.filterTag}>
                  <Text style={styles.filterTagText}>{selectedDepartment}</Text>
                  <TouchableOpacity onPress={() => setSelectedDepartment('all')}>
                    <Ionicons name="close" size={14} color={Colors.primary[600]} />
                  </TouchableOpacity>
                </View>
              )}
              {selectedRole !== 'all' && (
                <View style={styles.filterTag}>
                  <Text style={styles.filterTagText}>{selectedRole}</Text>
                  <TouchableOpacity onPress={() => setSelectedRole('all')}>
                    <Ionicons name="close" size={14} color={Colors.primary[600]} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredEmployees.length} çalışan bulundu
          </Text>
        </View>

        {/* Employees List */}
        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployeeCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        />

        {/* Filter Modal */}
        <Modal
          visible={showFilters}
          transparent
          animationType="slide"
          onRequestClose={() => setShowFilters(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Filtreler</Text>
                <TouchableOpacity onPress={() => setShowFilters(false)}>
                  <Ionicons name="close" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
              </View>

              {/* Department Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Departman</Text>
                <View style={styles.filterOptions}>
                  {departments.map((dept) => (
                    <TouchableOpacity
                      key={dept}
                      style={[
                        styles.filterOption,
                        selectedDepartment === dept && styles.filterOptionSelected
                      ]}
                      onPress={() => setSelectedDepartment(dept)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedDepartment === dept && styles.filterOptionTextSelected
                      ]}>
                        {dept === 'all' ? 'Tümü' : dept}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Role Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Pozisyon</Text>
                <View style={styles.filterOptions}>
                  {roles.map((role) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.filterOption,
                        selectedRole === role && styles.filterOptionSelected
                      ]}
                      onPress={() => setSelectedRole(role)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedRole === role && styles.filterOptionTextSelected
                      ]}>
                        {role === 'all' ? 'Tümü' : role}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Filter Buttons */}
              <View style={styles.filterButtons}>
                <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Temizle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowFilters(false)} style={styles.applyButton}>
                  <LinearGradient
                    colors={[Colors.primary[500], Colors.primary[600]]}
                    style={styles.applyButtonGradient}
                  >
                    <Text style={styles.applyButtonText}>Uygula</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.text.primary,
  },
  filterButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.text.primary,
  },
  activeFiltersContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  activeFiltersText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  activeFilterTags: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  filterTagText: {
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  resultsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  resultsText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  employeeCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  cardGradient: {
    padding: Spacing.lg,
  },
  employeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.success[500],
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  employeeRole: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  employeeDepartment: {
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  statsContainer: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  employeeDetails: {
    gap: Spacing.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  filterTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  filterSectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  filterOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    backgroundColor: Colors.surface,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary[100],
    borderColor: Colors.primary[500],
  },
  filterOptionText: {
    fontSize: FontSizes.base,
    color: Colors.text.secondary,
  },
  filterOptionTextSelected: {
    color: Colors.primary[600],
    fontWeight: '600',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  clearButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  applyButton: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.surface,
  },
}); 