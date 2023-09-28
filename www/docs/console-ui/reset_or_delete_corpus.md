---
id: reset-or-delete-corpus
title: Reset or delete a corpus
---

If you've decided to stop using a corpus you have three options from the 
Actions drop-down menu in the upper-right corner:

1. **Disable corpus**: Disables query or indexing requests. A disabled corpus can be
   reenabled at any time.
2. **Clear corpus data**: Purge all the data within the corpus, but leave the corpus
   definition intact. This option resets the corpus.
3. **Delete corpus**: Purge all the data within the corpus and delete the corpus.
   All your connected services to the corpus will also cease to function.

![Create operations](/img/corpus_overview_actions.gif)

:::caution
The **Reset** and **Delete** operations are irreversable.
:::

## Disable a corpus

To disable a corpus:
1. Click the Actions drop-down menu and select _Disable corpus_.
   A warning appears that says disabling the corpus prevents queries from 
   running and new data from being added.
2. Click **Disable**.

The corpus is now disabled.

## Reset a corpus

To reset a corpus: 
1. Click the Actions drop-down menu and select _Clear corpus data_. A warning 
   modal will appear.
2. Enter the full name of the corpus for confirmation (case insensitive).
3. Select _Reset_ and wait for the confirmation message.

That's it, all the data within the corpus has been purged.

## Delete a corpus

To permanently delete a corpus: 
1. Click on the _Delete_ button. A warning modal will appear. 
2. Enter the full name of the corpus for confirmation (case insensitive).
3. Select _Delete_ and wait for the confirmation message.

That's it, the corpus has been deleted.
