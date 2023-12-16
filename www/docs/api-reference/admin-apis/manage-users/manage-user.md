---
id: manage-user
title: Manage User API Definition
sidebar_label: Manage User API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Manage User endpoint lets you perform different user and team management 
activities such as adding, deleting, enabling, disabling, and editing user 
roles. This capability is useful in scenarios that require dynamic team 
management.

For example, a company wants to onboard new team members efficiently and this  
endpoint lets you streamline the onboarding process by programatically 
adding new users, assigning appropriate roles, and setting up access 
permissions.

## Manage User Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/create-corpus</code>

## Manage Users from the API Playground

Check out our [interactive API Playground](/docs/rest-api/create-user) that lets 
you experiment with this REST endpoint to manage users for your Vectara
account.


### Request Headers

To interact with the Manage User service via REST calls, you need the following headers:
* `customer_id` is the Customer ID to use for the request
* An API Key or JWT Token as your authentication method


### Request Body

The Manage User request body requires the following parameters:

* `handle` - Specifies the ID of the user.
* `type` - Specifies the type of user:
   -  `USER_TYPE__NONE` - A default user type, typically used as a placeholder.
   -  `USER_TYPE__USER` - A standard user type for users who will interact with the Vectara
      platform.
   -  `USER_TYPE__FEDERATED_USER` - A user authenticated by an external identity provider 
      such as Google.
   -  `USER_TYPE__APP_CLIENT` - An application client and not individual users. These 
      application-level clients interact with the system.
* `email`
* `userActionType` - Specifies the type of action for the user:
  -  `USER_ACTION_TYPE__ADD` 
  - `USER_ACTION_TYPE__DELETE`
  - `USER_ACTION_TYPE__DISABLE`
  - `USER_ACTION_TYPE__ENABLE`
  - `USER_ACTION_TYPE__RESET_PASSWORD`
  - `USER_ACTION_TYPE__EDIT_ROLE`

```json
{
 "userAction": [
   {
     "user": {
       "handle": "firstlast",
       "type": "USER_TYPE__USER",
       "email": "firstlast@gmail.com"
     },
     "userActionType": "USER_ACTION_TYPE__ADD" or "USER_ACTION_TYPE__DELETE" 
     or "USER_ACTION_TYPE__DISABLE" or "USER_ACTION_TYPE__ENABLE" or 
     "USER_ACTION_TYPE__RESET_PASSWORD" or "USER_ACTION_TYPE__EDIT_ROLE"
    }
   }
 ]
}
```

## User Management Examples

### Onboard a New User to your Vectara Account

In this example, you want to create a new user for your account.

```json
{
 "userAction": [
   {
     "user": {
       "handle": "elonmusk",
       "type": "USER_TYPE__USER",
       "email": "elonmusk@x.com"
     },
     "userActionType": "USER_ACTION_TYPE__ADD"
   }
 ]
}

```