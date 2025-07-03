---
id: customer-support-kb
title: Build a Customer Support Knowledge Base with Vectara
sidebar_label: Build a Customer Support Knowledge Base 
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

In this tutorial, you'll build a powerful support assistant that can instantly 
answer customer questions using your help center articles, troubleshooting 
guides, and product FAQs. Learn how to create, populate, and query a customer 
support knowledge base using the Vectara Python SDK.

## 1. Set up authentication and client

First, initialize your Vectara client with API credentials. This client will 
handle all operations with your support knowledge base.

<CodePanel
  title="Initialize Vectara Client"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara import Vectara
from vectara.core.api_error import ApiError

try:
    # Initialize client with your API key
    client = Vectara(api_key="YOUR_API_KEY")
    print("✅ Client initialized successfully")
except Exception as e:
    print(f"❌ Client initialization failed: {e}")` }
  ]}
  annotations={{
    python: [
    { line: 5, text: 'Use your actual Vectara API key for authentication' },
    { line: 7, text: 'Import ApiError for proper exception handling' }
    ]
  }}
  layout="stacked"
/>

:::tip API Key Setup
Get your API key from the [Vectara Console](https://console.vectara.com/). Store it securely and never commit it to version control.
:::

## 2. Create a support knowledge base corpus

Create a dedicated corpus for your customer support content. This will store 
all your help articles, FAQs, and troubleshooting guides.

<CodePanel
  title="Create Support Knowledge Base"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara.managers import CreateCorpusRequest

try:
    # Create corpus for support knowledge base
    corpus_request = CreateCorpusRequest(
        key="customer-support-kb",
        name="Customer Support Knowledge Base",
        description="Help articles, FAQs, and troubleshooting guides for customer support team"
    )
    
    corpus = client.corpora.create(request=corpus_request)
    corpus_key = corpus.key
    print(f"✅ Created support KB with key: {corpus_key}")
    
except ApiError as e:
    if e.status_code == 409:
        print("📝 Corpus already exists, using existing corpus")
        corpus_key = "customer-support-kb"
    else:
        print(f"❌ Corpus creation failed: {e.status_code} - {e.body}")` }
  ]}
  annotations={{
    python: [
    { line: 5, text: 'Use a descriptive key and name for easy identification' },
    { line: 13, text: 'Handle duplicate corpus creation gracefully' },
    { line: 16, text: 'Proper error handling for different failure scenarios' }
   ]
  }}
  layout="stacked"
/>

## 3. Upload a comprehensive support guide

Add a detailed troubleshooting guide to your knowledge base. This example 
shows how to structure content for optimal search and retrieval.

<CodePanel
  title="Upload Structured Support Guide"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara import StructuredDocument, StructuredDocumentSection

try:
    # Create structured support guide
    support_guide = StructuredDocument(
        id="smart-thermostat-troubleshooting-2025",
        type="structured",
        metadata={
            "title": "Smart Thermostat Troubleshooting Guide",
            "category": "troubleshooting",
            "product": "smart-thermostat",
            "version": "2025.1",
            "department": "customer-support"
        },
        sections=[
            StructuredDocumentSection(
                title="Common Issues",
                text="""
                Device Not Responding:
                1. Check power connection and ensure device is plugged in
                2. Verify WiFi connection status in device settings
                3. Restart device by holding power button for 10 seconds
                4. If issue persists, contact support with error code E1
                
                Temperature Reading Incorrect:
                1. Calibrate temperature sensor in device settings
                2. Ensure device is not in direct sunlight or near heat sources
                3. Check for firmware updates in the mobile app
                4. Factory reset if calibration doesn't resolve the issue
                """
            ),
            StructuredDocumentSection(
                title="Error Codes",
                text="""
                E1 - Connection Error: Check WiFi settings and restart device
                E2 - Sensor Error: Calibrate temperature sensor or contact support
                E3 - Power Error: Check power adapter and outlet connection
                E4 - Firmware Error: Update firmware through mobile app
                """
            ),
            StructuredDocumentSection(
                title="Warranty and Support",
                text="""
                Warranty Coverage: 2 years from purchase date
                Support Hours: Monday-Friday 8AM-8PM EST, Saturday 9AM-5PM EST
                Contact Methods: Phone: 1-800-SUPPORT, Email: support@company.com
                Replacement Process: Contact support with purchase receipt and error description
                """
            )
        ]
    )
    
    response = client.documents.create(
        corpus_key=corpus_key,
        request=support_guide
    )
    print(f"✅ Uploaded troubleshooting guide: {response.id}")
    
