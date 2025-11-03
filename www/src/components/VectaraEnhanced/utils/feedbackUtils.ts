// Feedback Utilities
// Manages user feedback storage, retrieval, and submission

import { MessageFeedback } from '../types';

const FEEDBACK_STORAGE_KEY = 'vectara_message_feedback';

export interface StoredFeedback {
  messageId: string;
  feedback: MessageFeedback;
  sessionId: string;
  messagePreview: string; // First 100 chars of message
  conversationContext?: {
    query: string;
    responseTime?: number;
  };
}

/**
 * Save feedback to localStorage
 */
export const saveFeedbackToLocalStorage = (
  messageId: string,
  feedback: MessageFeedback,
  sessionId: string,
  messageContent: string,
  conversationContext?: {
    query: string;
    responseTime?: number;
  }
): void => {
  try {
    const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const feedbackHistory: StoredFeedback[] = stored ? JSON.parse(stored) : [];

    // Check if feedback already exists for this message, update if so
    const existingIndex = feedbackHistory.findIndex(f => f.messageId === messageId);

    const feedbackEntry: StoredFeedback = {
      messageId,
      feedback,
      sessionId,
      messagePreview: messageContent.substring(0, 100),
      conversationContext
    };

    if (existingIndex >= 0) {
      feedbackHistory[existingIndex] = feedbackEntry;
    } else {
      feedbackHistory.push(feedbackEntry);
    }

    // Keep last 100 feedback entries
    const trimmedHistory = feedbackHistory.slice(-100);

    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(trimmedHistory));

    console.log('✓ Feedback saved to localStorage:', feedbackEntry);
  } catch (error) {
    console.error('Failed to save feedback to localStorage:', error);
  }
};

/**
 * Get all feedback from localStorage
 */
export const getFeedbackHistory = (): StoredFeedback[] => {
  try {
    const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load feedback history:', error);
    return [];
  }
};

/**
 * Get feedback for a specific message
 */
export const getMessageFeedback = (messageId: string): StoredFeedback | null => {
  const history = getFeedbackHistory();
  return history.find(f => f.messageId === messageId) || null;
};

/**
 * Export feedback as JSON
 */
export const exportFeedbackAsJSON = (): string => {
  const history = getFeedbackHistory();
  return JSON.stringify(history, null, 2);
};

/**
 * Export feedback as CSV
 */
export const exportFeedbackAsCSV = (): string => {
  const history = getFeedbackHistory();

  if (history.length === 0) {
    return 'No feedback data available';
  }

  // CSV headers
  const headers = [
    'Message ID',
    'Feedback Type',
    'Timestamp',
    'Session ID',
    'Message Preview',
    'Query',
    'Response Time (ms)',
    'Comment'
  ];

  // CSV rows
  const rows = history.map(entry => [
    entry.messageId,
    entry.feedback.type,
    new Date(entry.feedback.timestamp).toISOString(),
    entry.sessionId,
    `"${entry.messagePreview.replace(/"/g, '""')}"`, // Escape quotes
    entry.conversationContext?.query ? `"${entry.conversationContext.query.replace(/"/g, '""')}"` : '',
    entry.conversationContext?.responseTime || '',
    entry.feedback.comment ? `"${entry.feedback.comment.replace(/"/g, '""')}"` : ''
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
};

/**
 * Clear all feedback history
 */
export const clearFeedbackHistory = (): void => {
  try {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    console.log('✓ Feedback history cleared');
  } catch (error) {
    console.error('Failed to clear feedback history:', error);
  }
};

/**
 * Get feedback statistics
 */
export const getFeedbackStats = (): {
  total: number;
  positive: number;
  negative: number;
  positiveRate: number;
} => {
  const history = getFeedbackHistory();
  const positive = history.filter(f => f.feedback.type === 'positive').length;
  const negative = history.filter(f => f.feedback.type === 'negative').length;
  const total = history.length;

  return {
    total,
    positive,
    negative,
    positiveRate: total > 0 ? (positive / total) * 100 : 0
  };
};

/**
 * Categorize a query into a topic for analytics
 */
const categorizeQuery = (query: string): string => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('agent') || lowerQuery.includes('assistant')) return 'agents';
  if (lowerQuery.includes('api') || lowerQuery.includes('endpoint') || lowerQuery.includes('rest')) return 'api';
  if (lowerQuery.includes('corpus') || lowerQuery.includes('corpora')) return 'corpus';
  if (lowerQuery.includes('document') || lowerQuery.includes('upload') || lowerQuery.includes('index')) return 'indexing';
  if (lowerQuery.includes('query') || lowerQuery.includes('search')) return 'search';
  if (lowerQuery.includes('auth') || lowerQuery.includes('key') || lowerQuery.includes('token')) return 'authentication';
  if (lowerQuery.includes('rerank') || lowerQuery.includes('mmr')) return 'reranking';
  if (lowerQuery.includes('sdk') || lowerQuery.includes('python') || lowerQuery.includes('javascript')) return 'sdk';

  return 'general';
};

/**
 * Send feedback to Vectara API (chatbot_feedback corpus)
 * Formats feedback as a Vectara document for the feedback corpus
 */
export const sendFeedbackToAPI = async (
  messageId: string,
  feedback: MessageFeedback,
  sessionId: string,
  messageContent: string,
  apiEndpoint: string,
  apiKey: string,
  conversationContext?: {
    query: string;
    agentId?: string;
    corpusKey?: string;
    responseTime?: number;
  }
): Promise<boolean> => {
  try {
    // Format feedback as a Vectara document matching the corpus structure
    const payload = {
      id: `feedback_${messageId}_${feedback.timestamp}`,
      type: 'core',
      document_parts: [
        {
          text: `User gave ${feedback.type} feedback on agent response. Query: "${conversationContext?.query || 'N/A'}" Response preview: ${messageContent.substring(0, 200)}${feedback.comment ? ` User comment: ${feedback.comment}` : ''}`,
          metadata: {}
        }
      ],
      metadata: {
        feedback_type: feedback.type,
        message_id: messageId,
        session_id: sessionId,
        agent_id: conversationContext?.agentId || 'unknown',
        source_corpus: conversationContext?.corpusKey || 'unknown',
        timestamp_ms: feedback.timestamp,
        response_time_ms: conversationContext?.responseTime || 0,
        message_length: messageContent.length,
        query_category: categorizeQuery(conversationContext?.query || ''),
        has_comment: !!feedback.comment
      }
    };

    console.log('📤 Sending feedback to Vectara corpus:', apiEndpoint);
    console.log('Feedback payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'customer-id': '2719520243'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Feedback sent to Vectara successfully:', result);

    return true;
  } catch (error) {
    console.error('❌ Failed to send feedback to API:', error);
    // Still save locally even if API fails
    saveFeedbackToLocalStorage(
      messageId,
      feedback,
      sessionId,
      messageContent,
      conversationContext
    );
    return false;
  }
};

/**
 * Download feedback as a file
 */
export const downloadFeedback = (format: 'json' | 'csv' = 'json'): void => {
  try {
    const data = format === 'json' ? exportFeedbackAsJSON() : exportFeedbackAsCSV();
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vectara-feedback-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`✓ Feedback downloaded as ${format.toUpperCase()}`);
  } catch (error) {
    console.error('Failed to download feedback:', error);
  }
};
