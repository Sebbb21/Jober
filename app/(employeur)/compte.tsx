import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ComptePage() {
  const handleDeconnexion = () => {
    // TODO: Implémenter la déconnexion
  };

  const handleMesMissions = () => {
    router.push('/(employeur)/accueil');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon profil</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Carte de profil */}
        <View style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
          
          {/* Nom et badge */}
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Sophie Martin</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          </View>
          
          {/* Rôle */}
          <Text style={styles.role}>Designer UI/UX</Text>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFFFFF" />
            <Text style={styles.ratingText}>4.8 (12 missions)</Text>
          </View>
        </View>

        {/* Cartes d'information */}
        <View style={styles.infoCards}>
          {/* Mon abonnement */}
          <TouchableOpacity style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="card-membership" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Mon abonnement</Text>
              <Text style={styles.infoSubtitle}>Freelance Pro</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Mes missions */}
          <TouchableOpacity style={styles.infoCard} onPress={handleMesMissions}>
            <View style={styles.infoIcon}>
              <Ionicons name="briefcase" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Mes missions</Text>
              <Text style={styles.infoSubtitle}>12 terminées</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Mes avis */}
          <TouchableOpacity style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="star-outline" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Mes avis</Text>
              <Text style={styles.infoSubtitle}>4.8 / 5</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity style={styles.deconnexionButton} onPress={handleDeconnexion}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={styles.deconnexionText}>Déconnexion</Text>
        </TouchableOpacity>

        {/* Informations légales */}
        <View style={styles.legalInfo}>
          <Text style={styles.versionText}>Jober v1.0.0</Text>
          <View style={styles.legalLinks}>
            <Text style={styles.legalLink}>Conditions d'utilisation</Text>
            <Text style={styles.legalSeparator}>•</Text>
            <Text style={styles.legalLink}>Confidentialité</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  premiumBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  role: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  infoCards: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  deconnexionButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deconnexionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
    marginLeft: 8,
  },
  legalInfo: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 120, // Espace pour la navigation fixe
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalLink: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  legalSeparator: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
});
