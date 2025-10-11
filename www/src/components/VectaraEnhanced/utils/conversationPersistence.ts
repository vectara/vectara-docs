// Conversation History Persistence Utilities
// Handles saving/loading chat conversations to/from localStorage

import { ChatMessage, ConversationHistory } from '../types';

const STORAGE_KEY = 'vectara_chat_conversations';
const MAX_CONVERSATIONS = 50; // Limit stored conversations

export const saveConversation = (conversation: ConversationHistory): void => {
  try {
    const stored = getStoredConversations();
    
    // Remove existing conversation with same ID
    const filtered = stored.filter(c => c.id !== conversation.id);
    
    // Add new conversation at the beginning
    const updated = [conversation, ...filtered].slice(0, MAX_CONVERSATIONS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save conversation:', error);
  }
};

export const getStoredConversations = (): ConversationHistory[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load conversations:', error);
    return [];
  }
};

export const getConversationById = (id: string): ConversationHistory | null => {
  const conversations = getStoredConversations();
  return conversations.find(c => c.id === id) || null;
};

export const deleteConversation = (id: string): void => {
  try {
    const stored = getStoredConversations();
    const filtered = stored.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.warn('Failed to delete conversation:', error);
  }
};

export const generateConversationTitle = (messages: ChatMessage[]): string => {
  // Use first user message as title, truncated
  const firstUserMessage = messages.find(m => m.type === 'user');
  if (firstUserMessage) {
    const content = firstUserMessage.content.trim();
    return content.length > 40 ? content.substring(0, 40) + '...' : content;
  }
  return `Conversation ${new Date().toLocaleString()}`;
};

export const clearAllConversations = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear conversations:', error);
  }
};