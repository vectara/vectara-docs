---
id: reset-or-delete-corpus
title: Reset or delete a corpus
---

If you've decided to stop using an index you have three options.

1. **Disable**: Disables query or indexing requests. A disabled index can be
   reenabled at any time.
2. **Reset**: Purge all the data within the index, but leave the definition intact.
3. **Delete**: Purge all the data within the index and the delete the index.
   All your connected services to the index will also cease to function.

:::caution
The **Reset** and **Delete** operations are irreversable.
:::

You can view these options on the Indices operations tab with their respective
descriptions.

![Create operations](/img/corpus_operations.png)

## Reset an index

To reset an index: 
1. Click the **Reset** button. A warning modal will appear.
2. Enter the full name of the index for confirmation (case insensitive).
3. Select _Reset_ and wait for the confirmation message.

That's it, all the data within the index has been purged.

## Delete an index

To permanently delete an index: 
1. Click the **Delete** button. A warning modal will appear. 
2. Enter the full name of the index for confirmation (case insensitive).
3. Select **Delete** and wait for the confirmation message.

That's it, the index has been deleted.
