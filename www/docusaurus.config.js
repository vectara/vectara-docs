"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prism_react_renderer_1 = require("prism-react-renderer");
var config = {
    title: "Vectara Docs",
    tagline: "Developer documentation for Vectara's Retrieval Augmented Generation as-a-Service (RAGaaS) Platform",
    url: "https://docs.vectara.com",
    baseUrl: "/",
    favicon: "img/vectara_logo.svg",
    organizationName: "vectara",
    projectName: "vectara-docs",
    onBrokenLinks: "ignore",
    onBrokenAnchors: "ignore",
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.ts"),
                    editUrl: "https://github.com/vectara/vectara-docs/tree/master/www",
                    docItemComponent: "@theme/ApiItem",
                    lastVersion: "current",
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true,
                    versions: {
                        current: { label: "2.0" },
                    },
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
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
        "docusaurus-plugin-sass",
        [
            "docusaurus-plugin-remote-content",
            {
                name: "github-getting-started-samples",
                sourceBaseUrl: "https://raw.githubusercontent.com/vectara/getting-started/main/language-examples",
                outDir: "docs/getting-started-samples",
                documents: [
                    "java/rest/src/main/java/com/vectara/examples/rest/RestApiKeyQueries.java",
                    // ... (rest of your document list)
                ],
                modifyContent: function (filename, content) {
                    return {
                        filename: "".concat(filename.split("/").slice(-1), ".md"),
                        content: "---\nid: ".concat(filename.split("/").slice(-1), "\ntitle: ").concat(filename.split("/").slice(-1), "\ncustom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/").concat(filename, "\nsidebar_label: ").concat(String(filename.split(".").slice(-1))
                            .replace("py", "Python")
                            .replace("cs", "C#")
                            .replace("php", "PHP")
                            .replace("js", "NodeJS")
                            .replace("java", "Java"), "\n---\n\n").concat((((filename.toLowerCase().includes("api") &&
                            filename.toLowerCase().includes("key")) ||
                            filename === "nodejs/rest/app.js") &&
                            "This is a complete example...") ||
                            "This is an example...", "\n\n```").concat(filename.split(".").slice(-1), " title=\"").concat(filename, "\"\n").concat(content, "\n```\n"),
                    };
                },
            },
        ],
    ],
    scripts: [
        { src: "/analytics.js", async: true },
        // Removed reodev.js - replaced with VectaraEnhanced chatbot
        { src: "/js/cleanCardDescriptions.js", async: true },
    ],
    clientModules: ["./static/routeUpdateModule.js"],
    themes: [
        "docusaurus-theme-openapi-docs",
        "@docusaurus/theme-mermaid",
    ],
    markdown: {
        mermaid: true, // Enable Mermaid parsing
    },
    themeConfig: {
        prism: {
            additionalLanguages: ["java", "php", "csharp"],
            theme: prism_react_renderer_1.themes.vsLight,
            darkTheme: prism_react_renderer_1.themes.dracula,
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
                {
                    type: "dropdown",
                    label: "API Reference",
                    position: "left",
                    items: [
                        { label: "Version 2.0 (Latest)", to: "docs/rest-api" },
                        { label: "Version 1.0", to: "docs/1.0/rest-api" },
                    ],
                },
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
            ],
            copyright: "Copyright \u00A9 ".concat(new Date().getFullYear(), " Vectara, Inc. Built with Docusaurus."),
        },
        mermaid: {
            theme: { light: "neutral", dark: "forest" },
            options: {
                maxTextSize: 50000,
                fontFamily: "Inter, sans-serif",
            },
        },
    },
};
exports.default = config;
