---
id: chat-apis-overview
title: Chat APIs Overview
sidebar_label: Chat APIs Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Vectara Chat APIs provide a streamlined solution for integrating chatbot 
functionalities into domain-specific applications and websites using RAG. 
Designed with efficiency in mind, these Chat APIs enable developers to create 
interactive user experiences and manage data conversations while maintaining a 
high level of security and privacy for users. 

The Chat APIs enable operations and pagination through the history of a chat, 
specifically the conversations and their individual exchanges, also known as 
turns. Administrators can gain valuable insights into user behavior by analyzing 
trends among users which creates opportunities to identify knowledge gaps 
for products, documentation, and FAQs.

* [**List Conversations**](/docs/api-reference/chat-apis/list-conversations) in a chat history corpus 
  get an an overview of the interactions between chatbots and users.
* [**Read Conversations**](/docs/api-reference/chat-apis/read-conversations) and retrieve detailed information about specific
  conversations by their IDs from a chat history corpus.
* [**Delete Conversations**](/docs/api-reference/chat-apis/delete-conversations) by their specific Conversation IDs for 
  data management and other purposes.
* [**Delete Turns**](/docs/api-reference/chat-apis/delete-turns) from a conversation starting from a specific 
  Turn ID to manage the content of conversations.
