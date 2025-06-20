---
id: customer-support-kb
title: Build a Customer Support Knowledge Base with Vectara

---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

In this tutorial, you want to power a support assistant that can instantly 
answer customer questions using all your help center articles, troubleshooting 
guides, and product FAQs. Here’s how you can build this the Vectara’s Python SDK:

## 1. Configure Authentication Profile

First, set up your credentials in a named profile.
This allows your support automation to securely connect to Vectara with the 
right permissions.

<CodePanel
  title="Configure Authentication Profile"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.utils import LabHelper
try:
    LabHelper.setup_authentication()
except Exception as e:
    print(f"Authentication setup failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 2, text: 'Stores credentials in .vec_auth.yaml for profile-based access.' },
    { line: 3, text: 'Handles potential errors during credential setup.' }
    ]
  }}
  layout="stacked"
/>

## 2. Create Client Using Profile

Now, create a Vectara client using your profile credentials.
This client will be used for all following operations with your support 
knowledge base.

<CodePanel
  title="Create Client Using Profile"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.factory import Factory
try:
    client = Factory(profile="customer-support-prod").build()
except Exception as e:
    print(f"Client creation failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 3, text: 'Use the named profile for secure, consistent credential management.' },
    { line: 4, text: 'Handles errors if profile is invalid or missing.' }
    ]
  }}
  layout="stacked"
/>

## 3. Create a support kb corpus

Create a new corpus for your support knowledge base. This is the data store 
for all support content.

<CodePanel
  title="Create Support Knowledge Base"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara import VectaraClient
try:
    client = VectaraClient(api_key="z123456789", customer_id="paul_woz")
    corpus = client.corpora.create(key="acme-support-kb", name="Enterprise Support KB")
    corpus_key = corpus.key
    print(f"Created support KB with key: {corpus_key}")
except Exception as e:
    print(f"Corpus creation failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 4, text: 'Give your corpus a clear, unique name and key.' },
    { line: 6, text: 'Handles errors like duplicate keys or permission issues.' }
   ]
  }}
  layout="stacked"
/>

## 4. Upload a support guide (structured document)

Add a full-length support guide or onboarding manual to your knowledge base. 
Vectara chunks the document automatically for semantic search.

<CodePanel
  title="Upload Support Guide"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.types import StructuredDocument
try:
    with open("reset_thermostat_guide.txt", "r", encoding="utf-8") as f:
        guide_text = f.read()
    request = StructuredDocument.parse_obj({
        "id": "reset_thermostat_guide",
        "type": "structured",
        "title": "Smart Thermostat Reset Guide",
        "description": "Step-by-step instructions for agents and customers.",
        "sections": [{"text": guide_text}]
    })
    response = client.documents.create(corpus_key, request=request)
    print(f"Uploaded guide with ID: {response.id}")
except Exception as e:
    print(f"Guide upload failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 7, text: 'Provide title/description for better search relevance.' },
    { line: 12, text: 'Index the entire guide at once; handles chunking.' },
    { line: 14, text: 'Catches file I/O or indexing errors.' }
  ]
  }}
  layout="stacked"
/>

## 5. Upload a product FAQ (core document with metadata)

Index frequently asked questions and troubleshooting steps, 
each with targeted metadata for smarter answers.

<CodePanel
  title="Upload Product FAQ"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.types import CoreDocument, CoreDocumentPart
try:
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
    response = client.documents.create(corpus_key, request=core_document)
    print(f"Uploaded FAQ with ID: {response.id}")
except Exception as e:
    print(f"FAQ upload failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 6, text: 'Segment and tag each FAQ for precision answers.' },
    { line: 16, text: 'Catches errors like duplicate IDs or indexing issues.' }
  ]
  }}
  layout="stacked"
/>

## 6. Upload a PDF

Quickly add a user manual, compliance doc, or other file to your knowledge 
base.
This lets support agents instantly search and reference new docs as soon as 
they are published.

<CodePanel
  title="Upload Product Manual"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.core import File
try:
    upload_manager = client.upload_manager
    response = upload_manager.file(corpus_key, file=File("SmartThermostat_UserGuide_2025.pdf"))
    print(f"Uploaded manual with ID: {response.id}")
except Exception as e:
    print(f"Manual upload failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 4, text: 'Make product manuals instantly discoverable via File.' },
    { line: 5, text: 'Catches file not found or upload errors.' }
  ]
  }}
  layout="stacked"
/>

NUpdated to use `upload_manager.file()` with `core.File` for SDK compliance.

## 7. Query the Knowledge Base

Ask a question and get the most relevant answer from your support 
corpus—perfect for chatbot integration or agent assist.

<CodePanel
  title="Query the Support Knowledge Base"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.types import SearchCorporaParameters, KeyedSearchCorpus
try:
    query = "How do I reset my smart thermostat?"
    search_params = SearchCorporaParameters(corpora=[KeyedSearchCorpus(corpus_key=corpus_key)])
    query_response = client.queries.query(query=query, search=search_params)
    print(query_response)
except Exception as e:
    print(f"Query failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 4, text: 'Defines a sample support question.' },
    { line: 5, text: 'Configures search for the specific corpus.' },
    { line: 6, text: 'Fetches instant answers; handles query errors.' }
  ]
  }}
  layout="stacked"
/>

## 8. Advanced query for escalated cases

Fine-tune the search and generation parameters to support advanced 
troubleshooting, regulatory responses, or edge-case queries.

<CodePanel
  title="Advanced Support Query"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.corpora.types import SearchCorpusParameters
from vectara.types import GenerationParameters
try:
    generation = GenerationParameters.parse_obj({
        "generation_preset_name": "mockingbird-2.0",
        "max_used_search_results": 7,
        "response_language": "auto"
    })
    search_corpus = SearchCorpusParameters.parse_obj({
        "lexical_interpolation": 0.005,
        "semantics": "default",
        "limit": 50,
        "reranker": {
            "type": "customer_reranker",
            "reranker_name": "Rerank_Multilingual_v1"
        },
        "context_configuration": {
            "sentences_before": 2,
            "sentences_after": 2,
            "start_tag": "<b>",
            "end_tag": "</b>"
        }
    })
    query_response = client.queries.query(
        corpus_key=corpus_key,
        query="What should I do if the app keeps crashing?",
        search=search_corpus,
        generation=generation
    )
    print(query_response)
except Exception as e:
    print(f"Advanced query failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 6, text: 'Tune generation for detailed, case-specific answers.' },
    { line: 21, text: 'Advanced search for escalations or complex questions.' },
    { line: 26, text: 'Catches errors in query execution.' }
  ]
  }}
  layout="stacked"
/>

## 9. List all support documents

List all documents currently indexed in your support knowledge base—ideal for 
audits, identifying outdated docs, or managing knowledge coverage.

<CodePanel
  title="List All Support Documents"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    documents = client.documents.list(corpus_key, limit=10)
    for doc in documents:
        print(f"Document ID: {doc.id}, Title: {doc.title}")
except Exception as e:
    print(f"Document listing failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 3, text: 'Inventory all support docs with a 10-document limit.' },
    { line: 4, text: 'Displays document IDs and titles for review.' },
    { line: 5, text: 'Handles errors like invalid corpus key.' }
  ]
  }}
  layout="stacked"
/>

