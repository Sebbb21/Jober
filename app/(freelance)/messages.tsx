import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageItem, PageHeader } from '../../src/components';

export default function FreelanceMessagesPage() {
  const router = useRouter();

  const messages = [
    {
      id: '1',
      name: 'Marie Dubois',
      initials: 'MD',
      lastMessage: "Parfait, je commence demain !",
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
    {
      id: '5',
      name: 'DesignHub',
      initials: 'DH',
      lastMessage: 'Quand peut-on commencer ?',
      timeAgo: 'il y a 3 jours',
      hasUnread: false,
    },
    {
      id: '6',
      name: 'MarketPro',
      initials: 'MP',
      lastMessage: 'Merci pour votre proposition',
      timeAgo: 'il y a 4 jours',
      hasUnread: false,
    },
    {
      id: '7',
      name: 'WebCorp',
      initials: 'WC',
      lastMessage: 'Super travail !',
      timeAgo: 'il y a 5 jours',
      hasUnread: false,
    },
    {
      id: '8',
      name: 'SEOExpert',
      initials: 'SE',
      lastMessage: 'À bientôt',
      timeAgo: 'il y a 1 semaine',
      hasUnread: false,
    },
  ];

  const handleMessagePress = (id: string) => {
    router.push(`/conversation?id=${id}`);
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
            initials={message.initials}
            lastMessage={message.lastMessage}
            timeAgo={message.timeAgo}
            hasUnread={message.hasUnread}
            showSeparator={index < messages.length - 1}
            onPress={handleMessagePress}
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
  },
});
