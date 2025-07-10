---
id: chat-completions
title: Chat Completions API Definition
sidebar_label: Chat Completions API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Chat Completions API provides an OpenAI-compatible interface for 
generating model responses in multi-turn chat conversations. This API enables 
you to integrate Vectara’s language models directly into applications designed 
to work with OpenAI’s Chat Completions format, making it easy to leverage 
Vectara’s capabilities with minimal changes to existing tools or code.

Use this API to enable interactive chat experiences that support context-aware 
responses, streaming output, and token usage tracking—all while conforming to 
established industry formats.

## Chat Completions Request and Response Details

To generate a chat-based model response, send a POST request to 
`/v2/llms/chat/completions`. The request includes a series of chat messages 
and optional parameters that control the behavior and structure of the model’s 
response. The request body must include the `messages` parameter, an array of 
message objects (role, content) representing the full conversation so far.

The request body can also include the following optional parameters:

* `model`: The model identifier. If omitted, Vectara automatically selects an 
  appropriate model.
* `messages:` An ordered array of messages representing the full conversation 
  so far. Each message must include a `role` (e.g., user, assistant) and `content`.
* `stream`: Indicates whether to return responses as a stream. Default is `false`.
* `temperature`, `top_p`: (Optional) A value from `0` to `2` controlling 
  randomness. Higher values (`0.8`) yield more diverse output; lower values 
  (`0.2`) yield more deterministic responses.
* `n`: Specifies the number of completions to generate. Default is `1`.
* `max_tokens`: Specifies the maximum tokens in the response.
* `presence_penalty`, `frequency_penalty`: Value from `-2.0` to `2.0` that 
  penalizes tokens already present in the conversation to encourage new topics.
* `logit_bias`: Adjusts the likelihood of specific tokens appearing.
* `user`: Specifies the end-user identifier (used for abuse detection and usage 
  tracking).
* `stop`: Specifies stop sequences that halt generation.
* `response_format`: Forces response as plain text or JSON object.

### Streaming responses

If the `stream` parameter is set to `true`, the response appears as a series 
of text/event-stream parts (also known as chunks). Each chunk includes a `delta` 
field showing the incremental message update.

### Example request

This example sends a simple chat conversation to the API, asking the assistant 
for the capital of France. The request includes a system prompt, a user 
message, and a temperature setting for response variability.

<CodePanel snippets={[{language: "json", code: `{
  "model": "chat-model-001",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "What is the capital of France?" }
  ],
  "temperature": 0.7,
  "stream": false
}`}]} title="Code Example" layout="stacked" />
### Example response

The response includes a generated reply from the assistant, along with token 
usage statistics. In this example, the model returns a direct answer to the 
user’s question.

<CodePanel snippets={[{language: "json", code: `{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1712454830,
  "model": "chat-model-001",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 21,
    "completion_tokens": 9,
    "total_tokens": 30
  }
}`}]} title="Code Example" layout="stacked" />

If the input summary is accurate, the `corrected_summary` matches the 
`original_summary`.

### Error responses

* **400 Bad Request** – The request body was malformed or contained invalid 
  parameters.
* **403 Forbidden** – The user does not have permission to perform chat 
  completions.

## REST 2.0 URL

### Chat Completions Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint for chat completions:

<code>https://<Config v="domains.rest.indexing"/>/v2/llms/chat/completion</code>
