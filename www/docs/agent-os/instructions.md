---
id: instructions
title: Creating instructions
sidebar_label: Creating instructions
---

import CodePanel from '@site/src/theme/CodePanel';

An agent's behavior is defined by the instructions you give it. The agent uses
these instructions alongside information from a conversation session to
determine how to respond to user input, including which tools to use.

This section provides information about creating instructions, velocity 
templates, and some metadata pattern examples.

:::tip Note
Instructions in Vectara are referred to as **system prompts** in other LLM APIs
(such as Gemini, Mistral, and OpenAI). If you are familiar with _system prompts_
terminology, instructions serve a similar purpose. Instructions define the
role, behavior, and guidelines of an agent before any user interaction begins.
:::

## Creating instructions

To create an instruction, you provide information like `name` and `description`, `template` 
details, and arbitrary `metadata` for tracking, versioning, or categorization.

See [Create Instruction API](/docs/rest-api/create-instruction) for detailed specifications.

## Using instructions in agents

When creating or configuring agents, you can use instructions in two ways:

* **Create new** instructions in the agent configuration directly:
  <CodePanel
      title="Inline Instruction in Agent"
      layout="stacked"
      snippets={[
        {
          language: "json",
          code: `{
      "first_step": {
        "type": "conversational",
        "instructions": [
          {
            "type": "inline",
            "name": "Task-Specific Behavior",
            "template_type": "velocity",
            "template": "For this specific task, prioritize speed over completeness. Provide quick, actionable answers."
          }
        ],
        "output_parser": {
          "type": "default"
        }
      }
    }`
        }
      ]}
    />
* Reference an **existing instruction** by name and version:
  <CodePanel
      title="Reference Instruction in Agent"
      layout="stacked"
      snippets={[
        {
          language: "json",
          code: `{
      "first_step": {
        "type": "conversational",
        "instructions": [
          {
            "type": "reference",
            "name": "Customer Support Tone and Style Guide",
            "version": 1
          }
        ],
        "output_parser": {
          "type": "default"
        }
      }
    }`
        }
      ]}
    />

### Use multiple instructions

Agents can use multiple instructions together that are processed in order. In 
this example, you have three instructions:

<CodePanel
  title="Multiple Instructions"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "name": "Company Brand Voice",
        "version": 2
      },
      {
        "type": "reference",
        "name": "Customer Support Guidelines",
        "version": 1
      },
      {
        "type": "inline",
        "name": "Session-Specific Context",
        "template_type": "velocity",
        "template": "This session is for technical support inquiries only."
      }
    ],
    "output_parser": {
      "type": "default"
    }
  }
}`
    }
  ]}
/>

## Velocity templates

Instructions use the Apache Velocity templating engine, which enables you to
dynamically insert variables into your prompts using the tools context and
the metadata context.

See the [available prompt variables](/docs/prompts/vectara-prompt-engine#available-prompt-variables) for more information.

### Tools context

`$tools` is a list of tools available to the agent. You can iterate over tools
to display their names and descriptions in your instructions.

<CodePanel
  title="Tools in Template"
  layout="stacked"
  snippets={[
    {
      language: "velocity",
      code: `You have access to the following tools:
#foreach($tool in $tools)
  - \${tool.name}: \${tool.description}
#end

Use these tools to help answer user questions. Always search your knowledge base before using web search.`
    }
  ]}
/>

This dynamically lists all available tools when the agent is initialized.

### Metadata context

Instructions can access metadata from both sessions and agents, enabling
personalized and context-aware behavior:

- `${session.metadata.field}` - Access session-specific metadata (user context, permissions, preferences)
- `${agent.metadata.field}` - Access agent-level metadata (version, configuration, environment)
- `${currentDate}` - Current date/time in ISO 8601 format

#### Session metadata examples

<CodePanel
  title="Session Metadata in Template"
  layout="stacked"
  snippets={[
    {
      language: "velocity",
      code: `Hello! I see you're \${session.metadata.user_name} from \${session.metadata.region}.

I'm here to help you with \${session.metadata.department} inquiries.

#if(\${session.metadata.subscription_tier} == "enterprise")
As an enterprise customer, you have access to priority support and advanced features.
#end

Your support tier: \${session.metadata.support_tier}
Preferred language: \${session.metadata.language}`
    }
  ]}
/>

When a session is created with this metadata:

<CodePanel
  title="Session Metadata"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "metadata": {
    "user_name": "Jane Smith",
    "region": "EMEA",
    "department": "billing",
    "subscription_tier": "enterprise",
    "support_tier": "priority",
    "language": "en"
  }
}`
    }
  ]}
