import React from 'react';
import ApiItem from '@theme-original/ApiItem';
import type { WrapperProps } from '@docusaurus/types';
import { ungzip } from 'pako';

interface ApiItemProps {
  [key: string]: any;
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Create a context to share API data with child components
export const ApiDataContext = React.createContext<string[] | null>(null);

export default function ApiItemWrapper(props: WrapperProps<ApiItemProps>) {
  let apiKeyTypes: string[] | null = null;
  
  // Extract API data from frontMatter
  const { frontMatter } = props.content || {};
  
  if (frontMatter?.api) {
    try {
      const api = JSON.parse(
        new TextDecoder().decode(ungzip(base64ToUint8Array(frontMatter.api)))
      );
      
      // Access the custom x-required-api-key-type extension
      apiKeyTypes = api['x-required-api-key-type'] || null;
      
    } catch (error) {
      console.error('Failed to parse API data:', error);
      apiKeyTypes = null;
    }
  }
  
  return (
    <ApiDataContext.Provider value={apiKeyTypes}>
      <ApiItem {...props} />
    </ApiDataContext.Provider>
  );
}