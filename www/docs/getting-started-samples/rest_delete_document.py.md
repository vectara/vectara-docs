---
    id: rest_delete_document.py
    title: rest_delete_document.py
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/python/vectara-rest/rest_delete_document.py
    sidebar_label: Python
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/python/vectara-rest/rest_delete_document.py">python/vectara-rest/rest_delete_document.py</a>

```py title="python/vectara-rest/rest_delete_document.py"
"""Simple example of using the Vectara REST API for deleting a document."""

import json
import logging
import requests

def _get_delete_request_json(customer_id: int, corpus_id: int, doc_id: str):
    """Returns a JSON delete request."""
    request = {
        "customer_id": customer_id,
        "corpus_id": corpus_id,
        "document_id": doc_id,
    }
    return json.dumps(request)

def delete_document(
        customer_id: int,
        corpus_id: int,
        idx_address: str,
        jwt_token: str,
        doc_id: str):
    """Deletes document from the corpus.

    Args:
        customer_id: Unique customer ID in vectara platform.
        corpus_id: ID of the corpus from which document willb e deleted.
        idx_address: Address of the indexing server. e.g., api.vectara.io
        jwt_token: A valid Auth token.
        doc_id: Id of the document to be deleted.

    Returns:
        (response, True) in case of success and returns (response, False) in case of failure.
    """
    post_headers = {
        "Authorization": f"Bearer {jwt_token}",
        "customer-id": f"{customer_id}"
    }
    response = requests.post(
        f"https://{idx_address}/v1/delete-doc",
        data=_get_delete_request_json(customer_id, corpus_id, doc_id),
        verify=True,
        headers=post_headers)

    if response.status_code != 200:
        logging.error("REST delete document failed with code %d, reason %s, text %s",
                       response.status_code,
                       response.reason,
                       response.text)
        return response, False

    return response.json(), True

```
