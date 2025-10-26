import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { PageHeader, MessageItem } from '../../src/components';

export default function MessagesPage() {
  const messages = [
    {
      id: '1',
      name: 'Marie Dubois',
      initials: 'MD',
      lastMessage: 'Parfait, je commence demain !',
      timeAgo: 'il y a 5 minutes',
      hasUnread: true,
    },
    {
      id: '2',
      name: 'TechCorp Inc.',
      initials: 'TI',
      lastMessage: "Pouvez-vous m'envoyer votre portf...",
      timeAgo: 'il y a environ 2 heures',
      hasUnread: true,
    },
    {
      id: '3',
      name: 'Lucas Martin',
      initials: 'LM',
      lastMessage: 'Merci pour votre travail !',
      timeAgo: 'il y a 1 jour',
      hasUnread: false,
    },
    {
      id: '4',
      name: 'StartupX',
      initials: 'S',
      lastMessage: 'Le projet est validé',
      timeAgo: 'il y a 2 jours',
      hasUnread: false,
    },
  ];

  const handleMessagePress = (messageId: string) => {
    router.push(`/(employeur)/conversation?messageId=${messageId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader title="Messages" />

      {/* Messages List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            id={message.id}
            name={message.name}
            lastMessage={message.lastMessage}
            timeAgo={message.timeAgo}
            initials={message.initials}
            hasUnread={message.hasUnread}
            onPress={handleMessagePress}
            showSeparator={index < messages.length - 1}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 120, // Espace pour la navigation fixe
  },
});
