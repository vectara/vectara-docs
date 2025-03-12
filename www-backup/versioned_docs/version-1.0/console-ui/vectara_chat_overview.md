---
id: vectara-chat-overview
title: Vectara Chat
sidebar_label: Vectara Chat Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara Chat provides an interactive user experience that enables you to build 
domain-specific chatbots using RAG. Vectara Chat remembers chat histories and 
leads to more relevant responses in different scenarios like customer support. 
Every Vectara account has a unique Chat History Corpus which stores all chat 
histories.

You can chat with your data directly from the Vectara Console from within the 
Query tab of a corpus.

## Enable Chat

You enable chat in the Query tab of a specific corpus.

1. Click **Data** and select a corpus from the list.
2. Select the **Query** tab.
3. Select **Chat** and a navigation drawer appears.
   ![Chat Option on the Query Tab](/img/chat_query_tab.png)
4. Enable the Chat toggle:
   ![Enable Chat Toggle Option](/img/enable_chat.png)
5. Now you can [chat with your data](/docs/1.0/console-ui/chat-with-your-data)!

## Manage Conversations

The Conversations page lists the conversations in your chat history corpus:

![View the Conversation Page](/img/view_conversations.png)

## View a Specific Conversation

To view a specific conversation and all the turns in the chat, select 
a `Conversation ID` from the list.

![View a Specific Conversation](/img/view_specific_conversation.png)

Click **Delete** to remove the chat from the conversation history.