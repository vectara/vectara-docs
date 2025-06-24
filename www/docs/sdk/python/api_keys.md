---
id: api_keys
title: API Keys
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

The Vectara Python SDK enables you to manage API keys for authenticating API 
calls, using ApiKeysClient (synchronous) or AsyncApiKeysClient (asynchronous). 
You can list, create, retrieve, update, or delete API keys, with options to 
filter by corpus or role and configure timeouts. This section demonstrates 
common API key management tasks.

**Common API Key Operations:**

- List API keys by role or corpus for quick auditing
- Create new keys with role-based or corpus-level scopes
- Update or disable keys instantly to protect data
- Delete keys to immediately revoke API access
- Use async methods for large-scale, automated environments

## List API Keys

<CodePanel
  title="List API Keys by Corpus"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nresponse = client.api_keys.list(\n    corpus_key=\"my-corpus-key\",\n    api_key_role=\"serving\",\n    limit=5\n)\nfor key in response:\n    print(f\"Key ID: {key.id}, Name: {key.name}, Role: {key.api_key_role}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: "Filter keys with access to a specific corpus" },
      { line: 6, text: "Filter by role, like 'serving'" },
      { line: 9, text: "Access key details like ID and role" }
    ]
  }}
  customWidth="50%"
/>

List API keys in the account, optionally filtering by corpus or role.

- `corpus_key`: (Optional) Filter keys that grant access to a specific 
  corpus (recommended for RBAC or zero-trust setups).
- `api_key_role`: (Optional) Restrict results to a specific key role, such as 
  `'serving'`, `'query'`, or `'admin'`.
- `limit`: (Optional) Page size—limit the number of keys per request.

---

## Create an API Key

<CodePanel
  title="Create an API Key"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nresponse = client.api_keys.create(\n    name=\"SearchKey\",\n    api_key_role=\"serving\",\n    corpus_keys=[\"my-corpus-key\"]\n)\nprint(f\"Created key: {response.id}, Role: {response.api_key_role}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: "Human-readable name for the API key" },
      { line: 6, text: "Assign role, like 'serving' for querying" },
      { line: 7, text: "Grant access to specific corpora" }
    ]
  }}
  customWidth="50%"
/>

Create an API key with a name, role, and optional corpus permissions.

- `name`: Human-readable label for the key (recommended for tracking, 
  “CI/CD Pipeline”, “Support App”).
- `api_key_role`: Assign a minimum-permission role such as:
  - `'serving'`: For query/search operations (least privilege for external 
  clients).
  - `'indexing'`: For document ingestion (do not share externally).
  - `'admin'`: Full permissions (reserved for trusted backend use).
- `corpus_keys`: *(Optional)* Limit key access to specific corpora for extra 
  isolation—critical for regulated environments.


---

## Retrieve an API Key

<CodePanel
  title="Get API Key Details"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nkey = client.api_keys.get(api_key_id=\"key_12345\")\nprint(f\"Key ID: {key.id}, Name: {key.name}, Enabled: {key.enabled}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: "Retrieve key by its unique ID" },
      { line: 5, text: "Access details like name and enabled status" }
    ]
  }}
  customWidth="50%"
/>

Get details for a specific API key by its ID.

- `api_key_id`: The identifier for the key to look up.  


**Returns:**

Full metadata for the key, including `enabled`, `role`, `name`, and corpus scopes.

---

## Update an API Key

<CodePanel
  title="Update API Key Status"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nkey = client.api_keys.update(\n    api_key_id=\"key_12345\",\n    enabled=False\n)\nprint(f\"Updated key: {key.id}, Enabled: {key.enabled}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: "Specify key ID to update" },
      { line: 6, text: "Disable the API key" },
      { line: 7, text: "Confirm updated key status" }
    ]
  }}
  customWidth="50%"
/>

Update an API key’s status (enable/disable).

- `api_key_id`: The key to update (rotate or revoke access).
- `enabled`: Set to `false` to disable the key (recommended best practice 
  for temporary revocation instead of deletion).

---

## Delete an API Key

<CodePanel
  title="Delete an API Key"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nclient.api_keys.delete(api_key_id=\"key_12345\")\nprint(\"API key deleted\")"
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: "Delete key by its ID" },
      { line: 5, text: "No response data on successful deletion" }
    ]
  }}
  customWidth="50%"
/>

Delete an API key to revoke its access and permanently revoke all 
access—critical after role changes, deprovisioning, or breach response.

- `api_key_id`: The key’s unique identifier.


---

## Asynchronous API Key Management

<CodePanel
  title="Create API Key Asynchronously"
  snippets={[
    {
      language: "python",
      code: "from vectara import AsyncVectara\nimport asyncio\n\nasync def main():\n    client = AsyncVectara(api_key=\"YOUR_API_KEY\")\n    response = await client.api_keys.create(\n        name=\"AsyncSearchKey\",\n        api_key_role=\"serving\",\n        corpus_keys=[\"my-corpus-key\"]\n    )\n    print(f\"Created key: {response.id}, Role: {response.api_key_role}\")\n\nasyncio.run(main())"
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: "Initialize asynchronous client" },
      { line: 7, text: "Create key with 'serving' role" },
      { line: 10, text: "Access created key details" }
    ]
  }}
  customWidth="50%"
/>

Manage API keys asynchronously for non-blocking applications.

## Error handling

- **400 Bad Request:** Invalid fields or parameters.  
  - *Tip*: Double-check required fields, corpus IDs, and role values.
- **403 Forbidden:** Insufficient permissions.  
  - *Tip*: Only admin-level API keys can manage other API keys.
- **404 Not Found:** Invalid key ID or key already deleted.
- **409 Conflict:** Attempting to create a key with a duplicate name (if 
  enforced by organizational policy).
- **Handle with try/except:** Always wrap API key operations in `try/except` 
  blocks, especially when enabling/disabling or deleting keys.

**Security Tips:**
- Use the principle of least privilege: grant only the roles and corpora 
  needed.
- Rotate API keys regularly and immediately after staff changes.
- Never log or share API key values in plaintext or source control.
- Disable (do not delete) keys for temporary suspension—retain for audits.
- Audit API key usage regularly via listing endpoints.
