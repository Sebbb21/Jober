import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import PageHeader from '../../src/components/PageHeader';
import SearchBar from '../../src/components/SearchBar';
import DefaultFilters from '../../src/components/DefaultFilters';

export default function MissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const budgetInputRef = useRef<TextInput>(null);

  const filters = [
    { id: 'Tous', label: 'Tous' },
    { id: 'Programmation', label: 'Programmation' },
    { id: 'Design', label: 'Design' },
    { id: 'Vidéo', label: 'Vidéo' },
  ];

  const missions = [
    {
      id: '1',
      title: 'Développement d\'une application mobile React Native',
      tag: 'Nouveau',
      category: 'Programmation',
      description: 'Nous recherchons un développeur React Native pour créer une app e-commerce.',
      skills: ['React Native', 'TypeScript', 'API REST'],
      price: '5000€',
      duration: '30 jours',
    },
    {
      id: '2',
      title: 'Design UI/UX pour plateforme SaaS',
      tag: 'Nouveau',
      category: 'Design',
      description: 'Refonte complète de l\'interface utilisateur d\'une plateforme B2B.',
      skills: ['Figma', 'UI/UX', 'Design System'],
      price: '3500€',
      duration: '20 jours',
    },
    {
      id: '3',
      title: 'Création de contenu vidéo pour réseaux sociaux',
      tag: '',
      category: 'Vidéo',
      description: 'Série de 10 vidéos courtes pour Instagram et TikTok.',
      skills: ['Montage vidéo', 'Motion Design'],
      price: '2000€',
      duration: '15 jours',
    },
    {
      id: '4',
      title: 'Campagne marketing digital',
      tag: '',
      category: 'Programmation',
      description: 'Stratégie et mise en œuvre d\'une campagne Google Ads + Meta.',
      skills: ['Google Ads', 'Meta Ads', 'SEO'],
      price: '4000€',
      duration: '45 jours',
    },
    {
      id: '5',
      title: 'Application web Full-Stack',
      tag: 'Nouveau',
      category: 'Programmation',
      description: 'Développement d\'une application web moderne avec React et Node.js.',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      price: '6000€',
      duration: '40 jours',
    },
    {
      id: '6',
      title: 'Identité visuelle complète',
      tag: '',
      category: 'Design',
      description: 'Création d\'une identité de marque complète avec logo et charte graphique.',
      skills: ['Logo design', 'Branding', 'Adobe Illustrator'],
      price: '3000€',
      duration: '25 jours',
    },
  ];

  // Filtrer les missions selon le filtre sélectionné
  const filteredMissions = selectedFilter === 'Tous' 
    ? missions 
    : missions.filter(mission => mission.category === selectedFilter);

  const handleApply = (missionId: string) => {
    router.push('/(freelance)/mission-details');
  };

  const handleFilterPress = () => {
    setShowFiltersModal(true);
  };

  const handleCloseFilters = () => {
    setShowFiltersModal(false);
  };

  const handleApplyFilters = () => {
    setShowFiltersModal(false);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleResetFilters = () => {
    setSelectedRating(0);
    setSelectedBudget('');
    setSelectedDuration('');
  };

  const handleBudgetFocus = () => {
    setIsKeyboardOpen(true);
  };

  const handleBudgetBlur = () => {
    setIsKeyboardOpen(false);
    Keyboard.dismiss();
  };

  const durationOptions = [
    'Cette semaine',
    'Ce mois-ci',
    'Dans 2 mois',
    'Plus de 3 mois',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader title="Missions disponibles" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterPress={handleFilterPress}
          placeholder="Rechercher une mission..."
        />

        {/* Filter Buttons */}
        <DefaultFilters
          filters={filters}
          activeFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Missions List */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.missionContainer}>
          {filteredMissions.map((mission) => (
            <View key={mission.id} style={styles.missionCard}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>{mission.title}</Text>
              {mission.tag && (
                <View style={styles.newTag}>
                  <Text style={styles.newTagText}>{mission.tag}</Text>
                </View>
              )}
            </View>
            <Text style={styles.missionDescription}>{mission.description}</Text>
            <View style={styles.skillsContainer}>
              {mission.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillTagText}>{skill}</Text>
                </View>
              ))}
            </View>
            <View style={styles.missionDetails}>
              <View style={styles.missionInfo}>
                <Ionicons name="cash-outline" size={16} color="#6B7280" />
                <Text style={styles.missionPrice}>{mission.price}</Text>
              </View>
              <View style={styles.missionInfo}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text style={styles.missionDuration}>{mission.duration}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => handleApply(mission.id)}
            >
              <Text style={styles.applyButtonText}>Candidater</Text>
            </TouchableOpacity>
          </View>
        ))}
        </View>
      </ScrollView>

      {/* Filters Modal */}
      <Modal
        visible={showFiltersModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseFilters}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={handleCloseFilters}
        >
          <TouchableOpacity 
            style={[
              styles.modalContent, 
              (isKeyboardOpen || showDurationModal) && styles.modalContentKeyboardOpen
            ]} 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header du modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres avancés</Text>
              <TouchableOpacity onPress={handleCloseFilters}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Body du modal */}
            <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
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
                        name={star <= selectedRating ? "star" : "star-outline"}
                        size={32}
                        color="#8B5CF6"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Budget */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Budget maximum</Text>
                <TextInput
                  ref={budgetInputRef}
                  style={styles.budgetInput}
                  placeholder="Ex: 5000"
                  placeholderTextColor="#9CA3AF"
                  value={selectedBudget}
                  onChangeText={setSelectedBudget}
                  onFocus={handleBudgetFocus}
                  onBlur={handleBudgetBlur}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleBudgetBlur}
                  blurOnSubmit={true}
                />
              </View>

              {/* Durée */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Durée</Text>
                <TouchableOpacity
                  style={styles.availabilityDropdown}
                  onPress={() => setShowDurationModal(!showDurationModal)}
                >
                  <Text style={[styles.availabilityDropdownText, !selectedDuration && styles.placeholderText]}>
                    {selectedDuration || 'Sélectionner une durée'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#999999" />
                </TouchableOpacity>
                
                {/* Liste de durée qui s'affiche directement */}
                {showDurationModal && (
                  <View style={styles.availabilityList}>
                    {durationOptions.map((option, index) => (
                      <TouchableOpacity
                        key={option}
                        style={[styles.availabilityItem, index === durationOptions.length - 1 && styles.availabilityItemLast]}
                        onPress={() => {
                          setSelectedDuration(option);
                          setShowDurationModal(false);
                        }}
                      >
                        <Text style={styles.availabilityItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Footer du modal */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.resetButton} onPress={handleResetFilters}>
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyFilterButton} onPress={handleApplyFilters}>
                <Text style={styles.applyFilterButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
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
    paddingBottom: 16,
    paddingTop: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  missionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  missionCard: {
    backgroundColor: '#F8F7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 10,
    lineHeight: 22,
  },
  newTag: {
    backgroundColor: '#E0CCFF',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  newTagText: {
    color: '#8B5CF6',
    fontSize: 11,
    fontWeight: 'bold',
  },
  missionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  skillTag: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skillTagText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  missionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  missionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  missionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  missionDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  applyButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
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
    height: '54%',
  },
  modalContentKeyboardOpen: {
    height: '75%',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  applyFilterButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
  },
  applyFilterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
