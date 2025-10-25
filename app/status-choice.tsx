import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function StatusChoicePage() {
  const handleEmployerPress = () => {
    router.push('/creer-mission?from=hiring');
  };

  const handleFreelancePress = () => {
    router.push('/(auth)/register');
  };

  const handleLoginPress = () => {
    router.push('/(auth)/login?from=status-choice');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Jober</Text>
          </View>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.loginLink}>Connexion</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>
            Ton talent, <Text style={styles.titleHighlight}>leur besoin.</Text>
          </Text>
          <Text style={styles.subtitle}>
            La marketplace qui connecte freelances et employeurs, sans frais cachés.
          </Text>
          
          {/* Main Buttons */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleEmployerPress}>
            <Text style={styles.primaryButtonText}>Embaucher un freelance</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleFreelancePress}>
            <Text style={styles.secondaryButtonText}>Proposer mes services</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.loginPrompt}>
              Déjà inscrit ? <Text style={styles.loginPromptLink}>Connexion</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color="#8B5CF6" style={styles.statIcon} />
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Freelances actifs</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="briefcase" size={24} color="#8B5CF6" style={styles.statIcon} />
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statLabel}>Missions réalisées</Text>
          </View>
          
          <View style={styles.statCard}>
            <MaterialIcons name="payment" size={26} color="#8B5CF6" style={styles.statIcon} />
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Commission de service</Text>
          </View>
        </View>

        {/* Main Illustration */}
        <View style={styles.illustrationSection}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../assets/images/hero-illustration.png')} 
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Why Jober Section */}
        <View style={styles.whySection}>
          <Text style={styles.whyTitle}>Pourquoi Jober ?</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>Aucune commission sur vos missions</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>Abonnement transparent et sans surprise</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>Trouvez des missions adaptées à vos compétences</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>Recrutez les meilleurs talents pour vos projets</Text>
            </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  appName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
  },
  loginLink: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 115,
    paddingBottom: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  titleHighlight: {
    color: '#8B5CF6',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    minWidth: 280,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    minWidth: 280,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  loginPrompt: {
    fontSize: 14,
    color: '#666666',
  },
  loginPromptLink: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: '#F8F9FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statIcon: {
    marginBottom: 12,
  },
  statIconText: {
    fontSize: 24,
    color: '#8B5CF6',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  illustrationSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  illustrationContainer: {
    backgroundColor: '#F8F9FF',
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  whySection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  whyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 8,
    height: 8,
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    lineHeight: 24,
  },
});
