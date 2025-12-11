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
      collapsible: false,
      items: [
        "search-and-retrieval/search-quick-start",
         "search-and-retrieval/hybrid-search",
        {
          type: "category",
          label: "Reranking",
          collapsed: true,
          items: [
            "search-and-retrieval/rerankers/limits-and-cutoffs",
            "search-and-retrieval/rerankers/vectara-multi-lingual-reranker",
            "search-and-retrieval/rerankers/mmr-reranker",
            "search-and-retrieval/rerankers/user-defined-function-reranker",
            "search-and-retrieval/rerankers/chain-reranker",
            "search-and-retrieval/rerankers/knee-reranking",
          ],
        },
        "search-and-retrieval/filters",
        "search-and-retrieval/fuzzy-metadata-search",
        "prompts/vectara-prompt-engine",
        "tutorials/intelligent-query-rewriting",
        "tutorials/add-custom-dimensions",
        "search-and-retrieval/build-search-ui",
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
        "agents/instructions",
        {
          type: "category",
          label: "Tools",
          items: [
            "agent-os/agent-tools",
            "agent-os/subagents",
            "agent-os/lambda-tools",
            "agent-os/mcp",
            // "agent-os/structured-indexing-tool",
          ],
        },
        "agents/artifacts",
        "agent-os/sessions",
        "search-and-retrieval/bring-your-own-llm",
      ],
    },
    {
      type: "category",
      label: "Hallucination and evaluation",
      collapsible: false,
      items: [
        "hallucination-and-evaluation/query-observability",
        "hallucination-and-evaluation/hallucination-evaluation",
        "hallucination-and-evaluation/vectara-hallucination-corrector",
        "hallucination-and-evaluation/open-eval-framework",
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
        "integrations/rest",
        "vectara-postman-collection",
        "tutorials/use-openai-libraries-with-vectara",
        "tutorials/use-external-applications-sdk",
        "integrations/vectara-and-langchain",
        "integrations/vectara-and-llamaindex",
        "integrations/vectara-and-flowise",
        "integrations/vectara-and-langflow",
        "integrations/vectara-and-airbyte",
        "integrations/vectara-and-confluent",
        "integrations/vectara-and-speechmatics",
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
        {
        type: "doc",
        id: "rest-api/vectara-rest-api-v-2",
        },
        "vectara-postman-collection",
        {
          type: "category",
          label: "Agents",
          collapsed: false,
          items: [
            {
              type: "category",
              label: "CRUD",
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
              label: "Agent sessions",
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
              label: "Tool servers",
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
          ],
        },
        {
          type: "category",
          label: "Data",
          collapsed: false,
          items: [
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
                  id: "rest-api/get-corpus",
                  label: "Retrieve info about a corpus",
                  className: "api-method get",
                },
              ],
            },
            {
              type: "category",
              label: "Metadata",
              items: [
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
          ],
        },
        {
          type: "category",
          label: "Search and retrieval",
          collapsed: false,
          items: [
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
              label: "Metadata query",
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
          ],
        },
        {
          type: "category",
          label: "Access control",
          collapsed: false,
          items: [
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
                  label: "Create a user in the current customer account",
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
              label: "API keys",
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
              label: "Application clients",
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
          ],
        },
        {
          type: "category",
          label: "Analytics",
          collapsed: false,
          items: [
            {
              type: "category",
              label: "Corpus statistics",
              items: [
                {
                  type: "doc",
                  id: "rest-api/compute-corpus-size",
                  label: "Compute the current size of a corpus",
                  className: "api-method post",
                },
              ],
            },
            {
              type: "category",
              label: "Query history",
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
          ],
        },
        {
          type: "category",
          label: "Platform",
          collapsed: false,
          items: [
            {
              type: "category",
              label: "Large language models",
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
              label: "Generation presets",
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
              label: "Table extractors",
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
          ],
        },
        {
          type: "category",
          label: "Quality and evaluation",
          collapsed: false,
          items: [
            {
              type: "category",
              label: "Factual consistency evaluation",
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
            {
              type: "category",
              label: "Hallucination correctors",
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
          ],
        },
        {
          type: "category",
          label: "LLM chat completions",
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
