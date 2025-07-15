#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Post-processing script to add API key badges to generated MDX files
 * based on x-api-key-badges field in the OpenAPI YAML
 */

// Read the OpenAPI YAML file to extract x-api-key-badges information
function parseApiKeyBadges() {
  const yamlPath = path.join(__dirname, '../../static/vectara-oas-v2.yaml');
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  
  const badgeMap = new Map();
  
  // Split into lines and process line by line
  const lines = yamlContent.split('\n');
  let currentPath = '';
  let currentMethod = '';
  let inBadgeSection = false;
  let badgeContent = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match path definitions (e.g., "  /v2/corpora:")
    const pathMatch = line.match(/^(\s+)(\/[^:]+):\s*$/);
    if (pathMatch) {
      currentPath = pathMatch[2];
      continue;
    }
    
    // Match method definitions (e.g., "    post:")
    const methodMatch = line.match(/^(\s+)(get|post|put|patch|delete):\s*$/);
    if (methodMatch) {
      currentMethod = methodMatch[2];
      continue;
    }
    
    // Match x-api-key-badges start
    if (line.match(/^\s+x-api-key-badges:\s*\|/)) {
      inBadgeSection = true;
      badgeContent = '';
      continue;
    }
    
    // If in badge section, collect the content
    if (inBadgeSection) {
      // Check if this line is still part of the badge content (indented)
      if (line.match(/^\s+\*\*Required API Key Type:/)) {
        badgeContent = line.trim();
        // Extract just the HTML part
        const htmlMatch = badgeContent.match(/\*\*Required API Key Type:\*\*\s*(.*)/);
        if (htmlMatch && currentPath && currentMethod) {
          const badgeHtml = htmlMatch[1].trim();
          // Map to the actual generated filename
          let fileName = '';
          if (currentPath === '/v2/corpora' && currentMethod === 'post') {
            fileName = 'create-corpus';
          } else if (currentPath === '/v2/corpora/{corpus_key}/upload_file' && currentMethod === 'post') {
            fileName = 'upload-file';
          } else if (currentPath === '/v2/corpora/{corpus_key}/query' && currentMethod === 'get') {
            fileName = 'query-corpus';
          } else if (currentPath === '/v2/query' && currentMethod === 'post') {
            fileName = 'query';
          }
          
          if (fileName) {
            badgeMap.set(fileName, badgeHtml);
          }
        }
        inBadgeSection = false;
      } else if (line.match(/^\s+\w+:/)) {
        // Hit another YAML field, stop badge collection
        inBadgeSection = false;
      }
    }
  }
  
  return badgeMap;
}

// Process MDX files to add badges
function processMdxFiles(badgeMap) {
  const mdxPattern = path.join(__dirname, '../../docs/rest-api/*.api.mdx');
  const mdxFiles = glob.sync(mdxPattern);
  
  let processedCount = 0;
  
  mdxFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, '.api.mdx');
    
    // Check if this file has corresponding badge data
    if (badgeMap.has(fileName)) {
      const badgeHtml = badgeMap.get(fileName);
      
      // Find the place to insert badges (after </MethodEndpoint> and before the description)
      const insertPattern = /(<\/MethodEndpoint>\s*\n\s*\n\s*\n\s*)/;
      const match = content.match(insertPattern);
      
      if (match && !content.includes('**Required API Key Type:**')) {
        const badgeMarkdown = `**Required API Key Type:** ${badgeHtml}\n\n`;
        const newContent = content.replace(insertPattern, `$1${badgeMarkdown}`);
        
        if (newContent !== content) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`✅ Added badges to ${fileName}`);
          processedCount++;
        }
      } else if (content.includes('**Required API Key Type:**')) {
        console.log(`⏭️  Badges already exist in ${fileName}`);
      } else {
        console.log(`⚠️  Could not find insertion point in ${fileName}`);
      }
    }
  });
  
  console.log(`\n🎉 Processed ${processedCount} files with API key badges`);
}

// Main execution
try {
  console.log('🔄 Processing API key badges...');
  const badgeMap = parseApiKeyBadges();
  console.log(`📋 Found ${badgeMap.size} endpoints with x-api-key-badges`);
  
  // Log the found badges for debugging
  for (const [key, value] of badgeMap) {
    console.log(`   ${key}: ${value}`);
  }
  
  processMdxFiles(badgeMap);
} catch (error) {
  console.error('❌ Error processing API key badges:', error);
  process.exit(1);
}