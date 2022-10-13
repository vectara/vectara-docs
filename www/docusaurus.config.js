module.exports = {
  title: 'Vectara Docs',
  tagline: 'Developer documentation for Vectara\'s Semantic Search Platform',
  url: 'https://docs.vectara.com',
  baseUrl: '/',
  favicon: 'img/vectara_logo.svg',
  organizationName: 'vectara',
  projectName: 'vectara-docs',
  themeConfig: {
    prism: {
      additionalLanguages: ['java', 'php', 'csharp'],
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Vectara Logo',
        src: 'img/vectara_wordmark.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        }
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'APIs',
          items: [
            {
              label: 'Indexing',
              to: 'docs/indexing-apis/indexing',
            },
            {
              label: 'Search',
              to: 'docs/search-apis/search',
            },
            {
              label: 'Admin',
              to: 'docs/admin-apis/admin',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              to: 'https://vectara.com/about-vectara-neural-search/',
            },
            {
              label: 'Careers and Culture',
              to: 'https://vectara.com/careers/',
            },
            {
              label: 'Contact Us',
              to: 'https://vectara.com/contact-us/',
            },
          ],
        },
        {
          title: 'Security and Terms',
          items: [
            {
              label: 'Trust and Security',
              href: 'https://vectara.com/legal/security-at-vectara/',
            },
            {
              label: 'Privacy Policy',
              href: 'https://vectara.com/legal/privacy-policy/',
            },
            {
              label: 'Terms',
              href: 'https://vectara.com/legal/terms-of-service/',
            },
            {
              label: 'FAQs',
              href: 'https://vectara.com/faqs/',
            },
          ],
        },
        {
          title: 'Social Media',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/vectara',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/vectara/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/vectara',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCoP_hcyjJRLQr0CV050bfMg',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Log In',
              href: 'https://console.vectara.com/login',
            },
            {
              label: 'Sign Up',
              href: 'https://console.vectara.com/signup',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vectara, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/vectara/vectara-docs/tree/master/www',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [
    {
      src: '/analytics.js',
      async: true,
    },
  ],


  plugins: [
    [
        "docusaurus-plugin-remote-content",
        {
            // options here
            name: "github-getting-started-samples", // used by CLI, must be path safe
            sourceBaseUrl: "https://raw.githubusercontent.com/vectara/getting-started/main/language-examples", // the base url for the markdown (gets prepended to all of the documents when fetching)
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
                        filename: `${filename.split('/').slice(-1)}.md`,
                        content: `---
id: ${filename.split('/').slice(-1)}
title: ${filename.split('/').slice(-1)}
sidebar_label: ${String(filename.split('\.').slice(-1)).replace('py','Python')
                .replace('cs','C#').replace('php','PHP').replace('js','NodeJS')
                .replace('java','Java')}
---

${((filename.toLowerCase().includes('api') && filename.toLowerCase().includes('key'))
    || filename === 'nodejs/rest/app.js') &&
  'This is a complete example of using the platform via REST.  For more sample ' + 
  'code, including any dependencies this file has, please have a look at our ' +
  'GitHub examples repository.  This file can be found in that repo at ' +
  '<a href="https://github.com/vectara/getting-started/tree/main/language-examples/' +
  filename + '">' + filename + '</a>'
  ||
  'This is an example of using the platform via REST.  For more sample ' + 
  'code, including any dependencies this file has, please have a look at our ' +
  'GitHub examples repository.  This file can be found in that repo at ' +
  '<a href="https://github.com/vectara/getting-started/tree/main/language-examples/' +
  filename + '">' + filename + '</a>'}

\`\`\`${filename.split('\.').slice(-1)} title="${filename}"
${content}
\`\`\`
`,
                      }
            },
        },
    ],
  ],
};
