---
sidebar_position: 2
---


import CodePanel from '@site/src/theme/CodePanel';

# Create a Document

Documents are **groups of pages** connected through:

- a **sidebar**
- **previous/next navigation**
- **versioning**

## Create your first Doc

Create a Markdown file at `docs/hello.md`:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
<CodePanel snippets={[{language: "bash", code: `A new document is now available at [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello).

## Configure the Sidebar

Docusaurus automatically **creates a sidebar** from the \`docs\` folder.

Add metadata to customize the sidebar label and position:`}]} title="Code Example" layout="stacked" />md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
<CodePanel snippets={[{language: "bash", code: `It is also possible to create your sidebar explicitly in \`sidebars.js\`:`}]} title="Code Example" layout="stacked" />js title="sidebars.js"
export default {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```
