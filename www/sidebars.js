module.exports = {
  someSidebar: [
    {
      type: 'doc',
      id: 'introduction'
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Common API Paradigms',
          items: [
            'api-reference/protobuf-definitions',
            'api-reference/rest',
            'common-use-cases/keeping-your-data-private/tls'
          ]
        },
        {
          type: 'category',
          label: 'Code Samples',
          items: [
            'getting-started-samples/RestApiKeyQueries.cs',
            'getting-started-samples/RestApiKeyQueries.java',
            'getting-started-samples/queryDataApiKey.php',
            'getting-started-samples/rest_api_key_queries.py',
            'getting-started-samples/app.js',
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'Common Use Cases and Flows',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Keeping Your Data Private',
          items: [
            'common-use-cases/keeping-your-data-private/privacy-overview',
            'common-use-cases/keeping-your-data-private/textless',
            'common-use-cases/keeping-your-data-private/encryption',
          ]
        },
        {
          type: 'category',
          label: 'Authentication and Authorization',
          items: [
            'common-use-cases/app-authn-authz/api-keys',
            'common-use-cases/app-authn-authz/authorization',
            'common-use-cases/app-authn-authz/authentication',
          ]
        },
        {
          type: 'category',
          label: 'Filtering Search by Metadata',
          items: [
            'common-use-cases/filtering-by-metadata/filter-overview',
            'common-use-cases/filtering-by-metadata/ootb-filters',
          ]
        },
        'api-reference/search-apis/lexical-matching',
        'api-reference/search-apis/batched-queries',
      ]
    },
    {
      type: 'category',
      label: 'API and Configuration Reference',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Authentication and Authorization',
          items: [
            {
              type: 'category',
              label: 'Authentication',
              items: [
                {
                  type: 'category',
                  label: 'OAuth 2.0',
                  items: [
                    'common-use-cases/app-authn-authz/authentication',
                    {
                      type: 'category',
                      label: 'Client Credentials Grant Examples',
                      items: [
                        'getting-started-samples/JWTFetcher.cs',
                        'getting-started-samples/JwtFetcher.java',
                        'getting-started-samples/getJwtToken.php',
                        'getting-started-samples/rest_util.py'
                      ]
                    }
                  ]
                },
                {
                  type: 'category',
                  label: 'API Keys',
                  items: [
                    'common-use-cases/app-authn-authz/api-keys',
                    {
                      type: 'category',
                      label: 'REST Examples',
                      items: [
                        'getting-started-samples/RestApiKeyQueries.cs',
                        'getting-started-samples/RestApiKeyQueries.java',
                        'getting-started-samples/queryDataApiKey.php',
                        'getting-started-samples/rest_api_key_queries.py',
                        'getting-started-samples/app.js',
                      ]
                    }
                  ]
                }
              ]
            }
          ],
        },
        {
            type: 'category',
            label: 'Indexing APIs',
            items: [
              {
                type: 'category',
                label: 'Standard Indexing API',
                items: [
                  'api-reference/indexing-apis/indexing',
                  {
                    type: 'category',
                    label: 'REST Examples',
                    items: [
                      'getting-started-samples/RestIndexData.cs',
                      'getting-started-samples/RestIndex.java',
                      'getting-started-samples/index_document.js',
                      'getting-started-samples/indexDocument.php',
                      'getting-started-samples/rest_index_document.py',
                    ]
                  },
                ]
              },
              {
                type: 'category',
                label: 'Low-level API',
                items: [
                  'api-reference/indexing-apis/core_indexing'
                ]
              },
              {
                type: 'category',
                label: 'File Upload API',
                items: [
                  'api-reference/indexing-apis/file-upload/file-upload',
                  'api-reference/indexing-apis/file-upload/format-for-upload',
                  'api-reference/indexing-apis/file-upload/file-upload-filetypes',
                  {
                    type: 'category',
                    label: 'REST Examples',
                    items: [
                      'getting-started-samples/RestUploadFile.java',
                      'getting-started-samples/upload_file.js',
                      'getting-started-samples/uploadFile.php',
                      'getting-started-samples/rest_upload_file.py',
                    ]
                  },
                ]
              },
              {
                type: 'category',
                label: 'Document Deletion API',
                items: [
                  'api-reference/indexing-apis/deleting-documents',
                  {
                    type: 'category',
                    label: 'REST Examples',
                    items: [
                      'getting-started-samples/RestDeleteDocument.cs',
                      'getting-started-samples/RestDeleteDocument.java',
                      'getting-started-samples/delete_document.js',
                      'getting-started-samples/deleteDocument.php',
                      'getting-started-samples/rest_delete_document.py',
                    ]
                  },
                ]
              },
            ],
        },
        {
            type: 'category',
            label: 'Search APIs',
            items: [
              {
                type: 'category',
                label: 'Standard Search API',
                items: [
                  'api-reference/search-apis/search',
                  {
                    type: 'category',
                    label: 'REST Examples',
                    items: [
                      'getting-started-samples/RestQueryData.cs',
                      'getting-started-samples/RestQuery.java',
                      'getting-started-samples/query.js',
                      'getting-started-samples/queryData.php',
                      'getting-started-samples/rest_query.py',
                    ]
                  },
                ]
              },
              'api-reference/search-apis/reranking',
              'api-reference/search-apis/lexical-matching',
              {
                  type: 'category',
                  label: 'Filter Expressions',
                  items: [
                    'common-use-cases/filtering-by-metadata/filter-overview',
                    'api-reference/search-apis/sql/func-opr',
                    'api-reference/search-apis/sql/data-types',
                    'common-use-cases/filtering-by-metadata/ootb-filters',
                  ],
              },
              'api-reference/search-apis/batched-queries',
              {
                type: 'category',
                label: 'Interpreting Responses',
                items: [
                  'api-reference/search-apis/interpreting-responses/metadata',
                  'api-reference/search-apis/interpreting-responses/intepreting-scores',
                  'api-reference/search-apis/interpreting-responses/highlighting',
                ],
            },
            ],
        },
        {
          type: 'category',
          label: 'Admin APIs',
          items: [
            'api-reference/admin-apis/admin',
            {
              type: 'category',
              label: 'Create Corpus',
              items: [
                'api-reference/admin-apis/create-corpus',
                {
                  type: 'category',
                  label: 'REST Examples',
                  items: [
                    'getting-started-samples/RestCreateCorpus.java',
                    'getting-started-samples/create_corpus.js',
                    'getting-started-samples/createCorpus.php',
                    'getting-started-samples/rest_create_corpus.py'
                  ]
                }
              ]
            },
            {
              type: 'category',
              label: 'Delete Corpus',
              items: [
                'api-reference/admin-apis/delete-corpus',
                {
                  type: 'category',
                  label: 'REST Examples',
                  items: [
                    'getting-started-samples/RestDeleteCorpus.cs',
                    'getting-started-samples/delete_corpus.js',
                    'getting-started-samples/deleteCorpus.php',
                    'getting-started-samples/rest_delete_corpus.py'
                  ]
                }
              ]
            },
            {
              type: 'category',
              label: 'Reset Corpus',
              items: [
                'api-reference/admin-apis/reset-corpus',
                {
                  type: 'category',
                  label: 'REST Examples',
                  items: [
                    'getting-started-samples/RestResetCorpus.cs',
                    'getting-started-samples/reset_corpus.js',
                    'getting-started-samples/resetCorpus.php',
                    'getting-started-samples/rest_reset_corpus.py'
                  ]
                }
              ]
            },
          ],
        },
        'common-use-cases/semantic-search/custom-dimensions',
      ],
    },
    {
      type: 'category',
      label: 'Administrative User Interface',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Corpora CRUD Operations',
          items: [
            'console-ui/creating-a-corpus',
            'console-ui/reset-or-delete-corpus'
          ]
        },
        {
          type: 'category',
          label: 'Users and Authorization Controls',
          items: [
            'console-ui/configure-server-access-to-corpus',
            'console-ui/corpus-default-read-access',
            'console-ui/manage-user',
            'common-use-cases/app-authn-authz/authorization',
          ]
        },
        'console-ui/update-credit-card'
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
	  }
  ],
};