except ApiError as e:
    print(f"❌ Guide upload failed: {e.status_code} - {e.body}")` }
  ]}
  annotations={{
    python: [
    { line: 8, text: 'Add comprehensive metadata for better search filtering' },
    { line: 15, text: 'Structure content in logical sections for precise retrieval' },
    { line: 44, text: 'Use the documents.create() method for indexing' }
  ]
  }}
  layout="stacked"
/>

## 4. Upload targeted FAQ entries

Create FAQ entries with specific metadata for precise answer retrieval. Each 
FAQ item can be tagged with relevant keywords and categories.

<CodePanel
  title="Upload Targeted FAQ Entries"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara import CoreDocument, CoreDocumentPart

try:
    # Create FAQ with targeted parts
    faq_parts = [
        CoreDocumentPart(
            text="To reset your smart thermostat: 1) Press and hold the power button for 10 seconds, 2) Wait for device to restart, 3) Reconfigure WiFi settings through the mobile app, 4) Test temperature control functionality.",
            metadata={
                "question": "How do I reset my smart thermostat?",
                "category": "device-reset",
                "product": "smart-thermostat",
                "difficulty": "easy",
                "estimated_time": "5-minutes"
            }
        ),
        CoreDocumentPart(
            text="If your mobile app won't connect: 1) Force close and restart the app, 2) Check your phone's WiFi connection, 3) Ensure device and phone are on the same network, 4) Clear app cache and data, 5) Reinstall app if problem persists.",
            metadata={
                "question": "Why won't my mobile app connect to the device?",
                "category": "app-connectivity",
                "product": "mobile-app",
                "difficulty": "medium",
                "estimated_time": "10-minutes"
            }
        ),
        CoreDocumentPart(
            text="Temperature readings may be inaccurate due to: sensor calibration drift, direct sunlight exposure, proximity to heat sources, or firmware bugs. Recalibrate in settings menu or contact support for sensor replacement.",
            metadata={
                "question": "Why are my temperature readings wrong?",
                "category": "sensor-issues",
                "product": "smart-thermostat",
                "difficulty": "medium",
                "estimated_time": "15-minutes"
            }
        )
    ]
    
    faq_document = CoreDocument(
        id="smart-thermostat-faq-2025",
        type="core",
        document_parts=faq_parts,
        metadata={
            "title": "Smart Thermostat FAQ",
            "category": "faq",
            "product": "smart-thermostat",
            "last_updated": "2025-01-15"
        }
    )
    
    response = client.documents.create(
        corpus_key=corpus_key,
        request=faq_document
    )
    print(f"✅ Uploaded FAQ entries: {response.id}")
    
except ApiError as e:
    print(f"❌ FAQ upload failed: {e.status_code} - {e.body}")` }
  ]}
  annotations={{
    python: [
    { line: 6, text: 'Create specific FAQ parts with detailed metadata' },
    { line: 12, text: 'Tag each FAQ with difficulty and time estimates' },
    { line: 32, text: 'Use CoreDocument for granular content parts' }
  ]
  }}
  layout="stacked"
/>

## 5. Upload PDF documentation

Add product manuals, installation guides, and compliance documents to your 
knowledge base for comprehensive support coverage.

<CodePanel
  title="Upload PDF Documentation"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    # Upload PDF user manual
    with open("SmartThermostat_UserGuide_2025.pdf", "rb") as f:
        pdf_content = f.read()
    
    response = client.upload.file(
        corpus_key=corpus_key,
        file=pdf_content,
        filename="SmartThermostat_UserGuide_2025.pdf",
        metadata={
            "title": "Smart Thermostat User Guide 2025",
            "document_type": "user-manual",
            "product": "smart-thermostat",
            "version": "2025.1",
            "language": "english",
            "file_size_mb": len(pdf_content) / (1024 * 1024)
        }
    )
    print(f"✅ Uploaded user manual: {response.id}")
    
    # Upload installation guide
    with open("Installation_Guide.pdf", "rb") as f:
        install_content = f.read()
    
    response = client.upload.file(
        corpus_key=corpus_key,
        file=install_content,
        filename="Installation_Guide.pdf",
        metadata={
            "title": "Professional Installation Guide",
            "document_type": "installation-guide",
            "target_audience": "technicians",
            "product": "smart-thermostat"
        }
    )
    print(f"✅ Uploaded installation guide: {response.id}")
    
