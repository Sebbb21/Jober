import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilFreelancePage() {
  const handleBack = () => {
    router.back();
  };

  const handleContacter = () => {
    // TODO: Ouvrir la messagerie ou formulaire de contact
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
          <Text style={styles.backText}>Retour aux candidats</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil du freelance</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profil Principal */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>SM</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sophie Martin</Text>
              <Text style={styles.profileRole}>Designer UI/UX</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#8B5CF6" />
                <Text style={styles.ratingText}>4.9</Text>
                <Text style={styles.reviewsText}>(47 avis)</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.missionsText}>24 missions</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.dailyRateCard}>
            <Text style={styles.dailyRateAmount}>450€/jour</Text>
            <Text style={styles.dailyRateLabel}>Taux journalier moyen</Text>
          </View>

          <TouchableOpacity style={styles.contactButton} onPress={handleContacter}>
            <Text style={styles.contactButtonText}>Contacter</Text>
          </TouchableOpacity>
        </View>

        {/* Informations de contact */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={20} color="#8B5CF6" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>sophie.martin@example.com</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="call" size={20} color="#8B5CF6" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Téléphone</Text>
              <Text style={styles.contactValue}>+33 6 12 34 56 78</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="calendar" size={20} color="#8B5CF6" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Expérience</Text>
              <Text style={styles.contactValue}>5 ans</Text>
            </View>
          </View>
        </View>

        {/* Compétences */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Compétences</Text>
          <View style={styles.skillsContainer}>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Figma</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>UI/UX</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Prototypage</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Design System</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Wireframing</Text>
            </View>
          </View>
        </View>

        {/* À propos */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.aboutText}>
            Designer UI/UX passionnée avec plus de 5 ans d'expérience dans la création d'interfaces intuitives et esthétiques. Spécialisée dans le design de produits SaaS et applications mobiles. J'accompagne mes clients de la conception à la livraison en passant par les tests utilisateurs.
          </Text>
        </View>

        {/* Missions réalisées */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Missions réalisées (3)</Text>
          
          <View style={styles.missionItem}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>Refonte complète interface SaaS</Text>
              <View style={styles.yearTag}>
                <Text style={styles.yearText}>2024</Text>
              </View>
            </View>
            <Text style={styles.missionDetails}>TechCorp • 3 mois</Text>
            <Text style={styles.missionDescription}>
              Redesign complet de la plateforme avec focus sur l'UX et l'accessibilité
            </Text>
          </View>

          <View style={styles.missionItem}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>Design système mobile banking</Text>
              <View style={styles.yearTag}>
                <Text style={styles.yearText}>2024</Text>
              </View>
            </View>
            <Text style={styles.missionDetails}>FinanceApp • 2 mois</Text>
            <Text style={styles.missionDescription}>
              Création d'un design system cohérent pour application mobile bancaire
            </Text>
          </View>

          <View style={styles.missionItem}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>Application e-commerce</Text>
              <View style={styles.yearTag}>
                <Text style={styles.yearText}>2023</Text>
              </View>
            </View>
            <Text style={styles.missionDetails}>ShopFast • 4 mois</Text>
            <Text style={styles.missionDescription}>
              Interface complète pour marketplace avec parcours d'achat optimisé
            </Text>
          </View>
        </View>

        {/* Avis clients */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Avis clients (3)</Text>
          
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewClientInfo}>
                <Text style={styles.reviewClientName}>Jean Dupont</Text>
                <Text style={styles.reviewCompany}>TechCorp</Text>
              </View>
              <View style={styles.reviewRating}>
                <Ionicons name="star" size={16} color="#8B5CF6" />
                <Text style={styles.reviewRatingText}>5</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Excellent travail ! Sophie a su comprendre nos besoins et a livré un design moderne et parfaitement adapté à nos utilisateurs."
            </Text>
            <Text style={styles.reviewDate}>Janvier 2024</Text>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewClientInfo}>
                <Text style={styles.reviewClientName}>Marie Laurent</Text>
                <Text style={styles.reviewCompany}>FinanceApp</Text>
              </View>
              <View style={styles.reviewRating}>
                <Ionicons name="star" size={16} color="#8B5CF6" />
                <Text style={styles.reviewRatingText}>5</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Très professionnelle, réactive et créative. Le design system créé est maintenant utilisé sur tous nos produits."
            </Text>
            <Text style={styles.reviewDate}>Novembre 2023</Text>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewClientInfo}>
                <Text style={styles.reviewClientName}>Pierre Bernard</Text>
                <Text style={styles.reviewCompany}>ShopFast</Text>
              </View>
              <View style={styles.reviewRating}>
                <Ionicons name="star" size={16} color="#8B5CF6" />
                <Text style={styles.reviewRatingText}>4.8</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Collaboration fluide et résultats au-delà de nos attentes. Je recommande vivement!"
            </Text>
            <Text style={styles.reviewDate}>Août 2023</Text>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
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
  reviewsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  separator: {
    fontSize: 14,
    color: '#6B7280',
    marginHorizontal: 4,
  },
  missionsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dailyRateCard: {
    backgroundColor: '#F3F0FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  dailyRateAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  dailyRateLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  contactButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skillText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  missionItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  yearTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  yearText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  missionDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  missionDescription: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewClientInfo: {
    flex: 1,
  },
  reviewClientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  reviewCompany: {
    fontSize: 14,
    color: '#6B7280',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  reviewText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
});
