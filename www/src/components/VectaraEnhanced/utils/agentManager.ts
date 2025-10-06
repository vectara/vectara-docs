// Vectara Agent Management Utilities
// Handles agent creation, session management, and configuration

import {
  VectaraAgentConfig,
  createAgentPayload,
  AGENT_SESSION_CONFIG,
  AgentSession,
  AgentEvent,
  AgentResponse,
  SourceReference
} from '../config/agentConfig';
import { debugAPI } from './debug';

// Vectara API v2 base endpoint
const VECTARA_API_V2_BASE = 'https://api.vectara.io/v2';

// Agent API endpoints (API v2)
const AGENT_ENDPOINTS = {
  createAgent: `${VECTARA_API_V2_BASE}/agents`,
  listAgents: `${VECTARA_API_V2_BASE}/agents`,
  createSession: (agentKey: string) => `${VECTARA_API_V2_BASE}/agents/${agentKey}/sessions`,
  sendMessage: (agentKey: string, sessionKey: string) =>
    `${VECTARA_API_V2_BASE}/agents/${agentKey}/sessions/${sessionKey}/events`,
  getSession: (agentKey: string, sessionKey: string) =>
    `${VECTARA_API_V2_BASE}/agents/${agentKey}/sessions/${sessionKey}`,
  deleteSession: (agentKey: string, sessionKey: string) =>
    `${VECTARA_API_V2_BASE}/agents/${agentKey}/sessions/${sessionKey}`,
  getOpenAPISpec: 'https://raw.githubusercontent.com/vectara/vectara-docs/refs/heads/main/www/static/vectara-oas-v2.yaml'
};

export class VectaraAgentManager {
  private apiKey: string;
  private customerId: string;
  private agentKey?: string;

  constructor(apiKey: string, customerId: string) {
    this.apiKey = apiKey;
    this.customerId = customerId;
  }

  /**
   * Create a new Vectara agent with the specified configuration
   */
  async createAgent(config: VectaraAgentConfig): Promise<string> {
    debugAPI('Creating Vectara agent:', { name: config.agentName });

    try {
      const response = await fetch(AGENT_ENDPOINTS.createAgent, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'customer-id': this.customerId
        },
        body: JSON.stringify(createAgentPayload(config))
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create agent: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      this.agentKey = result.agentKey;

      debugAPI('Agent created successfully:', {
        agentKey: this.agentKey,
        name: config.agentName
      });

      return this.agentKey;
    } catch (error) {
      debugAPI('Error creating agent:', error);
      throw error;
    }
  }

