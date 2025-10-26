import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TopItem {
  rank: number;
  name: string;
  specialty?: string;
  totalPaid?: string;
}

interface TopClientsFreelancesProps {
  title: string;
  items: TopItem[];
  isLastSection?: boolean;
}

export default function TopClientsFreelances({ 
  title, 
  items, 
  isLastSection = false 
}: TopClientsFreelancesProps) {
  return (
    <View style={[styles.sectionCard, isLastSection && styles.lastSectionCard]}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {items.map((item) => (
        <View key={item.rank} style={styles.itemCard}>
          <View style={styles.rankCircle}>
            <Text style={styles.rankText}>{item.rank}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            {item.specialty && <Text style={styles.itemSpecialty}>{item.specialty}</Text>}
          </View>
          {item.totalPaid && <Text style={styles.totalPaid}>{item.totalPaid}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  itemSpecialty: {
    fontSize: 14,
    color: '#6B7280',
  },
  totalPaid: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
});

