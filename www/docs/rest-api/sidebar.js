module.exports = [
  { type: "doc", id: "rest-api/vectara-rest-api-v-2" },
  {
    type: "category",
    label: "Queries",
    link: { type: "doc", id: "rest-api/queries" },
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
    label: "Upload",
    link: { type: "doc", id: "rest-api/upload" },
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
    link: { type: "doc", id: "rest-api/index" },
    items: [
      {
        type: "doc",
        id: "rest-api/create-corpus-document",
        label: "Add a document to a corpus",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Corpora",
    link: { type: "doc", id: "rest-api/corpora" },
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
        id: "rest-api/get-corpus",
        label: "Retrieve metadata about a corpus",
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
    ],
  },
  {
    type: "category",
    label: "Documents",
    link: { type: "doc", id: "rest-api/documents" },
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
    ],
  },
  {
    type: "category",
    label: "Chats",
    link: { type: "doc", id: "rest-api/chats" },
    items: [
      {
        type: "doc",
        id: "rest-api/create-chat",
        label: "Start a chat",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "rest-api/list-chats",
        label: "List chats",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "rest-api/get-chat",
        label: "Get a chat",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "rest-api/delete-chat",
        label: "Delete a chat",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "rest-api/create-chat-turn",
        label: "Create a new turn in the chat",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "rest-api/list-chat-turns",
        label: "List turns in a chat",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "rest-api/get-chat-turn",
        label: "Get a turn",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "rest-api/delete-chat-turn",
        label: "Delete a turn",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "rest-api/update-chat-turn",
        label: "Update a turn",
        className: "api-method patch",
      },
    ],
  },
  {
    type: "category",
    label: "Large Language Models",
    link: { type: "doc", id: "rest-api/large-language-models" },
    items: [
      {
        type: "doc",
        id: "rest-api/list-ll-ms",
        label: "List LLMs",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Encoders",
    link: { type: "doc", id: "rest-api/encoders" },
    items: [
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
    label: "Rerankers",
    link: { type: "doc", id: "rest-api/rerankers" },
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
    label: "Jobs",
    link: { type: "doc", id: "rest-api/jobs" },
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
  {
    type: "category",
    label: "Users",
    link: { type: "doc", id: "rest-api/users" },
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
    label: "Application Clients",
    link: { type: "doc", id: "rest-api/application-clients" },
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
  {
    type: "category",
    label: "API Keys",
    link: { type: "doc", id: "rest-api/api-keys" },
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
    label: "Generation Presets",
    items: [
      {
        type: "doc",
        id: "rest-api/list-generation-presets",
        label: "List generation presets",
        className: "api-method get",
      },
    ],
  },
];
