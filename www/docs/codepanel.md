---
id: code-panel
title: CodePanel Usage
sidebar_label: CodePanel Usage
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

# CodePanel Component Training Guide

This guide how to effectively use the CodePanel component in documentation. Work through these examples from simple to advanced.

## 🟢 Simple Examples

### Basic Single-Language Example

The simplest usage - just one code snippet with a descriptive title:


<CodePanel
  title="Install Package"
  snippets={[
    {
      language: 'bash',
      code: `npm install @company/sdk`,
    },
  ]}
/>


**When to use**: Quick commands, simple examples, single-step instructions.

### Simple Multi-Language Example

Show the same operation in different languages:


<CodePanel
  title="API Client Setup"
  snippets={[
    {
      language: 'javascript',
      code: `const client = new ApiClient('your-api-key');`,
    },
    {
      language: 'python',
      code: `client = ApiClient('your-api-key')`,
    },
    {
      language: 'curl',
      code: `curl -H "Authorization: Bearer your-api-key"`,
    },
  ]}
/>


**When to use**: Basic setup instructions, simple API calls, when developers need options.

---

## 🟡 Intermediate Examples

### Using Annotations (Explanatory Tooltips)

Add helpful explanations directly to specific lines:


<CodePanel
  title="Configuration Example"
  snippets={[
    {
      language: 'javascript',
      code: `const config = {
  apiKey: process.env.API_KEY,
  timeout: 30000,
  retries: 3,
  baseUrl: 'https://api.company.com/v1'
};

const client = new Client(config);`,
    },
  ]}
  annotations={{
    javascript: [
      { line: 2, text: 'Always use environment variables for sensitive data' },
      { line: 3, text: 'Timeout in milliseconds (30 seconds)' },
      { line: 4, text: 'Number of automatic retry attempts' },
    ],
  }}
/>


**When to use**: Complex configurations, security considerations, explaining parameters.

### Different Layout Options

Choose between floating (Stripe-style) and full-width layouts:s


**When to use**: `layout="stacked"` for long code, complex configs, multiple files.

### Multi-Language with Language-Specific Annotations

Different explanations for different languages:


<CodePanel
  title="Error Handling"
  snippets={[
    {
      language: 'javascript',
      code: `try {
  const result = await api.getData();
  return result;
} catch (error) {
  console.error('API call failed:', error);
  throw new Error('Data fetch failed');
}`,
    },
    {
      language: 'python',
      code: `try:
    result = api.get_data()
    return result
except ApiException as e:
    logger.error(f"API call failed: {e}")
    raise Exception("Data fetch failed")`,
    },
  ]}
  annotations={{
    javascript: [
      { line: 2, text: 'Use async/await for cleaner promise handling' },
      { line: 6, text: 'Re-throw with user-friendly message' },
    ],
    python: [
      { line: 4, text: 'Catch specific exception types when possible' },
      { line: 5, text: 'Use f-strings for better performance' },
    ],
  }}
/>


**When to use**: Language-specific best practices, different error handling patterns.

---

## 🔴 Advanced Examples

### Complex Multi-Step Process

Break down complex workflows into digestible pieces:


## Database Migration Setup

<CodePanel
  title="1. Create Migration File"
  snippets={[
    {
      language: 'bash',
      code: `npx migrate create add_user_preferences`,
    },
  ]}
/>

This creates a new migration file in your migrations directory. The filename includes a timestamp to ensure proper ordering.

<CodePanel
  title="2. Define Migration Schema"
  layout="stacked"
  snippets={[
    {
      language: 'sql',
      code: `-- Up migration
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    preference_key VARCHAR(100) NOT NULL,
    preference_value TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, preference_key)
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);`,
    },
    {
      language: 'sql',
      code: `-- Down migration  
DROP INDEX IF EXISTS idx_user_preferences_user_id;
DROP TABLE IF EXISTS user_preferences;`,
    },
  ]}
  annotations={{
    sql: [
      { line: 4, text: 'Foreign key ensures data integrity' },
      { line: 9, text: 'Prevent duplicate preferences per user' },
      { line: 12, text: 'Index for faster user lookups' },
    ],
  }}
/>

Now run the migration to apply changes to your database.

<CodePanel
  title="3. Execute Migration"
  snippets={[
    {
      language: 'bash',
      code: `# Run pending migrations
npx migrate up

# Or rollback if needed
npx migrate down`,
    },
  ]}
  annotations={{
    bash: [
      { line: 2, text: 'Applies all pending migrations in order' },
      { line: 5, text: 'Rolls back the last migration only' },
    ],
  }}