except FileNotFoundError as e:
    print(f"📁 File not found: {e.filename}")
except ApiError as e:
    print(f"❌ PDF upload failed: {e.status_code} - {e.body}")` }
  ]}
  annotations={{
    python: [
    { line: 5, text: 'Use client.upload.file() for PDF and document uploads' },
    { line: 9, text: 'Add comprehensive metadata for document organization' },
    { line: 32, text: 'Handle file not found errors separately from API errors' }
  ]
  }}
  layout="stacked"
/>

## 6. Query your support knowledge base

Execute support queries to get instant answers from your knowledge base. This 
is perfect for chatbot integration or agent assistance tools.

<CodePanel
  title="Query Support Knowledge Base"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara import SearchCorporaParameters, GenerationParameters

try:
    # Configure search for support queries
    search = SearchCorporaParameters(
        corpora=[{
            "corpus_key": corpus_key,
            "metadata_filter": "doc.category IN ['troubleshooting', 'faq']"
        }],
        context_configuration={
            "sentences_before": 2,
            "sentences_after": 2
        }
    )
    
    # Configure generation for helpful support responses
    generation = GenerationParameters(
        generation_preset_name="vectara-omni-1.0",
        max_used_search_results=10,
        response_language="eng",
        enable_factual_consistency_score=True,
        prompt_template="""
        You are a helpful customer support assistant. Provide clear, step-by-step 
        answers based on the support documentation. If the information provided 
        doesn't fully answer the question, suggest contacting support.
        
        Search results: $vectaraQueryResults
        """
    )
    
    # Execute support query
    query = "How do I reset my smart thermostat?"
    response = client.query(
        query=query,
        search=search,
        generation=generation
    )
    
    print(f"Query: {query}")
    print(f"Answer: {response.answer}")
    print(f"Confidence Score: {response.factual_consistency_score:.3f}")
    
    # Show source information
    print(f"\\nSources ({len(response.search_results)} found):")
    for i, result in enumerate(response.search_results[:3], 1):
        print(f"{i}. Document: {result.document_id}")
        print(f"   Relevance: {result.score:.3f}")
        print(f"   Content: {result.text[:100]}...")
    
except ApiError as e:
    print(f"❌ Query failed: {e.status_code} - {e.body}")` }
  ]}
  annotations={{
    python: [
    { line: 6, text: 'Filter search to relevant support content categories' },
    { line: 17, text: 'Use support-specific prompt template for better responses' },
    { line: 35, text: 'Display confidence score to assess answer quality' }
  ]
  }}
  layout="stacked"
/>

## 7. Advanced support query with escalation handling

Configure advanced parameters for complex support scenarios, including 
escalation cases and technical troubleshooting that requires detailed context.

