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

export default function FreelanceDashboardPage() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const years = ['2023', '2024', '2025'];
  const months = ['Tous', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const revenusDetails = [
    { name: 'Design UI/UX - TechCorp', amount: '6,500€' },
    { name: 'Développement app - StartupX', amount: '4,200€' },
    { name: 'Branding - DesignHub', amount: '3,100€' },
    { name: 'SEO - EcomStore', amount: '1,650€' },
  ];

  const projetsRecentsDetails = [
    { 
      name: 'Refonte site web', 
      client: 'TechCorp Inc.', 
      price: '2,500€', 
      status: 'Terminé', 
      rating: 5 
    },
    { 
      name: 'App mobile', 
      client: 'StartupX', 
      price: '1,800€', 
      status: 'Terminé', 
      rating: 4.5 
    },
    { 
      name: 'Design logo', 
      client: 'DesignHub', 
      price: '1,200€', 
      status: 'Terminé', 
      rating: 5 
    },
    { 
      name: 'Site e-commerce', 
      client: 'ShopOnline', 
      price: '3,200€', 
      status: 'Terminé', 
      rating: 4.5 
    },
    { 
      name: 'Campagne marketing', 
      client: 'MarketPro', 
      price: '1,500€', 
      status: 'Terminé', 
      rating: 5 
    },
    { 
      name: 'Application web', 
      client: 'WebCorp', 
      price: '2,100€', 
      status: 'Terminé', 
      rating: 4 
    },
    { 
      name: 'SEO optimisation', 
      client: 'SEOExpert', 
      price: '950€', 
      status: 'Terminé', 
      rating: 5 
    },
    { 
      name: 'Landing page', 
      client: 'BusinessX', 
      price: '800€', 
      status: 'Terminé', 
      rating: 4.5 
    },
    { 
      name: 'Portfolio', 
      client: 'CreativeStudio', 
      price: '1,100€', 
      status: 'Terminé', 
      rating: 5 
    },
    { 
      name: 'Blog WordPress', 
      client: 'BlogCo', 
      price: '700€', 
      status: 'Terminé', 
      rating: 4 
    },
    { 
      name: 'API REST', 
      client: 'DataTech', 
      price: '1,900€', 
      status: 'Terminé', 
      rating: 5 
    },
    { 
      name: 'Dashboard admin', 
      client: 'AdminPro', 
      price: '1,600€', 
      status: 'Terminé', 
      rating: 4.5 
    },
  ];

  const projetsActifsDetails = [
    { 
      name: 'Refonte website', 
      client: 'Digital Agency', 
      price: '5,200€', 
      status: 'En cours', 
      progress: 65 
    },
    { 
      name: 'App mobile', 
      client: 'InnovateNow', 
      price: '7,800€', 
      status: 'En cours', 
      progress: 40 
    },
    { 
      name: 'Consultation SEO', 
      client: 'RetailPro', 
      price: '2,100€', 
      status: 'En cours', 
      progress: 80 
    },
  ];

  const avisDetails = [
    { 
      projet: 'Design UI/UX - TechCorp', 
      client: 'TechCorp Inc.', 
      quote: "Excellent travail, très professionnel et créatif. Nous recommandons vivement !",
      rating: 5 
    },
    { 
      projet: 'Développement app - StartupX', 
      client: 'StartupX', 
      quote: "Très réactif et compétent. Le résultat dépasse nos attentes.",
      rating: 4.5 
    },
    { 
      projet: 'Branding - DesignHub', 
      client: 'DesignHub', 
      quote: "Professionnel et à l'écoute. Design moderne et soigné.",
      rating: 5 
    },
  ];

  const topClients = [
    { rank: 1, name: 'TechCorp Inc.', missions: '4 missions', totalPaid: '6,500€' },
    { rank: 2, name: 'StartupX', missions: '3 missions', totalPaid: '4,200€' },
    { rank: 3, name: 'DesignHub', missions: '2 missions', totalPaid: '3,100€' },
  ];

  const metrics = [
    {
      id: 'revenus',
      icon: 'euro',
      iconType: 'MaterialIcons' as const,
      iconColor: '#10B981',
      bgColor: '#D1FAE5',
      value: '15 450€',
      label: 'Revenus générés',
    },
    {
      id: 'note',
      icon: 'trending-up',
      iconType: 'Ionicons' as const,
      iconColor: '#F59E0B',
      bgColor: '#FFEDD5',
      value: '4.8',
      label: 'Note moyenne',
    },
    {
      id: 'candidatures',
      icon: 'calendar',
      iconType: 'Ionicons' as const,
      iconColor: '#3B82F6',
      bgColor: '#DBEAFE',
      value: '24',
      label: 'Candidatures envoyées',
    },
    {
      id: 'missions',
      icon: 'people',
      iconType: 'Ionicons' as const,
      iconColor: '#8B5CF6',
      bgColor: '#F3E8FF',
      value: '12',
      label: 'Missions terminées',
    },
  ];

  const handleMetricPress = (metricId: string) => {
    setSelectedMetric(metricId);
  };

  const projects = [
    {
      id: '1',
      name: 'Refonte website',
      assignee: 'Digital Agency',
      status: 'En cours',
      progress: 65,
    },
    {
      id: '2',
      name: 'App mobile',
      assignee: 'InnovateNow',
      status: 'En cours',
      progress: 40,
    },
    {
      id: '3',
      name: 'Consultation SEO',
      assignee: 'RetailPro',
      status: 'En cours',
      progress: 80,
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
        subtitle="Vue d'ensemble de votre activité" 
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <DashboardAnalytics metrics={metrics} onMetricPress={handleMetricPress} />

        {/* Monthly Expenses Section */}
        <MonthlyExpenses 
          title="Revenus mensuels"
          data={monthlyData}
          years={years}
          months={months}
        />

        {/* Recent Projects Section */}
        <RecentProjects title="Projets récents" projects={projects} />

        {/* Top Clients Section */}
        <TopClientsFreelances 
          title="Top clients" 
          items={topClients}
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
                {selectedMetric === 'revenus' && 'Revenus générés'}
                {selectedMetric === 'note' && 'Note moyenne'}
                {selectedMetric === 'candidatures' && 'Candidatures envoyées'}
                {selectedMetric === 'missions' && 'Missions terminées'}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedMetric(null)}
                style={styles.metricModalCloseButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.metricModalScrollView} showsVerticalScrollIndicator={true}>
              {selectedMetric === 'revenus' && (
                <>
                  {revenusDetails.map((item, index) => (
                    <View key={index} style={styles.metricDetailItem}>
                      <Text style={styles.metricDetailName}>{item.name}</Text>
                      <View style={styles.metricDetailAmountBadge}>
                        <Text style={styles.metricDetailAmount}>{item.amount}</Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
              {selectedMetric === 'note' && (
                <>
                  {avisDetails.map((review, index) => (
                    <View key={index} style={styles.reviewDetailItem}>
                      <View style={styles.reviewDetailHeader}>
                        <Text style={styles.reviewProjectName}>{review.projet}</Text>
                        <View style={styles.reviewRating}>
                          <MaterialIcons name="star" size={20} color="#F59E0B" />
                          <Text style={styles.reviewRatingText}>{review.rating}</Text>
                        </View>
                      </View>
                      <Text style={styles.reviewClient}>{review.client}</Text>
                      <Text style={styles.reviewQuote}>{review.quote}</Text>
                    </View>
                  ))}
                </>
              )}
              {selectedMetric === 'candidatures' && (
                <>
                  {projetsRecentsDetails.map((projet, index) => (
                    <View key={index} style={styles.missionDetailItem}>
                      <View style={styles.missionDetailLeft}>
                        <Text style={styles.missionDetailName}>{projet.name}</Text>
                        <Text style={styles.missionDetailClient}>{projet.client}</Text>
                        <Text style={styles.missionDetailPrice}>{projet.price}</Text>
                      </View>
                      <View style={styles.missionDetailRight}>
                        <View style={[styles.missionStatusBadge, projet.status === 'Terminé' && styles.missionStatusTermine]}>
                          <Text style={styles.missionStatusText}>{projet.status}</Text>
                        </View>
                        <View style={styles.missionRating}>
                          <MaterialIcons name="star" size={20} color="#F59E0B" />
                          <Text style={styles.missionRatingText}>{projet.rating}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              )}
              {selectedMetric === 'missions' && (
                <>
                  {projetsRecentsDetails.map((projet, index) => (
                    <View key={index} style={styles.missionDetailItem}>
                      <View style={styles.missionDetailLeft}>
                        <Text style={styles.missionDetailName}>{projet.name}</Text>
                        <Text style={styles.missionDetailClient}>{projet.client}</Text>
                        <Text style={styles.missionDetailPrice}>{projet.price}</Text>
                      </View>
                      <View style={styles.missionDetailRight}>
                        <View style={[styles.missionStatusBadge, projet.status === 'Terminé' && styles.missionStatusTermine]}>
                          <Text style={styles.missionStatusText}>{projet.status}</Text>
                        </View>
                        <View style={styles.missionRating}>
                          <MaterialIcons name="star" size={20} color="#F59E0B" />
                          <Text style={styles.missionRatingText}>{projet.rating}</Text>
                        </View>
                      </View>
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
  scrollView: {
    flex: 1,
    paddingBottom: 120,
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
  missionDetailClient: {
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
  reviewClient: {
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
