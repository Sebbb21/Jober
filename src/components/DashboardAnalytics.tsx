import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface MetricCard {
  id: string;
  icon: string;
  iconType: 'Ionicons' | 'MaterialIcons';
  iconColor: string;
  bgColor: string;
  value: string;
  label: string;
}

interface DashboardAnalyticsProps {
  metrics: MetricCard[];
  onMetricPress: (metricId: string) => void;
}

export default function DashboardAnalytics({ metrics, onMetricPress }: DashboardAnalyticsProps) {
  const renderIcon = (icon: string, iconType: string, iconColor: string) => {
    if (iconType === 'Ionicons') {
      return <Ionicons name={icon as any} size={24} color={iconColor} />;
    } else if (iconType === 'MaterialIcons') {
      return <MaterialIcons name={icon as any} size={24} color={iconColor} />;
    }
    return null;
  };

  return (
    <View style={styles.metricsContainer}>
      {metrics.map((metric) => (
        <TouchableOpacity
          key={metric.id}
          style={styles.metricCard}
          onPress={() => onMetricPress(metric.id)}
        >
          <View style={[styles.metricIconContainer, { backgroundColor: metric.bgColor }]}>
            {renderIcon(metric.icon, metric.iconType, metric.iconColor)}
          </View>
          <Text style={styles.metricValue}>{metric.value}</Text>
          <Text style={styles.metricLabel}>{metric.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 16,
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '47%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});