<CodePanel
  title="Advanced Support Query with Quality Control"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `def advanced_support_query(client, query, corpus_key, min_confidence=0.7):
    """
    Execute support query with quality control and escalation handling
    """
    try:
        # Enhanced search configuration
        search = SearchCorporaParameters(
            corpora=[{
                "corpus_key": corpus_key,
                "metadata_filter": ""  # Search all content for complex issues
            }],
            context_configuration={
                "sentences_before": 3,
                "sentences_after": 3,
                "start_tag": "<relevant>",
                "end_tag": "</relevant>"
            },
            reranker={
                "type": "customer_reranker",
                "reranker_name": "Rerank_Multilingual_v1",
                "limit": 50,
                "cutoff": 0.6
            }
        )
        
        # High-quality generation for complex support cases
        generation = GenerationParameters(
            generation_preset_name="vectara-omni-1.0",
            max_used_search_results=30,
            response_language="eng",
            enable_factual_consistency_score=True,
            max_response_characters=800,
            prompt_template="""
            You are an expert customer support specialist. Provide comprehensive, 
            step-by-step solutions based on the support documentation. 
            
            If the issue appears complex or the available information is insufficient:
            1. Provide what steps you can from the documentation
            2. Clearly state what additional information would be helpful
            3. Suggest escalating to technical support with specific details
            
            Always prioritize customer safety and satisfaction.
            
            Search results: $vectaraQueryResults
            """
        )
        
        response = client.query(
            query=query,
            search=search,
            generation=generation
        )
        
        # Quality control and escalation logic
        confidence = response.factual_consistency_score
        
        if confidence >= min_confidence:
            status = "✅ High-confidence answer"
            escalate = False
        elif confidence >= 0.5:
            status = "⚠️ Medium confidence - verify with documentation"
            escalate = False
        else:
            status = "🚨 Low confidence - escalate to human agent"
            escalate = True
        
        return {
            "query": query,
            "answer": response.answer,
            "confidence": confidence,
            "status": status,
            "escalate": escalate,
            "sources": len(response.search_results),
            "source_details": [
                {
                    "document": result.document_id,
                    "relevance": result.score,
                    "snippet": result.text[:150] + "..."
                }
                for result in response.search_results[:3]
            ]
        }
        
    except ApiError as e:
        return {
            "query": query,
            "error": f"Query failed: {e.status_code} - {e.body}",
            "escalate": True
        }

# Example usage with complex support scenarios
complex_queries = [
    "My thermostat keeps showing E2 error even after sensor calibration",
    "The mobile app crashes when I try to set a schedule",
    "Device worked fine for 6 months but now won't hold temperature settings"
]

print("=== Advanced Support Query Analysis ===")
for query in complex_queries:
    result = advanced_support_query(client, query, corpus_key)
    
    print(f"\\nQuery: {query}")
    print(f"Status: {result.get('status', 'Error')}")
    
    if 'answer' in result:
        print(f"Confidence: {result['confidence']:.3f}")
        print(f"Answer: {result['answer'][:200]}...")
        print(f"Sources: {result['sources']}")
        
        if result['escalate']:
            print("🚨 ESCALATION REQUIRED: Forward to human agent")
        
    elif 'error' in result:
        print(f"Error: {result['error']}")
        print("🚨 SYSTEM ERROR: Escalate to technical support")` }
  ]}
  annotations={{
    python: [
    { line: 6, text: 'Enhanced search with reranking for complex support cases' },
    { line: 26, text: 'Support-specific prompt with escalation guidance' },
    { line: 48, text: 'Quality control logic with confidence-based escalation' },
    { line: 84, text: 'Comprehensive result analysis for support workflow integration' }
  ]
  }}
  layout="stacked"
/>

## 8. Monitor support knowledge base content

Audit and manage your support knowledge base by listing documents, analyzing 
coverage, and identifying content gaps for continuous improvement.

