---
id: corpus-default-read-access
title: Configuring default read access to a corpus
---

Sometimes, you’ll want to make a corpus searchable by any authenticated user.
This guide explains how to accomplish this by setting default read access on the
corpus.

1. Make sure that you are logged in with a user having sufficient privileges to
   modify corpus authorizations. Any of the roles **Corpus Admin**,
   **Account Admin**, or **Account Owner** suffice.

2. Click the corpus either from the left side bar or search for it from the
   Corpora page and click on it.

  ![Corpora](/img/corpora.png)

3. Click on the **Authorization** tab in the right side window. 

  :::caution
  If you do not see an Authorization tab, you may not have sufficient
  privileges. Login with an account having rights as explained in the first
  point above.
  :::

  ![Corpus Authorization](/img/corpus_authorization.png)

4. Click on the **Create Default Role** button and create a Query Role for the
   corpus.

  ![Create Default Role](/img/create_default_corpus_role.png)

5. You will get a notification indicating successful creation of role. 

Congratulations. You have successfully setup default read access on the corpus
for any authenticated user. Allow up to 5 minutes for the new permissions to
propagate.
