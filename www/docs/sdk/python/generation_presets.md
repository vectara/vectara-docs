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

For more details on generation presets, see the 
[Generation Presets documentation](/docs/learn/grounded-generation/select-a-summarizer).

:::info Prerequisites
This guide assumes you have a corpus called `my-docs`. If you haven't created a corpus yet, follow 
the [Quick Start](/docs/sdk/python/python-quickstart) guide to set up your first corpus.
:::

## Using Generation Presets

Available presets include:
- **mockingbird-2.0**: High accuracy and factuality for enterprise summaries.
- **vectara-summary-ext-24-05-med-omni**: GPT-4o-based for advanced summarization 
  and conversational responses.

### Example 1: Financial summary with Mockingbird 2.0


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `response = client.corpora.query(
    query="Summarize Q1 2024 earnings for European banking clients",
    generation_preset_name="mockingbird-2.0",
    corpora=[{"corpus_key": "finance_docs"}],
    metadata_filter="doc_region = 'EU' AND doc_quarter = 'Q1-2024' AND \ndoc_industry = 'banking'",
    max_used_search_results=50
)`
    }
  ]}
  title="Financial Summary with Mockingbird 2.0"
  annotations={{
    python: [
      { line: 3, text: 'Uses Mockingbird 2.0 for high-quality RAG output.' },
      { line: 4, text: 'Targets the finance documents corpus.' },
      { line: 5, text: 'Filters for relevant financial data.' },
      { line: 7, text: 'Sets max search results for comprehensive summary.' }
    ]
  }}
  customWidth="55%"
/>

Generate a tailored financial summary using Mockingbird 2.0 with precise 
metadata filtering.


- `generation_preset_name="mockingbird-2.0"`
  - High accuracy, up-to-date factuality, and balanced tone in enterprise summaries.
- `corpora=[{"corpus_key": "finance_docs"}]`
  - Limits search to your company’s trusted finance corpus.
- `metadata_filter="doc_region = 'EU' AND doc_quarter = 'Q1-2024' AND doc_industry = 'banking'"`
  - Ensures only documents relevant to *European* banks in *Q1 2024* are used—critical for regulatory and reporting accuracy.
- `max_used_search_results=10`
  - Maximizes context coverage but stays concise for summarization.

---

### Example 2: Support chat with GPT-4o


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `response = client.chats.create(
    query="What causes login failures in our mobile app?",
    generation_preset_name="vectara-summary-ext-24-05-med-omni",
    corpora=[{"corpus_key": "support_kb"}],
    metadata_filter="doc_platform = 'mobile' AND doc_issue_type = 'auth_failure'",
    max_response_characters=500
)`
    }
  ]}
  title="Support Chat with GPT-4o Preset"
  annotations={{
    python: [
      { line: 3, text: 'Uses GPT-4o preset for advanced summarization.' },
      { line: 4, text: 'Targets the support knowledge base corpus.' },
      { line: 5, text: 'Filters for mobile authentication issues.' },
      { line: 6, text: 'Limits the number of returned characters.' }
    ]
  }}
  customWidth="55%"
/>

Deliver concise support responses with the GPT-4o-based 
`vectara-summary-ext-24-05-med-omni` preset. This preset leverages a 
GPT-4o-based model, ideal for responsive, conversational support and broad 
knowledge coverage.

- `generation_preset_name="vectara-summary-ext-24-05-med-omni"`
  - Advanced summarization, up-to-date knowledge, and conversational tone.
- `corpora=[{"corpus_key": "support_kb"}]`
  - Focuses the model only on vetted support knowledge base articles.
- `metadata_filter="doc_platform = 'mobile' AND doc_issue_type = 'auth_failure'"`
  - Surfaces only mobile-specific authentication problems—preventing noise from irrelevant issues.
- `max_response_characters=500`
  - Enforces concise, agent-ready responses (ideal for chatbots or customer-facing UIs).


---

## Error Handling
- **400 Bad Request**: Invalid parameters (`max_tokens` < 0).
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

