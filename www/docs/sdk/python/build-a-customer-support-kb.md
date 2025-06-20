---
id: customer-support-kb
title: Build a Customer Support Knowledge Base with Vectara
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Suppose your company wants to power a next-gen support assistant that can instantly answer customer questions using all your help center articles, troubleshooting guides, and product FAQs. Here’s how you can build this with Vectara’s Python SDK in 2025:

## 1. Configure Authentication Profile

First, set up your credentials in a named profile.
This allows your support automation to securely connect to Vectara with the right permissions.

<CodePanel
  title="Configure Authentication Profile"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.utils import LabHelper
LabHelper.setup_authentication()` }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Stores credentials in .vec_auth.yaml for profile-based access.' }
    ]
  }}
  layout="stacked"
/>



## 2. Create Client Using Profile

Now, create a Vectara client using your profile credentials.
This client will be used for all following operations with your support knowledge base.

<CodePanel
  title="Create Client Using Profile"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.factory import Factory

client = Factory(profile="customer-support-prod").build()` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Use the named profile for secure, consistent credential management.' }
    ]
  }}
  layout="stacked"
/>




## 3. Create a Support Knowledge Base (Corpus)
Create a new corpus for your support knowledge base—think of it as the database for all support content.


<CodePanel
  title="Create Support Knowledge Base"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.managers import CreateCorpusRequest

request = CreateCorpusRequest(
    name="Acme Support KB",
    key="acme-support-kb"
)
corpus = client.lab_helper.create_lab_corpus(request)
corpus_key = corpus.key
print(f"Created support KB with key: {corpus_key}")` }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Give your corpus a clear, unique name and key.' }
    ]
  }}
  layout="stacked"
/>



## 4. Upload a Support Guide (Structured Doc)

Add a full-length support guide or onboarding manual to your knowledge base.
Vectara will automatically chunk the document for semantic search.

<CodePanel
  title="Upload Support Guide"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.types import StructuredDocument

guide_text = open("reset_thermostat_guide.txt", "r", encoding="utf-8").read()
request = StructuredDocument.parse_obj({
   "id": "reset_thermostat_guide",
   "type": "structured",
   "title": "Smart Thermostat Reset Guide",
   "description": "Step-by-step instructions for agents and customers.",
   "sections": [
       { "text": guide_text }
   ]
})

response = client.documents.create(corpus_key, request=request)` }
  ]}
  annotations={{
    python: [
      { line: 8, text: 'Provide title/description for better search.' },
      { line: 13, text: 'Index the entire guide at once.' }
    ]
  }}
  layout="stacked"
/>


## 5. Upload a Product FAQ (Core Doc with Metadata)

Index frequently asked questions and troubleshooting steps, each with targeted metadata for smarter answers.

<CodePanel
  title="Upload Product FAQ"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.types import CoreDocument, CoreDocumentPart

faq_parts = [
    CoreDocumentPart(
        text="E1 error: Reset device and check WiFi.",
        metadata={"error_code": "E1", "section": "troubleshooting"}
    ),
    CoreDocumentPart(
        text="App not connecting: Reinstall app, check permissions.",
        metadata={"issue": "app_connection"}
    )
]

core_document = CoreDocument(
    id="troubleshooting-faq-2025",
    type="core",
    document_parts=faq_parts,
    metadata={"product": "smart-thermostat"}
)

response = client.documents.create(corpus_key, request=core_document)` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Segment and tag each FAQ for precision answers.' }
    ]
  }}
  layout="stacked"
/>


## 6. Upload a PDF Manual
Quickly add a user manual, compliance doc, or other file to your knowledge base.
This lets support agents instantly search and reference new docs as soon as they’re published.

<CodePanel
  title="Upload Product Manual"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `upload_manager = client.upload_manager
upload_manager.upload(corpus_key, "SmartThermostat_UserGuide_2025.pdf")` }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Make product manuals instantly discoverable.' }
    ]
  }}
  layout="stacked"
/>


## 7. Query the Knowledge Base

Ask a question and get the most relevant answer from your support corpus—perfect for chatbot integration or agent assist.


<CodePanel
  title="Query the Support Knowledge Base"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `query = "How do I reset my smart thermostat?"
query_response = client.corpora.query(corpus_key, query=query)
print(query_response)` }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Fetches instant answers from the support corpus.' }
    ]
  }}
  layout="stacked"
/>


## 8. Advanced Query for Escalated Cases
Fine-tune the search and generation parameters to support advanced troubleshooting, regulatory responses, or edge-case queries.


<CodePanel
  title="Advanced Support Query"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.corpora.types import SearchCorpusParameters
from vectara.types import GenerationParameters

generation = GenerationParameters.parse_obj({
    "generation_preset_name": "cs-support-summary-v1.4",
    "max_used_search_results": 7,
    "max_response_characters": 400,
    "response_language": "auto"
})

search_corpus = SearchCorpusParameters.parse_obj({
    "lexical_interpolation": 0.03,
    "semantics": "default",
    "offset": 0,
    "limit": 10,
    "reranker": {
        "type": "customer_reranker",
        "reranker_id": "rnk_5555000111"
    },
    "context_configuration": {
        "characters_before": 40,
        "characters_after": 40,
        "start_tag": "<b>",
        "end_tag": "</b>"
    },
})

query_response = client.corpora.query(
    corpus_key,
    query="What should I do if the app keeps crashing?",
    search=search_corpus,
    generation=generation
)
print(query_response)` }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Tune generation for detailed, case-specific answers.' },
      { line: 29, text: 'Advanced search for escalations or complex questions.' }
    ]
  }}
  layout="stacked"
/>


## 9. List All Support Documents
List all documents currently indexed in your support knowledge base—ideal for audits, identifying outdated docs, or managing knowledge coverage.


<CodePanel
  title="List All Support Documents"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `client.documents.list(corpus_key)` }
  ]}
  annotations={{
    python: [
      { line: 1, text: 'Inventory all support docs for audit or review.' }
    ]
  }}
  layout="stacked"
/>


