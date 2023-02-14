---
    id: create_corpus.js
    title: create_corpus.js
    sidebar_label: NodeJS
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/nodejs/rest/create_corpus.js">nodejs/rest/create_corpus.js</a>

```js title="nodejs/rest/create_corpus.js"
/**
 * This nodejs module has a createCorpus function which uses Vectara's 
 * create-corpus API via REST
 */

const axios = require('axios');

module.exports = {
    createCorpus: async function (customer_id, admin_endpoint, jwt_token) {
        const data = {
            'corpus': {
                'name': 'Test Corpus from NodeJS',
                'description': 'Dummy description'
            }
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-Type': 'application/json',
                'customer-id': customer_id.toString()
            }
        };

        const result = await axios.post(`https://${admin_endpoint}/v1/create-corpus`, data, config);
        return result;
    }
};
```
