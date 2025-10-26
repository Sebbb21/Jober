import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MessageItemProps {
  id: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  initials: string;
  hasUnread: boolean;
  onPress: (id: string) => void;
  showSeparator: boolean;
}

export default function MessageItem({ 
  id,
  name, 
  lastMessage, 
  timeAgo, 
  initials, 
  hasUnread, 
  onPress,
  showSeparator
}: MessageItemProps) {
  return (
    <View>
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() => onPress(id)}
      >
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {/* Message Content */}
        <View style={styles.messageContent}>
          {/* Top Row: Name + Timestamp */}
          <View style={styles.topRow}>
            <Text style={styles.messageName}>{name}</Text>
            <Text style={styles.messageTime}>{timeAgo}</Text>
          </View>
          
          {/* Bottom Row: Message + Unread Dot */}
          <View style={styles.bottomRow}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage}
            </Text>
            {hasUnread && <View style={styles.unreadDot} />}
          </View>
        </View>
      </TouchableOpacity>

      {/* Separator */}
      {showSeparator && <View style={styles.separator} />}
    </View>
  );
}

const styles = StyleSheet.create({
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

