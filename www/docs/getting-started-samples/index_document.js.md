---
    id: index_document.js
    title: index_document.js
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/nodejs/rest/index_document.js
    sidebar_label: NodeJS
---


import CodePanel from '@site/src/theme/CodePanel';

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/nodejs/rest/index_document.js">nodejs/rest/index_document.js</a>

```js title="nodejs/rest/index_document.js"
/**
 * This nodejs module has an index function which uses Vectara's 
 * index API via REST
 */

 const axios = require('axios');

 module.exports = {
     indexDocument: async function (customer_id, corpus_id, indexing_endpoint, jwt_token) {
         const data = {
            'customer_id': customer_id,
            'corpus_id': corpus_id,
            'document': {
                'document_id': 'doc-id-1',
                'title': 'An example title',
                'metadata_json': JSON.stringify({
                    "book-name": "An example title",
                    "collection": "Chemistry",
                    "author": "Example Author"
                }),
                'section': [
                    {
                        'text': 'This is a test document'
                    }
                ]
            }
         };
         /**
          * Note that both documents and sections can contain titles and
          * metadata_json.  These are optional for both levels.
          */
         const config = {
             headers: {
                 'Authorization': `Bearer ${jwt_token}`,
                 'Content-Type': 'application/json',
                 'customer-id': customer_id.toString()
             }
         };
 
         const result = await axios.post(`https://${indexing_endpoint}/v1/index`, data, config);
         return result;
     }
 };
```
