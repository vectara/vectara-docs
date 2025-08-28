---
id: create-agent-session
title: Create Agent Session API Definition
sidebar_label: Create Agent Session API Definition
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Agent Session API enables you to initialize a new conversational session between users and AI agents, establishing the contextual container required for stateful, multi-turn interactions. This API is fundamental to deploying conversational AI experiences that maintain memory, track interaction history, and provide continuity across extended dialogues with enterprise users.

Organizations use this API to create customer support sessions, internal process automation workflows, business intelligence conversations, and technical assistance interactions where context preservation and session-based tracking are essential for delivering personalized and effective AI-powered experiences.

## Create Agent Session Request and Response

To create an agent session, send a POST request to `/v2/agents/{agent_key}/sessions`. You specify the following parameters:

- `agent_key` (string, required): Agent identifier in the URL path following pattern `[0-9a-zA-Z_-]+$`
- Request body parameters:
  - `key` (string, optional): A user provided key that uniquely identifies this session. If not provided, one will be auto-generated based on the session name. Pattern: `[0-9a-zA-Z_-]+$`
  - `name` (string, required): Human-readable name for the session
  - `description` (string, optional): Optional description of the session purpose or context
  - `metadata` (object, optional): Arbitrary metadata associated with the session for tracking and organization
  - `enabled` (boolean, optional): Whether the session should be enabled upon creation (defaults to `true`)

The response includes the complete session configuration with system-generated fields including the unique session key, associated agent key, and creation timestamp.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `POST /v2/agents/customer_support/sessions

{
  "key": "support_session_12345",
  "name": "Customer Support Session",
  "description": "Customer support session for billing inquiry regarding account charges",
  "metadata": {
    "customer_id": "customer_12345",
    "customer_email": "customer@example.com",
    "priority": "high",
    "channel": "web_chat",
    "issue_category": "billing"
  },
  "enabled": true
}`
    }]}  
  layout="stacked"
/>

### Example Response

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'json',
      code: `{
  "key": "support_session_12345",
  "agent_key": "customer_support",
  "name": "Customer Support Session",
  "description": "Customer support session for billing inquiry regarding account charges",
  "metadata": {
    "customer_id": "customer_12345",
    "customer_email": "customer@example.com",
    "priority": "high",
    "channel": "web_chat",
    "issue_category": "billing"
  },
  "enabled": true,
  "created_at": "2024-01-15T10:30:00Z"
}`
    }]}  
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_metadata` | Metadata format or content is invalid |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating sessions with this agent |
| 404 | `agent_not_found` | Agent with the specified key does not exist |
| 429 | `rate_limit_exceeded` | Session creation rate limit exceeded |
