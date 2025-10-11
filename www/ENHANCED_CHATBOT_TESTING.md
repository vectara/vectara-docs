# Enhanced Chatbot Testing - platform/react-chatbot Branch

## Overview
This branch contains the enhanced Vectara chatbot with intelligent code generation and search integration features.

## What's New

### 🤖 Intelligent Code Generation
- **Smart Detection**: Only generates code examples when users explicitly ask for them
- **Multi-language Support**: JavaScript, TypeScript, Python, and cURL
- **Interactive Parameters**: Users can customize API credentials directly in the interface
- **On-demand Generation**: Clean UX with "Show code examples" button

### 🔍 Enhanced Search Integration
- **Floating Chat Button**: AI assistant accessible from any page
- **Search Context**: Chat remembers what you were searching for
- **Seamless Handoff**: Easy transition from search results to AI conversation

### ⚡ Enhanced Performance
- **Optimized API Parameters**: Lexical interpolation 0.005 and latest summarizer
- **Better Context**: 2 sentences before/after for comprehensive responses
- **Analytics**: Comprehensive event tracking for insights

## File Structure

```
src/components/VectaraEnhanced/
├── components/
│   ├── VectaraEnhancedChatbot.tsx      # Main chatbot component
│   └── SearchChatIntegration.tsx       # Search integration
├── hooks/
│   ├── useProductionChat.ts            # v1 API hook (active)
│   └── useProductionChatV2.ts          # v2 API hook (ready)
├── utils/
│   └── codeTemplates.ts                # Code generation system
├── types/
│   └── index.ts                        # TypeScript definitions
└── config/
    └── vectaraConfig.ts                # API configuration
```

## Testing the Enhanced Features

### 1. **Start Development Server**
```bash
cd www
npm start
```

### 2. **Look for the Floating Chat Button**
- You'll see a 💬 button in the bottom-right corner
- Click it to open the AI assistant

### 3. **Test Code Generation**
Try asking questions like:
- "How do I search my corpus?"
- "Show me a JavaScript example"
- "Give me Python code for uploading documents"
- "How to implement search in TypeScript?"

### 4. **Test Interactive Features**
- Click "Show code examples" when it appears
- Customize the API credentials in code snippets
- Copy code to clipboard
- Watch the console for analytics events

### 5. **Test Search Integration**
- Use the regular search at the top
- Look for enhanced AI features integrated with search results

## Configuration

The enhanced features use the same API credentials as the original search:
- **Customer ID**: 1526022105
- **Corpus ID**: 232  
- **API Key**: (configured in vectaraConfig.ts)

## API Version Switching

The system is ready for v2 API migration:
```typescript
// In config/vectaraConfig.ts
export const USE_V2_API = false; // Change to true when v2 is ready
```

## Rollback Instructions

If you need to revert to the original SearchBar:
```bash
cd src/theme
mv SearchBar.tsx SearchBar.enhanced.tsx
mv SearchBar.original.tsx SearchBar.tsx
```

## What to Test

### ✅ Basic Functionality
- [ ] Floating chat button appears
- [ ] Chat opens when clicked
- [ ] Can send messages and get responses
- [ ] Responses include source references

### ✅ Code Generation
- [ ] Ask "Show me JavaScript code" - should auto-generate
- [ ] Ask "How do I search?" - should show "Show code examples" button
- [ ] Click "Show code examples" - should generate multiple languages
- [ ] Customize parameters in code snippets
- [ ] Copy code to clipboard

### ✅ Enhanced Features
- [ ] Analytics events logged to console
- [ ] Integration events tracked
- [ ] Error handling works (try invalid queries)
- [ ] Chat context preserved during session

### ✅ Performance
- [ ] Fast response times
- [ ] Better answer quality (enhanced summarizer)
- [ ] Comprehensive source references

## Known Issues
- None currently - this is a stable implementation

## Next Steps
1. **Test thoroughly** with various queries
2. **Gather feedback** on UX and functionality  
3. **Coordinate v2 API migration** with team
4. **Consider publishing** as `@vectara/react-chatbot-search`

---

**Branch**: `platform/react-chatbot`
**Plugin Location**: `/Users/paulwozniczka/Documents/cc/react-chatbot-august/`
**Status**: Ready for testing ✅