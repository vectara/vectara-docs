---
    id: rest_api_key_queries.py
    title: rest_api_key_queries.py
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/python/vectara-rest/rest_api_key_queries.py
    sidebar_label: Python
---

This is a complete example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/python/vectara-rest/rest_api_key_queries.py">python/vectara-rest/rest_api_key_queries.py</a>

```py title="python/vectara-rest/rest_api_key_queries.py"
"""An example of calling the Vectara API via Python using HTTP/REST."""

import argparse
import json
import logging
import sys

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


def query(customer_id: int, corpus_id: int, query_address: str, api_key: str, query: str):
    """Queries the data.

    Args:
        customer_id: Unique customer ID in vectara platform.
        corpus_id: ID of the corpus to which data needs to be indexed.
        query_address: Address of the querying server. e.g., api.vectara.io
        api_key: A valid API key with query access on the corpus.

    Returns:
        (response, True) in case of success and returns (error, False) in case of failure.
    """
    post_headers = {
        "customer-id": f"{customer_id}",
        "x-api-key": api_key
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


if __name__ == "__main__":
    logging.basicConfig(
        format="%(asctime)s %(levelname)-8s %(message)s", level=logging.INFO)

    parser = argparse.ArgumentParser(
                description="Vectara rest example (With API Key authentication.")

    parser.add_argument("--customer-id", type=int, help="Unique customer ID in Vectara platform.")
    parser.add_argument("--corpus-id",
                        type=int,
                        help="Corpus ID to which data will be indexed and queried from.")

    parser.add_argument("--serving-endpoint", help="The endpoint of querying server.",
                        default="api.vectara.io")
    parser.add_argument("--api-key", help="API key retrieved from Vectara console.")
    parser.add_argument("--query", help="Query to run against the corpus.", default="Test query")

    args = parser.parse_args()

    if args:
        response, status = query(args.customer_id,
                                 args.corpus_id,
                                 args.serving_endpoint,
                                 args.api_key,
                                 args.query)
        logging.info("Query response: %s", response)
        if not status:
            sys.exit(1)

```
