---
    id: rest_util.py
    title: rest_util.py
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/python/vectara-rest/rest_util.py
    sidebar_label: Python
---


import CodePanel from '@site/src/theme/CodePanel';

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/python/vectara-rest/rest_util.py">python/vectara-rest/rest_util.py</a>

```py title="python/vectara-rest/rest_util.py"
"""Utility functions for interacting with Vectara over REST."""

from authlib.integrations import requests_client


def get_jwt_token(auth_url: str, app_client_id: str, app_client_secret: str):
    """Connects to the server and returns a JWT token."""
    token_endpoint = f"{auth_url}"
    session = requests_client.OAuth2Session(
        app_client_id, app_client_secret, scope="")
    token = session.fetch_token(token_endpoint, grant_type="client_credentials")
    return token["access_token"]

```
