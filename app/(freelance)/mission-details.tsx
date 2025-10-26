import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

export default function MissionDetailsPage() {
  const params = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  const handleApply = () => {
    // TODO: Implémenter la candidature
    console.log('Candidater à la mission');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de la mission</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre de la mission */}
        <View style={styles.titleSection}>
          <Text style={styles.missionTitle}>
            Développement d'une application mobile React Native
          </Text>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Nouveau</Text>
          </View>
        </View>

        {/* Carte Entreprise */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="business" size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.sectionLabel}>Entreprise</Text>
          </View>
          <Text style={styles.companyName}>TechCorp Inc.</Text>
          <Text style={styles.companyDescription}>
            Entreprise spécialisée dans le développement de solutions digitales innovantes.
          </Text>
        </View>

        {/* Description de la mission */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description de la mission</Text>
          <Text style={styles.descriptionText}>
            Nous recherchons un développeur React Native pour créer une app e-commerce.
          </Text>
          
          <View style={styles.separator} />
          
          <Text style={styles.sectionTitle}>Détails complets</Text>
          <Text style={styles.descriptionText}>
            Nous recherchons un freelance talentueux pour rejoindre notre équipe sur ce projet passionnant. Le candidat idéal possède une forte expérience dans les technologies mentionnées et est capable de travailler de manière autonome tout en communiquant efficacement avec l'équipe.
          </Text>
        </View>

        {/* Technologies utilisées */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Technologies utilisées</Text>
          <View style={styles.techContainer}>
            <View style={styles.techTag}>
              <Text style={styles.techTagText}>React Native</Text>
            </View>
            <View style={styles.techTag}>
              <Text style={styles.techTagText}>TypeScript</Text>
            </View>
            <View style={styles.techTag}>
              <Text style={styles.techTagText}>API REST</Text>
            </View>
          </View>
        </View>

        {/* Informations pratiques */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informations pratiques</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="cash-outline" size={20} color="#8B5CF6" />
              <Text style={styles.infoLabel}>Budget</Text>
            </View>
            <Text style={styles.infoValue}>5000€</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="time-outline" size={20} color="#8B5CF6" />
              <Text style={styles.infoLabel}>Délai</Text>
            </View>
            <Text style={styles.infoValue}>30 jours</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="calendar-outline" size={20} color="#8B5CF6" />
              <Text style={styles.infoLabel}>Date de début</Text>
            </View>
            <Text style={styles.infoValue}>Dès que possible</Text>
          </View>
        </View>

        {/* Bouton de candidature */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Candidater à cette mission</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 120,
    backgroundColor: '#F9FAFB',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  missionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 12,
    lineHeight: 28,
  },
  newBadge: {
    backgroundColor: '#E0CCFF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  companyDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  techTag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  techTagText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  footer: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  applyButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

