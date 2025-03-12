---
    id: rest_delete_corpus.py
    title: rest_delete_corpus.py
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/python/vectara-rest/rest_delete_corpus.py
    sidebar_label: Python
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/python/vectara-rest/rest_delete_corpus.py">python/vectara-rest/rest_delete_corpus.py</a>

```py title="python/vectara-rest/rest_delete_corpus.py"
"""Simple example of using the Vectara REST API for deleting a corpus."""

import json
import logging
import requests

def _get_delete_corpus_json(customer_id: int, corpus_id: int):
    """Returns a delete corpus JSON."""
    corpus = {
        "customer_id": customer_id,
        "corpus_id": corpus_id,
    }

    return json.dumps(corpus)

def delete_corpus(customer_id: int, corpus_id: int, admin_address: str, jwt_token: str):
    """Deletes a corpus.

    Args:
        customer_id: Unique customer ID in vectara platform.
        corpus_id: Corpus ID in vectara platform.
        admin_address: Address of the admin server. e.g., api.vectara.io
        jwt_token: A valid Auth token.

    Returns:
        (response, True) in case of success and returns (error, False) in case of failure.
    """
    post_headers = {
        "customer-id": f"{customer_id}",
        "Authorization": f"Bearer {jwt_token}"
    }
    response = requests.post(
        f"https://{admin_address}/v1/delete-corpus",
        data=_get_delete_corpus_json(customer_id, corpus_id),
        verify=True,
        headers=post_headers)

    if response.status_code != 200:
        logging.error("Delete Corpus failed with code %d, reason %s, text %s",
                       response.status_code,
                       response.reason,
                       response.text)
        return response, False

    message = response.json()
    if message["status"] and message["status"]["code"] != "OK":
        logging.error("Delete Corpus failed with status: %s", message.status)
        return message.status, False

    return message, True

```
