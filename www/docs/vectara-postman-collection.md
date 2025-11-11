---
id: vectara-postman-collection
title: Vectara Postman Collection
sidebar_label: Vectara Postman Collection
---

import CodePanel from '@site/src/theme/CodePanel';

The [Vectara Postman Collection](https://www.postman.com/vectara) provides a convenient way 
to explore and test the Vectara REST API endpoints directly in Postman. It 
includes pre-configured requests for common operations such as:

- Creating and managing corpora
- Indexing documents
- Querying data using Retrieval-Augmented Generation (RAG)
- Managing Vectara resources

You can fork the collection into your own Postman workspace, customize it, and 
start sending authenticated requests without writing code.

## Prerequisites

The Vectara collection uses Postman environment variables for authentication 
and configuration. Ensure that you have your API key, customer ID, and corpus 
ID.

| Variable            | Description |
|---------------------|-------------|
| `VECTARA_API_KEY`   | Your API key with the required permissions |
| `VECTARA_CUSTOMER_ID` | Your Vectara customer ID |
| `VECTARA_CORPUS_ID` | The corpus identifier where your data is stored |

## 1. Fork the Vectara Postman Collection

1. Open the [Vectara Postman Collection](https://www.postman.com/vectara) in your browser.
2. Sign in to your Postman account.
3. Click **Fork** at the top of the page.
4. Select a workspace and optionally add a label or description.
5. Click **Fork Collection**.

The collection will now appear in your Postman app under **Collections**.

:::tip
Forking enables you to customize requests without affecting the public 
collection.
:::

## 2. Set up authentication

Vectara supports **API Key authentication** for most endpoints and **OAuth 2.0** for 
secure or automated workflows. Choose the method that fits your use case.

### Option A: API Key authentication

1. In Postman, open your forked collection and select the **Variables** tab.
2. Add a variable named `api_key` and set its value to your Vectara API key 
   (from the Vectara Console → **API Keys**).
3. Ensure requests use **Bearer Token** authentication with the token value 
   `{{api_key}}`.

### Option B: OAuth 2.0 authentication

1. In the collection’s **Authorization** tab, select **OAuth 2.0**.
2. Configure:
   - **Grant Type:** Client Credentials
   - **Client ID** and **Client Secret** from the Vectara Console
   - **Access Token URL:** `https://api.vectara.io/oauth2/token`
   - Required scopes (e.g., `corpus:read`, `index:write`)
3. Click **Get New Access Token** and use it for your requests.

:::note
For details about how to obtain credentials, see 
[**Choose the Right Authorization Method**](/docs/security/authentication/choose-auth-method).
:::

## 3. Explore and run requests

The collection contains ready-to-use requests for common API calls:

- **Ask Vectara** – Send a query and get a generated answer using RAG.
- **Search Vectara** – Perform semantic search over your corpus.
- **Upload document** – Add content to your corpus for retrieval and generation.
- **Delete document** – Remove a document from your corpus.

Each request includes the required headers and sample body content.

## 4. Examples

### Example 1: Create a Corpus

1. Open **Corpora Management, Create Corpus**.
2. In the **Body** tab, set the corpus name and description:
   ```json
   {
     "name": "product_docs",
     "description": "Product documentation corpus"
   }
3. Click **Send** and note the returned `corpus_id`.

### Example 2: Ask Vectara (RAG Query)

1. Open the **Querying > Ask Vectara** request.
2. Update the request body:  
    <CodePanel snippets={[{language: "json", code: `{
      "query": "What are the main benefits of using Vectara?",
      "corpus_id": "{{VECTARA_CORPUS_ID}}",
      "customer_id": "{{VECTARA_CUSTOMER_ID}}"
    }`}]} title="Create Corpus Example" layout="stacked" /> 
3. Click **Send** and review the generated answer and sources in the response.

## 5. Troubleshooting

* **Invalid credentials:** Verify your API key or OAuth token is correct and has the 
  required permissions.
* **Empty or unexpected results:** Ensure you are querying the correct corpus and that it 
  contains indexed documents.
* **Connection issues:** Confirm the base URL is set to `https://api.vectara.io/v2/`

You can view detailed request/response logs in the Postman Console (View, Show 
Postman Console).

## Next Steps

* Explore the [Vectara API Reference](/docs/rest-api) for detailed endpoint documentation.
* Use the collection as a foundation for building automated workflows or 
  integrations.
* Share feedback on the collection via the Vectara Postman workspace or by 
  contacting Vectara Support.
