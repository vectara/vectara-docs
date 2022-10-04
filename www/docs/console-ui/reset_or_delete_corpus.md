---
id: reset-or-delete-corpus
title: Resetting and deleting a corpus
---

If you've decided to stop using a corpus you have three options.

1. **Disable**: Disables query or indexing requests. A disabled corpus can be
   reenabled at any time.
2. **Reset**: Purge all the data within the corpus, but leave the corpus
   definition intact.
3. **Delete**: Purge all the data within the corpus and delete the corpus.
   All your connected services to the corpus will also cease to function.

:::caution
The **Reset** and **Delete** operations are irreversable.
:::

You can view these options on the corpus operations tab with their respective
descriptions.

![Create operations](/img/corpus_operations.png)

## Resetting a corpus

To reset a corpus, click on the Reset button. A warning prompt will appear.
Enter the full name of the corpus for confirmation (case insensitive).

![Create reset](/img/corpus_reset.png)

Select _Reset_ and wait for the confirmation message.

![Create reset](/img/corpus_reset_success.png)

That's it, all the data within the corpus has been purged.

## Deleting a corpus

To permanently delete a corpus, click on the _Delete_ button. A warning prompt
willl appear. Enter the full name of the corpus for confirmation
(case insensitive).

![Create delete](/img/corpus_delete.png)

Select _Delete_ and wait for the confirmation message.

![Create reset](/img/corpus_delete_success.png)

That's it, the corpus has been deleted.
