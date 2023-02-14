"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[203],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>y});var n=r(67294);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,a=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),l=c(r),m=s,y=l["".concat(p,".").concat(m)]||l[m]||d[m]||a;return r?n.createElement(y,i(i({ref:t},u),{},{components:r})):n.createElement(y,i({ref:t},u))}));function y(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var a=r.length,i=new Array(a);i[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[l]="string"==typeof e?e:s,i[1]=o;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},40248:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var n=r(87462),s=(r(67294),r(3905));const a={id:"RestApiKeyQueries.cs",title:"RestApiKeyQueries.cs",sidebar_label:"C#"},i=void 0,o={unversionedId:"getting-started-samples/RestApiKeyQueries.cs",id:"getting-started-samples/RestApiKeyQueries.cs",title:"RestApiKeyQueries.cs",description:"This is a complete example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at csharp/rest/RestApiKeyQueries.cs",source:"@site/docs/getting-started-samples/RestApiKeyQueries.cs.md",sourceDirName:"getting-started-samples",slug:"/getting-started-samples/RestApiKeyQueries.cs",permalink:"/docs/getting-started-samples/RestApiKeyQueries.cs",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/getting-started-samples/RestApiKeyQueries.cs.md",tags:[],version:"current",frontMatter:{id:"RestApiKeyQueries.cs",title:"RestApiKeyQueries.cs",sidebar_label:"C#"},sidebar:"someSidebar",previous:{title:"Transport Layer Security",permalink:"/docs/tls"},next:{title:"Java",permalink:"/docs/getting-started-samples/RestApiKeyQueries.java"}},p={},c=[],u={toc:c};function l(e){let{components:t,...r}=e;return(0,s.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"This is a complete example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at ",(0,s.kt)("a",{href:"https://github.com/vectara/getting-started/tree/main/language-examples/csharp/rest/RestApiKeyQueries.cs"},"csharp/rest/RestApiKeyQueries.cs")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cs",metastring:'title="csharp/rest/RestApiKeyQueries.cs"',title:'"csharp/rest/RestApiKeyQueries.cs"'},'using CommandLine;\nusing System.Text.Json;\nusing VectaraExampleCommon;\n\nnamespace VectaraExampleRest\n{\n    /// <summary>\n    /// A class containing examples about how to use Vectara API using REST and API Key.\n    /// </summary>\n    class RestApiKeyQueries\n    {\n        static void Main(string[] args)\n        {\n            Parser.Default.ParseArguments<Args>(args)\n                .WithParsed<Args>((args) =>\n                {\n                    Query(args.CustomerId, args.CorpusId, "Test Query.", args.ServingEndpoint, args.ApiKey);\n                })\n                .WithNotParsed<Args>((errs) =>\n                {\n                    foreach (Error err in errs)\n                    {\n                        Console.Error.WriteLine(err.ToString());\n                    }\n                });\n        }\n\n\n        /// <summary>\n        /// Queries a Vectara corpus.\n        /// </summary>\n        /// <param name="customerId"> The unique customer ID in Vectara platform. </param>\n        /// <param name="corpusId"> The corpus that needs to be queried. </param>\n        /// <param name="query"> The query text. </param>\n        /// <param name="servingEndpoint"> Serving API endpoint to which calls will be directed. </param>\n        /// <param name="apiKey"> A valid API Key. </param>\n        private static void Query(long customerId, long corpusId, String query, String servingEndpoint, String apiKey)\n        {\n            using (var client = new HttpClient())\n            {\n                try\n                {\n                    var request = new HttpRequestMessage\n                    {\n                        RequestUri = new Uri($"https://{servingEndpoint}/v1/query"),\n                        Method = HttpMethod.Post,\n                    };\n                    Dictionary<String, Object> queryData = new();\n                    List<Object> queryList = new();\n                    List<Object> corpusList = new();\n                    corpusList.Add(new Dictionary<String, Object>()\n                    {\n                        {"customerId", customerId},\n                        {"corpusId", corpusId}\n                    });\n                    queryList.Add(new Dictionary<String, Object>()\n                    {\n                        {"query", query},\n                        {"numResults", 10},\n                        {"corpusKey", corpusList}\n                    });\n\n                    queryData.Add("query", queryList);\n\n                    string jsonData = JsonSerializer.Serialize(queryData);\n\n                    request.Content = new StringContent(jsonData);\n                    request.Content.Headers.Remove("Content-Type");\n                    request.Content.Headers.Add("Content-Type", "application/json");\n\n                    request.Headers.Add("x-api-key", apiKey);\n                    request.Headers.Add("customer-id", customerId.ToString());\n\n                    HttpResponseMessage response = client.Send(request);\n                    String result = response.Content.ReadAsStringAsync().Result;\n\n                    Console.WriteLine(result);\n                }\n                catch (Exception ex)\n                {\n                    Console.Error.WriteLine(ex.Message);\n                    return;\n                }\n            }\n        }\n   }\n}\n')))}l.isMDXComponent=!0}}]);