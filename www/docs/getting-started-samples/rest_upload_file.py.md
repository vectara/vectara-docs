---
    id: rest_upload_file.py
    title: rest_upload_file.py
    sidebar_label: Python
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/python/vectara-rest/rest_upload_file.py">python/vectara-rest/rest_upload_file.py</a>

```py title="python/vectara-rest/rest_upload_file.py"
"""Simple example of using the Vectara REST API for uploading files.
"""

import json
import logging
import requests

def _get_upload_file_json():
    """ Returns some example JSON file upload data. """
    document = {}
    document["document_id"] = "doc-id-1"
    # Note that the document ID must be unique for a given corpus
    document["title"] = "An example Title"
    document["metadata_json"] = json.dumps(
        {
            "book-name": "An example title",
            "collection": "Philosophy",
            "author": "Example Author"
        }
    )
    sections = []
    section = {}
    section["text"] = "An example text that needs to be indexed."
    sections.append(section)
    document["section"] = sections

    return json.dumps(document)

def upload_file(customer_id: int, corpus_id: int, idx_address: str, jwt_token: str):
    """ Uploads a file to the corpus.
    Args:
        customer_id: Unique customer ID in vectara platform.
        corpus_id: ID of the corpus to which data needs to be indexed.
        idx_address: Address of the indexing server. e.g., api.vectara.io
        jwt_token: A valid Auth token.

    Returns:
        (response, True) in case of success and returns (error, False) in case of failure.

    """

    post_headers = {
        "Authorization": f"Bearer {jwt_token}"
    }
    response = requests.post(
        f"https://{idx_address}/v1/upload?c={customer_id}&o={corpus_id}",
        files={"file": ("test.json", _get_upload_file_json(), "application/json")},
        verify=True,
        headers=post_headers)

    if response.status_code != 200:
        logging.error("REST upload failed with code %d, reason %s, text %s",
                       response.status_code,
                       response.reason,
                       response.text)
        return response, False
    return response, True
```
