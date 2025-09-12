import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiSidebar from "./docs/rest-api/sidebar"; // TS import, .ts extension optional

const sidebars: SidebarsConfig = {
  someSidebar: [
    {
      type: "doc",
      id: "introduction",
      label: "The Vectara Platform",
    },
    {
      type: "category",
      label: "Security and Data Privacy",
      collapsed: true,
      items: [
        "learn/data-privacy/privacy-overview",
        "learn/data-privacy/encryption",
        "learn/authentication/transport-layer-security",
      ],
    },
    {
      type: "category",
      label: "Authentication and Authorization",
      link: {
        type: 'doc',
        id: 'learn/authentication/authentication-authorization-vectara', 
        },
        collapsed: true,
        items: [
          "learn/authentication/personas-and-access-patterns",
          "learn/authentication/auth-overview",
          "learn/authentication/choose-auth-method",
          "learn/authentication/api-key-management",
          "learn/authentication/oauth-2",
          "learn/authentication/role-based-access-control",
          "learn/authentication/attribute-based-access-control",
          "learn/authentication/multi-tenant-corpus-isolation",
          "learn/authentication/combine-access-control-with-app-filters",
        {
          type: "category",
          label: "API Authentication Examples",
          items: [
            {
              type: "category",
              label: "OAuth 2.0 Client Credentials Grant Examples",
              items: [
                "getting-started-samples/JWTFetcher.cs",
                "getting-started-samples/JwtFetcher.java",
                "getting-started-samples/getJwtToken.php",
                "getting-started-samples/rest_util.py",
              ],
            },
            { 
              type: "category",
              label: "API Key REST Examples",
              items: [
                "getting-started-samples/RestApiKeyQueries.cs",
                "getting-started-samples/RestApiKeyQueries.java",
                "getting-started-samples/queryDataApiKey.php",
                "getting-started-samples/rest_api_key_queries.py",
                "getting-started-samples/app.js",
              ],
            },
          ],
         },
        ],
    },
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: 'doc',
        id: 'getting-started', // This points to getting-started.mdx
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "vectara-trial",
          label: "Vectara Trial",
        },
        {
          type: "doc",
          id: "quickstart",
          label: "Quick Start",
        },
        {
          type: "doc",
          id: "api-recipes",
          label: "API Recipes",
        },
        {
          type: "doc",
          id: "sample-vectara-apps",
          label: "Sample Demos and Applications",
        },
        {
          // Nurture sequence emails link to this page. These links will break if the URL is changed.
          type: "doc",
          id: "video-tutorials",
          label: "Video Tutorials",
        },
      ],
    },
    {
      type: "category",
      label: "Data Management",
      link: {
        type: 'doc',
        id: 'data-management', // This points to data-management.mdx
      },
      items: [
        "learn/select-ideal-indexing-api",
        "api-reference/indexing-apis/file-upload/file-upload-filetypes",
        "data-management/data-egress",
        {
          type: "category",
          label: "Metadata Filters",
          link: {
            type: 'doc',
            id: 'learn/metadata-search-filtering/filter-overview', 
          },
          items: [
            "learn/metadata-search-filtering/using-metadata-filters",
            "learn/metadata-search-filtering/ootb-metadata-filters",
            "learn/metadata-search-filtering/metadata-examples-and-use-cases",
            "api-reference/search-apis/sql/func-opr",
            "api-reference/search-apis/sql/data-types",
          ],
        },
        "learn/semantic-search/add-custom-dimensions",
      ],
    },
    {
      type: "category",
      label: "Search and Retrieval",
      link: {
        type: 'doc',
        id: 'search-and-retrieval', // This points to search-and-retrieval.mdx
      },
      items: [
        "learn/boomerang",
        "search-and-retrieval/bring-your-own-llm",
        "learn/hybrid-search",
        "learn/enable-keyword-text-matching",
        "search-and-retrieval/fuzzy-metadata-search",
        "search-and-retrieval/intelligent-query-rewriting",
        "search-and-retrieval/citations",
        "learn/querying-table-data",
        "learn/semantic-search/enable-pagination",
        "learn/recommendation-systems/recommender-overview",
        {
          type: "category",
          label: "Reranking",
          link: {
            type: 'doc',
            id: 'api-reference/search-apis/reranking', 
          },
          items: [
            
            "learn/vectara-multi-lingual-reranker",
            "learn/mmr-reranker",
            "learn/user-defined-function-reranker",
            "learn/chain-reranker",
            "learn/knee-reranking",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Generation",
      link: {
        type: 'doc',
        id: 'generation', // This points to generation.mdx
      },
      items: [
        "learn/mockingbird-llm",
        "learn/grounded-generation/model-selection",
        "learn/grounded-generation/select-a-summarizer",
        {
          type: "category",
          label: "Generative Prompts",
          link: {
            type: 'doc',
            id: 'generative-prompts', 
          },
          items: [
            "prompts/vectara-prompt-engine",
            "prompts/custom-prompts-with-metadata",
          ],
        },
       "generation/custom-prompt-templates-customization", 
      ],
    },
    {
      type: "category",
      label: "Agents",
      link: {
        type: 'doc',
        id: 'agents/agent-platform-overview',
      },
      items: [
        "agents/mcp",
        "agents/agents",
        "agents/tools",
        "agents/instructions",
        "agents/sessions",
        "agents/agents-quickstart",
      ],
    },
    {
      type: "category",
      label: "Observability and Evaluation",
      link: {
        type: 'doc',
        id: 'observability', // This points to observability.mdx
      },
      items: [
        "learn/query-observability",
        "learn/hallucination-evaluation",
        "learn/vectara-hallucination-corrector",
      ],
    },
    {
      type: "category",
      label: "Use Cases and Tutorials",
      items: [
        "use-case-exploration",
        {
          type: "category",
          label: "Semantic Search",
          items: [
            "learn/semantic-search/semantic-search-overview",
            "learn/semantic-search/relevance-tuning-techniques",
          ],
        },
        {
          type: "category",
          label: "Retrieval Augmented Generation (RAG)",
          items: [
            "learn/grounded-generation/grounded-generation-overview",
            "learn/grounded-generation/configure-query-summarization",
            "learn/grounded-generation/grounded-generation-response-languages",
          ],
        },
        {
          type: "doc",
          id: "learn/document-data-structuring",
          label: "Document Data Structuring",
        },
        "learn/question-answer/question-answer-overview",
        "tutorials/build-a-chatbot",
      ],
    },
    {
      type: "category",
      label: "Build Applications",
      items: [
        "build-apps/app-building",
        "build-apps/open-eval-framework",
        "build-apps/vectara-ingest",
        "build-apps/react-search",
        "build-apps/create-ui",
        "build-apps/vectara-answer",
      ],
    },
    {
      type: "category",
      label: "Integrations",
      items: [
        "integrations/community-collaborations-and-partnerships",
        {
          type: "category",
          label: "Data Ingest",
          items: [
            "integrations/vectara-and-airbyte",
            "integrations/vectara-and-unstructured",
            "integrations/vectara-and-datavolo",
            "integrations/vectara-and-confluent",
          ],
        },
        {
          type: "category",
          label: "LLM Orchestration",
          items: [
            "integrations/vectara-and-langchain",
            "integrations/vectara-and-llamaindex",
          ],
        },
        {
          type: "category",
          label: "Low-code / No-code App Builders",
          items: 
          [
            "integrations/vectara-and-flowise",
            "integrations/vectara-and-langflow",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Vectara Console",
      link: {
        type: 'doc',
        id: 'console-ui/vectara-console-overview',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Manage Agents",
          link: {
            type: 'doc',
            id: "console-ui/manage-agents",
          },
          items: [
            "console-ui/agents/create-an-agent",
            "console-ui/agents/example-agents",
          ],
        },
        {
          type: "category",
          label: "Manage Corpora",
          collapsed: true,
          items: [
            "console-ui/creating-a-corpus",
            "console-ui/reset-or-delete-corpus",
            "console-ui/configure-server-access-to-corpus",
            "console-ui/corpus-default-read-access",
          ],
        },
        {
          type: "category",
          label: "Manage Queries",
          collapsed: true,
          items: [
            "console-ui/configure-queries",
            "console-ui/evaluate-queries",
          ],
        },
        {
          type: "doc",
          id: "console-ui/manage-documents",
          label: "Manage Documents",
        },
        {
          type: "category",
          label: "Manage Conversations",
          collapsed: true,
          items: [
            "console-ui/vectara-chat-overview",
            "console-ui/chat-with-your-data",
          ],
        },
        {
          type: "category",
          label: "Manage API Authorization",
          collapsed: true,
          items: [
            "console-ui/api-access-overview",
            "console-ui/personal-api-key",
            "console-ui/index-and-query-api-keys",
            "console-ui/app-clients",
          ],
        },
        {
          type: "doc",
          id: "console-ui/manage-user",
          label: "Manage Users",
        },
        {
          type: "doc",
          id: "console-ui/update-credit-card",
          label: "Manage Payments",
        },
        "console-ui/delete-account",
      ],
    },
    {
      type: "doc",
      id: "console-ui/admin-center",
    },
    {
      type: "category",
      label: "API Concepts",
      collapsed: true,
      items: [
        "api-reference/api-overview",
        "api-reference/api-concepts/resource-addressing",
        "api-reference/protobuf-definitions",
        "api-reference/rest",
        {
          type: "category",
          label: "Query APIs",
          items: [
            "api-reference/search-apis/search",
            {
              type: "category",
              label: "Interpreting Responses",
              items: [
                "api-reference/search-apis/interpreting-responses/metadata",
                "api-reference/search-apis/interpreting-responses/interpreting-scores",
                "api-reference/search-apis/interpreting-responses/highlighting",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Query History APIs",
          items: [
            "api-reference/query-history-apis/get-query-history",
            "api-reference/query-history-apis/get-query-histories",
          ],
        },
        {
          type: "category",
          label: "Metadata Query APIs",
          items: [
            "api-reference/search-apis/fuzzy-metadata",
          ],
        },
        {
          type: "category",
          label: "File Upload APIs",
          items: [
            "api-reference/indexing-apis/file-upload/file-upload",
          ],
        },
        {
          type: "category",
          label: "Indexing APIs",
          items: [
            "api-reference/indexing-apis/indexing",
            "api-reference/indexing-apis/update-document-metadata",
            "api-reference/indexing-apis/replace-document-metadata",
          ],
        },
        {
          type: "category",
          label: "Corpus Admin APIs",
          items: [
            "api-reference/admin-apis/admin",
            "api-reference/admin-apis/create-corpus",
            "api-reference/admin-apis/corpus/list-corpora",
            "api-reference/admin-apis/corpus/read-corpus",
            "api-reference/admin-apis/delete-corpus",
            "api-reference/admin-apis/corpus/update-corpus-enablement",
            "api-reference/admin-apis/reset-corpus",
            "api-reference/admin-apis/corpus/replace-filter-attributes",
            "api-reference/admin-apis/corpus/compute-corpus-size",
          ],
        },
        {
          type: "category",
          label: "Document Admin APIs",
          items: [
            "api-reference/admin-apis/corpus/list-documents",
            "api-reference/admin-apis/corpus/retrieve-document",
            "api-reference/indexing-apis/deleting-documents",
            "api-reference/documents-apis/summarize-document",
          ],
        },
        {
          type: "category",
          label: "Chat APIs",
          items: [
            "api-reference/chat-apis/chat-apis-overview",
            "api-reference/chat-apis/create-chat",
            "api-reference/chat-apis/list-chats",
            "api-reference/chat-apis/get-chat",
            "api-reference/chat-apis/delete-conversations",
            "api-reference/chat-apis/create-chat-turn",
            "api-reference/chat-apis/get-chat-turn",
            "api-reference/chat-apis/list-chat-turns",
            "api-reference/chat-apis/delete-turns",
            "api-reference/chat-apis/update-chat-turn",
          ],
        },
        {
          type: "category",
          label: "Generation Presets APIs",
          items: ["api-reference/generation-presets/list-generation-presets"],
        },
        {
          type: "category",
          label: "Large Language Models APIs",
          items: [
            "api-reference/llms-apis/llms-api",
            "api-reference/llms-apis/create-llm",
            "api-reference/llms-apis/delete-llm",
            "api-reference/llms-apis/get-llm",
          ],
        },
        {
          type: "category",
          label: "Hallucination Correctors APIs",
          items: [
            "api-reference/llms-apis/hallucination_correctors",
            "api-reference/hcm-apis/list-hallucination-correctors"
          ],
        },
        {
          type: "category",
          label: "Encoder APIs",
          items: ["api-reference/encoder-apis/list-encoders"],
        },
        {
          type: "category",
          label: "Reranker APIs",
          items: ["api-reference/reranker-apis/reranker-apis"],
        },
        {
          type: "category",
          label: "Jobs APIs",
          items: [
            "api-reference/jobs-apis/list-jobs",
            "api-reference/jobs-apis/get-job",
          ],
        },
        {
          type: "category",
          label: "Users APIs",
          items: [
            "api-reference/admin-apis/manage-users/create-user",
            "api-reference/admin-apis/manage-users/list-users",
            "api-reference/admin-apis/manage-users/get-user",
            "api-reference/admin-apis/manage-users/update-user",
            "api-reference/admin-apis/manage-users/delete-user",
            "api-reference/admin-apis/manage-users/reset-user-password",
          ],
        },
        {
          type: "category",
          label: "Application Clients APIs",
          items: [
            "api-reference/app-clients/create-app-client",
            "api-reference/app-clients/list-app-clients",
            "api-reference/app-clients/get-app-client",
            "api-reference/app-clients/update-app-client",
            "api-reference/app-clients/delete-app-client",
          ],
        },
        {
          type: "category",
          label: "API Key Admin APIs",
          items: [
            "api-reference/api-keys/create-api-key",
            "api-reference/api-keys/list-api-keys",
            "api-reference/api-keys/get-api-key",
            "api-reference/api-keys/enable-api-key",
            "api-reference/api-keys/delete-api-key",
          ],
        },
        {
          type: "category",
          label: "Table Extractors APIs",
          items: ["api-reference/table-extractors/list-table-extractors"],
        },
        {
          type: "category",
          label: "LLM Chat Completions APIs",
          items: ["api-reference/llm-chat-completions/chat-completions"],
        },
        {
          type: "category",
          label: "Factual Consistency Evaluation APIs",
          items: ["api-reference/hhem-apis/evaluate-factual-consistency"],
        },
        {
          type: "category",
          label: "Agents APIs",
          link: {
            type: 'doc',
            id: 'api-reference/agent-apis/agent-apis-overview',
          },
          items: [
            {
              type: 'category',
              label: 'Agent Management APIs',
              link: {
                type: 'doc',
                id: 'api-reference/agent-apis/agent-management',
              },
              collapsed: false,
              items: [
                "api-reference/agent-apis/create-agent",
                "api-reference/agent-apis/list-agents",
                "api-reference/agent-apis/get-agent",
                "api-reference/agent-apis/update-agent",
                "api-reference/agent-apis/delete-agent"
              ]
            },
            {
              type: 'category',
              label: 'Session Management APIs',
              link: {
                type: 'doc',
                id: 'api-reference/agent-apis/session-management',
              },
              collapsed: false,
              items: [
                "api-reference/agent-apis/session/create-agent-session",
                "api-reference/agent-apis/session/list-agent-sessions",
                "api-reference/agent-apis/session/get-agent-session",
                "api-reference/agent-apis/session/update-agent-session",
                "api-reference/agent-apis/session/delete-agent-session"
              ]
            },
            {
              type: 'category',
              label: 'Event Management APIs',
              link: {
                type: 'doc',
                id: 'api-reference/agent-apis/event-management',
              },
              collapsed: false,
              items: [
                "api-reference/agent-apis/event/create-agent-event",
                "api-reference/agent-apis/event/list-agent-events",
                "api-reference/agent-apis/event/get-agent-event",
              ]
            },
            {
              type: 'category',
              label: 'Tool Server Management APIs',
              link: {
                type: 'doc',
                id: 'api-reference/agent-apis/tool-server-management',
              },
              collapsed: false,
              items: [
                "api-reference/agent-apis/tool-server/create-tool-server",
                "api-reference/agent-apis/tool-server/list-tool-servers",
                "api-reference/agent-apis/tool-server/get-tool-server",
                "api-reference/agent-apis/tool-server/update-tool-server",
                "api-reference/agent-apis/tool-server/sync-tool-server",
                "api-reference/agent-apis/tool-server/delete-tool-server",
              ]
            },
            {
              type: 'category',
              label: 'Tool Management APIs',
              link: {
                type: 'doc',
                id: 'api-reference/agent-apis/tool-management',
              },
              collapsed: false,
              items: [
                "api-reference/agent-apis/tool/list-tools",
                "api-reference/agent-apis/tool/get-tool",
                "api-reference/agent-apis/tool/update-tool",
                "api-reference/agent-apis/tool/delete-tool",
              ]
            },
            {
              type: 'category',
              label: 'Instruction Management APIs',
              link: {
                type: 'doc',
                id: 'api-reference/agent-apis/instruction-management',
              },
              collapsed: false,
              items: [
                "api-reference/agent-apis/instruction/create-instruction",
                "api-reference/agent-apis/instruction/list-instructions",
                "api-reference/agent-apis/instruction/get-instruction",
                "api-reference/agent-apis/instruction/update-instruction",
                "api-reference/agent-apis/instruction/delete-instruction",
                "api-reference/agent-apis/instruction/test-instruction",
                "api-reference/agent-apis/instruction/delete-instruction-version",
              ]
            },
         ],
        },
      ],
    },
    "api-reference/vectara-postman-collection",
  ],
  restOAS: [
    {
      type: "category",
      label: "API Reference",
      link: {
        type: "generated-index",
        title: "Vectara REST API 2.0",
        description: "Play around with Vectara's REST 2.0 APIs",
        slug: "/rest-api",
      },
      items: apiSidebar,
    },
  ],
  pythonSDK: [
    {
      type: "category",
      label: "Python SDK",
      link: {
        type: 'doc',
        id: 'sdk/vectara-python-sdk',
      },
      items: [
        "sdk/python/python-quickstart",
        "sdk/python/corpus",
        "sdk/python/upload",
        "sdk/python/documents",
        "sdk/python/query",
        "sdk/python/metadata",
        "sdk/python/chats",
        "sdk/python/generation_presets",
        "sdk/python/rerankers",
        "sdk/python/users",
        "sdk/python/api_keys",
        "sdk/python/python-error-handling",
      ],
    },
  ],
  releaseNotes: [
    {
      type: "doc",
      id: "release-notes",
      label: "Release Notes",
    },
  ],
  changeLog: [
    {
      type: "doc",
      id: "changelog",
      label: "Changelog"
    },
  ]
};

export default sidebars;
