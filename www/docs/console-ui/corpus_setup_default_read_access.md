---
id: corpus-default-read-access
title: Configure Default Read Access to a Corpus
sidebar_label: Configure Default Read Access
---


import CodePanel from '@site/src/theme/CodePanel';

Sometimes, you’ll want to make a corpus searchable by any authenticated user.
This guide explains how to accomplish this by setting default read access on the
corpus.

1. Make sure that you are logged in with a user having sufficient privileges to
   modify corpus authorizations. Any of the roles **Corpus Admin**,
   **Account Admin**, or **Account Owner** suffice.
2. Navigate to your desired corpus by either clicking its name in the left
   sidebar or through the **Corpora** page.
3. Click the **Authorization** tab in the right side window. 

  ![Corpus Authorization](/img/corpus_authorization_tab.png)

    If you do not see an Authorization tab, you may not have sufficient privileges. 
    Log in with an account that has rights.


1. Click on the **Create Default Role** button and create a Query Role for the
   corpus.

  ![Create Default Role](/img/create_default_role.gif)

5. You will get a notification indicating successful creation of role. 

Congratulations. You have successfully setup default read access on the corpus
for any authenticated user. Allow up to 5 minutes for the new permissions to
propagate.