/>


**When to use**: Multi-step tutorials, complex setup processes, workflows.

### Comprehensive API Documentation

Full API example with request, response, and error handling:


## User Management API

<CodePanel
  title="Create User Request"
  layout="stacked"
  snippets={[
    {
      language: 'javascript',
      code: `// POST /api/users
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiKey
  },
  body: JSON.stringify({
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'member',
    preferences: {
      newsletter: true,
      notifications: false
    }
  })
});`,
    },
    {
      language: 'curl',
      code: `curl -X POST \\
  https://api.company.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{
    "email": "user@example.com",
    "firstName": "John", 
    "lastName": "Doe",
    "role": "member",
    "preferences": {
      "newsletter": true,
      "notifications": false
    }
  }'`,
    },
    {
      language: 'python',
      code: `import requests

response = requests.post(
    'https://api.company.com/users',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    },
    json={
        'email': 'user@example.com',
        'firstName': 'John',
        'lastName': 'Doe', 
        'role': 'member',
        'preferences': {
            'newsletter': True,
            'notifications': False
        }
    }
)`,
    },
  ]}
  annotations={{
    javascript: [
      { line: 5, text: 'Always include Authorization header for protected endpoints' },
      { line: 11, text: 'Role determines user permissions in the system' },
    ],
    curl: [
      { line: 4, text: 'Use environment variable for API key security' },
      { line: 10, text: 'JSON boolean values are lowercase in curl' },
    ],
    python: [
      { line: 8, text: 'f-string formatting for cleaner code' },
      { line: 16, text: 'Python boolean values are capitalized' },
    ],
  }}
/>

### Expected Response

<CodePanel
  title="Success Response (201 Created)"
  snippets={[
    {
      language: 'json',
      code: `{
  "id": "usr_1a2b3c4d5e",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "member",
  "preferences": {
    "newsletter": true,
    "notifications": false
  },
  "createdAt": "2024-03-15T10:30:00Z",
  "updatedAt": "2024-03-15T10:30:00Z",
  "status": "active"
}`,
    },
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Unique user ID for all future operations' },
      { line: 11, text: 'ISO 8601 timestamp format' },
      { line: 13, text: 'New users are active by default' },
    ],
  }}
/>

### Error Responses

<CodePanel
  title="Error Handling"
  snippets={[
    {
      language: 'json',
      code: `// 400 Bad Request - Validation Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid user data provided",
    "details": [
      {
        "field": "email",
        "error": "Email already exists"
      },
      {
        "field": "role", 
        "error": "Invalid role. Must be: admin, member, or viewer"
      }
    ]
  }
}`,
    },
    {
      language: 'json',
      code: `// 401 Unauthorized
{
  "error": {
    "code": "UNAUTHORIZED", 
    "message": "Invalid or expired API key"
  }
}`,
    },
    {
      language: 'json',
      code: `// 429 Rate Limited
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Try again in 60 seconds.",
    "retryAfter": 60
  }
}`,
    },
  ]}
  annotations={{
    json: [
      { line: 6, text: 'Detailed field-level validation errors' },
      { line: 23, text: 'Standard HTTP 401 for authentication issues' },
      { line: 32, text: 'retryAfter tells client when to retry' },
    ],
  }}
/>


**When to use**: Complete API documentation, comprehensive tutorials, reference material.

---

## 📋 Best Practices Checklist

### ✅ Do's
- **Use descriptive titles** that explain what the code does
- **Add annotations** for complex or security-critical lines
- **Choose appropriate layouts**: floating for simple examples, stacked for complex code
- **Provide multiple language options** when relevant
- **Keep code examples realistic** and runnable
- **Use consistent formatting** and indentation

### ❌ Don'ts  
- **Don't put sensitive data** in code examples (use placeholders)
- **Don't make examples too long** without breaking them up
- **Don't forget to test** your code examples actually work
- **Don't mix concepts** - one CodePanel should demonstrate one thing
- **Don't overuse annotations** - only for important explanations

### 🎯 When to Use Each Layout

**Floating Layout (default)**:
- Simple API calls
- Configuration snippets  
- Short command examples
- When you want text to flow around the code

**Stacked Layout (`layout="stacked"`)**: 
- Long configuration files
- Multi-step code blocks
- Complex examples that need full width
- When code readability is more important than space efficiency
