import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileCardProps {
  initials: string;
  name: string;
  subscriptionBadge: string;
  companyOrCategory: string;
  rating: number;
  ratingLabel: string;
}

export default function ProfileCard({ 
  initials, 
  name, 
  subscriptionBadge, 
  companyOrCategory, 
  rating, 
  ratingLabel 
}: ProfileCardProps) {
  return (
    <View style={styles.profileCard}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      
      {/* Nom et badge */}
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>{subscriptionBadge}</Text>
        </View>
      </View>
      
      {/* Entreprise ou Catégorie */}
      <Text style={styles.role}>{companyOrCategory}</Text>
      
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFFFFF" />
        <Text style={styles.ratingText}>{rating} ({ratingLabel})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

