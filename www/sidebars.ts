import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiSidebar from "./docs/rest-api/sidebar"; // TS import, .ts extension optional

const sidebars: SidebarsConfig = {
  someSidebar: [
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: 'doc',
        id: 'getting-started',
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "vectara-trial",
          label: "Vectara Trial",
        },
        {
          type: "category",
          label: "Quick Starts",
          link: {
            type: 'doc',
            id: 'quick-starts',
          },
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "quickstart",
              label: "Console",
            },
            {
              type: "doc",
              id: "api-recipes",
              label: "REST APIs",
            },
            {
              type: "doc",
              id: "build/agent-os/agents-quickstart",
              label: "Agents",
            },
          ],
        },
        {
          type: "doc",
          id: "sample-vectara-apps",
          label: "Sample Demos and Applications",
        },
        {
          type: "doc",
          id: "video-tutorials",
          label: "Video Tutorials",
        },
      ],
    },

    {
      type: "category",
      label: "Build",
      link: {
        type: 'generated-index',
        title: "Build with Vectara",
        description: "Learn how to build AI applications with Vectara's data management, search, and agent capabilities",
        slug: "/build",
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Data preparation",
          link: {
            type: 'doc',
            id: 'data-management',
          },
          collapsed: true,
          items: [
            "learn/structure-your-data",
            "learn/select-ideal-indexing-api",
            "data-management/supported-file-formats",
            "data-management/data-egress",
            {
              type: "category",
              label: "Metadata filters",
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
                "search-and-retrieval/fuzzy-metadata-search",
              ],
            },
            "learn/semantic-search/add-custom-dimensions",
          ],
        },

        {
          type: "category",
          label: "Search and retrieval",
          link: {
            type: 'doc',
            id: 'search-and-retrieval',
          },
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Search methods",
              link: {
                type: 'doc',
                id: 'search-and-retrieval/search-methods',
              },
              collapsed: true,
              items: [
                "learn/hybrid-search",
                "learn/enable-keyword-text-matching",
              ],
            },
            {
              type: "category",
              label: "Improve search quality",
              link: {
                type: 'doc',
                id: 'search-and-retrieval/improving-search-quality',
              },
              collapsed: true,
              items: [
                "search-and-retrieval/intelligent-query-rewriting",
                {
                  type: "category",
                  label: "Reranking",
                  link: {
                    type: 'doc',
                    id: 'search-and-retrieval/reranking',
                  },
                  items: [
                    "search-and-retrieval/rerankers/vectara-multi-lingual-reranker",
                    "search-and-retrieval/rerankers/mmr-reranker",
                    "search-and-retrieval/rerankers/user-defined-function-reranker",
                    "search-and-retrieval/rerankers/chain-reranker",
                    "search-and-retrieval/rerankers/knee-reranking",
                  ],
                },
                "search-and-retrieval/bring-your-own-llm",
              ],
            },
            {
              type: "category",
              label: "Working with results",
              link: {
                type: 'doc',
                id: 'search-and-retrieval/working-with-results',
              },
              collapsed: true,
              items: [
                "search-and-retrieval/citations",
                "learn/semantic-search/enable-pagination",
                "search-and-retrieval/working-with-results/metadata",
                "search-and-retrieval/working-with-results/interpreting-scores",
                "search-and-retrieval/working-with-results/highlighting",
                "learn/querying-table-data",
                "learn/recommendation-systems/recommender-overview",
                "build-apps/vectara-answer",
              ],
            },
            {
              type: "category",
              label: "Generation",
              link: {
                type: 'doc',
                id: 'generation',
              },
              collapsed: true,
              items: [
                {
                  type: "category",
                  label: "Understanding Generation",
                  collapsed: true,
                  items: [
                    "learn/grounded-generation/grounded-generation-overview",
                    "learn/question-answer/question-answer-overview",
                    {
                      type: "doc",
                      id: "learn/grounded-generation/configure-query-summarization",
                      label: "Configure Query Summarization",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "Model Configuration",
                  collapsed: true,
                  items: [
                    "learn/grounded-generation/model-selection",
                    "learn/mockingbird-llm",
                    "learn/grounded-generation/select-a-summarizer",
                    "learn/grounded-generation/grounded-generation-response-languages",
                  ],
                },
                {
                  type: "category",
                  label: "Generative Prompts",
                  collapsed: true,
                  link: {
                    type: 'doc',
                    id: 'generative-prompts',
                  },
                  items: [
                    "prompts/vectara-prompt-engine",
                    "prompts/custom-prompts-with-metadata",
                    "generation/custom-prompt-templates-customization",
                  ],
                },
              ],
            },
          ],
        },

        {
          type: "category",
          label: "Agent Operating System",
          link: {
            type: 'doc',
            id: 'build/agent-os/agent-platform-overview',
          },
          collapsed: true,
          items: [
            "build/agent-os/instructions",
            "build/agent-os/tools",
            "build/agent-os/agents",
            "build/agent-os/sessions",
            "build/agent-os/mcp",
          ],
        },

        {
          type: "category",
          label: "Tutorials",
          link: {
            type: 'generated-index',
            title: "Tutorials",
            description: "Tutorials to help you build with Vectara",
            slug: "/tutorials",
          },
          collapsed: true,
          items: [
                "tutorials/use-openai-libraries-with-vectara",
                "tutorials/use-external-applications-sdk",
          ],
        },
        {
          type: "category",
          label: "Integrations",
          link: {
            type: 'doc',
            id: 'integrations/community-collaborations-and-partnerships',
          },
          collapsed: true,
          items: [
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
              items: [
                "integrations/vectara-and-flowise",
                "integrations/vectara-and-langflow",
              ],
            },
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
          ],
        },
      ],
    },

    {
      type: "category",
      label: "Manage",
      link: {
        type: 'generated-index',
        title: "Manage Vectara",
        description: "Manage your Vectara resources through the Console and monitor application performance",
        slug: "/manage",
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          id: 'console-ui/vectara-console-overview',
          label: "Vectara Console",
        },
        {
          type: "category",
          label: "Manage Agents",
          link: {
            type: 'doc',
            id: "console-ui/manage-agents",
          },
          items: [
            "console-ui/agents/create-an-agent",
            "console-ui/agents/use-agents",
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

        {
          type: "doc",
          id: "console-ui/admin-center",
          label: "Vectara Admin Center",
        },

        {
          type: "category",
          label: "Observability and Evaluation",
          link: {
            type: 'doc',
            id: 'observability',
          },
          collapsed: true,
          items: [
            "learn/query-observability",
            "learn/hallucination-evaluation",
            "learn/vectara-hallucination-corrector",
            "build-apps/open-eval-framework",
          ],
        },
      ],
    },

    {
      type: "category",
      label: "Deploy and Scale",
      link: {
        type: 'generated-index',
        title: "Deploy and Scale",
        description: "Deploy Vectara securely and scale your applications with enterprise features",
        slug: "/deploy-and-scale",
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Platform overview",
          link: {
            type: 'doc',
            id: 'introduction',
          },
          collapsed: true,
          items: [],
        },

        {
          type: "category",
          label: "Security and data privacy",
          link: {
            type: 'doc',
            id: 'learn/data-privacy/privacy-overview',
          },
          collapsed: true,
          items: [
            "learn/data-privacy/encryption",
            "deploy-and-scale/authentication/transport-layer-security",
          ],
        },
        {
          type: "category",
          label: "Authentication and authorization",
          link: {
            type: 'doc',
            id: 'deploy-and-scale/authentication/authentication-authorization-vectara',
          },
          collapsed: true,
          items: [
            "deploy-and-scale/authentication/personas-and-access-patterns",
            "deploy-and-scale/authentication/auth-overview",
            "deploy-and-scale/authentication/choose-auth-method",
            "deploy-and-scale/authentication/api-key-management",
            "deploy-and-scale/authentication/oauth-2",
            "deploy-and-scale/authentication/role-based-access-control",
            "deploy-and-scale/authentication/attribute-based-access-control",
            "deploy-and-scale/authentication/multi-tenant-corpus-isolation",
            "deploy-and-scale/authentication/combine-access-control-with-app-filters",
            {
              type: "category",
              label: "API Authentication Examples",
              collapsed: true,
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
          label: "Private Deployment",
          link: {
            type: "doc",
            id: "deployments",
          },
          collapsed: true,
          items: [
            "deployments/private-deployment-overview",
            "deployments/deployment-options",
            "deployments/use-cases",
            "deployments/onprem-evaluation-process",
            {
              type: "category",
              label: "Guides",
              link: {
                type: "doc",
                id: "deployments/guides",
              },
              items: [
                "deployments/guides/vectara-okta-oidc",
              ]
            }
          ],
        },
      ],
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
          label: "Data Ingestion",
          items: [
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
                "api-reference/indexing-apis/deleting-documents",
              ],
            },
            {
              type: "category",
              label: "Table Extractors APIs",
              items: ["api-reference/table-extractors/list-table-extractors"],
            },
          ],
        },
        {
          type: "category",
          label: "Querying and Retrieval",
          items: [
            {
              type: "category",
              label: "Query APIs",
              items: [
                "api-reference/search-apis/search",
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
              label: "LLM Chat Completions APIs",
              items: ["api-reference/llm-chat-completions/chat-completions"],
            },
          ],
        },
        {
          type: "category",
          label: "Agent Operation System",
          items: [
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
                  label: 'Agent Management',
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
                    "api-reference/agent-apis/replace-agent",
                    "api-reference/agent-apis/delete-agent"
                  ]
                },
                {
                  type: 'category',
                  label: 'Tool Server Management',
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
                  label: 'Tool Management',
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
                    // "api-reference/agent-apis/tool/create-a-lambda-tool",
                  ]
                },
                {
                  type: 'category',
                  label: 'Tool Configuration Management',
                  link: {
                    type: 'doc',
                    id: 'api-reference/agent-apis/tool-configuration-management',
                  },
                  collapsed: false,
                  items: [
                    "api-reference/agent-apis/tool-configuration/create-tool-configuration",
                    "api-reference/agent-apis/tool-configuration/list-tool-configurations",
                    "api-reference/agent-apis/tool-configuration/get-tool-configuration",
                    "api-reference/agent-apis/tool-configuration/update-tool-configuration",
                    "api-reference/agent-apis/tool-configuration/delete-tool-configuration",
                    "api-reference/agent-apis/tool-configuration/delete-tool-configuration-version",
                  ]
                },
                {
                  type: 'category',
                  label: 'Instruction Management',
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
            {
              type: "category",
              label: "Agent Sessions APIs",
              items: [
                {
                  type: 'category',
                  label: 'Session Management',
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
                  label: 'Event Management',
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
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Generation and Summarization",
          items: [
            {
              type: "category",
              label: "Generation Presets APIs",
              items: ["api-reference/generation-presets/list-generation-presets"],
            },
            {
              type: "category",
              label: "Reranker APIs",
              items: ["api-reference/reranker-apis/reranker-apis"],
            },
          ],
        },
        {
          type: "category",
          label: "Corpus Management",
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
          label: "Document Management",
          items: [
            "api-reference/admin-apis/corpus/list-documents",
            "api-reference/admin-apis/corpus/retrieve-document",
            "api-reference/documents-apis/summarize-document",
          ],
        },
        {
          type: "category",
          label: "Evaluation and Observability",
          items: [
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
              label: "Factual Consistency Evaluation APIs",
              items: ["api-reference/hhem-apis/evaluate-factual-consistency"],
            },
            {
              type: "category",
              label: "Hallucination Correctors APIs",
              items: [
                "api-reference/llms-apis/hallucination_correctors",
                "api-reference/hcm-apis/list-hallucination-correctors"
              ],
            },
          ],
        },
        {
          type: "category",
          label: "User and Access Management",
          items: [
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
              label: "Jobs APIs",
              items: [
                "api-reference/jobs-apis/list-jobs",
                "api-reference/jobs-apis/get-job",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "LLM Management",
          items: [
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
              label: "Encoder APIs",
              items: ["api-reference/encoder-apis/list-encoders"],
            },
          ],
        },
        "api-reference/vectara-postman-collection",
      ],
    },
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
