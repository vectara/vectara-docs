---
    id: reset_corpus.js
    title: reset_corpus.js
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/nodejs/rest/reset_corpus.js
    sidebar_label: NodeJS
---


import CodePanel from '@site/src/theme/CodePanel';

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/nodejs/rest/reset_corpus.js">nodejs/rest/reset_corpus.js</a>

```js title="nodejs/rest/reset_corpus.js"
/**
 * This nodejs module has a resetCorpus function which uses Vectara's 
 * reset-corpus API via REST
 */

 const axios = require('axios');

 module.exports = {
     resetCorpus: async function (customer_id, corpus_id, admin_endpoint, jwt_token) {
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
 
         const result = await axios.post(`https://${admin_endpoint}/v1/reset-corpus`, data, config);
         return result;
     }
 };
```