/>

The instruction renders as:

> "Hello! I see you're Jane Smith from EMEA. I'm here to help you with billing inquiries. As an enterprise customer, you have access to priority support and advanced features. Your support tier: priority. Preferred language: en"


## Common metadata patterns

This section provides some example metadata patterns that you can use in your 
instructions.

### Access control security

Use metadata to enforce permissions and data access policies:

- `user_role` (admin, manager, employee) - Filter search results by permission level.
- `tenant_id` (company123) - Isolate data in multi-tenant systems.
- `department` (legal, sales, engineering) - Show only relevant documents.
- `clearance_level` (public, confidential, secret) - Enforce document access policies.
- `data_classification` (internal, external) - Control what information can be shared.
  <CodePanel
    title="Access Control Example"
    layout="stacked"
    snippets={[
      {
        language: "velocity",
        code: `#if(\${session.metadata.user_role} == "admin")
  You have full access to all documents and can perform administrative tasks.
  #elseif(\${session.metadata.user_role} == "manager")
  You can access department documents and team information.
  #else
  You can access public documents and your personal files only.
  #end

  When searching, only show documents with clearance level at \nor below: \${session.metadata.clearance_level}`
      }
    ]}
  />

### Personalization

Customize agent behavior based on user preferences:

- `language` (en, es, fr) - Respond in the preferred language of the user.
- `timezone` (America/New_York) - Schedule meetings and show local times.
- `subscription_tier` (free, pro, enterprise) - Enable or disable premium features.
- `user_preference` (brief, detailed) - Adjust responses for length or brevity.
- `region` (EMEA, APAC, Americas) - Show region-specific content, pricing, compliance.
  <CodePanel
    title="Personalization Example"
    layout="stacked"
    snippets={[
      {
        language: "velocity",
        code: `Respond in \${session.metadata.language}.

  #if(\${session.metadata.user_preference} == "brief")
  Keep responses concise and to the point. Use bullet points when possible.
  #else
  Provide detailed, comprehensive responses with examples and context.
  #end

  Always display times in \${session.metadata.timezone}.
  Show pricing in \${session.metadata.region}-specific currency and format.`
      }
    ]}
  />

### Business context

Provide relevant information based on customer or business attributes:

- `customer_id` (cust_789) - Reference customer-specific orders, support history.
- `account_type` (trial, paid, enterprise) - Customize the onboarding experience.
- `industry` (healthcare, finance, retail) - Use industry-specific terminology.
- `product_owned` (basic, premium, professional) - Provide relevant help resources.
- `contract_type` (annual, monthly, perpetual) - Tailor renewal reminders.
  <CodePanel
    title="Business Context Example"
    layout="stacked"
    snippets={[
      {
        language: "velocity",
        code: `You are assisting a customer in the \${session.metadata.industry} industry.
  Use \${session.metadata.industry}-specific terminology and examples.

  Account type: \${session.metadata.account_type}
  Products owned: \${session.metadata.products_owned}

  #if(\${session.metadata.account_type} == "trial")
  Note: This customer is on a trial. Focus on demonstrating value and addressing \nconcerns about converting to a paid plan.
  #end

  When providing documentation links, prioritize \${session.metadata.product_owned}-specific guides.`
      }
    ]}
  />

### Workflow routing

Guide agent behavior based on conversation context:

- `support_tier` (L1, L2, escalated) - Route questions to the appropriate knowledge base.
- `conversation_type` (sales, support, onboarding) - Apply different tones and approaches.
- `agent_purpose` (billing, technical, general) - Focus search on relevant corpora.
- `escalation_needed` (true, false) - Track when the agent needs human intervention.
- `channel` (web, mobile, API, voice) - Adjust the response format and length.
  <CodePanel
    title="Workflow Example"
    layout="stacked"
    snippets={[
      {
        language: "velocity",
        code: `Conversation type: \${session.metadata.conversation_type}

  #if(\${session.metadata.conversation_type} == "sales")
  Your goal is to understand customer needs and demonstrate how our products solve their problems. Be consultative and ask questions.
  #elseif(\${session.metadata.conversation_type} == "support")
  Focus on resolving the customer's issue quickly and effectively. Be empathetic and solution-oriented.
  #elseif(\${session.metadata.conversation_type} == "onboarding")
  Guide the customer through setup. Be patient, thorough, and encouraging.
  #end

  #if(\${session.metadata.channel} == "mobile")
  Keep responses short and scannable for small screens.
  #end`
      }
    ]}
  />

