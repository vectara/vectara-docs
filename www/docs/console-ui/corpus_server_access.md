---
id: configure-server-access-to-corpus
title: Configure Server Access to a Corpus
sidebar_label: Configure Server Access
---

Follow the steps below to configure server access to a corpus. This access is
commonly needed when your systems will be indexing data into the corpus or
running queries against it.

1. Make sure that you have an [app client] for your server already created.

2. Navigate to your desired corpus by either clicking its name in the left
   sidebar or through the **Corpora** page.

3. Click the **Authorization** tab.
   
   :::note
   
   If you don't see an Authorization tab,
   you do not have sufficient privileges. Ask your Account or Corpus Admin to
   grant you privileges on this corpus.

   :::

  ![Corpus Authorization](/img/corpus_authorization_tab.png)

1. Click **Create user role**.
2. Select your auser in the Name dropdown, select the
   desired role(s) and add an optional description.  Usually, the appropriate
   roles will be indexing (IDX), or querying (QRY), or both.

  ![Authorize User](/img/authorization_create_user_role.gif)

6. Click **Create**. This will create a new role for your user. 

Congratulations. You have successfully authorized a server to access the corpus.