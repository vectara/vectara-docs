---
id: users
title: Users
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

The Vectara Python SDK provides methods to manage users in your account, 
including listing, creating, retrieving, updating, deleting, and resetting 
passwords. The UsersClient (synchronous) and AsyncUsersClient (asynchronous) 
support these operations, with options to filter by corpus access, assign 
roles, and configure timeouts. Usernames must be percent-encoded for API calls.

Note: User management operations require OAuth authentication, not API keys.

## Prerequisites

<CodePanel
  title="Install Vectara SDK"
  snippets={[
    { language: 'bash', code: `pip install vectara` }
  ]}
  customWidth="50%"
/>

**Setup Requirements:**
1. **Install the SDK** with `pip install vectara`
2. **Get OAuth credentials** from the [Vectara Console](https://console.vectara.com) (client_id and client_secret)


---

## Initialize the Vectara Client

<CodePanel
  title="Initialize Vectara Client with OAuth"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara
from vectara.core.api_error import ApiError

# Initialize client with OAuth
client = Vectara(client_id="YOUR_CLIENT_ID", client_secret="YOUR_CLIENT_SECRET")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Use OAuth credentials for user management operations' }
    ]
  }}
  customWidth="50%"
/>

Configure authentication using OAuth credentials (client_id and client_secret) 
for user management operations.

<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />

---

## List users

<CodePanel
  title="List Users by Corpus Access"
  snippets={[
    {
      language: "python",
      code: "response = client.users.list(\n    corpus_key=\"my-corpus-key\",\n    limit=10\n)\nfor user in response:\n    print(f\"Username: {user.username}, Email: {user.email}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Filter users with access to a specific corpus" },
      { line: 3, text: "Limit to 10 users per page" },
      { line: 6, text: "Access user details like username and email" }
    ]
  }}
  customWidth="50%"
/>

List all users in the account, optionally filtering by corpus access.

- `corpus_key` (str, optional): Filter users with access to this corpus.
- `limit` (int, optional): Max number of users per page.
- `page_key` (str, optional): Fetch next page of results.
- `request_timeout` (int, optional): Timeout in seconds.

**Returns:**  
Iterator of user objects, each with:
- `username`
- `email`
- `description`
- `api_roles`
- `enabled`
  

**Error handling:**
- `403 Forbidden`: Insufficient OAuth permissions.
- `404 Not Found`: Corpus does not exist (if filtering by `corpus_key`).
- `500 Internal Server Error`: API unavailable.

<Spacer size="l" />

---

## Create a User

<CodePanel
  title="Create a User with Roles"
  snippets={[
    {
      language: "python",
      code: "response = client.users.create(\n    email=\"alice@example.com\",\n    username=\"alice\",\n    description=\"Content Manager\",\n    api_roles=[\"corpus_admin\", \"query_writer\"]\n)\nprint(f\"Created user: {response.user.username}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Specify user email (required)" },
      { line: 4, text: "Assign roles like corpus_admin or query_writer" },
      { line: 7, text: "Access created user details" }
    ]
  }}
  customWidth="50%"
/>

Create a new user with an email, optional username, description, and API roles.
- `email` (str): User's email address (**required**)
- `username` (str, optional): Login username (email is default)
- `description` (str, optional): Free-form user description
- `api_roles` (list[str], optional): Assigned roles (`corpus_admin`, 
  `query_writer`)

**Returns:**  
User object with:
- `username`
- `email`
- `api_roles`
- `enabled`

**Error handling:**
- `400 Bad Request`: Missing required fields or invalid email.
- `409 Conflict`: Username or email already exists.
- `403 Forbidden`: Insufficient OAuth permissions.

<Spacer size="l" />

---

## Retrieve a User

<CodePanel
  title="Get User Details"
  snippets={[
    {
      language: "python",
      code: "import urllib.parse\nusername = urllib.parse.quote(\"alice@example.com\")\nuser = client.users.get(username=username)\nprint(f\"Username: {user.username}, Roles: {user.api_roles}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Percent-encode username for API safety" },
      { line: 3, text: "Retrieve user by username" },
      { line: 4, text: "Access user details like roles" }
    ]
  }}
  customWidth="50%"
/>

Get details for a specific user by their username (percent-encoded if needed).

- `username` (str): Username, percent-encoded (through `urllib.parse.quote()`)

**Returns:**  
User object with fields:
- `username`
- `email`
- `api_roles`
- `enabled`
- `description`


**Error handling:**
- `404 Not Found`: User does not exist.
- `403 Forbidden`: Insufficient OAuth permissions.

<Spacer size="l" />

---

## Update a User

<CodePanel
  title="Update User Roles"
  snippets={[
    {
      language: "python",
      code: "import urllib.parse\nusername = urllib.parse.quote(\"alice@example.com\")\nuser = client.users.update(\n    username=username,\n    enabled=True,\n    api_roles=[\"corpus_admin\"]\n)"
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Percent-encode username for update" },
      { line: 5, text: "Enable user account" },
      { line: 6, text: "Update roles to corpus_admin only" }
    ]
  }}
  customWidth="50%"
/>

Update a user’s status or roles, such as enabling/disabling or changing 
permissions.

- `username` (str): Percent-encoded username (**required**)
- `enabled` (bool, optional): Enable or disable user account
- `api_roles` (list[str], optional): Update roles
- `description` (str, optional): Update user description

**Returns:**

Updated user object with:
- `username`
- `api_roles`
- `enabled`
- `description`


**Error handling:**

- `404 Not Found`: User does not exist.
- `403 Forbidden`: Insufficient OAuth permissions.
- `400 Bad Request`: Invalid update parameters.

<Spacer size="l" />

---

## Delete a User

<CodePanel
  title="Delete a User"
  snippets={[
    {
      language: "python",
      code: "import urllib.parse\nusername = urllib.parse.quote(\"alice@example.com\")\nclient.users.delete(username=username)"
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Percent-encode username for deletion" },
      { line: 3, text: "Delete user from account" },
    ]
  }}
  customWidth="50%"
/>

Delete a user from the account by their username (percent-encoded).

- `username` (str): Percent-encoded username

**Returns:**

None (success is silent)

**Error handling:**
- `404 Not Found`: User does not exist.
- `403 Forbidden`: Insufficient OAuth permissions.

<Spacer size="l" />

---

## Reset a password

<CodePanel
  title="Reset User Password"
  snippets={[
    {
      language: "python",
      code: "import urllib.parse\nusername = urllib.parse.quote(\"alice@example.com\")\nresponse = client.users.reset_password(username=username)"
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Percent-encode username for password reset" },
      { line: 3, text: "Trigger password reset email" }
    ]
  }}
  customWidth="50%"
/>

Reset a user’s password, sending a reset email to their registered address.

- `username` (str): Percent-encoded username

**Returns:**
User object for whom the reset was sent:
- `username`
- `email`

**Error handling:**
- `404 Not Found`: User does not exist.
- `403 Forbidden`: Insufficient OAuth permissions.