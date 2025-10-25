import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConversationPage() {
  const params = useLocalSearchParams();
  const messageId = params.messageId;

  const handleBack = () => {
    router.back();
  };

  // Données de test pour la conversation
  const conversationData = {
    '1': { name: 'Marie Dubois', initials: 'MD' },
    '2': { name: 'TechCorp Inc.', initials: 'TI' },
    '3': { name: 'Lucas Martin', initials: 'LM' },
    '4': { name: 'StartupX', initials: 'S' },
  };

  const conversation = conversationData[messageId as keyof typeof conversationData] || { name: 'Contact', initials: 'C' };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{conversation.initials}</Text>
          </View>
          <Text style={styles.headerTitle}>{conversation.name}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Conversation Content */}
      <View style={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderTitle}>Conversation avec {conversation.name}</Text>
          <Text style={styles.placeholderSubtitle}>
            Cette fonctionnalité sera développée prochainement
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 5,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});
