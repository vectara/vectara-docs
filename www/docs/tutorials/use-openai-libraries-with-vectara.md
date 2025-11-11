---
id: use-openai-libraries-with-vectara
title: Use OpenAI SDK with the Vectara Chat Completions API
sidebar_label: Use OpenAI SDK with the Vectara Chat Completions API
---

import CodePanel from '@site/src/theme/CodePanel';

This tutorial demonstrates how to use Vectara's Chat Completions API through
OpenAI-compatible interfaces. Learn how to integrate Vectara's generative AI
capabilities into your applications using either direct HTTP requests or the
OpenAI Python SDK. This enables seamless migration from OpenAI or integration
with OpenAI-compatible tools. By completing this tutorial, you will use
Vectara's API directly or via OpenAI SDK.

This tutorial contains the following steps:

1. [Prerequisites and setup](#prerequisites-and-setup)
2. [Step 1. Install the required packages](#step-1-install-the-required-packages)
3. [Step 2. Implement the VectaraChat client](#step-2-implement-the-vectarachat-client)
4. [Step 3. Enter your API key](#step-3-enter-your-api-key)
5. [Step 4. Initialize the Vectara chat client](#step-4-initialize-the-vectara-chat-client)
6. [Step 5. Perform tests](#step-5-perform-tests)

:::tip Note
We recommend that you complete this tutorial in [**Google Colab**](https://colab.google).
:::

## Prerequisites and setup

- Python 3.8 or higher
- Basic understanding of REST APIs and HTTP requests
- A valid [Vectara API key](https://docs.vectara.com/docs/security/authentication/api-key-management) with access to the [Chat Completions](/docs/rest-api/create-chat-completion) endpoint.

## Step 1. Install the required packages

Install the required Python packages. The `requests` library handles direct HTTP 
calls, while `openai` provides the official OpenAI SDK for simplified 
integration.

<CodePanel snippets={[{language: "bash", code: `pip install requests openai`}]} title="Install Required Packages" layout="stacked" />

## Step 2. Implement the VectaraChat client

The following code contains the implementation of the VectaraChat client,
which provides methods for interacting with Vectara's Chat Completions API.

<CodePanel
  title="VectaraChat Client Implementation"
  snippets={[{
    language: 'python',
    code: `import json
import requests
from typing import Dict, List, Optional, Union, Any

class VectaraChat:
    """A client for Vectara's Chat Completions API."""

    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.vectara.io",
        use_bearer_token: bool = False,
        verbose: bool = False
    ):
        """
        Initialize the Vectara Chat client.

        Args:
            api_key: Vectara API key
            base_url: Base URL for the API (default: https://api.vectara.io)
            use_bearer_token: Use Bearer token format in Authorization header
            verbose: Enable verbose logging
        """
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.use_bearer_token = use_bearer_token
        self.verbose = verbose

    def _log(self, message: str) -> None:
        """Log a message if verbose mode is enabled."""
        if self.verbose:
            print(f"DEBUG: {message}")

    def direct_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "gpt-4o-mini",
        stream: bool = False,
        **kwargs
    ) -> Union[Dict, str]:
        """
        Create a chat completion using direct HTTP requests.

        Args:
            messages: List of message objects with role and content
            model: Model to use (default: gpt-4o-mini)
            stream: Whether to stream the response
            **kwargs: Additional parameters to include in the request

        Returns:
            The completion response (either a dict or streamed content)
        """
        url = f"{self.base_url}/v2/llms/chat/completions"

        # Prepare headers
        headers = {
            "Content-Type": "application/json",
            "Accept": "text/event-stream" if stream else "application/json",
        }

        # Add authentication
        if self.use_bearer_token:
            headers["Authorization"] = f"Bearer {self.api_key}"
        else:
            headers["x-api-key"] = self.api_key

        # Prepare payload
        payload = {
            "model": model,
            "messages": messages,
            "stream": stream,
            **kwargs
        }

        self._log(f"Making request to {url}")
        self._log(f"Headers: {json.dumps({k: '***' if k in ['x-api-key', 'Authorization'] else v for k, v in headers.items()})}")
        self._log(f"Payload: {json.dumps(payload)}")

        # Make the request
        response = requests.post(url, json=payload, headers=headers, stream=stream)

        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            print(response.text)
            response.raise_for_status()

        if stream:
            return self._handle_streaming_response(response)
        else:
            return response.json()

    def _handle_streaming_response(self, response) -> str:
        """Process a streaming API response."""
        content_buffer = ""

        # Process the SSE stream manually
        for line in response.iter_lines():
            if not line:
                continue

            line_text = line.decode('utf-8')
            if line_text.startswith('data:'):
                data = line_text[5:].strip()  # Remove 'data:' prefix and whitespace

                if data == "[DONE]":
                    break

                try:
                    if data:  # Only process if data is not empty
                        chunk = json.loads(data)
                        if "choices" in chunk and len(chunk["choices"]) > 0:
                            delta = chunk["choices"][0].get("delta", {})
                            content = delta.get("content", "")
                            if content:
                                print(content, end="", flush=True)
                                content_buffer += content
                except Exception as e:
                    self._log(f"Error processing chunk: {e}, data: {data}")

        print()  # Add a newline after streaming completes
        return content_buffer

    def openai_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "gpt-4o-mini",
        stream: bool = False,
        **kwargs
    ) -> Any:
        """
        Create a chat completion using the OpenAI SDK.

        Args:
            messages: List of message objects with role and content
            model: Model to use (default: gpt-4o-mini)
            stream: Whether to stream the response
            **kwargs: Additional parameters to include in the request

        Returns:
            The completion response from the OpenAI SDK
        """
        try:
            from openai import OpenAI
        except ImportError:
            print("Error: OpenAI SDK not installed. Run !pip install openai")
            return None

        # For OpenAI SDK compatibility, append v2/llms to the base_url
        sdk_base_url = f"{self.base_url}/v2/llms"

        self._log(f"Creating OpenAI client with base_url={sdk_base_url}")

        # Configure custom headers for the OpenAI client
        extra_headers = {}
        if stream:
            # Make sure we explicitly set Accept header for streaming
            extra_headers["Accept"] = "text/event-stream"

        # Configure authentication
        if self.use_bearer_token:
            # Using Bearer token - the SDK will use this as Authorization: Bearer {api_key}
            client = OpenAI(
                api_key=self.api_key,
                base_url=sdk_base_url,
                default_headers=extra_headers
            )
        else:
            # Using x-api-key header
            client = OpenAI(
                api_key="dummy_key_not_used",  # OpenAI SDK requires some API key
                base_url=sdk_base_url,
                default_headers={
                    "x-api-key": self.api_key,
                    **extra_headers
                }
            )

        self._log(f"Using OpenAI SDK with base_url: {sdk_base_url}")

        # Create the completion
        try:
            if stream:
                # Handle streaming with our custom implementation
                return self._handle_openai_streaming(client, model, messages, **kwargs)
            else:
                # Handle standard request with the SDK
                return client.chat.completions.create(
                    model=model,
                    messages=messages,
                    stream=False,
                    **kwargs
                )
        except Exception as e:
            print(f"Error: {e}")
            return None

    def _handle_openai_streaming(self, client, model: str, messages: List[Dict[str, str]], **kwargs) -> str:
        """Handle streaming with the OpenAI SDK using our custom implementation."""
        # Prepare the request URL
        base_url_str = str(client.base_url)
        url = f"{base_url_str.rstrip('/')}/chat/completions"

        # Prepare headers
        headers = {
            "Content-Type": "application/json",
            "Accept": "text/event-stream",
        }

        # Add authentication header
        if self.use_bearer_token:
            headers["Authorization"] = f"Bearer {self.api_key}"
        else:
            headers["x-api-key"] = self.api_key

        # Prepare payload
        payload = {
            "model": model,
            "messages": messages,
            "stream": True,
            **kwargs
        }

        self._log(f"Direct streaming request to {url}")

        # Make the request
        response = requests.post(url, json=payload, headers=headers, stream=True)

        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            print(response.text)
            response.raise_for_status()

        return self._handle_streaming_response(response)`
  }]}
  annotations={{
    python: [
      { line: 6, text: 'Main client class providing both direct HTTP and OpenAI SDK interfaces' },
      { line: 13, text: 'use_bearer_token determines authentication method (Bearer vs x-api-key header)' },
      { line: 14, text: 'verbose=True enables detailed logging for debugging API requests and responses' },
      { line: 25, text: 'Strip trailing slashes from base_url to ensure consistent URL formation' },
      { line: 29, text: 'Internal logger method - only prints when verbose mode is enabled' },
      { line: 34, text: 'direct_completion: Make raw HTTP requests without SDK dependencies' },
      { line: 52, text: 'Vectara Chat Completions API endpoint follows OpenAI-compatible path structure' },
      { line: 55, text: 'Accept header varies by mode: text/event-stream for streaming, application/json otherwise' },
      { line: 61, text: 'Support both Bearer token (standard OAuth) and x-api-key (Vectara-specific) authentication' },
      { line: 67, text: 'Include all custom parameters like temperature, max_tokens via **kwargs' },
      { line: 72, text: 'Redact sensitive headers in logs for security (API keys and tokens)' },
      { line: 76, text: 'Pass stream parameter to requests to enable/disable streaming mode' },
      { line: 85, text: 'Route to appropriate handler based on streaming mode' },
      { line: 89, text: 'Parse Server-Sent Events (SSE) format for streaming responses' },
      { line: 94, text: 'SSE streams deliver data line-by-line; empty lines are separators' },
      { line: 98, text: 'Each SSE message starts with "data:" prefix followed by JSON payload' },
      { line: 101, text: 'Special [DONE] message signals end of stream' },
      { line: 106, text: 'Parse JSON chunk and extract delta content from OpenAI-compatible structure' },
      { line: 110, text: 'Print content as it arrives for real-time streaming display' },
      { line: 111, text: 'Buffer all content to return complete response when stream finishes' },
      { line: 116, text: 'Add final newline after streaming completes for clean output formatting' },
      { line: 119, text: 'openai_completion: Use official OpenAI SDK with Vectara backend' },
      { line: 138, text: 'Append /v2/llms to base_url - required for OpenAI SDK routing to Chat Completions endpoint' },
      { line: 143, text: 'Set Accept header for streaming mode to ensure proper SSE handling' },
      { line: 148, text: 'Bearer token mode: Pass API key directly - SDK handles Authorization header formatting' },
      { line: 157, text: 'x-api-key mode: Use dummy key (SDK requirement) and pass real key via custom header' },
      { line: 171, text: 'Streaming requires custom handler due to SSE parsing needs' },
      { line: 174, text: 'Non-streaming uses SDK native methods for typed response objects' },
      { line: 185, text: 'Custom streaming handler: Build direct HTTP request from SDK client configuration' },
      { line: 188, text: 'Extract base_url from SDK client and append chat/completions path' },
      { line: 196, text: 'Manually add authentication header based on chosen auth method' },
      { line: 212, text: 'Reuse _handle_streaming_response to parse SSE stream consistently across both methods' }
    ]
  }}
  layout="stacked"
/>

:::tip
Enable `verbose=True` during development to see detailed request/response 
logging for debugging.
:::


## Step 3. Enter your API key

<CodePanel
  title="API Key Configuration"
  snippets={[{
    language: 'python',
    code: `# Enter your API key here
API_KEY = ""  # Replace with your actual API key

# Alternatively, you can use a form widget for better security
if not API_KEY:
    from google.colab import userdata
    try:
        API_KEY = userdata.get('VECTARA_API_KEY')
        print("API key loaded from Colab secrets")
    except Exception:
        from getpass import getpass
        API_KEY = getpass("Enter your Vectara API key: ")

if not API_KEY or API_KEY == "":
    raise ValueError("API key cannot be empty")`
  }]}
  layout="stacked"
/>


## Step 4: Initialize the Vectara chat client

Create the `VectaraChat` instance and choose between Bearer token authentication
(recommended) or x-api-key header authentication.

<CodePanel
  title="Initialize Client"
  snippets={[{
    language: 'python',
    code: `# Create the client with Bearer token authentication (recommended)
client = VectaraChat(
    api_key=API_KEY,
    use_bearer_token=True,  # True for Bearer token, False for x-api-key header
    verbose=True
)

# Define a simple conversation with one message
messages = [
    {"role": "user", "content": "What is Vectara?"}
]`
  }]}
  layout="stacked"
/>

## Step 5. Perform tests

Now that you've set up the VectaraChat client and initialized it with your API key, let's test both implementation approaches. The following tests demonstrate four different scenarios: direct HTTP requests (streaming and non-streaming) and OpenAI SDK integration (streaming and non-streaming). Each test shows you how to make requests and handle responses in different ways.

## Test 1: Direct API (non-streaming)

Let's test the direct API approach without streaming:

### Direct HTTP Request

<CodePanel
  title="Non-Streaming Direct API Call"
  snippets={[{
    language: 'python',
    code: `print("==== Direct API (non-streaming) ====\\n")

# Make the request
response = client.direct_completion(messages, stream=False)

# Extract the content
content = response['choices'][0]['message']['content']
print(f"Response:\\n{content}")

# Access metadata
print(f"\\nModel: {response['model']}")
print(f"ID: {response['id']}")
print(f"Total tokens: {response['usage']['total_tokens']}")`
  }]}
  annotations={{
    python: [
      { line: 5, text: 'stream=False returns complete response as JSON dictionary' },
      { line: 8, text: 'OpenAI-compatible response structure with choices array' },
      { line: 11, text: 'Response includes metadata like model, ID, and token usage' }
    ]
  }}
  layout="stacked"
/>

<CodePanel snippets={[{language: "json", code: `Response:
Vectara is a powerful AI-powered search and discovery platform that combines semantic search, retrieval-augmented generation (RAG), and generative AI capabilities to help organizations unlock insights from their data.

Model: gpt-4o-mini
ID: chatcmpl-abc123xyz
Total tokens: 156`}]} title="Non-Streaming Response Example" layout="stacked" />

### OpenAI SDK Request

<CodePanel
  title="Non-Streaming with OpenAI SDK"
  snippets={[{
    language: 'python',
    code: `print("==== OpenAI SDK (non-streaming) ====\\n")

# Make the request using OpenAI SDK
response = client.openai_completion(messages, stream=False)

if response:
    # Access response using OpenAI SDK objects
    print(f"Response:\\n{response.choices[0].message.content}")
    
    # SDK provides typed objects for metadata
    print(f"\\nModel: {response.model}")
    print(f"Tokens: {response.usage.total_tokens} "
          f"(prompt: {response.usage.prompt_tokens}, "
          f"completion: {response.usage.completion_tokens})")`
  }]}
  annotations={{
    python: [
      { line: 5, text: 'openai_completion method uses OpenAI SDK internally' },
      { line: 8, text: 'Response is an OpenAI SDK object (e.g., ChatCompletion), providing typed access to model, choices, and usage metadata.' }
    ]
  }}
  layout="stacked"
/>

## Test 2: Direct API (streaming)

Now let's test with streaming enabled:

<CodePanel
  title="Streaming Direct API Call"
  snippets={[{
    language: 'python',
    code: `print("\\n==== Direct API (streaming) ====\\n")
client.direct_completion(messages, stream=True)`
  }]}
  layout="stacked"
/>

<CodePanel snippets={[{language: "text", code: `Vectara is a company that specializes in providing AI-powered solutions for search and
information retrieval. Their platform leverages advanced natural language processing (NLP) and
machine learning techniques to enhance the search experience, making it more intuitive and
effective for users. Vectara's technology is designed to help businesses and organizations
improve their data accessibility, enabling them to find relevant information quickly and
efficiently.

The company focuses on delivering capabilities such as semantic search, which understands the
context and intent behind queries, rather than relying solely on keyword matching. This allows
for more accurate and relevant search results, improving user satisfaction and productivity.

If you are looking for specific features or applications of Vectara's technology, please let me
know!`}]} title="Streaming Output Example" layout="stacked" />

## Test 3: OpenAI SDK (non-streaming)

Now let's test using the OpenAI SDK without streaming:

<CodePanel
  title="OpenAI SDK Non-Streaming Call"
  snippets={[{
    language: 'python',
    code: `print("\\n==== OpenAI SDK (non-streaming) ====\\n")
response = client.openai_completion(messages, stream=False)
if response:
    print(f"Response:\\n{response.choices[0].message.content}")

    # Optionally, display additional information
    print(f"\\nModel: {response.model}")
    print(f"ID: {response.id}")
    print(f"Created: {response.created}")
    print(f"Tokens: {response.usage.total_tokens} (prompt: {response.usage.prompt_tokens}, completion: {response.usage.completion_tokens})")`
  }]}
  layout="stacked"
/>

<CodePanel snippets={[{language: "text", code: `==== OpenAI SDK (non-streaming) ====

DEBUG: Creating OpenAI client with base_url=https://api.vectara.io/v2/llms
DEBUG: Using OpenAI SDK with base_url: https://api.vectara.io/v2/llms
Response:
Vectara is a company that specializes in providing AI-driven solutions for search and
information retrieval. Their platform leverages advanced natural language processing (NLP) and
machine learning techniques to enhance the search experience, making it more intuitive and
effective for users. Vectara's technology is designed to help organizations improve their data
accessibility, enabling users to find relevant information quickly and efficiently.

The company focuses on applications in various sectors, including enterprise search, customer
support, and knowledge management, aiming to transform how businesses interact with their data.
By utilizing AI, Vectara seeks to deliver more accurate and contextually relevant search
results, ultimately enhancing productivity and decision-making processes for its clients.

For the most current information about Vectara, including any recent developments or offerings,
it's best to check their official website or recent news articles.

Model: gpt-4o-mini
ID: chatcmpl-COAL8Y6FlkcsLPZinYPGP3G9nhRCa
Created: 1759875654
Tokens: 177 (prompt: 13, completion: 164)`}]} title="OpenAI SDK Output Example  " layout="stacked" />

## Test 4: OpenAI SDK (streaming)

Finally, let's test the OpenAI SDK with streaming:

<CodePanel
  title="OpenAI SDK Streaming Call"
  snippets={[{
    language: 'python',
    code: `print("\\n==== OpenAI SDK (streaming) ====\\n")
client.openai_completion(messages, stream=True)`
  }]}
  layout="stacked"
/>

<CodePanel snippets={[{language: "text", code: `Vectara is a company that specializes in providing AI-driven solutions for search and
information retrieval. Their platform leverages advanced natural language processing (NLP) and
machine learning technologies to enhance the way users interact with data and find information.
Vectara's tools are designed to improve search accuracy, relevance, and user experience, making
it easier for businesses and organizations to access and utilize their data effectively.

The company focuses on creating solutions that can be integrated into various applications,
helping users to retrieve information from large datasets, documents, and other sources in a
more intuitive and efficient manner. Vectara's offerings may include features like semantic
search, contextual understanding, and personalized recommendations, which are increasingly
important in today's data-driven landscape.

For the most current information about Vectara, including their latest products and
developments, it's best to visit their official website or check recent news articles.`}]} title="Streaming Output Example" layout="stacked" />

## Advanced usage examples

Beyond the basic tests, explore these advanced usage patterns to build production-ready applications:

- [Multi-turn conversations](#multi-turn-conversations) - Maintain context across multiple exchanges.
- [Use different models](#use-different-models) - Switch between available LLM models.
- [Customize generation parameters](#customize-generation-parameters) - Control output with temperature and token limits.   

### Multi-turn conversations

The previous tests showed single-question interactions. Real conversational applications need to maintain context across multiple exchanges. The Chat Completions API supports multi-turn conversations by including the conversation history in each request. Here's how to build a contextual conversation:

<CodePanel
  title="Multi-Turn Conversation Example"
  snippets={[{
    language: 'python',
    code: `conversation = [
    {"role": "system", "content": "You are a helpful assistant with knowledge about AI and search technologies."},
    {"role": "user", "content": "What is RAG in the context of AI?"},
]

print("\\n==== Multi-turn conversation (first turn) ====\\n")
response = client.direct_completion(conversation, stream=False)
assistant_response = response['choices'][0]['message']['content']
print(f"Response:\\n{assistant_response}")

# Add the assistant's response to the conversation
conversation.append({"role": "assistant", "content": assistant_response})

# Add a follow-up question
conversation.append({"role": "user", "content": "How does RAG improve LLM performance?"})

print("\\n==== Multi-turn conversation (second turn) ====\\n")
response = client.direct_completion(conversation, stream=True)`
  }]}
  layout="stacked"
/>

<CodePanel snippets={[{language: "text", code: `==== Multi-turn conversation (first turn) ====

DEBUG: Making request to https://api.vectara.io/v2/llms/chat/completions
DEBUG: Headers: {"Content-Type": "application/json", "Accept": "application/json",
"Authorization": "***"}
DEBUG: Payload: {"model": "gpt-4o-mini", "messages": [{"role": "system", "content": "You are a
helpful assistant with knowledge about AI and search technologies."}, {"role": "user", "content":
"What is RAG in the context of AI?"}], "stream": false}
Response:
RAG stands for "Retrieval-Augmented Generation." It is a framework in the field of artificial
intelligence that combines retrieval-based methods with generative models to improve the quality
and relevance of generated text.

In a typical RAG setup, the process involves two main components:

1. **Retrieval Component**: This part of the system retrieves relevant documents or pieces of
information from a large corpus based on a given query or input. This is often done using
techniques from information retrieval, such as vector similarity search or traditional keyword
matching.

2. **Generation Component**: After retrieving relevant information, a generative model (often
based on transformer architectures like GPT) uses this information to produce coherent and
contextually appropriate responses or text. The generative model can leverage the retrieved
documents to provide more accurate, informative, and contextually relevant outputs.

The RAG approach is particularly useful in scenarios where the knowledge required to answer a
question or generate text is too vast to be contained within the parameters of a single model.
By augmenting the generative capabilities with external knowledge retrieval, RAG systems can
produce more informed and contextually rich responses.

RAG has applications in various domains, including conversational agents, question answering
systems, and content generation, where the need for up-to-date or specific information is
critical.

==== Multi-turn conversation (second turn) ====

DEBUG: Making request to https://api.vectara.io/v2/llms/chat/completions
DEBUG: Headers: {"Content-Type": "application/json", "Accept": "text/event-stream",
"Authorization": "***"}
DEBUG: Payload: {"model": "gpt-4o-mini", "messages": [{"role": "system", "content": "You are a
helpful assistant with knowledge about AI and search technologies."}, {"role": "user", "content":
"What is RAG in the context of AI?"}, {"role": "assistant", "content": "RAG stands for
\\"Retrieval-Augmented Generation.\\" It is a framework in the field of artificial intelligence
that combines retrieval-based methods with generative models to improve the quality and
relevance of generated text.\\n\\nIn a typical RAG setup, the process involves two main
components:\\n\\n1. **Retrieval Component**: This part of the system retrieves relevant documents
or pieces of information from a large corpus based on a given query or input. This is often done
using techniques from information retrieval, such as vector similarity search or traditional
keyword matching.\\n\\n2. **Generation Component**: After retrieving relevant information, a
generative model (often based on transformer architectures like GPT) uses this information to
produce coherent and contextually appropriate responses or text. The generative model can
leverage the retrieved documents to provide more accurate, informative, and contextually relevant
outputs.\\n\\nThe RAG approach is particularly useful in scenarios where the knowledge required
to answer a question or generate text is too vast to be contained within the parameters of a
single model. By augmenting the generative capabilities with external knowledge retrieval, RAG
systems can produce more informed and contextually rich responses.\\n\\nRAG has applications in
various domains, including conversational agents, question answering systems, and content
generation, where the need for up-to-date or specific information is critical."}, {"role":
"user", "content": "How does RAG improve LLM performance?"}], "stream": true}
Retrieval-Augmented Generation (RAG) improves the performance of large language models (LLMs) in
several key ways:

1. **Access to External Knowledge**: LLMs are typically trained on a fixed dataset and have a
knowledge cutoff date. RAG allows these models to access up-to-date information from external
sources, enabling them to provide more accurate and relevant responses, especially for queries
about recent events or specialized topics.

2. **Enhanced Contextual Relevance**: By retrieving relevant documents or snippets of
information based on the input query, RAG helps the generative model produce responses that are
more contextually appropriate. This is particularly beneficial for complex queries where the
answer may require specific details that the LLM alone might not have.

3. **Reduction of Hallucinations**: LLMs can sometimes generate incorrect or nonsensical
information, a phenomenon known as "hallucination." By grounding the generation process in
retrieved documents, RAG can help mitigate this issue, as the generative model can refer to
factual content rather than relying solely on its training data.

4. **Improved Specificity and Detail**: RAG allows the generative model to pull in specific
facts, figures, or examples from the retrieved documents, leading to more detailed and
informative responses. This is particularly useful in applications like question answering, where
users expect precise answers.

5. **Scalability of Knowledge**: RAG systems can scale their knowledge base by simply updating
the corpus from which they retrieve information. This means that as new information becomes
available, the system can remain current without needing to retrain the entire model.

6. **Flexibility Across Domains**: RAG can be adapted to various domains by changing the
retrieval corpus. This flexibility allows the same underlying generative model to be used in
different contexts, such as legal, medical, or technical fields, by simply adjusting the source
of retrieved information.

7. **Improved User Experience**: By providing more accurate, relevant, and detailed responses,
RAG enhances the overall user experience in applications like chatbots, virtual assistants, and
content generation tools, making them more useful and reliable.

In summary, RAG enhances LLM performance by integrating retrieval mechanisms that provide access
to external knowledge, improving the relevance and accuracy of generated content, and reducing
the likelihood of generating incorrect information. This combination leads to more effective and
user-friendly AI applications.`}]} title="Multi-Turn Conversation Output" layout="stacked" />

### Use different models

Vectara supports various LLM models. Let's try a different model:

<CodePanel
  title="Using Different Models"
  snippets={[{
    language: 'python',
    code: `# Try with a different model
different_model = "gpt-4o"  # Or another model available in your Vectara instance

print(f"\\n==== Using model: {different_model} ====\\n")
try:
    client.direct_completion(
        messages=[{"role": "user", "content": "Summarize the key benefits of RAG systems in 3 bullets"}],
        model=different_model,
        stream=True
    )
except Exception as e:
    print(f"Error: {e}")`
  }]}
  layout="stacked"
/>

<CodePanel snippets={[{language: "text", code: `==== Using model: gpt-4o ====

DEBUG: Making request to https://api.vectara.io/v2/llms/chat/completions
DEBUG: Headers: {"Content-Type": "application/json", "Accept": "text/event-stream", "Authorization": "***"}
DEBUG: Payload: {"model": "gpt-4o", "messages": [{"role": "user", "content": "Summarize the key benefits of RAG systems in 3 bullets"}], "stream": true}
- **Improved Information Retrieval**: RAG (Retrieval-Augmented Generation) systems enhance the quality of generated responses by retrieving relevant information from external databases or documents, ensuring that the output is both accurate and contextually relevant.

- **Enhanced Contextual Understanding**: By integrating retrieval mechanisms, RAG systems can access a broader context, allowing them to generate more informed and nuanced responses, which is particularly beneficial for complex queries requiring detailed knowledge.

- **Reduced Hallucination**: The use of external data sources helps RAG systems minimize the risk of generating incorrect or fabricated information, as they rely on verified data to support their responses, leading to more reliable and trustworthy outputs.`}]} title="Different Model Output" layout="stacked" />

### Customize generation parameters

You can customize generation parameters to control the output:

<CodePanel
  title="Customizing Parameters"
  snippets={[{
    language: 'python',
    code: `print("\\n==== Customizing parameters ====\\n")
client.direct_completion(
    messages=[{"role": "user", "content": "Write a short poem about AI"}],
    temperature=0.8,  # Higher temperature for more creative responses
    max_tokens=100,   # Limit the length of the response
    stream=True
)`
  }]}
  layout="stacked"
/>

<CodePanel snippets={[{language: "text", code: `==== Customizing parameters ====

DEBUG: Making request to https://api.vectara.io/v2/llms/chat/completions
DEBUG: Headers: {"Content-Type": "application/json", "Accept": "text/event-stream", "Authorization": "***"}
DEBUG: Payload: {"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Write a short poem about AI"}], "stream": true, "temperature": 0.8, "max_tokens": 100}
In circuits deep where silence hums,
A spark of thought, a pulse that drums,
From coded lines, a world takes flight,
In shadows cast by digital light.

With every query, wisdom grows,
In patterns spun, where knowledge flows,
A mirror held to human dreams,
In algorithms, hope redeems.

Yet in this dance of man and machine,
We ponder what it all could mean,
For in our hands, we wield the key,`}]} title="Customized Output" layout="stacked" />

This tutorial demonstrated how to use the Vectara Chat Completions API, both
directly and with the OpenAI SDK. You can use this API to add powerful
generative AI capabilities to your applications with OpenAI-compatible
interfaces.

For integration examples with external applications, see [Use with External Applications](use-external-applications-sdk.md).

