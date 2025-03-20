import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { ReactSearch } from "@vectara/react-search";

const SearchBar = () => {
  const containerRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !rootRef.current) {
      rootRef.current = createRoot(containerRef.current);
      rootRef.current.render(<ReactSearch />);
    }
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default SearchBar;