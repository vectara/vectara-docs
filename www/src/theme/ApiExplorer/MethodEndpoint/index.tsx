import React from 'react';
import MethodEndpoint from '@theme-original/ApiExplorer/MethodEndpoint';
import { ApiKeyBadge } from '../../ApiKeyBadge';
import { ApiDataContext } from '../../ApiItem';

interface MethodEndpointProps {
  [key: string]: any;
}

export default function MethodEndpointWrapper(props: MethodEndpointProps) {
  // Get API key types from context provided by ApiItem wrapper
  const apiKeyTypes = React.useContext(ApiDataContext);

  return (
    <>
      <MethodEndpoint {...props} />
      {/* Show badge right after the method endpoint if we have API key types */}
      {apiKeyTypes && (
        <div style={{ marginTop: '8px', marginBottom: '16px' }}>
          <ApiKeyBadge types={apiKeyTypes} />
        </div>
      )}
    </>
  );
}