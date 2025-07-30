---
id: chats
title: Chats
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for managing chat conversations, 
enabling conversational AI with Retrieval Augmented Generation (RAG) and 
chat history. These methods enable you to create chats, maintain multi-turn conversations, 
and manage chat history, ideal for building interactive applications like support chatbots 
or customer service platforms.

## Prerequisites

<CodePanel
  title="Install Vectara SDK"
  snippets={[
    { language: 'bash', code: `pip install vectara` }
  ]}
  customWidth="50%"
/>

**Setup Requirements:**
1. **Install the SDK** with `pip install vectara`
2. **Get an API key** from the [Vectara Console](https://console.vectara.com)
3. **Create a corpus** with `client.corpora.create()` (see [Corpus Management](https://github.com/vectara/python-sdk/blob/main/src/vectara/corpora/client.py))
4. **Prepare files** on disk or as file objects (PDFs, DOCX, etc.)

---

## Initialize the Vectara Client

<CodePanel
  title="Initialize Vectara Client"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara
from vectara.core.api_error import ApiError

# Initialize client with API key
client = Vectara(api_key="YOUR_API_KEY")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Use an API key with indexing permissions for file uploads' }
    ]
  }}
  customWidth="50%"
/>

Set up authentication to securely access file upload capabilities. Ensure your 
API key has indexing (write) permissions for the target corpus.

<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />


---

## Create a chat session

<CodePanel
  title="Create a chat session"
  snippets={[
    {
      language: 'python',
      code: `search = SearchCorporaParameters(
        corpora=[{"corpus_key": "support-docs"}]
    )
    generation = GenerationParameters(
        generation_preset_name="vectara-summary-ext-24-05-med-omni",
        max_used_search_results=20,
        response_language="eng",
        enable_factual_consistency_score=True,
    )
    chat = ChatParameters(store=True)
    session = client.create_chat_session(
        search=search,
        generation=generation,
        chat_config=chat
    )
    response = session.chat(query="How do I reset my password?")
    print(f"Chat ID: {response.chat_id}")
    print(f"Answer: {response.answer}")
    print(f"Factual Consistency: {response.factual_consistency_score}")`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Specify corpus to search for context.' },
      { line: 5, text: 'Use an optimal generation preset for summary quality.' },
      { line: 6, text: 'Limite the number of results used for generation.' },
      { line: 10, text: 'Enable chat history for multi-turn support.' },
      { line: 16, text: 'Send the user\'s first message to start the chat.' }
    ]
  }}
  customWidth="50%"
/>


Create a chat session that can maintain conversation context across multiple exchanges.
The session handles RAG integration automatically, providing contextual responses based 
on your corpus content.

