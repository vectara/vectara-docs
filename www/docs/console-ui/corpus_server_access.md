---
id: configure-server-access-to-corpus
title: Configure Server Access to a Corpus
sidebar_label: Configure Server Access
---

Follow the steps below to configure server access to a corpus. This is
commonly needed when your systems will be indexing data into the corpus or
running queries against it.

1. Make sure that you have an app client for your server already created. To
   learn how to do that, see the guide for creating an app client.

2. Navigate to your desired corpus by either clicking its name in the left
   sidebar (if you've opened it previously) or through the **Corpora** page.

  ![Corpora](/img/corpora.png)

1. Click on the **Authorization** tab (If you don't see an Authorization tab,
   you do not have sufficient privileges. Ask your Account or Corpus Admin to
   grant you privileges on this corpus).

  ![Corpus Authorization](/img/corpus_authorization.png)

1. In the Authorization tab, click the **Create Role** button. This will open a
   pop up window. In it, select your app client in the Name dropdown, select the
   desired role(s) and add an optional description.  Usually, the appropriate
   roles will be indexing (IDX), or querying (QRY), or both.

  ![Authorize User](/img/authorize_user_window.png)

6. Click **Create**. This will create a new role for your app client. 

Congratulations. You have successfully authorized a server to access the corpus.
