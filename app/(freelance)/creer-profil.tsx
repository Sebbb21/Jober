import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from '../../src/components';

const FORM_STORAGE_KEY = '@freelance_profile_form_data';

export default function CreerProfilPage() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    bio: '',
    categorie: '',
    niveauExperience: '',
    tjm: '',
    disponibilite: '',
    linkedin: '',
    portfolio: '',
    github: '',
  });

  const [showCategorieDropdown, setShowCategorieDropdown] = useState(false);
  const [showDisponibiliteDropdown, setShowDisponibiliteDropdown] = useState(false);
  const [showNiveauDropdown, setShowNiveauDropdown] = useState(false);
  const [shouldDismissKeyboard, setShouldDismissKeyboard] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Refs pour la navigation entre les inputs
  const prenomRef = useRef<TextInput>(null);
  const nomRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const telephoneRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);
  const tjmRef = useRef<TextInput>(null);
  const linkedinRef = useRef<TextInput>(null);
  const portfolioRef = useRef<TextInput>(null);
  const githubRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const categories = [
    'Développement web',
    'Développement mobile',
    'Design UI/UX',
    'Photo',
    'Vidéo',
    'Marketing',
    'SEO',
    'Copywriting',
    'Réseaux sociaux',
    'E-commerce',
    'Data analysis',
    'DevOps',
  ];

  const disponibilites = [
    'Disponible immédiatement',
    'Cette semaine',
    'Ce mois-ci',
    'Dans 2 mois',
  ];

  const niveauxExperience = [
    'Débutant',
    'Intermédiaire',
    'Expert',
  ];

  // Charger les données sauvegardées au montage du composant
  useEffect(() => {
    loadSavedData();
  }, []);

  // Fonction pour charger les données sauvegardées
  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(FORM_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      }
      setIsInitialLoad(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setIsInitialLoad(false);
    }
  };

  // Sauvegarder automatiquement les données à chaque modification
  useEffect(() => {
    if (!isInitialLoad) {
      saveFormData(formData);
    }
  }, [formData]);

  // Fonction pour sauvegarder les données
  const saveFormData = async (data: typeof formData) => {
    try {
      await AsyncStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  };

  // Empêcher le clavier de se rouvrir automatiquement
  useEffect(() => {
    if (shouldDismissKeyboard) {
      Keyboard.dismiss();
      setShouldDismissKeyboard(false);
    }
  }, [shouldDismissKeyboard]);

  // Fonctions de validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Format français : doit commencer par 0
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleCreerProfil = async () => {
    // Validation des champs obligatoires
    if (!formData.prenom) {
      Alert.alert('Erreur', 'Veuillez remplir le champ Prénom');
      prenomRef.current?.focus();
      return;
    }
    if (!formData.nom) {
      Alert.alert('Erreur', 'Veuillez remplir le champ Nom');
      nomRef.current?.focus();
      return;
    }
    if (!formData.email) {
      Alert.alert('Erreur', 'Veuillez remplir le champ Email');
      emailRef.current?.focus();
      return;
    }
    if (!formData.telephone) {
      Alert.alert('Erreur', 'Veuillez remplir le champ Téléphone');
      telephoneRef.current?.focus();
      return;
    }
    if (!formData.bio) {
      Alert.alert('Erreur', 'Veuillez remplir le champ Bio');
      bioRef.current?.focus();
      return;
    }
    if (!formData.categorie) {
      Alert.alert('Erreur', 'Veuillez sélectionner une catégorie');
      return;
    }
    if (!formData.niveauExperience) {
      Alert.alert('Erreur', 'Veuillez sélectionner un niveau d\'expérience');
      return;
    }
    if (!formData.tjm) {
      Alert.alert('Erreur', 'Veuillez remplir le champ TJM');
      tjmRef.current?.focus();
      return;
    }
    if (!formData.disponibilite) {
      Alert.alert('Erreur', 'Veuillez sélectionner une disponibilité');
      return;
    }

    // Validation de l'email
    if (!validateEmail(formData.email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide (exemple: exemple@example.com)');
      emailRef.current?.focus();
      return;
    }

    // Validation du téléphone
    if (!validatePhone(formData.telephone)) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone français valide (format: 0XXXXXXXXX)');
      telephoneRef.current?.focus();
      return;
    }

    // Sauvegarder les données du formulaire
    await saveFormData(formData);

    // Ouvrir le modal de validation
    setShowProfileModal(true);
  };

  const handleCreerCompte = async () => {
    // NE PAS supprimer les données sauvegardées pour pouvoir les retrouver si l'utilisateur revient en arrière
    // Les données seront gardées en mémoire pour permettre le retour en arrière
    // Utiliser router.push() au lieu de replace() pour garder la page en mémoire pendant la transition
    router.push('/(auth)/abonnement-freelance');
    // Fermer le modal après un court délai pour que la navigation commence
    setTimeout(() => {
      setShowProfileModal(false);
    }, 100);
  };

  const handleConnexion = () => {
    // Utiliser router.push() au lieu de replace() pour garder la page en mémoire pendant la transition
    router.push('/(auth)/login?from=profile-modal');
    // Fermer le modal après un court délai pour que la navigation commence
    setTimeout(() => {
      setShowProfileModal(false);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/status-choice')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Créer mon profil freelance</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress Bar */}
      <ProgressBar 
        currentStep={1} 
        totalSteps={2} 
        showProgress={true} 
        stepTitle="Création du profil"
      />

      {/* Content */}
      <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card 1: Informations personnelles */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informations personnelles</Text>

            <View style={styles.row}>
              <View style={[styles.fieldContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Prénom</Text>
                <TextInput
                  ref={prenomRef}
                  style={styles.input}
                  placeholder="Prénom"
                  placeholderTextColor="#9CA3AF"
                  value={formData.prenom}
                  onChangeText={(text) => setFormData({ ...formData, prenom: text })}
                  returnKeyType="next"
                  onSubmitEditing={() => nomRef.current?.focus()}
                  autoFocus={false}
                />
              </View>
              <View style={[styles.fieldContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                  ref={nomRef}
                  style={styles.input}
                  placeholder="Nom"
                  placeholderTextColor="#9CA3AF"
                  value={formData.nom}
                  onChangeText={(text) => setFormData({ ...formData, nom: text })}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                ref={emailRef}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => telephoneRef.current?.focus()}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                ref={telephoneRef}
                style={styles.input}
                placeholder="Téléphone"
                placeholderTextColor="#9CA3AF"
                value={formData.telephone}
                onChangeText={(text) => setFormData({ ...formData, telephone: text })}
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => bioRef.current?.focus()}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                ref={bioRef}
                style={[styles.input, styles.textArea]}
                placeholder="Parlez-nous de vous..."
                placeholderTextColor="#9CA3AF"
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>
          </View>

          {/* Card 2: Informations professionnelles */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informations professionnelles</Text>

            {/* Catégorie */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Catégorie</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowCategorieDropdown(!showCategorieDropdown)}
              >
                <Text style={[styles.selectText, !formData.categorie && styles.placeholderText]}>
                  {formData.categorie || 'Sélectionnez une catégorie'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
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
                          onPress={() => {
                            setFormData({ ...formData, categorie });
                            setShowCategorieDropdown(false);
                          }}
                        >
                          <Text style={styles.modalItemText}>{categorie}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>

            {/* Niveau d'expérience */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Niveau d'expérience</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowNiveauDropdown(!showNiveauDropdown)}
              >
                <Text style={[styles.selectText, !formData.niveauExperience && styles.placeholderText]}>
                  {formData.niveauExperience || 'Sélectionnez votre niveau'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
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
                      <Text style={styles.modalTitle}>Sélectionner votre niveau</Text>
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
                          onPress={() => {
                            setFormData({ ...formData, niveauExperience: niveau });
                            setShowNiveauDropdown(false);
                          }}
                        >
                          <Text style={styles.modalItemText}>{niveau}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>TJM (€/jour)</Text>
              <TextInput
                ref={tjmRef}
                style={styles.input}
                placeholder="TJM (€/jour)"
                placeholderTextColor="#9CA3AF"
                value={formData.tjm}
                onChangeText={(text) => setFormData({ ...formData, tjm: text })}
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>

            {/* Disponibilité */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Disponibilité</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowDisponibiliteDropdown(!showDisponibiliteDropdown)}
              >
                <Text style={[styles.selectText, !formData.disponibilite && styles.placeholderText]}>
                  {formData.disponibilite || 'Sélectionnez votre disponibilité'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Modal pour les disponibilités */}
              <Modal
                visible={showDisponibiliteDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDisponibiliteDropdown(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Sélectionner votre disponibilité</Text>
                      <TouchableOpacity 
                        onPress={() => setShowDisponibiliteDropdown(false)}
                        style={styles.modalCloseButton}
                      >
                        <Ionicons name="close" size={24} color="#666666" />
                      </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.modalList}>
                      {disponibilites.map((disponibilite, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.modalItem,
                            index === disponibilites.length - 1 && styles.modalItemLast
                          ]}
                          onPress={() => {
                            setFormData({ ...formData, disponibilite });
                            setShowDisponibiliteDropdown(false);
                          }}
                        >
                          <Text style={styles.modalItemText}>{disponibilite}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>

          {/* Card 3: Liens & Portfolio */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Liens & Portfolio</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>LinkedIn</Text>
              <TextInput
                ref={linkedinRef}
                style={styles.input}
                placeholder="https://linkedin.com/in/..."
                placeholderTextColor="#9CA3AF"
                value={formData.linkedin}
                onChangeText={(text) => setFormData({ ...formData, linkedin: text })}
                keyboardType="url"
                returnKeyType="next"
                onSubmitEditing={() => portfolioRef.current?.focus()}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Portfolio</Text>
              <TextInput
                ref={portfolioRef}
                style={styles.input}
                placeholder="https://..."
                placeholderTextColor="#9CA3AF"
                value={formData.portfolio}
                onChangeText={(text) => setFormData({ ...formData, portfolio: text })}
                keyboardType="url"
                returnKeyType="next"
                onSubmitEditing={() => githubRef.current?.focus()}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>GitHub</Text>
              <TextInput
                ref={githubRef}
                style={styles.input}
                placeholder="https://github.com/..."
                placeholderTextColor="#9CA3AF"
                value={formData.github}
                onChangeText={(text) => setFormData({ ...formData, github: text })}
                keyboardType="url"
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreerProfil}>
            <Text style={styles.createButtonText}>Créer mon profil</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de validation du profil */}
      <Modal
        visible={showProfileModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileModalContent}>
            {/* Bouton de fermeture */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowProfileModal(false)}
            >
              <Ionicons name="close" size={20} color="#333333" />
            </TouchableOpacity>
            
            <Text style={styles.profileModalTitle}>
              Ton profil est prêt à être publié !
            </Text>
            <Text style={styles.profileModalSubtitle}>
              Crée un compte ou connecte-toi pour accéder aux missions adaptées à tes compétences.
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
              Aucun abonnement ne sera facturé avant la fin de ton essai gratuit.
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 100,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  selectText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: -16,
    marginBottom: 16,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#111827',
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
  // Styles pour le modal de validation du profil
  profileModalContent: {
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
  profileModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 10,
    lineHeight: 28,
  },
  profileModalSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  profileModalButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',
  },
  profileModalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Styles pour les nouveaux boutons du modal
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
  createButton: {
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    marginVertical: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

