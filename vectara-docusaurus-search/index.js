module.exports = async function vectaraSearch(context, options) {
  return {
    name: "vectara-search",
    injectHtmlTags({ content }) {
      return {
        postBodyTags: [
          {
            tagName: "script",
            innerHTML: `
              window.vectara = window.vectara ?? {};
              window.vectara.plugins = window.vectara.plugins ?? {};
              window.vectara.plugins.search = {
                containerId: ${
                  options.containerId ? `"${options.containerId}"` : undefined
                },
                customerId: ${
                  options.customerId ? `"${options.customerId}"` : undefined
                },
                apiKey: ${options.apiKey ? `"${options.apiKey}"` : undefined},
                corpusId: ${
                  options.corpusId ? `"${options.corpusId}"` : undefined
                }
              };
            `,
          },
        ],
      };
    },
    getClientModules() {
      return ["./plugin.js"];
    },
  };
};
