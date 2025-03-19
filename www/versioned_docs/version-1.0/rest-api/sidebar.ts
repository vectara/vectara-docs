import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-1.0/rest-api/vectara-rest-api",
    },
    {
      type: "category",
      label: "AdminService",
      link: {
        type: "doc",
        id: "version-1.0/rest-api/admin-service",
      },
      items: [
        {
          type: "doc",
          id: "version-1.0/rest-api/compute-account-size",
          label: "ComputeAccountSize",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/compute-corpus-size",
          label: "ComputeCorpusSize",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/create-api-key",
          label: "CreateApiKey",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/create-corpus",
          label: "CreateCorpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/delete-api-key",
          label: "DeleteApiKey",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/delete-corpus",
          label: "DeleteCorpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/enable-api-key",
          label: "EnableApiKey",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/get-usage-metrics",
          label: "GetUsageMetrics",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/list-api-keys",
          label: "ListApiKeys",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/list-corpora",
          label: "ListCorpora",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/list-jobs",
          label: "ListJobs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/list-users",
          label: "ListUsers",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/manage-user",
          label: "ManageUser",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/read-corpus",
          label: "ReadCorpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/replace-corpus-filter-attrs",
          label: "ReplaceCorpusFilterAttrs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/reset-corpus",
          label: "ResetCorpus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/update-corpus-enablement",
          label: "UpdateCorpusEnablement",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "IndexService",
      link: {
        type: "doc",
        id: "version-1.0/rest-api/index-service",
      },
      items: [
        {
          type: "doc",
          id: "version-1.0/rest-api/delete",
          label: "Delete",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/index",
          label: "Index",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/core-index",
          label: "CoreIndex",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/file-upload",
          label: "FileUpload",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "QueryService",
      link: {
        type: "doc",
        id: "version-1.0/rest-api/query-service",
      },
      items: [
        {
          type: "doc",
          id: "version-1.0/rest-api/query",
          label: "Query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/stream-query",
          label: "StreamQuery",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "DocumentService",
      link: {
        type: "doc",
        id: "version-1.0/rest-api/document-service",
      },
      items: [
        {
          type: "doc",
          id: "version-1.0/rest-api/list-documents",
          label: "ListDocuments",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "ChatService",
      link: {
        type: "doc",
        id: "version-1.0/rest-api/chat-service",
      },
      items: [
        {
          type: "doc",
          id: "version-1.0/rest-api/delete-conversations",
          label: "DeleteConversations",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/delete-turns",
          label: "DeleteTurns",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/disable-turns",
          label: "DisableTurns",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/list-conversations",
          label: "ListConversations",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/rest-api/read-conversations",
          label: "ReadConversations",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
