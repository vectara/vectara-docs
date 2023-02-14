"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[9380,2917],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>g});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(n),f=a,g=d["".concat(c,".").concat(f)]||d[f]||m[f]||i;return n?r.createElement(g,o(o({ref:t},l),{},{components:n})):r.createElement(g,o({ref:t},l))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},78473:(e,t,n)=>{n.r(t),n.d(t,{Config:()=>d,assets:()=>p,contentTitle:()=>s,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var r=n(87462),a=(n(67294),n(3905)),i=n(53487);const o={},s=void 0,c={unversionedId:"definitions",id:"definitions",title:"definitions",description:"",source:"@site/docs/definitions.md",sourceDirName:".",slug:"/definitions",permalink:"/docs/definitions",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/definitions.md",tags:[],version:"current",frontMatter:{}},p={},l=[];function d(e){return i.g[e.v]}const m={toc:l,Config:d};function f(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}))}f.isMDXComponent=!0},36439:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var r=n(87462),a=(n(67294),n(3905)),i=n(78473);const o={id:"rest",title:"REST APIs",sidebar_label:"REST APIs"},s=void 0,c={unversionedId:"rest",id:"rest",title:"REST APIs",description:"While gRPC provides low latency and excellent scalability, in some scenarios",source:"@site/docs/rest.md",sourceDirName:".",slug:"/rest",permalink:"/docs/rest",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/rest.md",tags:[],version:"current",frontMatter:{id:"rest",title:"REST APIs",sidebar_label:"REST APIs"},sidebar:"someSidebar",previous:{title:"Protocol Buffers",permalink:"/docs/protobuf-definitions"},next:{title:"Transport Layer Security",permalink:"/docs/tls"}},p={},l=[],d={toc:l};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"While gRPC provides low latency and excellent scalability, in some scenarios\nit may be simpler to integrate using REST APIs. Currently, the following\nendpoints are enabled:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"gRPC Endpoint"),(0,a.kt)("th",{parentName:"tr",align:"left"},"REST Endpoint"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)(i.Config,{v:"domains.grpc.admin",mdxType:"Config"})),(0,a.kt)("td",{parentName:"tr",align:"left"},"https://",(0,a.kt)(i.Config,{v:"domains.rest.admin",mdxType:"Config"})),(0,a.kt)("td",{parentName:"tr",align:"left"},"Administrative")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)(i.Config,{v:"domains.grpc.indexing",mdxType:"Config"})),(0,a.kt)("td",{parentName:"tr",align:"left"},"https://",(0,a.kt)(i.Config,{v:"domains.rest.indexing",mdxType:"Config"})),(0,a.kt)("td",{parentName:"tr",align:"left"},"Indexing")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)(i.Config,{v:"domains.grpc.serving",mdxType:"Config"})),(0,a.kt)("td",{parentName:"tr",align:"left"},"https://",(0,a.kt)(i.Config,{v:"domains.rest.serving",mdxType:"Config"})),(0,a.kt)("td",{parentName:"tr",align:"left"},"Query serving")))),(0,a.kt)("p",null,"Refer to the Serving, Indexing, and Admin API guides for inline code examples\nthat use cURL to access the platform. For more information about how gRPC\nintegrates with REST, see ",(0,a.kt)("a",{parentName:"p",href:"https://grpc.io/blog/coreos/"},"gRPC with REST and Open APIs"),"."))}m.isMDXComponent=!0},53487:e=>{e.exports=JSON.parse('{"g":{"domains.rest.serving":"api.vectara.io","domains.rest.admin":"api.vectara.io","domains.rest.indexing":"api.vectara.io","domains.grpc.serving":"serving.vectara.io","domains.grpc.admin":"admin.vectara.io","domains.grpc.indexing":"indexing.vectara.io","domains.oauth":"vectara-prod-${CUSTOMER_ID}.auth.us-west-2.amazoncognito.com","package.protobuf":"com.vectara","package.java":"com.vectara","package.php":"Com\\\\Vectara","names.company":"Vectara","names.product":"Vectara"}}')}}]);