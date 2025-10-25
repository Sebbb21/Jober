import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EmployeurLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [activeTab, setActiveTab] = useState('accueil');

  const tabs = [
    { id: 'accueil', label: 'Accueil', icon: 'home' },
    { id: 'freelances', label: 'Freelances', icon: 'people' },
    { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart' },
    { id: 'messages', label: 'Messages', icon: 'chatbubble' },
    { id: 'compte', label: 'Compte', icon: 'person' },
  ];

  const handleTabPress = (tabId: string) => {
    // Ne pas naviguer si on est déjà sur cette page
    if (currentTab === tabId) {
      return;
    }
    setActiveTab(tabId);
    router.push(`/(employeur)/${tabId}`);
  };

  // Déterminer l'onglet actif basé sur la route actuelle
  const currentSegment = segments[segments.length - 1];
  
  // Logique spéciale pour les pages qui appartiennent à un onglet parent
  let currentTab = 'accueil';
  if (currentSegment === 'conversation') {
    currentTab = 'messages';
  } else {
    currentTab = tabs.find(tab => tab.id === currentSegment)?.id || 'accueil';
  }

  return (
    <View style={styles.container}>
        <Stack
          screenOptions={{
            gestureEnabled: false,
            gestureDirection: 'horizontal',
            animation: 'none',
          }}
        >
            <Stack.Screen name="accueil" options={{ headerShown: false }} />
            <Stack.Screen name="freelances" options={{ headerShown: false }} />
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="messages" options={{ headerShown: false }} />
            <Stack.Screen name="compte" options={{ headerShown: false }} />
            <Stack.Screen name="nouvelle-mission" options={{ headerShown: false }} />
            <Stack.Screen name="candidatures" options={{ headerShown: false }} />
            <Stack.Screen name="profil-freelance" options={{ headerShown: false }} />
            <Stack.Screen name="conversation" options={{ headerShown: false }} />
      </Stack>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tabButton,
                    currentTab === tab.id && styles.tabButtonActive,
                    currentTab === tab.id && styles.tabButtonDisabled,
                  ]}
                  onPress={() => handleTabPress(tab.id)}
                  disabled={currentTab === tab.id}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={24}
                    color={currentTab === tab.id ? '#8B5CF6' : '#9CA3AF'}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      currentTab === tab.id && styles.tabLabelActive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
        </View>
        <View style={styles.safeAreaBottom} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomNavContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNav: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 0,
  },
  safeAreaBottom: {
    backgroundColor: '#FFFFFF',
    height: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabButtonActive: {
    // Style pour l'onglet actif
  },
  tabButtonDisabled: {
    opacity: 0.7,
  },
  tabLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#8B5CF6',
  },
});