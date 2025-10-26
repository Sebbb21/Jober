import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backText?: string;
  onBack?: () => void;
}

export default function PageHeader({ 
  title,
  subtitle,
  showBackButton = false, 
  backText,
  onBack 
}: PageHeaderProps) {
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
          {backText && <Text style={styles.backText}>{backText}</Text>}
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle, showBackButton && styles.headerTitleWithBack, subtitle && styles.headerTitleWithSubtitle]}>
        {title}
      </Text>
      {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: '#8B5CF6',
    marginLeft: 8,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerTitleWithBack: {
    fontSize: 20,
  },
  headerTitleWithSubtitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});

