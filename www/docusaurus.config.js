// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
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
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/vectara/vectara-docs/tree/master/www",
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi-docs
          lastVersion: "current",
          versions: {
            current: {
              label: "2.0",
              /* path: "2.0", */
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  plugins: [
    "docusaurus-plugin-sass",
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "apiDocs",
        docsPluginId: "classic",
        config: {
          vectara: {
            specPath: "static/vectara-oas-v2.yaml", // Path to designated spec file
            outputDir: "docs/rest-api", // Output directory for generated .mdx docs
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
                specPath: "static/vectara-oas.yaml", // path to 1.0 OAS spec
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
        // options here
        name: "github-getting-started-samples", // used by CLI, must be path safe
        sourceBaseUrl:
          "https://raw.githubusercontent.com/vectara/getting-started/main/language-examples", // the base url for the markdown (gets prepended to all of the documents when fetching)
        //sourceBaseUrl: "http://127.0.0.1:8000/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "docs/getting-started-samples", // the base directory to output to.
        noRuntimeDownloads: false,
        documents: [
          // getting started "standalone" examples
          "java/rest/src/main/java/com/vectara/examples/rest/RestApiKeyQueries.java",
          "csharp/rest/RestApiKeyQueries.cs",
          "nodejs/rest/app.js",
          "php/rest/queryDataApiKey.php",
          "python/vectara-rest/rest_api_key_queries.py",

          // create corpus
          "java/rest/src/main/java/com/vectara/examples/rest/RestCreateCorpus.java",
          "nodejs/rest/create_corpus.js",
          "php/rest/createCorpus.php",
          "python/vectara-rest/rest_create_corpus.py",

          // delete corpus
          "csharp/rest/RestDeleteCorpus.cs",
          "nodejs/rest/delete_corpus.js",
          "php/rest/deleteCorpus.php",
          "python/vectara-rest/rest_delete_corpus.py",

          // reset corpus
          "csharp/rest/RestResetCorpus.cs",
          "nodejs/rest/reset_corpus.js",
          "php/rest/resetCorpus.php",
          "python/vectara-rest/rest_reset_corpus.py",

          // indexing
          "csharp/rest/RestIndexData.cs",
          "java/rest/src/main/java/com/vectara/examples/rest/RestIndex.java",
          "nodejs/rest/index_document.js",
          "php/rest/indexDocument.php",
          "python/vectara-rest/rest_index_document.py",

          // delete documents
          "csharp/rest/RestDeleteDocument.cs",
          "java/rest/src/main/java/com/vectara/examples/rest/RestDeleteDocument.java",
          "nodejs/rest/delete_document.js",
          "php/rest/deleteDocument.php",
          "python/vectara-rest/rest_delete_document.py",

          // file upload
          "java/rest/src/main/java/com/vectara/examples/rest/RestUploadFile.java",
          "nodejs/rest/upload_file.js",
          "php/rest/uploadFile.php",
          "python/vectara-rest/rest_upload_file.py",

          // standard query
          "csharp/rest/RestQueryData.cs",
          "java/rest/src/main/java/com/vectara/examples/rest/RestQuery.java",
          "python/vectara-rest/rest_query.py",
          "php/rest/queryData.php",
          "nodejs/rest/query.js",

          // oauth & jwt tokens
          "csharp/common/JWTFetcher.cs",
          "java/auth/src/main/java/com/vectara/auth/JwtFetcher.java",
          "php/rest/getJwtToken.php",
          "python/vectara-rest/rest_util.py",
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
    "This is a complete example of using the platform via REST.  For more sample " +
      "code, including any dependencies this file has, please have a look at our " +
      "GitHub examples repository.  This file can be found in that repo at " +
      '<a href="https://github.com/vectara/getting-started/tree/main/language-examples/' +
      filename +
      '">' +
      filename +
      "</a>") ||
  "This is an example of using the platform via REST.  For more sample " +
    "code, including any dependencies this file has, please have a look at our " +
    "GitHub examples repository.  This file can be found in that repo at " +
    '<a href="https://github.com/vectara/getting-started/tree/main/language-examples/' +
    filename +
    '">' +
    filename +
    "</a>"
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
    {
      src: "/analytics.js",
      async: true,
    },
    {
      src: "/scripts/reodev.js",
      async: true,
    },
  ],

  clientModules: ["./static/routeUpdateModule.js"],

  themeConfig: {
    prism: {
      additionalLanguages: ["java", "php", "csharp"],
      theme: require("prism-react-renderer/themes/vsLight"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
    /* announcementBar: {
      id: "genai_launch",
      content:
        '',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: true,
    }, */
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
            {
              label: "Version 2.0 (Latest)",
              to: "docs/",
            },
            {
              label: "Version 1.0",
              to: "docs/1.0/",
            },
          ],
        },
        {
          type: "dropdown",
          label: "API Reference",
          position: "left",
          items: [
            {
              label: "Version 2.0 (Latest)",
              to: "docs/rest-api",
            },
            {
              label: "Version 1.0",
              to: "docs/1.0/rest-api",
            },
          ],
        },
        /* {
          to: "docs/rest-api/",
          activeBasePath: "docs/rest-api",
          label: "API Playground",
          position: "left",
        },
        {
          to: "docs/v2/rest-api/",
          activeBasePath: "docs/v2/rest-api",
          label: "API Playground V2",
          position: "left",
        }, */
        {
          label: "Release Notes",
          to: "docs/release-notes",
        },
        {
          label: "Changelog",
          to: "docs/changelog",
        },
        {
          type: "search",
          className: "searchBar",
          position: "right",
        },
        {
          to: "https://console.vectara.com",
          label: "Console",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "APIs",
          items: [
            {
              label: "Indexing",
              to: "docs/api-reference/indexing-apis/indexing",
            },
            {
              label: "Search",
              to: "docs/api-reference/search-apis/search",
            },
            {
              label: "Admin",
              to: "docs/api-reference/admin-apis/admin",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              to: "https://www.vectara.com/company/about-us/",
            },
            {
              label: "Careers and Culture",
              to: "https://www.vectara.com/company/careers-and-culture/",
            },
            {
              label: "Contact Us",
              to: "https://www.vectara.com/contact-us/",
            },
          ],
        },
        {
          title: "Security and Terms",
          items: [
            {
              label: "Trust and Security",
              href: "https://www.vectara.com/legal/security-at-vectara/",
            },
            {
              label: "Privacy Policy",
              href: "https://www.vectara.com/legal/privacy-policy/",
            },
            {
              label: "Terms",
              href: "https://www.vectara.com/legal/terms-of-service/",
            },
            {
              label: "FAQs",
              href: "https://www.vectara.com/faqs/",
            },
          ],
        },
        {
          title: "Social Media",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/vectara/",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/vectara/",
            },
            {
              label: "X",
              href: "https://x.com/vectara",
            },
            {
              label: "Youtube",
              href: "https://www.youtube.com/channel/UCoP_hcyjJRLQr0CV050bfMg",
            },
            {
              label: "Discord",
              href: "https://discord.gg/GFb8gMz6UH",
            },
          ],
        },
        {
          title: "Platform",
          items: [
            {
              label: "Log In",
              href: "https://console.vectara.com/login",
            },
            {
              label: "Sign Up",
              href: "https://console.vectara.com/signup",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vectara, Inc. Built with Docusaurus.`,
    },
  },

  // Allows use of @theme/ApiItem and other components
  themes: ["docusaurus-theme-openapi-docs"],
};

module.exports = config;
