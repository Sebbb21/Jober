import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function EmployeurAccueilPage() {
  const [activeFilter, setActiveFilter] = useState('toutes');

  const handleCreerMission = () => {
    router.push('/(employeur)/nouvelle-mission');
  };

  const handleVoirCandidatures = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission) {
      router.replace(`/(employeur)/candidatures?missionTitle=${encodeURIComponent(mission.title)}`);
    }
  };

  const statsCards = [
    {
      id: 'candidatures',
      icon: 'people',
      iconType: 'Ionicons',
      number: '35',
      label: 'Toutes les candidatures',
    },
    {
      id: 'budget-total',
      icon: 'cash-outline',
      iconType: 'Ionicons',
      number: '12500€',
      label: 'Budget total',
    },
  ];

  const missions = [
    {
      id: '1',
      title: 'Développement app mobile',
      status: 'active',
      statusText: 'Active',
      timeAgo: 'Il y a 3 jours',
      candidatures: 12,
      budget: '5000€',
    },
    {
      id: '2',
      title: 'Design UI/UX dashboard',
      status: 'active',
      statusText: 'Active',
      timeAgo: 'Il y a 1 semaine',
      candidatures: 8,
      budget: '3500€',
    },
    {
      id: '3',
      title: 'Campagne marketing digital',
      status: 'terminée',
      statusText: 'Terminée',
      timeAgo: 'Il y a 3 semaines',
      candidatures: 15,
      budget: '4000€',
    },
  ];

  const filteredMissions = missions.filter(mission => {
    if (activeFilter === 'toutes') return true;
    return mission.status === activeFilter;
  });

  const renderIcon = (iconName: string, iconType: string, size: number, color: string) => {
    if (iconType === 'Ionicons') {
      return <Ionicons name={iconName as any} size={size} color={color} />;
    } else if (iconType === 'MaterialIcons') {
      return <MaterialIcons name={iconName as any} size={size} color={color} />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accueil</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {statsCards.map((card) => (
            <View key={card.id} style={styles.statCard}>
              <View style={styles.statIcon}>
                {renderIcon(card.icon, card.iconType, 24, '#8B5CF6')}
              </View>
              <Text style={styles.statNumber}>{card.number}</Text>
              <Text style={styles.statLabel}>{card.label}</Text>
            </View>
          ))}
        </View>

        {/* Nouvelle Mission Button */}
        <TouchableOpacity style={styles.newMissionButton} onPress={handleCreerMission}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.newMissionButtonText}>Nouvelle mission</Text>
        </TouchableOpacity>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {[
            { id: 'toutes', label: 'Toutes' },
            { id: 'active', label: 'Actives' },
            { id: 'terminée', label: 'Terminées' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter.id)}
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
        </View>

        {/* Missions List */}
        <View style={styles.missionsContainer}>
          {filteredMissions.map((mission) => (
            <View key={mission.id} style={styles.missionCard}>
              <View style={styles.missionHeader}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <View style={styles.missionStatus}>
                  <View
                    style={[
                      styles.statusBadge,
                      mission.status === 'active' ? styles.statusBadgeActive : styles.statusBadgeCompleted,
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        mission.status === 'active' ? styles.statusDotActive : styles.statusDotCompleted,
                      ]}
                    />
                    <Text style={[
                      styles.statusText,
                      mission.status === 'terminée' && styles.statusTextCompleted
                    ]}>{mission.statusText}</Text>
                  </View>
                  <Text style={styles.timeAgo}>{mission.timeAgo}</Text>
                </View>
              </View>

              <View style={styles.missionDetails}>
                <View style={styles.missionDetail}>
                  <View style={styles.missionDetailIcon}>
                    <Ionicons name="people" size={20} color="#8B5CF6" />
                  </View>
                  <View style={styles.missionDetailContent}>
                    <Text style={styles.missionDetailLabel}>Candidatures</Text>
                    <Text style={styles.missionDetailNumber}>{mission.candidatures}</Text>
                  </View>
                </View>
                <View style={styles.missionDetail}>
                  <View style={styles.missionDetailIcon}>
                    <MaterialIcons name="euro" size={20} color="#8B5CF6" />
                  </View>
                  <View style={styles.missionDetailContent}>
                    <Text style={styles.missionDetailLabel}>Budget</Text>
                    <Text style={styles.missionDetailNumberPurple}>{mission.budget}</Text>
                  </View>
                </View>
              </View>

              {mission.status === 'active' && (
                <TouchableOpacity
                  style={styles.candidaturesButton}
                  onPress={() => handleVoirCandidatures(mission.id)}
                >
                  <Ionicons name="people" size={16} color="#FFFFFF" />
                  <Text style={styles.candidaturesButtonText}>Voir les candidatures</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  newMissionButton: {
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  newMissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 28,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
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
  missionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Espace pour la navigation fixe
  },
  missionCard: {
    backgroundColor: '#F8F7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 160, // Hauteur fixe pour toutes les cartes (augmentée)
    // Effet de dégradé simulé avec une couleur de base
  },
  missionHeader: {
    marginBottom: 20,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  missionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  statusBadgeActive: {
    backgroundColor: 'transparent',
    borderColor: '#9CA3AF',
  },
  statusBadgeCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotActive: {
    backgroundColor: '#10B981',
  },
  statusDotCompleted: {
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  statusTextCompleted: {
    color: '#10B981',
  },
  timeAgo: {
    fontSize: 12,
    color: '#6B7280',
  },
  missionDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  missionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  missionDetailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionDetailContent: {
    alignItems: 'flex-start',
  },
  missionDetailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  missionDetailNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  missionDetailNumberPurple: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  candidaturesButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  candidaturesButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
