import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DefaultFilters from '../../src/components/DefaultFilters';
import PageHeader from '../../src/components/PageHeader';
import StatsCard from '../../src/components/HomeStatsCard';

export default function FreelanceAccueilPage() {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    {
      id: '1',
      title: 'Nouvelle mission disponible',
      message: 'Une nouvelle mission de Design vous attend',
      time: 'Il y a 2 heures',
      type: 'mission',
    },
    {
      id: '2',
      title: 'Message reçu',
      message: 'Sophie a répondu à votre candidature',
      time: 'Il y a 5 heures',
      type: 'message',
    },
    {
      id: '3',
      title: 'Mise à jour de profil',
      message: 'Votre profil a été consulté 12 fois cette semaine',
      time: 'Il y a 1 jour',
      type: 'profil',
    },
  ]);

  const handleClearNotifications = () => {
    setNotificationsList([]);
  };

  const filters = [
    { id: 'Tous', label: 'Tous' },
    { id: 'Design', label: 'Design' },
    { id: 'Développement', label: 'Développement' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Rédaction', label: 'Rédaction' },
  ];

  const missions = [
    {
      id: '1',
      title: 'Refonte UI d\'une app mobile',
      tag: 'Nouveau',
      category: 'Design',
      description: 'Modernisation de l\'interface d\'une application de fitness.',
      skills: ['Figma', 'UI/UX', 'Mobile'],
      price: '3500€',
      duration: '20 jours',
    },
    {
      id: '2',
      title: 'Landing page pour startup',
      tag: 'Nouveau',
      category: 'Développement',
      description: 'Création d\'une landing page attractive et convertissante.',
      skills: ['React', 'Tailwind', 'Framer Motion'],
      price: '1500€',
      duration: '10 jours',
    },
    {
      id: '3',
      title: 'Optimisation SEO d\'un site web',
      tag: 'Nouveau',
      category: 'Marketing',
      description: 'Audit et optimisation des performances SEO d\'un site e-commerce.',
      skills: ['SEO', 'Google Analytics', 'Content Marketing'],
      price: '2500€',
      duration: '15 jours',
    },
    {
      id: '4',
      title: 'Application mobile React Native',
      tag: 'Nouveau',
      category: 'Développement',
      description: 'Développement d\'une application mobile cross-platform.',
      skills: ['React Native', 'TypeScript', 'Firebase'],
      price: '4500€',
      duration: '30 jours',
    },
  ];

  // Filtrer les missions selon le filtre sélectionné
  const filteredMissions = selectedFilter === 'Tous' 
    ? missions 
    : missions.filter(mission => mission.category === selectedFilter);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Bonjour Sophie 👋</Text>
            <Text style={styles.subGreetingText}>Prête pour de nouvelles missions ?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={() => setShowNotifications(true)}>
            <View style={styles.notificationContainer}>
              <Ionicons name="notifications-outline" size={24} color="#333333" />
              {notificationsList.length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{notificationsList.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <PageHeader title="Accueil" />

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatsCard
            icon="briefcase-outline"
            iconType="Ionicons"
            number="12"
            label="Missions totales"
          />
          <StatsCard
            icon="cash-outline"
            iconType="Ionicons"
            number="8500€"
            label="Revenus générés"
          />
        </View>

        {/* Recommended Missions Section */}
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedTitle}>Recommandées pour vous</Text>
          <Text style={styles.recommendedSubtitle}>Missions correspondant à votre profil</Text>
        </View>

        {/* Filter Bar */}
        <View style={styles.filterSection}>
          <DefaultFilters
            filters={filters}
            activeFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </View>

        {/* Mission Cards */}
        {filteredMissions.length === 0 ? (
          <View style={styles.emptyState}>
            <Image 
              source={require('../../assets/images/no-result.png')} 
              style={styles.emptyStateImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyStateTitle}>Aucune mission trouvée</Text>
            <Text style={styles.emptyStateText}>
              Aucune mission ne correspond à ce filtre pour le moment.
            </Text>
          </View>
        ) : (
          filteredMissions.map((mission) => (
            <View key={mission.id} style={styles.missionCard}>
              <View style={styles.missionHeader}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <View style={styles.newTag}>
                  <Text style={styles.newTagText}>{mission.tag}</Text>
                </View>
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
                <Text style={styles.missionPrice}>{mission.price}</Text>
                <View style={styles.missionDuration}>
                  <Ionicons name="time-outline" size={16} color="#333333" />
                  <Text style={styles.missionDurationText}>{mission.duration}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => router.push('/(freelance)/mission-details')}
              >
                <Text style={styles.applyButtonText}>Candidater</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal de notifications */}
      <Modal
        visible={showNotifications}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <View style={styles.modalHeaderRight}>
                {notificationsList.length > 0 && (
                  <TouchableOpacity onPress={handleClearNotifications} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Tout supprimer</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => setShowNotifications(false)}>
                  <Ionicons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView style={styles.notificationsList}>
              {notificationsList.length === 0 ? (
                <View style={styles.emptyNotifications}>
                  <Ionicons name="notifications-outline" size={64} color="#D1D5DB" />
                  <Text style={styles.emptyNotificationsText}>Aucune notification</Text>
                </View>
              ) : (
                notificationsList.map((notification) => (
                <TouchableOpacity key={notification.id} style={styles.notificationItem}>
                  <View style={styles.notificationIcon}>
                    {notification.type === 'mission' && (
                      <Ionicons name="briefcase" size={20} color="#8B5CF6" />
                    )}
                    {notification.type === 'message' && (
                      <Ionicons name="chatbubble" size={20} color="#8B5CF6" />
                    )}
                    {notification.type === 'profil' && (
                      <Ionicons name="person" size={20} color="#8B5CF6" />
                    )}
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 100, // Espace pour la barre de navigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 15,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  subGreetingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  notificationButton: {
    padding: 5,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    gap: 12,
  },
  recommendedHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  filterSection: {
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 20,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  recommendedSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  missionCard: {
    backgroundColor: '#F8F7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 20,
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
  missionPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  missionDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionDurationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyStateImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
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
  // Styles pour le modal de notifications
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationsList: {
    maxHeight: 400,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyNotifications: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyNotificationsText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
});
