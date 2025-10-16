"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MethodEndpointWrapper;
var react_1 = require("react");
var MethodEndpoint_1 = require("@theme-original/ApiExplorer/MethodEndpoint");
var ApiKeyBadge_1 = require("../../ApiKeyBadge");
var ApiItem_1 = require("../../ApiItem");
function MethodEndpointWrapper(props) {
    // Get API key types from context provided by ApiItem wrapper
    var apiKeyTypes = react_1.default.useContext(ApiItem_1.ApiDataContext);
    return (<>
      <MethodEndpoint_1.default {...props}/>
      {/* Show badge right after the method endpoint if we have API key types */}
      {apiKeyTypes && (<div style={{ marginTop: '8px', marginBottom: '16px' }}>
          <ApiKeyBadge_1.ApiKeyBadge types={apiKeyTypes}/>
        </div>)}
    </>);
}
