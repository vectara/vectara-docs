---
id: agents-quickstart
title: Quickstart
sidebar_label: Quickstart
---

import CodePanel from '@site/src/theme/CodePanel';

This guide walks you through creating and configuring a Research 
Assistant agent in the Vectara Console. By the end of this tutorial, you will have 
a working agent capable of searching the web to answer questions. 

The Create agent wizard lets you customize an agent including its model, 
instructions, tools, and other advanced options.

## Step 1: Create the agent and configure general settings

Start by accessing the Agents section and giving your agent a clear name and 
description to help identify its purpose and capabilities. 

1. Navigate to **Agents** in the sidebar.
2. Click **Add Agent**.  
   The General pane appears.
3. Add a **Name** like `Research Assistant`.
4. Add a **Description** like 
   `A research assistant that can search the web for current information.`  
   ![Create agent general](/img/create-agent-general.png)  
5. Click **Next**.

## Step 2: Select the model

Choose the Large Language Model (LLM) that you want for your agent's 
reasoning. Then, configure the model parameters. We'll set the creativity 
level with the temperature parameter.

1. Select a **Model name** like `gpt-4o`.
2. Set the `temperature` parameter to `0.3`.
   ![Create agent model](/img/create-agent-model.png)  
  This temperature value provides more consistent results with factual 
accuracy and low creativity. This `0.3` value is like a _sweet spot_ for many 
use cases involving Q&As, research assistants, and technical outputs.
3. Click **Next** to open the Instructions pane.

## Step 3: Add custom instructions

Instructions define your agent's behavior, personality, and how it should 
approach queries. Custom instructions give you full control over the agent's 
responses. You can use our recommended instructions, or you can choose your 
own.

1. Click **Use our recommended instructions**.  
   ![Create agent instructions 1](/img/use-recommended-instructions.png)  
2. Click **Next** to move to the Tools configuration.

## Step 4: Add and configure the Web Search tool

Tools extend your agent's capabilities beyond its base knowledge. Proper tool configuration helps the agent understand when and how to use the tool effectively.

1. Click **Add first tool**.
   ![Create agent tools 1](/img/create-agent-tools-1.png)  
2. Select **Web Search**.  
   ![Create agent tools 2](/img/create-agent-tools-2.png)
3. Enter **web_search** as the Name and provide a description for this tool:

   _The web search tool that find up to date information from trustworthy sources 
   and returns concise summaries with links. Use when a query needs current 
   facts external references or verification beyond internal knowledge. Prefer 
   authoritative sites such as documentation government and academic pages and 
   avoid low quality or speculative content._

4. Specify a `limit` of `10` results. You can learn more about the 
   other options such as query, exclude domains, and include domains in the 
   [API Reference](/docs/rest-api/create-agent).

   ![Create agent tools 3](/img/web-search-tool.png)

5. Click **Next** to move to the Advanced options pane.

## Step 5: Add metadata

Metadata helps you organize and categorize agents, making them easier to find and manage as your agent library grows.

This final step of the wizard lets you add metadata to help organize your 
agent.

1. Add a **Research** category and **version**.  
  ![Create agent tools 5](/img/create-agent-tools-5.png)  
  With all configurations complete, you can now create your agent and 
  test it in the Console chat interface.
2. Click **Create agent**.

## Step 6: Create and test the agent

After you finish the wizard, you get a message that the agent was created 
successfully and you can now chat with your agent.

TBD screenshots

## Create an agent with the API

Alternatively, you can create the same agent with the [Create Agent API](/docs/agents/create-agent-examples).

Read on to learn how to craft custom instructions and tools.
