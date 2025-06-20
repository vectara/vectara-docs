---
id: generation_presets
title: Generation Presets
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

The Vectara SDK's Generation Presets module empowers enterprise developers to 
enhance Retrieval Augmented Generation (RAG) for queries and chats using 
preconfigured LLM settings. Optimize your generative AI solutions with presets 
like **Mockingbird 2.0** and **vectara-summary-ext-24-05-med-omni**—. This guide 
helps you apply these presets to address business needs like personalized 
customer support and data-driven insights. You will learn:

- How to apply presets to tailor query and chat responses
- Techniques for customizing presets with filters and parameters
- Strategies for handling async generation with error management

## Install the Vectara SDK


<CodePanel
  title="Install Vectara SDK"
  defaultLanguage="bash"
  snippets={[
    { language: 'bash', code: `pip install vectara` }
  ]}
  annotations={{
    bash: [{ line: 1, text: 'Installs the Vectara Python SDK via pip.' }]
  }}
  customWidth="55%"
/>

Install the Vectara Python SDK to access generation preset functionality.

<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />

## Initialize the Vectara client

<CodePanel
  title="Initialize VectaraClient"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara import VectaraClient\n\n# Using API key\nclient = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")\n\n# Using OAuth 2.0\nclient = VectaraClient(bearer_token="your_bearer_token", customer_id="your_customer_id")` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Initialize with an API key for preset usage.' },
      { line: 6, text: 'Use OAuth 2.0 for secure production environments.' }
    ]
  }}
  customWidth="55%"
/>

Set up authentication with API key or OAuth 2.0 for secure preset access.

- **Authentication**: Obtain credentials from the [Vectara Console](https://console.vectara.com).
- **Corpus Setup**: Index documents using .
  - `client.corpora.create`
  - `client.documents.index`
  - `client.upload.file`

---

## Using Generation Presets

### Example 1: Financial summary with Mockingbird 2.0


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `from vectara import VectaraClient

client = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")
response = client.corpora.query(
    query="Summarize Q1 2024 earnings for European banking clients",
    generation_preset_name="mockingbird-2.0",
    corpora=[{"corpus_key": "finance_docs"}],
    metadata_filter="doc_region = 'EU' AND doc_quarter = 'Q1-2024' AND \ndoc_industry = 'banking'",
    max_used_search_results=10
)
print(response.generation.response)
`
    }
  ]}
  title="Financial Summary with Mockingbird 2.0"
  annotations={{
    python: [
      { line: 4, text: 'Initializes the client with API credentials.' },
      { line: 5, text: 'Uses Mockingbird 2.0 for high-quality RAG output.' },
      { line: 6, text: 'Targets the finance documents corpus.' },
      { line: 7, text: 'Filters for relevant financial data.' },
      { line: 8, text: 'Sets max search results for comprehensive summary.' }
    ]
  }}
  customWidth="55%"
/>

Generate a tailored financial summary using Mockingbird 2.0 with precise metadata filtering.

---

### Example 2: Support chat


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `from vectara import VectaraClient

client = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")
response = client.chats.create(
    query="What causes login failures in our mobile app?",
    generation_preset_name="vectara-summary-ext-24-05-med-omni",
    corpora=[{"corpus_key": "support_kb"}],
    metadata_filter="doc_platform = 'mobile' AND doc_issue_type = 'auth_failure'",
    max_response_characters=500
)
print(response.generation.response)
`
    }
  ]}
  title="Support Chat with GPT-4o Preset"
  annotations={{
    python: [
      { line: 4, text: 'Sets up the client with secure credentials.' },
      { line: 5, text: 'Uses GPT-4o preset for advanced summarization.' },
      { line: 6, text: 'Targets the support knowledge base corpus.' },
      { line: 7, text: 'Filters for mobile authentication issues.' },
      { line: 8, text: 'Limits response length for concise answers.' }
    ]
  }}
  customWidth="55%"
/>

Deliver concise support responses with the GPT-4o-based vectara-summary-ext-24-05-med-omni preset.

---

### Example 3: Legal analysis with custom parameters

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `from vectara import VectaraClient

client = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")
response = client.corpora.query(
    query="Explain arbitration clause class action exclusion",
    generation_preset_name="mockingbird-2.0",
    corpora=[{"corpus_key": "legal_docs"}],
    metadata_filter="doc_clause_type = 'arbitration' AND doc_jurisdiction = 'US'",
    model_parameters={
        "temperature": 0.5,
        "max_tokens": 400
    }
)
print(response.generation.response)
`
    }
  ]}
  title="Legal Analysis with Custom Mockingbird 2.0"
  annotations={{
    python: [
      { line: 4, text: 'Initializes the client for legal query access.' },
      { line: 5, text: 'Applies Mockingbird 2.0 for precise RAG output.' },
      { line: 6, text: 'Targets the legal documents corpus.' },
      { line: 7, text: 'Filters for US arbitration clauses.' },
      { line: 9, text: 'Sets moderate creativity with temperature.' },
      { line: 10, text: 'Limits response to 400 tokens.' }
    ]
  }}
  customWidth="55%"
/>

Perform legal analysis with Mockingbird 2.0, customized for creativity and token limits.

---

## Error Handling
- **400 Bad Request**: Invalid parameters (e.g., `max_tokens` < 0).
  - *Resolution*: Validate all parameters against their constraints.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with appropriate access.
- **408 Request Timeout**: Request exceeds timeout limit.
  - *Resolution*: Increase `request_timeout` or optimize the query.

:::tip Tips
- Use `generation_preset_name` in `client.corpora.query` or `client.chats.create` to apply presets like `mockingbird-2.0` or `vectara-summary-ext-24-05-med-omni`.
- Customize with `model_parameters` to override preset settings (e.g., `temperature`, `max_tokens`).
- Explore the [Vectara Prompt Engine](https://docs.vectara.com/docs/prompts/vectara-prompt-engine) for prompt template details.
- Contact `feedback@vectara.com` or use the Vectara Console to create new presets.
:::

