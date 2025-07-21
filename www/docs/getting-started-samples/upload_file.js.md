---
    id: upload_file.js
    title: upload_file.js
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/nodejs/rest/upload_file.js
    sidebar_label: NodeJS
---


import CodePanel from '@site/src/theme/CodePanel';

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/nodejs/rest/upload_file.js">nodejs/rest/upload_file.js</a>

```js title="nodejs/rest/upload_file.js"
/**
 * This nodejs module has an uploadFile function which uses Vectara's 
 * document upload API via REST
 */

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

module.exports = {
    uploadFile: async function (customer_id, corpus_id, indexing_endpoint, jwt_token) {
        const data = new FormData();
        data.append('c', customer_id);
        data.append('o', corpus_id);
        data.append('file', fs.createReadStream(__dirname + '/upload.pdf'));

        const config = {
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        const result = await axios.post(`https://${indexing_endpoint}/v1/upload`, data, config);
        return result;
    }
};
```
