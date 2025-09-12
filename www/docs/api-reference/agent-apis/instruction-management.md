---
id: instruction-management
title: Instruction Management APIs
sidebar_label: Instruction Management
---

The Instruction Management APIs handle reusable instruction templates that 
define agent behavior, personality, and task-specific guidance.

- **Create instruction templates** for reuse across multiple agents
- **List available instructions** in your instruction library
- **Get instruction details** including template content and variables
- **Update instruction content** to refine agent behavior
- **Test instructions** to validate template rendering and effectiveness
- **Delete instructions** and manage version history

## Instruction templates
Instructions use the Velocity templating engine to create dynamic, context-aware guidance:
- **Template variables**: Reference context like `${currentDate}`, `${tools}`, `${userQuery}`
- **Conditional logic**: Use if/else statements for situational behavior
- **Reusable content**: Share instructions across multiple agents

## Instruction types
- **Initial instructions**: Run before the user's first message to set agent 
  behavior and context

## Available endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| [Create Instruction](/docs/rest-api/create-instruction) | POST | Create a new instruction template |
| [List Instructions](/docs/rest-api/list-instructions) | GET | Retrieve all instruction templates |
| [Get Instruction](/docs/rest-api/get-instruction) | GET | Get details of a specific instruction |
| [Update Instruction](/docs/rest-api/update-instruction) | PATCH | Modify instruction content or metadata |
| [Test Instruction](/docs/rest-api/test-instruction) | POST | Validate template rendering with sample data |
| [Delete Instruction](/docs/rest-api/delete-instruction) | DELETE | Remove an instruction template |
| [Delete Instruction Version](/docs/rest-api/delete-instruction-version) | DELETE | Remove a specific version |

## Template examples

### Basic Instruction

```velocity
You are a helpful customer service agent. Always be polite and professional.
When you don't know something, admit it rather than guessing.
```

### Dynamic Instruction with Variables

```velocity
You are assisting on ${currentDate}. The user has access to these tools: ${tools}.

#if($userType == "premium")
Provide detailed, comprehensive responses with advanced features.
#else
Provide helpful but concise responses focusing on core functionality.
#end
```

### Task-Specific Instruction

```velocity
When analyzing documents:
1. Summarize key points in bullet format
2. Identify any actionable items
3. Note any missing information that might be needed
4. Always cite specific sections when referencing document content
```
