"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[7404,2917],{3905:(t,e,o)=>{o.d(e,{Zo:()=>l,kt:()=>u});var r=o(67294);function a(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function n(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function i(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?n(Object(o),!0).forEach((function(e){a(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function s(t,e){if(null==t)return{};var o,r,a=function(t,e){if(null==t)return{};var o,r,a={},n=Object.keys(t);for(r=0;r<n.length;r++)o=n[r],e.indexOf(o)>=0||(a[o]=t[o]);return a}(t,e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);for(r=0;r<n.length;r++)o=n[r],e.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(t,o)&&(a[o]=t[o])}return a}var p=r.createContext({}),c=function(t){var e=r.useContext(p),o=e;return t&&(o="function"==typeof t?t(e):i(i({},e),t)),o},l=function(t){var e=c(t.components);return r.createElement(p.Provider,{value:e},t.children)},m="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},f=r.forwardRef((function(t,e){var o=t.components,a=t.mdxType,n=t.originalType,p=t.parentName,l=s(t,["components","mdxType","originalType","parentName"]),m=c(o),f=a,u=m["".concat(p,".").concat(f)]||m[f]||d[f]||n;return o?r.createElement(u,i(i({ref:e},l),{},{components:o})):r.createElement(u,i({ref:e},l))}));function u(t,e){var o=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var n=o.length,i=new Array(n);i[0]=f;var s={};for(var p in e)hasOwnProperty.call(e,p)&&(s[p]=e[p]);s.originalType=t,s[m]="string"==typeof t?t:a,i[1]=s;for(var c=2;c<n;c++)i[c]=o[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}f.displayName="MDXCreateElement"},75914:(t,e,o)=>{o.r(e),o.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=o(87462),a=(o(67294),o(3905)),n=o(78473);const i={id:"protobuf-definitions",title:"Protocol Buffer Definitions",sidebar_label:"Protocol Buffers"},s=void 0,p={unversionedId:"protobuf-definitions",id:"protobuf-definitions",title:"Protocol Buffer Definitions",description:"implements a gRPC API to all its core",source:"@site/docs/api_intro.md",sourceDirName:".",slug:"/protobuf-definitions",permalink:"/docs/protobuf-definitions",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/api_intro.md",tags:[],version:"current",frontMatter:{id:"protobuf-definitions",title:"Protocol Buffer Definitions",sidebar_label:"Protocol Buffers"},sidebar:"someSidebar",previous:{title:"Introduction",permalink:"/docs/"},next:{title:"REST APIs",permalink:"/docs/rest"}},c={},l=[{value:"Auxiliary Protocol Buffers",id:"auxiliary-protocol-buffers",level:2},{value:"Examples",id:"examples",level:2}],m={toc:l};function d(t){let{components:e,...o}=t;return(0,a.kt)("wrapper",(0,r.Z)({},m,o,{components:e,mdxType:"MDXLayout"}),(0,a.kt)(n.Config,{v:"names.product",mdxType:"Config"})," implements a ",(0,a.kt)("a",{href:"https://grpc.io/"},"gRPC API")," to all its core services. You can download the proto files directly below.",(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Protobuf"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/vectara/protos/blob/main/services.proto"},"services.proto")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Defines the core services within the platform.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/vectara/protos/blob/main/serving.proto"},"serving.proto")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Message definitions for running queries.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/vectara/protos/blob/main/custom_dim.proto"},"custom_dim.proto")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Message definitions for custom dimensions.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/vectara/protos/blob/main/indexing.proto"},"indexing.proto")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Message definitions for indexing content.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/vectara/protos/blob/main/admin.proto"},"admin.proto")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Message definitions for performing administrative tasks.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/vectara/protos/blob/main/status.proto"},"status.proto")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Status return codes.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/vectara/protos/blob/main/common.proto"},"common.proto")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Common message definitions.")))),(0,a.kt)("h2",{id:"auxiliary-protocol-buffers"},"Auxiliary Protocol Buffers"),(0,a.kt)("p",null,"The gRPC services also use Google's\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/googleapis/googleapis/blob/master/google/api/annotations.proto"},"annotations.proto"),"\nand ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/googleapis/googleapis/blob/master/google/api/http.proto"},"http.proto"),".\nThe curl commands below will download these files into the ",(0,a.kt)("inlineCode",{parentName:"p"},"ext")," subdirectory.\nYou can then reference them in the ",(0,a.kt)("inlineCode",{parentName:"p"},"protoc")," path using ",(0,a.kt)("inlineCode",{parentName:"p"},"-I ext"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"proto $ ls\nadmin.proto  common.proto indexing.proto  services.proto  serving.proto  status.proto\nproto $ mkdir ext\nproto $ curl -s -o ext/google/api/annotations.proto --create-dirs \\\n             https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto\nproto $ curl -s -o ext/google/api/http.proto --create-dirs \\\n             https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto\n")),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/vectara/getting-started"},"Quickstart Examples")," GitHub\nrepository has examples of connecting via gRPC in a variety of languages."))}d.isMDXComponent=!0},78473:(t,e,o)=>{o.r(e),o.d(e,{Config:()=>m,assets:()=>c,contentTitle:()=>s,default:()=>f,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=o(87462),a=(o(67294),o(3905)),n=o(53487);const i={},s=void 0,p={unversionedId:"definitions",id:"definitions",title:"definitions",description:"",source:"@site/docs/definitions.md",sourceDirName:".",slug:"/definitions",permalink:"/docs/definitions",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/definitions.md",tags:[],version:"current",frontMatter:{}},c={},l=[];function m(t){return n.g[t.v]}const d={toc:l,Config:m};function f(t){let{components:e,...o}=t;return(0,a.kt)("wrapper",(0,r.Z)({},d,o,{components:e,mdxType:"MDXLayout"}))}f.isMDXComponent=!0},53487:t=>{t.exports=JSON.parse('{"g":{"domains.rest.serving":"api.vectara.io","domains.rest.admin":"api.vectara.io","domains.rest.indexing":"api.vectara.io","domains.grpc.serving":"serving.vectara.io","domains.grpc.admin":"admin.vectara.io","domains.grpc.indexing":"indexing.vectara.io","domains.oauth":"vectara-prod-${CUSTOMER_ID}.auth.us-west-2.amazoncognito.com","package.protobuf":"com.vectara","package.java":"com.vectara","package.php":"Com\\\\Vectara","names.company":"Vectara","names.product":"Vectara"}}')}}]);