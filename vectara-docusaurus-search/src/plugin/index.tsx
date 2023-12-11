import { Root, createRoot } from "react-dom/client";
import { Search } from "../components/search/Search";\

(function appendWidget() {
  const roots: Root[] = [];

  // When the search container has been added to the DOM,
  // add the search component to it.
  var observer = new MutationObserver(() => {
    const searchConfig = (window as any).vectara?.plugins?.search;
    if (!searchConfig) {
      return;
    }

    const { customerId, apiKey, corpusId } = searchConfig;

    if (!customerId || !apiKey || !corpusId) {
      console.warn(
        "Vectara Search: Customer ID, API key, and Corpus ID are required."
      );
      return;
    }

    const searchContainers = document.querySelectorAll("[data-vectara-search]");
    searchContainers.forEach((searchContainer) => {
      const isSearchContainerUnmounted =
        searchContainer && searchContainer.childNodes.length === 0;
      if (isSearchContainerUnmounted) {
        const root = createRoot(searchContainer);

        root.render(
          <Search
            key={customerId}
            customerId={customerId}
            apiKey={apiKey}
            corpusId={corpusId}
          />
        );

        roots.push(root);
      }
    });
  });

  /**
   * Whenever docusaurus changes route, the nav bar gets rerendered.
   * This means we need to re-mount search into this new navbar instance.
   * When the docusaurus route changes:
   *  1. unmount search
   *  2. wait for the search container to be rendered into new page
   */
  document.addEventListener("onRouteUpdated", () => {
    // Unmount all search containers.
    while (roots.length > 0) {
      const root = roots.pop();
      root?.unmount();
    }

    const nav = document.getElementsByTagName("nav")[0];
    observer.observe(nav, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
  });
})();
