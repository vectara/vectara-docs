"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[8758],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),m=o,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},75777:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(87462),o=(r(67294),r(3905));const a={id:"reset-or-delete-corpus",title:"Resetting and deleting a corpus"},i=void 0,l={unversionedId:"console-ui/reset-or-delete-corpus",id:"console-ui/reset-or-delete-corpus",title:"Resetting and deleting a corpus",description:"If you've decided to stop using a corpus you have three options.",source:"@site/docs/console-ui/reset_or_delete_corpus.md",sourceDirName:"console-ui",slug:"/console-ui/reset-or-delete-corpus",permalink:"/docs/console-ui/reset-or-delete-corpus",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/console-ui/reset_or_delete_corpus.md",tags:[],version:"current",frontMatter:{id:"reset-or-delete-corpus",title:"Resetting and deleting a corpus"},sidebar:"someSidebar",previous:{title:"Creating a corpus",permalink:"/docs/console-ui/creating-a-corpus"},next:{title:"Configuring server access to a corpus",permalink:"/docs/console-ui/configure-server-access-to-corpus"}},s={},c=[{value:"Resetting a corpus",id:"resetting-a-corpus",level:2},{value:"Deleting a corpus",id:"deleting-a-corpus",level:2}],p={toc:c};function u(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"If you've decided to stop using a corpus you have three options."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Disable"),": Disables query or indexing requests. A disabled corpus can be\nreenabled at any time."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Reset"),": Purge all the data within the corpus, but leave the corpus\ndefinition intact."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Delete"),": Purge all the data within the corpus and delete the corpus.\nAll your connected services to the corpus will also cease to function.")),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("strong",{parentName:"p"},"Reset")," and ",(0,o.kt)("strong",{parentName:"p"},"Delete")," operations are irreversable.")),(0,o.kt)("p",null,"You can view these options on the corpus operations tab with their respective\ndescriptions."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Create operations",src:r(20540).Z,width:"2722",height:"1638"})),(0,o.kt)("h2",{id:"resetting-a-corpus"},"Resetting a corpus"),(0,o.kt)("p",null,"To reset a corpus: "),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Click on the ",(0,o.kt)("em",{parentName:"li"},"Reset")," button. A warning modal will appear."),(0,o.kt)("li",{parentName:"ol"},"Enter the full name of the corpus for confirmation (case insensitive)."),(0,o.kt)("li",{parentName:"ol"},"Select ",(0,o.kt)("em",{parentName:"li"},"Reset")," and wait for the confirmation message.")),(0,o.kt)("p",null,"That's it, all the data within the corpus has been purged."),(0,o.kt)("h2",{id:"deleting-a-corpus"},"Deleting a corpus"),(0,o.kt)("p",null,"To permanently delete a corpus: "),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Click on the ",(0,o.kt)("em",{parentName:"li"},"Delete")," button. A warning modal will appear. "),(0,o.kt)("li",{parentName:"ol"},"Enter the full name of the corpus for confirmation (case insensitive)."),(0,o.kt)("li",{parentName:"ol"},"Select ",(0,o.kt)("em",{parentName:"li"},"Delete")," and wait for the confirmation message.")),(0,o.kt)("p",null,"That's it, the corpus has been deleted."))}u.isMDXComponent=!0},20540:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/corpus_operations-7c75a48ef22a32c73a922ab69cf7f597.png"}}]);