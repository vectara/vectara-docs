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
      collapsible: false,
      items: [
        "introduction",
        "vectara-trial",
        "developer-quickstart",
        "deployments/deployment-options",
      ],
    },
    {
      type: "category",
      label: "Data ingestion",
      link: {
        type: 'doc',
        id: 'build/data-ingestion',
      },
      collapsible: false,
      items: [
        "build/working-with-tables",
        "build/prepare-data/metadata-filters",
        "build/resource-addressing",
      ],
    },
    {
      type: "category",
      label: "Search and retrieval",
      link: {
        type: 'doc',
        id: 'search-and-retrieval',
      },
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Reranking",
          collapsed: true,
          items: [
            "search-and-retrieval/rerankers/reranking-overview",
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
      label: "Agents",
      link: {
        type: 'doc',
        id: 'agent-os/agent-platform-overview',
      },
      collapsible: false,
      items: [
        "agent-os/agents-quickstart",
        "agent-os/instructions",
        "agent-os/sessions",
        {
          type: "category",
          label: "Agent tools",
          items: [
            "agent-os/agent-tools-overview",
            "agent-os/lambda-tools",
            // "agent-os/structured-indexing-tool",
            // "agent-os/subagent-tool",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Hallucination and evaluation",
      collapsible: false,
      items: [
        "learn/query-observability",
        "learn/hallucination-evaluation",
        "learn/vectara-hallucination-corrector",
        "build-apps/open-eval-framework",
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
      collapsible: false,
      items: [
        "video-tutorials",
        "tutorials/build-a-financial-research-agent",
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
      collapsible: false,
      items: [
        "tutorials/use-openai-libraries-with-vectara",
        "tutorials/use-external-applications-sdk",
        "integrations/vectara-and-langchain",
        "integrations/vectara-and-llamaindex",
        "integrations/vectara-and-flowise",
        "integrations/vectara-and-langflow",
        "integrations/vectara-and-airbyte",
        "integrations/vectara-and-confluent",
      ],
    },
    {
      type: "category",
      label: "Security",
      link: {
        type: 'doc',
        id: 'security',
      },
      collapsible: false,
      items: [
        "security/data-privacy/privacy-overview",
        {
          type: "category",
          label: "Authentication methods",
          items: [
            "security/authentication/authentication-overview",
            "security/authentication/auth-overview",
            "security/authentication/choose-auth-method",
            "security/authentication/api-key-management",
            "security/authentication/oauth-2",
            {
              type: "category",
              label: "API Authentication Examples",
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
          label: "Authorization levels",
          items: [
            "security/authorization/authorization-overview",
            "security/authorization/personas-and-access-patterns",
            "security/authorization/role-based-access-control",
            "security/authorization/attribute-based-access-control",
            "security/authorization/multi-tenant-corpus-isolation",
            "security/authorization/combine-access-control-with-app-filters",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Private deployment",
      link: {
        type: "doc",
        id: "deployments",
      },
      collapsible: false,
      items: [
        "deployments/private-deployment-overview",
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
      items: [
        "api-recipes",
        apiSidebar,
        "vectara-postman-collection",
      ],
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
