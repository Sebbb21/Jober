import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '../src/components';

export default function CreerMissionPage() {
  const [formData, setFormData] = useState({
    nomEntreprise: '',
    titreMission: '',
    categorie: '',
    description: '',
    niveauExperience: '',
    competences: [] as string[],
    budget: '',
    delai: '',
  });
  
  const [nouvelleCompetence, setNouvelleCompetence] = useState('');
  const [showCategorieDropdown, setShowCategorieDropdown] = useState(false);
  const [showNiveauDropdown, setShowNiveauDropdown] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [shouldDismissKeyboard, setShouldDismissKeyboard] = useState(false);

  // Refs pour la navigation entre les inputs
  const nomEntrepriseRef = useRef<TextInput>(null);
  const titreMissionRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const nouvelleCompetenceRef = useRef<TextInput>(null);
  const budgetRef = useRef<TextInput>(null);
  const dureeRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const categories = [
    'Développement web',
    'Développement mobile',
    'Photo',
    'Vidéo',
    'Marketing',
    'App mobile',
    'Site web',
    'Copywriting',
    'Design',
    'Graphisme',
    'SEO',
    'Réseaux sociaux',
    'E-commerce',
    'Data analysis',
    'DevOps',
    'UI/UX Design',
  ];

  const niveauxExperience = [
    'Débutant',
    'Intermédiaire',
    'Expert',
  ];

  const handleBack = () => {
    router.back();
  };

  const handleCategorieSelect = (categorie: string) => {
    setFormData({ ...formData, categorie });
    setShowCategorieDropdown(false);
  };

  const handleNiveauSelect = (niveau: string) => {
    setFormData({ ...formData, niveauExperience: niveau });
    setShowNiveauDropdown(false);
  };

  const handleAddCompetence = () => {
    if (nouvelleCompetence.trim() && !formData.competences.includes(nouvelleCompetence.trim())) {
      setFormData({
        ...formData,
        competences: [...formData.competences, nouvelleCompetence.trim()]
      });
      setNouvelleCompetence('');
    }
  };

  const handleRemoveCompetence = (competence: string) => {
    setFormData({
      ...formData,
      competences: formData.competences.filter(c => c !== competence)
    });
  };

  const handlePublier = () => {
    // Validation basique
    if (!formData.nomEntreprise || !formData.titreMission || !formData.categorie || !formData.description) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Ouvrir le modal de publication
    setShowPublishModal(true);
  };

  const handleCreerCompte = () => {
    router.push('/(auth)/abonnement-employeur');
    // Fermer le modal après un court délai pour que la navigation commence
    setTimeout(() => {
      setShowPublishModal(false);
    }, 100);
  };

  const handleConnexion = () => {
    router.push('/(auth)/login?from=publish-modal');
    // Fermer le modal après un court délai pour que la navigation commence
    setTimeout(() => {
      setShowPublishModal(false);
    }, 100);
  };

  // Fonctions pour la navigation entre les inputs
  const focusNextInput = (nextRef: React.RefObject<TextInput | null>) => {
    nextRef.current?.focus();
    // Scroll vers l'input qui reçoit le focus
    setTimeout(() => {
      nextRef.current?.measureLayout(
        scrollViewRef.current as any,
        (x, y, width, height) => {
          scrollViewRef.current?.scrollTo({
            y: y - 100, // Offset pour laisser de l'espace au-dessus
            animated: true,
          });
        },
        () => {}
      );
    }, 100);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setShouldDismissKeyboard(true);
    // Scroll vers le bas pour montrer le bouton "Publier ma mission"
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  // useEffect pour gérer le focus et fermer le clavier si nécessaire
  useEffect(() => {
    if (shouldDismissKeyboard) {
      Keyboard.dismiss();
      setShouldDismissKeyboard(false);
    }
  }, [shouldDismissKeyboard]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Créer une mission</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress Bar */}
      <ProgressBar 
        currentStep={1} 
        totalSteps={2} 
        showProgress={true} 
      />

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
        {/* Mission Details Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Détails de la mission</Text>

          {/* Nom de l'entreprise */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nom de l'entreprise</Text>
            <TextInput
              ref={nomEntrepriseRef}
              style={styles.input}
              placeholder="Ex: Ma Startup"
              placeholderTextColor="#999999"
              value={formData.nomEntreprise}
              onChangeText={(text) => setFormData({ ...formData, nomEntreprise: text })}
              onSubmitEditing={() => focusNextInput(titreMissionRef)}
              returnKeyType="next"
            />
          </View>

          {/* Titre de la mission */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Titre de la mission</Text>
            <TextInput
              ref={titreMissionRef}
              style={styles.input}
              placeholder="Ex: Développement d'une app mobile"
              placeholderTextColor="#999999"
              value={formData.titreMission}
              onChangeText={(text) => setFormData({ ...formData, titreMission: text })}
              onSubmitEditing={() => focusNextInput(descriptionRef)}
              returnKeyType="next"
            />
          </View>

          {/* Catégorie */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Catégorie de mission</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowCategorieDropdown(!showCategorieDropdown)}
            >
              <Text style={[styles.dropdownText, !formData.categorie && styles.placeholderText]}>
                {formData.categorie || 'Sélectionnez une catégorie'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999999" />
            </TouchableOpacity>
            
            {/* Modal pour les catégories */}
            <Modal
              visible={showCategorieDropdown}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowCategorieDropdown(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Sélectionner une catégorie</Text>
                    <TouchableOpacity 
                      onPress={() => setShowCategorieDropdown(false)}
                      style={styles.modalCloseButton}
                    >
                      <Ionicons name="close" size={24} color="#666666" />
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView style={styles.modalList}>
                    {categories.map((categorie, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.modalItem,
                          index === categories.length - 1 && styles.modalItemLast
                        ]}
                        onPress={() => handleCategorieSelect(categorie)}
                      >
                        <Text style={styles.modalItemText}>{categorie}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              ref={descriptionRef}
              style={[styles.input, styles.textArea]}
              placeholder="Décrivez votre projet en détail..."
              placeholderTextColor="#999999"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onSubmitEditing={() => focusNextInput(nouvelleCompetenceRef)}
              returnKeyType="next"
            />
          </View>

          {/* Niveau d'expérience */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Niveau d'expérience requis</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowNiveauDropdown(!showNiveauDropdown)}
            >
              <Text style={[styles.dropdownText, !formData.niveauExperience && styles.placeholderText]}>
                {formData.niveauExperience || 'Sélectionnez un niveau'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999999" />
            </TouchableOpacity>
            
            {/* Modal pour les niveaux d'expérience */}
            <Modal
              visible={showNiveauDropdown}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowNiveauDropdown(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Sélectionner un niveau</Text>
                    <TouchableOpacity 
                      onPress={() => setShowNiveauDropdown(false)}
                      style={styles.modalCloseButton}
                    >
                      <Ionicons name="close" size={24} color="#666666" />
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView style={styles.modalList}>
                    {niveauxExperience.map((niveau, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.modalItem,
                          index === niveauxExperience.length - 1 && styles.modalItemLast
                        ]}
                        onPress={() => handleNiveauSelect(niveau)}
                      >
                        <Text style={styles.modalItemText}>{niveau}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>

          {/* Compétences requises */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Compétences requises</Text>
            <View style={styles.competencesContainer}>
              <TextInput
                ref={nouvelleCompetenceRef}
                style={[styles.input, styles.competenceInput]}
                placeholder="Ex: React Native"
                placeholderTextColor="#999999"
                value={nouvelleCompetence}
                onChangeText={setNouvelleCompetence}
                onSubmitEditing={() => focusNextInput(budgetRef)}
                returnKeyType="next"
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddCompetence}>
                <Text style={styles.addButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
            
            {/* Liste des compétences ajoutées */}
            <View style={styles.competencesList}>
              {formData.competences.map((competence, index) => (
                <View key={index} style={styles.competenceTag}>
                  <Text style={styles.competenceTagText}>{competence}</Text>
                  <TouchableOpacity onPress={() => handleRemoveCompetence(competence)}>
                    <Ionicons name="close" size={16} color="#8B5CF6" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Budget et Délai */}
          <View style={styles.rowContainer}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.inputLabel}>Budget (€)</Text>
              <TextInput
                ref={budgetRef}
                style={styles.input}
                placeholder="5000"
                placeholderTextColor="#999999"
                value={formData.budget}
                onChangeText={(text) => setFormData({ ...formData, budget: text })}
                keyboardType="numeric"
                onSubmitEditing={() => focusNextInput(dureeRef)}
                returnKeyType="next"
              />
            </View>
            
            <View style={styles.halfInputContainer}>
              <Text style={styles.inputLabel}>Durée (jours)</Text>
              <TextInput
                ref={dureeRef}
                style={styles.input}
                placeholder="30"
                placeholderTextColor="#999999"
                value={formData.delai}
                onChangeText={(text) => setFormData({ ...formData, delai: text })}
                keyboardType="numeric"
                onSubmitEditing={dismissKeyboard}
                returnKeyType="done"
                blurOnSubmit={true}
                autoFocus={false}
              />
            </View>
          </View>
        </View>

        {/* Publish Button */}
        <TouchableOpacity style={styles.publishButton} onPress={handlePublier}>
          <Text style={styles.publishButtonText}>Publier ma mission</Text>
        </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de publication */}
      <Modal
        visible={showPublishModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPublishModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.publishModalContent}>
            {/* Bouton de fermeture */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowPublishModal(false)}
            >
              <Ionicons name="close" size={20} color="#333333" />
            </TouchableOpacity>
            
            <Text style={styles.publishModalTitle}>
              Votre mission est prête à être publiée !
            </Text>
            <Text style={styles.publishModalSubtitle}>
              Créez un compte ou connectez-vous pour la rendre visible aux freelances.
            </Text>
            
            <TouchableOpacity
              style={styles.publishModalButton}
              onPress={handleCreerCompte}
            >
              <Text style={styles.publishModalButtonText}>Créer un compte</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.publishModalSecondaryButton}
              onPress={handleConnexion}
            >
              <Text style={styles.publishModalSecondaryButtonText}>Connexion</Text>
            </TouchableOpacity>
            
            <Text style={styles.publishModalFooter}>
              Aucun abonnement ne sera facturé avant la fin de votre essai gratuit.
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F8F9FA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
  },
  placeholderText: {
    color: '#999999',
  },
  // Styles pour les modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxHeight: '70%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalList: {
    maxHeight: 300,
    paddingBottom: 0,
  },
  modalItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginHorizontal: 0,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333333',
  },
  modalItemLast: {
    borderBottomWidth: 0,
  },
  competencesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  competenceInput: {
    flex: 1,
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  competencesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  competenceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  competenceTagText: {
    fontSize: 14,
    color: '#8B5CF6',
    marginRight: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    flex: 1,
    marginRight: 12,
  },
  publishButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Styles pour le modal de publication
  publishModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  publishModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 10,
    lineHeight: 28,
  },
  publishModalSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  publishModalButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  publishModalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  publishModalSecondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  publishModalSecondaryButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  publishModalFooter: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
