// www/src/utils/exampleLookup.js
import jsyaml from 'js-yaml';

// Cache for the index to avoid repeated fetches
let indexCache = null;

// Load the comprehensive index
async function loadIndex() {
  if (indexCache) {
    return indexCache;
  }
  
  try {
    const response = await fetch('/static/examples/comprehensive-index.json');
    indexCache = await response.json();
    return indexCache;
  } catch (error) {
    console.error('Failed to load example index:', error);
    return null;
  }
}

// Find relevant examples based on query
export async function findRelevantExamples(query) {
  const index = await loadIndex();
  if (!index) {
    return [];
  }

  // Simple keyword matching - in production, use more sophisticated NLP
  const keywords = query.toLowerCase().split(/\s+/);
  const relevantExamples = new Set();
  
  // Check by category
  for (const keyword of keywords) {
    for (const category of Object.keys(index.byCategory)) {
      if (category.includes(keyword)) {
        index.byCategory[category].forEach(example => relevantExamples.add(example));
      }
    }
  }
  
  // Check by parameter
  for (const keyword of keywords) {
    if (index.byParameter[keyword]) {
      index.byParameter[keyword].forEach(example => relevantExamples.add(example));
    }
  }
  
  // Check by tag
  for (const keyword of keywords) {
    if (index.byTag[keyword]) {
      index.byTag[keyword].forEach(example => relevantExamples.add(example));
    }
  }
  
  return Array.from(relevantExamples).slice(0, 5);
}

// Get a specific example by ID
export async function getExample(exampleId) {
  const index = await loadIndex();
  if (!index) {
    return null;
  }

  // Find which category the example belongs to
  let category = null;
  for (const cat of Object.keys(index.byCategory)) {
    if (index.byCategory[cat].includes(exampleId)) {
      category = cat;
      break;
    }
  }

  if (!category) {
    return null;
  }

  try {
    // Load metadata
    const metadataResponse = await fetch(`/static/examples/organized/${category}/${exampleId}/metadata.yaml`);
    const metadataText = await metadataResponse.text();
    const metadata = jsyaml.load(metadataText);
    
    // Load request example if exists
    let requestExample = null;
    try {
      const reqResponse = await fetch(`/static/examples/organized/${category}/${exampleId}/request-example.json`);
      requestExample = await reqResponse.json();
    } catch (e) {
      // No request example available
    }
    
    // Load response examples
    const responseExamples = {};
    const statusCodes = ['200', '201', '400', '401', '404', '500'];
    for (const code of statusCodes) {
      try {
        const resResponse = await fetch(`/static/examples/organized/${category}/${exampleId}/response-example-${code}.json`);
        responseExamples[code] = await resResponse.json();
      } catch (e) {
        // This status code doesn't exist, skip
      }
    }
    
    return {
      id: exampleId,
      category,
      metadata,
      requestExample,
      responseExamples
    };
  } catch (error) {
    console.error(`Failed to load example ${exampleId}:`, error);
    return null;
  }
}

// Format an example for display in chat
export function formatExampleForChat(example) {
  let formatted = `### ${example.metadata.description}\n\n`;
  
  if (example.requestExample) {
    formatted += "**Request Example**:\n```json\n";
    formatted += JSON.stringify(example.requestExample, null, 2);
    formatted += "\n```\n\n";
  }
  
  // Show a successful response if available
  const successCodes = Object.keys(example.responseExamples).filter(code => code.startsWith('2'));
  if (successCodes.length > 0) {
    const code = successCodes[0];
    formatted += "**Response Example** (" + code + "):\n```json\n";
    formatted += JSON.stringify(example.responseExamples[code], null, 2);
    formatted += "\n```\n\n";
  }
  
  return formatted;
}