// Clean card descriptions by extracting real content from linked pages
document.addEventListener('DOMContentLoaded', function() {
  
  // Cache for fetched descriptions to avoid duplicate requests
  const descriptionCache = new Map();
  
  // Extract description from page content
  async function extractDescriptionFromPage(url) {
    if (descriptionCache.has(url)) {
      return descriptionCache.get(url);
    }
    
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      // Create a temporary DOM element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      console.log('Parsing page for:', url);
      
      // Try multiple strategies to find the content
      const contentSelectors = [
        'main',
        '.main',
        '[role="main"]',
        'article',
        '.markdown',
        '.content',
        'body'
      ];
      
      let content = null;
      for (const selector of contentSelectors) {
        content = doc.querySelector(selector);
        if (content) {
          console.log('Found content with selector:', selector);
          break;
        }
      }
      
      if (!content) {
        console.log('No content container found');
        return null;
      }
      
      // Look for the first meaningful paragraph after badges
      const paragraphs = content.querySelectorAll('p');
      console.log('Found', paragraphs.length, 'paragraphs');
      
      for (let i = 0; i < paragraphs.length; i++) {
        const p = paragraphs[i];
        const text = p.textContent.trim();
        
        console.log(`Paragraph ${i}:`, text.substring(0, 100) + '...');
        
        // Skip empty paragraphs
        if (!text || text.length < 20) {
          console.log('Skipping: too short');
          continue;
        }
        
        // Skip paragraphs that contain badges
        if (text.includes('Required API Key Type:') || text.includes('badge')) {
          console.log('Skipping: contains badges');
          continue;
        }
        
        // Skip paragraphs that are just imports or technical stuff
        if (text.includes('import ') || text.includes('from ') || text.includes('<script') || text.includes('```')) {
          console.log('Skipping: technical content');
          continue;
        }
        
        // This looks like a real description
        if (text.length > 20 && text.length < 1000) {
          console.log('Found description:', text);
          descriptionCache.set(url, text);
          return text;
        }
      }
      
      console.log('No suitable paragraph found');
      return null;
    } catch (error) {
      console.log('Error fetching description for:', url, error);
      return null;
    }
  }
  
  // Comprehensive descriptions mapping (from actual MDX content)
  const knownDescriptions = {
    // Query APIs
    'simple single corpus query': 'Search a single corpus with a straightforward query request, specifying the corpus key and query parameters.',
    'advanced single corpus query': 'Perform an advanced query on a specific corpus to find relevant results, highlight relevant snippets, and use Retrieval Augmented Generation.',
    'multiple corpora query': 'Perform a multipurpose query to retrieve relevant information from one or more corpora and generate a response using Retrieval Augmented Generation (RAG).',
    
    // Corpus Management
    'create corpus': 'Create a corpus, which is a container to store documents and associated metadata. Here, you define the unique corpus_key that identifies the corpus.',
    'delete corpus': 'Permanently delete a corpus and all its associated data. The corpus_key uniquely identifies the corpus.',
    'list corpora': 'List corpora in the account. The returned corpus objects contain less detail compared to those retrieved the direct corpus retrieval operation.',
    'get corpus': 'Get metadata about a corpus. This operation does not search the corpus contents.',
    'update corpus': 'Enable, disable, or update the name and description of a corpus. This lets you manage data availability without deleting the corpus.',
    'reset corpus': 'Reset a corpus by deleting all documents and data while preserving the corpus structure and configuration.',
    'compute corpus size': 'Calculate and retrieve the size metrics of a corpus including document count and storage usage.',
    
    // Document Management
    'upload a file to the corpus': 'Upload files such as PDFs and Word Documents for automatic text extraction and metadata parsing.',
    'create corpus document': 'Add a document to a corpus. This endpoint supports two document formats: structured and core.',
    'delete corpus document': 'Permanently delete a document identified by its unique document_id from a specific corpus. This operation cannot be undone.',
    'get corpus document': 'Retrieve the content and metadata of a specific document, identified by its unique document_id from a specific corpus.',
    'list corpus documents': 'List all documents in a corpus with their metadata and basic information.',
    'update corpus document': 'Update the metadata or content of an existing document in a corpus.',
    'replace corpus document metadata': 'Replace the metadata of a document with new metadata values.',
    'summarize corpus document': 'Generate a summary of a specific document using AI-powered summarization.',
    
    // API Key Management
    'create api key': 'Create a new API key for authenticating with Vectara APIs and specify permissions and access levels.',
    'delete api key': 'Permanently delete an API key and revoke its access to Vectara services.',
    'get api key': 'Retrieve information about a specific API key including its permissions and status.',
    'list api keys': 'Retrieve a list of API keys for the customer account with optional filtering.',
    'update api key': 'Update the permissions, description, or other properties of an existing API key.',
    
    // Chat/Conversation
    'create chat': 'Create a chat session while specifying the default retrieval parameters used by the prompt.',
    'delete chat': 'Delete a chat session and all its associated conversation history.',
    'get chat': 'Retrieve information about a specific chat session including its configuration and metadata.',
    'list chats': 'List all chat sessions with their basic information and status.',
    'create chat turn': 'Add a new turn (message) to an existing chat conversation.',
    'delete chat turn': 'Remove a specific turn from a chat conversation.',
    'get chat turn': 'Retrieve a specific turn from a chat conversation.',
    'list chat turns': 'List all turns in a chat conversation.',
    'update chat turn': 'Update the content or metadata of a specific chat turn.',
    
    // Other APIs
    'evaluate factual consistency': 'Evaluate the factual consistency of generated text against source documents using AI models.',
    'correct hallucinations': 'Detect and correct hallucinations in generated text using Vectara\'s hallucination detection models.',
    'corrects hallucinations in generated text based on source documents': 'Detect and correct hallucinations in generated text using Vectara\'s hallucination detection models.',
    'create llm': 'Create a custom large language model configuration for use with Vectara services.',
    'delete llm': 'Delete a custom large language model configuration.',
    'get llm': 'Retrieve information about a specific large language model configuration.',
    'list llms': 'List all available large language models and their configurations.',
    'list rerankers': 'List all available reranking models that can be used to improve search result relevance.',
    'list encoders': 'List all available encoder models used for text embedding and semantic search.',
    'list generation presets': 'List all available generation presets that can be used for text generation tasks.',
    'list hallucination correctors': 'List all available hallucination correction models.',
    'list table extractors': 'List all available table extraction models for processing structured data from documents.'
  };
  
  // Fallback descriptions for common patterns
  const fallbackDescriptions = {
    'query': 'Perform search and RAG operations on corpora',
    'search': 'Search for relevant content in corpora',
    'create': 'Create a new resource',
    'delete': 'Delete an existing resource',
    'update': 'Update an existing resource',
    'get': 'Retrieve resource information',
    'list': 'List available resources',
    'upload': 'Upload files or documents',
    'reset': 'Reset resource to initial state',
    'evaluate': 'Evaluate content or performance',
    'compute': 'Compute resource metrics',
    'chat': 'Chat-based interactions',
    'summarize': 'Generate summaries of content'
  };
  
  function generateFallbackDescription(cardTitle) {
    const title = cardTitle.toLowerCase().trim();
    
    // First, try to find an exact match in known descriptions
    if (knownDescriptions[title]) {
      return knownDescriptions[title];
    }
    
    // Try partial matches and variations
    const titleVariations = [
      title,
      title.replace(/^(📄️\s*)?/, ''), // Remove doc emoji
      title.replace(/\s+/g, ' '), // Normalize whitespace
      title.replace(/[^\w\s]/g, ''), // Remove special chars
    ];
    
    for (const variation of titleVariations) {
      if (knownDescriptions[variation]) {
        return knownDescriptions[variation];
      }
    }
    
    // Try fuzzy matching with known descriptions
    for (const [knownTitle, description] of Object.entries(knownDescriptions)) {
      if (title.includes(knownTitle) || knownTitle.includes(title)) {
        return description;
      }
    }
    
    // Enhanced pattern matching based on actual titles
    if (title.includes('add a document') || title.includes('create') && title.includes('document')) {
      return 'Add a document to a corpus. This endpoint supports two document formats: structured and core.';
    }
    if (title.includes('update document') || title.includes('update') && title.includes('document')) {
      return 'Update the metadata or content of an existing document in a corpus.';
    }
    if (title.includes('replace') && title.includes('document') && title.includes('metadata')) {
      return 'Replace the metadata of a document with new metadata values.';
    }
    if (title.includes('retrieve metadata') && title.includes('corpus')) {
      return 'Get metadata about a corpus. This operation does not search the corpus contents.';
    }
    if (title.includes('remove all documents') || title.includes('reset') && title.includes('corpus')) {
      return 'Reset a corpus by deleting all documents and data while preserving the corpus structure and configuration.';
    }
    if (title.includes('replace') && title.includes('filter attributes')) {
      return 'Replace the filter attributes of a corpus to control document filtering and search behavior.';
    }
    if (title.includes('compute') && title.includes('size') && title.includes('corpus')) {
      return 'Calculate and retrieve the size metrics of a corpus including document count and storage usage.';
    }
    if (title.includes('list') && title.includes('documents')) {
      return 'List all documents in a corpus with their metadata and basic information.';
    }
    if (title.includes('delete') && title.includes('document')) {
      return 'Permanently delete a document identified by its unique document_id from a specific corpus. This operation cannot be undone.';
    }
    if (title.includes('retrieve') && title.includes('document')) {
      return 'Retrieve the content and metadata of a specific document, identified by its unique document_id from a specific corpus.';
    }
    if (title.includes('summarize') && title.includes('document')) {
      return 'Generate a summary of a specific document using AI-powered summarization.';
    }
    if (title.includes('start') && title.includes('chat')) {
      return 'Create a chat session while specifying the default retrieval parameters used by the prompt.';
    }
    if (title.includes('create') && title.includes('turn')) {
      return 'Add a new turn (message) to an existing chat conversation.';
    }
    if (title.includes('list') && title.includes('turns')) {
      return 'List all turns in a chat conversation.';
    }
    if (title.includes('get') && title.includes('turn')) {
      return 'Retrieve a specific turn from a chat conversation.';
    }
    if (title.includes('delete') && title.includes('turn')) {
      return 'Remove a specific turn from a chat conversation.';
    }
    if (title.includes('update') && title.includes('turn')) {
      return 'Update the content or metadata of a specific chat turn.';
    }
    if (title.includes('correct') && title.includes('hallucination')) {
      return 'Detect and correct hallucinations in generated text using Vectara\'s hallucination detection models.';
    }
    if (title.includes('evaluate') && title.includes('factual')) {
      return 'Evaluate the factual consistency of generated text against source documents using AI models.';
    }
    
    // Then try fallback patterns
    for (const [keyword, description] of Object.entries(fallbackDescriptions)) {
      if (title.includes(keyword)) {
        return description;
      }
    }
    
    // Default fallback
    return 'API endpoint documentation';
  }
  
  async function cleanCardDescriptions() {
    // Find all card descriptions - targeting both generic and specific selectors
    const cardDescriptions = document.querySelectorAll('[class*="cardDescription"], .card__body p, .card__body div, .item__description, [class*="description"]');
    
    console.log('Found', cardDescriptions.length, 'potential card descriptions');
    
    for (const desc of cardDescriptions) {
      const title = desc.getAttribute('title');
      const textContent = desc.textContent || desc.innerText;
      
      // Check both title attribute and text content for the badge pattern
      const contentToCheck = title || textContent;
      
      console.log('Checking element:', desc, 'Content:', contentToCheck?.substring(0, 100));
      
      if (contentToCheck && contentToCheck.includes('Required API Key Type:')) {
        console.log('Original title:', contentToCheck);
        
        // Find the card element and its link - go up from the description element
        const cardElement = desc.closest('[class*="item"], [class*="card"], article, .theme-doc-card');
        let cardTitle = '';
        let cardLink = '';
        
        console.log('Found card element:', cardElement);
        
        if (cardElement) {
          // Try multiple selectors for the title
          const titleSelectors = [
            'h3', 'h2', 'h1', 
            '[class*="cardTitle"]', '[class*="itemTitle"]', '[class*="itemHeading"]',
            '.card__header h3', '.card__header h2',
            'a h3', 'a h2', 'a h1',
            '.title', '.heading'
          ];
          
          let titleElement = null;
          for (const selector of titleSelectors) {
            titleElement = cardElement.querySelector(selector);
            if (titleElement) {
              console.log('Found title with selector:', selector);
              break;
            }
          }
          
          if (titleElement) {
            cardTitle = titleElement.textContent || titleElement.innerText;
            console.log('Card title:', cardTitle);
          } else {
            console.log('No title element found, trying parent elements');
            // If we can't find title in card, try looking in parent or adjacent elements
            const parentElement = cardElement.parentElement;
            if (parentElement) {
              for (const selector of titleSelectors) {
                titleElement = parentElement.querySelector(selector);
                if (titleElement) {
                  cardTitle = titleElement.textContent || titleElement.innerText;
                  console.log('Found title in parent:', cardTitle);
                  break;
                }
              }
            }
          }
          
          // Find the card link - the whole card might be a link
          let linkElement = cardElement.querySelector('a[href]');
          if (!linkElement) {
            linkElement = cardElement.closest('a[href]');
          }
          if (!linkElement) {
            linkElement = cardElement.parentElement?.querySelector('a[href]');
          }
          
          if (linkElement) {
            cardLink = linkElement.getAttribute('href');
            console.log('Card link:', cardLink);
          } else {
            console.log('No link element found');
          }
        } else {
          console.log('No card element found, trying direct parent');
          // If we can't find a card, try to find title and link in nearby elements
          const parentElement = desc.parentElement;
          if (parentElement) {
            console.log('Checking parent element:', parentElement);
            const titleElement = parentElement.querySelector('h3, h2, h1, [class*="title"], [class*="heading"]');
            if (titleElement) {
              cardTitle = titleElement.textContent || titleElement.innerText;
              console.log('Found title in parent:', cardTitle);
            }
            
            const linkElement = parentElement.querySelector('a[href]') || parentElement.closest('a[href]');
            if (linkElement) {
              cardLink = linkElement.getAttribute('href');
              console.log('Found link in parent:', cardLink);
            }
          }
        }
        
        let newDescription = '';
        
        // Try to extract description from the linked page
        if (cardLink) {
          // Handle relative URLs
          const fullUrl = cardLink.startsWith('/') ? window.location.origin + cardLink : cardLink;
          console.log('Fetching description from:', fullUrl);
          
          const extractedDescription = await extractDescriptionFromPage(fullUrl);
          
          if (extractedDescription) {
            newDescription = extractedDescription;
            console.log('Successfully extracted description:', newDescription);
          } else {
            console.log('Failed to extract description from:', fullUrl);
          }
        }
        
        // Fall back to pattern-based description if extraction failed
        if (!newDescription) {
          newDescription = generateFallbackDescription(cardTitle || 'API endpoint');
          console.log('Fallback description:', newDescription);
        }
        
        // If we still don't have a good description, let's try a different approach
        // Check if we can infer from the URL structure
        if (!newDescription || newDescription === 'API endpoint documentation') {
          if (cardLink) {
            const urlParts = cardLink.split('/');
            const lastPart = urlParts[urlParts.length - 1];
            
            // Try to match based on URL patterns
            if (lastPart.includes('query') && lastPart.includes('corpus')) {
              newDescription = 'Perform an advanced query on a specific corpus to find relevant results, highlight relevant snippets, and use Retrieval Augmented Generation.';
            } else if (lastPart.includes('query') && !lastPart.includes('corpus')) {
              newDescription = 'Perform a multipurpose query to retrieve relevant information from one or more corpora and generate a response using Retrieval Augmented Generation (RAG).';
            } else if (lastPart.includes('search')) {
              newDescription = 'Search a single corpus with a straightforward query request, specifying the corpus key and query parameters.';
            } else if (lastPart.includes('upload')) {
              newDescription = 'Upload files such as PDFs and Word Documents for automatic text extraction and metadata parsing.';
            } else if (lastPart.includes('create') && lastPart.includes('corpus')) {
              newDescription = 'Create a corpus, which is a container to store documents and associated metadata.';
            } else if (lastPart.includes('delete') && lastPart.includes('corpus')) {
              newDescription = 'Permanently delete a corpus and all its associated data.';
            } else if (lastPart.includes('create') && lastPart.includes('document')) {
              newDescription = 'Add a document to a corpus. This endpoint supports two document formats: structured and core.';
            } else if (lastPart.includes('delete') && lastPart.includes('document')) {
              newDescription = 'Permanently delete a document identified by its unique document_id from a specific corpus.';
            } else if (lastPart.includes('create') && lastPart.includes('chat')) {
              newDescription = 'Create a chat session while specifying the default retrieval parameters used by the prompt.';
            } else if (lastPart.includes('api-key')) {
              newDescription = 'Manage API keys for authenticating with Vectara APIs.';
            }
            
            console.log('URL-based description:', newDescription);
          }
        }
        
        // Update the description with the new text
        desc.textContent = newDescription;
        if (desc.getAttribute('title')) {
          desc.setAttribute('title', newDescription);
        }
      }
    }
  }
  
  // Run immediately
  cleanCardDescriptions();
  
  // Also run after any dynamic content loads
  setTimeout(cleanCardDescriptions, 1000);
  setTimeout(cleanCardDescriptions, 2000);
  
  // Watch for navigation changes in SPA
  const observer = new MutationObserver(function(mutations) {
    let shouldClean = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if new content contains cards
        const hasCards = Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && 
          (node.querySelector && node.querySelector('[class*="cardDescription"]'))
        );
        if (hasCards) {
          shouldClean = true;
        }
      }
    });
    if (shouldClean) {
      console.log('Detected new cards, cleaning descriptions...');
      setTimeout(cleanCardDescriptions, 100);
      setTimeout(cleanCardDescriptions, 500);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also listen for React Router navigation changes
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('URL changed to:', url);
      setTimeout(cleanCardDescriptions, 500);
      setTimeout(cleanCardDescriptions, 1000);
    }
  }).observe(document, {subtree: true, childList: true});
  
  // Listen for popstate events (back/forward navigation)
  window.addEventListener('popstate', function() {
    console.log('Popstate event detected');
    setTimeout(cleanCardDescriptions, 500);
  });
  
  // Listen for pushstate/replacestate (programmatic navigation)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    console.log('PushState detected');
    setTimeout(cleanCardDescriptions, 500);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    console.log('ReplaceState detected');
    setTimeout(cleanCardDescriptions, 500);
  };
});