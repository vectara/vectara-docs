module.exports = {
  someSidebar: [
    {
      type: 'doc',
      id: 'introduction'
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'category',
          label: 'Common API Paradigms',
          items: [
            'protobuf-definitions',
            'rest',
            'tls'
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
        'encryption'
      ],
    },
    {
      type: 'category',
      label: 'API and Configuration Reference',
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
                    'authentication',
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
                    'api-keys'
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
                  'indexing-apis/indexing',
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
                  'indexing-apis/core_indexing'
                ]
              },
              {
                type: 'category',
                label: 'File Upload API',
                items: [
                  'indexing-apis/file-upload',
                  'indexing-apis/format-for-upload',
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
              'indexing-apis/deleting-documents',
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
                  'search-apis/search',
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
              'search-apis/reranking',
              {
                  type: 'category',
                  label: 'Filter Expressions',
                  items: [
                    'search-apis/sql/filter-overview',
                    'search-apis/sql/func-opr',
                    'search-apis/sql/data-types',
                  ],
              },
              'search-apis/batched-queries',
              {
                type: 'category',
                label: 'Interpreting Responses',
                items: [
                  'search-apis/interpreting-responses/intepreting-scores',
                  'search-apis/interpreting-responses/highlighting',
                ],
            },
            ],
        },
        {
          type: 'category',
          label: 'Admin APIs',
          items: [
            'admin-apis/admin',
            {
              type: 'category',
              label: 'Create Corpus',
              items: [
                'admin-apis/create-corpus',
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
                'admin-apis/delete-corpus',
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
                'admin-apis/reset-corpus',
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
        'custom-dimensions',
        'textless',
      ],
    },
    {
      type: 'category',
      label: 'Administrative User Interface',
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
            'authorization'
          ]
        },
        'console-ui/update-credit-card'
      ],
    },
  ],
};
