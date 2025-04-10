---
    id: delete_document.js
    title: delete_document.js
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/nodejs/rest/delete_document.js
    sidebar_label: NodeJS
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/nodejs/rest/delete_document.js">nodejs/rest/delete_document.js</a>

```js title="nodejs/rest/delete_document.js"
/**
 * This nodejs module has a deleteDocument function which uses Vectara's
 * delete-doc API via REST
 */

const axios = require("axios");

module.exports = {
  deleteDocument: async function (
    customer_id,
    corpus_id,
    indexing_endpoint,
    jwt_token,
    doc_id
  ) {
    const data = {
      customer_id: customer_id,
      corpus_id: corpus_id,
      document_id: doc_id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
        "customer-id": customer_id.toString(),
      },
    };

    const result = await axios.post(
      `https://${indexing_endpoint}/v1/delete-doc`,
      data,
      config
    );
    return result;
  },
};

```
