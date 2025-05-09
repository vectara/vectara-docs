---
id: changelog
slug: /changelog
title: Vectara Documentation Changelog
sidebar_label: Documentation Changelog
---

import { Grid } from "@site/src/components/ui/Grid";
import { Spacer } from "@site/src/components/ui/Spacer";
import { TopicButton } from "@site/src/components/ui/TopicButton";


---

# May 2025

### ✨ New Features
- Add documentation for the List Hallucination Correctors API (#453)
- Add documentation for the tech preview of the Vectara Hallucination Corrector (#442)
- Add documentation for Table Summarization with Custom Prompts (#436)

### 📚 API Changes
- Add Hallucination Correctors endpoint to the API Reference (#454)

### 📝 Documentation Changes
- No changes

### 📋 Example Updates
- No changes

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# April 2025

### ✨ New Features
- Add documentation for the Chat Completions API (#446)
- Add documentation for the Evaluate Factual Consistency (HHEM) API (#445)
- Add documentation for Mockingbird 2 (#439)
- Add documentation to define a custom LLM configuration to use models from OpenAI, Anthropic, and Google (#437)

### 📚 API Changes
- Add the Evaluate Factual Consistency API and the Chat Completions API to the API Reference (#444)

### 📝 Documentation Changes
- Expand Authentication section with new guides on enterprise access patterns, organizational role scoping, and authorization workflows (#426)

### 📋 Example Updates
- No changes

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- Refine design of heading styles (#450)
- Install Mermaid for creating diagrams (#443)
- Update package.json with API documentation build script (#438)
- Upgrade Docusaurus Platform from 2.4.3 to 3.7 (#422)



---

# March 2025

### ✨ New Features
- Add documentation for the tech preview of the Expanded Encoder Management (#425)
- Add documentation for the tech preview of the expanded LLM Management APIs (#420)
- Add content for new integration between Vectara and Confluent (#414)

### 📚 API Changes
- Add List Table Extractors and Get OAuth Token to the API Reference (#430)
- Add the Delete LLM API, Get LLM API, and Create Encoder API and Chunking Strategy to the API Reference  (#423)

### 📝 Documentation Changes
- Update Encoder parameters (#433)
- Clarify that filterable metadata fields are not encrypted (#427)
- Update content and screenshots for the File Upload UI, the Documents UI, and the Query UI (#421)
- Update model_parameters with new llm_name parameter in the advanced summarization options (#419)

### 📋 Example Updates
- Update Encoder examples (#431)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# February 2025

### ✨ New Features
- Add documentation for the tech preview of Integrating External LLMs (#413)
- Add documentation for the tech preview of Document Summarization (#412)
- Add documentation for the tech preview of Intelligent Query Rewriting (#408)

### 📚 API Changes
- Add the Summarize Document API, Create LLM API, and Compute Corpus Size API to the API Reference (#417)

### 📝 Documentation Changes
- Update UI steps on how to reset or delete the corpus (#404)

### 📋 Example Updates
- No changes

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# January 2025

### ✨ New Features
- Updated to enable Typescript SDK (#393)
- Update HHEM documentation for HHME-2.2 (#379)
- Add documentation for the new Knee Reranking feature (#378)
- Add new HHEM supported languages and some content enhancements (#352)

### 📚 API Changes
- Uploading JSON in API v2 (#394)

### 📝 Documentation Changes
- Improve Getting Started section layout (#396)
- Uploading JSON in API v2 (#394)
- Fix broken links in generative prompts (#391)
- Fix encoder example with correct value (#388)
- Add documentation changelog workflow (#385)
- Fix OAuth2 URL and update screenshot (#384)
- Add a dedicated changelog for documentation updates, API enhancements and bug fixes (#383)
- Add HHEM 2.2 enhancements to Release Notes (#381)
- Add new HHEM supported languages and some content enhancements (#352)

### 📋 Example Updates
- Fix encoder example with correct value (#388)

### 🗑 Deprecated
- Uploading JSON in API v2 (#394)

### 🛠 Documentation Platform Updates
- Update Doc Changelog workflow action (#386)



---

# December 2024

### ✨ New Features
- Add documentation for the new Update and Replace Metadata API Definitions (#371)
- Add documentation for the querying table data feature (#365)
- Add query observability feature to docs (#362)
- Add documentation for new chunking strategy parameter (#361)

### 📚 API Changes
- Add documentation for the new Update and Replace Metadata API Definitions (#371)
- Add API Reference updates for the new tabular data extraction feature (#366)
- Add documentation for the querying table data feature (#365)
- Add query observability feature to docs (#362)

### 📝 Documentation Changes
- Improve information architecture of the Capabilities section and metadata content (#374)
- Update table extract details (#370)
- Update table_extraction_config parameter (#369)
- Fix link to the table data blog in release notes (#368)
- Userfn example supports traditional if statement (#367)
- Add documentation for the querying table data feature (#365)
- Add documentation for new chunking strategy parameter (#361)

### 📋 Example Updates
- Userfn example supports traditional if statement (#367)

### 🗑 Deprecated
- Add API v1 deprecation notices (#375)

### 🛠 Documentation Platform Updates
- No changes



---

# November 2024

### ✨ New Features
- Add chunking strategy and update descriptions (#351)

### 📚 API Changes
- Add chunking strategy and update descriptions (#351)

### 📝 Documentation Changes
- Update how metadata structuring is handled in API v2 (#358)
- Update descriptions for Pro and Enterprise (#356)
- update `fern.config.json` and `generators.yml` to use latest version. (#355)
- Enhance the list of Vectara demos and applications (#354)
- Move Reranking subsection (#353)
- Add chunking strategy and update descriptions (#351)

### 📋 Example Updates
- No changes

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# October 2024

### ✨ New Features
- Reflect product transition to free trial across documentation (#350)
- Add new Integrations section that highlights community collaborations and partnerships (#346)

### 📚 API Changes
- Reflect product transition to free trial across documentation (#350)
- updated introduction with proper links (#338)
- Get number of documents and document parts (#332)
- Add search cutoffs, null handing, and refresh API reference (#331)

### 📝 Documentation Changes
- Reflect product transition to free trial across documentation (#350)
- Incorrect syntax in the null score usage chain example (#349)
- Correct udf page misspelling. (#348)
- Add new Integrations section that highlights community collaborations and partnerships (#346)
- Update docs for handling filenames with non-ASCII characters in API v2 (#345)
- Add Release Notes to the docs (#344)
- Upgrade OpenAPI docs theme. (#340)
- Add Video Tutorials section. (#334)
- Get number of documents and document parts (#332)
- Add search cutoffs, null handing, and refresh API reference (#331)
- Update Chain Reranker topic about the array and examples (#330)

### 📋 Example Updates
- Incorrect syntax in the null score usage chain example (#349)
- ✨ Add query snippet example (#342)
- Update Chain Reranker topic about the array and examples (#330)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# September 2024

### ✨ New Features
- Add Chain Reranker content (#320)

### 📚 API Changes
- Add request timeouts in docs (#326)
- Update corpus API documentation (#324)
- Add Chain Reranker content (#320)
- Add Generation Presets content to docs (#318)

### 📝 Documentation Changes
- Update corpus API documentation (#324)
- Add more UDF examples (#323)
- Update Quick Start (#322)
- Add name and description to Update Corpus (#319)
- Add Generation Presets content to docs (#318)
- Update metadata filter topics (#312)
- Update prompt syntax (#283)
- Update custom prompt topics with Query endpoint details and links (#276)

### 📋 Example Updates
- Add more UDF examples (#323)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# August 2024

### ✨ New Features
- Add User Defined Functions Reranker content (#314)

### 📚 API Changes
- Update query order and labels (#310)

### 📝 Documentation Changes
- Improve grpc example for UDF (#317)
- Add User Defined Functions Reranker content (#314)
- Update introductions to topics in Getting Started and Capabilities (#313)
- Update query order and labels (#310)

### 📋 Example Updates
- Improve grpc example for UDF (#317)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# July 2024

### ✨ New Features
- Add and update topics for Mockingbird (#308)
- Add GPT 4o to list of summarizers (#303)

### 📚 API Changes
- Wrap tabs in API reference so they don't get clipped. (#301)

### 📝 Documentation Changes
- Add note about original BM25 (#309)
- Update corpus key and file upload content (#306)
- Wrap tabs in API reference so they don't get clipped. (#301)
- Fix typos and update screenshots (#299)
- Update part.is_title field description (#216)

### 📋 Example Updates
- Update part.is_title field description (#216)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# June 2024

### ✨ New Features
- Add new REST API v2 specifications to the documentation (#250)

### 📚 API Changes
- Rename API Playground references to API Reference. (#295)
- Update API v2 migration guide (#294)
- Put generation_end into the reference. (#291)
- Re-enable accordion transition in API playground, to fix bug in which content height wasn't updated correctly (#287)

### 📝 Documentation Changes
- Fix oauth examples. (#300)
- Update API v2 download URL (#298)
- Fix typos in spec. (#296)
- Rename API Playground references to API Reference. (#295)
- Change nav from API Playground -> API Reference. (#293)
- Fix tips in query endpoint (#288)
- Re-enable accordion transition in API playground, to fix bug in which content height wasn't updated correctly (#287)
- Fix link to Reranking blog (#286)
- Add new REST API v2 specifications to the documentation (#250)

### 📋 Example Updates
- Fix oauth examples. (#300)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# May 2024

### ✨ New Features
- Update Reranker topic with the new Vectara Multilingual Reranker v1 (#281)
- Add citation summary feature content (#277)

### 📚 API Changes
- No changes

### 📝 Documentation Changes
- Fix query body request (#285)
- Point ReactSearch to updated reranker (#280)
- Update citation section (#279)
- Fix reranking link (#278)
- Add examples for functions and operations (#275)
- Add summarized search (#274)
- Update Information Architecture with new sections for Capabilities and Use Cases (#259)

### 📋 Example Updates
- No changes

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# April 2024

### ✨ New Features
- Add docs for stream concatenation, React-Chatbot, and Stream-Query-Client (#260)
- Add Stream Query to the API Playground (#257)
- Add new Stream Query API Definition content (#256)

### 📚 API Changes
- Improve List Conversations API parameter descriptions (#266)
- Improve prompt examples in query, and update the enable api key and file upload endpoints (#265)
- Update prompts to use single-quote in examples (#264)
- Update Create Corpus default example (#262)
- Fix values in the query body endpoint (#258)
- Add Stream Query to the API Playground (#257)

### 📝 Documentation Changes
- Improve List Conversations API parameter descriptions (#266)
- Improve prompt examples in query, and update the enable api key and file upload endpoints (#265)
- Add context configuration to Query and Highlighting topics (#261)
- Fix values in the query body endpoint (#258)

### 📋 Example Updates
- Improve prompt examples in query, and update the enable api key and file upload endpoints (#265)
- Update prompts to use single-quote in examples (#264)
- Update Create Corpus default example (#262)
- Add context configuration to Query and Highlighting topics (#261)
- Fix values in the query body endpoint (#258)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# March 2024

### ✨ New Features
- Update the API Playground with Factual Consistency Score (#254)
- Add content about the new Factual Consistency Score (#252)

### 📚 API Changes
- Update Playground example for FCS (#255)
- Update the API Playground with Factual Consistency Score (#254)
- Update API References examples for Query, Indexing, and API Keys (#251)
- Update Query example in API Playground (#247)
- Update API Reference examples for consistency (#240)

### 📝 Documentation Changes
- Update file formats and document structuring (#253)
- Update API Reference examples for consistency (#240)
- Update Chat APIs overview (#237)
- Update API Reference section with improved structure and flow (#231)
- Add Content-Disposition header to set the Document ID (#214)

### 📋 Example Updates
- Update Playground example for FCS (#255)
- Update file formats and document structuring (#253)
- Add content about the new Factual Consistency Score (#252)
- Update API References examples for Query, Indexing, and API Keys (#251)
- Update Query example in API Playground (#247)
- Update API Reference examples for consistency (#240)
- Add Content-Disposition header to set the Document ID (#214)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# February 2024

### ✨ New Features
- Add Generative Prompts section (#238)
- Add documentation for the new Vectara Chat (#235)
- Add documentation for the Personal API Key, Index, and Query Keys (#233)

### 📚 API Changes
- Add custom prompts to Query (#239)
- Update the API Playground for Chat APIs (#236)
- Add documentation for the new Vectara Chat (#235)
- Update API Playground for the Personal API Keys (#234)

### 📝 Documentation Changes
- Add Generative Prompts section (#238)
- Update the API Playground for Chat APIs (#236)
- Add documentation for the Personal API Key, Index, and Query Keys (#233)
- Update console and corpus content around account and corpus creation (#224)

### 📋 Example Updates
- Add custom prompts to Query (#239)
- Add documentation for the new Vectara Chat (#235)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# January 2024

### ✨ New Features
- Add Create-UI and refine copy and layout of Build Apps landing page (#230)
- Add Get Usage Metrics to API Playground (#226)
- Add List Documents content to Console and API Reference (#218)
- Add Account and Corpus Management APIs to Playground (#217)
- Add Read Corpus and Update Corpus Enablement topics (#211)

### 📚 API Changes
- Add Get Usage Metrics to API Playground (#226)
- Update File Upload API specs (#220)
- Add List Documents to API Playground (#219)
- Add List Documents content to Console and API Reference (#218)
- Add Account and Corpus Management APIs to Playground (#217)
- Add Read Corpus and Update Corpus Enablement topics (#211)

### 📝 Documentation Changes
- Add Create-UI and refine copy and layout of Build Apps landing page (#230)
- Add Build Applications section (#229)
- Update banner with Airbyte partnership information (#225)
- Update File Upload API specs (#220)
- Fix reranker URL and update search topic with new formatting (#213)
- Improve the Index API Definition content (#208)

### 📋 Example Updates
- Update List Documents response example (#221)
- Add Read Corpus and Update Corpus Enablement topics (#211)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- No changes



---

# December 2023

### ✨ New Features
- Add Manager User and List Users to API Playground (#206)
- Add List Users and Manage Users topics (#204)
- create, delete, enable, list API keys (#201)

### 📚 API Changes
- No changes

### 📝 Documentation Changes
- Fix Q&A redirect (#209)
- Indexing documentation is out of date. (#205)
- Migrate from data store term to corpus. (#203)
- Add API Keys topics to API Reference (#195)
- Improve Information Architecture and update several examples (#193)
- Add MMR to the Reranking topic (#191)
- Add content about Data Ingestion (#188)
- Add content about the Index Request Headers (#187)
- Updated content about the English and MMR rerankers (#185)

### 📋 Example Updates
- Improve Information Architecture and update several examples (#193)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- Support deep-linking to a search. (#200)
- Support search on narrower screens (e.g. mobile) (#197)



---

# November 2023

### ✨ New Features
- Add update filter attributes and list jobs to the OpenAPI spec (#176)

### 📚 API Changes
- No changes

### 📝 Documentation Changes
- Update banner for the new metadata filtering capability (#182)
- Add update filter attributes and list jobs to the OpenAPI spec (#176)
- Add content about structuring document data (#155)
- Update Code Samples with specific category for Query Operations (#151)
- Update Quick Start with steps, field names, and screenshots (#149)
- Add the grpc-timeout option in header to several topics (#148)

### 📋 Example Updates
- Update Code Samples with specific category for Query Operations (#151)

### 🗑 Deprecated
- No changes

### 🛠 Documentation Platform Updates
- Customize Not Found page. (#184)
- Make search more prominent. (#183)
- Add a console button to the navigation bar (#168)
- Update search with Ctrl-K shortcut. (#164)
- Ensure rendering a single instance of search (#163)
- Fix rendering of API Playground code in dark mode. (#159)
- Add TopicButton, Grid, and Spacer components. (#147)

