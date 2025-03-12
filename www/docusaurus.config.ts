// docusaurus.config.ts
import { themes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: "Vectara Docs",
  tagline:
    "Developer documentation for Vectara's Retrieval Augmented Generation as-a-Service (RAGaaS) Platform",
  url: "https://docs.vectara.com",
  baseUrl: "/",
  favicon: "img/vectara_logo.svg",
  organizationName: "vectara",
  projectName: "vectara-docs",

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl: "https://github.com/vectara/vectara-docs/tree/master/www",
          docItemComponent: "@theme/ApiItem",
          lastVersion: "current",
          versions: {
            current: { label: "2.0" },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      },
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "apiDocs",
        docsPluginId: "classic",
        config: {
          vectara: {
            specPath: "static/vectara-oas-v2.yaml",
            outputDir: "docs/rest-api",
            downloadUrl: "https://docs.vectara.com/vectara-oas-v2.yaml",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
            baseUrl: "docs/rest-api/vectara-oas",
            version: "2.0",
            label: "v2.0",
            versions: {
              "1.0": {
                specPath: "static/vectara-oas.yaml",
                outputDir: "versioned_docs/version-1.0/rest-api",
                label: "1.0",
                baseUrl: "versioned_docs/version-1.0/rest-api/vectara-oas",
              },
            },
          },
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "github-getting-started-samples",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/vectara/getting-started/main/language-examples",
        outDir: "docs/getting-started-samples",
        documents: [
          // Same list as before, omitted for brevity
          "java/rest/src/main/java/com/vectara/examples/rest/RestApiKeyQueries.java",
          // ... (add the full list from your original config)
        ],
        modifyContent(filename, content) {
          return {
            filename: `${filename.split("/").slice(-1)}.md`,
            content: `---
id: ${filename.split("/").slice(-1)}
title: ${filename.split("/").slice(-1)}
custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/${filename}
sidebar_label: ${String(filename.split(".").slice(-1))
  .replace("py", "Python")
  .replace("cs", "C#")
  .replace("php", "PHP")
  .replace("js", "NodeJS")
  .replace("java", "Java")}
---

${
  (((filename.toLowerCase().includes("api") &&
    filename.toLowerCase().includes("key")) ||
    filename === "nodejs/rest/app.js") &&
    "This is a complete example...") ||
  "This is an example..."
}

\`\`\`${filename.split(".").slice(-1)} title="${filename}"
${content}
\`\`\`
`,
          };
        },
      },
    ],
  ],

  scripts: [
    { src: "/analytics.js", async: true },
    { src: "/scripts/reodev.js", async: true },
  ],

  clientModules: ["./static/routeUpdateModule.js"],

  themeConfig: {
    prism: {
      additionalLanguages: ["java", "php", "csharp"],
      theme: themes.vsLight,
      darkTheme: themes.dracula,
    },
    navbar: {
      title: "",
      logo: {
        alt: "Vectara Logo",
        src: "img/vectara_wordmark.png",
        srcDark: "img/vectara_wordmark_light.png",
      },
      items: [
        {
          type: "dropdown",
          label: "Docs",
          position: "left",
          items: [
            { label: "Version 2.0 (Latest)", to: "docs/" },
            { label: "Version 1.0", to: "docs/1.0/" },
          ],
        },
        // ... (rest of navbar items)
      ],
    },
    footer: {
      style: "light",
      links: [
        // ... (footer links)
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vectara, Inc. Built with Docusaurus.`,
    },
  },

  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;