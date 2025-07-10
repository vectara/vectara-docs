---
id: configure-server-access-to-corpus
title: Configure Server Access to a Corpus
sidebar_label: Configure Server Access
---


import CodePanel from '@site/src/theme/CodePanel';

Follow the steps below to configure server access to a corpus. This access is
commonly needed when your systems will be indexing data into the corpus or
running queries against it.

1. Make sure that you have an [app client] for your server already created.
2. Navigate to your desired corpus by either clicking its name in the left
   sidebar or through the **Corpora** page.
3. Click the gear icon in the top-right corner to open the **Settings** page.
4. Click the **Access control** tab.
   :::note
   If you do not see an **Access control tab**, you lack sufficient privileges. 
   Ask your Account or Corpus Admin to grant you privileges on this corpus.
   :::
    ![Corpus Authorization](/img/access_control_tab.png)
5. Click **Grant user access**.
6. Select a user, permissions (Query, Index, Query and index, or Admin), and 
   add an optional description. If you do not see the user, [invite them](https://console.vectara.com/console/team) to 
   your team.
   ![Grant User Access](/img/grant_user_access.png)
7. Click **Grant access**. 

Congratulations. You have successfully authorized a server to access the corpus.
