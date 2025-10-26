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
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar, DefaultFilters } from '../../src/components';

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
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const modalScrollViewRef = useRef<ScrollView>(null);
  const budgetInputRef = useRef<TextInput>(null);

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

  const handleBudgetFocus = () => {
    setIsKeyboardOpen(true);
    // Scroll automatique après un court délai pour laisser le temps au clavier de s'ouvrir
    setTimeout(() => {
      modalScrollViewRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  const handleBudgetBlur = () => {
    setIsKeyboardOpen(false);
    Keyboard.dismiss();
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
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
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

      {/* Candidatures List */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.candidaturesContainer}>
          {getFilteredCandidatures().length === 0 ? (
            <View style={styles.emptyState}>
              <Image 
                source={require('../../assets/images/no-result.png')} 
                style={styles.emptyStateImage}
                resizeMode="contain"
              />
              <Text style={styles.emptyStateTitle}>Aucun candidat trouvé</Text>
              <Text style={styles.emptyStateText}>
                Essayez de modifier vos critères de recherche ou vos filtres
              </Text>
            </View>
          ) : (
            getFilteredCandidatures().map((candidat) => (
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
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de filtres avancés */}
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
              (isKeyboardOpen || showAvailabilityModal) && styles.modalContentKeyboardOpen
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
            <ScrollView ref={modalScrollViewRef} style={styles.modalBody} keyboardShouldPersistTaps="handled">
              {/* Section Notation */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Notation</Text>
                <View style={styles.ratingSelector}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRatingSelect(star)}
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

              {/* Section Budget */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>TJM maximum</Text>
                <TextInput
                  ref={budgetInputRef}
                  style={styles.budgetInput}
                  placeholder="Ex: 1500"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={budgetMax}
                  onChangeText={setBudgetMax}
                  onFocus={handleBudgetFocus}
                  onBlur={handleBudgetBlur}
                  onSubmitEditing={handleBudgetBlur}
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
              </View>

              {/* Section Disponibilité */}
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
                        onPress={() => handleAvailabilitySelect(option)}
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
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>Appliquer</Text>
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 40,
  },
  emptyStateImage: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '54%',
  },
  modalContentKeyboardOpen: {
    height: '70%',
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
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
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
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
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
