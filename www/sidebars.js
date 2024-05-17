module.exports = {
  someSidebar: [
    {
      type: "doc",
      id: "introduction",
      label: "The Vectara Platform",
    },
    /* "migration-guide-api-v2", */
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
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
      ],
    },
    {
      type: "category",
      label: "Capabilities",
      collapsed: true,
      items: [
        "learn/select-ideal-indexing-api",
        {
          type: "category",
          label: "Retrieval",
          items: [
            "learn/hybrid-search",
            "learn/enable-keyword-text-matching",
            "learn/semantic-search/add-custom-dimensions",
            "api-reference/search-apis/reranking",
            "learn/semantic-search/enable-pagination",
            "learn/recommendation-systems/recommender-overview",
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
            "learn/data-privacy/textless",
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
              ]
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
      label: "API Reference",
      collapsed: true,
      items: [
        "api-reference/api-overview",
        "api-reference/protobuf-definitions",
        "api-reference/rest",
        {
          type: "category",
          label: "Account Admin APIs",
          items: [
            "api-reference/admin-apis/compute-account-size"
          ]
        },
        {
          type: "category",
          label: "Authentication Admin APIs",
          items: [
            {
              type: "category",
              label: "User Admin APIs",
              items: [
                "api-reference/admin-apis/manage-users/list-users",
                "api-reference/admin-apis/manage-users/manage-user",
              ]
            },
            {
              type: "category",
              label: "API Key Admin APIs",
              items: [
                "api-reference/api-keys/create-api-key",
                "api-reference/api-keys/delete-api-key",
                "api-reference/api-keys/list-api-keys",
                "api-reference/api-keys/enable-api-key",
              ]
            },
          ]
        },
        {
          type: "category",
          label: "Corpus Admin APIs",
          items: [
            "api-reference/admin-apis/admin",
            {
              type: "category",
              label: "Create Corpus",
              items: [
                "api-reference/admin-apis/create-corpus",
                {
                  type: "category",
                  label: "Create Corpus REST Examples",
                  items: [
                    "getting-started-samples/RestCreateCorpus.java",
                    "getting-started-samples/create_corpus.js",
                    "getting-started-samples/createCorpus.php",
                    "getting-started-samples/rest_create_corpus.py"
                  ]
                }
              ]
            },
            {
              type: "category",
              label: "Delete Corpus",
              items: [
                "api-reference/admin-apis/delete-corpus",
                {
                  type: "category",
                  label: "Delete Corpus REST Examples",
                  items: [
                    "getting-started-samples/RestDeleteCorpus.cs",
                    "getting-started-samples/delete_corpus.js",
                    "getting-started-samples/deleteCorpus.php",
                    "getting-started-samples/rest_delete_corpus.py"
                  ]
                }
              ]
            },
            {
              type: "category",
              label: "Reset Corpus",
              items: [
                "api-reference/admin-apis/reset-corpus",
                {
                  type: "category",
                  label: "Reset Corpus REST Examples",
                  items: [
                    "getting-started-samples/RestResetCorpus.cs",
                    "getting-started-samples/reset_corpus.js",
                    "getting-started-samples/resetCorpus.php",
                    "getting-started-samples/rest_reset_corpus.py"
                  ]
                }
              ]
            },
            "api-reference/admin-apis/corpus/update-corpus-enablement",
            "api-reference/admin-apis/corpus/read-corpus",
            "api-reference/admin-apis/corpus/compute-corpus-size",
          ]
        },
        {
          type: "category",
          label: "Document Admin APIs",
          items: [
            "api-reference/admin-apis/corpus/list-documents",
            "api-reference/indexing-apis/deleting-documents",
            {
              type: "category",
              label: "Delete Document REST Examples",
              items: [
                "getting-started-samples/RestDeleteDocument.cs",
                "getting-started-samples/RestDeleteDocument.java",
                "getting-started-samples/delete_document.js",
                "getting-started-samples/deleteDocument.php",
                "getting-started-samples/rest_delete_document.py",
              ]
            },
          ]
        },
        {
            type: "category",
            label: "Indexing APIs",
            items: [
              {
                type: "category",
                label: "Standard Indexing API",
                items: [
                  "api-reference/indexing-apis/indexing",
                  {
                    type: "category",
                    label: "Standard Indexing REST Examples",
                    items: [
                      "getting-started-samples/RestIndexData.cs",
                      "getting-started-samples/RestIndex.java",
                      "getting-started-samples/index_document.js",
                      "getting-started-samples/indexDocument.php",
                      "getting-started-samples/rest_index_document.py",
                    ]
                  },
                ]
              },
              {
                type: "category",
                label: "Low-level API",
                items: [
                  "api-reference/indexing-apis/core_indexing"
                ]
              },
              {
                type: "category",
                label: "File Upload API",
                items: [
                  "api-reference/indexing-apis/file-upload/file-upload",
                  "api-reference/indexing-apis/file-upload/format-for-upload",
                  "api-reference/indexing-apis/file-upload/file-upload-filetypes",
                  {
                    type: "category",
                    label: "File Upload REST Examples",
                    items: [
                      "getting-started-samples/RestUploadFile.java",
                      "getting-started-samples/upload_file.js",
                      "getting-started-samples/uploadFile.php",
                      "getting-started-samples/rest_upload_file.py",
                    ]
                  },
                ]
              },
            ],
        },
        {
            type: "category",
            label: "Query APIs",
            items: [
              {
                type: "category",
                label: "Standard Query API",
                items: [
                  "api-reference/search-apis/search",
                  {
                    type: "category",
                    label: "Standard Query REST Examples",
                    items: [
                      "getting-started-samples/RestQueryData.cs",
                      "getting-started-samples/RestQuery.java",
                      "getting-started-samples/query.js",
                      "getting-started-samples/queryData.php",
                      "getting-started-samples/rest_query.py",
                    ]
                  },
                ]
              },
              /* "api-reference/search-apis/stream-query", */
              "api-reference/search-apis/reranking",
              "api-reference/search-apis/batched-queries",
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
          label: "Chat APIs",
          items: [
            "api-reference/chat-apis/chat-apis-overview",
            "api-reference/chat-apis/list-conversations",
            "api-reference/chat-apis/read-conversations",
            "api-reference/chat-apis/delete-conversations",
            "api-reference/chat-apis/delete-turns",
            "api-reference/chat-apis/disable-turns",
          ],
        },
      ],
    },
  ],
  restOAS: [
    {
      type: "category",
      label: "API Playground",
      link: {
        type: "generated-index",
        title: "Vectara API",
        description: "Play around with Vectara's REST APIs",
        slug: "/rest-api",
      },
      items: require("./docs/rest-api/sidebar.js"),
    },
  ],
};
