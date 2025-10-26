import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface StatsCardProps {
  icon: string;
  iconType: 'Ionicons' | 'MaterialIcons';
  number: string;
  label: string;
}

export default function StatsCard({ icon, iconType, number, label }: StatsCardProps) {
  const renderIcon = () => {
    if (iconType === 'Ionicons') {
      return <Ionicons name={icon as any} size={24} color="#8B5CF6" />;
    } else if (iconType === 'MaterialIcons') {
      return <MaterialIcons name={icon as any} size={24} color="#8B5CF6" />;
    }
    return null;
  };

  return (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>
        {renderIcon()}
      </View>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

