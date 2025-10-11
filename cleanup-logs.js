// Simple script to replace console.log statements with debug calls
const fs = require('fs');
const path = require('path');

const fileToClean = './www/src/components/VectaraEnhanced/hooks/useProductionChat.ts';

// Read the file
let content = fs.readFileSync(fileToClean, 'utf8');

// Replace console.log statements with debug calls
const replacements = [
  // Replace various console.log patterns
  { from: /console\.log\('Source filtering:',/g, to: "debugAPI('Source filtering:'," },
  { from: /console\.log\(`📄 RESULT \${index \+ 1}:`,/g, to: "debugAPI(`📄 RESULT ${index + 1}:`," },
  { from: /console\.log\(`🔑 Metadata for Result \${index \+ 1}:`\);/g, to: "debugAPI(`🔑 Metadata for Result ${index + 1}:`);" },
  { from: /console\.log\(\s*`  - \${m\.name}: "\${m\.value}"`\s*\);/g, to: "debugAPI(`  - ${m.name}: \"${m.value}\"`);" },
  { from: /console\.log\(`❌ No metadata available for Result \${index \+ 1}`\);/g, to: "debugAPI(`❌ No metadata available for Result ${index + 1}`);" },
  { from: /console\.log\('Code detection debug:',/g, to: "debugCodeGeneration('Code detection debug:'," },
  { from: /console\.log\('🚀 showCodeExamples called:',/g, to: "debugCodeGeneration('🚀 showCodeExamples called:'," },
  { from: /console\.log\('✅ Target message found:',/g, to: "debugCodeGeneration('✅ Target message found:'," },
  { from: /console\.log\('Generating code snippets for message content...\');/g, to: "debugCodeGeneration('Generating code snippets for message content...');" },
  { from: /console\.log\('Generated', allSnippets\.length, 'total snippets'\);/g, to: "debugCodeGeneration('Generated', allSnippets.length, 'total snippets');" },
  { from: /console\.log\('Filtered to', codeSnippets\.length, 'snippets for', language \|\| 'all languages'\);/g, to: "debugCodeGeneration('Filtered to', codeSnippets.length, 'snippets for', language || 'all languages');" },
  { from: /console\.log\('📝 Updating state with', codeSnippets\.length, 'code snippets'\);/g, to: "debugCodeGeneration('📝 Updating state with', codeSnippets.length, 'code snippets');" },
  { from: /console\.log\('✅ Updating message:', msg\.id, 'with', codeSnippets\.length, 'code snippets for', language \|\| 'all languages'\);/g, to: "debugCodeGeneration('✅ Updating message:', msg.id, 'with', codeSnippets.length, 'code snippets for', language || 'all languages');" },
  { from: /console\.log\('🎉 Successfully updated message with code snippets'\);/g, to: "debugCodeGeneration('🎉 Successfully updated message with code snippets');" },
  { from: /console\.log\('⚠️ No code snippets to show'\);/g, to: "debugCodeGeneration('⚠️ No code snippets to show');" },
];

// Apply replacements
replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

// Write the cleaned file back
fs.writeFileSync(fileToClean, content);

console.log('✅ Cleaned up console.log statements in useProductionChat.ts');