---
id: artifacts
title: Artifacts
sidebar_label: Artifacts
---

import CodePanel from '@site/src/theme/CodePanel';

Artifacts are files stored in an agent session's workspace. They provide a
persistent, session-scoped storage mechanism where agents and users can share
files throughout a conversation without bloating the agent's context with
large file contents.

## Why artifacts matter

Before artifacts, file uploads were handled inline within session events. Every
time an agent needed to reference a file, the full content was included in the
context window. This approach created inefficiencies:

- **Context bloat**: Large files consumed valuable context space
- **Redundant transfers**: Files were re-uploaded for each operation
- **Poor reusability**: Multi-step workflows required duplicating file data

Artifacts solve these problems by separating file storage from file references.
When you upload a file, Vectara stores it in the session workspace and returns
a lightweight `ArtifactReference` containing only metadata. Agents use these
references to access files without including the full content in every request.

### Benefits

- **Efficient context usage**: File references contain only metadata (artifact_id,
  filename, mime_type, size), not content
- **Multi-step workflows**: Upload once, reference multiple times across
  different tool operations
- **Better performance**: Reduced payload sizes in agent requests and responses
- **Data isolation**: Artifacts are scoped to a single session for security

## How artifacts work

### Artifact creation

Artifacts are created in two ways:

1. **User uploads**: When you upload files to a session using multipart requests,
   Vectara stores each file as an artifact
2. **Tool generation**: Agent tools can create new artifacts as outputs (for
   example, converting a PDF to markdown)

Each artifact receives a unique identifier following the pattern `art_[a-z0-9_-]+`.

### Artifact lifecycle

- **Scope**: Artifacts belong to a specific session and cannot be accessed from
  other sessions
- **Duration**: Artifacts have a configurable time-to-live (TTL) and are
  automatically removed when they expire or when the session is deleted
- **Quotas**: Size limits apply to individual artifacts and total session storage

### Artifact references

An `ArtifactReference` is a lightweight metadata object that points to a stored
file. It contains:

- `artifact_id`: Unique identifier for the artifact
- `filename`: Original filename
- `mime_type`: File type (e.g., `application/pdf`, `text/csv`)
- `size_bytes`: File size in bytes

When agents receive an artifact reference, they can pass it to tools that need
to read, process, or transform the file.

## Uploading files as artifacts

To upload files to an agent session, send a multipart POST request to the
session's upload endpoint. Vectara stores the files as artifacts and returns
an `ArtifactUploadEvent` containing references to all uploaded files.

