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
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AbonnementEmployeurPage() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [clickedPlan, setClickedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '14,99',
      period: '/mois',
      features: [
        '1 mission active',
        '5 candidatures visibles',
        'Support par email'
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '29,99',
      period: '/mois',
      features: [
        '3 missions actives',
        '15 candidatures visibles',
        'Support prioritaire',
        'Statistiques avancées'
      ],
      popular: true,
    },
    {
      id: 'business',
      name: 'Business',
      price: '59,99',
      period: '/mois',
      features: [
        'Missions illimitées',
        'Candidatures illimitées',
        'Support premium',
        'Badge recruteur vérifié',
        'Accès API'
      ],
      popular: false,
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleStartTrial = (planId: string) => {
    setClickedPlan(planId);
    setShowConfirmationModal(true);
  };

  const getSelectedPlanName = () => {
    const plan = plans.find(p => p.id === clickedPlan);
    return plan ? plan.name : 'Pro';
  };

  const handleAccessDashboard = () => {
    setShowConfirmationModal(false);
    router.replace('/(employeur)/accueil');
  };

  const handleReturnToMission = () => {
    setShowConfirmationModal(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choisissez votre plan</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Title */}
        <Text style={styles.mainTitle}>Choisissez votre plan</Text>

        {/* Free Trial Banner */}
        <View style={styles.trialBanner}>
          <View style={styles.trialLeft}>
            <Ionicons name="star" size={16} color="#8B5CF6" />
            <Text style={styles.trialText}>Essai gratuit</Text>
            <Text style={styles.trialDays}>7 jours</Text>
          </View>
          <View style={styles.trialSeparator} />
          <View style={styles.trialRight}>
            <MaterialIcons name="money-off" size={18} color="#8B5CF6" />
            <Text style={styles.trialNoCardPurple}>sans carte</Text>
            <Text style={styles.trialNoCardPurple}>bancaire</Text>
          </View>
        </View>

        {/* Plans */}
        {plans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Populaire</Text>
              </View>
            )}
            
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>€{plan.period}</Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark" size={16} color="#8B5CF6" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.selectButton,
                plan.popular && styles.popularButton
              ]}
              onPress={() => handleStartTrial(plan.id)}
            >
              <Text style={[
                styles.selectButtonText,
                plan.popular && styles.popularButtonText
              ]}>
                Commencer mon essai gratuit
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Footer Link */}
        <TouchableOpacity onPress={handleReturnToMission} style={styles.footerLink}>
          <Text style={styles.footerLinkText}>Revenir à la création de mission</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de confirmation */}
      <Modal
        visible={showConfirmationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View style={styles.confirmationModalOverlay}>
          <View style={styles.confirmationModalContent}>
            <TouchableOpacity 
              onPress={() => setShowConfirmationModal(false)}
              style={styles.confirmationModalCloseButton}
            >
              <Ionicons name="close" size={24} color="#666666" />
            </TouchableOpacity>
            
            <Text style={styles.confirmationModalTitle}>
              Merci ! Vous avez choisi le plan {getSelectedPlanName()}. Votre essai gratuit est activé.
            </Text>
            
            <Text style={styles.confirmationModalSubtitle}>
              Votre mission sera visible dès maintenant dans l'accueil de votre application.
            </Text>
            
            <TouchableOpacity 
              style={styles.confirmationModalButton}
              onPress={handleAccessDashboard}
            >
              <Text style={styles.confirmationModalButtonText}>
                Accéder à mon application
              </Text>
            </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  trialBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F0FF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 30,
  },
  trialLeft: {
    flex: 1,
    alignItems: 'center',
  },
  trialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginTop: 4,
  },
  trialDays: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  trialSeparator: {
    width: 1,
    height: 40,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 20,
  },
  trialRight: {
    flex: 1,
    alignItems: 'center',
  },
  trialNoCard: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  trialNoCardPurple: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -20,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
  },
  period: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  selectButton: {
    backgroundColor: '#F3F0FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  popularButton: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  popularButtonText: {
    color: '#FFFFFF',
  },
  footerLink: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerLinkText: {
    fontSize: 16,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  // Styles pour le modal de confirmation
  confirmationModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmationModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  confirmationModalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  confirmationModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  confirmationModalSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  confirmationModalButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  confirmationModalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