The `create_chat_session` method corresponds to the HTTP POST `/v2/chats` endpoint. 
For more details on request and response parameters, see the 
[Create Chat REST API](https://docs.vectara.com/docs/rest-api/create-chat).

**Key Parameters:**
- `SearchCorporaParameters`: Defines which corpora to search and filtering options
- `GenerationParameters`: Controls response generation quality and style
- `ChatParameters`: Enables conversation history storage for multi-turn interactions
- `store=True`: Essential for maintaining context across conversation turns

**Returns:**
- `chat_id`: Unique identifier for the conversation session
- `answer`: AI-generated response based on corpus content
- `factual_consistency_score`: Reliability score for the response

---

## Multi-turn conversation

Demonstrate a natural multi-turn conversation where the AI maintains context 
across exchanges. Each subsequent message builds on the previous conversation 
history without requiring explicit context management.

The chat turn method corresponds to the HTTP POST `/v2/chats/{chat_id}/turns` 
endpoint. For more details on request and response parameters, see the 
[Create Chat Turn REST API](https://docs.vectara.com/docs/rest-api/create-chat-turn).

**Conversation Flow:**
1. **Initial Question**: Establishes the topic and context
2. **Follow-up Questions**: Reference previous answers using pronouns and implicit context
3. **Automatic Context**: The session maintains conversation history transparently

**Benefits:**
- Natural conversation flow without manual context passing
- Each response considers the full conversation history
- Factual consistency maintained across all turns
- Easy to implement - just call `session.chat()` for each turn


<CodePanel
  title="Multi-turn conversation example"
  snippets={[
    {
      language: 'python',
      code: `search = SearchCorporaParameters(
        corpora=[{"corpus_key": "quickstart-docs"}]
    )

    generation = GenerationParameters(
        generation_preset_name="vectara-summary-ext-24-05-med-omni",
        max_used_search_results=20,
        response_language="eng",
        enable_factual_consistency_score=True
    )

    chat = ChatParameters(store=True)

    # Create session
    session = client.create_chat_session(
        search=search,
        generation=generation,
        chat_config=chat
    )

    print("=== Multi-Turn Chat Example ===")

    # Turn 1: Initial question
    response1 = session.chat(query="What is machine learning?")
    print(f"User: What is machine learning?")
    print(f"Assistant: {response1.answer}")
    print(f"Factual Score: {response1.factual_consistency_score}")
    print()

    # Turn 2: Follow-up question (context maintained automatically)
    response2 = session.chat(query="What are the main types?")
    print(f"User: What are the main types?")
    print(f"Assistant: {response2.answer}")
    print()

    # Turn 3: Deeper dive (builds on previous context)
    response3 = session.chat(query="Give examples of supervised learning?")
    print(f"User: Can you give examples of supervised learning?")
    print(f"Assistant: {response3.answer}")
    print()`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Enter the corpus key' },
      { line: 6, text: 'Specify a generation preset' },
      { line: 24, text: 'First turn establishes the topic' },
      { line: 31, text: 'Second turn references "main types" - context understood' },
      { line: 37, text: 'Third turn builds on "supervised learning" from context' }
    ]
  }}
  layout="stacked"
/>

---

## List chat conversations

<CodePanel
  title="List chat conversations"
  snippets={[
    {
      language: 'python',
      code: `chats = client.chats.list(limit=10)
    
    print("Recent Chat Conversations:")
    for chat in chats:
        print(f"Chat ID: {chat.id}")
        print(f"First Query: {chat.first_query}")
        print(f"Created: {chat.created_at}")
        print(f"Enabled: {chat.enabled}")
        print("---")`
    }
  ]}
  annotations={{
    python: [
      { line: 1, text: 'Retrieve list of 10 chat sessions' },
      { line: 6, text: 'Each chat includes metadata and first message' }
    ]
  }}
  customWidth="50%"
/>

Retrieve and display chat conversation history for monitoring, analytics, or 
user interface display. Useful for building chat interfaces that show 
conversation lists.

The `chats.list` method corresponds to the HTTP GET `/v2/chats` endpoint. 
For more details on request and response parameters, see the 
[List Chats REST API](https://docs.vectara.com/docs/rest-api/list-chats).

**Chat Metadata Includes:**
- `id`: Unique chat identifier
- `first_query`: Opening message of the conversation
- `created_at`: Timestamp of chat creation
- `enabled`: Whether the chat is active

<Spacer size="l" />

**Chat Metadata Includes:**
- `id`: Unique chat identifier
- `first_query`: Opening message of the conversation
- `created_at`: Timestamp of chat creation
- `enabled`: Whether the chat is active

---

## Streaming chat responses

<CodePanel
  title="Streaming chat responses"
  snippets={[
    {
      language: 'python',
      code: `session = client.create_chat_session(
        search=search,
        generation=generation,
        chat_config=chat
    )
    
    # Stream the response for real-time display
    print("Streaming chat response:")
    response_stream = session.chat_stream(
        query="Explain how to troubleshoot network connectivity issues"
    )
    
    # Display chunks as they arrive
    for chunk in response_stream:
        if hasattr(chunk, 'generation_chunk') and chunk.generation_chunk:
            print(chunk.generation_chunk, end='', flush=True)
    print("\\n")`
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: 'Use chat_stream for real-time response generation' },
      { line: 14, text: 'Process and display chunks immediately' }
    ]
  }}
  customWidth="50%"
/>

Stream chat responses in real-time for better user experience in interactive 
applications. Perfect for creating responsive chat interfaces where users see 
responses as they're generated.

The chat stream method corresponds to the HTTP POST
`/v2/chats/{chat_id}/turns/stream` endpoint. 

**Streaming Benefits:**
- Immediate feedback as the response generates
- Better perceived performance for longer responses
- Natural conversation feel in interactive applications
- Can be stopped early if needed

<Spacer size="l" />
<Spacer size="l" />

---

## Chat history management

<CodePanel
  title="Chat history management"
  snippets={[
    {
      language: 'python',
      code: `chat_details = client.chats.get(chat_id="your-chat-id")
    print(f"Chat: {chat_details.id}")
    print(f"Created: {chat_details.created_at}")
    
    # List all turns in the chat
    turns = client.chats.turns.list(chat_id="your-chat-id", limit=10)
    
    print("\\nConversation History:")
    for turn in turns:
        print(f"Turn {turn.id}:")
        print(f"  User: {turn.query}")
        print(f"  Assistant: {turn.answer}")
        print(f"  Created: {turn.created_at}")
        print()`
    }
  ]}
  annotations={{
    python: [
      { line: 1, text: 'Retrieve detailed information about a specific chat' },
      { line: 5, text: 'Get all conversation turns (messages) in the chat' },
      { line: 9, text: 'Display the complete conversation history' }
    ]
  }}
  customWidth="50%"
/>

Access and display complete conversation history for a specific chat session for 
audit, analysis, or display purposes.

The `chats.get` method corresponds to the HTTP GET `/v2/chats/{chat_id}` 
endpoint. For more details on request and response parameters, see the 
[Get Chat REST API](https://docs.vectara.com/docs/rest-api/get-chat).

The `chats.turns.list` method corresponds to the HTTP GET `/v2/chats/{chat_id}/turns` 
endpoint. For more details on request and response parameters, see the 
[List Chat Turns REST API](https://docs.vectara.com/docs/rest-api/list-chat-turns).

**History Components:**
- **Chat Metadata**: Overall conversation information
- **Turns**: Individual message exchanges between user and assistant
- **Turn Details**: Each turn includes query, answer, and timestamp


## Best Practices

- Monitor factual consistency scores for quality control
- Use appropriate `max_used_search_results` (25-50 for most cases)
- Enable chat storage (`store=True`) for multi-turn conversations
- Implement session management for user conversations
- Consider streaming for better user experience
- Limit conversations to 50-100 turns to maintain context quality

## Error Handling

- **400 Bad Request**: Check query parameters and corpus configuration
- **403 Forbidden**: Verify API key has chat permissions
- **404 Not Found**: Ensure corpus exists and is accessible
- **Rate Limiting**: Implement retry logic with exponential backoff


## Next steps

After understanding chat functionality:

- **Integration**: Combine with document indexing for dynamic knowledge bases
- **Customization**: Experiment with different generation presets and prompts
- **Analytics**: Track conversation patterns and user satisfaction
- **Scaling**: Implement session management for multiple concurrent users