<CodePanel
  title="Upload files to session workspace"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents/{agent_key}/sessions/{session_key}/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@report.pdf" \\
  -F "file=@data.csv"`
    }
  ]}
  annotations={{
    bash: [
      { line: 1, text: 'POST to session upload endpoint' },
      { line: 3, text: 'Upload first file with multipart form data' },
      { line: 4, text: 'Upload additional files in same request' }
    ]
  }}
  layout="stacked"
/>

### Response: ArtifactUploadEvent

The response is an `ArtifactUploadEvent` that becomes part of the session's
conversation history:

<CodePanel
  title="Artifact upload event response"
  snippets={[
    {
      language: 'json',
      code: `{
  "id": "aev_artifact_upload_001",
  "session_key": "ase_research_session",
  "type": "artifact_upload",
  "artifacts": [
    {
      "artifact_id": "art_report_pdf_a3f2",
      "filename": "report.pdf",
      "mime_type": "application/pdf",
      "size_bytes": 2048576
    },
    {
      "artifact_id": "art_data_csv_b4e1",
      "filename": "data.csv",
      "mime_type": "text/csv",
      "size_bytes": 8192
    }
  ],
  "created_at": "2025-10-31T14:30:00Z"
}`
    }
  ]}
  annotations={{
    json: [
      { line: 3, text: 'Event type is "artifact_upload"' },
      { line: 4, text: 'Array of artifact references for uploaded files' },
      { line: 6, text: 'Unique artifact identifier' },
      { line: 7, text: 'Original filename preserved' },
      { line: 8, text: 'MIME type for content identification' },
      { line: 9, text: 'File size for quota tracking' }
    ]
  }}
  layout="stacked"
/>

After upload, the agent can see these artifacts in the session history and use
them with tools.

## Using artifacts in workflows

Artifacts enable multi-step document processing workflows within a single
session. Here's a common pattern:

1. **Upload**: User uploads a PDF document as an artifact
2. **Convert**: Agent uses document conversion tool to transform the PDF artifact
   into markdown (creates a new artifact)
3. **Analyze**: Agent uses the markdown artifact to answer questions about the
   document
4. **Index**: Agent uses a structured indexing tool to add the markdown artifact
   to a corpus

Each step references artifacts by ID rather than passing file contents.

### Example workflow

<CodePanel
  title="Multi-step artifact workflow"
  snippets={[
    {
      language: 'json',
      code: `{
  "workflow": [
    {
      "step": "upload",
      "description": "User uploads quarterly-report.pdf",
      "result": {
        "artifact_id": "art_report_pdf_x9j3",
        "mime_type": "application/pdf"
      }
    },
    {
      "step": "convert",
      "tool": "document_conversion",
      "input": {
        "artifact_id": "art_report_pdf_x9j3"
      },
      "result": {
        "artifact_id": "art_report_md_y4k2",
        "mime_type": "text/markdown"
      }
    },
    {
      "step": "index",
      "tool": "structured_document_index",
      "input": {
        "artifact_id": "art_report_md_y4k2",
        "corpus_key": "financial-reports"
      },
      "result": {
        "documents_indexed": 1
      }
    }
  ]
}`
    }
  ]}
  annotations={{
    json: [
      { line: 4, text: 'Step 1: Upload creates first artifact' },
      { line: 13, text: 'Step 2: Conversion tool references input artifact' },
      { line: 18, text: 'Conversion creates new markdown artifact' },
      { line: 23, text: 'Step 3: Indexing tool references converted artifact' }
    ]
  }}
  layout="stacked"
/>

## Agent tool integration

Agent tools can read artifacts, process them, and create new derived artifacts.
When configuring tools that work with artifacts, you specify how the tool
should handle artifact references.

### Document conversion tool

The document conversion tool takes an artifact reference as input, converts the
file to markdown, and stores the result as a new artifact:

<CodePanel
  title="Document conversion tool configuration"
  snippets={[
    {
      language: 'json',
      code: `{
  "tool_configurations": {
    "document_converter": {
      "type": "document_conversion",
      "description": "Converts PDF, Word, PowerPoint, and image files to markdown format"
    }
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 3, text: 'Named tool configuration' },
      { line: 4, text: 'Document conversion tool type' },
      { line: 5, text: 'Tool converts artifacts to markdown' }
    ]
  }}
  layout="stacked"
/>

When the agent calls this tool, it passes an artifact reference:

```json
{
  "tool_name": "document_converter",
  "input": {
    "artifact_id": "art_report_pdf_a3f2"
  }
}
```

The tool reads the artifact, performs the conversion, stores the markdown as a
new artifact, and returns the new artifact reference.

### Structured document index tool

The structured document index tool references pre-converted artifact IDs instead
of requiring inline document content:

<CodePanel
  title="Indexing with artifact references"
  snippets={[
    {
      language: 'json',
      code: `{
  "tool_configurations": {
    "document_indexer": {
      "type": "structured_document_index",
      "query_configuration": {
        "search": {
          "corpora": [
            {
              "corpus_key": "company-docs"
            }
          ]
        }
      }
    }
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 4, text: 'Structured indexing tool' },
      { line: 9, text: 'Target corpus for indexing' }
    ]
  }}
  layout="stacked"
/>

When the agent calls this tool, it references the artifact containing the
content to index:

```json
{
  "tool_name": "document_indexer",
  "input": {
    "artifact_id": "art_report_md_y4k2",
    "corpus_key": "financial-reports"
  }
}
```

## Best practices

### When to use artifacts

Use artifacts for:
- Files larger than a few kilobytes
- Documents that will be referenced multiple times
- Multi-step processing workflows (convert, analyze, index)
- Binary files (PDFs, images, Office documents)

### When not to use artifacts

For simple, short text inputs that fit comfortably in a message, use regular
text messages instead of artifacts. Artifacts add overhead for storage and
retrieval that is unnecessary for small content.

### Quota management

Monitor your artifact storage usage to stay within quota limits:
- Track the size of uploaded files
- Clean up artifacts when no longer needed (by deleting the session)
- Use appropriate file formats (avoid unnecessarily large files)

### Security considerations

- Artifacts are scoped to sessions for data isolation
- Ensure uploaded files do not contain sensitive information unless the session
  is properly secured
- Artifacts are automatically cleaned up when sessions expire or are deleted

## Related concepts

- [**Sessions**](/docs/agents/sessions): Artifacts belong to specific agent sessions
- [**Tools**](/docs/agents/tools): Agent tools can read and create artifacts
- [**Instructions**](/docs/agents/instructions): Reference artifacts in instruction
  templates when needed
