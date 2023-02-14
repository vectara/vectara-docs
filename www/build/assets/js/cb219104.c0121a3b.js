"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[3821,2917],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return n?a.createElement(f,s(s({ref:t},u),{},{components:n})):a.createElement(f,s({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},85162:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(67294),r=n(86010);const o="tabItem_Ymn6";function s(e){let{children:t,hidden:n,className:s}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,s),hidden:n},t)}},65488:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(87462),r=n(67294),o=n(86010),s=n(72389),i=n(67392),l=n(7094),c=n(12466);const u="tabList__CuJ",p="tabItem_LNqP";function d(e){const{lazy:t,block:n,defaultValue:s,values:d,groupId:m,className:f}=e,h=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=d??h.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),b=(0,i.l)(v,((e,t)=>e.value===t.value));if(b.length>0)throw new Error(`Docusaurus error: Duplicate values "${b.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===s?s:s??h.find((e=>e.props.default))?.props.value??h[0].props.value;if(null!==g&&!v.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:w}=(0,l.U)(),[k,x]=(0,r.useState)(g),C=[],{blockElementScrollPositionUntilNextRender:T}=(0,c.o5)();if(null!=m){const e=y[m];null!=e&&e!==k&&v.some((t=>t.value===e))&&x(e)}const O=e=>{const t=e.currentTarget,n=C.indexOf(t),a=v[n].value;a!==k&&(T(t),x(a),null!=m&&w(m,String(a)))},E=e=>{let t=null;switch(e.key){case"Enter":O(e);break;case"ArrowRight":{const n=C.indexOf(e.currentTarget)+1;t=C[n]??C[0];break}case"ArrowLeft":{const n=C.indexOf(e.currentTarget)-1;t=C[n]??C[C.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",u)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},f)},v.map((e=>{let{value:t,label:n,attributes:s}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:k===t?0:-1,"aria-selected":k===t,key:t,ref:e=>C.push(e),onKeyDown:E,onClick:O},s,{className:(0,o.Z)("tabs__item",p,s?.className,{"tabs__item--active":k===t})}),n??t)}))),t?(0,r.cloneElement)(h.filter((e=>e.props.value===k))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==k})))))}function m(e){const t=(0,s.Z)();return r.createElement(d,(0,a.Z)({key:String(t)},e))}},78473:(e,t,n)=>{n.r(t),n.d(t,{Config:()=>p,assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var a=n(87462),r=(n(67294),n(3905)),o=n(53487);const s={},i=void 0,l={unversionedId:"definitions",id:"definitions",title:"definitions",description:"",source:"@site/docs/definitions.md",sourceDirName:".",slug:"/definitions",permalink:"/docs/definitions",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/definitions.md",tags:[],version:"current",frontMatter:{}},c={},u=[];function p(e){return o.g[e.v]}const d={toc:u,Config:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}))}m.isMDXComponent=!0},61574:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var a=n(87462),r=(n(67294),n(3905)),o=(n(65488),n(85162),n(78473));const s={id:"textless",title:"Client-configurable data retention",sidebar_label:"Configurable Data Retention"},i=void 0,l={unversionedId:"textless",id:"textless",title:"Client-configurable data retention",description:"Textless",source:"@site/docs/textless.md",sourceDirName:".",slug:"/textless",permalink:"/docs/textless",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/textless.md",tags:[],version:"current",frontMatter:{id:"textless",title:"Client-configurable data retention",sidebar_label:"Configurable Data Retention"},sidebar:"someSidebar",previous:{title:"Custom Dimensions",permalink:"/docs/custom-dimensions"},next:{title:"Creating a corpus",permalink:"/docs/console-ui/creating-a-corpus"}},c={},u=[{value:"Textless",id:"textless",level:2},{value:"What happens when textless is enabled",id:"what-happens-when-textless-is-enabled",level:2},{value:"Use cases",id:"use-cases",level:2},{value:"Limitations",id:"limitations",level:2}],p={toc:u};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"textless"},"Textless"),(0,r.kt)("p",null,"When you create a corpus ",(0,r.kt)("a",{parentName:"p",href:"/docs/admin-apis/create-corpus"},"via the API")," or the\n",(0,r.kt)("a",{parentName:"p",href:"/docs/console-ui/creating-a-corpus"},"UI"),', you will have the option to create it\nand "don\'t store the text," also known as a "textless" mode.  When this is\nenabled, several things happen in the platform.  This document talks about when\nit\'s appropriate to enable textless, what happens on the platform, and what\nbenefits and limitations it brings.'),(0,r.kt)("h2",{id:"what-happens-when-textless-is-enabled"},"What happens when textless is enabled"),(0,r.kt)("p",null,"When you enable ",(0,r.kt)("inlineCode",{parentName:"p"},"textless")," on a corpus, ",(0,r.kt)(o.Config,{v:"names.product",mdxType:"Config"})," discards\nthe text content of the document immediately after it converts the text to a\nvector.  At that point, the text is no longer recoverable and won't be\nreturned in any ",(0,r.kt)(o.Config,{v:"names.product",mdxType:"Config"})," APIs."),(0,r.kt)("p",null,"Note that ",(0,r.kt)(o.Config,{v:"names.product",mdxType:"Config"})," ",(0,r.kt)("em",{parentName:"p"},"does")," retain any metadata -- including\ndocument IDs -- that were supplied alongside the text.  This allows you to\nretrieve the document from a separate system of record based on the ID to show\nit and also allows ",(0,r.kt)(o.Config,{v:"names.product",mdxType:"Config"})," to perform any metadata-based\nfiltering on the document."),(0,r.kt)("h2",{id:"use-cases"},"Use cases"),(0,r.kt)("p",null,"One use case for ",(0,r.kt)("inlineCode",{parentName:"p"},"textless")," is when you have very sensitive text content.  By\nenabling this feature, the text content becomes unrecoverable\nto ",(0,r.kt)(o.Config,{v:"names.company",mdxType:"Config"})," or to any user that manages to query for and\nfind the document."),(0,r.kt)("p",null,"In general, this feature is optimal for use cases where the cost of any\ninformation leakage is very high.  Note that ",(0,r.kt)(o.Config,{v:"names.product",mdxType:"Config"})," does\n",(0,r.kt)("a",{parentName:"p",href:"/docs/encryption"},"encrypt documents")),(0,r.kt)("h2",{id:"limitations"},"Limitations"),(0,r.kt)("p",null,"Currently, the ",(0,r.kt)("a",{parentName:"p",href:"/docs/search-apis/reranking"},"reranking")," capability relies on\nthe text being stored.  As a result, attempting to rerank search results on any\ncorpora where text storage has been turned off will not work at this time."))}d.isMDXComponent=!0},53487:e=>{e.exports=JSON.parse('{"g":{"domains.rest.serving":"api.vectara.io","domains.rest.admin":"api.vectara.io","domains.rest.indexing":"api.vectara.io","domains.grpc.serving":"serving.vectara.io","domains.grpc.admin":"admin.vectara.io","domains.grpc.indexing":"indexing.vectara.io","domains.oauth":"vectara-prod-${CUSTOMER_ID}.auth.us-west-2.amazoncognito.com","package.protobuf":"com.vectara","package.java":"com.vectara","package.php":"Com\\\\Vectara","names.company":"Vectara","names.product":"Vectara"}}')}}]);