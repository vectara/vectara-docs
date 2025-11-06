import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiSidebar from "./docs/rest-api/sidebar"; // TS import, .ts extension optional

const sidebars: SidebarsConfig = {
  someSidebar: [
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: 'doc',
        id: 'introduction',
      },
      collapsed: false,
      items: [
        "vectara-trial",
        "developer-quickstart",
        "build/agent-os/agents-quickstart",
        "api-recipes",
      ],
    },
    {
      type: "category",
      label: "Build",
      link: {
            type: 'doc',
            id: "build",
          },
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Data ingestion",
          link: {
            type: 'doc',
            id: 'build/data-ingestion',
          },
          collapsed: true,
          items: [
            "build/working-with-tables",
            "build/prepare-data/metadata-filters",
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
              label: "Reranking",
              link: {
                type: 'doc',
                id: 'search-and-retrieval/reranking',
              },
              collapsed: true,
              items: [
                "search-and-retrieval/rerankers/vectara-multi-lingual-reranker",
                "search-and-retrieval/rerankers/mmr-reranker",
                "search-and-retrieval/rerankers/user-defined-function-reranker",
                "search-and-retrieval/rerankers/chain-reranker",
                "search-and-retrieval/rerankers/knee-reranking",
              ],
            },
            "prompts/vectara-prompt-engine",
            "search-and-retrieval/bring-your-own-llm",
            "build-apps/vectara-answer",
          ],
        },
        {
          type: "category",
          label: "Agent operating system",
          link: {
            type: 'doc',
            id: 'build/agent-os/agent-platform-overview',
          },
          collapsed: true,
          items: [],
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
            "video-tutorials",
            "tutorials/use-openai-libraries-with-vectara",
            "tutorials/use-external-applications-sdk",
            "tutorials/faq-and-qna-matching",
            "tutorials/add-custom-dimensions",
            "tutorials/intelligent-query-rewriting",
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
            "integrations/vectara-and-langchain",
            "integrations/vectara-and-llamaindex",
            "integrations/vectara-and-flowise",
            "integrations/vectara-and-langflow",
            "integrations/vectara-and-airbyte",
            "integrations/vectara-and-confluent",
          ],
        },
      ],
    },
    {
    type: "category",
    label: "Deploy and scale",
    link: {
      type: 'generated-index',
      title: "Deploy and scale",
      description: "Deploy Vectara securely and scale your applications with enterprise features",
      slug: "/deploy-and-scale",
    },
    collapsed: true,
    items: [
      "learn/data-privacy/privacy-overview",
      {
        type: "category",
        label: "Authentication",
        link: {
          type: 'doc',
          id: 'deploy-and-scale/authentication/authentication-authorization-vectara',
        },
        collapsed: true,
        items: [
          "deploy-and-scale/authentication/auth-overview",
          "deploy-and-scale/authentication/choose-auth-method",
          "deploy-and-scale/authentication/api-key-management",
          "deploy-and-scale/authentication/oauth-2",
          {
            type: "category",
            label: "API Authentication Examples",
            collapsed: true,
            items: [
              {
                type: "category",
                label: "OAuth 2.0 Examples",
                items: [
                  "getting-started-samples/JWTFetcher.cs",
                  "getting-started-samples/JwtFetcher.java",
                  "getting-started-samples/getJwtToken.php",
                  "getting-started-samples/rest_util.py",
                ],
              },
              {
                type: "category",
                label: "API Key Examples",
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
        label: "Authorization",
        link: {
          type: 'generated-index',
          title: "Authorization",
          description: "Control access to your Vectara resources with role-based, attribute-based, and multi-tenant access control",
          slug: "/deploy-and-scale/authorization",
        },
        collapsed: true,
        items: [
          "deploy-and-scale/authentication/personas-and-access-patterns",
          "deploy-and-scale/authentication/role-based-access-control",
          "deploy-and-scale/authentication/attribute-based-access-control",
          "deploy-and-scale/authentication/multi-tenant-corpus-isolation",
          "deploy-and-scale/authentication/combine-access-control-with-app-filters",
        ],
      },
      "api-reference/api-concepts/resource-addressing",
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
          "console-ui/admin-center",
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
      {
        type: "category",
        label: "Observability and Evaluation",
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
      label: "API Concepts",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Data Ingestion",
          items: [
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
