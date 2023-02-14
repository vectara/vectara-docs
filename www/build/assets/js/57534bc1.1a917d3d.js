"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[597],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),l=u(n),m=a,y=l["".concat(c,".").concat(m)]||l[m]||d[m]||s;return n?r.createElement(y,i(i({ref:t},p),{},{components:n})):r.createElement(y,i({ref:t},p))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=m;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[l]="string"==typeof e?e:a,i[1]=o;for(var u=2;u<s;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1017:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>u});var r=n(87462),a=(n(67294),n(3905));const s={id:"RestQueryData.cs",title:"RestQueryData.cs",sidebar_label:"C#"},i=void 0,o={unversionedId:"getting-started-samples/RestQueryData.cs",id:"getting-started-samples/RestQueryData.cs",title:"RestQueryData.cs",description:"This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at csharp/rest/RestQueryData.cs",source:"@site/docs/getting-started-samples/RestQueryData.cs.md",sourceDirName:"getting-started-samples",slug:"/getting-started-samples/RestQueryData.cs",permalink:"/docs/getting-started-samples/RestQueryData.cs",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/getting-started-samples/RestQueryData.cs.md",tags:[],version:"current",frontMatter:{id:"RestQueryData.cs",title:"RestQueryData.cs",sidebar_label:"C#"},sidebar:"someSidebar",previous:{title:"API Definition",permalink:"/docs/search-apis/search"},next:{title:"Java",permalink:"/docs/getting-started-samples/RestQuery.java"}},c={},u=[],p={toc:u};function l(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at ",(0,a.kt)("a",{href:"https://github.com/vectara/getting-started/tree/main/language-examples/csharp/rest/RestQueryData.cs"},"csharp/rest/RestQueryData.cs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cs",metastring:'title="csharp/rest/RestQueryData.cs"',title:'"csharp/rest/RestQueryData.cs"'},'using System.Text.Json;\n\nclass RestQueryData\n{\n    /// <summary>\n    /// Queries a Vectara corpus.\n    /// </summary>\n    /// <param name="customerId"> The unique customer ID in Vectara platform. </param>\n    /// <param name="corpusId"> The corpus that needs to be queried. </param>\n    /// <param name="query"> The query text. </param>\n    /// <param name="servingEndpoint"> Serving API endpoint to which calls will be directed. </param>\n    /// <param name="jwtToken"> A valid authentication token. </param>\n    public static void Query(long customerId, long corpusId, String query, String servingEndpoint, String jwtToken)\n    {\n        using (var client = new HttpClient())\n        {\n            try\n            {\n                var request = new HttpRequestMessage\n                {\n                    RequestUri = new Uri($"https://{servingEndpoint}/v1/query"),\n                    Method = HttpMethod.Post,\n                };\n                Dictionary<String, Object> queryData = new();\n                List<Object> queryList = new();\n                List<Object> corpusList = new();\n                corpusList.Add(new Dictionary<String, Object>()\n                    {\n                        {"customerId", customerId},\n                        {"corpusId", corpusId}\n                    });\n                queryList.Add(new Dictionary<String, Object>()\n                    {\n                        {"query", query},\n                        {"numResults", 10},\n                        {"corpusKey", corpusList}\n                    });\n\n                queryData.Add("query", queryList);\n\n                string jsonData = JsonSerializer.Serialize(queryData);\n\n                request.Content = new StringContent(jsonData);\n                request.Content.Headers.Remove("Content-Type");\n                request.Content.Headers.Add("Content-Type", "application/json");\n\n                request.Headers.Add("Authorization", $"Bearer {jwtToken}");\n                request.Headers.Add("customer-id", customerId.ToString());\n\n                HttpResponseMessage response = client.Send(request);\n                String result = response.Content.ReadAsStringAsync().Result;\n\n                Console.WriteLine(result);\n            }\n            catch (Exception ex)\n            {\n                Console.Error.WriteLine(ex.Message);\n                return;\n            }\n        }\n    }\n}\n')))}l.isMDXComponent=!0}}]);