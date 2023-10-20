//const VectaraSearch = import VectaraSearch

function myPlugin() {
    return {
      name: '@vectara/docusaurus-search',
      injectHtmlTags() {
        return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
                  window.setTimeout(function () {
                    console.log('### HELLO WORLD!');
                  }, 1000);
                `
              }
            ]
        }
      }
      /* other lifecycle API */
    };
  };

  export default myPlugin;