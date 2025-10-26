import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Keyboard,
  Image,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SearchBar, DefaultFilters, PageHeader } from '../../src/components';

export default function FreelancesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('tous');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [budgetMax, setBudgetMax] = useState('');
  const [selectedDelay, setSelectedDelay] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const budgetInputRef = useRef<TextInput>(null);

  const handleBudgetFocus = () => {
    setIsKeyboardOpen(true);
  };

  const handleBudgetBlur = () => {
    setIsKeyboardOpen(false);
    Keyboard.dismiss();
  };

  const categories = [
    'Toutes les catégories',
    'Développement web',
    'Développement mobile',
    'Design UI/UX',
    'Marketing',
    'Photo',
    'Vidéo',
    'SEO',
    'Copywriting',
    'Réseaux sociaux',
    'E-commerce',
    'Data analysis',
    'DevOps',
  ];

  const availabilityOptions = [
    'Disponible immédiatement',
    'Cette semaine',
    'Ce mois-ci',
    'Dans 2 mois',
  ];

  const freelances = [
    {
      id: '1',
      name: 'Sophie Martin',
      role: 'Designer UI/UX',
      initials: 'SM',
      rating: 4.9,
      missions: 24,
      rate: 450,
      skills: ['Figma', 'UI/UX', 'Prototypage'],
      category: 'Design UI/UX',
    },
    {
      id: '2',
      name: 'Thomas Dupont',
      role: 'Développeur Full Stack',
      initials: 'TD',
      rating: 4.7,
      missions: 18,
      rate: 550,
      skills: ['React', 'Node.js', 'PostgreSQL'],
      category: 'Développement web',
    },
    {
      id: '3',
      name: 'Marie Leblanc',
      role: 'Vidéaste',
      initials: 'ML',
      rating: 5.0,
      missions: 32,
      rate: 400,
      skills: ['Montage', 'Motion Design', 'Adobe Premiere'],
      category: 'Vidéo',
    },
    {
      id: '4',
      name: 'Lucas Bernard',
      role: 'Expert Marketing',
      initials: 'LB',
      rating: 4.8,
      missions: 21,
      rate: 380,
      skills: ['Google Ads', 'SEO', 'Analytics'],
      category: 'Marketing',
    },
    {
      id: '5',
      name: 'Camille Rousseau',
      role: 'Développeuse mobile',
      initials: 'CR',
      rating: 4.6,
      missions: 15,
      rate: 500,
      skills: ['React Native', 'iOS', 'Android'],
      category: 'Développement mobile',
    },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleOpenFilters = () => {
    setShowFiltersModal(true);
  };

  const handleCloseFilters = () => {
    setShowFiltersModal(false);
  };

  const handleApplyFilters = () => {
    setShowFiltersModal(false);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryModal(false);
  };

  const handleSelectAvailability = (availability: string) => {
    setSelectedDelay(availability);
    setShowAvailabilityModal(false);
  };

  const handleResetFilters = () => {
    setSelectedRating(0);
    setBudgetMax('');
    setSelectedDelay('');
    setSelectedCategory('');
  };

  const handleContacter = (freelanceId: string) => {
    router.push(`/(employeur)/profil-freelance?freelanceId=${freelanceId}`);
  };

  // Filtrage des freelances
  let filteredFreelances = freelances;

  // Filtre par recherche
  if (searchQuery.trim()) {
    filteredFreelances = filteredFreelances.filter(
      (f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Filtre par catégorie
  if (selectedCategory && selectedCategory !== 'Toutes les catégories') {
    filteredFreelances = filteredFreelances.filter((f) => f.category === selectedCategory);
  }

  // Filtre par notation
  if (selectedRating > 0) {
    filteredFreelances = filteredFreelances.filter((f) => f.rating >= selectedRating);
  }

  // Filtre par budget
  if (budgetMax) {
    const budget = parseInt(budgetMax);
    if (!isNaN(budget)) {
      filteredFreelances = filteredFreelances.filter((f) => f.rate <= budget);
    }
  }

  // Filtre principal
  if (activeFilter === 'top-notés') {
    filteredFreelances = [...filteredFreelances].sort((a, b) => b.rating - a.rating);
  } else if (activeFilter === 'budget') {
    filteredFreelances = [...filteredFreelances].sort((a, b) => a.rate - b.rate);
  } else if (activeFilter === 'disponible') {
    // TODO: Implémenter le filtre de disponibilité
  } else if (activeFilter === 'missions-effectuées') {
    filteredFreelances = [...filteredFreelances].sort((a, b) => b.missions - a.missions);
  }

  const filters = [
    { id: 'tous', label: 'Tous' },
    { id: 'top-notés', label: 'Top notés' },
    { id: 'budget', label: 'Budget' },
    { id: 'disponible', label: 'Disponible' },
    { id: 'missions-effectuées', label: 'Missions effectuées' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader title="Classement des freelances" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onFilterPress={handleOpenFilters}
          placeholder="Rechercher un freelance..."
        />

        {/* Filter Buttons */}
        <DefaultFilters
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Freelances List */}
      <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredFreelances.length === 0 ? (
          <View style={styles.emptyState}>
            <Image 
              source={require('../../assets/images/no-result.png')} 
              style={styles.emptyStateImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyStateTitle}>Aucun freelance trouvé</Text>
            <Text style={styles.emptyStateText}>
              Essayez de modifier vos critères de recherche ou vos filtres
            </Text>
          </View>
        ) : (
          <View style={styles.freelancesContainer}>
            {filteredFreelances.map((freelance) => (
              <View key={freelance.id} style={styles.freelanceCard}>
                {/* Header: Avatar + Name/Role + Rate */}
                <View style={styles.freelanceHeader}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{freelance.initials}</Text>
                    </View>
                  </View>
                  <View style={styles.freelanceInfo}>
                    <Text style={styles.freelanceName}>{freelance.name}</Text>
                    <Text style={styles.freelanceRole}>{freelance.role}</Text>
                  </View>
                  <Text style={styles.freelanceRate}>{freelance.rate}€/jour</Text>
                </View>

                {/* Rating and Missions */}
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#8B5CF6" />
                  <Text style={styles.ratingText}>{freelance.rating}</Text>
                  <Text style={styles.missionsText}>{freelance.missions} missions</Text>
                </View>

                {/* Skills */}
                <View style={styles.skillsContainer}>
                  {freelance.skills.map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                      <Text style={styles.skillTagText}>{skill}</Text>
                    </View>
                  ))}
                </View>

                {/* Contact Button */}
                <TouchableOpacity
                  style={styles.profilButton}
                  onPress={() => handleContacter(freelance.id)}
                >
                  <Text style={styles.profilButtonText}>Voir le profil</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Filters Modal */}
      <Modal
        visible={showFiltersModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseFilters}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isKeyboardOpen && styles.modalContentKeyboardOpen]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres avancés</Text>
              <TouchableOpacity onPress={handleCloseFilters}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Catégorie */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Catégorie</Text>
                <TouchableOpacity
                  style={styles.availabilityDropdown}
                  onPress={() => setShowCategoryModal(!showCategoryModal)}
                >
                  <Text style={[styles.availabilityDropdownText, !selectedCategory && styles.placeholderText]}>
                    {selectedCategory || 'Sélectionner une catégorie'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#999999" />
                </TouchableOpacity>
                
                {/* Liste de catégories qui s'affiche directement */}
                {showCategoryModal && (
                  <View style={styles.availabilityList}>
                    {categories.map((category, index) => (
                      <TouchableOpacity
                        key={category}
                        style={[styles.availabilityItem, index === categories.length - 1 && styles.availabilityItemLast]}
                        onPress={() => handleSelectCategory(category)}
                      >
                        <Text style={styles.availabilityItemText}>{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Notation */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Notation</Text>
                <View style={styles.ratingSelector}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setSelectedRating(star)}
                      style={styles.starButton}
                    >
                      <Ionicons
                        name={star <= selectedRating ? 'star' : 'star-outline'}
                        size={32}
                        color="#8B5CF6"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* TJM max */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>TJM maximum</Text>
                <TextInput
                  ref={budgetInputRef}
                  style={styles.budgetInput}
                  placeholder="Ex: 1500"
                  placeholderTextColor="#9CA3AF"
                  value={budgetMax}
                  onChangeText={setBudgetMax}
                  onFocus={handleBudgetFocus}
                  onBlur={handleBudgetBlur}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleBudgetBlur}
                  blurOnSubmit={true}
                />
              </View>

              {/* Disponibilité */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Disponibilité</Text>
                <TouchableOpacity
                  style={styles.availabilityDropdown}
                  onPress={() => setShowAvailabilityModal(!showAvailabilityModal)}
                >
                  <Text style={[styles.availabilityDropdownText, !selectedDelay && styles.placeholderText]}>
                    {selectedDelay || 'Sélectionner une Disponibilité'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#999999" />
                </TouchableOpacity>
                
                {/* Liste de disponibilité qui s'affiche directement */}
                {showAvailabilityModal && (
                  <View style={styles.availabilityList}>
                    {availabilityOptions.map((option, index) => (
                      <TouchableOpacity
                        key={option}
                        style={[styles.availabilityItem, index === availabilityOptions.length - 1 && styles.availabilityItemLast]}
                        onPress={() => handleSelectAvailability(option)}
                      >
                        <Text style={styles.availabilityItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Modal Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.resetButton} onPress={handleResetFilters}>
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateImage: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  freelancesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  freelanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  freelanceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  freelanceInfo: {
    flex: 1,
  },
  freelanceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  freelanceRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  freelanceRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 4,
  },
  missionsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skillTagText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  profilButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  profilButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalContentKeyboardOpen: {
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  selectDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
  },
  selectText: {
    fontSize: 16,
    color: '#111827',
  },
  ratingSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  budgetInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    fontSize: 16,
    color: '#111827',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Category Modal Styles
  categoryModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    maxHeight: '70%',
  },
  categoryModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  categoryModalList: {
    paddingVertical: 8,
  },
  categoryModalItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryModalItemText: {
    fontSize: 16,
    color: '#111827',
  },
  // Styles pour disponibilité
  availabilityDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  availabilityDropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  availabilityList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  availabilityItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  availabilityItemLast: {
    borderBottomWidth: 0,
  },
  availabilityItemText: {
    fontSize: 16,
    color: '#333333',
  },
});