  /**
   * List all available agents for the customer
   */
  async listAgents(): Promise<any[]> {
    debugAPI('Fetching agent list');

    try {
      const response = await fetch(AGENT_ENDPOINTS.listAgents, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'customer-id': this.customerId
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to list agents: ${response.status}`);
      }

      const agents = await response.json();
      debugAPI('Found agents:', agents.length);
      return agents;
    } catch (error) {
      debugAPI('Error listing agents:', error);
      throw error;
    }
  }

  /**
   * Find an existing agent by name
   */
  async findAgentByName(agentName: string): Promise<string | null> {
    try {
      const agents = await this.listAgents();
      const agent = agents.find((a: any) => a.name === agentName);
      return agent?.agentKey || null;
    } catch (error) {
      debugAPI('Error finding agent:', error);
      return null;
    }
  }

  /**
   * Create a new session with the agent
   */
  async createSession(agentKey?: string, sessionConfig?: any): Promise<AgentSession> {
    const sessionAgentKey = agentKey || this.agentKey;
    if (!sessionAgentKey) {
      throw new Error('No agent key available. Create or select an agent first.');
    }

    debugAPI('Creating agent session:', { agentKey: sessionAgentKey });

    try {
      // Use Vectara API v2 session creation format
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substr(2, 9);
      const agentSessionConfig = {
        key: `session_${timestamp}_${randomSuffix}`,
        name: sessionConfig?.name || `Chat Session ${timestamp}`,
        description: sessionConfig?.description || "Interactive chat session with Vectara agent",
        metadata: {
          userId: sessionConfig?.userId || 'anonymous',
          source: 'vectara-docs-chatbot',
          userAgent: navigator.userAgent,
          timestamp: timestamp,
          ...sessionConfig?.metadata
        },
        enabled: true
      };

      const response = await fetch(AGENT_ENDPOINTS.createSession(sessionAgentKey), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'customer-id': this.customerId
        },
        body: JSON.stringify(agentSessionConfig)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create session: ${response.status} ${errorText}`);
      }

      const sessionData = await response.json();

      const session: AgentSession = {
        sessionKey: sessionData.key, // Use 'key' instead of 'sessionKey' from API response
        agentKey: sessionAgentKey,
        createdAt: Date.now(),
        lastActivity: Date.now(),
        messageCount: 0,
        configuration: agentSessionConfig
      };

      debugAPI('Session created successfully:', {
        sessionKey: session.sessionKey,
        agentKey: session.agentKey,
        name: agentSessionConfig.name
      });

      return session;
    } catch (error) {
      debugAPI('Error creating session:', error);
      throw error;
    }
  }

  /**
   * Send a message to the agent and get the response
   */
  async sendMessage(
    session: AgentSession,
    message: string,
    streaming: boolean = false
  ): Promise<AgentResponse> {
    debugAPI('Sending message to agent:', {
      sessionKey: session.sessionKey,
      messageLength: message.length,
      streaming
    });

    try {
      const event: AgentEvent = {
        type: 'message',
        content: message,
        timestamp: Date.now()
      };

      const response = await fetch(
        AGENT_ENDPOINTS.sendMessage(session.agentKey, session.sessionKey),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            type: "input_message",
            messages: [
              {
                type: "text",
                content: message
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send message: ${response.status} ${errorText}`);
      }

      const result = await response.json();

      // Update session activity
      session.lastActivity = Date.now();
      session.messageCount++;

      debugAPI('Raw agent response:', result);

      // Extract agent content from events array
      const events = result.events || [];
      debugAPI('Agent events found:', events.length);

      const agentOutputEvent = events.find((event: any) => event.type === 'agent_output');
      const toolEvents = events.filter((event: any) => event.type === 'tool_output');
      const thinkingEvents = events.filter((event: any) => event.type === 'thinking');

      debugAPI('Agent output event:', agentOutputEvent);
      debugAPI('Tool events:', toolEvents.length);

      const agentResponse: AgentResponse = {
        content: agentOutputEvent?.content || '',
        toolResults: toolEvents.map((event: any) => event.tool_output),
        agentThoughts: thinkingEvents.map((event: any) => event.thinking),
        usedSources: this.processSourceReferences([]), // TODO: Extract from tool results
        suggestedFollowups: [] // TODO: Extract from agent response if available
      };

      debugAPI('Agent response received:', {
        contentLength: agentResponse.content.length,
        toolCount: agentResponse.toolResults.length,
        sourceCount: agentResponse.usedSources.length,
        actualContent: agentResponse.content
      });

      return agentResponse;
    } catch (error) {
      debugAPI('Error sending message to agent:', error);
      throw error;
    }
  }

  /**
   * Send a streaming message to the agent
   */
  async sendMessageStreaming(
    session: AgentSession,
    message: string,
    onChunk: (chunk: string) => void,
    onComplete: (response: AgentResponse) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    debugAPI('Starting streaming message to agent');

    try {
      const event: AgentEvent = {
        type: 'message',
        content: message,
        timestamp: Date.now()
      };

      const response = await fetch(
        AGENT_ENDPOINTS.sendMessage(session.agentKey, session.sessionKey),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            type: "input_message",
            messages: [
              {
                type: "text",
                content: message
              }
            ],
            stream_response: true
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to start streaming: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let toolResults: any[] = [];
      let agentThoughts: string[] = [];
      let sourceReferences: any[] = [];

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              debugAPI('Streaming event received:', data.type, data);

              if (data.type === 'streaming_agent_output') {
                const contentChunk = data.content || '';
                fullContent += contentChunk;
                onChunk(contentChunk);
                debugAPI('Streaming content chunk:', contentChunk);
              } else if (data.type === 'agent_output') {
                // Handle non-streaming agent output
                fullContent = data.content || '';
                debugAPI('Non-streaming agent output:', data.content);
              } else if (data.type === 'tool_output') {
                toolResults.push(data.tool_output);
                debugAPI('Tool output received');
              } else if (data.type === 'thinking') {
                agentThoughts.push(data.thinking);
              } else if (data.type === 'streaming_agent_output_end') {
                // Streaming ended, will complete after loop
                debugAPI('Streaming ended');
                continue;
              } else if (data.type === 'end') {
                // Session ended
                debugAPI('Session ended');
                break;
              }
            } catch (e) {
              debugAPI('Error parsing streaming data:', e);
              // Skip malformed JSON
              continue;
            }
          }
        }
      }

      // Update session activity
      session.lastActivity = Date.now();
      session.messageCount++;

      const finalResponse: AgentResponse = {
        content: fullContent,
        toolResults,
        agentThoughts,
        usedSources: this.processSourceReferences(sourceReferences),
        suggestedFollowups: []
      };

      onComplete(finalResponse);
    } catch (error) {
      debugAPI('Error in streaming message:', error);
      onError(error as Error);
    }
  }

  /**
   * Get session information
   */
  async getSession(session: AgentSession): Promise<any> {
    try {
      const response = await fetch(
        AGENT_ENDPOINTS.getSession(session.agentKey, session.sessionKey),
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'customer-id': this.customerId
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get session: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      debugAPI('Error getting session:', error);
      throw error;
    }
  }

  /**
   * Delete a session
   */
  async deleteSession(session: AgentSession): Promise<void> {
    debugAPI('Deleting session:', { sessionKey: session.sessionKey });

    try {
      const response = await fetch(
        AGENT_ENDPOINTS.deleteSession(session.agentKey, session.sessionKey),
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'customer-id': this.customerId
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete session: ${response.status}`);
      }

      debugAPI('Session deleted successfully');
    } catch (error) {
      debugAPI('Error deleting session:', error);
      throw error;
    }
  }

  /**
   * Check if a session is still valid
   */
  async isSessionValid(session: AgentSession): Promise<boolean> {
    try {
      await this.getSession(session);
      return true;
    } catch (error) {
      debugAPI('Session validation failed:', error);
      return false;
    }
  }

  /**
   * Process source references from agent response
   */
  private processSourceReferences(references: any[]): SourceReference[] {
    return references.map(ref => ({
      sourceType: ref.sourceType || 'documentation',
      corpusKey: ref.corpusKey,
      title: ref.title || ref.documentTitle || 'Unknown',
      snippet: ref.snippet || ref.text || '',
      url: ref.url,
      relevanceScore: ref.score || ref.relevanceScore || 0
    }));
  }

  /**
   * Set the agent key for subsequent operations
   */
  setAgentKey(agentKey: string): void {
    this.agentKey = agentKey;
  }

  /**
   * Get the current agent key
   */
  getAgentKey(): string | undefined {
    return this.agentKey;
  }

  /**
   * Fetch the latest OpenAPI specification for Vectara API v2
   */
  async getOpenAPISpecification(): Promise<any> {
    debugAPI('Fetching Vectara API v2 OpenAPI specification');

    try {
      const response = await fetch(AGENT_ENDPOINTS.getOpenAPISpec);
      if (!response.ok) {
        throw new Error(`Failed to fetch OpenAPI spec: ${response.status}`);
      }

      const yamlText = await response.text();

      // Parse YAML (simple parsing for basic structure)
      // In a real implementation, you'd use a proper YAML parser
      const spec = this.parseYamlToObject(yamlText);

      debugAPI('OpenAPI specification fetched successfully', {
        version: spec.openapi,
        title: spec.info?.title,
        pathsCount: Object.keys(spec.paths || {}).length
      });

      return spec;
    } catch (error) {
      debugAPI('Error fetching OpenAPI specification:', error);
      throw error;
    }
  }

  /**
   * Simple YAML parser (basic implementation)
   * In production, use a proper YAML library like js-yaml
   */
  private parseYamlToObject(yamlText: string): any {
    // This is a very basic YAML parser - for production use js-yaml or similar
    const lines = yamlText.split('\n');
    const result: any = {};
    let currentPath: string[] = [];
    let currentIndentLevel = 0;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const indent = line.length - line.trimLeft().length;
      const cleanLine = trimmed.replace(/['"]/g, '');

      if (cleanLine.includes(':')) {
        const [key, value] = cleanLine.split(':').map(s => s.trim());

        // Adjust current path based on indentation
        if (indent === 0) {
          currentPath = [key];
        } else {
          currentPath = currentPath.slice(0, indent / 2).concat([key]);
        }

        // Set value
        this.setNestedValue(result, currentPath, value || '');
      }
    }

    return result;
  }

  /**
   * Set nested value in object using path array
   */
  private setNestedValue(obj: any, path: string[], value: any): void {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
  }

  /**
   * Get agent-related paths from OpenAPI spec
   */
  async getAgentPathsFromSpec(): Promise<string[]> {
    try {
      const spec = await this.getOpenAPISpecification();
      const agentPaths: string[] = [];

      if (spec.paths) {
        for (const [path, pathSpec] of Object.entries(spec.paths)) {
          if (path.includes('/agents') || path.includes('/agent')) {
            agentPaths.push(path);
          }
        }
      }

      debugAPI('Found agent paths:', agentPaths);
      return agentPaths;
    } catch (error) {
      debugAPI('Error getting agent paths from spec:', error);
      return [];
    }
  }

  /**
   * Validate agent configuration against OpenAPI spec
   */
  async validateAgentConfigWithSpec(agentConfig: any): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    try {
      const spec = await this.getOpenAPISpecification();
      const errors: string[] = [];
      const warnings: string[] = [];

      // Basic validation
      if (!agentConfig.name) {
        errors.push('Agent name is required');
      }

      if (!agentConfig.instructions) {
        errors.push('Agent instructions are required');
      }

      if (!agentConfig.tools || !Array.isArray(agentConfig.tools)) {
        errors.push('Agent tools must be an array');
      } else {
        // Validate tools against spec
        for (const tool of agentConfig.tools) {
          if (!tool.toolName) {
            errors.push('Tool must have a toolName');
          } else if (!spec.paths?.[ `/agents/{agent_key}/tools/${tool.toolName}` ]) {
            warnings.push(`Tool '${tool.toolName}' may not be supported by the API`);
          }
        }
      }

      debugAPI('Agent config validation result:', { errors, warnings });

      return {
        isValid: errors.length === 0,
        errors,
        warnings
      };
    } catch (error) {
      debugAPI('Error validating agent config:', error);
      return {
        isValid: false,
        errors: ['Failed to validate against OpenAPI specification'],
        warnings: []
      };
    }
  }
}

