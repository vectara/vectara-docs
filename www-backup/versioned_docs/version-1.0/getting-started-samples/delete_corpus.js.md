---
    id: delete_corpus.js
    title: delete_corpus.js
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/nodejs/rest/delete_corpus.js
    sidebar_label: NodeJS
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/nodejs/rest/delete_corpus.js">nodejs/rest/delete_corpus.js</a>

```js title="nodejs/rest/delete_corpus.js"
/**
 * This nodejs module has a deleteCorpus function which uses Vectara's 
 * delete-corpus API via REST
 */

 const axios = require('axios');

 module.exports = {
     deleteCorpus: async function (customer_id, corpus_id, admin_endpoint, jwt_token) {
         const data = {
            'customer_id': customer_id,
            'corpus_id': corpus_id
         };
         const config = {
             headers: {
                 'Authorization': `Bearer ${jwt_token}`,
                 'Content-Type': 'application/json',
                 'customer-id': customer_id.toString()
             }
         };
 
         const result = await axios.post(`https://${admin_endpoint}/v1/delete-corpus`, data, config);
         return result;
     }
 };
```