<CodePanel
  title="Support Knowledge Base Management"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `def analyze_support_knowledge_base(client, corpus_key):
    """
    Analyze support knowledge base for content coverage and quality
    """
    try:
        # List all support documents
        documents = client.documents.list(
            corpus_key=corpus_key,
            limit=50
        )
        
        print(f"📊 Support Knowledge Base Analysis")
        print(f"Total Documents: {len(documents)}")
        
        # Analyze document types and categories
        categories = {}
        products = {}
        document_types = {}
        
        for doc in documents:
            metadata = doc.metadata or {}
            
            # Category analysis
            category = metadata.get('category', 'uncategorized')
            categories[category] = categories.get(category, 0) + 1
            
            # Product coverage analysis
            product = metadata.get('product', 'general')
            products[product] = products.get(product, 0) + 1
            
            # Document type analysis
            doc_type = metadata.get('document_type', 'unknown')
            document_types[doc_type] = document_types.get(doc_type, 0) + 1
            
            # Display document details
            print(f"\\n📄 {doc.id}")
            print(f"   Title: {metadata.get('title', 'No title')}")
            print(f"   Category: {category}")
            print(f"   Product: {product}")
            print(f"   Type: {doc_type}")
        
        # Coverage analysis
        print(f"\\n📈 Content Coverage Analysis:")
        print(f"Categories: {dict(categories)}")
        print(f"Products: {dict(products)}")
        print(f"Document Types: {dict(document_types)}")
        
        # Content gap identification
        print(f"\\n🎯 Content Gap Analysis:")
        
        # Check for missing categories
        essential_categories = ['faq', 'troubleshooting', 'installation', 'warranty']
        missing_categories = [cat for cat in essential_categories if cat not in categories]
        if missing_categories:
            print(f"⚠️  Missing Categories: {missing_categories}")
        else:
            print("✅ All essential categories covered")
        
        # Check document freshness
        current_year = "2025"
        outdated_docs = []
        for doc in documents:
            metadata = doc.metadata or {}
            version = metadata.get('version', '')
            if version and current_year not in version:
                outdated_docs.append(doc.id)
        
        if outdated_docs:
            print(f"📅 Potentially Outdated Documents ({len(outdated_docs)}): {outdated_docs[:5]}")
        else:
            print("✅ All documents appear current")
        
        return {
            "total_documents": len(documents),
            "categories": categories,
            "products": products,
            "document_types": document_types,
            "missing_categories": missing_categories,
            "outdated_documents": outdated_docs
        }
        
    except ApiError as e:
        print(f"❌ Analysis failed: {e.status_code} - {e.body}")
        return None

# Run knowledge base analysis
analysis = analyze_support_knowledge_base(client, corpus_key)

if analysis:
    print(f"\\n📋 Summary Recommendations:")
    
    if analysis['missing_categories']:
        print(f"1. Add content for missing categories: {analysis['missing_categories']}")
    
    if analysis['outdated_documents']:
        print(f"2. Update {len(analysis['outdated_documents'])} potentially outdated documents")
    
    if len(analysis['categories']) < 4:
        print("3. Consider expanding content categories for better coverage")
    
    print("4. Regularly review and update support documentation")
    print("5. Monitor query patterns to identify additional content needs")` }
  ]}
  annotations={{
    python: [
    { line: 7, text: 'List all documents with metadata for comprehensive analysis' },
    { line: 40, text: 'Analyze content coverage across categories and products' },
    { line: 47, text: 'Identify missing essential support categories' },
    { line: 75, text: 'Provide actionable recommendations for content improvement' }
  ]
  }}
  layout="stacked"
/>

## 9. Test common support scenarios

Validate your knowledge base with typical customer support scenarios to ensure 
comprehensive coverage and quality responses.

