import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showProgress?: boolean;
  stepTitle?: string;
}

export default function ProgressBar({ 
  currentStep, 
  totalSteps, 
  showProgress = true, 
  stepTitle = "Création de mission" 
}: ProgressBarProps) {
  if (!showProgress) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.stepText}>
          Étape {currentStep}/{totalSteps}
        </Text>
        <Text style={styles.titleText}>
          {stepTitle}
        </Text>
      </View>
      
      <View style={styles.progressBar}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressFill,
              { width: `${(currentStep / totalSteps) * 100}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  progressBar: {
    height: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#A068F8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7B24E8',
    borderRadius: 4,
  },
});
