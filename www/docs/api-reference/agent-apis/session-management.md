---
id: session-management
title: Session Management APIs
sidebar_label: Session Management
---

The Session Management APIs handle conversation contexts between users and 
agents. Sessions maintain conversation history and enable multi-turn 
interactions with agents.

- **Create sessions** to start new conversations with agents
- **List sessions** to view all conversations for an agent
- **Get session details** to retrieve conversation metadata and history
- **Update session properties** to modify names, descriptions, or metadata
- **Delete sessions** to remove conversation history

## Session properties
- **Session key**: Unique identifier (e.g., `ase_12345`)
- **Agent association**: Each session belongs to one agent
- **Metadata**: Custom properties for tracking (user ID, channel, priority)
- **Timestamps**: Creation and last activity times

## Conversation context
Sessions enable:
- **Multi-turn conversations**: Previous messages inform future responses
- **Context persistence**: Agents remember what was discussed
- **User isolation**: Different users can have separate sessions with the same agent

## Available endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| [Create Session](/docs/rest-api/create-agent-session) | POST | Start a new conversation with an agent |
| [List Sessions](/docs/rest-api/list-agent-sessions) | GET | Retrieve all sessions for an agent |
| [Get Session](/docs/rest-api/get-agent-session) | GET | Get details and metadata for a specific session |
| [Update Session](/docs/rest-api/update-agent-session) | PATCH | Modify session properties |
| [Delete Session](/docs/rest-api/delete-agent-session) | DELETE | Remove a session and its history |