<CodePanel
  title="Support Scenario Testing"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `def test_support_scenarios(client, corpus_key):
    """
    Test common customer support scenarios to validate knowledge base coverage
    """
    test_scenarios = [
        {
            "category": "Device Issues",
            "queries": [
                "My thermostat won't turn on",
                "The device is not responding to temperature changes",
                "I'm getting an E1 error code",
                "The display is blank"
            ]
        },
        {
            "category": "App Problems",
            "queries": [
                "The mobile app won't connect to my device",
                "App keeps crashing when I open it",
                "I can't log into my account",
                "How do I update the app"
            ]
        },
        {
            "category": "Installation Help",
            "queries": [
                "How do I install the thermostat",
                "What tools do I need for installation",
                "Can I install this myself",
                "Do I need professional installation"
            ]
        },
        {
            "category": "Feature Questions",
            "queries": [
                "How do I set up a schedule",
                "Can I control multiple thermostats",
                "What is geofencing and how do I use it",
                "How do I enable vacation mode"
            ]
        }
    ]
    
    print("🧪 Testing Support Knowledge Base Coverage\\n")
    
    overall_results = {
        "total_queries": 0,
        "high_confidence": 0,
        "medium_confidence": 0,
        "low_confidence": 0,
        "category_scores": {}
    }
    
    for scenario in test_scenarios:
        category = scenario["category"]
        print(f"📂 Testing {category}")
        
        category_scores = []
        
        for query in scenario["queries"]:
            try:
                # Quick query for testing
                search = SearchCorporaParameters(
                    corpora=[{"corpus_key": corpus_key}]
                )
                
                generation = GenerationParameters(
                    generation_preset_name="vectara-omni-1.0",
                    max_used_search_results=15,
                    enable_factual_consistency_score=True,
                    response_language="eng"
                )
                
                response = client.query(
                    query=query,
                    search=search,
                    generation=generation
                )
                
                score = response.factual_consistency_score
                category_scores.append(score)
                overall_results["total_queries"] += 1
                
                # Categorize confidence levels
                if score >= 0.8:
                    confidence = "🟢 High"
                    overall_results["high_confidence"] += 1
                elif score >= 0.6:
                    confidence = "🟡 Medium"
                    overall_results["medium_confidence"] += 1
                else:
                    confidence = "🔴 Low"
                    overall_results["low_confidence"] += 1
                
                print(f"   {confidence} ({score:.2f}) - {query}")
                
            except ApiError as e:
                print(f"   ❌ Error - {query}: {e.status_code}")
                category_scores.append(0.0)
        
        # Calculate category average
        if category_scores:
            avg_score = sum(category_scores) / len(category_scores)
            overall_results["category_scores"][category] = avg_score
            print(f"   📊 {category} Average: {avg_score:.3f}\\n")
    
    # Overall assessment
    print("📈 Overall Knowledge Base Assessment:")
    print(f"Total Queries Tested: {overall_results['total_queries']}")
    print(f"High Confidence (≥0.8): {overall_results['high_confidence']} ({overall_results['high_confidence']/overall_results['total_queries']*100:.1f}%)")
    print(f"Medium Confidence (0.6-0.8): {overall_results['medium_confidence']} ({overall_results['medium_confidence']/overall_results['total_queries']*100:.1f}%)")
    print(f"Low Confidence (<0.6): {overall_results['low_confidence']} ({overall_results['low_confidence']/overall_results['total_queries']*100:.1f}%)")
    
    # Category performance
    print(f"\\n📊 Category Performance:")
    for category, score in overall_results["category_scores"].items():
        status = "🟢" if score >= 0.8 else "🟡" if score >= 0.6 else "🔴"
        print(f"{status} {category}: {score:.3f}")
    
    # Recommendations
    print(f"\\n💡 Recommendations:")
    
    low_confidence_rate = overall_results['low_confidence'] / overall_results['total_queries']
    if low_confidence_rate > 0.2:
        print("1. 🚨 High rate of low-confidence responses - review and expand content")
    
    weak_categories = [cat for cat, score in overall_results["category_scores"].items() if score < 0.7]
    if weak_categories:
        print(f"2. 📚 Strengthen content in: {', '.join(weak_categories)}")
    
    if overall_results['high_confidence'] / overall_results['total_queries'] > 0.8:
        print("3. ✅ Excellent knowledge base coverage - maintain and update regularly")
    
    return overall_results

# Run comprehensive testing
test_results = test_support_scenarios(client, corpus_key)` }
  ]}
  annotations={{
    python: [
    { line: 8, text: 'Define comprehensive test scenarios covering common support cases' },
    { line: 58, text: 'Execute queries and measure factual consistency scores' },
    { line: 85, text: 'Generate detailed performance assessment and recommendations' }
  ]
  }}
  layout="stacked"
/>

## Best practices for support knowledge bases

**Content Organization:**
- **Structured Sections**: Use clear titles and logical content hierarchy
- **Targeted Metadata**: Tag content with categories, products, and difficulty levels
- **Regular Updates**: Keep documentation current with product versions

**Query Optimization:**
- **Factual Consistency**: Always enable scoring to monitor response quality
- **Context Filtering**: Use metadata filters to focus searches on relevant content
- **Quality Thresholds**: Set confidence thresholds for escalation workflows

**Production Deployment:**
- **Error Handling**: Implement comprehensive exception handling for reliability
- **Monitoring**: Track query patterns and response quality over time
- **Escalation**: Define clear workflows for low-confidence responses

**Content Management:**
- **Coverage Analysis**: Regularly audit content gaps and categories
- **Performance Testing**: Validate responses against common support scenarios
- **Version Control**: Track document versions and update schedules

---

## Next steps

After building your support knowledge base:

- **Integration**: Connect to your existing support tools and chatbot platforms
- **Analytics**: Monitor query patterns to identify content improvement opportunities
- **Automation**: Implement automated content updates from your documentation system
- **Training**: Train your support team on leveraging the knowledge base effectively

For advanced features, explore [Multi-Corpus Queries](/docs/multi-corpus-and-documents) for searching across multiple knowledge bases, and [Factual Consistency Evaluation](/docs/factual-consistency-evaluation) for quality monitoring.