"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _postmanCollection = _interopRequireDefault(require("@paloaltonetworks/postman-collection"));
var _Curl = _interopRequireDefault(require("@theme/ApiDemoPanel/Curl"));
var _MethodEndpoint = _interopRequireDefault(require("@theme/ApiDemoPanel/MethodEndpoint"));
var _Request = _interopRequireDefault(require("@theme/ApiDemoPanel/Request"));
var _Response = _interopRequireDefault(require("@theme/ApiDemoPanel/Response"));
var _SecuritySchemes = _interopRequireDefault(require("@theme/ApiDemoPanel/SecuritySchemes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function ApiDemoPanel({
  item,
  infoPath
}) {
  var _xCodeSamples;
  const postman = new _postmanCollection.default.Request(item.postman);
  const {
    path,
    method
  } = item;
  return <div>
      <_MethodEndpoint.default method={method} path={path} />
      <_SecuritySchemes.default infoPath={infoPath} />
      <_Request.default item={item} />
      <_Response.default />
      <_Curl.default postman={postman} codeSamples={(_xCodeSamples = item["x-code-samples"]) !== null && _xCodeSamples !== void 0 ? _xCodeSamples : []} />
    </div>;
}
var _default = ApiDemoPanel;
exports.default = _default;