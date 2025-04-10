---
    id: rest_query.py
    title: rest_query.py
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/python/vectara-rest/rest_query.py
    sidebar_label: Python
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/python/vectara-rest/rest_query.py">python/vectara-rest/rest_query.py</a>

```py title="python/vectara-rest/rest_query.py"
"""Simple example of using the Vectara REST API for searching a corpus."""

import json
import logging
import requests


def _get_query_json(customer_id: int, corpus_id: int, query_value: str):
    """Returns a query JSON."""
    query = {
        "query": [
            {
                "query": query_value,
                "num_results": 10,
                "corpus_key": [{"customer_id": customer_id, "corpus_id": corpus_id}],
            },
        ],
    }
    return json.dumps(query)


def query(customer_id: int, corpus_id: int, query_address: str, jwt_token: str, query: str):
    """Queries the data.

    Args:
        customer_id: Unique customer ID in vectara platform.
        corpus_id: ID of the corpus to which data needs to be indexed.
        query_address: Address of the querying server. e.g., api.vectara.io
        jwt_token: A valid Auth token.

    Returns:
        (response, True) in case of success and returns (error, False) in case of failure.

    """
    post_headers = {
        "customer-id": f"{customer_id}",
        "Authorization": f"Bearer {jwt_token}"
    }

    response = requests.post(
        f"https://{query_address}/v1/query",
        data=_get_query_json(customer_id, corpus_id, query),
        verify=True,
        headers=post_headers)

    if response.status_code != 200:
        logging.error("Query failed with code %d, reason %s, text %s",
                       response.status_code,
                       response.reason,
                       response.text)
        return response, False

    message = response.json()
    if (message["status"] and
        any(status["code"] != "OK" for status in message["status"])):
        logging.error("Query failed with status: %s", message["status"])
        return message["status"], False

    for response_set in message["responseSet"]:
        for status in response_set["status"]:
            if status["code"] != "OK":
                return status, False

    return message, True

```
