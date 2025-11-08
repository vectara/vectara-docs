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
      collapsed: false,
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
      className: "sidebar-divider",
      collapsed: true,
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
      className: "sidebar-divider",
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
      label: "Agents",
      link: {
        type: 'doc',
        id: 'build/agent-os/agent-platform-overview',
      },
      className: "sidebar-divider",
      collapsed: true,
      items: [
        "build/agent-os/agents-quickstart",
        "build/agent-os/instructions",
        {
          type: "category",
          label: "Agent Tools",
          link: {
            type: 'doc',
            id: 'build/agent-os/agent-tools',
          },
          collapsed: true,
          items: [
            "build/agent-os/lambda-tools",
            // "build/agent-os/subagent-tool",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Hallucination and Evaluation",
      className: "sidebar-divider",
      collapsed: true,
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
      className: "sidebar-divider",
      collapsed: true,
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
      className: "sidebar-divider",
      collapsed: true,
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
      className: "sidebar-divider",
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
      ],
    },
    {
      type: "category",
      label: "Private deployment",
      link: {
        type: "doc",
        id: "deployments",
      },
      className: "sidebar-divider",
      collapsed: true,
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
