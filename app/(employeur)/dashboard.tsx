import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PageHeader, DashboardAnalytics, MonthlyExpenses, RecentProjects, TopClientsFreelances } from '../../src/components';

export default function DashboardPage() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const years = ['2023', '2024', '2025'];
  const months = ['Tous', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
  const budgetDetails = [
    { name: 'App mobile e-commerce', amount: '8500€' },
    { name: 'Refonte site web', amount: '6200€' },
    { name: 'Campagne marketing', amount: '3400€' },
    { name: 'Design logo', amount: '1800€' },
    { name: 'SEO optimisation', amount: '2100€' },
    { name: 'Application web', amount: '1450€' },
  ];

  const missionsDetail = [
    { name: 'Campagne marketing', freelancer: 'Lucas Bernard', price: '3400€', status: 'Terminé', rating: 5 },
    { name: 'Design logo', freelancer: 'Marie Lefebvre', price: '1800€', status: 'Terminé', rating: 4.5 },
    { name: 'SEO optimisation', freelancer: 'Pierre Moreau', price: '2100€', status: 'Terminé', rating: 5 },
    { name: 'Application web', freelancer: 'Julie Rousseau', price: '1450€', status: 'Terminé', rating: 4 },
    { name: 'Site vitrine', freelancer: 'Antoine Blanc', price: '2200€', status: 'Terminé', rating: 5 },
    { name: 'Branding', freelancer: 'Camille Petit', price: '1900€', status: 'Terminé', rating: 4.5 },
    { name: 'Newsletter', freelancer: 'Maxime Roux', price: '800€', status: 'Terminé', rating: 4 },
    { name: 'Photos produits', freelancer: 'Laura Simon', price: '1200€', status: 'Terminé', rating: 5 },
  ];

  const missionsActivesDetail = [
    { name: 'App mobile e-commerce', freelancer: 'Sophie Martin', price: '8500€', status: 'En cours', progress: 65 },
    { name: 'Refonte site web', freelancer: 'Thomas Dupont', price: '6200€', status: 'En cours', progress: 40 },
    { name: 'Marketing digital', freelancer: 'Emma Dubois', price: '4500€', status: 'En cours', progress: 80 },
  ];

  const satisfactionDetail = [
    { 
      project: 'Campagne marketing', 
      freelancer: 'Lucas Bernard', 
      quote: "Excellent travail, très professionnel et à l'écoute. Je recommande vivement !",
      rating: 5 
    },
    { 
      project: 'Design logo', 
      freelancer: 'Marie Lefebvre', 
      quote: "Créatif et attentif aux détails. Résultat au-delà de mes attentes.",
      rating: 4.5 
    },
    { 
      project: 'SEO optimisation', 
      freelancer: 'Pierre Moreau', 
      quote: "Très professionnel, résultats visibles rapidement.",
      rating: 5 
    },
    { 
      project: 'Application web', 
      freelancer: 'Julie Rousseau', 
      quote: "Développeuse compétente et réactive. Super collaboration.",
      rating: 4 
    },
    { 
      project: 'Site vitrine', 
      freelancer: 'Antoine Blanc', 
      quote: "Projet livré dans les temps, design moderne et fonctionnel.",
      rating: 5 
    },
  ];

  const topFreelances = [
    { rank: 1, name: 'Sophie Martin', specialty: 'Développeuse Full Stack', totalPaid: '12,500€' },
    { rank: 2, name: 'Thomas Dupont', specialty: 'Designer UI/UX', totalPaid: '8,300€' },
    { rank: 3, name: 'Lucas Bernard', specialty: 'Marketing Digital', totalPaid: '5,200€' },
  ];

  const metrics = [
    {
      id: 'budget',
      icon: 'euro',
      iconType: 'MaterialIcons' as const,
      iconColor: '#10B981',
      bgColor: '#D1FAE5',
      value: '23 450€',
      label: 'Budget dépensé',
    },
    {
      id: 'missions',
      icon: 'briefcase',
      iconType: 'Ionicons' as const,
      iconColor: '#3B82F6',
      bgColor: '#DBEAFE',
      value: '8',
      label: 'Missions terminées',
    },
    {
      id: 'actives',
      icon: 'trending-up',
      iconType: 'Ionicons' as const,
      iconColor: '#8B5CF6',
      bgColor: '#F3E8FF',
      value: '3',
      label: 'Missions actives',
    },
    {
      id: 'satisfaction',
      icon: 'star-outline',
      iconType: 'Ionicons' as const,
      iconColor: '#F97316',
      bgColor: '#FFEDD5',
      value: '4.7/5',
      label: 'Satisfaction moyenne',
    },
  ];

  const handleMetricPress = (metricId: string) => {
    setSelectedMetric(metricId);
  };

  const projects = [
    {
      id: '1',
      name: 'App mobile e-commerce',
      assignee: 'Sophie Martin',
      status: 'En cours',
      progress: 70,
    },
    {
      id: '2',
      name: 'Refonte site web',
      assignee: 'Thomas Dupont',
      status: 'En cours',
      progress: 40,
    },
    {
      id: '3',
      name: 'Campagne marketing',
      assignee: 'Lucas Bernard',
      status: 'Terminé',
      progress: 100,
    },
  ];

  const monthlyData = [
    { month: 'Jan', value: 2800 },
    { month: 'Fév', value: 4000 },
    { month: 'Mar', value: 2500 },
    { month: 'Avr', value: 5000 },
    { month: 'Mai', value: 3500 },
    { month: 'Juin', value: 4200 },
    { month: 'Juil', value: 3800 },
    { month: 'Août', value: 2900 },
    { month: 'Sept', value: 4500 },
    { month: 'Oct', value: 3900 },
    { month: 'Nov', value: 3200 },
    { month: 'Déc', value: 4700 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader 
        title="Dashboard" 
        subtitle="Vue d'ensemble de vos projets" 
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <DashboardAnalytics metrics={metrics} onMetricPress={handleMetricPress} />

        {/* Monthly Expenses Section */}
        <MonthlyExpenses 
          title="Dépenses mensuelles"
          data={monthlyData}
          years={years}
          months={months}
        />

        {/* Recent Projects Section */}
        <RecentProjects title="Projets récents" projects={projects} />

        {/* Top Freelances Section */}
        <TopClientsFreelances 
          title="Top freelances" 
          items={topFreelances}
          isLastSection={true}
        />
      </ScrollView>

      {/* Metric Details Modal */}
      <Modal
        transparent
        visible={selectedMetric !== null}
        animationType="fade"
        onRequestClose={() => setSelectedMetric(null)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalBackdropTouch}
            activeOpacity={1}
            onPress={() => setSelectedMetric(null)}
          />
          <View style={styles.metricModalContent}>
            <View style={styles.metricModalHeader}>
              <Text style={styles.metricModalTitle}>
                {selectedMetric === 'budget' && 'Budget dépensé'}
                {selectedMetric === 'missions' && 'Missions terminées'}
                {selectedMetric === 'actives' && 'Missions actives'}
                {selectedMetric === 'satisfaction' && 'Satisfaction moyenne'}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedMetric(null)}
                style={styles.metricModalCloseButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.metricModalScrollView} showsVerticalScrollIndicator={true}>
              {selectedMetric === 'budget' && (
                <>
                  {budgetDetails.map((item, index) => (
                    <View key={index} style={styles.metricDetailItem}>
                      <Text style={styles.metricDetailName}>{item.name}</Text>
                      <View style={styles.metricDetailAmountBadge}>
                        <Text style={styles.metricDetailAmount}>{item.amount}</Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
              {selectedMetric === 'missions' && (
                <>
                  {missionsDetail.map((mission, index) => (
                    <View key={index} style={styles.missionDetailItem}>
                      <View style={styles.missionDetailLeft}>
                        <Text style={styles.missionDetailName}>{mission.name}</Text>
                        <Text style={styles.missionDetailFreelancer}>{mission.freelancer}</Text>
                        <Text style={styles.missionDetailPrice}>{mission.price}</Text>
                      </View>
                      <View style={styles.missionDetailRight}>
                        <View style={[styles.missionStatusBadge, mission.status === 'Terminé' && styles.missionStatusTermine]}>
                          <Text style={styles.missionStatusText}>{mission.status}</Text>
                        </View>
                        <View style={styles.missionRating}>
                          <MaterialIcons name="star" size={20} color="#F59E0B" />
                          <Text style={styles.missionRatingText}>{mission.rating}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              )}
              {selectedMetric === 'actives' && (
                <>
                  {missionsActivesDetail.map((mission, index) => (
                    <View key={index} style={styles.missionDetailItem}>
                      <View style={styles.missionDetailLeft}>
                        <Text style={styles.missionDetailName}>{mission.name}</Text>
                        <Text style={styles.missionDetailFreelancer}>{mission.freelancer}</Text>
                        <View style={styles.missionProgressBar}>
                          <View style={[styles.missionProgressFill, { width: `${mission.progress}%` }]} />
                        </View>
                        <Text style={styles.missionProgressText}>{mission.progress}%</Text>
                        <Text style={styles.missionDetailPrice}>{mission.price}</Text>
                      </View>
                      <View style={styles.missionDetailRight}>
                        <View style={styles.missionStatusBadge}>
                          <Text style={styles.missionStatusText}>{mission.status}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              )}
              {selectedMetric === 'satisfaction' && (
                <>
                  {satisfactionDetail.map((review, index) => (
                    <View key={index} style={styles.reviewDetailItem}>
                      <View style={styles.reviewDetailHeader}>
                        <Text style={styles.reviewProjectName}>{review.project}</Text>
                        <View style={styles.reviewRating}>
                          <MaterialIcons name="star" size={20} color="#F59E0B" />
                          <Text style={styles.reviewRatingText}>{review.rating}</Text>
                        </View>
                      </View>
                      <Text style={styles.reviewFreelancer}>{review.freelancer}</Text>
                      <Text style={styles.reviewQuote}>{review.quote}</Text>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 120,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lastSectionCard: {
    marginBottom: 75,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filtersContainerVertical: {
    flexDirection: 'column',
    gap: 8,
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  pickerWrapper: {
    position: 'relative',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
  },
  filterText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  pickerDropdown: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    overflow: 'hidden',
    maxHeight: 200,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  pickerItemText: {
    fontSize: 14,
    color: '#111827',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdropTouch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  metricModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
    alignItems: 'center',
  },
  metricModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  metricModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  metricModalCloseButton: {
    padding: 4,
  },
  metricModalScrollView: {
    width: '100%',
  },
  metricDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  metricDetailName: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  metricDetailAmountBadge: {
    backgroundColor: '#F3F0FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  metricDetailAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  metricDetailText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  missionDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  missionDetailLeft: {
    flex: 1,
  },
  missionDetailRight: {
    alignItems: 'flex-end',
  },
  missionDetailName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  missionDetailFreelancer: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  missionDetailPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  missionStatusBadge: {
    backgroundColor: '#F3F0FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  missionStatusTermine: {
    backgroundColor: '#D1FAE5',
  },
  missionStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  missionRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  missionRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  missionProgressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 4,
  },
  missionProgressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
  },
  missionProgressText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  reviewDetailItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reviewDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewProjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reviewFreelancer: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  reviewQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
    lineHeight: 20,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});
