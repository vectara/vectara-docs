module.exports = {
  someSidebar: [
        {
      type: "doc",
      id: "introduction",
      label: "The Vectara Platform",
    },
    "migration-guide-api-v2",
    {
      type: "category",
      label: "Getting Started",
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
      label: "Capabilities",
      collapsed: true,
      items: [
        "learn/select-ideal-indexing-api",
        "learn/mockingbird-llm",
        {
          type: "category",
          label: "Retrieval",
          items: [
            "learn/hybrid-search",
            "learn/enable-keyword-text-matching",
            "learn/semantic-search/add-custom-dimensions",
            "learn/semantic-search/enable-pagination",
            "learn/recommendation-systems/recommender-overview",
          ],
        },
        {
          type: "category",
          label: "Reranking",
          items: [
            "api-reference/search-apis/reranking",
            "learn/vectara-multi-lingual-reranker",
            "learn/mmr-reranker",
            "learn/user-defined-function-reranker",
            "learn/chain-reranker",
          ],
        },
        {
          type: "category",
          label: "Metadata Search Filtering",
          items: [
            "learn/metadata-search-filtering/filter-overview",
            "learn/metadata-search-filtering/ootb-metadata-filters",
            "api-reference/search-apis/sql/func-opr",
            "api-reference/search-apis/sql/data-types",
          ],
        },
        "learn/grounded-generation/select-a-summarizer",
        "learn/hallucination-evaluation",
        {
          type: "category",
          label: "Generative Prompts",
          items: [
            "prompts/vectara-prompt-engine",
            "prompts/custom-prompts-with-metadata",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Use Cases",
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
      ],
    },
    {
      type: "category",
      label: "Security and Data Privacy",
      collapsed: true,
      items: [
        "learn/data-privacy/privacy-overview",
        "learn/data-privacy/encryption",
        {
          type: "category",
          label: "Authentication and Authorization",
          collapsed: true,
          items: [
            "learn/authentication/auth-overview",
            "learn/authentication/api-key-management",
            "learn/authentication/oauth-2",
            "learn/authentication/role-based-access-control",
          ],
        },
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
      label: "Build Applications",
      items: [
        "build-apps/app-building",
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
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "console-ui/vectara-console-overview",
          label: "Vectara Console Overview",
        },
        {
          type: "category",
          label: "Manage Corpora",
          collapsed: true,
          items: [
            "console-ui/creating-a-corpus",
            /* "console-ui/corpus-query-configuration", */
            "console-ui/reset-or-delete-corpus",
            "console-ui/configure-server-access-to-corpus",
            "console-ui/corpus-default-read-access",
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
      ],
    },
    {
      type: "category",
      label: "API Concepts",
      collapsed: true,
      items: [
        "api-reference/api-overview",
        "api-reference/protobuf-definitions",
        "api-reference/rest",
        {
          type: "category",
          label: "Query APIs",
          items: [
            "api-reference/search-apis/search",
            /* "api-reference/search-apis/stream-query", */
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
          label: "File Upload APIs",
          items: [
            "api-reference/indexing-apis/file-upload/file-upload",
            "api-reference/indexing-apis/file-upload/format-for-upload",
            "api-reference/indexing-apis/file-upload/file-upload-filetypes",
          ],
        },
        {
          type: "category",
          label: "Indexing APIs",
          items: ["api-reference/indexing-apis/indexing"],
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
            "api-reference/indexing-apis/deleting-documents",
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
          label: "Large Language Models APIs",
          items: ["api-reference/llms-apis/llms-api"],
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
          label: "Generation Presets APIs",
          items: ["api-reference/generation-presets/list-generation-presets"],
        },
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
      items: require("./docs/rest-api/sidebar.js"),
    },
  ],
  releaseNotes: [
    {
      type: "doc",
      id: "release-notes",
      label: "Release Notes"
    },
  ]
};