// Session persistence utilities
export class AgentSessionManager {
  private storageKey = 'vectara-agent-sessions';

  /**
   * Save session to localStorage
   */
  saveSession(session: AgentSession): void {
    try {
      const sessions = this.getAllSessions();
      sessions[session.sessionKey] = session;
      localStorage.setItem(this.storageKey, JSON.stringify(sessions));
    } catch (error) {
      debugAPI('Error saving session:', error);
    }
  }

  /**
   * Get session from localStorage
   */
  getSession(sessionKey: string): AgentSession | null {
    try {
      const sessions = this.getAllSessions();
      return sessions[sessionKey] || null;
    } catch (error) {
      debugAPI('Error getting session:', error);
      return null;
    }
  }

  /**
   * Get all sessions
   */
  getAllSessions(): Record<string, AgentSession> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      debugAPI('Error getting all sessions:', error);
      return {};
    }
  }

  /**
   * Remove session from localStorage
   */
  removeSession(sessionKey: string): void {
    try {
      const sessions = this.getAllSessions();
      delete sessions[sessionKey];
      localStorage.setItem(this.storageKey, JSON.stringify(sessions));
    } catch (error) {
      debugAPI('Error removing session:', error);
    }
  }

  /**
   * Clean up expired sessions
   */
  cleanupExpiredSessions(): void {
    try {
      const sessions = this.getAllSessions();
      const now = Date.now();
      let modified = false;

      for (const [sessionKey, session] of Object.entries(sessions)) {
        const age = now - session.lastActivity;
        const maxAge = AGENT_SESSION_CONFIG.maxSessionDuration;

        if (age > maxAge || session.messageCount >= AGENT_SESSION_CONFIG.maxMessagesPerSession) {
          delete sessions[sessionKey];
          modified = true;
        }
      }

      if (modified) {
        localStorage.setItem(this.storageKey, JSON.stringify(sessions));
      }
    } catch (error) {
      debugAPI('Error cleaning up sessions:', error);
    }
  }

  /**
   * Get most recent active session
   */
  getMostRecentSession(): AgentSession | null {
    try {
      const sessions = this.getAllSessions();
      const sessionArray = Object.values(sessions);

      if (sessionArray.length === 0) return null;

      return sessionArray.reduce((mostRecent, session) =>
        session.lastActivity > mostRecent.lastActivity ? session : mostRecent
      );
    } catch (error) {
      debugAPI('Error getting most recent session:', error);
      return null;
    }
  }
}