---
sidebar_position: 5
---


import CodePanel from '@site/src/theme/CodePanel';

# Deploy your site

Docusaurus is a **static-site-generator** (also called **[Jamstack](https://jamstack.org/)**).

It builds your site as simple **static HTML, JavaScript and CSS files**.

## Build your site

Build your site **for production**:

<CodePanel snippets={[{language: "bash", code: `npm run build`}]} title="Code Example" layout="stacked" />

The static files are generated in the `build` folder.

## Deploy your site

Test your production build locally:

<CodePanel snippets={[{language: "bash", code: `npm run serve`}]} title="Code Example" layout="stacked" />

The `build` folder is now served at [http://localhost:3000/](http://localhost:3000/).

You can now deploy the `build` folder **almost anywhere** easily, **for free** or very small cost (read the **[Deployment Guide](https://docusaurus.io/docs/deployment)**).
