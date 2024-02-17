---
id: vectara-prompt-engine
title: Vectara Prompt Engine
sidebar_label: Vectara Prompt Engine
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Vectara Prompt Engine allows Scale users to directly add the retrieved 
documents and their metadata into the prompt generation. This capability 
enables developers to customize prompts that can reference the most relevant 
text and metadata for many use cases that require Retrieval Augmented 
Generation (RAG). Answer questions based on previous answers, such as 
with RFI, RFP, and 
questionnaires.

:::note

Reach out to support if you want to modify the default prompt.

:::

## What makes a prompt?

Prompts can indicate a `role`, `system`, and `content` which provide context 
about the kind of information that you want to retrieve. These values can also 
specify variables and functions to provide more nuanced context. You then add 
different operations to customize the types of answers you want to retrieve.

You also can provide variables and functions to further customize the prompt.

### Role

The `role` specifies the function of the individual that you want to respond 
to the prompt. The function indicates the responsibilities and perspective of 
the action being performed.

Example roles can include a Software Developer, Product Owner, Technical Writer, 
Data Analyst, Customer Support Representative.

### System

The `system` specifies the platform or environment within which you want the 
prompt issued and subsequent action taken. The platforms can range from 
software applications to physical systems. Providing details about the system 
provides additional context for the response.


Example systems can include a Content Management System, Code Repository, 
Learning Management System, Business Intelligence Software, and so on.


### Content

The `content` specifies the precise action or feedback desired from the prompt. 
This content captures the context of what needs to be accomplished or 
directed. Clear and concise content helps ensure that the prompt communicates 
its intent effectively.

Example content can include:

* "Follow up on a refund request"
* "Update the monthly sales dashboard"
* "Determine the cause of the network failure"
* "Create a technical documentation outline for a new feature"
* "Provide the top 10 trends from the product backlog"

## Available Variables and Functions

* vectaraQueryResults
* vectaraIdxWord
* vectaraQuery
* vectaraLangCode
* vectaraLangName
* vectaraOutChars
* vectaraChatHistory
