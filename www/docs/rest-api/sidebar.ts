import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "rest-api/vectara-rest-api-v-2",
    },
    {
      type: "category",
      label: "Agents",
      link: {
        type: "doc",
        id: "rest-api/agents",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-agent",
          label: "Create agent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-agents",
          label: "List agents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-agent",
          label: "Get agent",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-agent",
          label: "Update agent",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/replace-agent",
          label: "Replace agent",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "rest-api/delete-agent",
          label: "Delete agent",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Agent Sessions",
      link: {
        type: "doc",
        id: "rest-api/agent-sessions",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-agent-session",
          label: "Create agent session",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-agent-sessions",
          label: "List agent sessions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-agent-session",
          label: "Get agent session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-agent-session",
          label: "Update agent session",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/delete-agent-session",
          label: "Delete agent session",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/create-agent-input",
          label: "Interact with an agent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-agent-events",
          label: "List events in agent session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-agent-event",
          label: "Get event in agent session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/list-session-artifacts",
          label: "List session artifacts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-session-artifact",
          label: "Get session artifact",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Instructions",
      link: {
        type: "doc",
        id: "rest-api/instructions",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-instruction",
          label: "Create instruction",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-instructions",
          label: "List instructions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-instruction",
          label: "Get instruction",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-instruction",
          label: "Update instruction",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/delete-instruction",
          label: "Delete instruction",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/test-instruction",
          label: "Test instruction",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/delete-instruction-version",
          label: "Delete instruction version",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Tools",
      link: {
        type: "doc",
        id: "rest-api/tools",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-tool",
          label: "Create tool",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-tools",
          label: "List tools",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/test-lambda-tool-without-creation",
          label: "Test Lambda tool without creation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/get-tool",
          label: "Get tool",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-tool",
          label: "Update tool",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/delete-tool",
          label: "Delete tool",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/test-tool",
          label: "Test Lambda tool",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Tool Servers",
      link: {
        type: "doc",
        id: "rest-api/tool-servers",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/list-tool-servers",
          label: "List tool servers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/create-tool-server",
          label: "Create tool server",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/get-tool-server",
          label: "Get tool Server",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-tool-server",
          label: "Update tool server",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/delete-tool-server",
          label: "Delete tool server",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/sync-tool-server",
          label: "Synchronize tool server",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Queries",
      link: {
        type: "doc",
        id: "rest-api/queries",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/search-corpus",
          label: "Simple Single Corpus Query",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/query-corpus",
          label: "Advanced Single Corpus Query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/query",
          label: "Multiple Corpora Query",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Metadata Query",
      link: {
        type: "doc",
        id: "rest-api/metadata-query",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/query-metadata",
          label: "Query across metadata fields in a corpus",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Upload",
      link: {
        type: "doc",
        id: "rest-api/upload",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/upload-file",
          label: "Upload a file to the corpus",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Index",
      link: {
        type: "doc",
        id: "rest-api/index",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-corpus-document",
          label: "Add a document to a corpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/update-corpus-document",
          label: "Update document, merging the metadata.",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/replace-corpus-document-metadata",
          label: "Replace the document metadata.",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Corpora",
      link: {
        type: "doc",
        id: "rest-api/corpora",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-corpus",
          label: "Create a corpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-corpora",
          label: "List corpora",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-corpus",
          label: "Retrieve metadata about a corpus",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/delete-corpus",
          label: "Delete a corpus and all its data",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/update-corpus",
          label: "Update a corpus",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/reset-corpus",
          label: "Remove all documents and data in a corpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/replace-filter-attributes",
          label: "Replace the filter attributes of a corpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/compute-corpus-size",
          label: "Compute the current size of a corpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/get-filter-attribute-stats",
          label: "Get filter attribute statistics for corpus metadata",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Documents",
      link: {
        type: "doc",
        id: "rest-api/documents",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/list-corpus-documents",
          label: "List the documents in the corpus",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/delete-corpus-document",
          label: "Delete a document",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/get-corpus-document",
          label: "Retrieve a document",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/summarize-corpus-document",
          label: "Summarize a document",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/get-image",
          label: "Retrieve an image from a document",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Chats",
      link: {
        type: "doc",
        id: "rest-api/chats",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/get-chat",
          label: "Get a chat",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/delete-chat",
          label: "Delete a chat",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/create-chat-turn",
          label: "Create a new turn in the chat",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-chat-turns",
          label: "List turns in a chat",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-chat-turn",
          label: "Get a turn",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/delete-chat-turn",
          label: "Delete a turn",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/update-chat-turn",
          label: "Update a turn",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Generation Presets",
      link: {
        type: "doc",
        id: "rest-api/generation-presets",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/list-generation-presets",
          label: "List generation presets",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Query History",
      link: {
        type: "doc",
        id: "rest-api/query-history",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/get-query-history",
          label: "Get a query history",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-query-histories",
          label: "List the history of previous queries",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Authentication",
      link: {
        type: "doc",
        id: "rest-api/authentication",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/get-o-auth-token",
          label: "Request an access token",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "API Keys",
      link: {
        type: "doc",
        id: "rest-api/api-keys",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-api-key",
          label: "Create an API key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-api-keys",
          label: "List API keys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-api-key",
          label: "Get an API key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-api-key",
          label: "Update an API key",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/delete-api-key",
          label: "Delete an API key",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Application Clients",
      link: {
        type: "doc",
        id: "rest-api/application-clients",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-app-client",
          label: "Create an App Client",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-app-client",
          label: "List App Clients",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-app-client",
          label: "Get an App Client",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-app-client",
          label: "Update an App Client",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/delete-app-client",
          label: "Delete an App Client",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Large Language Models",
      link: {
        type: "doc",
        id: "rest-api/large-language-models",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-llm",
          label: "Create an LLM",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-ll-ms",
          label: "List LLMs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-llm",
          label: "Get an LLM",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/delete-llm",
          label: "Delete an LLM",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Encoders",
      link: {
        type: "doc",
        id: "rest-api/encoders",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-encoder",
          label: "Create an encoder",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-encoders",
          label: "List encoders",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Rerankers",
      link: {
        type: "doc",
        id: "rest-api/rerankers",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/list-rerankers",
          label: "List rerankers",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Jobs",
      link: {
        type: "doc",
        id: "rest-api/jobs",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/list-jobs",
          label: "List jobs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-job",
          label: "Get a job by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      link: {
        type: "doc",
        id: "rest-api/users",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-user",
          label: "Create a user in the current customer account.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "rest-api/list-users",
          label: "List users in the account",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/get-user",
          label: "Get a user",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/update-user",
          label: "Update a user",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "rest-api/delete-user",
          label: "Delete a user",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/reset-user-password",
          label: "Reset the password for a user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Table Extractors",
      link: {
        type: "doc",
        id: "rest-api/table-extractors",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/list-table-extractors",
          label: "List supported table extractors",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Hallucination Correctors",
      link: {
        type: "doc",
        id: "rest-api/hallucination-correctors",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/list-hallucination-correctors",
          label: "List hallucination correctors",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/correct-hallucinations",
          label: "Corrects hallucinations in generated text based on source documents",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "LLM Chat Completions",
      link: {
        type: "doc",
        id: "rest-api/llm-chat-completions",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/create-chat-completion",
          label: "Creates a model response for the given chat conversation",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Factual Consistency Evaluation",
      link: {
        type: "doc",
        id: "rest-api/factual-consistency-evaluation",
      },
      items: [
        {
          type: "doc",
          id: "rest-api/evaluate-factual-consistency",
          label: "Evaluate factual consistency",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
