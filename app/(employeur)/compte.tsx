import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader, ProfileCard, InfoCard } from '../../src/components';

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
      <PageHeader title="Mon profil" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Carte de profil */}
        <ProfileCard
          initials="JD"
          name="Jean Dupont"
          subscriptionBadge="Premium"
          companyOrCategory="Tech Innovations SA"
          rating={4.9}
          ratingLabel="5 missions actives"
        />

        {/* Cartes d'information */}
        <View style={styles.infoCards}>
          <InfoCard
            icon="card-membership"
            iconType="MaterialIcons"
            title="Mon abonnement"
            subtitle="Business Pro"
          />
          
          <InfoCard
            icon="briefcase"
            iconType="Ionicons"
            title="Mes missions"
            subtitle="5 actives"
            onPress={handleMesMissions}
          />
          
          <InfoCard
            icon="star-outline"
            iconType="Ionicons"
            title="Mes avis"
            subtitle="4.9 / 5"
          />
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
  infoCards: {
    marginHorizontal: 20,
    marginTop: 24,
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
