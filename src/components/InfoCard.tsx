import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface InfoCardProps {
  icon: string;
  iconType: 'Ionicons' | 'MaterialIcons';
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export default function InfoCard({ icon, iconType, title, subtitle, onPress }: InfoCardProps) {
  const ContentWrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress ? { onPress } : {};

  return (
    <ContentWrapper style={styles.infoCard} {...wrapperProps}>
      <View style={styles.infoIcon}>
        {iconType === 'Ionicons' && (
          <Ionicons name={icon as any} size={24} color="#8B5CF6" />
        )}
        {iconType === 'MaterialIcons' && (
          <MaterialIcons name={icon as any} size={24} color="#8B5CF6" />
        )}
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </ContentWrapper>
  );
}

const styles = StyleSheet.create({
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
});

