---
id: model-selection
title: LLM selection
sidebar_label: LLM selection
---

import {vars} from '@site/static/variables.json';
import CodePanel from '@site/src/theme/CodePanel';

Selecting the right model for your application helps you meet specific use 
case requirements. Vectara provides flexible model selection capabilities 
that support both Vectara-provided presets and the ability to add your own
 models.

## Generation presets

[Generation presets](/docs/learn/grounded-generation/select-a-summarizer) provide curated model configurations optimized for 
specific use cases and simplify model selection. We recommend the following 
generation presets:

- `mockingbird-2.0` - Vectara's RAG-optimized LLM with superior citation accuracy
- `vectara-summary-ext-24-05-med-omni` - GPT-4o for enhanced citations
- `vectara-summary-table-query-ext-dec-2024-gpt-4o` - Optimized for table data

## Bring Your Own LLM

Organizations can integrate third-party LLMs using Vectara's [Bring Your Own LLM](/docs/search-and-retrieval/bring-your-own-llm) 
capability. 

:::caution Important 
Custom LLMs cannot be used directly in queries. They must be referenced 
through generation presets.
:::

1. **Register your LLM** using the Create LLM API endpoint (`POST /v2/llms`)
   - Supports OpenAI-compatible APIs (including Anthropic Claude)
   - Supports Vertex AI (Google Gemini models)
   - Supports OpenAI Responses API (reasoning models like o1, o3)
2. **Create or use a generation preset** that references your LLM by name
3. **Use the preset** in queries with `generation_preset_name`

**Override option**: You can override a preset's LLM using `model_parameters.llm_name`:

<CodePanel 
  title="Override preset LLM"
  snippets={[
    {
      language: "json",
      code: `{
  "generation": {
    "generation_preset_name": "existing-preset",
    "model_parameters": {
      "llm_name": "your-custom-llm-name"  // Overrides the preset's LLM
    }
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 5, text: 'Use the name from your registered LLM' }
    ]
  }}
  layout="stacked"
/>

## Supported model types

### Vectara native models

**Mockingbird LLMs**
- Specifically designed for Retrieval Augmented Generation
- Superior citation accuracy compared to general-purpose models
- Excellent multilingual performance
- Optimized for structured data generation

### OpenAI models

**Available via OpenAI-compatible API:**
- GPT-4, GPT-4-turbo
- GPT-3.5-turbo for cost-effective applications
- Custom fine-tuned models via OpenAI interface

### Vertex AI Models

**Google Cloud integration:**
- Gemini 2.5-flash (cost-effective, fast)
- Gemini 2.5-pro (high performance)
- Gemini 2.0-experimental (latest features)

### Claude Models

**Anthropic integration:**
- Available via OpenAI-compatible interface
- Various Claude model variants supported

## Use Case Recommendations

### RAG applications
**Recommended model**: `mockingbird-2.0`
- **Why**: Designed specifically for RAG use cases
- **Benefits**: Enhanced citation accuracy, better context understanding
- **Best For**: Enterprise applications requiring high-quality summaries with reliable source attribution

### General summarization  
**Recommended models**: GPT-4 variants
- **Why**: Versatile performance across different content types
- **Benefits**: Strong reasoning capabilities, broad knowledge
- **Best For**: Applications requiring creative or analytical summaries

### Cost-effective solutions
**Recommended model**: GPT-3.5-turbo or Gemini Flash
- **Why**: Lower cost per token while maintaining good quality
- **Benefits**: Faster response times, reduced operational costs  
- **Best For**: High-volume applications with simpler summarization needs

### Multilingual applications
**Recommended model**: `mockingbird-2.0`
- **Why**: Excellent multilingual performance
- **Benefits**: Consistent quality across languages
- **Best For**: Global applications serving diverse language communities

### Technical documentation
**Recommended model**: GPT-4 with structured prompts
- **Why**: Strong performance on technical content
- **Benefits**: Better handling of code, APIs, and technical concepts
- **Best For**: Developer documentation and technical knowledge bases

## Advanced model configuration options

### Nuanced control

For applications requiring precise control over model behavior:

<CodePanel 
  title="Advanced Model Parameters"
  snippets={[
    {
      language: "json",
      code: `{
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "model_parameters": {
      "temperature": 0.2,
      "max_tokens": 1600,
      "frequency_penalty": 0.3,
      "presence_penalty": 0.1
    },
    "max_response_characters": 2000
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 5, text: 'Control creativity (0.0 = factual, 1.0 = creative)' },
      { line: 6, text: 'Hard limit on response tokens' },
      { line: 7, text: 'Reduce repetition (0.0 to 1.0)' },
      { line: 8, text: 'Encourage topic diversity (0.0 to 1.0)' },
      { line: 10, text: 'Soft limit on response length' }
    ]
  }}
  layout="stacked"
/>

### Parameter recommendations

- **temperature**: 0.0-0.3 for factual content, 0.4-0.7 for creative content
- **max_tokens**: Set based on desired response length (typically 200-2000)
- **frequency_penalty**: 0.1-0.5 to reduce repetition
- **presence_penalty**: 0.1-0.3 to encourage topic diversity

### Custom prompt templates

Combine model selection with [custom prompt templates](/docs/prompts/vectara-prompt-engine) for specialized applications:

- Legal document analysis
- Financial report summarization  
- Scientific literature review
- Customer support responses

## Data-driven model selection

Rather than guessing which model works best for your use case, use the 
[Vectara Open Eval Framework](/docs/build-apps/open-eval-framework) to systematically evaluate and optimize your model selection:

### Systematic evaluation process
1. **Create evaluation datasets** representative of your use case
2. **Test multiple model configurations** with different presets and parameters  
3. **Measure performance** using standardized metrics (UMBRELA, BERT Score, etc.)
4. **Compare results** to identify optimal configurations

### Beyond "black box" selection
The evaluation framework transforms model selection from trial-and-error into a data-driven process:
- **Quantifiable results** instead of subjective assessment
- **Statistical comparison** between different configurations  
- **Use case-specific optimization** rather than generic recommendations
- **Continuous improvement** through systematic re-evaluation
