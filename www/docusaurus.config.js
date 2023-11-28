// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Vectara Docs",
  tagline: "Developer documentation for Vectara's Semantic Search Platform",
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
            specPath: "static/vectara-oas.yaml", // Path to designated spec file
            outputDir: "docs/rest-api", // Output directory for generated .mdx docs
            downloadUrl: "https://docs.vectara.com/vectara-oas.yaml",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
            baseUrl: "docs/rest-api/vectara-oas",
            version: "1.0.0",
            label: "v1.0.0",
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
    [
      "@vectara/docusaurus-search",
      {
        containerId: "search",
        customerId: "3874164736",
        apiKey: "zqt_5usQAFwTytdQHAXn17Iq31OQMA5RrIBWLI7Fwg",
        corpusId: "1",
      },
    ],
  ],

  scripts: [
    {
      src: "/analytics.js",
      async: true,
    },
    {
      src: "/snowAnalytics.js",
      async: true,
    }
  ],

  clientModules: ["./static/routeUpdateModule.js"],

  themeConfig: {
    prism: {
      additionalLanguages: ["java", "php", "csharp"],
      theme: require("prism-react-renderer/themes/vsLight"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
    announcementBar: {
      id: "genai_launch",
      content:
        'Vectara now has enhanced metadata filtering capabilities, offering customizable filters and data types to elevate your search experience! For more details, see our blog <a href="https://vectara.com/why-is-metadata-important-in-genai/">here<a>',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: true,
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
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/rest-api/",
          activeBasePath: "docs/rest-api",
          label: "API Playground",
          position: "left",
        },
        {
          to: "https://console.vectara.com",
          label: "Console",
          position: "right",
        },
        {
          type: "html",
          position: "left",
          value: '<div id="search"></div>',
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
              to: "https://vectara.com/about-vectara/",
            },
            {
              label: "Careers and Culture",
              to: "https://vectara.com/careers/",
            },
            {
              label: "Contact Us",
              to: "https://vectara.com/contact-us/",
            },
          ],
        },
        {
          title: "Security and Terms",
          items: [
            {
              label: "Trust and Security",
              href: "https://vectara.com/legal/security-at-vectara/",
            },
            {
              label: "Privacy Policy",
              href: "https://vectara.com/legal/privacy-policy/",
            },
            {
              label: "Terms",
              href: "https://vectara.com/legal/terms-of-service/",
            },
            {
              label: "FAQs",
              href: "https://vectara.com/faqs/",
            },
          ],
        },
        {
          title: "Social Media",
          items: [
            {
              label: "LinkedIn",
              href: "https://linkedin.com/company/vectara",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/vectara/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/vectara",
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
