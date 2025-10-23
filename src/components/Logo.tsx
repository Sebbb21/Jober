import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <View style={[styles.logo, { width: size, height: size, marginRight: 8 }]}>
      <Text style={[styles.logoText, { fontSize: size * 0.6 }]}>J</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
