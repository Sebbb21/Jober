import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Messages List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {messages.map((message, index) => (
          <View key={message.id}>
            <TouchableOpacity
              style={styles.messageItem}
              onPress={() => handleMessagePress(message.id)}
            >
              {/* Avatar */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{message.initials}</Text>
              </View>

              {/* Message Content */}
              <View style={styles.messageContent}>
                {/* Top Row: Name + Timestamp */}
                <View style={styles.topRow}>
                  <Text style={styles.messageName}>{message.name}</Text>
                  <Text style={styles.messageTime}>{message.timeAgo}</Text>
                </View>
                
                {/* Bottom Row: Message + Unread Dot */}
                <View style={styles.bottomRow}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {message.lastMessage}
                  </Text>
                  {message.hasUnread && <View style={styles.unreadDot} />}
                </View>
              </View>
            </TouchableOpacity>

            {/* Separator */}
            {index < messages.length - 1 && <View style={styles.separator} />}
          </View>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  messageContent: {
    flex: 1,
    justifyContent: 'space-between',
    height: 48,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  messageTime: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 60,
  },
});
