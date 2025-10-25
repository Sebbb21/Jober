import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
  Keyboard,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CandidaturesPage() {
  const params = useLocalSearchParams();
  const missionTitle = params.missionTitle || 'Développement app mobile';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('tous');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [budgetMax, setBudgetMax] = useState('');
  const [selectedDelay, setSelectedDelay] = useState('');
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBack = () => {
    router.push('/(employeur)/accueil');
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    // Scroll vers le haut avec une petite animation
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

  const handleResetFilters = () => {
    setSelectedRating(0);
    setBudgetMax('');
    setSelectedDelay('');
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleAvailabilitySelect = (availability: string) => {
    setSelectedDelay(availability);
    setShowAvailabilityModal(false);
  };



  const candidatures = [
    {
      id: '1',
      nom: 'Thomas Dupont',
      role: 'Développeur Full Stack',
      tarif: '550€/jour',
      note: '4.7',
      missions: '18 missions',
      competences: ['React', 'Node.js', 'PostgreSQL'],
      initiales: 'TD',
    },
    {
      id: '2',
      nom: 'Sophie Martin',
      role: 'Designer UI/UX',
      tarif: '450€/jour',
      note: '4.9',
      missions: '24 missions',
      competences: ['Figma', 'UI/UX', 'Prototypage'],
      initiales: 'SM',
    },
    {
      id: '3',
      nom: 'Alexandre Leroy',
      role: 'Développeur Mobile',
      tarif: '600€/jour',
      note: '4.8',
      missions: '12 missions',
      competences: ['React Native', 'Flutter', 'iOS'],
      initiales: 'AL',
    },
    {
      id: '4',
      nom: 'Marie Dubois',
      role: 'Product Manager',
      tarif: '500€/jour',
      note: '4.6',
      missions: '15 missions',
      competences: ['Agile', 'Scrum', 'Product'],
      initiales: 'MD',
    },
    {
      id: '5',
      nom: 'Pierre Moreau',
      role: 'Développeur Frontend',
      tarif: '400€/jour',
      note: '4.5',
      missions: '8 missions',
      competences: ['Vue.js', 'CSS', 'JavaScript'],
      initiales: 'PM',
    },
    {
      id: '6',
      nom: 'Julie Bernard',
      role: 'Développeur Backend',
      tarif: '650€/jour',
      note: '4.8',
      missions: '20 missions',
      competences: ['Python', 'Django', 'PostgreSQL'],
      initiales: 'JB',
    },
  ];

  const filters = [
    { id: 'tous', label: 'Tous' },
    { id: 'top-notés', label: 'Top notés' },
    { id: 'budget', label: 'Budget' },
    { id: 'disponible', label: 'Disponible' },
    { id: 'missions-effectuees', label: 'Missions effectuées' },
  ];

  const availabilityOptions = [
    'Immédiatement',
    'Cette semaine',
    'Dans 2 semaines',
    'Ce mois',
    'Dans 2 mois',
    'Dans 3 mois',
  ];

  const handleVoirProfil = (candidatId: string) => {
    router.push('/(employeur)/profil-freelance');
  };

  // Fonction de filtrage des candidatures
  const getFilteredCandidatures = () => {
    let filtered = candidatures;

    // Filtre par recherche
    if (searchQuery.trim()) {
      filtered = filtered.filter(candidat =>
        candidat.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidat.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidat.competences.some(comp => 
          comp.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filtre par notation (étoiles)
    if (selectedRating > 0) {
      filtered = filtered.filter(candidat => 
        parseFloat(candidat.note) >= selectedRating
      );
    }

    // Filtre par budget
    if (budgetMax.trim()) {
      filtered = filtered.filter(candidat => {
        const tarif = parseInt(candidat.tarif.replace(/[^\d]/g, ''));
        const maxBudget = parseInt(budgetMax);
        return tarif <= maxBudget;
      });
    }

    // Filtre par délai (pour l'instant on garde tous, peut être étendu plus tard)
    // if (selectedDelay) {
    //   // Logique de filtrage par délai à implémenter
    // }

    // Filtre par type
    switch (activeFilter) {
      case 'missions-effectuees':
        filtered = filtered.sort((a, b) => {
          const missionsA = parseInt(a.missions.replace(/[^\d]/g, ''));
          const missionsB = parseInt(b.missions.replace(/[^\d]/g, ''));
          return missionsB - missionsA; // Tri décroissant (plus de missions en premier)
        });
        break;
      case 'top-notés':
        filtered = filtered.sort((a, b) => parseFloat(b.note) - parseFloat(a.note));
        break;
      case 'budget':
        filtered = filtered.sort((a, b) => {
          const tarifA = parseInt(a.tarif.replace(/[^\d]/g, ''));
          const tarifB = parseInt(b.tarif.replace(/[^\d]/g, ''));
          return tarifA - tarifB;
        });
        break;
      case 'disponible':
        // Pour l'instant, on garde tous les candidats comme "disponibles"
        break;
      case 'tous':
      default:
        // Pas de tri spécial pour "tous"
        break;
    }

    return filtered;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
          <Text style={styles.backText}>Retour aux missions</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Candidatures - {missionTitle}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un freelance..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchFilterButton} onPress={handleOpenFilters}>
            <Ionicons name="options-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.filterButtonActive,
              ]}
              onPress={() => handleFilterChange(filter.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter.id && styles.filterButtonTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Candidatures List */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.candidaturesContainer}>
          {getFilteredCandidatures().map((candidat) => (
            <View key={candidat.id} style={styles.candidatCard}>
              <View style={styles.candidatHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{candidat.initiales}</Text>
                  </View>
                </View>
                <View style={styles.candidatInfo}>
                  <Text style={styles.candidatNom}>{candidat.nom}</Text>
                  <Text style={styles.candidatRole}>{candidat.role}</Text>
                </View>
                <Text style={styles.candidatTarif}>{candidat.tarif}</Text>
              </View>

              <View style={styles.candidatDetails}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#8B5CF6" />
                  <Text style={styles.ratingText}>{candidat.note}</Text>
                  <Text style={styles.missionsText}>{candidat.missions}</Text>
                </View>
              </View>

              <View style={styles.competencesContainer}>
                {candidat.competences.map((competence, index) => (
                  <View key={index} style={styles.competenceTag}>
                    <Text style={styles.competenceText}>{competence}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.profilButton}
                onPress={() => handleVoirProfil(candidat.id)}
              >
                <Text style={styles.profilButtonText}>Voir le profil</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal de filtres avancés */}
      <Modal
        visible={showFiltersModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseFilters}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header du modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres</Text>
              <TouchableOpacity onPress={handleCloseFilters} style={styles.modalCloseButton}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Affinez votre recherche de missions</Text>

            {/* Section Notation */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Notation</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleRatingSelect(star)}
                    style={styles.starButton}
                  >
                    <Ionicons
                      name={star <= selectedRating ? "star" : "star-outline"}
                      size={24}
                      color={star <= selectedRating ? "#FFD700" : "#E5E7EB"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Section Budget */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>TJM maximum (€)</Text>
              <TextInput
                style={styles.budgetInput}
                placeholder="Ex: 1500"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={budgetMax}
                onChangeText={setBudgetMax}
                onBlur={() => Keyboard.dismiss()}
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyType="done"
              />
            </View>

            {/* Section Disponibilité */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Disponibilité</Text>
              <TouchableOpacity
                style={styles.availabilityDropdown}
                onPress={() => setShowAvailabilityModal(!showAvailabilityModal)}
              >
                <Text style={[styles.availabilityDropdownText, !selectedDelay && styles.placeholderText]}>
                  {selectedDelay || 'Sélectionner une disponibilité'}
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
                      onPress={() => handleAvailabilitySelect(option)}
                    >
                      <Text style={styles.availabilityItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Boutons d'action */}
            <View style={styles.modalActions}>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: '#8B5CF6',
    marginLeft: 8,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  searchFilterButton: {
    padding: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 4,
  },
  filterButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  candidaturesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  candidatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  candidatHeader: {
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
  candidatInfo: {
    flex: 1,
  },
  candidatNom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  candidatRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  candidatTarif: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  candidatDetails: {
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  competencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  competenceTag: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  competenceText: {
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
  // Styles pour le modal de filtres
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  budgetValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    minWidth: 50,
    textAlign: 'center',
  },
  budgetSlider: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  budgetTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'center',
  },
  budgetFill: {
    height: 6,
    backgroundColor: '#8B5CF6',
    borderRadius: 3,
  },
  budgetThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    top: -8,
    marginLeft: -10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  delayDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  delayText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
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
  applyButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Styles pour le modal de délai
  delayModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  delayModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxHeight: '70%',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
    zIndex: 1001,
  },
  delayModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  delayModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  delayModalCloseButton: {
    padding: 5,
  },
  delayModalList: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  delayModalItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginHorizontal: 0,
  },
  delayModalItemLast: {
    borderBottomWidth: 0,
  },
  delayModalItemText: {
    fontSize: 16,
    color: '#333333',
  },
  budgetInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  availabilityOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  availabilityOptionSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  availabilityOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  availabilityOptionTextSelected: {
    color: '#FFFFFF',
  },
  availabilityDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  availabilityDropdownText: {
    fontSize: 16,
    color: '#111827',
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
