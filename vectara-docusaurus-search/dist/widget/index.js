var uy=Object.create;var Hc=Object.defineProperty;var sy=Object.getOwnPropertyDescriptor;var hy=Object.getOwnPropertyNames;var dy=Object.getPrototypeOf,vy=Object.prototype.hasOwnProperty;var G0=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var py=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of hy(e))!vy.call(t,o)&&o!==r&&Hc(t,o,{get:()=>e[o],enumerable:!(i=sy(e,o))||i.enumerable});return t};var B=(t,e,r)=>(r=t!=null?uy(dy(t)):{},py(e||!t||!t.__esModule?Hc(r,"default",{value:t,enumerable:!0}):r,t));var kc=G0(s1=>{"use strict";var _4=Symbol.for("react.element"),fy=Symbol.for("react.portal"),gy=Symbol.for("react.fragment"),my=Symbol.for("react.strict_mode"),xy=Symbol.for("react.profiler"),zy=Symbol.for("react.provider"),By=Symbol.for("react.context"),My=Symbol.for("react.forward_ref"),wy=Symbol.for("react.suspense"),yy=Symbol.for("react.memo"),Hy=Symbol.for("react.lazy"),Sc=Symbol.iterator;function Sy(t){return t===null||typeof t!="object"?null:(t=Sc&&t[Sc]||t["@@iterator"],typeof t=="function"?t:null)}var Lc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ac=Object.assign,bc={};function vr(t,e,r){this.props=t,this.context=e,this.refs=bc,this.updater=r||Lc}vr.prototype.isReactComponent={};vr.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};vr.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function _c(){}_c.prototype=vr.prototype;function s5(t,e,r){this.props=t,this.context=e,this.refs=bc,this.updater=r||Lc}var h5=s5.prototype=new _c;h5.constructor=s5;Ac(h5,vr.prototype);h5.isPureReactComponent=!0;var Cc=Array.isArray,Rc=Object.prototype.hasOwnProperty,d5={current:null},Ec={key:!0,ref:!0,__self:!0,__source:!0};function Tc(t,e,r){var i,o={},c=null,u=null;if(e!=null)for(i in e.ref!==void 0&&(u=e.ref),e.key!==void 0&&(c=""+e.key),e)Rc.call(e,i)&&!Ec.hasOwnProperty(i)&&(o[i]=e[i]);var h=arguments.length-2;if(h===1)o.children=r;else if(1<h){for(var d=Array(h),p=0;p<h;p++)d[p]=arguments[p+2];o.children=d}if(t&&t.defaultProps)for(i in h=t.defaultProps,h)o[i]===void 0&&(o[i]=h[i]);return{$$typeof:_4,type:t,key:c,ref:u,props:o,_owner:d5.current}}function Cy(t,e){return{$$typeof:_4,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function v5(t){return typeof t=="object"&&t!==null&&t.$$typeof===_4}function Vy(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(r){return e[r]})}var Vc=/\/+/g;function u5(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Vy(""+t.key):e.toString(36)}function In(t,e,r,i,o){var c=typeof t;(c==="undefined"||c==="boolean")&&(t=null);var u=!1;if(t===null)u=!0;else switch(c){case"string":case"number":u=!0;break;case"object":switch(t.$$typeof){case _4:case fy:u=!0}}if(u)return u=t,o=o(u),t=i===""?"."+u5(u,0):i,Cc(o)?(r="",t!=null&&(r=t.replace(Vc,"$&/")+"/"),In(o,e,r,"",function(p){return p})):o!=null&&(v5(o)&&(o=Cy(o,r+(!o.key||u&&u.key===o.key?"":(""+o.key).replace(Vc,"$&/")+"/")+t)),e.push(o)),1;if(u=0,i=i===""?".":i+":",Cc(t))for(var h=0;h<t.length;h++){c=t[h];var d=i+u5(c,h);u+=In(c,e,r,d,o)}else if(d=Sy(t),typeof d=="function")for(t=d.call(t),h=0;!(c=t.next()).done;)c=c.value,d=i+u5(c,h++),u+=In(c,e,r,d,o);else if(c==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return u}function kn(t,e,r){if(t==null)return t;var i=[],o=0;return In(t,i,"","",function(c){return e.call(r,c,o++)}),i}function Ly(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(r){(t._status===0||t._status===-1)&&(t._status=1,t._result=r)},function(r){(t._status===0||t._status===-1)&&(t._status=2,t._result=r)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var w0={current:null},Nn={transition:null},Ay={ReactCurrentDispatcher:w0,ReactCurrentBatchConfig:Nn,ReactCurrentOwner:d5};s1.Children={map:kn,forEach:function(t,e,r){kn(t,function(){e.apply(this,arguments)},r)},count:function(t){var e=0;return kn(t,function(){e++}),e},toArray:function(t){return kn(t,function(e){return e})||[]},only:function(t){if(!v5(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};s1.Component=vr;s1.Fragment=gy;s1.Profiler=xy;s1.PureComponent=s5;s1.StrictMode=my;s1.Suspense=wy;s1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ay;s1.cloneElement=function(t,e,r){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Ac({},t.props),o=t.key,c=t.ref,u=t._owner;if(e!=null){if(e.ref!==void 0&&(c=e.ref,u=d5.current),e.key!==void 0&&(o=""+e.key),t.type&&t.type.defaultProps)var h=t.type.defaultProps;for(d in e)Rc.call(e,d)&&!Ec.hasOwnProperty(d)&&(i[d]=e[d]===void 0&&h!==void 0?h[d]:e[d])}var d=arguments.length-2;if(d===1)i.children=r;else if(1<d){h=Array(d);for(var p=0;p<d;p++)h[p]=arguments[p+2];i.children=h}return{$$typeof:_4,type:t.type,key:o,ref:c,props:i,_owner:u}};s1.createContext=function(t){return t={$$typeof:By,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:zy,_context:t},t.Consumer=t};s1.createElement=Tc;s1.createFactory=function(t){var e=Tc.bind(null,t);return e.type=t,e};s1.createRef=function(){return{current:null}};s1.forwardRef=function(t){return{$$typeof:My,render:t}};s1.isValidElement=v5;s1.lazy=function(t){return{$$typeof:Hy,_payload:{_status:-1,_result:t},_init:Ly}};s1.memo=function(t,e){return{$$typeof:yy,type:t,compare:e===void 0?null:e}};s1.startTransition=function(t){var e=Nn.transition;Nn.transition={};try{t()}finally{Nn.transition=e}};s1.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};s1.useCallback=function(t,e){return w0.current.useCallback(t,e)};s1.useContext=function(t){return w0.current.useContext(t)};s1.useDebugValue=function(){};s1.useDeferredValue=function(t){return w0.current.useDeferredValue(t)};s1.useEffect=function(t,e){return w0.current.useEffect(t,e)};s1.useId=function(){return w0.current.useId()};s1.useImperativeHandle=function(t,e,r){return w0.current.useImperativeHandle(t,e,r)};s1.useInsertionEffect=function(t,e){return w0.current.useInsertionEffect(t,e)};s1.useLayoutEffect=function(t,e){return w0.current.useLayoutEffect(t,e)};s1.useMemo=function(t,e){return w0.current.useMemo(t,e)};s1.useReducer=function(t,e,r){return w0.current.useReducer(t,e,r)};s1.useRef=function(t){return w0.current.useRef(t)};s1.useState=function(t){return w0.current.useState(t)};s1.useSyncExternalStore=function(t,e,r){return w0.current.useSyncExternalStore(t,e,r)};s1.useTransition=function(){return w0.current.useTransition()};s1.version="18.2.0"});var X=G0((MA,Ic)=>{"use strict";Ic.exports=kc()});var Gc=G0(y1=>{"use strict";function m5(t,e){var r=t.length;t.push(e);t:for(;0<r;){var i=r-1>>>1,o=t[i];if(0<Pn(o,e))t[i]=e,t[r]=o,r=i;else break t}}function _t(t){return t.length===0?null:t[0]}function On(t){if(t.length===0)return null;var e=t[0],r=t.pop();if(r!==e){t[0]=r;t:for(var i=0,o=t.length,c=o>>>1;i<c;){var u=2*(i+1)-1,h=t[u],d=u+1,p=t[d];if(0>Pn(h,r))d<o&&0>Pn(p,h)?(t[i]=p,t[d]=r,i=d):(t[i]=h,t[u]=r,i=u);else if(d<o&&0>Pn(p,r))t[i]=p,t[d]=r,i=d;else break t}}return e}function Pn(t,e){var r=t.sortIndex-e.sortIndex;return r!==0?r:t.id-e.id}typeof performance=="object"&&typeof performance.now=="function"?(Nc=performance,y1.unstable_now=function(){return Nc.now()}):(p5=Date,Pc=p5.now(),y1.unstable_now=function(){return p5.now()-Pc});var Nc,p5,Pc,Gt=[],I2=[],by=1,ft=null,d0=3,Dn=!1,Me=!1,E4=!1,Dc=typeof setTimeout=="function"?setTimeout:null,Uc=typeof clearTimeout=="function"?clearTimeout:null,Fc=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x5(t){for(var e=_t(I2);e!==null;){if(e.callback===null)On(I2);else if(e.startTime<=t)On(I2),e.sortIndex=e.expirationTime,m5(Gt,e);else break;e=_t(I2)}}function z5(t){if(E4=!1,x5(t),!Me)if(_t(Gt)!==null)Me=!0,M5(B5);else{var e=_t(I2);e!==null&&w5(z5,e.startTime-t)}}function B5(t,e){Me=!1,E4&&(E4=!1,Uc(T4),T4=-1),Dn=!0;var r=d0;try{for(x5(e),ft=_t(Gt);ft!==null&&(!(ft.expirationTime>e)||t&&!jc());){var i=ft.callback;if(typeof i=="function"){ft.callback=null,d0=ft.priorityLevel;var o=i(ft.expirationTime<=e);e=y1.unstable_now(),typeof o=="function"?ft.callback=o:ft===_t(Gt)&&On(Gt),x5(e)}else On(Gt);ft=_t(Gt)}if(ft!==null)var c=!0;else{var u=_t(I2);u!==null&&w5(z5,u.startTime-e),c=!1}return c}finally{ft=null,d0=r,Dn=!1}}var Un=!1,Fn=null,T4=-1,Wc=5,$c=-1;function jc(){return!(y1.unstable_now()-$c<Wc)}function f5(){if(Fn!==null){var t=y1.unstable_now();$c=t;var e=!0;try{e=Fn(!0,t)}finally{e?R4():(Un=!1,Fn=null)}}else Un=!1}var R4;typeof Fc=="function"?R4=function(){Fc(f5)}:typeof MessageChannel<"u"?(g5=new MessageChannel,Oc=g5.port2,g5.port1.onmessage=f5,R4=function(){Oc.postMessage(null)}):R4=function(){Dc(f5,0)};var g5,Oc;function M5(t){Fn=t,Un||(Un=!0,R4())}function w5(t,e){T4=Dc(function(){t(y1.unstable_now())},e)}y1.unstable_IdlePriority=5;y1.unstable_ImmediatePriority=1;y1.unstable_LowPriority=4;y1.unstable_NormalPriority=3;y1.unstable_Profiling=null;y1.unstable_UserBlockingPriority=2;y1.unstable_cancelCallback=function(t){t.callback=null};y1.unstable_continueExecution=function(){Me||Dn||(Me=!0,M5(B5))};y1.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Wc=0<t?Math.floor(1e3/t):5};y1.unstable_getCurrentPriorityLevel=function(){return d0};y1.unstable_getFirstCallbackNode=function(){return _t(Gt)};y1.unstable_next=function(t){switch(d0){case 1:case 2:case 3:var e=3;break;default:e=d0}var r=d0;d0=e;try{return t()}finally{d0=r}};y1.unstable_pauseExecution=function(){};y1.unstable_requestPaint=function(){};y1.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var r=d0;d0=t;try{return e()}finally{d0=r}};y1.unstable_scheduleCallback=function(t,e,r){var i=y1.unstable_now();switch(typeof r=="object"&&r!==null?(r=r.delay,r=typeof r=="number"&&0<r?i+r:i):r=i,t){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=r+o,t={id:by++,callback:e,priorityLevel:t,startTime:r,expirationTime:o,sortIndex:-1},r>i?(t.sortIndex=r,m5(I2,t),_t(Gt)===null&&t===_t(I2)&&(E4?(Uc(T4),T4=-1):E4=!0,w5(z5,r-i))):(t.sortIndex=o,m5(Gt,t),Me||Dn||(Me=!0,M5(B5))),t};y1.unstable_shouldYield=jc;y1.unstable_wrapCallback=function(t){var e=d0;return function(){var r=d0;d0=e;try{return t.apply(this,arguments)}finally{d0=r}}}});var Xc=G0((yA,Kc)=>{"use strict";Kc.exports=Gc()});var td=G0(Q0=>{"use strict";var es=X(),Y0=Xc();function W(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var rs=new Set,ra={};function Te(t,e){Tr(t,e),Tr(t+"Capture",e)}function Tr(t,e){for(ra[t]=e,t=0;t<e.length;t++)rs.add(e[t])}var m2=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),j5=Object.prototype.hasOwnProperty,_y=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qc={},Yc={};function Ry(t){return j5.call(Yc,t)?!0:j5.call(qc,t)?!1:_y.test(t)?Yc[t]=!0:(qc[t]=!0,!1)}function Ey(t,e,r,i){if(r!==null&&r.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:r!==null?!r.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Ty(t,e,r,i){if(e===null||typeof e>"u"||Ey(t,e,r,i))return!0;if(i)return!1;if(r!==null)switch(r.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function S0(t,e,r,i,o,c,u){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=o,this.mustUseProperty=r,this.propertyName=t,this.type=e,this.sanitizeURL=c,this.removeEmptyString=u}var l0={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){l0[t]=new S0(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];l0[e]=new S0(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){l0[t]=new S0(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){l0[t]=new S0(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){l0[t]=new S0(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){l0[t]=new S0(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){l0[t]=new S0(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){l0[t]=new S0(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){l0[t]=new S0(t,5,!1,t.toLowerCase(),null,!1,!1)});var N9=/[\-:]([a-z])/g;function P9(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(N9,P9);l0[e]=new S0(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(N9,P9);l0[e]=new S0(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(N9,P9);l0[e]=new S0(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){l0[t]=new S0(t,1,!1,t.toLowerCase(),null,!1,!1)});l0.xlinkHref=new S0("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){l0[t]=new S0(t,1,!1,t.toLowerCase(),null,!0,!0)});function F9(t,e,r,i){var o=l0.hasOwnProperty(e)?l0[e]:null;(o!==null?o.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Ty(e,r,o,i)&&(r=null),i||o===null?Ry(e)&&(r===null?t.removeAttribute(e):t.setAttribute(e,""+r)):o.mustUseProperty?t[o.propertyName]=r===null?o.type===3?!1:"":r:(e=o.attributeName,i=o.attributeNamespace,r===null?t.removeAttribute(e):(o=o.type,r=o===3||o===4&&r===!0?"":""+r,i?t.setAttributeNS(i,e,r):t.setAttribute(e,r))))}var M2=es.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Wn=Symbol.for("react.element"),gr=Symbol.for("react.portal"),mr=Symbol.for("react.fragment"),O9=Symbol.for("react.strict_mode"),G5=Symbol.for("react.profiler"),as=Symbol.for("react.provider"),ns=Symbol.for("react.context"),D9=Symbol.for("react.forward_ref"),K5=Symbol.for("react.suspense"),X5=Symbol.for("react.suspense_list"),U9=Symbol.for("react.memo"),P2=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var is=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Zc=Symbol.iterator;function k4(t){return t===null||typeof t!="object"?null:(t=Zc&&t[Zc]||t["@@iterator"],typeof t=="function"?t:null)}var N1=Object.assign,y5;function W4(t){if(y5===void 0)try{throw Error()}catch(r){var e=r.stack.trim().match(/\n( *(at )?)/);y5=e&&e[1]||""}return`
`+y5+t}var H5=!1;function S5(t,e){if(!t||H5)return"";H5=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(p){var i=p}Reflect.construct(t,[],e)}else{try{e.call()}catch(p){i=p}t.call(e.prototype)}else{try{throw Error()}catch(p){i=p}t()}}catch(p){if(p&&i&&typeof p.stack=="string"){for(var o=p.stack.split(`
`),c=i.stack.split(`
`),u=o.length-1,h=c.length-1;1<=u&&0<=h&&o[u]!==c[h];)h--;for(;1<=u&&0<=h;u--,h--)if(o[u]!==c[h]){if(u!==1||h!==1)do if(u--,h--,0>h||o[u]!==c[h]){var d=`
`+o[u].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=u&&0<=h);break}}}finally{H5=!1,Error.prepareStackTrace=r}return(t=t?t.displayName||t.name:"")?W4(t):""}function ky(t){switch(t.tag){case 5:return W4(t.type);case 16:return W4("Lazy");case 13:return W4("Suspense");case 19:return W4("SuspenseList");case 0:case 2:case 15:return t=S5(t.type,!1),t;case 11:return t=S5(t.type.render,!1),t;case 1:return t=S5(t.type,!0),t;default:return""}}function q5(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case mr:return"Fragment";case gr:return"Portal";case G5:return"Profiler";case O9:return"StrictMode";case K5:return"Suspense";case X5:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case ns:return(t.displayName||"Context")+".Consumer";case as:return(t._context.displayName||"Context")+".Provider";case D9:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case U9:return e=t.displayName||null,e!==null?e:q5(t.type)||"Memo";case P2:e=t._payload,t=t._init;try{return q5(t(e))}catch{}}return null}function Iy(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return q5(e);case 8:return e===O9?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Q2(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function os(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ny(t){var e=os(t)?"checked":"value",r=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,c=r.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return o.call(this)},set:function(u){i=""+u,c.call(this,u)}}),Object.defineProperty(t,e,{enumerable:r.enumerable}),{getValue:function(){return i},setValue:function(u){i=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function $n(t){t._valueTracker||(t._valueTracker=Ny(t))}function ls(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var r=e.getValue(),i="";return t&&(i=os(t)?t.checked?"true":"false":t.value),t=i,t!==r?(e.setValue(t),!0):!1}function x3(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Y5(t,e){var r=e.checked;return N1({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??t._wrapperState.initialChecked})}function Qc(t,e){var r=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;r=Q2(e.value!=null?e.value:r),t._wrapperState={initialChecked:i,initialValue:r,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function cs(t,e){e=e.checked,e!=null&&F9(t,"checked",e,!1)}function Z5(t,e){cs(t,e);var r=Q2(e.value),i=e.type;if(r!=null)i==="number"?(r===0&&t.value===""||t.value!=r)&&(t.value=""+r):t.value!==""+r&&(t.value=""+r);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Q5(t,e.type,r):e.hasOwnProperty("defaultValue")&&Q5(t,e.type,Q2(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Jc(t,e,r){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,r||e===t.value||(t.value=e),t.defaultValue=e}r=t.name,r!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,r!==""&&(t.name=r)}function Q5(t,e,r){(e!=="number"||x3(t.ownerDocument)!==t)&&(r==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+r&&(t.defaultValue=""+r))}var $4=Array.isArray;function Lr(t,e,r,i){if(t=t.options,e){e={};for(var o=0;o<r.length;o++)e["$"+r[o]]=!0;for(r=0;r<t.length;r++)o=e.hasOwnProperty("$"+t[r].value),t[r].selected!==o&&(t[r].selected=o),o&&i&&(t[r].defaultSelected=!0)}else{for(r=""+Q2(r),e=null,o=0;o<t.length;o++){if(t[o].value===r){t[o].selected=!0,i&&(t[o].defaultSelected=!0);return}e!==null||t[o].disabled||(e=t[o])}e!==null&&(e.selected=!0)}}function J5(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(W(91));return N1({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function tu(t,e){var r=e.value;if(r==null){if(r=e.children,e=e.defaultValue,r!=null){if(e!=null)throw Error(W(92));if($4(r)){if(1<r.length)throw Error(W(93));r=r[0]}e=r}e==null&&(e=""),r=e}t._wrapperState={initialValue:Q2(r)}}function us(t,e){var r=Q2(e.value),i=Q2(e.defaultValue);r!=null&&(r=""+r,r!==t.value&&(t.value=r),e.defaultValue==null&&t.defaultValue!==r&&(t.defaultValue=r)),i!=null&&(t.defaultValue=""+i)}function eu(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function ss(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function t9(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?ss(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var jn,hs=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,r,i,o){MSApp.execUnsafeLocalFunction(function(){return t(e,r,i,o)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(jn=jn||document.createElement("div"),jn.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=jn.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function aa(t,e){if(e){var r=t.firstChild;if(r&&r===t.lastChild&&r.nodeType===3){r.nodeValue=e;return}}t.textContent=e}var K4={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Py=["Webkit","ms","Moz","O"];Object.keys(K4).forEach(function(t){Py.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),K4[e]=K4[t]})});function ds(t,e,r){return e==null||typeof e=="boolean"||e===""?"":r||typeof e!="number"||e===0||K4.hasOwnProperty(t)&&K4[t]?(""+e).trim():e+"px"}function vs(t,e){t=t.style;for(var r in e)if(e.hasOwnProperty(r)){var i=r.indexOf("--")===0,o=ds(r,e[r],i);r==="float"&&(r="cssFloat"),i?t.setProperty(r,o):t[r]=o}}var Fy=N1({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function e9(t,e){if(e){if(Fy[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(W(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(W(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(W(61))}if(e.style!=null&&typeof e.style!="object")throw Error(W(62))}}function r9(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var a9=null;function W9(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var n9=null,Ar=null,br=null;function ru(t){if(t=Ma(t)){if(typeof n9!="function")throw Error(W(280));var e=t.stateNode;e&&(e=G3(e),n9(t.stateNode,t.type,e))}}function ps(t){Ar?br?br.push(t):br=[t]:Ar=t}function fs(){if(Ar){var t=Ar,e=br;if(br=Ar=null,ru(t),e)for(t=0;t<e.length;t++)ru(e[t])}}function gs(t,e){return t(e)}function ms(){}var C5=!1;function xs(t,e,r){if(C5)return t(e,r);C5=!0;try{return gs(t,e,r)}finally{C5=!1,(Ar!==null||br!==null)&&(ms(),fs())}}function na(t,e){var r=t.stateNode;if(r===null)return null;var i=G3(r);if(i===null)return null;r=i[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break t;default:t=!1}if(t)return null;if(r&&typeof r!="function")throw Error(W(231,e,typeof r));return r}var i9=!1;if(m2)try{pr={},Object.defineProperty(pr,"passive",{get:function(){i9=!0}}),window.addEventListener("test",pr,pr),window.removeEventListener("test",pr,pr)}catch{i9=!1}var pr;function Oy(t,e,r,i,o,c,u,h,d){var p=Array.prototype.slice.call(arguments,3);try{e.apply(r,p)}catch(H){this.onError(H)}}var X4=!1,z3=null,B3=!1,o9=null,Dy={onError:function(t){X4=!0,z3=t}};function Uy(t,e,r,i,o,c,u,h,d){X4=!1,z3=null,Oy.apply(Dy,arguments)}function Wy(t,e,r,i,o,c,u,h,d){if(Uy.apply(this,arguments),X4){if(X4){var p=z3;X4=!1,z3=null}else throw Error(W(198));B3||(B3=!0,o9=p)}}function ke(t){var e=t,r=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(r=e.return),t=e.return;while(t)}return e.tag===3?r:null}function zs(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function au(t){if(ke(t)!==t)throw Error(W(188))}function $y(t){var e=t.alternate;if(!e){if(e=ke(t),e===null)throw Error(W(188));return e!==t?null:t}for(var r=t,i=e;;){var o=r.return;if(o===null)break;var c=o.alternate;if(c===null){if(i=o.return,i!==null){r=i;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===r)return au(o),t;if(c===i)return au(o),e;c=c.sibling}throw Error(W(188))}if(r.return!==i.return)r=o,i=c;else{for(var u=!1,h=o.child;h;){if(h===r){u=!0,r=o,i=c;break}if(h===i){u=!0,i=o,r=c;break}h=h.sibling}if(!u){for(h=c.child;h;){if(h===r){u=!0,r=c,i=o;break}if(h===i){u=!0,i=c,r=o;break}h=h.sibling}if(!u)throw Error(W(189))}}if(r.alternate!==i)throw Error(W(190))}if(r.tag!==3)throw Error(W(188));return r.stateNode.current===r?t:e}function Bs(t){return t=$y(t),t!==null?Ms(t):null}function Ms(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Ms(t);if(e!==null)return e;t=t.sibling}return null}var ws=Y0.unstable_scheduleCallback,nu=Y0.unstable_cancelCallback,jy=Y0.unstable_shouldYield,Gy=Y0.unstable_requestPaint,W1=Y0.unstable_now,Ky=Y0.unstable_getCurrentPriorityLevel,$9=Y0.unstable_ImmediatePriority,ys=Y0.unstable_UserBlockingPriority,M3=Y0.unstable_NormalPriority,Xy=Y0.unstable_LowPriority,Hs=Y0.unstable_IdlePriority,U3=null,Yt=null;function qy(t){if(Yt&&typeof Yt.onCommitFiberRoot=="function")try{Yt.onCommitFiberRoot(U3,t,void 0,(t.current.flags&128)===128)}catch{}}var It=Math.clz32?Math.clz32:Qy,Yy=Math.log,Zy=Math.LN2;function Qy(t){return t>>>=0,t===0?32:31-(Yy(t)/Zy|0)|0}var Gn=64,Kn=4194304;function j4(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function w3(t,e){var r=t.pendingLanes;if(r===0)return 0;var i=0,o=t.suspendedLanes,c=t.pingedLanes,u=r&268435455;if(u!==0){var h=u&~o;h!==0?i=j4(h):(c&=u,c!==0&&(i=j4(c)))}else u=r&~o,u!==0?i=j4(u):c!==0&&(i=j4(c));if(i===0)return 0;if(e!==0&&e!==i&&!(e&o)&&(o=i&-i,c=e&-e,o>=c||o===16&&(c&4194240)!==0))return e;if(i&4&&(i|=r&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)r=31-It(e),o=1<<r,i|=t[r],e&=~o;return i}function Jy(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tH(t,e){for(var r=t.suspendedLanes,i=t.pingedLanes,o=t.expirationTimes,c=t.pendingLanes;0<c;){var u=31-It(c),h=1<<u,d=o[u];d===-1?(!(h&r)||h&i)&&(o[u]=Jy(h,e)):d<=e&&(t.expiredLanes|=h),c&=~h}}function l9(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ss(){var t=Gn;return Gn<<=1,!(Gn&4194240)&&(Gn=64),t}function V5(t){for(var e=[],r=0;31>r;r++)e.push(t);return e}function za(t,e,r){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-It(e),t[e]=r}function eH(t,e){var r=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<r;){var o=31-It(r),c=1<<o;e[o]=0,i[o]=-1,t[o]=-1,r&=~c}}function j9(t,e){var r=t.entangledLanes|=e;for(t=t.entanglements;r;){var i=31-It(r),o=1<<i;o&e|t[i]&e&&(t[i]|=e),r&=~o}}var z1=0;function Cs(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Vs,G9,Ls,As,bs,c9=!1,Xn=[],$2=null,j2=null,G2=null,ia=new Map,oa=new Map,O2=[],rH="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function iu(t,e){switch(t){case"focusin":case"focusout":$2=null;break;case"dragenter":case"dragleave":j2=null;break;case"mouseover":case"mouseout":G2=null;break;case"pointerover":case"pointerout":ia.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":oa.delete(e.pointerId)}}function I4(t,e,r,i,o,c){return t===null||t.nativeEvent!==c?(t={blockedOn:e,domEventName:r,eventSystemFlags:i,nativeEvent:c,targetContainers:[o]},e!==null&&(e=Ma(e),e!==null&&G9(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,o!==null&&e.indexOf(o)===-1&&e.push(o),t)}function aH(t,e,r,i,o){switch(e){case"focusin":return $2=I4($2,t,e,r,i,o),!0;case"dragenter":return j2=I4(j2,t,e,r,i,o),!0;case"mouseover":return G2=I4(G2,t,e,r,i,o),!0;case"pointerover":var c=o.pointerId;return ia.set(c,I4(ia.get(c)||null,t,e,r,i,o)),!0;case"gotpointercapture":return c=o.pointerId,oa.set(c,I4(oa.get(c)||null,t,e,r,i,o)),!0}return!1}function _s(t){var e=He(t.target);if(e!==null){var r=ke(e);if(r!==null){if(e=r.tag,e===13){if(e=zs(r),e!==null){t.blockedOn=e,bs(t.priority,function(){Ls(r)});return}}else if(e===3&&r.stateNode.current.memoizedState.isDehydrated){t.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}t.blockedOn=null}function c3(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var r=u9(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(r===null){r=t.nativeEvent;var i=new r.constructor(r.type,r);a9=i,r.target.dispatchEvent(i),a9=null}else return e=Ma(r),e!==null&&G9(e),t.blockedOn=r,!1;e.shift()}return!0}function ou(t,e,r){c3(t)&&r.delete(e)}function nH(){c9=!1,$2!==null&&c3($2)&&($2=null),j2!==null&&c3(j2)&&(j2=null),G2!==null&&c3(G2)&&(G2=null),ia.forEach(ou),oa.forEach(ou)}function N4(t,e){t.blockedOn===e&&(t.blockedOn=null,c9||(c9=!0,Y0.unstable_scheduleCallback(Y0.unstable_NormalPriority,nH)))}function la(t){function e(o){return N4(o,t)}if(0<Xn.length){N4(Xn[0],t);for(var r=1;r<Xn.length;r++){var i=Xn[r];i.blockedOn===t&&(i.blockedOn=null)}}for($2!==null&&N4($2,t),j2!==null&&N4(j2,t),G2!==null&&N4(G2,t),ia.forEach(e),oa.forEach(e),r=0;r<O2.length;r++)i=O2[r],i.blockedOn===t&&(i.blockedOn=null);for(;0<O2.length&&(r=O2[0],r.blockedOn===null);)_s(r),r.blockedOn===null&&O2.shift()}var _r=M2.ReactCurrentBatchConfig,y3=!0;function iH(t,e,r,i){var o=z1,c=_r.transition;_r.transition=null;try{z1=1,K9(t,e,r,i)}finally{z1=o,_r.transition=c}}function oH(t,e,r,i){var o=z1,c=_r.transition;_r.transition=null;try{z1=4,K9(t,e,r,i)}finally{z1=o,_r.transition=c}}function K9(t,e,r,i){if(y3){var o=u9(t,e,r,i);if(o===null)T5(t,e,i,H3,r),iu(t,i);else if(aH(o,t,e,r,i))i.stopPropagation();else if(iu(t,i),e&4&&-1<rH.indexOf(t)){for(;o!==null;){var c=Ma(o);if(c!==null&&Vs(c),c=u9(t,e,r,i),c===null&&T5(t,e,i,H3,r),c===o)break;o=c}o!==null&&i.stopPropagation()}else T5(t,e,i,null,r)}}var H3=null;function u9(t,e,r,i){if(H3=null,t=W9(i),t=He(t),t!==null)if(e=ke(t),e===null)t=null;else if(r=e.tag,r===13){if(t=zs(e),t!==null)return t;t=null}else if(r===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return H3=t,null}function Rs(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ky()){case $9:return 1;case ys:return 4;case M3:case Xy:return 16;case Hs:return 536870912;default:return 16}default:return 16}}var U2=null,X9=null,u3=null;function Es(){if(u3)return u3;var t,e=X9,r=e.length,i,o="value"in U2?U2.value:U2.textContent,c=o.length;for(t=0;t<r&&e[t]===o[t];t++);var u=r-t;for(i=1;i<=u&&e[r-i]===o[c-i];i++);return u3=o.slice(t,1<i?1-i:void 0)}function s3(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function qn(){return!0}function lu(){return!1}function Z0(t){function e(r,i,o,c,u){this._reactName=r,this._targetInst=o,this.type=i,this.nativeEvent=c,this.target=u,this.currentTarget=null;for(var h in t)t.hasOwnProperty(h)&&(r=t[h],this[h]=r?r(c):c[h]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?qn:lu,this.isPropagationStopped=lu,this}return N1(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=qn)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=qn)},persist:function(){},isPersistent:qn}),e}var Dr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},q9=Z0(Dr),Ba=N1({},Dr,{view:0,detail:0}),lH=Z0(Ba),L5,A5,P4,W3=N1({},Ba,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Y9,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==P4&&(P4&&t.type==="mousemove"?(L5=t.screenX-P4.screenX,A5=t.screenY-P4.screenY):A5=L5=0,P4=t),L5)},movementY:function(t){return"movementY"in t?t.movementY:A5}}),cu=Z0(W3),cH=N1({},W3,{dataTransfer:0}),uH=Z0(cH),sH=N1({},Ba,{relatedTarget:0}),b5=Z0(sH),hH=N1({},Dr,{animationName:0,elapsedTime:0,pseudoElement:0}),dH=Z0(hH),vH=N1({},Dr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),pH=Z0(vH),fH=N1({},Dr,{data:0}),uu=Z0(fH),gH={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mH={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xH={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function zH(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=xH[t])?!!e[t]:!1}function Y9(){return zH}var BH=N1({},Ba,{key:function(t){if(t.key){var e=gH[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=s3(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?mH[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Y9,charCode:function(t){return t.type==="keypress"?s3(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?s3(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),MH=Z0(BH),wH=N1({},W3,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),su=Z0(wH),yH=N1({},Ba,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Y9}),HH=Z0(yH),SH=N1({},Dr,{propertyName:0,elapsedTime:0,pseudoElement:0}),CH=Z0(SH),VH=N1({},W3,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),LH=Z0(VH),AH=[9,13,27,32],Z9=m2&&"CompositionEvent"in window,q4=null;m2&&"documentMode"in document&&(q4=document.documentMode);var bH=m2&&"TextEvent"in window&&!q4,Ts=m2&&(!Z9||q4&&8<q4&&11>=q4),hu=String.fromCharCode(32),du=!1;function ks(t,e){switch(t){case"keyup":return AH.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Is(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var xr=!1;function _H(t,e){switch(t){case"compositionend":return Is(e);case"keypress":return e.which!==32?null:(du=!0,hu);case"textInput":return t=e.data,t===hu&&du?null:t;default:return null}}function RH(t,e){if(xr)return t==="compositionend"||!Z9&&ks(t,e)?(t=Es(),u3=X9=U2=null,xr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ts&&e.locale!=="ko"?null:e.data;default:return null}}var EH={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!EH[t.type]:e==="textarea"}function Ns(t,e,r,i){ps(i),e=S3(e,"onChange"),0<e.length&&(r=new q9("onChange","change",null,r,i),t.push({event:r,listeners:e}))}var Y4=null,ca=null;function TH(t){Xs(t,0)}function $3(t){var e=Mr(t);if(ls(e))return t}function kH(t,e){if(t==="change")return e}var Ps=!1;m2&&(m2?(Zn="oninput"in document,Zn||(_5=document.createElement("div"),_5.setAttribute("oninput","return;"),Zn=typeof _5.oninput=="function"),Yn=Zn):Yn=!1,Ps=Yn&&(!document.documentMode||9<document.documentMode));var Yn,Zn,_5;function pu(){Y4&&(Y4.detachEvent("onpropertychange",Fs),ca=Y4=null)}function Fs(t){if(t.propertyName==="value"&&$3(ca)){var e=[];Ns(e,ca,t,W9(t)),xs(TH,e)}}function IH(t,e,r){t==="focusin"?(pu(),Y4=e,ca=r,Y4.attachEvent("onpropertychange",Fs)):t==="focusout"&&pu()}function NH(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return $3(ca)}function PH(t,e){if(t==="click")return $3(e)}function FH(t,e){if(t==="input"||t==="change")return $3(e)}function OH(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Pt=typeof Object.is=="function"?Object.is:OH;function ua(t,e){if(Pt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var r=Object.keys(t),i=Object.keys(e);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var o=r[i];if(!j5.call(e,o)||!Pt(t[o],e[o]))return!1}return!0}function fu(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function gu(t,e){var r=fu(t);t=0;for(var i;r;){if(r.nodeType===3){if(i=t+r.textContent.length,t<=e&&i>=e)return{node:r,offset:e-t};t=i}t:{for(;r;){if(r.nextSibling){r=r.nextSibling;break t}r=r.parentNode}r=void 0}r=fu(r)}}function Os(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Os(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Ds(){for(var t=window,e=x3();e instanceof t.HTMLIFrameElement;){try{var r=typeof e.contentWindow.location.href=="string"}catch{r=!1}if(r)t=e.contentWindow;else break;e=x3(t.document)}return e}function Q9(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function DH(t){var e=Ds(),r=t.focusedElem,i=t.selectionRange;if(e!==r&&r&&r.ownerDocument&&Os(r.ownerDocument.documentElement,r)){if(i!==null&&Q9(r)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in r)r.selectionStart=e,r.selectionEnd=Math.min(t,r.value.length);else if(t=(e=r.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var o=r.textContent.length,c=Math.min(i.start,o);i=i.end===void 0?c:Math.min(i.end,o),!t.extend&&c>i&&(o=i,i=c,c=o),o=gu(r,c);var u=gu(r,i);o&&u&&(t.rangeCount!==1||t.anchorNode!==o.node||t.anchorOffset!==o.offset||t.focusNode!==u.node||t.focusOffset!==u.offset)&&(e=e.createRange(),e.setStart(o.node,o.offset),t.removeAllRanges(),c>i?(t.addRange(e),t.extend(u.node,u.offset)):(e.setEnd(u.node,u.offset),t.addRange(e)))}}for(e=[],t=r;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<e.length;r++)t=e[r],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var UH=m2&&"documentMode"in document&&11>=document.documentMode,zr=null,s9=null,Z4=null,h9=!1;function mu(t,e,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;h9||zr==null||zr!==x3(i)||(i=zr,"selectionStart"in i&&Q9(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Z4&&ua(Z4,i)||(Z4=i,i=S3(s9,"onSelect"),0<i.length&&(e=new q9("onSelect","select",null,e,r),t.push({event:e,listeners:i}),e.target=zr)))}function Qn(t,e){var r={};return r[t.toLowerCase()]=e.toLowerCase(),r["Webkit"+t]="webkit"+e,r["Moz"+t]="moz"+e,r}var Br={animationend:Qn("Animation","AnimationEnd"),animationiteration:Qn("Animation","AnimationIteration"),animationstart:Qn("Animation","AnimationStart"),transitionend:Qn("Transition","TransitionEnd")},R5={},Us={};m2&&(Us=document.createElement("div").style,"AnimationEvent"in window||(delete Br.animationend.animation,delete Br.animationiteration.animation,delete Br.animationstart.animation),"TransitionEvent"in window||delete Br.transitionend.transition);function j3(t){if(R5[t])return R5[t];if(!Br[t])return t;var e=Br[t],r;for(r in e)if(e.hasOwnProperty(r)&&r in Us)return R5[t]=e[r];return t}var Ws=j3("animationend"),$s=j3("animationiteration"),js=j3("animationstart"),Gs=j3("transitionend"),Ks=new Map,xu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function te(t,e){Ks.set(t,e),Te(e,[t])}for(Jn=0;Jn<xu.length;Jn++)t3=xu[Jn],zu=t3.toLowerCase(),Bu=t3[0].toUpperCase()+t3.slice(1),te(zu,"on"+Bu);var t3,zu,Bu,Jn;te(Ws,"onAnimationEnd");te($s,"onAnimationIteration");te(js,"onAnimationStart");te("dblclick","onDoubleClick");te("focusin","onFocus");te("focusout","onBlur");te(Gs,"onTransitionEnd");Tr("onMouseEnter",["mouseout","mouseover"]);Tr("onMouseLeave",["mouseout","mouseover"]);Tr("onPointerEnter",["pointerout","pointerover"]);Tr("onPointerLeave",["pointerout","pointerover"]);Te("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Te("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Te("onBeforeInput",["compositionend","keypress","textInput","paste"]);Te("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Te("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Te("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var G4="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),WH=new Set("cancel close invalid load scroll toggle".split(" ").concat(G4));function Mu(t,e,r){var i=t.type||"unknown-event";t.currentTarget=r,Wy(i,e,void 0,t),t.currentTarget=null}function Xs(t,e){e=(e&4)!==0;for(var r=0;r<t.length;r++){var i=t[r],o=i.event;i=i.listeners;t:{var c=void 0;if(e)for(var u=i.length-1;0<=u;u--){var h=i[u],d=h.instance,p=h.currentTarget;if(h=h.listener,d!==c&&o.isPropagationStopped())break t;Mu(o,h,p),c=d}else for(u=0;u<i.length;u++){if(h=i[u],d=h.instance,p=h.currentTarget,h=h.listener,d!==c&&o.isPropagationStopped())break t;Mu(o,h,p),c=d}}}if(B3)throw t=o9,B3=!1,o9=null,t}function C1(t,e){var r=e[g9];r===void 0&&(r=e[g9]=new Set);var i=t+"__bubble";r.has(i)||(qs(e,t,2,!1),r.add(i))}function E5(t,e,r){var i=0;e&&(i|=4),qs(r,t,i,e)}var e3="_reactListening"+Math.random().toString(36).slice(2);function sa(t){if(!t[e3]){t[e3]=!0,rs.forEach(function(r){r!=="selectionchange"&&(WH.has(r)||E5(r,!1,t),E5(r,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[e3]||(e[e3]=!0,E5("selectionchange",!1,e))}}function qs(t,e,r,i){switch(Rs(e)){case 1:var o=iH;break;case 4:o=oH;break;default:o=K9}r=o.bind(null,e,r,t),o=void 0,!i9||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(o=!0),i?o!==void 0?t.addEventListener(e,r,{capture:!0,passive:o}):t.addEventListener(e,r,!0):o!==void 0?t.addEventListener(e,r,{passive:o}):t.addEventListener(e,r,!1)}function T5(t,e,r,i,o){var c=i;if(!(e&1)&&!(e&2)&&i!==null)t:for(;;){if(i===null)return;var u=i.tag;if(u===3||u===4){var h=i.stateNode.containerInfo;if(h===o||h.nodeType===8&&h.parentNode===o)break;if(u===4)for(u=i.return;u!==null;){var d=u.tag;if((d===3||d===4)&&(d=u.stateNode.containerInfo,d===o||d.nodeType===8&&d.parentNode===o))return;u=u.return}for(;h!==null;){if(u=He(h),u===null)return;if(d=u.tag,d===5||d===6){i=c=u;continue t}h=h.parentNode}}i=i.return}xs(function(){var p=c,H=W9(r),w=[];t:{var C=Ks.get(t);if(C!==void 0){var A=q9,E=t;switch(t){case"keypress":if(s3(r)===0)break t;case"keydown":case"keyup":A=MH;break;case"focusin":E="focus",A=b5;break;case"focusout":E="blur",A=b5;break;case"beforeblur":case"afterblur":A=b5;break;case"click":if(r.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=cu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=uH;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=HH;break;case Ws:case $s:case js:A=dH;break;case Gs:A=CH;break;case"scroll":A=lH;break;case"wheel":A=LH;break;case"copy":case"cut":case"paste":A=pH;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=su}var M=(e&4)!==0,S=!M&&t==="scroll",g=M?C!==null?C+"Capture":null:C;M=[];for(var m=p,z;m!==null;){z=m;var b=z.stateNode;if(z.tag===5&&b!==null&&(z=b,g!==null&&(b=na(m,g),b!=null&&M.push(ha(m,b,z)))),S)break;m=m.return}0<M.length&&(C=new A(C,E,null,r,H),w.push({event:C,listeners:M}))}}if(!(e&7)){t:{if(C=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",C&&r!==a9&&(E=r.relatedTarget||r.fromElement)&&(He(E)||E[x2]))break t;if((A||C)&&(C=H.window===H?H:(C=H.ownerDocument)?C.defaultView||C.parentWindow:window,A?(E=r.relatedTarget||r.toElement,A=p,E=E?He(E):null,E!==null&&(S=ke(E),E!==S||E.tag!==5&&E.tag!==6)&&(E=null)):(A=null,E=p),A!==E)){if(M=cu,b="onMouseLeave",g="onMouseEnter",m="mouse",(t==="pointerout"||t==="pointerover")&&(M=su,b="onPointerLeave",g="onPointerEnter",m="pointer"),S=A==null?C:Mr(A),z=E==null?C:Mr(E),C=new M(b,m+"leave",A,r,H),C.target=S,C.relatedTarget=z,b=null,He(H)===p&&(M=new M(g,m+"enter",E,r,H),M.target=z,M.relatedTarget=S,b=M),S=b,A&&E)e:{for(M=A,g=E,m=0,z=M;z;z=fr(z))m++;for(z=0,b=g;b;b=fr(b))z++;for(;0<m-z;)M=fr(M),m--;for(;0<z-m;)g=fr(g),z--;for(;m--;){if(M===g||g!==null&&M===g.alternate)break e;M=fr(M),g=fr(g)}M=null}else M=null;A!==null&&wu(w,C,A,M,!1),E!==null&&S!==null&&wu(w,S,E,M,!0)}}t:{if(C=p?Mr(p):window,A=C.nodeName&&C.nodeName.toLowerCase(),A==="select"||A==="input"&&C.type==="file")var I=kH;else if(vu(C))if(Ps)I=FH;else{I=NH;var T=IH}else(A=C.nodeName)&&A.toLowerCase()==="input"&&(C.type==="checkbox"||C.type==="radio")&&(I=PH);if(I&&(I=I(t,p))){Ns(w,I,r,H);break t}T&&T(t,C,p),t==="focusout"&&(T=C._wrapperState)&&T.controlled&&C.type==="number"&&Q5(C,"number",C.value)}switch(T=p?Mr(p):window,t){case"focusin":(vu(T)||T.contentEditable==="true")&&(zr=T,s9=p,Z4=null);break;case"focusout":Z4=s9=zr=null;break;case"mousedown":h9=!0;break;case"contextmenu":case"mouseup":case"dragend":h9=!1,mu(w,r,H);break;case"selectionchange":if(UH)break;case"keydown":case"keyup":mu(w,r,H)}var P;if(Z9)t:{switch(t){case"compositionstart":var U="onCompositionStart";break t;case"compositionend":U="onCompositionEnd";break t;case"compositionupdate":U="onCompositionUpdate";break t}U=void 0}else xr?ks(t,r)&&(U="onCompositionEnd"):t==="keydown"&&r.keyCode===229&&(U="onCompositionStart");U&&(Ts&&r.locale!=="ko"&&(xr||U!=="onCompositionStart"?U==="onCompositionEnd"&&xr&&(P=Es()):(U2=H,X9="value"in U2?U2.value:U2.textContent,xr=!0)),T=S3(p,U),0<T.length&&(U=new uu(U,t,null,r,H),w.push({event:U,listeners:T}),P?U.data=P:(P=Is(r),P!==null&&(U.data=P)))),(P=bH?_H(t,r):RH(t,r))&&(p=S3(p,"onBeforeInput"),0<p.length&&(H=new uu("onBeforeInput","beforeinput",null,r,H),w.push({event:H,listeners:p}),H.data=P))}Xs(w,e)})}function ha(t,e,r){return{instance:t,listener:e,currentTarget:r}}function S3(t,e){for(var r=e+"Capture",i=[];t!==null;){var o=t,c=o.stateNode;o.tag===5&&c!==null&&(o=c,c=na(t,r),c!=null&&i.unshift(ha(t,c,o)),c=na(t,e),c!=null&&i.push(ha(t,c,o))),t=t.return}return i}function fr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function wu(t,e,r,i,o){for(var c=e._reactName,u=[];r!==null&&r!==i;){var h=r,d=h.alternate,p=h.stateNode;if(d!==null&&d===i)break;h.tag===5&&p!==null&&(h=p,o?(d=na(r,c),d!=null&&u.unshift(ha(r,d,h))):o||(d=na(r,c),d!=null&&u.push(ha(r,d,h)))),r=r.return}u.length!==0&&t.push({event:e,listeners:u})}var $H=/\r\n?/g,jH=/\u0000|\uFFFD/g;function yu(t){return(typeof t=="string"?t:""+t).replace($H,`
`).replace(jH,"")}function r3(t,e,r){if(e=yu(e),yu(t)!==e&&r)throw Error(W(425))}function C3(){}var d9=null,v9=null;function p9(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var f9=typeof setTimeout=="function"?setTimeout:void 0,GH=typeof clearTimeout=="function"?clearTimeout:void 0,Hu=typeof Promise=="function"?Promise:void 0,KH=typeof queueMicrotask=="function"?queueMicrotask:typeof Hu<"u"?function(t){return Hu.resolve(null).then(t).catch(XH)}:f9;function XH(t){setTimeout(function(){throw t})}function k5(t,e){var r=e,i=0;do{var o=r.nextSibling;if(t.removeChild(r),o&&o.nodeType===8)if(r=o.data,r==="/$"){if(i===0){t.removeChild(o),la(e);return}i--}else r!=="$"&&r!=="$?"&&r!=="$!"||i++;r=o}while(r);la(e)}function K2(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Su(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var r=t.data;if(r==="$"||r==="$!"||r==="$?"){if(e===0)return t;e--}else r==="/$"&&e++}t=t.previousSibling}return null}var Ur=Math.random().toString(36).slice(2),qt="__reactFiber$"+Ur,da="__reactProps$"+Ur,x2="__reactContainer$"+Ur,g9="__reactEvents$"+Ur,qH="__reactListeners$"+Ur,YH="__reactHandles$"+Ur;function He(t){var e=t[qt];if(e)return e;for(var r=t.parentNode;r;){if(e=r[x2]||r[qt]){if(r=e.alternate,e.child!==null||r!==null&&r.child!==null)for(t=Su(t);t!==null;){if(r=t[qt])return r;t=Su(t)}return e}t=r,r=t.parentNode}return null}function Ma(t){return t=t[qt]||t[x2],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Mr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(W(33))}function G3(t){return t[da]||null}var m9=[],wr=-1;function ee(t){return{current:t}}function V1(t){0>wr||(t.current=m9[wr],m9[wr]=null,wr--)}function H1(t,e){wr++,m9[wr]=t.current,t.current=e}var J2={},g0=ee(J2),E0=ee(!1),Ae=J2;function kr(t,e){var r=t.type.contextTypes;if(!r)return J2;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var o={},c;for(c in r)o[c]=e[c];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=o),o}function T0(t){return t=t.childContextTypes,t!=null}function V3(){V1(E0),V1(g0)}function Cu(t,e,r){if(g0.current!==J2)throw Error(W(168));H1(g0,e),H1(E0,r)}function Ys(t,e,r){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return r;i=i.getChildContext();for(var o in i)if(!(o in e))throw Error(W(108,Iy(t)||"Unknown",o));return N1({},r,i)}function L3(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||J2,Ae=g0.current,H1(g0,t),H1(E0,E0.current),!0}function Vu(t,e,r){var i=t.stateNode;if(!i)throw Error(W(169));r?(t=Ys(t,e,Ae),i.__reactInternalMemoizedMergedChildContext=t,V1(E0),V1(g0),H1(g0,t)):V1(E0),H1(E0,r)}var v2=null,K3=!1,I5=!1;function Zs(t){v2===null?v2=[t]:v2.push(t)}function ZH(t){K3=!0,Zs(t)}function re(){if(!I5&&v2!==null){I5=!0;var t=0,e=z1;try{var r=v2;for(z1=1;t<r.length;t++){var i=r[t];do i=i(!0);while(i!==null)}v2=null,K3=!1}catch(o){throw v2!==null&&(v2=v2.slice(t+1)),ws($9,re),o}finally{z1=e,I5=!1}}return null}var yr=[],Hr=0,A3=null,b3=0,gt=[],mt=0,be=null,p2=1,f2="";function we(t,e){yr[Hr++]=b3,yr[Hr++]=A3,A3=t,b3=e}function Qs(t,e,r){gt[mt++]=p2,gt[mt++]=f2,gt[mt++]=be,be=t;var i=p2;t=f2;var o=32-It(i)-1;i&=~(1<<o),r+=1;var c=32-It(e)+o;if(30<c){var u=o-o%5;c=(i&(1<<u)-1).toString(32),i>>=u,o-=u,p2=1<<32-It(e)+o|r<<o|i,f2=c+t}else p2=1<<c|r<<o|i,f2=t}function J9(t){t.return!==null&&(we(t,1),Qs(t,1,0))}function t8(t){for(;t===A3;)A3=yr[--Hr],yr[Hr]=null,b3=yr[--Hr],yr[Hr]=null;for(;t===be;)be=gt[--mt],gt[mt]=null,f2=gt[--mt],gt[mt]=null,p2=gt[--mt],gt[mt]=null}var q0=null,X0=null,R1=!1,kt=null;function Js(t,e){var r=xt(5,null,null,0);r.elementType="DELETED",r.stateNode=e,r.return=t,e=t.deletions,e===null?(t.deletions=[r],t.flags|=16):e.push(r)}function Lu(t,e){switch(t.tag){case 5:var r=t.type;return e=e.nodeType!==1||r.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,q0=t,X0=K2(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,q0=t,X0=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(r=be!==null?{id:p2,overflow:f2}:null,t.memoizedState={dehydrated:e,treeContext:r,retryLane:1073741824},r=xt(18,null,null,0),r.stateNode=e,r.return=t,t.child=r,q0=t,X0=null,!0):!1;default:return!1}}function x9(t){return(t.mode&1)!==0&&(t.flags&128)===0}function z9(t){if(R1){var e=X0;if(e){var r=e;if(!Lu(t,e)){if(x9(t))throw Error(W(418));e=K2(r.nextSibling);var i=q0;e&&Lu(t,e)?Js(i,r):(t.flags=t.flags&-4097|2,R1=!1,q0=t)}}else{if(x9(t))throw Error(W(418));t.flags=t.flags&-4097|2,R1=!1,q0=t}}}function Au(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;q0=t}function a3(t){if(t!==q0)return!1;if(!R1)return Au(t),R1=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!p9(t.type,t.memoizedProps)),e&&(e=X0)){if(x9(t))throw th(),Error(W(418));for(;e;)Js(t,e),e=K2(e.nextSibling)}if(Au(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(W(317));t:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var r=t.data;if(r==="/$"){if(e===0){X0=K2(t.nextSibling);break t}e--}else r!=="$"&&r!=="$!"&&r!=="$?"||e++}t=t.nextSibling}X0=null}}else X0=q0?K2(t.stateNode.nextSibling):null;return!0}function th(){for(var t=X0;t;)t=K2(t.nextSibling)}function Ir(){X0=q0=null,R1=!1}function e8(t){kt===null?kt=[t]:kt.push(t)}var QH=M2.ReactCurrentBatchConfig;function Et(t,e){if(t&&t.defaultProps){e=N1({},e),t=t.defaultProps;for(var r in t)e[r]===void 0&&(e[r]=t[r]);return e}return e}var _3=ee(null),R3=null,Sr=null,r8=null;function a8(){r8=Sr=R3=null}function n8(t){var e=_3.current;V1(_3),t._currentValue=e}function B9(t,e,r){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===r)break;t=t.return}}function Rr(t,e){R3=t,r8=Sr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(R0=!0),t.firstContext=null)}function Bt(t){var e=t._currentValue;if(r8!==t)if(t={context:t,memoizedValue:e,next:null},Sr===null){if(R3===null)throw Error(W(308));Sr=t,R3.dependencies={lanes:0,firstContext:t}}else Sr=Sr.next=t;return e}var Se=null;function i8(t){Se===null?Se=[t]:Se.push(t)}function eh(t,e,r,i){var o=e.interleaved;return o===null?(r.next=r,i8(e)):(r.next=o.next,o.next=r),e.interleaved=r,z2(t,i)}function z2(t,e){t.lanes|=e;var r=t.alternate;for(r!==null&&(r.lanes|=e),r=t,t=t.return;t!==null;)t.childLanes|=e,r=t.alternate,r!==null&&(r.childLanes|=e),r=t,t=t.return;return r.tag===3?r.stateNode:null}var F2=!1;function o8(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function rh(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function g2(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function X2(t,e,r){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,v1&2){var o=i.pending;return o===null?e.next=e:(e.next=o.next,o.next=e),i.pending=e,z2(t,r)}return o=i.interleaved,o===null?(e.next=e,i8(i)):(e.next=o.next,o.next=e),i.interleaved=e,z2(t,r)}function h3(t,e,r){if(e=e.updateQueue,e!==null&&(e=e.shared,(r&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,r|=i,e.lanes=r,j9(t,r)}}function bu(t,e){var r=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var o=null,c=null;if(r=r.firstBaseUpdate,r!==null){do{var u={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};c===null?o=c=u:c=c.next=u,r=r.next}while(r!==null);c===null?o=c=e:c=c.next=e}else o=c=e;r={baseState:i.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:i.shared,effects:i.effects},t.updateQueue=r;return}t=r.lastBaseUpdate,t===null?r.firstBaseUpdate=e:t.next=e,r.lastBaseUpdate=e}function E3(t,e,r,i){var o=t.updateQueue;F2=!1;var c=o.firstBaseUpdate,u=o.lastBaseUpdate,h=o.shared.pending;if(h!==null){o.shared.pending=null;var d=h,p=d.next;d.next=null,u===null?c=p:u.next=p,u=d;var H=t.alternate;H!==null&&(H=H.updateQueue,h=H.lastBaseUpdate,h!==u&&(h===null?H.firstBaseUpdate=p:h.next=p,H.lastBaseUpdate=d))}if(c!==null){var w=o.baseState;u=0,H=p=d=null,h=c;do{var C=h.lane,A=h.eventTime;if((i&C)===C){H!==null&&(H=H.next={eventTime:A,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});t:{var E=t,M=h;switch(C=e,A=r,M.tag){case 1:if(E=M.payload,typeof E=="function"){w=E.call(A,w,C);break t}w=E;break t;case 3:E.flags=E.flags&-65537|128;case 0:if(E=M.payload,C=typeof E=="function"?E.call(A,w,C):E,C==null)break t;w=N1({},w,C);break t;case 2:F2=!0}}h.callback!==null&&h.lane!==0&&(t.flags|=64,C=o.effects,C===null?o.effects=[h]:C.push(h))}else A={eventTime:A,lane:C,tag:h.tag,payload:h.payload,callback:h.callback,next:null},H===null?(p=H=A,d=w):H=H.next=A,u|=C;if(h=h.next,h===null){if(h=o.shared.pending,h===null)break;C=h,h=C.next,C.next=null,o.lastBaseUpdate=C,o.shared.pending=null}}while(1);if(H===null&&(d=w),o.baseState=d,o.firstBaseUpdate=p,o.lastBaseUpdate=H,e=o.shared.interleaved,e!==null){o=e;do u|=o.lane,o=o.next;while(o!==e)}else c===null&&(o.shared.lanes=0);Re|=u,t.lanes=u,t.memoizedState=w}}function _u(t,e,r){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],o=i.callback;if(o!==null){if(i.callback=null,i=r,typeof o!="function")throw Error(W(191,o));o.call(i)}}}var ah=new es.Component().refs;function M9(t,e,r,i){e=t.memoizedState,r=r(i,e),r=r==null?e:N1({},e,r),t.memoizedState=r,t.lanes===0&&(t.updateQueue.baseState=r)}var X3={isMounted:function(t){return(t=t._reactInternals)?ke(t)===t:!1},enqueueSetState:function(t,e,r){t=t._reactInternals;var i=H0(),o=Y2(t),c=g2(i,o);c.payload=e,r!=null&&(c.callback=r),e=X2(t,c,o),e!==null&&(Nt(e,t,o,i),h3(e,t,o))},enqueueReplaceState:function(t,e,r){t=t._reactInternals;var i=H0(),o=Y2(t),c=g2(i,o);c.tag=1,c.payload=e,r!=null&&(c.callback=r),e=X2(t,c,o),e!==null&&(Nt(e,t,o,i),h3(e,t,o))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var r=H0(),i=Y2(t),o=g2(r,i);o.tag=2,e!=null&&(o.callback=e),e=X2(t,o,i),e!==null&&(Nt(e,t,i,r),h3(e,t,i))}};function Ru(t,e,r,i,o,c,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,c,u):e.prototype&&e.prototype.isPureReactComponent?!ua(r,i)||!ua(o,c):!0}function nh(t,e,r){var i=!1,o=J2,c=e.contextType;return typeof c=="object"&&c!==null?c=Bt(c):(o=T0(e)?Ae:g0.current,i=e.contextTypes,c=(i=i!=null)?kr(t,o):J2),e=new e(r,c),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=X3,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=o,t.__reactInternalMemoizedMaskedChildContext=c),e}function Eu(t,e,r,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(r,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(r,i),e.state!==t&&X3.enqueueReplaceState(e,e.state,null)}function w9(t,e,r,i){var o=t.stateNode;o.props=r,o.state=t.memoizedState,o.refs=ah,o8(t);var c=e.contextType;typeof c=="object"&&c!==null?o.context=Bt(c):(c=T0(e)?Ae:g0.current,o.context=kr(t,c)),o.state=t.memoizedState,c=e.getDerivedStateFromProps,typeof c=="function"&&(M9(t,e,c,r),o.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(e=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),e!==o.state&&X3.enqueueReplaceState(o,o.state,null),E3(t,r,o,i),o.state=t.memoizedState),typeof o.componentDidMount=="function"&&(t.flags|=4194308)}function F4(t,e,r){if(t=r.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(W(309));var i=r.stateNode}if(!i)throw Error(W(147,t));var o=i,c=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===c?e.ref:(e=function(u){var h=o.refs;h===ah&&(h=o.refs={}),u===null?delete h[c]:h[c]=u},e._stringRef=c,e)}if(typeof t!="string")throw Error(W(284));if(!r._owner)throw Error(W(290,t))}return t}function n3(t,e){throw t=Object.prototype.toString.call(e),Error(W(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Tu(t){var e=t._init;return e(t._payload)}function ih(t){function e(g,m){if(t){var z=g.deletions;z===null?(g.deletions=[m],g.flags|=16):z.push(m)}}function r(g,m){if(!t)return null;for(;m!==null;)e(g,m),m=m.sibling;return null}function i(g,m){for(g=new Map;m!==null;)m.key!==null?g.set(m.key,m):g.set(m.index,m),m=m.sibling;return g}function o(g,m){return g=Z2(g,m),g.index=0,g.sibling=null,g}function c(g,m,z){return g.index=z,t?(z=g.alternate,z!==null?(z=z.index,z<m?(g.flags|=2,m):z):(g.flags|=2,m)):(g.flags|=1048576,m)}function u(g){return t&&g.alternate===null&&(g.flags|=2),g}function h(g,m,z,b){return m===null||m.tag!==6?(m=W5(z,g.mode,b),m.return=g,m):(m=o(m,z),m.return=g,m)}function d(g,m,z,b){var I=z.type;return I===mr?H(g,m,z.props.children,b,z.key):m!==null&&(m.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===P2&&Tu(I)===m.type)?(b=o(m,z.props),b.ref=F4(g,m,z),b.return=g,b):(b=m3(z.type,z.key,z.props,null,g.mode,b),b.ref=F4(g,m,z),b.return=g,b)}function p(g,m,z,b){return m===null||m.tag!==4||m.stateNode.containerInfo!==z.containerInfo||m.stateNode.implementation!==z.implementation?(m=$5(z,g.mode,b),m.return=g,m):(m=o(m,z.children||[]),m.return=g,m)}function H(g,m,z,b,I){return m===null||m.tag!==7?(m=Le(z,g.mode,b,I),m.return=g,m):(m=o(m,z),m.return=g,m)}function w(g,m,z){if(typeof m=="string"&&m!==""||typeof m=="number")return m=W5(""+m,g.mode,z),m.return=g,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Wn:return z=m3(m.type,m.key,m.props,null,g.mode,z),z.ref=F4(g,null,m),z.return=g,z;case gr:return m=$5(m,g.mode,z),m.return=g,m;case P2:var b=m._init;return w(g,b(m._payload),z)}if($4(m)||k4(m))return m=Le(m,g.mode,z,null),m.return=g,m;n3(g,m)}return null}function C(g,m,z,b){var I=m!==null?m.key:null;if(typeof z=="string"&&z!==""||typeof z=="number")return I!==null?null:h(g,m,""+z,b);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case Wn:return z.key===I?d(g,m,z,b):null;case gr:return z.key===I?p(g,m,z,b):null;case P2:return I=z._init,C(g,m,I(z._payload),b)}if($4(z)||k4(z))return I!==null?null:H(g,m,z,b,null);n3(g,z)}return null}function A(g,m,z,b,I){if(typeof b=="string"&&b!==""||typeof b=="number")return g=g.get(z)||null,h(m,g,""+b,I);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Wn:return g=g.get(b.key===null?z:b.key)||null,d(m,g,b,I);case gr:return g=g.get(b.key===null?z:b.key)||null,p(m,g,b,I);case P2:var T=b._init;return A(g,m,z,T(b._payload),I)}if($4(b)||k4(b))return g=g.get(z)||null,H(m,g,b,I,null);n3(m,b)}return null}function E(g,m,z,b){for(var I=null,T=null,P=m,U=m=0,Y=null;P!==null&&U<z.length;U++){P.index>U?(Y=P,P=null):Y=P.sibling;var r1=C(g,P,z[U],b);if(r1===null){P===null&&(P=Y);break}t&&P&&r1.alternate===null&&e(g,P),m=c(r1,m,U),T===null?I=r1:T.sibling=r1,T=r1,P=Y}if(U===z.length)return r(g,P),R1&&we(g,U),I;if(P===null){for(;U<z.length;U++)P=w(g,z[U],b),P!==null&&(m=c(P,m,U),T===null?I=P:T.sibling=P,T=P);return R1&&we(g,U),I}for(P=i(g,P);U<z.length;U++)Y=A(P,g,U,z[U],b),Y!==null&&(t&&Y.alternate!==null&&P.delete(Y.key===null?U:Y.key),m=c(Y,m,U),T===null?I=Y:T.sibling=Y,T=Y);return t&&P.forEach(function(G1){return e(g,G1)}),R1&&we(g,U),I}function M(g,m,z,b){var I=k4(z);if(typeof I!="function")throw Error(W(150));if(z=I.call(z),z==null)throw Error(W(151));for(var T=I=null,P=m,U=m=0,Y=null,r1=z.next();P!==null&&!r1.done;U++,r1=z.next()){P.index>U?(Y=P,P=null):Y=P.sibling;var G1=C(g,P,r1.value,b);if(G1===null){P===null&&(P=Y);break}t&&P&&G1.alternate===null&&e(g,P),m=c(G1,m,U),T===null?I=G1:T.sibling=G1,T=G1,P=Y}if(r1.done)return r(g,P),R1&&we(g,U),I;if(P===null){for(;!r1.done;U++,r1=z.next())r1=w(g,r1.value,b),r1!==null&&(m=c(r1,m,U),T===null?I=r1:T.sibling=r1,T=r1);return R1&&we(g,U),I}for(P=i(g,P);!r1.done;U++,r1=z.next())r1=A(P,g,U,r1.value,b),r1!==null&&(t&&r1.alternate!==null&&P.delete(r1.key===null?U:r1.key),m=c(r1,m,U),T===null?I=r1:T.sibling=r1,T=r1);return t&&P.forEach(function(P0){return e(g,P0)}),R1&&we(g,U),I}function S(g,m,z,b){if(typeof z=="object"&&z!==null&&z.type===mr&&z.key===null&&(z=z.props.children),typeof z=="object"&&z!==null){switch(z.$$typeof){case Wn:t:{for(var I=z.key,T=m;T!==null;){if(T.key===I){if(I=z.type,I===mr){if(T.tag===7){r(g,T.sibling),m=o(T,z.props.children),m.return=g,g=m;break t}}else if(T.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===P2&&Tu(I)===T.type){r(g,T.sibling),m=o(T,z.props),m.ref=F4(g,T,z),m.return=g,g=m;break t}r(g,T);break}else e(g,T);T=T.sibling}z.type===mr?(m=Le(z.props.children,g.mode,b,z.key),m.return=g,g=m):(b=m3(z.type,z.key,z.props,null,g.mode,b),b.ref=F4(g,m,z),b.return=g,g=b)}return u(g);case gr:t:{for(T=z.key;m!==null;){if(m.key===T)if(m.tag===4&&m.stateNode.containerInfo===z.containerInfo&&m.stateNode.implementation===z.implementation){r(g,m.sibling),m=o(m,z.children||[]),m.return=g,g=m;break t}else{r(g,m);break}else e(g,m);m=m.sibling}m=$5(z,g.mode,b),m.return=g,g=m}return u(g);case P2:return T=z._init,S(g,m,T(z._payload),b)}if($4(z))return E(g,m,z,b);if(k4(z))return M(g,m,z,b);n3(g,z)}return typeof z=="string"&&z!==""||typeof z=="number"?(z=""+z,m!==null&&m.tag===6?(r(g,m.sibling),m=o(m,z),m.return=g,g=m):(r(g,m),m=W5(z,g.mode,b),m.return=g,g=m),u(g)):r(g,m)}return S}var Nr=ih(!0),oh=ih(!1),wa={},Zt=ee(wa),va=ee(wa),pa=ee(wa);function Ce(t){if(t===wa)throw Error(W(174));return t}function l8(t,e){switch(H1(pa,e),H1(va,t),H1(Zt,wa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:t9(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=t9(e,t)}V1(Zt),H1(Zt,e)}function Pr(){V1(Zt),V1(va),V1(pa)}function lh(t){Ce(pa.current);var e=Ce(Zt.current),r=t9(e,t.type);e!==r&&(H1(va,t),H1(Zt,r))}function c8(t){va.current===t&&(V1(Zt),V1(va))}var k1=ee(0);function T3(t){for(var e=t;e!==null;){if(e.tag===13){var r=e.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var N5=[];function u8(){for(var t=0;t<N5.length;t++)N5[t]._workInProgressVersionPrimary=null;N5.length=0}var d3=M2.ReactCurrentDispatcher,P5=M2.ReactCurrentBatchConfig,_e=0,I1=null,q1=null,r0=null,k3=!1,Q4=!1,fa=0,JH=0;function v0(){throw Error(W(321))}function s8(t,e){if(e===null)return!1;for(var r=0;r<e.length&&r<t.length;r++)if(!Pt(t[r],e[r]))return!1;return!0}function h8(t,e,r,i,o,c){if(_e=c,I1=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,d3.current=t===null||t.memoizedState===null?aS:nS,t=r(i,o),Q4){c=0;do{if(Q4=!1,fa=0,25<=c)throw Error(W(301));c+=1,r0=q1=null,e.updateQueue=null,d3.current=iS,t=r(i,o)}while(Q4)}if(d3.current=I3,e=q1!==null&&q1.next!==null,_e=0,r0=q1=I1=null,k3=!1,e)throw Error(W(300));return t}function d8(){var t=fa!==0;return fa=0,t}function Xt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return r0===null?I1.memoizedState=r0=t:r0=r0.next=t,r0}function Mt(){if(q1===null){var t=I1.alternate;t=t!==null?t.memoizedState:null}else t=q1.next;var e=r0===null?I1.memoizedState:r0.next;if(e!==null)r0=e,q1=t;else{if(t===null)throw Error(W(310));q1=t,t={memoizedState:q1.memoizedState,baseState:q1.baseState,baseQueue:q1.baseQueue,queue:q1.queue,next:null},r0===null?I1.memoizedState=r0=t:r0=r0.next=t}return r0}function ga(t,e){return typeof e=="function"?e(t):e}function F5(t){var e=Mt(),r=e.queue;if(r===null)throw Error(W(311));r.lastRenderedReducer=t;var i=q1,o=i.baseQueue,c=r.pending;if(c!==null){if(o!==null){var u=o.next;o.next=c.next,c.next=u}i.baseQueue=o=c,r.pending=null}if(o!==null){c=o.next,i=i.baseState;var h=u=null,d=null,p=c;do{var H=p.lane;if((_e&H)===H)d!==null&&(d=d.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),i=p.hasEagerState?p.eagerState:t(i,p.action);else{var w={lane:H,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};d===null?(h=d=w,u=i):d=d.next=w,I1.lanes|=H,Re|=H}p=p.next}while(p!==null&&p!==c);d===null?u=i:d.next=h,Pt(i,e.memoizedState)||(R0=!0),e.memoizedState=i,e.baseState=u,e.baseQueue=d,r.lastRenderedState=i}if(t=r.interleaved,t!==null){o=t;do c=o.lane,I1.lanes|=c,Re|=c,o=o.next;while(o!==t)}else o===null&&(r.lanes=0);return[e.memoizedState,r.dispatch]}function O5(t){var e=Mt(),r=e.queue;if(r===null)throw Error(W(311));r.lastRenderedReducer=t;var i=r.dispatch,o=r.pending,c=e.memoizedState;if(o!==null){r.pending=null;var u=o=o.next;do c=t(c,u.action),u=u.next;while(u!==o);Pt(c,e.memoizedState)||(R0=!0),e.memoizedState=c,e.baseQueue===null&&(e.baseState=c),r.lastRenderedState=c}return[c,i]}function ch(){}function uh(t,e){var r=I1,i=Mt(),o=e(),c=!Pt(i.memoizedState,o);if(c&&(i.memoizedState=o,R0=!0),i=i.queue,v8(dh.bind(null,r,i,t),[t]),i.getSnapshot!==e||c||r0!==null&&r0.memoizedState.tag&1){if(r.flags|=2048,ma(9,hh.bind(null,r,i,o,e),void 0,null),a0===null)throw Error(W(349));_e&30||sh(r,e,o)}return o}function sh(t,e,r){t.flags|=16384,t={getSnapshot:e,value:r},e=I1.updateQueue,e===null?(e={lastEffect:null,stores:null},I1.updateQueue=e,e.stores=[t]):(r=e.stores,r===null?e.stores=[t]:r.push(t))}function hh(t,e,r,i){e.value=r,e.getSnapshot=i,vh(e)&&ph(t)}function dh(t,e,r){return r(function(){vh(e)&&ph(t)})}function vh(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!Pt(t,r)}catch{return!0}}function ph(t){var e=z2(t,1);e!==null&&Nt(e,t,1,-1)}function ku(t){var e=Xt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ga,lastRenderedState:t},e.queue=t,t=t.dispatch=rS.bind(null,I1,t),[e.memoizedState,t]}function ma(t,e,r,i){return t={tag:t,create:e,destroy:r,deps:i,next:null},e=I1.updateQueue,e===null?(e={lastEffect:null,stores:null},I1.updateQueue=e,e.lastEffect=t.next=t):(r=e.lastEffect,r===null?e.lastEffect=t.next=t:(i=r.next,r.next=t,t.next=i,e.lastEffect=t)),t}function fh(){return Mt().memoizedState}function v3(t,e,r,i){var o=Xt();I1.flags|=t,o.memoizedState=ma(1|e,r,void 0,i===void 0?null:i)}function q3(t,e,r,i){var o=Mt();i=i===void 0?null:i;var c=void 0;if(q1!==null){var u=q1.memoizedState;if(c=u.destroy,i!==null&&s8(i,u.deps)){o.memoizedState=ma(e,r,c,i);return}}I1.flags|=t,o.memoizedState=ma(1|e,r,c,i)}function Iu(t,e){return v3(8390656,8,t,e)}function v8(t,e){return q3(2048,8,t,e)}function gh(t,e){return q3(4,2,t,e)}function mh(t,e){return q3(4,4,t,e)}function xh(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function zh(t,e,r){return r=r!=null?r.concat([t]):null,q3(4,4,xh.bind(null,e,t),r)}function p8(){}function Bh(t,e){var r=Mt();e=e===void 0?null:e;var i=r.memoizedState;return i!==null&&e!==null&&s8(e,i[1])?i[0]:(r.memoizedState=[t,e],t)}function Mh(t,e){var r=Mt();e=e===void 0?null:e;var i=r.memoizedState;return i!==null&&e!==null&&s8(e,i[1])?i[0]:(t=t(),r.memoizedState=[t,e],t)}function wh(t,e,r){return _e&21?(Pt(r,e)||(r=Ss(),I1.lanes|=r,Re|=r,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,R0=!0),t.memoizedState=r)}function tS(t,e){var r=z1;z1=r!==0&&4>r?r:4,t(!0);var i=P5.transition;P5.transition={};try{t(!1),e()}finally{z1=r,P5.transition=i}}function yh(){return Mt().memoizedState}function eS(t,e,r){var i=Y2(t);if(r={lane:i,action:r,hasEagerState:!1,eagerState:null,next:null},Hh(t))Sh(e,r);else if(r=eh(t,e,r,i),r!==null){var o=H0();Nt(r,t,i,o),Ch(r,e,i)}}function rS(t,e,r){var i=Y2(t),o={lane:i,action:r,hasEagerState:!1,eagerState:null,next:null};if(Hh(t))Sh(e,o);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=e.lastRenderedReducer,c!==null))try{var u=e.lastRenderedState,h=c(u,r);if(o.hasEagerState=!0,o.eagerState=h,Pt(h,u)){var d=e.interleaved;d===null?(o.next=o,i8(e)):(o.next=d.next,d.next=o),e.interleaved=o;return}}catch{}finally{}r=eh(t,e,o,i),r!==null&&(o=H0(),Nt(r,t,i,o),Ch(r,e,i))}}function Hh(t){var e=t.alternate;return t===I1||e!==null&&e===I1}function Sh(t,e){Q4=k3=!0;var r=t.pending;r===null?e.next=e:(e.next=r.next,r.next=e),t.pending=e}function Ch(t,e,r){if(r&4194240){var i=e.lanes;i&=t.pendingLanes,r|=i,e.lanes=r,j9(t,r)}}var I3={readContext:Bt,useCallback:v0,useContext:v0,useEffect:v0,useImperativeHandle:v0,useInsertionEffect:v0,useLayoutEffect:v0,useMemo:v0,useReducer:v0,useRef:v0,useState:v0,useDebugValue:v0,useDeferredValue:v0,useTransition:v0,useMutableSource:v0,useSyncExternalStore:v0,useId:v0,unstable_isNewReconciler:!1},aS={readContext:Bt,useCallback:function(t,e){return Xt().memoizedState=[t,e===void 0?null:e],t},useContext:Bt,useEffect:Iu,useImperativeHandle:function(t,e,r){return r=r!=null?r.concat([t]):null,v3(4194308,4,xh.bind(null,e,t),r)},useLayoutEffect:function(t,e){return v3(4194308,4,t,e)},useInsertionEffect:function(t,e){return v3(4,2,t,e)},useMemo:function(t,e){var r=Xt();return e=e===void 0?null:e,t=t(),r.memoizedState=[t,e],t},useReducer:function(t,e,r){var i=Xt();return e=r!==void 0?r(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=eS.bind(null,I1,t),[i.memoizedState,t]},useRef:function(t){var e=Xt();return t={current:t},e.memoizedState=t},useState:ku,useDebugValue:p8,useDeferredValue:function(t){return Xt().memoizedState=t},useTransition:function(){var t=ku(!1),e=t[0];return t=tS.bind(null,t[1]),Xt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,r){var i=I1,o=Xt();if(R1){if(r===void 0)throw Error(W(407));r=r()}else{if(r=e(),a0===null)throw Error(W(349));_e&30||sh(i,e,r)}o.memoizedState=r;var c={value:r,getSnapshot:e};return o.queue=c,Iu(dh.bind(null,i,c,t),[t]),i.flags|=2048,ma(9,hh.bind(null,i,c,r,e),void 0,null),r},useId:function(){var t=Xt(),e=a0.identifierPrefix;if(R1){var r=f2,i=p2;r=(i&~(1<<32-It(i)-1)).toString(32)+r,e=":"+e+"R"+r,r=fa++,0<r&&(e+="H"+r.toString(32)),e+=":"}else r=JH++,e=":"+e+"r"+r.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},nS={readContext:Bt,useCallback:Bh,useContext:Bt,useEffect:v8,useImperativeHandle:zh,useInsertionEffect:gh,useLayoutEffect:mh,useMemo:Mh,useReducer:F5,useRef:fh,useState:function(){return F5(ga)},useDebugValue:p8,useDeferredValue:function(t){var e=Mt();return wh(e,q1.memoizedState,t)},useTransition:function(){var t=F5(ga)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:ch,useSyncExternalStore:uh,useId:yh,unstable_isNewReconciler:!1},iS={readContext:Bt,useCallback:Bh,useContext:Bt,useEffect:v8,useImperativeHandle:zh,useInsertionEffect:gh,useLayoutEffect:mh,useMemo:Mh,useReducer:O5,useRef:fh,useState:function(){return O5(ga)},useDebugValue:p8,useDeferredValue:function(t){var e=Mt();return q1===null?e.memoizedState=t:wh(e,q1.memoizedState,t)},useTransition:function(){var t=O5(ga)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:ch,useSyncExternalStore:uh,useId:yh,unstable_isNewReconciler:!1};function Fr(t,e){try{var r="",i=e;do r+=ky(i),i=i.return;while(i);var o=r}catch(c){o=`
Error generating stack: `+c.message+`
`+c.stack}return{value:t,source:e,stack:o,digest:null}}function D5(t,e,r){return{value:t,source:null,stack:r??null,digest:e??null}}function y9(t,e){try{console.error(e.value)}catch(r){setTimeout(function(){throw r})}}var oS=typeof WeakMap=="function"?WeakMap:Map;function Vh(t,e,r){r=g2(-1,r),r.tag=3,r.payload={element:null};var i=e.value;return r.callback=function(){P3||(P3=!0,E9=i),y9(t,e)},r}function Lh(t,e,r){r=g2(-1,r),r.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var o=e.value;r.payload=function(){return i(o)},r.callback=function(){y9(t,e)}}var c=t.stateNode;return c!==null&&typeof c.componentDidCatch=="function"&&(r.callback=function(){y9(t,e),typeof i!="function"&&(q2===null?q2=new Set([this]):q2.add(this));var u=e.stack;this.componentDidCatch(e.value,{componentStack:u!==null?u:""})}),r}function Nu(t,e,r){var i=t.pingCache;if(i===null){i=t.pingCache=new oS;var o=new Set;i.set(e,o)}else o=i.get(e),o===void 0&&(o=new Set,i.set(e,o));o.has(r)||(o.add(r),t=BS.bind(null,t,e,r),e.then(t,t))}function Pu(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Fu(t,e,r,i,o){return t.mode&1?(t.flags|=65536,t.lanes=o,t):(t===e?t.flags|=65536:(t.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(e=g2(-1,1),e.tag=2,X2(r,e,1))),r.lanes|=1),t)}var lS=M2.ReactCurrentOwner,R0=!1;function y0(t,e,r,i){e.child=t===null?oh(e,null,r,i):Nr(e,t.child,r,i)}function Ou(t,e,r,i,o){r=r.render;var c=e.ref;return Rr(e,o),i=h8(t,e,r,i,c,o),r=d8(),t!==null&&!R0?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~o,B2(t,e,o)):(R1&&r&&J9(e),e.flags|=1,y0(t,e,i,o),e.child)}function Du(t,e,r,i,o){if(t===null){var c=r.type;return typeof c=="function"&&!w8(c)&&c.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(e.tag=15,e.type=c,Ah(t,e,c,i,o)):(t=m3(r.type,null,i,e,e.mode,o),t.ref=e.ref,t.return=e,e.child=t)}if(c=t.child,!(t.lanes&o)){var u=c.memoizedProps;if(r=r.compare,r=r!==null?r:ua,r(u,i)&&t.ref===e.ref)return B2(t,e,o)}return e.flags|=1,t=Z2(c,i),t.ref=e.ref,t.return=e,e.child=t}function Ah(t,e,r,i,o){if(t!==null){var c=t.memoizedProps;if(ua(c,i)&&t.ref===e.ref)if(R0=!1,e.pendingProps=i=c,(t.lanes&o)!==0)t.flags&131072&&(R0=!0);else return e.lanes=t.lanes,B2(t,e,o)}return H9(t,e,r,i,o)}function bh(t,e,r){var i=e.pendingProps,o=i.children,c=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},H1(Vr,K0),K0|=r;else{if(!(r&1073741824))return t=c!==null?c.baseLanes|r:r,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,H1(Vr,K0),K0|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=c!==null?c.baseLanes:r,H1(Vr,K0),K0|=i}else c!==null?(i=c.baseLanes|r,e.memoizedState=null):i=r,H1(Vr,K0),K0|=i;return y0(t,e,o,r),e.child}function _h(t,e){var r=e.ref;(t===null&&r!==null||t!==null&&t.ref!==r)&&(e.flags|=512,e.flags|=2097152)}function H9(t,e,r,i,o){var c=T0(r)?Ae:g0.current;return c=kr(e,c),Rr(e,o),r=h8(t,e,r,i,c,o),i=d8(),t!==null&&!R0?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~o,B2(t,e,o)):(R1&&i&&J9(e),e.flags|=1,y0(t,e,r,o),e.child)}function Uu(t,e,r,i,o){if(T0(r)){var c=!0;L3(e)}else c=!1;if(Rr(e,o),e.stateNode===null)p3(t,e),nh(e,r,i),w9(e,r,i,o),i=!0;else if(t===null){var u=e.stateNode,h=e.memoizedProps;u.props=h;var d=u.context,p=r.contextType;typeof p=="object"&&p!==null?p=Bt(p):(p=T0(r)?Ae:g0.current,p=kr(e,p));var H=r.getDerivedStateFromProps,w=typeof H=="function"||typeof u.getSnapshotBeforeUpdate=="function";w||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(h!==i||d!==p)&&Eu(e,u,i,p),F2=!1;var C=e.memoizedState;u.state=C,E3(e,i,u,o),d=e.memoizedState,h!==i||C!==d||E0.current||F2?(typeof H=="function"&&(M9(e,r,H,i),d=e.memoizedState),(h=F2||Ru(e,r,h,i,C,d,p))?(w||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(e.flags|=4194308)):(typeof u.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=d),u.props=i,u.state=d,u.context=p,i=h):(typeof u.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{u=e.stateNode,rh(t,e),h=e.memoizedProps,p=e.type===e.elementType?h:Et(e.type,h),u.props=p,w=e.pendingProps,C=u.context,d=r.contextType,typeof d=="object"&&d!==null?d=Bt(d):(d=T0(r)?Ae:g0.current,d=kr(e,d));var A=r.getDerivedStateFromProps;(H=typeof A=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(h!==w||C!==d)&&Eu(e,u,i,d),F2=!1,C=e.memoizedState,u.state=C,E3(e,i,u,o);var E=e.memoizedState;h!==w||C!==E||E0.current||F2?(typeof A=="function"&&(M9(e,r,A,i),E=e.memoizedState),(p=F2||Ru(e,r,p,i,C,E,d)||!1)?(H||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(i,E,d),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(i,E,d)),typeof u.componentDidUpdate=="function"&&(e.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof u.componentDidUpdate!="function"||h===t.memoizedProps&&C===t.memoizedState||(e.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||h===t.memoizedProps&&C===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=E),u.props=i,u.state=E,u.context=d,i=p):(typeof u.componentDidUpdate!="function"||h===t.memoizedProps&&C===t.memoizedState||(e.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||h===t.memoizedProps&&C===t.memoizedState||(e.flags|=1024),i=!1)}return S9(t,e,r,i,c,o)}function S9(t,e,r,i,o,c){_h(t,e);var u=(e.flags&128)!==0;if(!i&&!u)return o&&Vu(e,r,!1),B2(t,e,c);i=e.stateNode,lS.current=e;var h=u&&typeof r.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&u?(e.child=Nr(e,t.child,null,c),e.child=Nr(e,null,h,c)):y0(t,e,h,c),e.memoizedState=i.state,o&&Vu(e,r,!0),e.child}function Rh(t){var e=t.stateNode;e.pendingContext?Cu(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Cu(t,e.context,!1),l8(t,e.containerInfo)}function Wu(t,e,r,i,o){return Ir(),e8(o),e.flags|=256,y0(t,e,r,i),e.child}var C9={dehydrated:null,treeContext:null,retryLane:0};function V9(t){return{baseLanes:t,cachePool:null,transitions:null}}function Eh(t,e,r){var i=e.pendingProps,o=k1.current,c=!1,u=(e.flags&128)!==0,h;if((h=u)||(h=t!==null&&t.memoizedState===null?!1:(o&2)!==0),h?(c=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(o|=1),H1(k1,o&1),t===null)return z9(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(u=i.children,t=i.fallback,c?(i=e.mode,c=e.child,u={mode:"hidden",children:u},!(i&1)&&c!==null?(c.childLanes=0,c.pendingProps=u):c=Q3(u,i,0,null),t=Le(t,i,r,null),c.return=e,t.return=e,c.sibling=t,e.child=c,e.child.memoizedState=V9(r),e.memoizedState=C9,t):f8(e,u));if(o=t.memoizedState,o!==null&&(h=o.dehydrated,h!==null))return cS(t,e,u,i,h,o,r);if(c){c=i.fallback,u=e.mode,o=t.child,h=o.sibling;var d={mode:"hidden",children:i.children};return!(u&1)&&e.child!==o?(i=e.child,i.childLanes=0,i.pendingProps=d,e.deletions=null):(i=Z2(o,d),i.subtreeFlags=o.subtreeFlags&14680064),h!==null?c=Z2(h,c):(c=Le(c,u,r,null),c.flags|=2),c.return=e,i.return=e,i.sibling=c,e.child=i,i=c,c=e.child,u=t.child.memoizedState,u=u===null?V9(r):{baseLanes:u.baseLanes|r,cachePool:null,transitions:u.transitions},c.memoizedState=u,c.childLanes=t.childLanes&~r,e.memoizedState=C9,i}return c=t.child,t=c.sibling,i=Z2(c,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=r),i.return=e,i.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=i,e.memoizedState=null,i}function f8(t,e){return e=Q3({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function i3(t,e,r,i){return i!==null&&e8(i),Nr(e,t.child,null,r),t=f8(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function cS(t,e,r,i,o,c,u){if(r)return e.flags&256?(e.flags&=-257,i=D5(Error(W(422))),i3(t,e,u,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(c=i.fallback,o=e.mode,i=Q3({mode:"visible",children:i.children},o,0,null),c=Le(c,o,u,null),c.flags|=2,i.return=e,c.return=e,i.sibling=c,e.child=i,e.mode&1&&Nr(e,t.child,null,u),e.child.memoizedState=V9(u),e.memoizedState=C9,c);if(!(e.mode&1))return i3(t,e,u,null);if(o.data==="$!"){if(i=o.nextSibling&&o.nextSibling.dataset,i)var h=i.dgst;return i=h,c=Error(W(419)),i=D5(c,i,void 0),i3(t,e,u,i)}if(h=(u&t.childLanes)!==0,R0||h){if(i=a0,i!==null){switch(u&-u){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(i.suspendedLanes|u)?0:o,o!==0&&o!==c.retryLane&&(c.retryLane=o,z2(t,o),Nt(i,t,o,-1))}return M8(),i=D5(Error(W(421))),i3(t,e,u,i)}return o.data==="$?"?(e.flags|=128,e.child=t.child,e=MS.bind(null,t),o._reactRetry=e,null):(t=c.treeContext,X0=K2(o.nextSibling),q0=e,R1=!0,kt=null,t!==null&&(gt[mt++]=p2,gt[mt++]=f2,gt[mt++]=be,p2=t.id,f2=t.overflow,be=e),e=f8(e,i.children),e.flags|=4096,e)}function $u(t,e,r){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),B9(t.return,e,r)}function U5(t,e,r,i,o){var c=t.memoizedState;c===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:o}:(c.isBackwards=e,c.rendering=null,c.renderingStartTime=0,c.last=i,c.tail=r,c.tailMode=o)}function Th(t,e,r){var i=e.pendingProps,o=i.revealOrder,c=i.tail;if(y0(t,e,i.children,r),i=k1.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&$u(t,r,e);else if(t.tag===19)$u(t,r,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(H1(k1,i),!(e.mode&1))e.memoizedState=null;else switch(o){case"forwards":for(r=e.child,o=null;r!==null;)t=r.alternate,t!==null&&T3(t)===null&&(o=r),r=r.sibling;r=o,r===null?(o=e.child,e.child=null):(o=r.sibling,r.sibling=null),U5(e,!1,o,r,c);break;case"backwards":for(r=null,o=e.child,e.child=null;o!==null;){if(t=o.alternate,t!==null&&T3(t)===null){e.child=o;break}t=o.sibling,o.sibling=r,r=o,o=t}U5(e,!0,r,null,c);break;case"together":U5(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function p3(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function B2(t,e,r){if(t!==null&&(e.dependencies=t.dependencies),Re|=e.lanes,!(r&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(W(153));if(e.child!==null){for(t=e.child,r=Z2(t,t.pendingProps),e.child=r,r.return=e;t.sibling!==null;)t=t.sibling,r=r.sibling=Z2(t,t.pendingProps),r.return=e;r.sibling=null}return e.child}function uS(t,e,r){switch(e.tag){case 3:Rh(e),Ir();break;case 5:lh(e);break;case 1:T0(e.type)&&L3(e);break;case 4:l8(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,o=e.memoizedProps.value;H1(_3,i._currentValue),i._currentValue=o;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(H1(k1,k1.current&1),e.flags|=128,null):r&e.child.childLanes?Eh(t,e,r):(H1(k1,k1.current&1),t=B2(t,e,r),t!==null?t.sibling:null);H1(k1,k1.current&1);break;case 19:if(i=(r&e.childLanes)!==0,t.flags&128){if(i)return Th(t,e,r);e.flags|=128}if(o=e.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),H1(k1,k1.current),i)break;return null;case 22:case 23:return e.lanes=0,bh(t,e,r)}return B2(t,e,r)}var kh,L9,Ih,Nh;kh=function(t,e){for(var r=e.child;r!==null;){if(r.tag===5||r.tag===6)t.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};L9=function(){};Ih=function(t,e,r,i){var o=t.memoizedProps;if(o!==i){t=e.stateNode,Ce(Zt.current);var c=null;switch(r){case"input":o=Y5(t,o),i=Y5(t,i),c=[];break;case"select":o=N1({},o,{value:void 0}),i=N1({},i,{value:void 0}),c=[];break;case"textarea":o=J5(t,o),i=J5(t,i),c=[];break;default:typeof o.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=C3)}e9(r,i);var u;r=null;for(p in o)if(!i.hasOwnProperty(p)&&o.hasOwnProperty(p)&&o[p]!=null)if(p==="style"){var h=o[p];for(u in h)h.hasOwnProperty(u)&&(r||(r={}),r[u]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(ra.hasOwnProperty(p)?c||(c=[]):(c=c||[]).push(p,null));for(p in i){var d=i[p];if(h=o?.[p],i.hasOwnProperty(p)&&d!==h&&(d!=null||h!=null))if(p==="style")if(h){for(u in h)!h.hasOwnProperty(u)||d&&d.hasOwnProperty(u)||(r||(r={}),r[u]="");for(u in d)d.hasOwnProperty(u)&&h[u]!==d[u]&&(r||(r={}),r[u]=d[u])}else r||(c||(c=[]),c.push(p,r)),r=d;else p==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,h=h?h.__html:void 0,d!=null&&h!==d&&(c=c||[]).push(p,d)):p==="children"?typeof d!="string"&&typeof d!="number"||(c=c||[]).push(p,""+d):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(ra.hasOwnProperty(p)?(d!=null&&p==="onScroll"&&C1("scroll",t),c||h===d||(c=[])):(c=c||[]).push(p,d))}r&&(c=c||[]).push("style",r);var p=c;(e.updateQueue=p)&&(e.flags|=4)}};Nh=function(t,e,r,i){r!==i&&(e.flags|=4)};function O4(t,e){if(!R1)switch(t.tailMode){case"hidden":e=t.tail;for(var r=null;e!==null;)e.alternate!==null&&(r=e),e=e.sibling;r===null?t.tail=null:r.sibling=null;break;case"collapsed":r=t.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function p0(t){var e=t.alternate!==null&&t.alternate.child===t.child,r=0,i=0;if(e)for(var o=t.child;o!==null;)r|=o.lanes|o.childLanes,i|=o.subtreeFlags&14680064,i|=o.flags&14680064,o.return=t,o=o.sibling;else for(o=t.child;o!==null;)r|=o.lanes|o.childLanes,i|=o.subtreeFlags,i|=o.flags,o.return=t,o=o.sibling;return t.subtreeFlags|=i,t.childLanes=r,e}function sS(t,e,r){var i=e.pendingProps;switch(t8(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return p0(e),null;case 1:return T0(e.type)&&V3(),p0(e),null;case 3:return i=e.stateNode,Pr(),V1(E0),V1(g0),u8(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(a3(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,kt!==null&&(I9(kt),kt=null))),L9(t,e),p0(e),null;case 5:c8(e);var o=Ce(pa.current);if(r=e.type,t!==null&&e.stateNode!=null)Ih(t,e,r,i,o),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(W(166));return p0(e),null}if(t=Ce(Zt.current),a3(e)){i=e.stateNode,r=e.type;var c=e.memoizedProps;switch(i[qt]=e,i[da]=c,t=(e.mode&1)!==0,r){case"dialog":C1("cancel",i),C1("close",i);break;case"iframe":case"object":case"embed":C1("load",i);break;case"video":case"audio":for(o=0;o<G4.length;o++)C1(G4[o],i);break;case"source":C1("error",i);break;case"img":case"image":case"link":C1("error",i),C1("load",i);break;case"details":C1("toggle",i);break;case"input":Qc(i,c),C1("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!c.multiple},C1("invalid",i);break;case"textarea":tu(i,c),C1("invalid",i)}e9(r,c),o=null;for(var u in c)if(c.hasOwnProperty(u)){var h=c[u];u==="children"?typeof h=="string"?i.textContent!==h&&(c.suppressHydrationWarning!==!0&&r3(i.textContent,h,t),o=["children",h]):typeof h=="number"&&i.textContent!==""+h&&(c.suppressHydrationWarning!==!0&&r3(i.textContent,h,t),o=["children",""+h]):ra.hasOwnProperty(u)&&h!=null&&u==="onScroll"&&C1("scroll",i)}switch(r){case"input":$n(i),Jc(i,c,!0);break;case"textarea":$n(i),eu(i);break;case"select":case"option":break;default:typeof c.onClick=="function"&&(i.onclick=C3)}i=o,e.updateQueue=i,i!==null&&(e.flags|=4)}else{u=o.nodeType===9?o:o.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ss(r)),t==="http://www.w3.org/1999/xhtml"?r==="script"?(t=u.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=u.createElement(r,{is:i.is}):(t=u.createElement(r),r==="select"&&(u=t,i.multiple?u.multiple=!0:i.size&&(u.size=i.size))):t=u.createElementNS(t,r),t[qt]=e,t[da]=i,kh(t,e,!1,!1),e.stateNode=t;t:{switch(u=r9(r,i),r){case"dialog":C1("cancel",t),C1("close",t),o=i;break;case"iframe":case"object":case"embed":C1("load",t),o=i;break;case"video":case"audio":for(o=0;o<G4.length;o++)C1(G4[o],t);o=i;break;case"source":C1("error",t),o=i;break;case"img":case"image":case"link":C1("error",t),C1("load",t),o=i;break;case"details":C1("toggle",t),o=i;break;case"input":Qc(t,i),o=Y5(t,i),C1("invalid",t);break;case"option":o=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},o=N1({},i,{value:void 0}),C1("invalid",t);break;case"textarea":tu(t,i),o=J5(t,i),C1("invalid",t);break;default:o=i}e9(r,o),h=o;for(c in h)if(h.hasOwnProperty(c)){var d=h[c];c==="style"?vs(t,d):c==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&hs(t,d)):c==="children"?typeof d=="string"?(r!=="textarea"||d!=="")&&aa(t,d):typeof d=="number"&&aa(t,""+d):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ra.hasOwnProperty(c)?d!=null&&c==="onScroll"&&C1("scroll",t):d!=null&&F9(t,c,d,u))}switch(r){case"input":$n(t),Jc(t,i,!1);break;case"textarea":$n(t),eu(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Q2(i.value));break;case"select":t.multiple=!!i.multiple,c=i.value,c!=null?Lr(t,!!i.multiple,c,!1):i.defaultValue!=null&&Lr(t,!!i.multiple,i.defaultValue,!0);break;default:typeof o.onClick=="function"&&(t.onclick=C3)}switch(r){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return p0(e),null;case 6:if(t&&e.stateNode!=null)Nh(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(W(166));if(r=Ce(pa.current),Ce(Zt.current),a3(e)){if(i=e.stateNode,r=e.memoizedProps,i[qt]=e,(c=i.nodeValue!==r)&&(t=q0,t!==null))switch(t.tag){case 3:r3(i.nodeValue,r,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&r3(i.nodeValue,r,(t.mode&1)!==0)}c&&(e.flags|=4)}else i=(r.nodeType===9?r:r.ownerDocument).createTextNode(i),i[qt]=e,e.stateNode=i}return p0(e),null;case 13:if(V1(k1),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(R1&&X0!==null&&e.mode&1&&!(e.flags&128))th(),Ir(),e.flags|=98560,c=!1;else if(c=a3(e),i!==null&&i.dehydrated!==null){if(t===null){if(!c)throw Error(W(318));if(c=e.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(W(317));c[qt]=e}else Ir(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;p0(e),c=!1}else kt!==null&&(I9(kt),kt=null),c=!0;if(!c)return e.flags&65536?e:null}return e.flags&128?(e.lanes=r,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||k1.current&1?Y1===0&&(Y1=3):M8())),e.updateQueue!==null&&(e.flags|=4),p0(e),null);case 4:return Pr(),L9(t,e),t===null&&sa(e.stateNode.containerInfo),p0(e),null;case 10:return n8(e.type._context),p0(e),null;case 17:return T0(e.type)&&V3(),p0(e),null;case 19:if(V1(k1),c=e.memoizedState,c===null)return p0(e),null;if(i=(e.flags&128)!==0,u=c.rendering,u===null)if(i)O4(c,!1);else{if(Y1!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(u=T3(t),u!==null){for(e.flags|=128,O4(c,!1),i=u.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=r,r=e.child;r!==null;)c=r,t=i,c.flags&=14680066,u=c.alternate,u===null?(c.childLanes=0,c.lanes=t,c.child=null,c.subtreeFlags=0,c.memoizedProps=null,c.memoizedState=null,c.updateQueue=null,c.dependencies=null,c.stateNode=null):(c.childLanes=u.childLanes,c.lanes=u.lanes,c.child=u.child,c.subtreeFlags=0,c.deletions=null,c.memoizedProps=u.memoizedProps,c.memoizedState=u.memoizedState,c.updateQueue=u.updateQueue,c.type=u.type,t=u.dependencies,c.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),r=r.sibling;return H1(k1,k1.current&1|2),e.child}t=t.sibling}c.tail!==null&&W1()>Or&&(e.flags|=128,i=!0,O4(c,!1),e.lanes=4194304)}else{if(!i)if(t=T3(u),t!==null){if(e.flags|=128,i=!0,r=t.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),O4(c,!0),c.tail===null&&c.tailMode==="hidden"&&!u.alternate&&!R1)return p0(e),null}else 2*W1()-c.renderingStartTime>Or&&r!==1073741824&&(e.flags|=128,i=!0,O4(c,!1),e.lanes=4194304);c.isBackwards?(u.sibling=e.child,e.child=u):(r=c.last,r!==null?r.sibling=u:e.child=u,c.last=u)}return c.tail!==null?(e=c.tail,c.rendering=e,c.tail=e.sibling,c.renderingStartTime=W1(),e.sibling=null,r=k1.current,H1(k1,i?r&1|2:r&1),e):(p0(e),null);case 22:case 23:return B8(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?K0&1073741824&&(p0(e),e.subtreeFlags&6&&(e.flags|=8192)):p0(e),null;case 24:return null;case 25:return null}throw Error(W(156,e.tag))}function hS(t,e){switch(t8(e),e.tag){case 1:return T0(e.type)&&V3(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Pr(),V1(E0),V1(g0),u8(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return c8(e),null;case 13:if(V1(k1),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(W(340));Ir()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return V1(k1),null;case 4:return Pr(),null;case 10:return n8(e.type._context),null;case 22:case 23:return B8(),null;case 24:return null;default:return null}}var o3=!1,f0=!1,dS=typeof WeakSet=="function"?WeakSet:Set,G=null;function Cr(t,e){var r=t.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(i){F1(t,e,i)}else r.current=null}function A9(t,e,r){try{r()}catch(i){F1(t,e,i)}}var ju=!1;function vS(t,e){if(d9=y3,t=Ds(),Q9(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else t:{r=(r=t.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var o=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{r.nodeType,c.nodeType}catch{r=null;break t}var u=0,h=-1,d=-1,p=0,H=0,w=t,C=null;e:for(;;){for(var A;w!==r||o!==0&&w.nodeType!==3||(h=u+o),w!==c||i!==0&&w.nodeType!==3||(d=u+i),w.nodeType===3&&(u+=w.nodeValue.length),(A=w.firstChild)!==null;)C=w,w=A;for(;;){if(w===t)break e;if(C===r&&++p===o&&(h=u),C===c&&++H===i&&(d=u),(A=w.nextSibling)!==null)break;w=C,C=w.parentNode}w=A}r=h===-1||d===-1?null:{start:h,end:d}}else r=null}r=r||{start:0,end:0}}else r=null;for(v9={focusedElem:t,selectionRange:r},y3=!1,G=e;G!==null;)if(e=G,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,G=t;else for(;G!==null;){e=G;try{var E=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(E!==null){var M=E.memoizedProps,S=E.memoizedState,g=e.stateNode,m=g.getSnapshotBeforeUpdate(e.elementType===e.type?M:Et(e.type,M),S);g.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var z=e.stateNode.containerInfo;z.nodeType===1?z.textContent="":z.nodeType===9&&z.documentElement&&z.removeChild(z.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(W(163))}}catch(b){F1(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,G=t;break}G=e.return}return E=ju,ju=!1,E}function J4(t,e,r){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var c=o.destroy;o.destroy=void 0,c!==void 0&&A9(e,r,c)}o=o.next}while(o!==i)}}function Y3(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var r=e=e.next;do{if((r.tag&t)===t){var i=r.create;r.destroy=i()}r=r.next}while(r!==e)}}function b9(t){var e=t.ref;if(e!==null){var r=t.stateNode;switch(t.tag){case 5:t=r;break;default:t=r}typeof e=="function"?e(t):e.current=t}}function Ph(t){var e=t.alternate;e!==null&&(t.alternate=null,Ph(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[qt],delete e[da],delete e[g9],delete e[qH],delete e[YH])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Fh(t){return t.tag===5||t.tag===3||t.tag===4}function Gu(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Fh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function _9(t,e,r){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?r.nodeType===8?r.parentNode.insertBefore(t,e):r.insertBefore(t,e):(r.nodeType===8?(e=r.parentNode,e.insertBefore(t,r)):(e=r,e.appendChild(t)),r=r._reactRootContainer,r!=null||e.onclick!==null||(e.onclick=C3));else if(i!==4&&(t=t.child,t!==null))for(_9(t,e,r),t=t.sibling;t!==null;)_9(t,e,r),t=t.sibling}function R9(t,e,r){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?r.insertBefore(t,e):r.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(R9(t,e,r),t=t.sibling;t!==null;)R9(t,e,r),t=t.sibling}var i0=null,Tt=!1;function N2(t,e,r){for(r=r.child;r!==null;)Oh(t,e,r),r=r.sibling}function Oh(t,e,r){if(Yt&&typeof Yt.onCommitFiberUnmount=="function")try{Yt.onCommitFiberUnmount(U3,r)}catch{}switch(r.tag){case 5:f0||Cr(r,e);case 6:var i=i0,o=Tt;i0=null,N2(t,e,r),i0=i,Tt=o,i0!==null&&(Tt?(t=i0,r=r.stateNode,t.nodeType===8?t.parentNode.removeChild(r):t.removeChild(r)):i0.removeChild(r.stateNode));break;case 18:i0!==null&&(Tt?(t=i0,r=r.stateNode,t.nodeType===8?k5(t.parentNode,r):t.nodeType===1&&k5(t,r),la(t)):k5(i0,r.stateNode));break;case 4:i=i0,o=Tt,i0=r.stateNode.containerInfo,Tt=!0,N2(t,e,r),i0=i,Tt=o;break;case 0:case 11:case 14:case 15:if(!f0&&(i=r.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){o=i=i.next;do{var c=o,u=c.destroy;c=c.tag,u!==void 0&&(c&2||c&4)&&A9(r,e,u),o=o.next}while(o!==i)}N2(t,e,r);break;case 1:if(!f0&&(Cr(r,e),i=r.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=r.memoizedProps,i.state=r.memoizedState,i.componentWillUnmount()}catch(h){F1(r,e,h)}N2(t,e,r);break;case 21:N2(t,e,r);break;case 22:r.mode&1?(f0=(i=f0)||r.memoizedState!==null,N2(t,e,r),f0=i):N2(t,e,r);break;default:N2(t,e,r)}}function Ku(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var r=t.stateNode;r===null&&(r=t.stateNode=new dS),e.forEach(function(i){var o=wS.bind(null,t,i);r.has(i)||(r.add(i),i.then(o,o))})}}function Rt(t,e){var r=e.deletions;if(r!==null)for(var i=0;i<r.length;i++){var o=r[i];try{var c=t,u=e,h=u;t:for(;h!==null;){switch(h.tag){case 5:i0=h.stateNode,Tt=!1;break t;case 3:i0=h.stateNode.containerInfo,Tt=!0;break t;case 4:i0=h.stateNode.containerInfo,Tt=!0;break t}h=h.return}if(i0===null)throw Error(W(160));Oh(c,u,o),i0=null,Tt=!1;var d=o.alternate;d!==null&&(d.return=null),o.return=null}catch(p){F1(o,e,p)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Dh(e,t),e=e.sibling}function Dh(t,e){var r=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Rt(e,t),Kt(t),i&4){try{J4(3,t,t.return),Y3(3,t)}catch(M){F1(t,t.return,M)}try{J4(5,t,t.return)}catch(M){F1(t,t.return,M)}}break;case 1:Rt(e,t),Kt(t),i&512&&r!==null&&Cr(r,r.return);break;case 5:if(Rt(e,t),Kt(t),i&512&&r!==null&&Cr(r,r.return),t.flags&32){var o=t.stateNode;try{aa(o,"")}catch(M){F1(t,t.return,M)}}if(i&4&&(o=t.stateNode,o!=null)){var c=t.memoizedProps,u=r!==null?r.memoizedProps:c,h=t.type,d=t.updateQueue;if(t.updateQueue=null,d!==null)try{h==="input"&&c.type==="radio"&&c.name!=null&&cs(o,c),r9(h,u);var p=r9(h,c);for(u=0;u<d.length;u+=2){var H=d[u],w=d[u+1];H==="style"?vs(o,w):H==="dangerouslySetInnerHTML"?hs(o,w):H==="children"?aa(o,w):F9(o,H,w,p)}switch(h){case"input":Z5(o,c);break;case"textarea":us(o,c);break;case"select":var C=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!c.multiple;var A=c.value;A!=null?Lr(o,!!c.multiple,A,!1):C!==!!c.multiple&&(c.defaultValue!=null?Lr(o,!!c.multiple,c.defaultValue,!0):Lr(o,!!c.multiple,c.multiple?[]:"",!1))}o[da]=c}catch(M){F1(t,t.return,M)}}break;case 6:if(Rt(e,t),Kt(t),i&4){if(t.stateNode===null)throw Error(W(162));o=t.stateNode,c=t.memoizedProps;try{o.nodeValue=c}catch(M){F1(t,t.return,M)}}break;case 3:if(Rt(e,t),Kt(t),i&4&&r!==null&&r.memoizedState.isDehydrated)try{la(e.containerInfo)}catch(M){F1(t,t.return,M)}break;case 4:Rt(e,t),Kt(t);break;case 13:Rt(e,t),Kt(t),o=t.child,o.flags&8192&&(c=o.memoizedState!==null,o.stateNode.isHidden=c,!c||o.alternate!==null&&o.alternate.memoizedState!==null||(x8=W1())),i&4&&Ku(t);break;case 22:if(H=r!==null&&r.memoizedState!==null,t.mode&1?(f0=(p=f0)||H,Rt(e,t),f0=p):Rt(e,t),Kt(t),i&8192){if(p=t.memoizedState!==null,(t.stateNode.isHidden=p)&&!H&&t.mode&1)for(G=t,H=t.child;H!==null;){for(w=G=H;G!==null;){switch(C=G,A=C.child,C.tag){case 0:case 11:case 14:case 15:J4(4,C,C.return);break;case 1:Cr(C,C.return);var E=C.stateNode;if(typeof E.componentWillUnmount=="function"){i=C,r=C.return;try{e=i,E.props=e.memoizedProps,E.state=e.memoizedState,E.componentWillUnmount()}catch(M){F1(i,r,M)}}break;case 5:Cr(C,C.return);break;case 22:if(C.memoizedState!==null){qu(w);continue}}A!==null?(A.return=C,G=A):qu(w)}H=H.sibling}t:for(H=null,w=t;;){if(w.tag===5){if(H===null){H=w;try{o=w.stateNode,p?(c=o.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none"):(h=w.stateNode,d=w.memoizedProps.style,u=d!=null&&d.hasOwnProperty("display")?d.display:null,h.style.display=ds("display",u))}catch(M){F1(t,t.return,M)}}}else if(w.tag===6){if(H===null)try{w.stateNode.nodeValue=p?"":w.memoizedProps}catch(M){F1(t,t.return,M)}}else if((w.tag!==22&&w.tag!==23||w.memoizedState===null||w===t)&&w.child!==null){w.child.return=w,w=w.child;continue}if(w===t)break t;for(;w.sibling===null;){if(w.return===null||w.return===t)break t;H===w&&(H=null),w=w.return}H===w&&(H=null),w.sibling.return=w.return,w=w.sibling}}break;case 19:Rt(e,t),Kt(t),i&4&&Ku(t);break;case 21:break;default:Rt(e,t),Kt(t)}}function Kt(t){var e=t.flags;if(e&2){try{t:{for(var r=t.return;r!==null;){if(Fh(r)){var i=r;break t}r=r.return}throw Error(W(160))}switch(i.tag){case 5:var o=i.stateNode;i.flags&32&&(aa(o,""),i.flags&=-33);var c=Gu(t);R9(t,c,o);break;case 3:case 4:var u=i.stateNode.containerInfo,h=Gu(t);_9(t,h,u);break;default:throw Error(W(161))}}catch(d){F1(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function pS(t,e,r){G=t,Uh(t,e,r)}function Uh(t,e,r){for(var i=(t.mode&1)!==0;G!==null;){var o=G,c=o.child;if(o.tag===22&&i){var u=o.memoizedState!==null||o3;if(!u){var h=o.alternate,d=h!==null&&h.memoizedState!==null||f0;h=o3;var p=f0;if(o3=u,(f0=d)&&!p)for(G=o;G!==null;)u=G,d=u.child,u.tag===22&&u.memoizedState!==null?Yu(o):d!==null?(d.return=u,G=d):Yu(o);for(;c!==null;)G=c,Uh(c,e,r),c=c.sibling;G=o,o3=h,f0=p}Xu(t,e,r)}else o.subtreeFlags&8772&&c!==null?(c.return=o,G=c):Xu(t,e,r)}}function Xu(t){for(;G!==null;){var e=G;if(e.flags&8772){var r=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:f0||Y3(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!f0)if(r===null)i.componentDidMount();else{var o=e.elementType===e.type?r.memoizedProps:Et(e.type,r.memoizedProps);i.componentDidUpdate(o,r.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var c=e.updateQueue;c!==null&&_u(e,c,i);break;case 3:var u=e.updateQueue;if(u!==null){if(r=null,e.child!==null)switch(e.child.tag){case 5:r=e.child.stateNode;break;case 1:r=e.child.stateNode}_u(e,u,r)}break;case 5:var h=e.stateNode;if(r===null&&e.flags&4){r=h;var d=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&r.focus();break;case"img":d.src&&(r.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var p=e.alternate;if(p!==null){var H=p.memoizedState;if(H!==null){var w=H.dehydrated;w!==null&&la(w)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(W(163))}f0||e.flags&512&&b9(e)}catch(C){F1(e,e.return,C)}}if(e===t){G=null;break}if(r=e.sibling,r!==null){r.return=e.return,G=r;break}G=e.return}}function qu(t){for(;G!==null;){var e=G;if(e===t){G=null;break}var r=e.sibling;if(r!==null){r.return=e.return,G=r;break}G=e.return}}function Yu(t){for(;G!==null;){var e=G;try{switch(e.tag){case 0:case 11:case 15:var r=e.return;try{Y3(4,e)}catch(d){F1(e,r,d)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var o=e.return;try{i.componentDidMount()}catch(d){F1(e,o,d)}}var c=e.return;try{b9(e)}catch(d){F1(e,c,d)}break;case 5:var u=e.return;try{b9(e)}catch(d){F1(e,u,d)}}}catch(d){F1(e,e.return,d)}if(e===t){G=null;break}var h=e.sibling;if(h!==null){h.return=e.return,G=h;break}G=e.return}}var fS=Math.ceil,N3=M2.ReactCurrentDispatcher,g8=M2.ReactCurrentOwner,zt=M2.ReactCurrentBatchConfig,v1=0,a0=null,j1=null,o0=0,K0=0,Vr=ee(0),Y1=0,xa=null,Re=0,Z3=0,m8=0,ta=null,_0=null,x8=0,Or=1/0,d2=null,P3=!1,E9=null,q2=null,l3=!1,W2=null,F3=0,ea=0,T9=null,f3=-1,g3=0;function H0(){return v1&6?W1():f3!==-1?f3:f3=W1()}function Y2(t){return t.mode&1?v1&2&&o0!==0?o0&-o0:QH.transition!==null?(g3===0&&(g3=Ss()),g3):(t=z1,t!==0||(t=window.event,t=t===void 0?16:Rs(t.type)),t):1}function Nt(t,e,r,i){if(50<ea)throw ea=0,T9=null,Error(W(185));za(t,r,i),(!(v1&2)||t!==a0)&&(t===a0&&(!(v1&2)&&(Z3|=r),Y1===4&&D2(t,o0)),k0(t,i),r===1&&v1===0&&!(e.mode&1)&&(Or=W1()+500,K3&&re()))}function k0(t,e){var r=t.callbackNode;tH(t,e);var i=w3(t,t===a0?o0:0);if(i===0)r!==null&&nu(r),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(r!=null&&nu(r),e===1)t.tag===0?ZH(Zu.bind(null,t)):Zs(Zu.bind(null,t)),KH(function(){!(v1&6)&&re()}),r=null;else{switch(Cs(i)){case 1:r=$9;break;case 4:r=ys;break;case 16:r=M3;break;case 536870912:r=Hs;break;default:r=M3}r=Yh(r,Wh.bind(null,t))}t.callbackPriority=e,t.callbackNode=r}}function Wh(t,e){if(f3=-1,g3=0,v1&6)throw Error(W(327));var r=t.callbackNode;if(Er()&&t.callbackNode!==r)return null;var i=w3(t,t===a0?o0:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=O3(t,i);else{e=i;var o=v1;v1|=2;var c=jh();(a0!==t||o0!==e)&&(d2=null,Or=W1()+500,Ve(t,e));do try{xS();break}catch(h){$h(t,h)}while(1);a8(),N3.current=c,v1=o,j1!==null?e=0:(a0=null,o0=0,e=Y1)}if(e!==0){if(e===2&&(o=l9(t),o!==0&&(i=o,e=k9(t,o))),e===1)throw r=xa,Ve(t,0),D2(t,i),k0(t,W1()),r;if(e===6)D2(t,i);else{if(o=t.current.alternate,!(i&30)&&!gS(o)&&(e=O3(t,i),e===2&&(c=l9(t),c!==0&&(i=c,e=k9(t,c))),e===1))throw r=xa,Ve(t,0),D2(t,i),k0(t,W1()),r;switch(t.finishedWork=o,t.finishedLanes=i,e){case 0:case 1:throw Error(W(345));case 2:ye(t,_0,d2);break;case 3:if(D2(t,i),(i&130023424)===i&&(e=x8+500-W1(),10<e)){if(w3(t,0)!==0)break;if(o=t.suspendedLanes,(o&i)!==i){H0(),t.pingedLanes|=t.suspendedLanes&o;break}t.timeoutHandle=f9(ye.bind(null,t,_0,d2),e);break}ye(t,_0,d2);break;case 4:if(D2(t,i),(i&4194240)===i)break;for(e=t.eventTimes,o=-1;0<i;){var u=31-It(i);c=1<<u,u=e[u],u>o&&(o=u),i&=~c}if(i=o,i=W1()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*fS(i/1960))-i,10<i){t.timeoutHandle=f9(ye.bind(null,t,_0,d2),i);break}ye(t,_0,d2);break;case 5:ye(t,_0,d2);break;default:throw Error(W(329))}}}return k0(t,W1()),t.callbackNode===r?Wh.bind(null,t):null}function k9(t,e){var r=ta;return t.current.memoizedState.isDehydrated&&(Ve(t,e).flags|=256),t=O3(t,e),t!==2&&(e=_0,_0=r,e!==null&&I9(e)),t}function I9(t){_0===null?_0=t:_0.push.apply(_0,t)}function gS(t){for(var e=t;;){if(e.flags&16384){var r=e.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var i=0;i<r.length;i++){var o=r[i],c=o.getSnapshot;o=o.value;try{if(!Pt(c(),o))return!1}catch{return!1}}}if(r=e.child,e.subtreeFlags&16384&&r!==null)r.return=e,e=r;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function D2(t,e){for(e&=~m8,e&=~Z3,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var r=31-It(e),i=1<<r;t[r]=-1,e&=~i}}function Zu(t){if(v1&6)throw Error(W(327));Er();var e=w3(t,0);if(!(e&1))return k0(t,W1()),null;var r=O3(t,e);if(t.tag!==0&&r===2){var i=l9(t);i!==0&&(e=i,r=k9(t,i))}if(r===1)throw r=xa,Ve(t,0),D2(t,e),k0(t,W1()),r;if(r===6)throw Error(W(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ye(t,_0,d2),k0(t,W1()),null}function z8(t,e){var r=v1;v1|=1;try{return t(e)}finally{v1=r,v1===0&&(Or=W1()+500,K3&&re())}}function Ee(t){W2!==null&&W2.tag===0&&!(v1&6)&&Er();var e=v1;v1|=1;var r=zt.transition,i=z1;try{if(zt.transition=null,z1=1,t)return t()}finally{z1=i,zt.transition=r,v1=e,!(v1&6)&&re()}}function B8(){K0=Vr.current,V1(Vr)}function Ve(t,e){t.finishedWork=null,t.finishedLanes=0;var r=t.timeoutHandle;if(r!==-1&&(t.timeoutHandle=-1,GH(r)),j1!==null)for(r=j1.return;r!==null;){var i=r;switch(t8(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&V3();break;case 3:Pr(),V1(E0),V1(g0),u8();break;case 5:c8(i);break;case 4:Pr();break;case 13:V1(k1);break;case 19:V1(k1);break;case 10:n8(i.type._context);break;case 22:case 23:B8()}r=r.return}if(a0=t,j1=t=Z2(t.current,null),o0=K0=e,Y1=0,xa=null,m8=Z3=Re=0,_0=ta=null,Se!==null){for(e=0;e<Se.length;e++)if(r=Se[e],i=r.interleaved,i!==null){r.interleaved=null;var o=i.next,c=r.pending;if(c!==null){var u=c.next;c.next=o,i.next=u}r.pending=i}Se=null}return t}function $h(t,e){do{var r=j1;try{if(a8(),d3.current=I3,k3){for(var i=I1.memoizedState;i!==null;){var o=i.queue;o!==null&&(o.pending=null),i=i.next}k3=!1}if(_e=0,r0=q1=I1=null,Q4=!1,fa=0,g8.current=null,r===null||r.return===null){Y1=1,xa=e,j1=null;break}t:{var c=t,u=r.return,h=r,d=e;if(e=o0,h.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var p=d,H=h,w=H.tag;if(!(H.mode&1)&&(w===0||w===11||w===15)){var C=H.alternate;C?(H.updateQueue=C.updateQueue,H.memoizedState=C.memoizedState,H.lanes=C.lanes):(H.updateQueue=null,H.memoizedState=null)}var A=Pu(u);if(A!==null){A.flags&=-257,Fu(A,u,h,c,e),A.mode&1&&Nu(c,p,e),e=A,d=p;var E=e.updateQueue;if(E===null){var M=new Set;M.add(d),e.updateQueue=M}else E.add(d);break t}else{if(!(e&1)){Nu(c,p,e),M8();break t}d=Error(W(426))}}else if(R1&&h.mode&1){var S=Pu(u);if(S!==null){!(S.flags&65536)&&(S.flags|=256),Fu(S,u,h,c,e),e8(Fr(d,h));break t}}c=d=Fr(d,h),Y1!==4&&(Y1=2),ta===null?ta=[c]:ta.push(c),c=u;do{switch(c.tag){case 3:c.flags|=65536,e&=-e,c.lanes|=e;var g=Vh(c,d,e);bu(c,g);break t;case 1:h=d;var m=c.type,z=c.stateNode;if(!(c.flags&128)&&(typeof m.getDerivedStateFromError=="function"||z!==null&&typeof z.componentDidCatch=="function"&&(q2===null||!q2.has(z)))){c.flags|=65536,e&=-e,c.lanes|=e;var b=Lh(c,h,e);bu(c,b);break t}}c=c.return}while(c!==null)}Kh(r)}catch(I){e=I,j1===r&&r!==null&&(j1=r=r.return);continue}break}while(1)}function jh(){var t=N3.current;return N3.current=I3,t===null?I3:t}function M8(){(Y1===0||Y1===3||Y1===2)&&(Y1=4),a0===null||!(Re&268435455)&&!(Z3&268435455)||D2(a0,o0)}function O3(t,e){var r=v1;v1|=2;var i=jh();(a0!==t||o0!==e)&&(d2=null,Ve(t,e));do try{mS();break}catch(o){$h(t,o)}while(1);if(a8(),v1=r,N3.current=i,j1!==null)throw Error(W(261));return a0=null,o0=0,Y1}function mS(){for(;j1!==null;)Gh(j1)}function xS(){for(;j1!==null&&!jy();)Gh(j1)}function Gh(t){var e=qh(t.alternate,t,K0);t.memoizedProps=t.pendingProps,e===null?Kh(t):j1=e,g8.current=null}function Kh(t){var e=t;do{var r=e.alternate;if(t=e.return,e.flags&32768){if(r=hS(r,e),r!==null){r.flags&=32767,j1=r;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Y1=6,j1=null;return}}else if(r=sS(r,e,K0),r!==null){j1=r;return}if(e=e.sibling,e!==null){j1=e;return}j1=e=t}while(e!==null);Y1===0&&(Y1=5)}function ye(t,e,r){var i=z1,o=zt.transition;try{zt.transition=null,z1=1,zS(t,e,r,i)}finally{zt.transition=o,z1=i}return null}function zS(t,e,r,i){do Er();while(W2!==null);if(v1&6)throw Error(W(327));r=t.finishedWork;var o=t.finishedLanes;if(r===null)return null;if(t.finishedWork=null,t.finishedLanes=0,r===t.current)throw Error(W(177));t.callbackNode=null,t.callbackPriority=0;var c=r.lanes|r.childLanes;if(eH(t,c),t===a0&&(j1=a0=null,o0=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||l3||(l3=!0,Yh(M3,function(){return Er(),null})),c=(r.flags&15990)!==0,r.subtreeFlags&15990||c){c=zt.transition,zt.transition=null;var u=z1;z1=1;var h=v1;v1|=4,g8.current=null,vS(t,r),Dh(r,t),DH(v9),y3=!!d9,v9=d9=null,t.current=r,pS(r,t,o),Gy(),v1=h,z1=u,zt.transition=c}else t.current=r;if(l3&&(l3=!1,W2=t,F3=o),c=t.pendingLanes,c===0&&(q2=null),qy(r.stateNode,i),k0(t,W1()),e!==null)for(i=t.onRecoverableError,r=0;r<e.length;r++)o=e[r],i(o.value,{componentStack:o.stack,digest:o.digest});if(P3)throw P3=!1,t=E9,E9=null,t;return F3&1&&t.tag!==0&&Er(),c=t.pendingLanes,c&1?t===T9?ea++:(ea=0,T9=t):ea=0,re(),null}function Er(){if(W2!==null){var t=Cs(F3),e=zt.transition,r=z1;try{if(zt.transition=null,z1=16>t?16:t,W2===null)var i=!1;else{if(t=W2,W2=null,F3=0,v1&6)throw Error(W(331));var o=v1;for(v1|=4,G=t.current;G!==null;){var c=G,u=c.child;if(G.flags&16){var h=c.deletions;if(h!==null){for(var d=0;d<h.length;d++){var p=h[d];for(G=p;G!==null;){var H=G;switch(H.tag){case 0:case 11:case 15:J4(8,H,c)}var w=H.child;if(w!==null)w.return=H,G=w;else for(;G!==null;){H=G;var C=H.sibling,A=H.return;if(Ph(H),H===p){G=null;break}if(C!==null){C.return=A,G=C;break}G=A}}}var E=c.alternate;if(E!==null){var M=E.child;if(M!==null){E.child=null;do{var S=M.sibling;M.sibling=null,M=S}while(M!==null)}}G=c}}if(c.subtreeFlags&2064&&u!==null)u.return=c,G=u;else t:for(;G!==null;){if(c=G,c.flags&2048)switch(c.tag){case 0:case 11:case 15:J4(9,c,c.return)}var g=c.sibling;if(g!==null){g.return=c.return,G=g;break t}G=c.return}}var m=t.current;for(G=m;G!==null;){u=G;var z=u.child;if(u.subtreeFlags&2064&&z!==null)z.return=u,G=z;else t:for(u=m;G!==null;){if(h=G,h.flags&2048)try{switch(h.tag){case 0:case 11:case 15:Y3(9,h)}}catch(I){F1(h,h.return,I)}if(h===u){G=null;break t}var b=h.sibling;if(b!==null){b.return=h.return,G=b;break t}G=h.return}}if(v1=o,re(),Yt&&typeof Yt.onPostCommitFiberRoot=="function")try{Yt.onPostCommitFiberRoot(U3,t)}catch{}i=!0}return i}finally{z1=r,zt.transition=e}}return!1}function Qu(t,e,r){e=Fr(r,e),e=Vh(t,e,1),t=X2(t,e,1),e=H0(),t!==null&&(za(t,1,e),k0(t,e))}function F1(t,e,r){if(t.tag===3)Qu(t,t,r);else for(;e!==null;){if(e.tag===3){Qu(e,t,r);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(q2===null||!q2.has(i))){t=Fr(r,t),t=Lh(e,t,1),e=X2(e,t,1),t=H0(),e!==null&&(za(e,1,t),k0(e,t));break}}e=e.return}}function BS(t,e,r){var i=t.pingCache;i!==null&&i.delete(e),e=H0(),t.pingedLanes|=t.suspendedLanes&r,a0===t&&(o0&r)===r&&(Y1===4||Y1===3&&(o0&130023424)===o0&&500>W1()-x8?Ve(t,0):m8|=r),k0(t,e)}function Xh(t,e){e===0&&(t.mode&1?(e=Kn,Kn<<=1,!(Kn&130023424)&&(Kn=4194304)):e=1);var r=H0();t=z2(t,e),t!==null&&(za(t,e,r),k0(t,r))}function MS(t){var e=t.memoizedState,r=0;e!==null&&(r=e.retryLane),Xh(t,r)}function wS(t,e){var r=0;switch(t.tag){case 13:var i=t.stateNode,o=t.memoizedState;o!==null&&(r=o.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(W(314))}i!==null&&i.delete(e),Xh(t,r)}var qh;qh=function(t,e,r){if(t!==null)if(t.memoizedProps!==e.pendingProps||E0.current)R0=!0;else{if(!(t.lanes&r)&&!(e.flags&128))return R0=!1,uS(t,e,r);R0=!!(t.flags&131072)}else R0=!1,R1&&e.flags&1048576&&Qs(e,b3,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;p3(t,e),t=e.pendingProps;var o=kr(e,g0.current);Rr(e,r),o=h8(null,e,i,t,o,r);var c=d8();return e.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,T0(i)?(c=!0,L3(e)):c=!1,e.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o8(e),o.updater=X3,e.stateNode=o,o._reactInternals=e,w9(e,i,t,r),e=S9(null,e,i,!0,c,r)):(e.tag=0,R1&&c&&J9(e),y0(null,e,o,r),e=e.child),e;case 16:i=e.elementType;t:{switch(p3(t,e),t=e.pendingProps,o=i._init,i=o(i._payload),e.type=i,o=e.tag=HS(i),t=Et(i,t),o){case 0:e=H9(null,e,i,t,r);break t;case 1:e=Uu(null,e,i,t,r);break t;case 11:e=Ou(null,e,i,t,r);break t;case 14:e=Du(null,e,i,Et(i.type,t),r);break t}throw Error(W(306,i,""))}return e;case 0:return i=e.type,o=e.pendingProps,o=e.elementType===i?o:Et(i,o),H9(t,e,i,o,r);case 1:return i=e.type,o=e.pendingProps,o=e.elementType===i?o:Et(i,o),Uu(t,e,i,o,r);case 3:t:{if(Rh(e),t===null)throw Error(W(387));i=e.pendingProps,c=e.memoizedState,o=c.element,rh(t,e),E3(e,i,null,r);var u=e.memoizedState;if(i=u.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},e.updateQueue.baseState=c,e.memoizedState=c,e.flags&256){o=Fr(Error(W(423)),e),e=Wu(t,e,i,r,o);break t}else if(i!==o){o=Fr(Error(W(424)),e),e=Wu(t,e,i,r,o);break t}else for(X0=K2(e.stateNode.containerInfo.firstChild),q0=e,R1=!0,kt=null,r=oh(e,null,i,r),e.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Ir(),i===o){e=B2(t,e,r);break t}y0(t,e,i,r)}e=e.child}return e;case 5:return lh(e),t===null&&z9(e),i=e.type,o=e.pendingProps,c=t!==null?t.memoizedProps:null,u=o.children,p9(i,o)?u=null:c!==null&&p9(i,c)&&(e.flags|=32),_h(t,e),y0(t,e,u,r),e.child;case 6:return t===null&&z9(e),null;case 13:return Eh(t,e,r);case 4:return l8(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Nr(e,null,i,r):y0(t,e,i,r),e.child;case 11:return i=e.type,o=e.pendingProps,o=e.elementType===i?o:Et(i,o),Ou(t,e,i,o,r);case 7:return y0(t,e,e.pendingProps,r),e.child;case 8:return y0(t,e,e.pendingProps.children,r),e.child;case 12:return y0(t,e,e.pendingProps.children,r),e.child;case 10:t:{if(i=e.type._context,o=e.pendingProps,c=e.memoizedProps,u=o.value,H1(_3,i._currentValue),i._currentValue=u,c!==null)if(Pt(c.value,u)){if(c.children===o.children&&!E0.current){e=B2(t,e,r);break t}}else for(c=e.child,c!==null&&(c.return=e);c!==null;){var h=c.dependencies;if(h!==null){u=c.child;for(var d=h.firstContext;d!==null;){if(d.context===i){if(c.tag===1){d=g2(-1,r&-r),d.tag=2;var p=c.updateQueue;if(p!==null){p=p.shared;var H=p.pending;H===null?d.next=d:(d.next=H.next,H.next=d),p.pending=d}}c.lanes|=r,d=c.alternate,d!==null&&(d.lanes|=r),B9(c.return,r,e),h.lanes|=r;break}d=d.next}}else if(c.tag===10)u=c.type===e.type?null:c.child;else if(c.tag===18){if(u=c.return,u===null)throw Error(W(341));u.lanes|=r,h=u.alternate,h!==null&&(h.lanes|=r),B9(u,r,e),u=c.sibling}else u=c.child;if(u!==null)u.return=c;else for(u=c;u!==null;){if(u===e){u=null;break}if(c=u.sibling,c!==null){c.return=u.return,u=c;break}u=u.return}c=u}y0(t,e,o.children,r),e=e.child}return e;case 9:return o=e.type,i=e.pendingProps.children,Rr(e,r),o=Bt(o),i=i(o),e.flags|=1,y0(t,e,i,r),e.child;case 14:return i=e.type,o=Et(i,e.pendingProps),o=Et(i.type,o),Du(t,e,i,o,r);case 15:return Ah(t,e,e.type,e.pendingProps,r);case 17:return i=e.type,o=e.pendingProps,o=e.elementType===i?o:Et(i,o),p3(t,e),e.tag=1,T0(i)?(t=!0,L3(e)):t=!1,Rr(e,r),nh(e,i,o),w9(e,i,o,r),S9(null,e,i,!0,t,r);case 19:return Th(t,e,r);case 22:return bh(t,e,r)}throw Error(W(156,e.tag))};function Yh(t,e){return ws(t,e)}function yS(t,e,r,i){this.tag=t,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function xt(t,e,r,i){return new yS(t,e,r,i)}function w8(t){return t=t.prototype,!(!t||!t.isReactComponent)}function HS(t){if(typeof t=="function")return w8(t)?1:0;if(t!=null){if(t=t.$$typeof,t===D9)return 11;if(t===U9)return 14}return 2}function Z2(t,e){var r=t.alternate;return r===null?(r=xt(t.tag,e,t.key,t.mode),r.elementType=t.elementType,r.type=t.type,r.stateNode=t.stateNode,r.alternate=t,t.alternate=r):(r.pendingProps=e,r.type=t.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=t.flags&14680064,r.childLanes=t.childLanes,r.lanes=t.lanes,r.child=t.child,r.memoizedProps=t.memoizedProps,r.memoizedState=t.memoizedState,r.updateQueue=t.updateQueue,e=t.dependencies,r.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},r.sibling=t.sibling,r.index=t.index,r.ref=t.ref,r}function m3(t,e,r,i,o,c){var u=2;if(i=t,typeof t=="function")w8(t)&&(u=1);else if(typeof t=="string")u=5;else t:switch(t){case mr:return Le(r.children,o,c,e);case O9:u=8,o|=8;break;case G5:return t=xt(12,r,e,o|2),t.elementType=G5,t.lanes=c,t;case K5:return t=xt(13,r,e,o),t.elementType=K5,t.lanes=c,t;case X5:return t=xt(19,r,e,o),t.elementType=X5,t.lanes=c,t;case is:return Q3(r,o,c,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case as:u=10;break t;case ns:u=9;break t;case D9:u=11;break t;case U9:u=14;break t;case P2:u=16,i=null;break t}throw Error(W(130,t==null?t:typeof t,""))}return e=xt(u,r,e,o),e.elementType=t,e.type=i,e.lanes=c,e}function Le(t,e,r,i){return t=xt(7,t,i,e),t.lanes=r,t}function Q3(t,e,r,i){return t=xt(22,t,i,e),t.elementType=is,t.lanes=r,t.stateNode={isHidden:!1},t}function W5(t,e,r){return t=xt(6,t,null,e),t.lanes=r,t}function $5(t,e,r){return e=xt(4,t.children!==null?t.children:[],t.key,e),e.lanes=r,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function SS(t,e,r,i,o){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=V5(0),this.expirationTimes=V5(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=V5(0),this.identifierPrefix=i,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function y8(t,e,r,i,o,c,u,h,d){return t=new SS(t,e,r,h,d),e===1?(e=1,c===!0&&(e|=8)):e=0,c=xt(3,null,null,e),t.current=c,c.stateNode=t,c.memoizedState={element:i,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},o8(c),t}function CS(t,e,r){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gr,key:i==null?null:""+i,children:t,containerInfo:e,implementation:r}}function Zh(t){if(!t)return J2;t=t._reactInternals;t:{if(ke(t)!==t||t.tag!==1)throw Error(W(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break t;case 1:if(T0(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break t}}e=e.return}while(e!==null);throw Error(W(171))}if(t.tag===1){var r=t.type;if(T0(r))return Ys(t,r,e)}return e}function Qh(t,e,r,i,o,c,u,h,d){return t=y8(r,i,!0,t,o,c,u,h,d),t.context=Zh(null),r=t.current,i=H0(),o=Y2(r),c=g2(i,o),c.callback=e??null,X2(r,c,o),t.current.lanes=o,za(t,o,i),k0(t,i),t}function J3(t,e,r,i){var o=e.current,c=H0(),u=Y2(o);return r=Zh(r),e.context===null?e.context=r:e.pendingContext=r,e=g2(c,u),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=X2(o,e,u),t!==null&&(Nt(t,o,u,c),h3(t,o,u)),u}function D3(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ju(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var r=t.retryLane;t.retryLane=r!==0&&r<e?r:e}}function H8(t,e){Ju(t,e),(t=t.alternate)&&Ju(t,e)}function VS(){return null}var Jh=typeof reportError=="function"?reportError:function(t){console.error(t)};function S8(t){this._internalRoot=t}ti.prototype.render=S8.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(W(409));J3(t,e,null,null)};ti.prototype.unmount=S8.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ee(function(){J3(null,t,null,null)}),e[x2]=null}};function ti(t){this._internalRoot=t}ti.prototype.unstable_scheduleHydration=function(t){if(t){var e=As();t={blockedOn:null,target:t,priority:e};for(var r=0;r<O2.length&&e!==0&&e<O2[r].priority;r++);O2.splice(r,0,t),r===0&&_s(t)}};function C8(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ei(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function ts(){}function LS(t,e,r,i,o){if(o){if(typeof i=="function"){var c=i;i=function(){var p=D3(u);c.call(p)}}var u=Qh(e,i,t,0,null,!1,!1,"",ts);return t._reactRootContainer=u,t[x2]=u.current,sa(t.nodeType===8?t.parentNode:t),Ee(),u}for(;o=t.lastChild;)t.removeChild(o);if(typeof i=="function"){var h=i;i=function(){var p=D3(d);h.call(p)}}var d=y8(t,0,!1,null,null,!1,!1,"",ts);return t._reactRootContainer=d,t[x2]=d.current,sa(t.nodeType===8?t.parentNode:t),Ee(function(){J3(e,d,r,i)}),d}function ri(t,e,r,i,o){var c=r._reactRootContainer;if(c){var u=c;if(typeof o=="function"){var h=o;o=function(){var d=D3(u);h.call(d)}}J3(e,u,t,o)}else u=LS(r,e,t,o,i);return D3(u)}Vs=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var r=j4(e.pendingLanes);r!==0&&(j9(e,r|1),k0(e,W1()),!(v1&6)&&(Or=W1()+500,re()))}break;case 13:Ee(function(){var i=z2(t,1);if(i!==null){var o=H0();Nt(i,t,1,o)}}),H8(t,1)}};G9=function(t){if(t.tag===13){var e=z2(t,134217728);if(e!==null){var r=H0();Nt(e,t,134217728,r)}H8(t,134217728)}};Ls=function(t){if(t.tag===13){var e=Y2(t),r=z2(t,e);if(r!==null){var i=H0();Nt(r,t,e,i)}H8(t,e)}};As=function(){return z1};bs=function(t,e){var r=z1;try{return z1=t,e()}finally{z1=r}};n9=function(t,e,r){switch(e){case"input":if(Z5(t,r),e=r.name,r.type==="radio"&&e!=null){for(r=t;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<r.length;e++){var i=r[e];if(i!==t&&i.form===t.form){var o=G3(i);if(!o)throw Error(W(90));ls(i),Z5(i,o)}}}break;case"textarea":us(t,r);break;case"select":e=r.value,e!=null&&Lr(t,!!r.multiple,e,!1)}};gs=z8;ms=Ee;var AS={usingClientEntryPoint:!1,Events:[Ma,Mr,G3,ps,fs,z8]},D4={findFiberByHostInstance:He,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},bS={bundleType:D4.bundleType,version:D4.version,rendererPackageName:D4.rendererPackageName,rendererConfig:D4.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:M2.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Bs(t),t===null?null:t.stateNode},findFiberByHostInstance:D4.findFiberByHostInstance||VS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(U4=__REACT_DEVTOOLS_GLOBAL_HOOK__,!U4.isDisabled&&U4.supportsFiber))try{U3=U4.inject(bS),Yt=U4}catch{}var U4;Q0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=AS;Q0.createPortal=function(t,e){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!C8(e))throw Error(W(200));return CS(t,e,null,r)};Q0.createRoot=function(t,e){if(!C8(t))throw Error(W(299));var r=!1,i="",o=Jh;return e!=null&&(e.unstable_strictMode===!0&&(r=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=y8(t,1,!1,null,null,r,!1,i,o),t[x2]=e.current,sa(t.nodeType===8?t.parentNode:t),new S8(e)};Q0.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(W(188)):(t=Object.keys(t).join(","),Error(W(268,t)));return t=Bs(e),t=t===null?null:t.stateNode,t};Q0.flushSync=function(t){return Ee(t)};Q0.hydrate=function(t,e,r){if(!ei(e))throw Error(W(200));return ri(null,t,e,!0,r)};Q0.hydrateRoot=function(t,e,r){if(!C8(t))throw Error(W(405));var i=r!=null&&r.hydratedSources||null,o=!1,c="",u=Jh;if(r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(u=r.onRecoverableError)),e=Qh(e,null,t,1,r??null,o,!1,c,u),t[x2]=e.current,sa(t),i)for(t=0;t<i.length;t++)r=i[t],o=r._getVersion,o=o(r._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[r,o]:e.mutableSourceEagerHydrationData.push(r,o);return new ti(e)};Q0.render=function(t,e,r){if(!ei(e))throw Error(W(200));return ri(null,t,e,!1,r)};Q0.unmountComponentAtNode=function(t){if(!ei(t))throw Error(W(40));return t._reactRootContainer?(Ee(function(){ri(null,null,t,!1,function(){t._reactRootContainer=null,t[x2]=null})}),!0):!1};Q0.unstable_batchedUpdates=z8;Q0.unstable_renderSubtreeIntoContainer=function(t,e,r,i){if(!ei(r))throw Error(W(200));if(t==null||t._reactInternals===void 0)throw Error(W(38));return ri(t,e,r,!1,i)};Q0.version="18.2.0-next-9e3b772b8-20220608"});var V8=G0((SA,rd)=>{"use strict";function ed(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ed)}catch(t){console.error(t)}}ed(),rd.exports=td()});var nd=G0(L8=>{"use strict";var ad=V8();L8.createRoot=ad.createRoot,L8.hydrateRoot=ad.hydrateRoot;var CA});var yd=G0((mb,wd)=>{var uC="Expected a function",Bd=NaN,sC="[object Symbol]",hC=/^\s+|\s+$/g,dC=/^[-+]0x[0-9a-f]+$/i,vC=/^0b[01]+$/i,pC=/^0o[0-7]+$/i,fC=parseInt,gC=typeof global=="object"&&global&&global.Object===Object&&global,mC=typeof self=="object"&&self&&self.Object===Object&&self,xC=gC||mC||Function("return this")(),zC=Object.prototype,BC=zC.toString,MC=Math.max,wC=Math.min,O8=function(){return xC.Date.now()};function yC(t,e,r){var i,o,c,u,h,d,p=0,H=!1,w=!1,C=!0;if(typeof t!="function")throw new TypeError(uC);e=Md(e)||0,D8(r)&&(H=!!r.leading,w="maxWait"in r,c=w?MC(Md(r.maxWait)||0,e):c,C="trailing"in r?!!r.trailing:C);function A(T){var P=i,U=o;return i=o=void 0,p=T,u=t.apply(U,P),u}function E(T){return p=T,h=setTimeout(g,e),H?A(T):u}function M(T){var P=T-d,U=T-p,Y=e-P;return w?wC(Y,c-U):Y}function S(T){var P=T-d,U=T-p;return d===void 0||P>=e||P<0||w&&U>=c}function g(){var T=O8();if(S(T))return m(T);h=setTimeout(g,M(T))}function m(T){return h=void 0,C&&i?A(T):(i=o=void 0,u)}function z(){h!==void 0&&clearTimeout(h),p=0,i=d=o=h=void 0}function b(){return h===void 0?u:m(O8())}function I(){var T=O8(),P=S(T);if(i=arguments,o=this,d=T,P){if(h===void 0)return E(d);if(w)return h=setTimeout(g,e),A(d)}return h===void 0&&(h=setTimeout(g,e)),u}return I.cancel=z,I.flush=b,I}function D8(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function HC(t){return!!t&&typeof t=="object"}function SC(t){return typeof t=="symbol"||HC(t)&&BC.call(t)==sC}function Md(t){if(typeof t=="number")return t;if(SC(t))return Bd;if(D8(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=D8(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=t.replace(hC,"");var r=vC.test(t);return r||pC.test(t)?fC(t.slice(2),r?2:8):dC.test(t)?Bd:+t}wd.exports=yC});var Q=G0((Lb,ui)=>{(function(){"use strict";var t={}.hasOwnProperty,e="[native code]";function r(){for(var i=[],o=0;o<arguments.length;o++){var c=arguments[o];if(c){var u=typeof c;if(u==="string"||u==="number")i.push(c);else if(Array.isArray(c)){if(c.length){var h=r.apply(null,c);h&&i.push(h)}}else if(u==="object"){if(c.toString!==Object.prototype.toString&&!c.toString.toString().includes("[native code]")){i.push(c.toString());continue}for(var d in c)t.call(c,d)&&c[d]&&i.push(d)}}}return i.join(" ")}typeof ui<"u"&&ui.exports?(r.default=r,ui.exports=r):typeof define=="function"&&typeof define.amd=="object"&&define.amd?define("classnames",[],function(){return r}):window.classNames=r})()});var _d=G0(si=>{"use strict";var LC=X(),AC=Symbol.for("react.element"),bC=Symbol.for("react.fragment"),_C=Object.prototype.hasOwnProperty,RC=LC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,EC={key:!0,ref:!0,__self:!0,__source:!0};function bd(t,e,r){var i,o={},c=null,u=null;r!==void 0&&(c=""+r),e.key!==void 0&&(c=""+e.key),e.ref!==void 0&&(u=e.ref);for(i in e)_C.call(e,i)&&!EC.hasOwnProperty(i)&&(o[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)o[i]===void 0&&(o[i]=e[i]);return{$$typeof:AC,type:t,key:c,ref:u,props:o,_owner:RC.current}}si.Fragment=bC;si.jsx=bd;si.jsxs=bd});var R=G0((bb,Rd)=>{"use strict";Rd.exports=_d()});var jp=G0((MN,Pi)=>{var zL=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var q=function(t){var e=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,i={},o={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function M(S){return S instanceof c?new c(S.type,M(S.content),S.alias):Array.isArray(S)?S.map(M):S.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(M){return Object.prototype.toString.call(M).slice(8,-1)},objId:function(M){return M.__id||Object.defineProperty(M,"__id",{value:++r}),M.__id},clone:function M(S,g){g=g||{};var m,z;switch(o.util.type(S)){case"Object":if(z=o.util.objId(S),g[z])return g[z];m={},g[z]=m;for(var b in S)S.hasOwnProperty(b)&&(m[b]=M(S[b],g));return m;case"Array":return z=o.util.objId(S),g[z]?g[z]:(m=[],g[z]=m,S.forEach(function(I,T){m[T]=M(I,g)}),m);default:return S}},getLanguage:function(M){for(;M;){var S=e.exec(M.className);if(S)return S[1].toLowerCase();M=M.parentElement}return"none"},setLanguage:function(M,S){M.className=M.className.replace(RegExp(e,"gi"),""),M.classList.add("language-"+S)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(m){var M=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(m.stack)||[])[1];if(M){var S=document.getElementsByTagName("script");for(var g in S)if(S[g].src==M)return S[g]}return null}},isActive:function(M,S,g){for(var m="no-"+S;M;){var z=M.classList;if(z.contains(S))return!0;if(z.contains(m))return!1;M=M.parentElement}return!!g}},languages:{plain:i,plaintext:i,text:i,txt:i,extend:function(M,S){var g=o.util.clone(o.languages[M]);for(var m in S)g[m]=S[m];return g},insertBefore:function(M,S,g,m){m=m||o.languages;var z=m[M],b={};for(var I in z)if(z.hasOwnProperty(I)){if(I==S)for(var T in g)g.hasOwnProperty(T)&&(b[T]=g[T]);g.hasOwnProperty(I)||(b[I]=z[I])}var P=m[M];return m[M]=b,o.languages.DFS(o.languages,function(U,Y){Y===P&&U!=M&&(this[U]=b)}),b},DFS:function M(S,g,m,z){z=z||{};var b=o.util.objId;for(var I in S)if(S.hasOwnProperty(I)){g.call(S,I,S[I],m||I);var T=S[I],P=o.util.type(T);P==="Object"&&!z[b(T)]?(z[b(T)]=!0,M(T,g,null,z)):P==="Array"&&!z[b(T)]&&(z[b(T)]=!0,M(T,g,I,z))}}},plugins:{},highlightAll:function(M,S){o.highlightAllUnder(document,M,S)},highlightAllUnder:function(M,S,g){var m={callback:g,container:M,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",m),m.elements=Array.prototype.slice.apply(m.container.querySelectorAll(m.selector)),o.hooks.run("before-all-elements-highlight",m);for(var z=0,b;b=m.elements[z++];)o.highlightElement(b,S===!0,m.callback)},highlightElement:function(M,S,g){var m=o.util.getLanguage(M),z=o.languages[m];o.util.setLanguage(M,m);var b=M.parentElement;b&&b.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(b,m);var I=M.textContent,T={element:M,language:m,grammar:z,code:I};function P(Y){T.highlightedCode=Y,o.hooks.run("before-insert",T),T.element.innerHTML=T.highlightedCode,o.hooks.run("after-highlight",T),o.hooks.run("complete",T),g&&g.call(T.element)}if(o.hooks.run("before-sanity-check",T),b=T.element.parentElement,b&&b.nodeName.toLowerCase()==="pre"&&!b.hasAttribute("tabindex")&&b.setAttribute("tabindex","0"),!T.code){o.hooks.run("complete",T),g&&g.call(T.element);return}if(o.hooks.run("before-highlight",T),!T.grammar){P(o.util.encode(T.code));return}if(S&&t.Worker){var U=new Worker(o.filename);U.onmessage=function(Y){P(Y.data)},U.postMessage(JSON.stringify({language:T.language,code:T.code,immediateClose:!0}))}else P(o.highlight(T.code,T.grammar,T.language))},highlight:function(M,S,g){var m={code:M,grammar:S,language:g};if(o.hooks.run("before-tokenize",m),!m.grammar)throw new Error('The language "'+m.language+'" has no grammar.');return m.tokens=o.tokenize(m.code,m.grammar),o.hooks.run("after-tokenize",m),c.stringify(o.util.encode(m.tokens),m.language)},tokenize:function(M,S){var g=S.rest;if(g){for(var m in g)S[m]=g[m];delete S.rest}var z=new d;return p(z,z.head,M),h(M,z,S,z.head,0),w(z)},hooks:{all:{},add:function(M,S){var g=o.hooks.all;g[M]=g[M]||[],g[M].push(S)},run:function(M,S){var g=o.hooks.all[M];if(!(!g||!g.length))for(var m=0,z;z=g[m++];)z(S)}},Token:c};t.Prism=o;function c(M,S,g,m){this.type=M,this.content=S,this.alias=g,this.length=(m||"").length|0}c.stringify=function M(S,g){if(typeof S=="string")return S;if(Array.isArray(S)){var m="";return S.forEach(function(P){m+=M(P,g)}),m}var z={type:S.type,content:M(S.content,g),tag:"span",classes:["token",S.type],attributes:{},language:g},b=S.alias;b&&(Array.isArray(b)?Array.prototype.push.apply(z.classes,b):z.classes.push(b)),o.hooks.run("wrap",z);var I="";for(var T in z.attributes)I+=" "+T+'="'+(z.attributes[T]||"").replace(/"/g,"&quot;")+'"';return"<"+z.tag+' class="'+z.classes.join(" ")+'"'+I+">"+z.content+"</"+z.tag+">"};function u(M,S,g,m){M.lastIndex=S;var z=M.exec(g);if(z&&m&&z[1]){var b=z[1].length;z.index+=b,z[0]=z[0].slice(b)}return z}function h(M,S,g,m,z,b){for(var I in g)if(!(!g.hasOwnProperty(I)||!g[I])){var T=g[I];T=Array.isArray(T)?T:[T];for(var P=0;P<T.length;++P){if(b&&b.cause==I+","+P)return;var U=T[P],Y=U.inside,r1=!!U.lookbehind,G1=!!U.greedy,P0=U.alias;if(G1&&!U.pattern.global){var he=U.pattern.toString().match(/[imsuy]*$/)[0];U.pattern=RegExp(U.pattern.source,he+"g")}for(var Ot=U.pattern||U,g1=m.next,O1=z;g1!==S.tail&&!(b&&O1>=b.reach);O1+=g1.value.length,g1=g1.next){var Dt=g1.value;if(S.length>M.length)return;if(!(Dt instanceof c)){var wt=1,b1;if(G1){if(b1=u(Ot,O1,M,r1),!b1||b1.index>=M.length)break;var F0=b1.index,u4=b1.index+b1[0].length,nt=O1;for(nt+=g1.value.length;F0>=nt;)g1=g1.next,nt+=g1.value.length;if(nt-=g1.value.length,O1=nt,g1.value instanceof c)continue;for(var e2=g1;e2!==S.tail&&(nt<u4||typeof e2.value=="string");e2=e2.next)wt++,nt+=e2.value.length;wt--,Dt=M.slice(O1,nt),b1.index-=O1}else if(b1=u(Ot,0,Dt,r1),!b1)continue;var F0=b1.index,yt=b1[0],S2=Dt.slice(0,F0),Ut=Dt.slice(F0+yt.length),Ht=O1+Dt.length;b&&Ht>b.reach&&(b.reach=Ht);var C0=g1.prev;S2&&(C0=p(S,C0,S2),O1+=S2.length),H(S,C0,wt);var it=new c(I,Y?o.tokenize(yt,Y):yt,P0,yt);if(g1=p(S,C0,it),Ut&&p(S,g1,Ut),wt>1){var ot={cause:I+","+P,reach:Ht};h(M,S,g,g1.prev,O1,ot),b&&ot.reach>b.reach&&(b.reach=ot.reach)}}}}}}function d(){var M={value:null,prev:null,next:null},S={value:null,prev:M,next:null};M.next=S,this.head=M,this.tail=S,this.length=0}function p(M,S,g){var m=S.next,z={value:g,prev:S,next:m};return S.next=z,m.prev=z,M.length++,z}function H(M,S,g){for(var m=S.next,z=0;z<g&&m!==M.tail;z++)m=m.next;S.next=m,m.prev=S,M.length-=z}function w(M){for(var S=[],g=M.head.next;g!==M.tail;)S.push(g.value),g=g.next;return S}if(!t.document)return t.addEventListener&&(o.disableWorkerMessageHandler||t.addEventListener("message",function(M){var S=JSON.parse(M.data),g=S.language,m=S.code,z=S.immediateClose;t.postMessage(o.highlight(m,o.languages[g],g)),z&&t.close()},!1)),o;var C=o.util.currentScript();C&&(o.filename=C.src,C.hasAttribute("data-manual")&&(o.manual=!0));function A(){o.manual||o.highlightAll()}if(!o.manual){var E=document.readyState;E==="loading"||E==="interactive"&&C&&C.defer?document.addEventListener("DOMContentLoaded",A):window.requestAnimationFrame?window.requestAnimationFrame(A):window.setTimeout(A,16)}return o}(zL);typeof Pi<"u"&&Pi.exports&&(Pi.exports=q);typeof global<"u"&&(global.Prism=q);q.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};q.languages.markup.tag.inside["attr-value"].inside.entity=q.languages.markup.entity;q.languages.markup.doctype.inside["internal-subset"].inside=q.languages.markup;q.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(q.languages.markup.tag,"addInlined",{value:function(e,r){var i={};i["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:q.languages[r]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};o["language-"+r]={pattern:/[\s\S]+/,inside:q.languages[r]};var c={};c[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:o},q.languages.insertBefore("markup","cdata",c)}});Object.defineProperty(q.languages.markup.tag,"addAttribute",{value:function(t,e){q.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:q.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});q.languages.html=q.languages.markup;q.languages.mathml=q.languages.markup;q.languages.svg=q.languages.markup;q.languages.xml=q.languages.extend("markup",{});q.languages.ssml=q.languages.xml;q.languages.atom=q.languages.xml;q.languages.rss=q.languages.xml;(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var r=t.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))})(q);q.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};q.languages.javascript=q.languages.extend("clike",{"class-name":[q.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});q.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;q.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:q.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:q.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:q.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:q.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:q.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});q.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:q.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});q.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});q.languages.markup&&(q.languages.markup.tag.addInlined("script","javascript"),q.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));q.languages.js=q.languages.javascript;(function(){if(typeof q>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t="Loading\u2026",e=function(C,A){return"\u2716 Error "+C+" while fetching file: "+A},r="\u2716 Error: File does not exist or is empty",i={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",c="loading",u="loaded",h="failed",d="pre[data-src]:not(["+o+'="'+u+'"]):not(['+o+'="'+c+'"])';function p(C,A,E){var M=new XMLHttpRequest;M.open("GET",C,!0),M.onreadystatechange=function(){M.readyState==4&&(M.status<400&&M.responseText?A(M.responseText):M.status>=400?E(e(M.status,M.statusText)):E(r))},M.send(null)}function H(C){var A=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(C||"");if(A){var E=Number(A[1]),M=A[2],S=A[3];return M?S?[E,Number(S)]:[E,void 0]:[E,E]}}q.hooks.add("before-highlightall",function(C){C.selector+=", "+d}),q.hooks.add("before-sanity-check",function(C){var A=C.element;if(A.matches(d)){C.code="",A.setAttribute(o,c);var E=A.appendChild(document.createElement("CODE"));E.textContent=t;var M=A.getAttribute("data-src"),S=C.language;if(S==="none"){var g=(/\.(\w+)$/.exec(M)||[,"none"])[1];S=i[g]||g}q.util.setLanguage(E,S),q.util.setLanguage(A,S);var m=q.plugins.autoloader;m&&m.loadLanguages(S),p(M,function(z){A.setAttribute(o,u);var b=H(A.getAttribute("data-range"));if(b){var I=z.split(/\r\n?|\n/g),T=b[0],P=b[1]==null?I.length:b[1];T<0&&(T+=I.length),T=Math.max(0,Math.min(T-1,I.length)),P<0&&(P+=I.length),P=Math.max(0,Math.min(P,I.length)),z=I.slice(T,P).join(`
`),A.hasAttribute("data-start")||A.setAttribute("data-start",String(T+1))}E.textContent=z,q.highlightElement(E)},function(z){A.setAttribute(o,h),E.textContent=z})}}),q.plugins.fileHighlight={highlight:function(A){for(var E=(A||document).querySelectorAll(d),M=0,S;S=E[M++];)q.highlightElement(S)}};var w=!1;q.fileHighlight=function(){w||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),w=!0),q.plugins.fileHighlight.highlight.apply(this,arguments)}})()});var uf=G0((o4,Wa)=>{(function(){var t,e="4.17.21",r=200,i="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",o="Expected a function",c="Invalid `variable` option passed into `_.template`",u="__lodash_hash_undefined__",h=500,d="__lodash_placeholder__",p=1,H=2,w=4,C=1,A=2,E=1,M=2,S=4,g=8,m=16,z=32,b=64,I=128,T=256,P=512,U=30,Y="...",r1=800,G1=16,P0=1,he=2,Ot=3,g1=1/0,O1=9007199254740991,Dt=17976931348623157e292,wt=0/0,b1=4294967295,u4=b1-1,nt=b1>>>1,e2=[["ary",I],["bind",E],["bindKey",M],["curry",g],["curryRight",m],["flip",P],["partial",z],["partialRight",b],["rearg",T]],F0="[object Arguments]",yt="[object Array]",S2="[object AsyncFunction]",Ut="[object Boolean]",Ht="[object Date]",C0="[object DOMException]",it="[object Error]",ot="[object Function]",s4="[object GeneratorFunction]",St="[object Map]",h4="[object Number]",Cf="[object Null]",r2="[object Object]",X7="[object Promise]",Vf="[object Proxy]",d4="[object RegExp]",Ct="[object Set]",v4="[object String]",ja="[object Symbol]",Lf="[object Undefined]",p4="[object WeakMap]",Af="[object WeakSet]",f4="[object ArrayBuffer]",Je="[object DataView]",Di="[object Float32Array]",Ui="[object Float64Array]",Wi="[object Int8Array]",$i="[object Int16Array]",ji="[object Int32Array]",Gi="[object Uint8Array]",Ki="[object Uint8ClampedArray]",Xi="[object Uint16Array]",qi="[object Uint32Array]",bf=/\b__p \+= '';/g,_f=/\b(__p \+=) '' \+/g,Rf=/(__e\(.*?\)|\b__t\)) \+\n'';/g,q7=/&(?:amp|lt|gt|quot|#39);/g,Y7=/[&<>"']/g,Ef=RegExp(q7.source),Tf=RegExp(Y7.source),kf=/<%-([\s\S]+?)%>/g,If=/<%([\s\S]+?)%>/g,Z7=/<%=([\s\S]+?)%>/g,Nf=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Pf=/^\w*$/,Ff=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Yi=/[\\^$.*+?()[\]{}|]/g,Of=RegExp(Yi.source),Zi=/^\s+/,Df=/\s/,Uf=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Wf=/\{\n\/\* \[wrapped with (.+)\] \*/,$f=/,? & /,jf=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Gf=/[()=,{}\[\]\/\s]/,Kf=/\\(\\)?/g,Xf=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,Q7=/\w*$/,qf=/^[-+]0x[0-9a-f]+$/i,Yf=/^0b[01]+$/i,Zf=/^\[object .+?Constructor\]$/,Qf=/^0o[0-7]+$/i,Jf=/^(?:0|[1-9]\d*)$/,tg=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Ga=/($^)/,eg=/['\n\r\u2028\u2029\\]/g,Ka="\\ud800-\\udfff",rg="\\u0300-\\u036f",ag="\\ufe20-\\ufe2f",ng="\\u20d0-\\u20ff",J7=rg+ag+ng,t6="\\u2700-\\u27bf",e6="a-z\\xdf-\\xf6\\xf8-\\xff",ig="\\xac\\xb1\\xd7\\xf7",og="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",lg="\\u2000-\\u206f",cg=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",r6="A-Z\\xc0-\\xd6\\xd8-\\xde",a6="\\ufe0e\\ufe0f",n6=ig+og+lg+cg,Qi="['\u2019]",ug="["+Ka+"]",i6="["+n6+"]",Xa="["+J7+"]",o6="\\d+",sg="["+t6+"]",l6="["+e6+"]",c6="[^"+Ka+n6+o6+t6+e6+r6+"]",Ji="\\ud83c[\\udffb-\\udfff]",hg="(?:"+Xa+"|"+Ji+")",u6="[^"+Ka+"]",to="(?:\\ud83c[\\udde6-\\uddff]){2}",eo="[\\ud800-\\udbff][\\udc00-\\udfff]",tr="["+r6+"]",s6="\\u200d",h6="(?:"+l6+"|"+c6+")",dg="(?:"+tr+"|"+c6+")",d6="(?:"+Qi+"(?:d|ll|m|re|s|t|ve))?",v6="(?:"+Qi+"(?:D|LL|M|RE|S|T|VE))?",p6=hg+"?",f6="["+a6+"]?",vg="(?:"+s6+"(?:"+[u6,to,eo].join("|")+")"+f6+p6+")*",pg="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",fg="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",g6=f6+p6+vg,gg="(?:"+[sg,to,eo].join("|")+")"+g6,mg="(?:"+[u6+Xa+"?",Xa,to,eo,ug].join("|")+")",xg=RegExp(Qi,"g"),zg=RegExp(Xa,"g"),ro=RegExp(Ji+"(?="+Ji+")|"+mg+g6,"g"),Bg=RegExp([tr+"?"+l6+"+"+d6+"(?="+[i6,tr,"$"].join("|")+")",dg+"+"+v6+"(?="+[i6,tr+h6,"$"].join("|")+")",tr+"?"+h6+"+"+d6,tr+"+"+v6,fg,pg,o6,gg].join("|"),"g"),Mg=RegExp("["+s6+Ka+J7+a6+"]"),wg=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,yg=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Hg=-1,S1={};S1[Di]=S1[Ui]=S1[Wi]=S1[$i]=S1[ji]=S1[Gi]=S1[Ki]=S1[Xi]=S1[qi]=!0,S1[F0]=S1[yt]=S1[f4]=S1[Ut]=S1[Je]=S1[Ht]=S1[it]=S1[ot]=S1[St]=S1[h4]=S1[r2]=S1[d4]=S1[Ct]=S1[v4]=S1[p4]=!1;var w1={};w1[F0]=w1[yt]=w1[f4]=w1[Je]=w1[Ut]=w1[Ht]=w1[Di]=w1[Ui]=w1[Wi]=w1[$i]=w1[ji]=w1[St]=w1[h4]=w1[r2]=w1[d4]=w1[Ct]=w1[v4]=w1[ja]=w1[Gi]=w1[Ki]=w1[Xi]=w1[qi]=!0,w1[it]=w1[ot]=w1[p4]=!1;var Sg={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},Cg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vg={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Lg={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Ag=parseFloat,bg=parseInt,m6=typeof global=="object"&&global&&global.Object===Object&&global,_g=typeof self=="object"&&self&&self.Object===Object&&self,t0=m6||_g||Function("return this")(),ao=typeof o4=="object"&&o4&&!o4.nodeType&&o4,de=ao&&typeof Wa=="object"&&Wa&&!Wa.nodeType&&Wa,x6=de&&de.exports===ao,no=x6&&m6.process,lt=function(){try{var L=de&&de.require&&de.require("util").types;return L||no&&no.binding&&no.binding("util")}catch{}}(),z6=lt&&lt.isArrayBuffer,B6=lt&&lt.isDate,M6=lt&&lt.isMap,w6=lt&&lt.isRegExp,y6=lt&&lt.isSet,H6=lt&&lt.isTypedArray;function O0(L,N,k){switch(k.length){case 0:return L.call(N);case 1:return L.call(N,k[0]);case 2:return L.call(N,k[0],k[1]);case 3:return L.call(N,k[0],k[1],k[2])}return L.apply(N,k)}function Rg(L,N,k,j){for(var e1=-1,p1=L==null?0:L.length;++e1<p1;){var K1=L[e1];N(j,K1,k(K1),L)}return j}function ct(L,N){for(var k=-1,j=L==null?0:L.length;++k<j&&N(L[k],k,L)!==!1;);return L}function Eg(L,N){for(var k=L==null?0:L.length;k--&&N(L[k],k,L)!==!1;);return L}function S6(L,N){for(var k=-1,j=L==null?0:L.length;++k<j;)if(!N(L[k],k,L))return!1;return!0}function C2(L,N){for(var k=-1,j=L==null?0:L.length,e1=0,p1=[];++k<j;){var K1=L[k];N(K1,k,L)&&(p1[e1++]=K1)}return p1}function qa(L,N){var k=L==null?0:L.length;return!!k&&er(L,N,0)>-1}function io(L,N,k){for(var j=-1,e1=L==null?0:L.length;++j<e1;)if(k(N,L[j]))return!0;return!1}function _1(L,N){for(var k=-1,j=L==null?0:L.length,e1=Array(j);++k<j;)e1[k]=N(L[k],k,L);return e1}function V2(L,N){for(var k=-1,j=N.length,e1=L.length;++k<j;)L[e1+k]=N[k];return L}function oo(L,N,k,j){var e1=-1,p1=L==null?0:L.length;for(j&&p1&&(k=L[++e1]);++e1<p1;)k=N(k,L[e1],e1,L);return k}function Tg(L,N,k,j){var e1=L==null?0:L.length;for(j&&e1&&(k=L[--e1]);e1--;)k=N(k,L[e1],e1,L);return k}function lo(L,N){for(var k=-1,j=L==null?0:L.length;++k<j;)if(N(L[k],k,L))return!0;return!1}var kg=co("length");function Ig(L){return L.split("")}function Ng(L){return L.match(jf)||[]}function C6(L,N,k){var j;return k(L,function(e1,p1,K1){if(N(e1,p1,K1))return j=p1,!1}),j}function Ya(L,N,k,j){for(var e1=L.length,p1=k+(j?1:-1);j?p1--:++p1<e1;)if(N(L[p1],p1,L))return p1;return-1}function er(L,N,k){return N===N?qg(L,N,k):Ya(L,V6,k)}function Pg(L,N,k,j){for(var e1=k-1,p1=L.length;++e1<p1;)if(j(L[e1],N))return e1;return-1}function V6(L){return L!==L}function L6(L,N){var k=L==null?0:L.length;return k?so(L,N)/k:wt}function co(L){return function(N){return N==null?t:N[L]}}function uo(L){return function(N){return L==null?t:L[N]}}function A6(L,N,k,j,e1){return e1(L,function(p1,K1,M1){k=j?(j=!1,p1):N(k,p1,K1,M1)}),k}function Fg(L,N){var k=L.length;for(L.sort(N);k--;)L[k]=L[k].value;return L}function so(L,N){for(var k,j=-1,e1=L.length;++j<e1;){var p1=N(L[j]);p1!==t&&(k=k===t?p1:k+p1)}return k}function ho(L,N){for(var k=-1,j=Array(L);++k<L;)j[k]=N(k);return j}function Og(L,N){return _1(N,function(k){return[k,L[k]]})}function b6(L){return L&&L.slice(0,T6(L)+1).replace(Zi,"")}function D0(L){return function(N){return L(N)}}function vo(L,N){return _1(N,function(k){return L[k]})}function g4(L,N){return L.has(N)}function _6(L,N){for(var k=-1,j=L.length;++k<j&&er(N,L[k],0)>-1;);return k}function R6(L,N){for(var k=L.length;k--&&er(N,L[k],0)>-1;);return k}function Dg(L,N){for(var k=L.length,j=0;k--;)L[k]===N&&++j;return j}var Ug=uo(Sg),Wg=uo(Cg);function $g(L){return"\\"+Lg[L]}function jg(L,N){return L==null?t:L[N]}function rr(L){return Mg.test(L)}function Gg(L){return wg.test(L)}function Kg(L){for(var N,k=[];!(N=L.next()).done;)k.push(N.value);return k}function po(L){var N=-1,k=Array(L.size);return L.forEach(function(j,e1){k[++N]=[e1,j]}),k}function E6(L,N){return function(k){return L(N(k))}}function L2(L,N){for(var k=-1,j=L.length,e1=0,p1=[];++k<j;){var K1=L[k];(K1===N||K1===d)&&(L[k]=d,p1[e1++]=k)}return p1}function Za(L){var N=-1,k=Array(L.size);return L.forEach(function(j){k[++N]=j}),k}function Xg(L){var N=-1,k=Array(L.size);return L.forEach(function(j){k[++N]=[j,j]}),k}function qg(L,N,k){for(var j=k-1,e1=L.length;++j<e1;)if(L[j]===N)return j;return-1}function Yg(L,N,k){for(var j=k+1;j--;)if(L[j]===N)return j;return j}function ar(L){return rr(L)?Qg(L):kg(L)}function Vt(L){return rr(L)?Jg(L):Ig(L)}function T6(L){for(var N=L.length;N--&&Df.test(L.charAt(N)););return N}var Zg=uo(Vg);function Qg(L){for(var N=ro.lastIndex=0;ro.test(L);)++N;return N}function Jg(L){return L.match(ro)||[]}function tm(L){return L.match(Bg)||[]}var em=function L(N){N=N==null?t0:A2.defaults(t0.Object(),N,A2.pick(t0,yg));var k=N.Array,j=N.Date,e1=N.Error,p1=N.Function,K1=N.Math,M1=N.Object,fo=N.RegExp,rm=N.String,ut=N.TypeError,Qa=k.prototype,am=p1.prototype,nr=M1.prototype,Ja=N["__core-js_shared__"],tn=am.toString,x1=nr.hasOwnProperty,nm=0,k6=function(){var a=/[^.]+$/.exec(Ja&&Ja.keys&&Ja.keys.IE_PROTO||"");return a?"Symbol(src)_1."+a:""}(),en=nr.toString,im=tn.call(M1),om=t0._,lm=fo("^"+tn.call(x1).replace(Yi,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rn=x6?N.Buffer:t,b2=N.Symbol,an=N.Uint8Array,I6=rn?rn.allocUnsafe:t,nn=E6(M1.getPrototypeOf,M1),N6=M1.create,P6=nr.propertyIsEnumerable,on=Qa.splice,F6=b2?b2.isConcatSpreadable:t,m4=b2?b2.iterator:t,ve=b2?b2.toStringTag:t,ln=function(){try{var a=xe(M1,"defineProperty");return a({},"",{}),a}catch{}}(),cm=N.clearTimeout!==t0.clearTimeout&&N.clearTimeout,um=j&&j.now!==t0.Date.now&&j.now,sm=N.setTimeout!==t0.setTimeout&&N.setTimeout,cn=K1.ceil,un=K1.floor,go=M1.getOwnPropertySymbols,hm=rn?rn.isBuffer:t,O6=N.isFinite,dm=Qa.join,vm=E6(M1.keys,M1),X1=K1.max,s0=K1.min,pm=j.now,fm=N.parseInt,D6=K1.random,gm=Qa.reverse,mo=xe(N,"DataView"),x4=xe(N,"Map"),xo=xe(N,"Promise"),ir=xe(N,"Set"),z4=xe(N,"WeakMap"),B4=xe(M1,"create"),sn=z4&&new z4,or={},mm=ze(mo),xm=ze(x4),zm=ze(xo),Bm=ze(ir),Mm=ze(z4),hn=b2?b2.prototype:t,M4=hn?hn.valueOf:t,U6=hn?hn.toString:t;function f(a){if(P1(a)&&!a1(a)&&!(a instanceof u1)){if(a instanceof st)return a;if(x1.call(a,"__wrapped__"))return Wl(a)}return new st(a)}var lr=function(){function a(){}return function(n){if(!T1(n))return{};if(N6)return N6(n);a.prototype=n;var l=new a;return a.prototype=t,l}}();function dn(){}function st(a,n){this.__wrapped__=a,this.__actions__=[],this.__chain__=!!n,this.__index__=0,this.__values__=t}f.templateSettings={escape:kf,evaluate:If,interpolate:Z7,variable:"",imports:{_:f}},f.prototype=dn.prototype,f.prototype.constructor=f,st.prototype=lr(dn.prototype),st.prototype.constructor=st;function u1(a){this.__wrapped__=a,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=b1,this.__views__=[]}function wm(){var a=new u1(this.__wrapped__);return a.__actions__=V0(this.__actions__),a.__dir__=this.__dir__,a.__filtered__=this.__filtered__,a.__iteratees__=V0(this.__iteratees__),a.__takeCount__=this.__takeCount__,a.__views__=V0(this.__views__),a}function ym(){if(this.__filtered__){var a=new u1(this);a.__dir__=-1,a.__filtered__=!0}else a=this.clone(),a.__dir__*=-1;return a}function Hm(){var a=this.__wrapped__.value(),n=this.__dir__,l=a1(a),s=n<0,v=l?a.length:0,x=Ix(0,v,this.__views__),y=x.start,V=x.end,_=V-y,F=s?V:y-1,O=this.__iteratees__,D=O.length,$=0,K=s0(_,this.__takeCount__);if(!l||!s&&v==_&&K==_)return dl(a,this.__actions__);var J=[];t:for(;_--&&$<K;){F+=n;for(var i1=-1,t1=a[F];++i1<D;){var c1=O[i1],h1=c1.iteratee,$0=c1.type,M0=h1(t1);if($0==he)t1=M0;else if(!M0){if($0==P0)continue t;break t}}J[$++]=t1}return J}u1.prototype=lr(dn.prototype),u1.prototype.constructor=u1;function pe(a){var n=-1,l=a==null?0:a.length;for(this.clear();++n<l;){var s=a[n];this.set(s[0],s[1])}}function Sm(){this.__data__=B4?B4(null):{},this.size=0}function Cm(a){var n=this.has(a)&&delete this.__data__[a];return this.size-=n?1:0,n}function Vm(a){var n=this.__data__;if(B4){var l=n[a];return l===u?t:l}return x1.call(n,a)?n[a]:t}function Lm(a){var n=this.__data__;return B4?n[a]!==t:x1.call(n,a)}function Am(a,n){var l=this.__data__;return this.size+=this.has(a)?0:1,l[a]=B4&&n===t?u:n,this}pe.prototype.clear=Sm,pe.prototype.delete=Cm,pe.prototype.get=Vm,pe.prototype.has=Lm,pe.prototype.set=Am;function a2(a){var n=-1,l=a==null?0:a.length;for(this.clear();++n<l;){var s=a[n];this.set(s[0],s[1])}}function bm(){this.__data__=[],this.size=0}function _m(a){var n=this.__data__,l=vn(n,a);if(l<0)return!1;var s=n.length-1;return l==s?n.pop():on.call(n,l,1),--this.size,!0}function Rm(a){var n=this.__data__,l=vn(n,a);return l<0?t:n[l][1]}function Em(a){return vn(this.__data__,a)>-1}function Tm(a,n){var l=this.__data__,s=vn(l,a);return s<0?(++this.size,l.push([a,n])):l[s][1]=n,this}a2.prototype.clear=bm,a2.prototype.delete=_m,a2.prototype.get=Rm,a2.prototype.has=Em,a2.prototype.set=Tm;function n2(a){var n=-1,l=a==null?0:a.length;for(this.clear();++n<l;){var s=a[n];this.set(s[0],s[1])}}function km(){this.size=0,this.__data__={hash:new pe,map:new(x4||a2),string:new pe}}function Im(a){var n=Sn(this,a).delete(a);return this.size-=n?1:0,n}function Nm(a){return Sn(this,a).get(a)}function Pm(a){return Sn(this,a).has(a)}function Fm(a,n){var l=Sn(this,a),s=l.size;return l.set(a,n),this.size+=l.size==s?0:1,this}n2.prototype.clear=km,n2.prototype.delete=Im,n2.prototype.get=Nm,n2.prototype.has=Pm,n2.prototype.set=Fm;function fe(a){var n=-1,l=a==null?0:a.length;for(this.__data__=new n2;++n<l;)this.add(a[n])}function Om(a){return this.__data__.set(a,u),this}function Dm(a){return this.__data__.has(a)}fe.prototype.add=fe.prototype.push=Om,fe.prototype.has=Dm;function Lt(a){var n=this.__data__=new a2(a);this.size=n.size}function Um(){this.__data__=new a2,this.size=0}function Wm(a){var n=this.__data__,l=n.delete(a);return this.size=n.size,l}function $m(a){return this.__data__.get(a)}function jm(a){return this.__data__.has(a)}function Gm(a,n){var l=this.__data__;if(l instanceof a2){var s=l.__data__;if(!x4||s.length<r-1)return s.push([a,n]),this.size=++l.size,this;l=this.__data__=new n2(s)}return l.set(a,n),this.size=l.size,this}Lt.prototype.clear=Um,Lt.prototype.delete=Wm,Lt.prototype.get=$m,Lt.prototype.has=jm,Lt.prototype.set=Gm;function W6(a,n){var l=a1(a),s=!l&&Be(a),v=!l&&!s&&k2(a),x=!l&&!s&&!v&&hr(a),y=l||s||v||x,V=y?ho(a.length,rm):[],_=V.length;for(var F in a)(n||x1.call(a,F))&&!(y&&(F=="length"||v&&(F=="offset"||F=="parent")||x&&(F=="buffer"||F=="byteLength"||F=="byteOffset")||c2(F,_)))&&V.push(F);return V}function $6(a){var n=a.length;return n?a[Ao(0,n-1)]:t}function Km(a,n){return Cn(V0(a),ge(n,0,a.length))}function Xm(a){return Cn(V0(a))}function zo(a,n,l){(l!==t&&!At(a[n],l)||l===t&&!(n in a))&&i2(a,n,l)}function w4(a,n,l){var s=a[n];(!(x1.call(a,n)&&At(s,l))||l===t&&!(n in a))&&i2(a,n,l)}function vn(a,n){for(var l=a.length;l--;)if(At(a[l][0],n))return l;return-1}function qm(a,n,l,s){return _2(a,function(v,x,y){n(s,v,l(v),y)}),s}function j6(a,n){return a&&$t(n,e0(n),a)}function Ym(a,n){return a&&$t(n,A0(n),a)}function i2(a,n,l){n=="__proto__"&&ln?ln(a,n,{configurable:!0,enumerable:!0,value:l,writable:!0}):a[n]=l}function Bo(a,n){for(var l=-1,s=n.length,v=k(s),x=a==null;++l<s;)v[l]=x?t:t5(a,n[l]);return v}function ge(a,n,l){return a===a&&(l!==t&&(a=a<=l?a:l),n!==t&&(a=a>=n?a:n)),a}function ht(a,n,l,s,v,x){var y,V=n&p,_=n&H,F=n&w;if(l&&(y=v?l(a,s,v,x):l(a)),y!==t)return y;if(!T1(a))return a;var O=a1(a);if(O){if(y=Px(a),!V)return V0(a,y)}else{var D=h0(a),$=D==ot||D==s4;if(k2(a))return fl(a,V);if(D==r2||D==F0||$&&!v){if(y=_||$?{}:Tl(a),!V)return _?Vx(a,Ym(y,a)):Cx(a,j6(y,a))}else{if(!w1[D])return v?a:{};y=Fx(a,D,V)}}x||(x=new Lt);var K=x.get(a);if(K)return K;x.set(a,y),uc(a)?a.forEach(function(t1){y.add(ht(t1,n,l,t1,a,x))}):lc(a)&&a.forEach(function(t1,c1){y.set(c1,ht(t1,n,l,c1,a,x))});var J=F?_?Oo:Fo:_?A0:e0,i1=O?t:J(a);return ct(i1||a,function(t1,c1){i1&&(c1=t1,t1=a[c1]),w4(y,c1,ht(t1,n,l,c1,a,x))}),y}function Zm(a){var n=e0(a);return function(l){return G6(l,a,n)}}function G6(a,n,l){var s=l.length;if(a==null)return!s;for(a=M1(a);s--;){var v=l[s],x=n[v],y=a[v];if(y===t&&!(v in a)||!x(y))return!1}return!0}function K6(a,n,l){if(typeof a!="function")throw new ut(o);return A4(function(){a.apply(t,l)},n)}function y4(a,n,l,s){var v=-1,x=qa,y=!0,V=a.length,_=[],F=n.length;if(!V)return _;l&&(n=_1(n,D0(l))),s?(x=io,y=!1):n.length>=r&&(x=g4,y=!1,n=new fe(n));t:for(;++v<V;){var O=a[v],D=l==null?O:l(O);if(O=s||O!==0?O:0,y&&D===D){for(var $=F;$--;)if(n[$]===D)continue t;_.push(O)}else x(n,D,s)||_.push(O)}return _}var _2=Bl(Wt),X6=Bl(wo,!0);function Qm(a,n){var l=!0;return _2(a,function(s,v,x){return l=!!n(s,v,x),l}),l}function pn(a,n,l){for(var s=-1,v=a.length;++s<v;){var x=a[s],y=n(x);if(y!=null&&(V===t?y===y&&!W0(y):l(y,V)))var V=y,_=x}return _}function Jm(a,n,l,s){var v=a.length;for(l=n1(l),l<0&&(l=-l>v?0:v+l),s=s===t||s>v?v:n1(s),s<0&&(s+=v),s=l>s?0:hc(s);l<s;)a[l++]=n;return a}function q6(a,n){var l=[];return _2(a,function(s,v,x){n(s,v,x)&&l.push(s)}),l}function n0(a,n,l,s,v){var x=-1,y=a.length;for(l||(l=Dx),v||(v=[]);++x<y;){var V=a[x];n>0&&l(V)?n>1?n0(V,n-1,l,s,v):V2(v,V):s||(v[v.length]=V)}return v}var Mo=Ml(),Y6=Ml(!0);function Wt(a,n){return a&&Mo(a,n,e0)}function wo(a,n){return a&&Y6(a,n,e0)}function fn(a,n){return C2(n,function(l){return u2(a[l])})}function me(a,n){n=E2(n,a);for(var l=0,s=n.length;a!=null&&l<s;)a=a[jt(n[l++])];return l&&l==s?a:t}function Z6(a,n,l){var s=n(a);return a1(a)?s:V2(s,l(a))}function z0(a){return a==null?a===t?Lf:Cf:ve&&ve in M1(a)?kx(a):Xx(a)}function yo(a,n){return a>n}function tx(a,n){return a!=null&&x1.call(a,n)}function ex(a,n){return a!=null&&n in M1(a)}function rx(a,n,l){return a>=s0(n,l)&&a<X1(n,l)}function Ho(a,n,l){for(var s=l?io:qa,v=a[0].length,x=a.length,y=x,V=k(x),_=1/0,F=[];y--;){var O=a[y];y&&n&&(O=_1(O,D0(n))),_=s0(O.length,_),V[y]=!l&&(n||v>=120&&O.length>=120)?new fe(y&&O):t}O=a[0];var D=-1,$=V[0];t:for(;++D<v&&F.length<_;){var K=O[D],J=n?n(K):K;if(K=l||K!==0?K:0,!($?g4($,J):s(F,J,l))){for(y=x;--y;){var i1=V[y];if(!(i1?g4(i1,J):s(a[y],J,l)))continue t}$&&$.push(J),F.push(K)}}return F}function ax(a,n,l,s){return Wt(a,function(v,x,y){n(s,l(v),x,y)}),s}function H4(a,n,l){n=E2(n,a),a=Pl(a,n);var s=a==null?a:a[jt(vt(n))];return s==null?t:O0(s,a,l)}function Q6(a){return P1(a)&&z0(a)==F0}function nx(a){return P1(a)&&z0(a)==f4}function ix(a){return P1(a)&&z0(a)==Ht}function S4(a,n,l,s,v){return a===n?!0:a==null||n==null||!P1(a)&&!P1(n)?a!==a&&n!==n:ox(a,n,l,s,S4,v)}function ox(a,n,l,s,v,x){var y=a1(a),V=a1(n),_=y?yt:h0(a),F=V?yt:h0(n);_=_==F0?r2:_,F=F==F0?r2:F;var O=_==r2,D=F==r2,$=_==F;if($&&k2(a)){if(!k2(n))return!1;y=!0,O=!1}if($&&!O)return x||(x=new Lt),y||hr(a)?_l(a,n,l,s,v,x):Ex(a,n,_,l,s,v,x);if(!(l&C)){var K=O&&x1.call(a,"__wrapped__"),J=D&&x1.call(n,"__wrapped__");if(K||J){var i1=K?a.value():a,t1=J?n.value():n;return x||(x=new Lt),v(i1,t1,l,s,x)}}return $?(x||(x=new Lt),Tx(a,n,l,s,v,x)):!1}function lx(a){return P1(a)&&h0(a)==St}function So(a,n,l,s){var v=l.length,x=v,y=!s;if(a==null)return!x;for(a=M1(a);v--;){var V=l[v];if(y&&V[2]?V[1]!==a[V[0]]:!(V[0]in a))return!1}for(;++v<x;){V=l[v];var _=V[0],F=a[_],O=V[1];if(y&&V[2]){if(F===t&&!(_ in a))return!1}else{var D=new Lt;if(s)var $=s(F,O,_,a,n,D);if(!($===t?S4(O,F,C|A,s,D):$))return!1}}return!0}function J6(a){if(!T1(a)||Wx(a))return!1;var n=u2(a)?lm:Zf;return n.test(ze(a))}function cx(a){return P1(a)&&z0(a)==d4}function ux(a){return P1(a)&&h0(a)==Ct}function sx(a){return P1(a)&&Rn(a.length)&&!!S1[z0(a)]}function tl(a){return typeof a=="function"?a:a==null?b0:typeof a=="object"?a1(a)?al(a[0],a[1]):rl(a):wc(a)}function Co(a){if(!L4(a))return vm(a);var n=[];for(var l in M1(a))x1.call(a,l)&&l!="constructor"&&n.push(l);return n}function hx(a){if(!T1(a))return Kx(a);var n=L4(a),l=[];for(var s in a)s=="constructor"&&(n||!x1.call(a,s))||l.push(s);return l}function Vo(a,n){return a<n}function el(a,n){var l=-1,s=L0(a)?k(a.length):[];return _2(a,function(v,x,y){s[++l]=n(v,x,y)}),s}function rl(a){var n=Uo(a);return n.length==1&&n[0][2]?Il(n[0][0],n[0][1]):function(l){return l===a||So(l,a,n)}}function al(a,n){return $o(a)&&kl(n)?Il(jt(a),n):function(l){var s=t5(l,a);return s===t&&s===n?e5(l,a):S4(n,s,C|A)}}function gn(a,n,l,s,v){a!==n&&Mo(n,function(x,y){if(v||(v=new Lt),T1(x))dx(a,n,y,l,gn,s,v);else{var V=s?s(Go(a,y),x,y+"",a,n,v):t;V===t&&(V=x),zo(a,y,V)}},A0)}function dx(a,n,l,s,v,x,y){var V=Go(a,l),_=Go(n,l),F=y.get(_);if(F){zo(a,l,F);return}var O=x?x(V,_,l+"",a,n,y):t,D=O===t;if(D){var $=a1(_),K=!$&&k2(_),J=!$&&!K&&hr(_);O=_,$||K||J?a1(V)?O=V:D1(V)?O=V0(V):K?(D=!1,O=fl(_,!0)):J?(D=!1,O=gl(_,!0)):O=[]:b4(_)||Be(_)?(O=V,Be(V)?O=dc(V):(!T1(V)||u2(V))&&(O=Tl(_))):D=!1}D&&(y.set(_,O),v(O,_,s,x,y),y.delete(_)),zo(a,l,O)}function nl(a,n){var l=a.length;if(l)return n+=n<0?l:0,c2(n,l)?a[n]:t}function il(a,n,l){n.length?n=_1(n,function(x){return a1(x)?function(y){return me(y,x.length===1?x[0]:x)}:x}):n=[b0];var s=-1;n=_1(n,D0(Z()));var v=el(a,function(x,y,V){var _=_1(n,function(F){return F(x)});return{criteria:_,index:++s,value:x}});return Fg(v,function(x,y){return Sx(x,y,l)})}function vx(a,n){return ol(a,n,function(l,s){return e5(a,s)})}function ol(a,n,l){for(var s=-1,v=n.length,x={};++s<v;){var y=n[s],V=me(a,y);l(V,y)&&C4(x,E2(y,a),V)}return x}function px(a){return function(n){return me(n,a)}}function Lo(a,n,l,s){var v=s?Pg:er,x=-1,y=n.length,V=a;for(a===n&&(n=V0(n)),l&&(V=_1(a,D0(l)));++x<y;)for(var _=0,F=n[x],O=l?l(F):F;(_=v(V,O,_,s))>-1;)V!==a&&on.call(V,_,1),on.call(a,_,1);return a}function ll(a,n){for(var l=a?n.length:0,s=l-1;l--;){var v=n[l];if(l==s||v!==x){var x=v;c2(v)?on.call(a,v,1):Ro(a,v)}}return a}function Ao(a,n){return a+un(D6()*(n-a+1))}function fx(a,n,l,s){for(var v=-1,x=X1(cn((n-a)/(l||1)),0),y=k(x);x--;)y[s?x:++v]=a,a+=l;return y}function bo(a,n){var l="";if(!a||n<1||n>O1)return l;do n%2&&(l+=a),n=un(n/2),n&&(a+=a);while(n);return l}function o1(a,n){return Ko(Nl(a,n,b0),a+"")}function gx(a){return $6(dr(a))}function mx(a,n){var l=dr(a);return Cn(l,ge(n,0,l.length))}function C4(a,n,l,s){if(!T1(a))return a;n=E2(n,a);for(var v=-1,x=n.length,y=x-1,V=a;V!=null&&++v<x;){var _=jt(n[v]),F=l;if(_==="__proto__"||_==="constructor"||_==="prototype")return a;if(v!=y){var O=V[_];F=s?s(O,_,V):t,F===t&&(F=T1(O)?O:c2(n[v+1])?[]:{})}w4(V,_,F),V=V[_]}return a}var cl=sn?function(a,n){return sn.set(a,n),a}:b0,xx=ln?function(a,n){return ln(a,"toString",{configurable:!0,enumerable:!1,value:a5(n),writable:!0})}:b0;function zx(a){return Cn(dr(a))}function dt(a,n,l){var s=-1,v=a.length;n<0&&(n=-n>v?0:v+n),l=l>v?v:l,l<0&&(l+=v),v=n>l?0:l-n>>>0,n>>>=0;for(var x=k(v);++s<v;)x[s]=a[s+n];return x}function Bx(a,n){var l;return _2(a,function(s,v,x){return l=n(s,v,x),!l}),!!l}function mn(a,n,l){var s=0,v=a==null?s:a.length;if(typeof n=="number"&&n===n&&v<=nt){for(;s<v;){var x=s+v>>>1,y=a[x];y!==null&&!W0(y)&&(l?y<=n:y<n)?s=x+1:v=x}return v}return _o(a,n,b0,l)}function _o(a,n,l,s){var v=0,x=a==null?0:a.length;if(x===0)return 0;n=l(n);for(var y=n!==n,V=n===null,_=W0(n),F=n===t;v<x;){var O=un((v+x)/2),D=l(a[O]),$=D!==t,K=D===null,J=D===D,i1=W0(D);if(y)var t1=s||J;else F?t1=J&&(s||$):V?t1=J&&$&&(s||!K):_?t1=J&&$&&!K&&(s||!i1):K||i1?t1=!1:t1=s?D<=n:D<n;t1?v=O+1:x=O}return s0(x,u4)}function ul(a,n){for(var l=-1,s=a.length,v=0,x=[];++l<s;){var y=a[l],V=n?n(y):y;if(!l||!At(V,_)){var _=V;x[v++]=y===0?0:y}}return x}function sl(a){return typeof a=="number"?a:W0(a)?wt:+a}function U0(a){if(typeof a=="string")return a;if(a1(a))return _1(a,U0)+"";if(W0(a))return U6?U6.call(a):"";var n=a+"";return n=="0"&&1/a==-g1?"-0":n}function R2(a,n,l){var s=-1,v=qa,x=a.length,y=!0,V=[],_=V;if(l)y=!1,v=io;else if(x>=r){var F=n?null:_x(a);if(F)return Za(F);y=!1,v=g4,_=new fe}else _=n?[]:V;t:for(;++s<x;){var O=a[s],D=n?n(O):O;if(O=l||O!==0?O:0,y&&D===D){for(var $=_.length;$--;)if(_[$]===D)continue t;n&&_.push(D),V.push(O)}else v(_,D,l)||(_!==V&&_.push(D),V.push(O))}return V}function Ro(a,n){return n=E2(n,a),a=Pl(a,n),a==null||delete a[jt(vt(n))]}function hl(a,n,l,s){return C4(a,n,l(me(a,n)),s)}function xn(a,n,l,s){for(var v=a.length,x=s?v:-1;(s?x--:++x<v)&&n(a[x],x,a););return l?dt(a,s?0:x,s?x+1:v):dt(a,s?x+1:0,s?v:x)}function dl(a,n){var l=a;return l instanceof u1&&(l=l.value()),oo(n,function(s,v){return v.func.apply(v.thisArg,V2([s],v.args))},l)}function Eo(a,n,l){var s=a.length;if(s<2)return s?R2(a[0]):[];for(var v=-1,x=k(s);++v<s;)for(var y=a[v],V=-1;++V<s;)V!=v&&(x[v]=y4(x[v]||y,a[V],n,l));return R2(n0(x,1),n,l)}function vl(a,n,l){for(var s=-1,v=a.length,x=n.length,y={};++s<v;){var V=s<x?n[s]:t;l(y,a[s],V)}return y}function To(a){return D1(a)?a:[]}function ko(a){return typeof a=="function"?a:b0}function E2(a,n){return a1(a)?a:$o(a,n)?[a]:Ul(m1(a))}var Mx=o1;function T2(a,n,l){var s=a.length;return l=l===t?s:l,!n&&l>=s?a:dt(a,n,l)}var pl=cm||function(a){return t0.clearTimeout(a)};function fl(a,n){if(n)return a.slice();var l=a.length,s=I6?I6(l):new a.constructor(l);return a.copy(s),s}function Io(a){var n=new a.constructor(a.byteLength);return new an(n).set(new an(a)),n}function wx(a,n){var l=n?Io(a.buffer):a.buffer;return new a.constructor(l,a.byteOffset,a.byteLength)}function yx(a){var n=new a.constructor(a.source,Q7.exec(a));return n.lastIndex=a.lastIndex,n}function Hx(a){return M4?M1(M4.call(a)):{}}function gl(a,n){var l=n?Io(a.buffer):a.buffer;return new a.constructor(l,a.byteOffset,a.length)}function ml(a,n){if(a!==n){var l=a!==t,s=a===null,v=a===a,x=W0(a),y=n!==t,V=n===null,_=n===n,F=W0(n);if(!V&&!F&&!x&&a>n||x&&y&&_&&!V&&!F||s&&y&&_||!l&&_||!v)return 1;if(!s&&!x&&!F&&a<n||F&&l&&v&&!s&&!x||V&&l&&v||!y&&v||!_)return-1}return 0}function Sx(a,n,l){for(var s=-1,v=a.criteria,x=n.criteria,y=v.length,V=l.length;++s<y;){var _=ml(v[s],x[s]);if(_){if(s>=V)return _;var F=l[s];return _*(F=="desc"?-1:1)}}return a.index-n.index}function xl(a,n,l,s){for(var v=-1,x=a.length,y=l.length,V=-1,_=n.length,F=X1(x-y,0),O=k(_+F),D=!s;++V<_;)O[V]=n[V];for(;++v<y;)(D||v<x)&&(O[l[v]]=a[v]);for(;F--;)O[V++]=a[v++];return O}function zl(a,n,l,s){for(var v=-1,x=a.length,y=-1,V=l.length,_=-1,F=n.length,O=X1(x-V,0),D=k(O+F),$=!s;++v<O;)D[v]=a[v];for(var K=v;++_<F;)D[K+_]=n[_];for(;++y<V;)($||v<x)&&(D[K+l[y]]=a[v++]);return D}function V0(a,n){var l=-1,s=a.length;for(n||(n=k(s));++l<s;)n[l]=a[l];return n}function $t(a,n,l,s){var v=!l;l||(l={});for(var x=-1,y=n.length;++x<y;){var V=n[x],_=s?s(l[V],a[V],V,l,a):t;_===t&&(_=a[V]),v?i2(l,V,_):w4(l,V,_)}return l}function Cx(a,n){return $t(a,Wo(a),n)}function Vx(a,n){return $t(a,Rl(a),n)}function zn(a,n){return function(l,s){var v=a1(l)?Rg:qm,x=n?n():{};return v(l,a,Z(s,2),x)}}function cr(a){return o1(function(n,l){var s=-1,v=l.length,x=v>1?l[v-1]:t,y=v>2?l[2]:t;for(x=a.length>3&&typeof x=="function"?(v--,x):t,y&&B0(l[0],l[1],y)&&(x=v<3?t:x,v=1),n=M1(n);++s<v;){var V=l[s];V&&a(n,V,s,x)}return n})}function Bl(a,n){return function(l,s){if(l==null)return l;if(!L0(l))return a(l,s);for(var v=l.length,x=n?v:-1,y=M1(l);(n?x--:++x<v)&&s(y[x],x,y)!==!1;);return l}}function Ml(a){return function(n,l,s){for(var v=-1,x=M1(n),y=s(n),V=y.length;V--;){var _=y[a?V:++v];if(l(x[_],_,x)===!1)break}return n}}function Lx(a,n,l){var s=n&E,v=V4(a);function x(){var y=this&&this!==t0&&this instanceof x?v:a;return y.apply(s?l:this,arguments)}return x}function wl(a){return function(n){n=m1(n);var l=rr(n)?Vt(n):t,s=l?l[0]:n.charAt(0),v=l?T2(l,1).join(""):n.slice(1);return s[a]()+v}}function ur(a){return function(n){return oo(Bc(zc(n).replace(xg,"")),a,"")}}function V4(a){return function(){var n=arguments;switch(n.length){case 0:return new a;case 1:return new a(n[0]);case 2:return new a(n[0],n[1]);case 3:return new a(n[0],n[1],n[2]);case 4:return new a(n[0],n[1],n[2],n[3]);case 5:return new a(n[0],n[1],n[2],n[3],n[4]);case 6:return new a(n[0],n[1],n[2],n[3],n[4],n[5]);case 7:return new a(n[0],n[1],n[2],n[3],n[4],n[5],n[6])}var l=lr(a.prototype),s=a.apply(l,n);return T1(s)?s:l}}function Ax(a,n,l){var s=V4(a);function v(){for(var x=arguments.length,y=k(x),V=x,_=sr(v);V--;)y[V]=arguments[V];var F=x<3&&y[0]!==_&&y[x-1]!==_?[]:L2(y,_);if(x-=F.length,x<l)return Vl(a,n,Bn,v.placeholder,t,y,F,t,t,l-x);var O=this&&this!==t0&&this instanceof v?s:a;return O0(O,this,y)}return v}function yl(a){return function(n,l,s){var v=M1(n);if(!L0(n)){var x=Z(l,3);n=e0(n),l=function(V){return x(v[V],V,v)}}var y=a(n,l,s);return y>-1?v[x?n[y]:y]:t}}function Hl(a){return l2(function(n){var l=n.length,s=l,v=st.prototype.thru;for(a&&n.reverse();s--;){var x=n[s];if(typeof x!="function")throw new ut(o);if(v&&!y&&Hn(x)=="wrapper")var y=new st([],!0)}for(s=y?s:l;++s<l;){x=n[s];var V=Hn(x),_=V=="wrapper"?Do(x):t;_&&jo(_[0])&&_[1]==(I|g|z|T)&&!_[4].length&&_[9]==1?y=y[Hn(_[0])].apply(y,_[3]):y=x.length==1&&jo(x)?y[V]():y.thru(x)}return function(){var F=arguments,O=F[0];if(y&&F.length==1&&a1(O))return y.plant(O).value();for(var D=0,$=l?n[D].apply(this,F):O;++D<l;)$=n[D].call(this,$);return $}})}function Bn(a,n,l,s,v,x,y,V,_,F){var O=n&I,D=n&E,$=n&M,K=n&(g|m),J=n&P,i1=$?t:V4(a);function t1(){for(var c1=arguments.length,h1=k(c1),$0=c1;$0--;)h1[$0]=arguments[$0];if(K)var M0=sr(t1),j0=Dg(h1,M0);if(s&&(h1=xl(h1,s,v,K)),x&&(h1=zl(h1,x,y,K)),c1-=j0,K&&c1<F){var U1=L2(h1,M0);return Vl(a,n,Bn,t1.placeholder,l,h1,U1,V,_,F-c1)}var bt=D?l:this,h2=$?bt[a]:a;return c1=h1.length,V?h1=qx(h1,V):J&&c1>1&&h1.reverse(),O&&_<c1&&(h1.length=_),this&&this!==t0&&this instanceof t1&&(h2=i1||V4(h2)),h2.apply(bt,h1)}return t1}function Sl(a,n){return function(l,s){return ax(l,a,n(s),{})}}function Mn(a,n){return function(l,s){var v;if(l===t&&s===t)return n;if(l!==t&&(v=l),s!==t){if(v===t)return s;typeof l=="string"||typeof s=="string"?(l=U0(l),s=U0(s)):(l=sl(l),s=sl(s)),v=a(l,s)}return v}}function No(a){return l2(function(n){return n=_1(n,D0(Z())),o1(function(l){var s=this;return a(n,function(v){return O0(v,s,l)})})})}function wn(a,n){n=n===t?" ":U0(n);var l=n.length;if(l<2)return l?bo(n,a):n;var s=bo(n,cn(a/ar(n)));return rr(n)?T2(Vt(s),0,a).join(""):s.slice(0,a)}function bx(a,n,l,s){var v=n&E,x=V4(a);function y(){for(var V=-1,_=arguments.length,F=-1,O=s.length,D=k(O+_),$=this&&this!==t0&&this instanceof y?x:a;++F<O;)D[F]=s[F];for(;_--;)D[F++]=arguments[++V];return O0($,v?l:this,D)}return y}function Cl(a){return function(n,l,s){return s&&typeof s!="number"&&B0(n,l,s)&&(l=s=t),n=s2(n),l===t?(l=n,n=0):l=s2(l),s=s===t?n<l?1:-1:s2(s),fx(n,l,s,a)}}function yn(a){return function(n,l){return typeof n=="string"&&typeof l=="string"||(n=pt(n),l=pt(l)),a(n,l)}}function Vl(a,n,l,s,v,x,y,V,_,F){var O=n&g,D=O?y:t,$=O?t:y,K=O?x:t,J=O?t:x;n|=O?z:b,n&=~(O?b:z),n&S||(n&=~(E|M));var i1=[a,n,v,K,D,J,$,V,_,F],t1=l.apply(t,i1);return jo(a)&&Fl(t1,i1),t1.placeholder=s,Ol(t1,a,n)}function Po(a){var n=K1[a];return function(l,s){if(l=pt(l),s=s==null?0:s0(n1(s),292),s&&O6(l)){var v=(m1(l)+"e").split("e"),x=n(v[0]+"e"+(+v[1]+s));return v=(m1(x)+"e").split("e"),+(v[0]+"e"+(+v[1]-s))}return n(l)}}var _x=ir&&1/Za(new ir([,-0]))[1]==g1?function(a){return new ir(a)}:o5;function Ll(a){return function(n){var l=h0(n);return l==St?po(n):l==Ct?Xg(n):Og(n,a(n))}}function o2(a,n,l,s,v,x,y,V){var _=n&M;if(!_&&typeof a!="function")throw new ut(o);var F=s?s.length:0;if(F||(n&=~(z|b),s=v=t),y=y===t?y:X1(n1(y),0),V=V===t?V:n1(V),F-=v?v.length:0,n&b){var O=s,D=v;s=v=t}var $=_?t:Do(a),K=[a,n,l,s,v,O,D,x,y,V];if($&&Gx(K,$),a=K[0],n=K[1],l=K[2],s=K[3],v=K[4],V=K[9]=K[9]===t?_?0:a.length:X1(K[9]-F,0),!V&&n&(g|m)&&(n&=~(g|m)),!n||n==E)var J=Lx(a,n,l);else n==g||n==m?J=Ax(a,n,V):(n==z||n==(E|z))&&!v.length?J=bx(a,n,l,s):J=Bn.apply(t,K);var i1=$?cl:Fl;return Ol(i1(J,K),a,n)}function Al(a,n,l,s){return a===t||At(a,nr[l])&&!x1.call(s,l)?n:a}function bl(a,n,l,s,v,x){return T1(a)&&T1(n)&&(x.set(n,a),gn(a,n,t,bl,x),x.delete(n)),a}function Rx(a){return b4(a)?t:a}function _l(a,n,l,s,v,x){var y=l&C,V=a.length,_=n.length;if(V!=_&&!(y&&_>V))return!1;var F=x.get(a),O=x.get(n);if(F&&O)return F==n&&O==a;var D=-1,$=!0,K=l&A?new fe:t;for(x.set(a,n),x.set(n,a);++D<V;){var J=a[D],i1=n[D];if(s)var t1=y?s(i1,J,D,n,a,x):s(J,i1,D,a,n,x);if(t1!==t){if(t1)continue;$=!1;break}if(K){if(!lo(n,function(c1,h1){if(!g4(K,h1)&&(J===c1||v(J,c1,l,s,x)))return K.push(h1)})){$=!1;break}}else if(!(J===i1||v(J,i1,l,s,x))){$=!1;break}}return x.delete(a),x.delete(n),$}function Ex(a,n,l,s,v,x,y){switch(l){case Je:if(a.byteLength!=n.byteLength||a.byteOffset!=n.byteOffset)return!1;a=a.buffer,n=n.buffer;case f4:return!(a.byteLength!=n.byteLength||!x(new an(a),new an(n)));case Ut:case Ht:case h4:return At(+a,+n);case it:return a.name==n.name&&a.message==n.message;case d4:case v4:return a==n+"";case St:var V=po;case Ct:var _=s&C;if(V||(V=Za),a.size!=n.size&&!_)return!1;var F=y.get(a);if(F)return F==n;s|=A,y.set(a,n);var O=_l(V(a),V(n),s,v,x,y);return y.delete(a),O;case ja:if(M4)return M4.call(a)==M4.call(n)}return!1}function Tx(a,n,l,s,v,x){var y=l&C,V=Fo(a),_=V.length,F=Fo(n),O=F.length;if(_!=O&&!y)return!1;for(var D=_;D--;){var $=V[D];if(!(y?$ in n:x1.call(n,$)))return!1}var K=x.get(a),J=x.get(n);if(K&&J)return K==n&&J==a;var i1=!0;x.set(a,n),x.set(n,a);for(var t1=y;++D<_;){$=V[D];var c1=a[$],h1=n[$];if(s)var $0=y?s(h1,c1,$,n,a,x):s(c1,h1,$,a,n,x);if(!($0===t?c1===h1||v(c1,h1,l,s,x):$0)){i1=!1;break}t1||(t1=$=="constructor")}if(i1&&!t1){var M0=a.constructor,j0=n.constructor;M0!=j0&&"constructor"in a&&"constructor"in n&&!(typeof M0=="function"&&M0 instanceof M0&&typeof j0=="function"&&j0 instanceof j0)&&(i1=!1)}return x.delete(a),x.delete(n),i1}function l2(a){return Ko(Nl(a,t,Gl),a+"")}function Fo(a){return Z6(a,e0,Wo)}function Oo(a){return Z6(a,A0,Rl)}var Do=sn?function(a){return sn.get(a)}:o5;function Hn(a){for(var n=a.name+"",l=or[n],s=x1.call(or,n)?l.length:0;s--;){var v=l[s],x=v.func;if(x==null||x==a)return v.name}return n}function sr(a){var n=x1.call(f,"placeholder")?f:a;return n.placeholder}function Z(){var a=f.iteratee||n5;return a=a===n5?tl:a,arguments.length?a(arguments[0],arguments[1]):a}function Sn(a,n){var l=a.__data__;return Ux(n)?l[typeof n=="string"?"string":"hash"]:l.map}function Uo(a){for(var n=e0(a),l=n.length;l--;){var s=n[l],v=a[s];n[l]=[s,v,kl(v)]}return n}function xe(a,n){var l=jg(a,n);return J6(l)?l:t}function kx(a){var n=x1.call(a,ve),l=a[ve];try{a[ve]=t;var s=!0}catch{}var v=en.call(a);return s&&(n?a[ve]=l:delete a[ve]),v}var Wo=go?function(a){return a==null?[]:(a=M1(a),C2(go(a),function(n){return P6.call(a,n)}))}:l5,Rl=go?function(a){for(var n=[];a;)V2(n,Wo(a)),a=nn(a);return n}:l5,h0=z0;(mo&&h0(new mo(new ArrayBuffer(1)))!=Je||x4&&h0(new x4)!=St||xo&&h0(xo.resolve())!=X7||ir&&h0(new ir)!=Ct||z4&&h0(new z4)!=p4)&&(h0=function(a){var n=z0(a),l=n==r2?a.constructor:t,s=l?ze(l):"";if(s)switch(s){case mm:return Je;case xm:return St;case zm:return X7;case Bm:return Ct;case Mm:return p4}return n});function Ix(a,n,l){for(var s=-1,v=l.length;++s<v;){var x=l[s],y=x.size;switch(x.type){case"drop":a+=y;break;case"dropRight":n-=y;break;case"take":n=s0(n,a+y);break;case"takeRight":a=X1(a,n-y);break}}return{start:a,end:n}}function Nx(a){var n=a.match(Wf);return n?n[1].split($f):[]}function El(a,n,l){n=E2(n,a);for(var s=-1,v=n.length,x=!1;++s<v;){var y=jt(n[s]);if(!(x=a!=null&&l(a,y)))break;a=a[y]}return x||++s!=v?x:(v=a==null?0:a.length,!!v&&Rn(v)&&c2(y,v)&&(a1(a)||Be(a)))}function Px(a){var n=a.length,l=new a.constructor(n);return n&&typeof a[0]=="string"&&x1.call(a,"index")&&(l.index=a.index,l.input=a.input),l}function Tl(a){return typeof a.constructor=="function"&&!L4(a)?lr(nn(a)):{}}function Fx(a,n,l){var s=a.constructor;switch(n){case f4:return Io(a);case Ut:case Ht:return new s(+a);case Je:return wx(a,l);case Di:case Ui:case Wi:case $i:case ji:case Gi:case Ki:case Xi:case qi:return gl(a,l);case St:return new s;case h4:case v4:return new s(a);case d4:return yx(a);case Ct:return new s;case ja:return Hx(a)}}function Ox(a,n){var l=n.length;if(!l)return a;var s=l-1;return n[s]=(l>1?"& ":"")+n[s],n=n.join(l>2?", ":" "),a.replace(Uf,`{
/* [wrapped with `+n+`] */
`)}function Dx(a){return a1(a)||Be(a)||!!(F6&&a&&a[F6])}function c2(a,n){var l=typeof a;return n=n??O1,!!n&&(l=="number"||l!="symbol"&&Jf.test(a))&&a>-1&&a%1==0&&a<n}function B0(a,n,l){if(!T1(l))return!1;var s=typeof n;return(s=="number"?L0(l)&&c2(n,l.length):s=="string"&&n in l)?At(l[n],a):!1}function $o(a,n){if(a1(a))return!1;var l=typeof a;return l=="number"||l=="symbol"||l=="boolean"||a==null||W0(a)?!0:Pf.test(a)||!Nf.test(a)||n!=null&&a in M1(n)}function Ux(a){var n=typeof a;return n=="string"||n=="number"||n=="symbol"||n=="boolean"?a!=="__proto__":a===null}function jo(a){var n=Hn(a),l=f[n];if(typeof l!="function"||!(n in u1.prototype))return!1;if(a===l)return!0;var s=Do(l);return!!s&&a===s[0]}function Wx(a){return!!k6&&k6 in a}var $x=Ja?u2:c5;function L4(a){var n=a&&a.constructor,l=typeof n=="function"&&n.prototype||nr;return a===l}function kl(a){return a===a&&!T1(a)}function Il(a,n){return function(l){return l==null?!1:l[a]===n&&(n!==t||a in M1(l))}}function jx(a){var n=bn(a,function(s){return l.size===h&&l.clear(),s}),l=n.cache;return n}function Gx(a,n){var l=a[1],s=n[1],v=l|s,x=v<(E|M|I),y=s==I&&l==g||s==I&&l==T&&a[7].length<=n[8]||s==(I|T)&&n[7].length<=n[8]&&l==g;if(!(x||y))return a;s&E&&(a[2]=n[2],v|=l&E?0:S);var V=n[3];if(V){var _=a[3];a[3]=_?xl(_,V,n[4]):V,a[4]=_?L2(a[3],d):n[4]}return V=n[5],V&&(_=a[5],a[5]=_?zl(_,V,n[6]):V,a[6]=_?L2(a[5],d):n[6]),V=n[7],V&&(a[7]=V),s&I&&(a[8]=a[8]==null?n[8]:s0(a[8],n[8])),a[9]==null&&(a[9]=n[9]),a[0]=n[0],a[1]=v,a}function Kx(a){var n=[];if(a!=null)for(var l in M1(a))n.push(l);return n}function Xx(a){return en.call(a)}function Nl(a,n,l){return n=X1(n===t?a.length-1:n,0),function(){for(var s=arguments,v=-1,x=X1(s.length-n,0),y=k(x);++v<x;)y[v]=s[n+v];v=-1;for(var V=k(n+1);++v<n;)V[v]=s[v];return V[n]=l(y),O0(a,this,V)}}function Pl(a,n){return n.length<2?a:me(a,dt(n,0,-1))}function qx(a,n){for(var l=a.length,s=s0(n.length,l),v=V0(a);s--;){var x=n[s];a[s]=c2(x,l)?v[x]:t}return a}function Go(a,n){if(!(n==="constructor"&&typeof a[n]=="function")&&n!="__proto__")return a[n]}var Fl=Dl(cl),A4=sm||function(a,n){return t0.setTimeout(a,n)},Ko=Dl(xx);function Ol(a,n,l){var s=n+"";return Ko(a,Ox(s,Yx(Nx(s),l)))}function Dl(a){var n=0,l=0;return function(){var s=pm(),v=G1-(s-l);if(l=s,v>0){if(++n>=r1)return arguments[0]}else n=0;return a.apply(t,arguments)}}function Cn(a,n){var l=-1,s=a.length,v=s-1;for(n=n===t?s:n;++l<n;){var x=Ao(l,v),y=a[x];a[x]=a[l],a[l]=y}return a.length=n,a}var Ul=jx(function(a){var n=[];return a.charCodeAt(0)===46&&n.push(""),a.replace(Ff,function(l,s,v,x){n.push(v?x.replace(Kf,"$1"):s||l)}),n});function jt(a){if(typeof a=="string"||W0(a))return a;var n=a+"";return n=="0"&&1/a==-g1?"-0":n}function ze(a){if(a!=null){try{return tn.call(a)}catch{}try{return a+""}catch{}}return""}function Yx(a,n){return ct(e2,function(l){var s="_."+l[0];n&l[1]&&!qa(a,s)&&a.push(s)}),a.sort()}function Wl(a){if(a instanceof u1)return a.clone();var n=new st(a.__wrapped__,a.__chain__);return n.__actions__=V0(a.__actions__),n.__index__=a.__index__,n.__values__=a.__values__,n}function Zx(a,n,l){(l?B0(a,n,l):n===t)?n=1:n=X1(n1(n),0);var s=a==null?0:a.length;if(!s||n<1)return[];for(var v=0,x=0,y=k(cn(s/n));v<s;)y[x++]=dt(a,v,v+=n);return y}function Qx(a){for(var n=-1,l=a==null?0:a.length,s=0,v=[];++n<l;){var x=a[n];x&&(v[s++]=x)}return v}function Jx(){var a=arguments.length;if(!a)return[];for(var n=k(a-1),l=arguments[0],s=a;s--;)n[s-1]=arguments[s];return V2(a1(l)?V0(l):[l],n0(n,1))}var tz=o1(function(a,n){return D1(a)?y4(a,n0(n,1,D1,!0)):[]}),ez=o1(function(a,n){var l=vt(n);return D1(l)&&(l=t),D1(a)?y4(a,n0(n,1,D1,!0),Z(l,2)):[]}),rz=o1(function(a,n){var l=vt(n);return D1(l)&&(l=t),D1(a)?y4(a,n0(n,1,D1,!0),t,l):[]});function az(a,n,l){var s=a==null?0:a.length;return s?(n=l||n===t?1:n1(n),dt(a,n<0?0:n,s)):[]}function nz(a,n,l){var s=a==null?0:a.length;return s?(n=l||n===t?1:n1(n),n=s-n,dt(a,0,n<0?0:n)):[]}function iz(a,n){return a&&a.length?xn(a,Z(n,3),!0,!0):[]}function oz(a,n){return a&&a.length?xn(a,Z(n,3),!0):[]}function lz(a,n,l,s){var v=a==null?0:a.length;return v?(l&&typeof l!="number"&&B0(a,n,l)&&(l=0,s=v),Jm(a,n,l,s)):[]}function $l(a,n,l){var s=a==null?0:a.length;if(!s)return-1;var v=l==null?0:n1(l);return v<0&&(v=X1(s+v,0)),Ya(a,Z(n,3),v)}function jl(a,n,l){var s=a==null?0:a.length;if(!s)return-1;var v=s-1;return l!==t&&(v=n1(l),v=l<0?X1(s+v,0):s0(v,s-1)),Ya(a,Z(n,3),v,!0)}function Gl(a){var n=a==null?0:a.length;return n?n0(a,1):[]}function cz(a){var n=a==null?0:a.length;return n?n0(a,g1):[]}function uz(a,n){var l=a==null?0:a.length;return l?(n=n===t?1:n1(n),n0(a,n)):[]}function sz(a){for(var n=-1,l=a==null?0:a.length,s={};++n<l;){var v=a[n];s[v[0]]=v[1]}return s}function Kl(a){return a&&a.length?a[0]:t}function hz(a,n,l){var s=a==null?0:a.length;if(!s)return-1;var v=l==null?0:n1(l);return v<0&&(v=X1(s+v,0)),er(a,n,v)}function dz(a){var n=a==null?0:a.length;return n?dt(a,0,-1):[]}var vz=o1(function(a){var n=_1(a,To);return n.length&&n[0]===a[0]?Ho(n):[]}),pz=o1(function(a){var n=vt(a),l=_1(a,To);return n===vt(l)?n=t:l.pop(),l.length&&l[0]===a[0]?Ho(l,Z(n,2)):[]}),fz=o1(function(a){var n=vt(a),l=_1(a,To);return n=typeof n=="function"?n:t,n&&l.pop(),l.length&&l[0]===a[0]?Ho(l,t,n):[]});function gz(a,n){return a==null?"":dm.call(a,n)}function vt(a){var n=a==null?0:a.length;return n?a[n-1]:t}function mz(a,n,l){var s=a==null?0:a.length;if(!s)return-1;var v=s;return l!==t&&(v=n1(l),v=v<0?X1(s+v,0):s0(v,s-1)),n===n?Yg(a,n,v):Ya(a,V6,v,!0)}function xz(a,n){return a&&a.length?nl(a,n1(n)):t}var zz=o1(Xl);function Xl(a,n){return a&&a.length&&n&&n.length?Lo(a,n):a}function Bz(a,n,l){return a&&a.length&&n&&n.length?Lo(a,n,Z(l,2)):a}function Mz(a,n,l){return a&&a.length&&n&&n.length?Lo(a,n,t,l):a}var wz=l2(function(a,n){var l=a==null?0:a.length,s=Bo(a,n);return ll(a,_1(n,function(v){return c2(v,l)?+v:v}).sort(ml)),s});function yz(a,n){var l=[];if(!(a&&a.length))return l;var s=-1,v=[],x=a.length;for(n=Z(n,3);++s<x;){var y=a[s];n(y,s,a)&&(l.push(y),v.push(s))}return ll(a,v),l}function Xo(a){return a==null?a:gm.call(a)}function Hz(a,n,l){var s=a==null?0:a.length;return s?(l&&typeof l!="number"&&B0(a,n,l)?(n=0,l=s):(n=n==null?0:n1(n),l=l===t?s:n1(l)),dt(a,n,l)):[]}function Sz(a,n){return mn(a,n)}function Cz(a,n,l){return _o(a,n,Z(l,2))}function Vz(a,n){var l=a==null?0:a.length;if(l){var s=mn(a,n);if(s<l&&At(a[s],n))return s}return-1}function Lz(a,n){return mn(a,n,!0)}function Az(a,n,l){return _o(a,n,Z(l,2),!0)}function bz(a,n){var l=a==null?0:a.length;if(l){var s=mn(a,n,!0)-1;if(At(a[s],n))return s}return-1}function _z(a){return a&&a.length?ul(a):[]}function Rz(a,n){return a&&a.length?ul(a,Z(n,2)):[]}function Ez(a){var n=a==null?0:a.length;return n?dt(a,1,n):[]}function Tz(a,n,l){return a&&a.length?(n=l||n===t?1:n1(n),dt(a,0,n<0?0:n)):[]}function kz(a,n,l){var s=a==null?0:a.length;return s?(n=l||n===t?1:n1(n),n=s-n,dt(a,n<0?0:n,s)):[]}function Iz(a,n){return a&&a.length?xn(a,Z(n,3),!1,!0):[]}function Nz(a,n){return a&&a.length?xn(a,Z(n,3)):[]}var Pz=o1(function(a){return R2(n0(a,1,D1,!0))}),Fz=o1(function(a){var n=vt(a);return D1(n)&&(n=t),R2(n0(a,1,D1,!0),Z(n,2))}),Oz=o1(function(a){var n=vt(a);return n=typeof n=="function"?n:t,R2(n0(a,1,D1,!0),t,n)});function Dz(a){return a&&a.length?R2(a):[]}function Uz(a,n){return a&&a.length?R2(a,Z(n,2)):[]}function Wz(a,n){return n=typeof n=="function"?n:t,a&&a.length?R2(a,t,n):[]}function qo(a){if(!(a&&a.length))return[];var n=0;return a=C2(a,function(l){if(D1(l))return n=X1(l.length,n),!0}),ho(n,function(l){return _1(a,co(l))})}function ql(a,n){if(!(a&&a.length))return[];var l=qo(a);return n==null?l:_1(l,function(s){return O0(n,t,s)})}var $z=o1(function(a,n){return D1(a)?y4(a,n):[]}),jz=o1(function(a){return Eo(C2(a,D1))}),Gz=o1(function(a){var n=vt(a);return D1(n)&&(n=t),Eo(C2(a,D1),Z(n,2))}),Kz=o1(function(a){var n=vt(a);return n=typeof n=="function"?n:t,Eo(C2(a,D1),t,n)}),Xz=o1(qo);function qz(a,n){return vl(a||[],n||[],w4)}function Yz(a,n){return vl(a||[],n||[],C4)}var Zz=o1(function(a){var n=a.length,l=n>1?a[n-1]:t;return l=typeof l=="function"?(a.pop(),l):t,ql(a,l)});function Yl(a){var n=f(a);return n.__chain__=!0,n}function Qz(a,n){return n(a),a}function Vn(a,n){return n(a)}var Jz=l2(function(a){var n=a.length,l=n?a[0]:0,s=this.__wrapped__,v=function(x){return Bo(x,a)};return n>1||this.__actions__.length||!(s instanceof u1)||!c2(l)?this.thru(v):(s=s.slice(l,+l+(n?1:0)),s.__actions__.push({func:Vn,args:[v],thisArg:t}),new st(s,this.__chain__).thru(function(x){return n&&!x.length&&x.push(t),x}))});function tB(){return Yl(this)}function eB(){return new st(this.value(),this.__chain__)}function rB(){this.__values__===t&&(this.__values__=sc(this.value()));var a=this.__index__>=this.__values__.length,n=a?t:this.__values__[this.__index__++];return{done:a,value:n}}function aB(){return this}function nB(a){for(var n,l=this;l instanceof dn;){var s=Wl(l);s.__index__=0,s.__values__=t,n?v.__wrapped__=s:n=s;var v=s;l=l.__wrapped__}return v.__wrapped__=a,n}function iB(){var a=this.__wrapped__;if(a instanceof u1){var n=a;return this.__actions__.length&&(n=new u1(this)),n=n.reverse(),n.__actions__.push({func:Vn,args:[Xo],thisArg:t}),new st(n,this.__chain__)}return this.thru(Xo)}function oB(){return dl(this.__wrapped__,this.__actions__)}var lB=zn(function(a,n,l){x1.call(a,l)?++a[l]:i2(a,l,1)});function cB(a,n,l){var s=a1(a)?S6:Qm;return l&&B0(a,n,l)&&(n=t),s(a,Z(n,3))}function uB(a,n){var l=a1(a)?C2:q6;return l(a,Z(n,3))}var sB=yl($l),hB=yl(jl);function dB(a,n){return n0(Ln(a,n),1)}function vB(a,n){return n0(Ln(a,n),g1)}function pB(a,n,l){return l=l===t?1:n1(l),n0(Ln(a,n),l)}function Zl(a,n){var l=a1(a)?ct:_2;return l(a,Z(n,3))}function Ql(a,n){var l=a1(a)?Eg:X6;return l(a,Z(n,3))}var fB=zn(function(a,n,l){x1.call(a,l)?a[l].push(n):i2(a,l,[n])});function gB(a,n,l,s){a=L0(a)?a:dr(a),l=l&&!s?n1(l):0;var v=a.length;return l<0&&(l=X1(v+l,0)),En(a)?l<=v&&a.indexOf(n,l)>-1:!!v&&er(a,n,l)>-1}var mB=o1(function(a,n,l){var s=-1,v=typeof n=="function",x=L0(a)?k(a.length):[];return _2(a,function(y){x[++s]=v?O0(n,y,l):H4(y,n,l)}),x}),xB=zn(function(a,n,l){i2(a,l,n)});function Ln(a,n){var l=a1(a)?_1:el;return l(a,Z(n,3))}function zB(a,n,l,s){return a==null?[]:(a1(n)||(n=n==null?[]:[n]),l=s?t:l,a1(l)||(l=l==null?[]:[l]),il(a,n,l))}var BB=zn(function(a,n,l){a[l?0:1].push(n)},function(){return[[],[]]});function MB(a,n,l){var s=a1(a)?oo:A6,v=arguments.length<3;return s(a,Z(n,4),l,v,_2)}function wB(a,n,l){var s=a1(a)?Tg:A6,v=arguments.length<3;return s(a,Z(n,4),l,v,X6)}function yB(a,n){var l=a1(a)?C2:q6;return l(a,_n(Z(n,3)))}function HB(a){var n=a1(a)?$6:gx;return n(a)}function SB(a,n,l){(l?B0(a,n,l):n===t)?n=1:n=n1(n);var s=a1(a)?Km:mx;return s(a,n)}function CB(a){var n=a1(a)?Xm:zx;return n(a)}function VB(a){if(a==null)return 0;if(L0(a))return En(a)?ar(a):a.length;var n=h0(a);return n==St||n==Ct?a.size:Co(a).length}function LB(a,n,l){var s=a1(a)?lo:Bx;return l&&B0(a,n,l)&&(n=t),s(a,Z(n,3))}var AB=o1(function(a,n){if(a==null)return[];var l=n.length;return l>1&&B0(a,n[0],n[1])?n=[]:l>2&&B0(n[0],n[1],n[2])&&(n=[n[0]]),il(a,n0(n,1),[])}),An=um||function(){return t0.Date.now()};function bB(a,n){if(typeof n!="function")throw new ut(o);return a=n1(a),function(){if(--a<1)return n.apply(this,arguments)}}function Jl(a,n,l){return n=l?t:n,n=a&&n==null?a.length:n,o2(a,I,t,t,t,t,n)}function tc(a,n){var l;if(typeof n!="function")throw new ut(o);return a=n1(a),function(){return--a>0&&(l=n.apply(this,arguments)),a<=1&&(n=t),l}}var Yo=o1(function(a,n,l){var s=E;if(l.length){var v=L2(l,sr(Yo));s|=z}return o2(a,s,n,l,v)}),ec=o1(function(a,n,l){var s=E|M;if(l.length){var v=L2(l,sr(ec));s|=z}return o2(n,s,a,l,v)});function rc(a,n,l){n=l?t:n;var s=o2(a,g,t,t,t,t,t,n);return s.placeholder=rc.placeholder,s}function ac(a,n,l){n=l?t:n;var s=o2(a,m,t,t,t,t,t,n);return s.placeholder=ac.placeholder,s}function nc(a,n,l){var s,v,x,y,V,_,F=0,O=!1,D=!1,$=!0;if(typeof a!="function")throw new ut(o);n=pt(n)||0,T1(l)&&(O=!!l.leading,D="maxWait"in l,x=D?X1(pt(l.maxWait)||0,n):x,$="trailing"in l?!!l.trailing:$);function K(U1){var bt=s,h2=v;return s=v=t,F=U1,y=a.apply(h2,bt),y}function J(U1){return F=U1,V=A4(c1,n),O?K(U1):y}function i1(U1){var bt=U1-_,h2=U1-F,yc=n-bt;return D?s0(yc,x-h2):yc}function t1(U1){var bt=U1-_,h2=U1-F;return _===t||bt>=n||bt<0||D&&h2>=x}function c1(){var U1=An();if(t1(U1))return h1(U1);V=A4(c1,i1(U1))}function h1(U1){return V=t,$&&s?K(U1):(s=v=t,y)}function $0(){V!==t&&pl(V),F=0,s=_=v=V=t}function M0(){return V===t?y:h1(An())}function j0(){var U1=An(),bt=t1(U1);if(s=arguments,v=this,_=U1,bt){if(V===t)return J(_);if(D)return pl(V),V=A4(c1,n),K(_)}return V===t&&(V=A4(c1,n)),y}return j0.cancel=$0,j0.flush=M0,j0}var _B=o1(function(a,n){return K6(a,1,n)}),RB=o1(function(a,n,l){return K6(a,pt(n)||0,l)});function EB(a){return o2(a,P)}function bn(a,n){if(typeof a!="function"||n!=null&&typeof n!="function")throw new ut(o);var l=function(){var s=arguments,v=n?n.apply(this,s):s[0],x=l.cache;if(x.has(v))return x.get(v);var y=a.apply(this,s);return l.cache=x.set(v,y)||x,y};return l.cache=new(bn.Cache||n2),l}bn.Cache=n2;function _n(a){if(typeof a!="function")throw new ut(o);return function(){var n=arguments;switch(n.length){case 0:return!a.call(this);case 1:return!a.call(this,n[0]);case 2:return!a.call(this,n[0],n[1]);case 3:return!a.call(this,n[0],n[1],n[2])}return!a.apply(this,n)}}function TB(a){return tc(2,a)}var kB=Mx(function(a,n){n=n.length==1&&a1(n[0])?_1(n[0],D0(Z())):_1(n0(n,1),D0(Z()));var l=n.length;return o1(function(s){for(var v=-1,x=s0(s.length,l);++v<x;)s[v]=n[v].call(this,s[v]);return O0(a,this,s)})}),Zo=o1(function(a,n){var l=L2(n,sr(Zo));return o2(a,z,t,n,l)}),ic=o1(function(a,n){var l=L2(n,sr(ic));return o2(a,b,t,n,l)}),IB=l2(function(a,n){return o2(a,T,t,t,t,n)});function NB(a,n){if(typeof a!="function")throw new ut(o);return n=n===t?n:n1(n),o1(a,n)}function PB(a,n){if(typeof a!="function")throw new ut(o);return n=n==null?0:X1(n1(n),0),o1(function(l){var s=l[n],v=T2(l,0,n);return s&&V2(v,s),O0(a,this,v)})}function FB(a,n,l){var s=!0,v=!0;if(typeof a!="function")throw new ut(o);return T1(l)&&(s="leading"in l?!!l.leading:s,v="trailing"in l?!!l.trailing:v),nc(a,n,{leading:s,maxWait:n,trailing:v})}function OB(a){return Jl(a,1)}function DB(a,n){return Zo(ko(n),a)}function UB(){if(!arguments.length)return[];var a=arguments[0];return a1(a)?a:[a]}function WB(a){return ht(a,w)}function $B(a,n){return n=typeof n=="function"?n:t,ht(a,w,n)}function jB(a){return ht(a,p|w)}function GB(a,n){return n=typeof n=="function"?n:t,ht(a,p|w,n)}function KB(a,n){return n==null||G6(a,n,e0(n))}function At(a,n){return a===n||a!==a&&n!==n}var XB=yn(yo),qB=yn(function(a,n){return a>=n}),Be=Q6(function(){return arguments}())?Q6:function(a){return P1(a)&&x1.call(a,"callee")&&!P6.call(a,"callee")},a1=k.isArray,YB=z6?D0(z6):nx;function L0(a){return a!=null&&Rn(a.length)&&!u2(a)}function D1(a){return P1(a)&&L0(a)}function ZB(a){return a===!0||a===!1||P1(a)&&z0(a)==Ut}var k2=hm||c5,QB=B6?D0(B6):ix;function JB(a){return P1(a)&&a.nodeType===1&&!b4(a)}function tM(a){if(a==null)return!0;if(L0(a)&&(a1(a)||typeof a=="string"||typeof a.splice=="function"||k2(a)||hr(a)||Be(a)))return!a.length;var n=h0(a);if(n==St||n==Ct)return!a.size;if(L4(a))return!Co(a).length;for(var l in a)if(x1.call(a,l))return!1;return!0}function eM(a,n){return S4(a,n)}function rM(a,n,l){l=typeof l=="function"?l:t;var s=l?l(a,n):t;return s===t?S4(a,n,t,l):!!s}function Qo(a){if(!P1(a))return!1;var n=z0(a);return n==it||n==C0||typeof a.message=="string"&&typeof a.name=="string"&&!b4(a)}function aM(a){return typeof a=="number"&&O6(a)}function u2(a){if(!T1(a))return!1;var n=z0(a);return n==ot||n==s4||n==S2||n==Vf}function oc(a){return typeof a=="number"&&a==n1(a)}function Rn(a){return typeof a=="number"&&a>-1&&a%1==0&&a<=O1}function T1(a){var n=typeof a;return a!=null&&(n=="object"||n=="function")}function P1(a){return a!=null&&typeof a=="object"}var lc=M6?D0(M6):lx;function nM(a,n){return a===n||So(a,n,Uo(n))}function iM(a,n,l){return l=typeof l=="function"?l:t,So(a,n,Uo(n),l)}function oM(a){return cc(a)&&a!=+a}function lM(a){if($x(a))throw new e1(i);return J6(a)}function cM(a){return a===null}function uM(a){return a==null}function cc(a){return typeof a=="number"||P1(a)&&z0(a)==h4}function b4(a){if(!P1(a)||z0(a)!=r2)return!1;var n=nn(a);if(n===null)return!0;var l=x1.call(n,"constructor")&&n.constructor;return typeof l=="function"&&l instanceof l&&tn.call(l)==im}var Jo=w6?D0(w6):cx;function sM(a){return oc(a)&&a>=-O1&&a<=O1}var uc=y6?D0(y6):ux;function En(a){return typeof a=="string"||!a1(a)&&P1(a)&&z0(a)==v4}function W0(a){return typeof a=="symbol"||P1(a)&&z0(a)==ja}var hr=H6?D0(H6):sx;function hM(a){return a===t}function dM(a){return P1(a)&&h0(a)==p4}function vM(a){return P1(a)&&z0(a)==Af}var pM=yn(Vo),fM=yn(function(a,n){return a<=n});function sc(a){if(!a)return[];if(L0(a))return En(a)?Vt(a):V0(a);if(m4&&a[m4])return Kg(a[m4]());var n=h0(a),l=n==St?po:n==Ct?Za:dr;return l(a)}function s2(a){if(!a)return a===0?a:0;if(a=pt(a),a===g1||a===-g1){var n=a<0?-1:1;return n*Dt}return a===a?a:0}function n1(a){var n=s2(a),l=n%1;return n===n?l?n-l:n:0}function hc(a){return a?ge(n1(a),0,b1):0}function pt(a){if(typeof a=="number")return a;if(W0(a))return wt;if(T1(a)){var n=typeof a.valueOf=="function"?a.valueOf():a;a=T1(n)?n+"":n}if(typeof a!="string")return a===0?a:+a;a=b6(a);var l=Yf.test(a);return l||Qf.test(a)?bg(a.slice(2),l?2:8):qf.test(a)?wt:+a}function dc(a){return $t(a,A0(a))}function gM(a){return a?ge(n1(a),-O1,O1):a===0?a:0}function m1(a){return a==null?"":U0(a)}var mM=cr(function(a,n){if(L4(n)||L0(n)){$t(n,e0(n),a);return}for(var l in n)x1.call(n,l)&&w4(a,l,n[l])}),vc=cr(function(a,n){$t(n,A0(n),a)}),Tn=cr(function(a,n,l,s){$t(n,A0(n),a,s)}),xM=cr(function(a,n,l,s){$t(n,e0(n),a,s)}),zM=l2(Bo);function BM(a,n){var l=lr(a);return n==null?l:j6(l,n)}var MM=o1(function(a,n){a=M1(a);var l=-1,s=n.length,v=s>2?n[2]:t;for(v&&B0(n[0],n[1],v)&&(s=1);++l<s;)for(var x=n[l],y=A0(x),V=-1,_=y.length;++V<_;){var F=y[V],O=a[F];(O===t||At(O,nr[F])&&!x1.call(a,F))&&(a[F]=x[F])}return a}),wM=o1(function(a){return a.push(t,bl),O0(pc,t,a)});function yM(a,n){return C6(a,Z(n,3),Wt)}function HM(a,n){return C6(a,Z(n,3),wo)}function SM(a,n){return a==null?a:Mo(a,Z(n,3),A0)}function CM(a,n){return a==null?a:Y6(a,Z(n,3),A0)}function VM(a,n){return a&&Wt(a,Z(n,3))}function LM(a,n){return a&&wo(a,Z(n,3))}function AM(a){return a==null?[]:fn(a,e0(a))}function bM(a){return a==null?[]:fn(a,A0(a))}function t5(a,n,l){var s=a==null?t:me(a,n);return s===t?l:s}function _M(a,n){return a!=null&&El(a,n,tx)}function e5(a,n){return a!=null&&El(a,n,ex)}var RM=Sl(function(a,n,l){n!=null&&typeof n.toString!="function"&&(n=en.call(n)),a[n]=l},a5(b0)),EM=Sl(function(a,n,l){n!=null&&typeof n.toString!="function"&&(n=en.call(n)),x1.call(a,n)?a[n].push(l):a[n]=[l]},Z),TM=o1(H4);function e0(a){return L0(a)?W6(a):Co(a)}function A0(a){return L0(a)?W6(a,!0):hx(a)}function kM(a,n){var l={};return n=Z(n,3),Wt(a,function(s,v,x){i2(l,n(s,v,x),s)}),l}function IM(a,n){var l={};return n=Z(n,3),Wt(a,function(s,v,x){i2(l,v,n(s,v,x))}),l}var NM=cr(function(a,n,l){gn(a,n,l)}),pc=cr(function(a,n,l,s){gn(a,n,l,s)}),PM=l2(function(a,n){var l={};if(a==null)return l;var s=!1;n=_1(n,function(x){return x=E2(x,a),s||(s=x.length>1),x}),$t(a,Oo(a),l),s&&(l=ht(l,p|H|w,Rx));for(var v=n.length;v--;)Ro(l,n[v]);return l});function FM(a,n){return fc(a,_n(Z(n)))}var OM=l2(function(a,n){return a==null?{}:vx(a,n)});function fc(a,n){if(a==null)return{};var l=_1(Oo(a),function(s){return[s]});return n=Z(n),ol(a,l,function(s,v){return n(s,v[0])})}function DM(a,n,l){n=E2(n,a);var s=-1,v=n.length;for(v||(v=1,a=t);++s<v;){var x=a==null?t:a[jt(n[s])];x===t&&(s=v,x=l),a=u2(x)?x.call(a):x}return a}function UM(a,n,l){return a==null?a:C4(a,n,l)}function WM(a,n,l,s){return s=typeof s=="function"?s:t,a==null?a:C4(a,n,l,s)}var gc=Ll(e0),mc=Ll(A0);function $M(a,n,l){var s=a1(a),v=s||k2(a)||hr(a);if(n=Z(n,4),l==null){var x=a&&a.constructor;v?l=s?new x:[]:T1(a)?l=u2(x)?lr(nn(a)):{}:l={}}return(v?ct:Wt)(a,function(y,V,_){return n(l,y,V,_)}),l}function jM(a,n){return a==null?!0:Ro(a,n)}function GM(a,n,l){return a==null?a:hl(a,n,ko(l))}function KM(a,n,l,s){return s=typeof s=="function"?s:t,a==null?a:hl(a,n,ko(l),s)}function dr(a){return a==null?[]:vo(a,e0(a))}function XM(a){return a==null?[]:vo(a,A0(a))}function qM(a,n,l){return l===t&&(l=n,n=t),l!==t&&(l=pt(l),l=l===l?l:0),n!==t&&(n=pt(n),n=n===n?n:0),ge(pt(a),n,l)}function YM(a,n,l){return n=s2(n),l===t?(l=n,n=0):l=s2(l),a=pt(a),rx(a,n,l)}function ZM(a,n,l){if(l&&typeof l!="boolean"&&B0(a,n,l)&&(n=l=t),l===t&&(typeof n=="boolean"?(l=n,n=t):typeof a=="boolean"&&(l=a,a=t)),a===t&&n===t?(a=0,n=1):(a=s2(a),n===t?(n=a,a=0):n=s2(n)),a>n){var s=a;a=n,n=s}if(l||a%1||n%1){var v=D6();return s0(a+v*(n-a+Ag("1e-"+((v+"").length-1))),n)}return Ao(a,n)}var QM=ur(function(a,n,l){return n=n.toLowerCase(),a+(l?xc(n):n)});function xc(a){return r5(m1(a).toLowerCase())}function zc(a){return a=m1(a),a&&a.replace(tg,Ug).replace(zg,"")}function JM(a,n,l){a=m1(a),n=U0(n);var s=a.length;l=l===t?s:ge(n1(l),0,s);var v=l;return l-=n.length,l>=0&&a.slice(l,v)==n}function tw(a){return a=m1(a),a&&Tf.test(a)?a.replace(Y7,Wg):a}function ew(a){return a=m1(a),a&&Of.test(a)?a.replace(Yi,"\\$&"):a}var rw=ur(function(a,n,l){return a+(l?"-":"")+n.toLowerCase()}),aw=ur(function(a,n,l){return a+(l?" ":"")+n.toLowerCase()}),nw=wl("toLowerCase");function iw(a,n,l){a=m1(a),n=n1(n);var s=n?ar(a):0;if(!n||s>=n)return a;var v=(n-s)/2;return wn(un(v),l)+a+wn(cn(v),l)}function ow(a,n,l){a=m1(a),n=n1(n);var s=n?ar(a):0;return n&&s<n?a+wn(n-s,l):a}function lw(a,n,l){a=m1(a),n=n1(n);var s=n?ar(a):0;return n&&s<n?wn(n-s,l)+a:a}function cw(a,n,l){return l||n==null?n=0:n&&(n=+n),fm(m1(a).replace(Zi,""),n||0)}function uw(a,n,l){return(l?B0(a,n,l):n===t)?n=1:n=n1(n),bo(m1(a),n)}function sw(){var a=arguments,n=m1(a[0]);return a.length<3?n:n.replace(a[1],a[2])}var hw=ur(function(a,n,l){return a+(l?"_":"")+n.toLowerCase()});function dw(a,n,l){return l&&typeof l!="number"&&B0(a,n,l)&&(n=l=t),l=l===t?b1:l>>>0,l?(a=m1(a),a&&(typeof n=="string"||n!=null&&!Jo(n))&&(n=U0(n),!n&&rr(a))?T2(Vt(a),0,l):a.split(n,l)):[]}var vw=ur(function(a,n,l){return a+(l?" ":"")+r5(n)});function pw(a,n,l){return a=m1(a),l=l==null?0:ge(n1(l),0,a.length),n=U0(n),a.slice(l,l+n.length)==n}function fw(a,n,l){var s=f.templateSettings;l&&B0(a,n,l)&&(n=t),a=m1(a),n=Tn({},n,s,Al);var v=Tn({},n.imports,s.imports,Al),x=e0(v),y=vo(v,x),V,_,F=0,O=n.interpolate||Ga,D="__p += '",$=fo((n.escape||Ga).source+"|"+O.source+"|"+(O===Z7?Xf:Ga).source+"|"+(n.evaluate||Ga).source+"|$","g"),K="//# sourceURL="+(x1.call(n,"sourceURL")?(n.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Hg+"]")+`
`;a.replace($,function(t1,c1,h1,$0,M0,j0){return h1||(h1=$0),D+=a.slice(F,j0).replace(eg,$g),c1&&(V=!0,D+=`' +
__e(`+c1+`) +
'`),M0&&(_=!0,D+=`';
`+M0+`;
__p += '`),h1&&(D+=`' +
((__t = (`+h1+`)) == null ? '' : __t) +
'`),F=j0+t1.length,t1}),D+=`';
`;var J=x1.call(n,"variable")&&n.variable;if(!J)D=`with (obj) {
`+D+`
}
`;else if(Gf.test(J))throw new e1(c);D=(_?D.replace(bf,""):D).replace(_f,"$1").replace(Rf,"$1;"),D="function("+(J||"obj")+`) {
`+(J?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(V?", __e = _.escape":"")+(_?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+D+`return __p
}`;var i1=Mc(function(){return p1(x,K+"return "+D).apply(t,y)});if(i1.source=D,Qo(i1))throw i1;return i1}function gw(a){return m1(a).toLowerCase()}function mw(a){return m1(a).toUpperCase()}function xw(a,n,l){if(a=m1(a),a&&(l||n===t))return b6(a);if(!a||!(n=U0(n)))return a;var s=Vt(a),v=Vt(n),x=_6(s,v),y=R6(s,v)+1;return T2(s,x,y).join("")}function zw(a,n,l){if(a=m1(a),a&&(l||n===t))return a.slice(0,T6(a)+1);if(!a||!(n=U0(n)))return a;var s=Vt(a),v=R6(s,Vt(n))+1;return T2(s,0,v).join("")}function Bw(a,n,l){if(a=m1(a),a&&(l||n===t))return a.replace(Zi,"");if(!a||!(n=U0(n)))return a;var s=Vt(a),v=_6(s,Vt(n));return T2(s,v).join("")}function Mw(a,n){var l=U,s=Y;if(T1(n)){var v="separator"in n?n.separator:v;l="length"in n?n1(n.length):l,s="omission"in n?U0(n.omission):s}a=m1(a);var x=a.length;if(rr(a)){var y=Vt(a);x=y.length}if(l>=x)return a;var V=l-ar(s);if(V<1)return s;var _=y?T2(y,0,V).join(""):a.slice(0,V);if(v===t)return _+s;if(y&&(V+=_.length-V),Jo(v)){if(a.slice(V).search(v)){var F,O=_;for(v.global||(v=fo(v.source,m1(Q7.exec(v))+"g")),v.lastIndex=0;F=v.exec(O);)var D=F.index;_=_.slice(0,D===t?V:D)}}else if(a.indexOf(U0(v),V)!=V){var $=_.lastIndexOf(v);$>-1&&(_=_.slice(0,$))}return _+s}function ww(a){return a=m1(a),a&&Ef.test(a)?a.replace(q7,Zg):a}var yw=ur(function(a,n,l){return a+(l?" ":"")+n.toUpperCase()}),r5=wl("toUpperCase");function Bc(a,n,l){return a=m1(a),n=l?t:n,n===t?Gg(a)?tm(a):Ng(a):a.match(n)||[]}var Mc=o1(function(a,n){try{return O0(a,t,n)}catch(l){return Qo(l)?l:new e1(l)}}),Hw=l2(function(a,n){return ct(n,function(l){l=jt(l),i2(a,l,Yo(a[l],a))}),a});function Sw(a){var n=a==null?0:a.length,l=Z();return a=n?_1(a,function(s){if(typeof s[1]!="function")throw new ut(o);return[l(s[0]),s[1]]}):[],o1(function(s){for(var v=-1;++v<n;){var x=a[v];if(O0(x[0],this,s))return O0(x[1],this,s)}})}function Cw(a){return Zm(ht(a,p))}function a5(a){return function(){return a}}function Vw(a,n){return a==null||a!==a?n:a}var Lw=Hl(),Aw=Hl(!0);function b0(a){return a}function n5(a){return tl(typeof a=="function"?a:ht(a,p))}function bw(a){return rl(ht(a,p))}function _w(a,n){return al(a,ht(n,p))}var Rw=o1(function(a,n){return function(l){return H4(l,a,n)}}),Ew=o1(function(a,n){return function(l){return H4(a,l,n)}});function i5(a,n,l){var s=e0(n),v=fn(n,s);l==null&&!(T1(n)&&(v.length||!s.length))&&(l=n,n=a,a=this,v=fn(n,e0(n)));var x=!(T1(l)&&"chain"in l)||!!l.chain,y=u2(a);return ct(v,function(V){var _=n[V];a[V]=_,y&&(a.prototype[V]=function(){var F=this.__chain__;if(x||F){var O=a(this.__wrapped__),D=O.__actions__=V0(this.__actions__);return D.push({func:_,args:arguments,thisArg:a}),O.__chain__=F,O}return _.apply(a,V2([this.value()],arguments))})}),a}function Tw(){return t0._===this&&(t0._=om),this}function o5(){}function kw(a){return a=n1(a),o1(function(n){return nl(n,a)})}var Iw=No(_1),Nw=No(S6),Pw=No(lo);function wc(a){return $o(a)?co(jt(a)):px(a)}function Fw(a){return function(n){return a==null?t:me(a,n)}}var Ow=Cl(),Dw=Cl(!0);function l5(){return[]}function c5(){return!1}function Uw(){return{}}function Ww(){return""}function $w(){return!0}function jw(a,n){if(a=n1(a),a<1||a>O1)return[];var l=b1,s=s0(a,b1);n=Z(n),a-=b1;for(var v=ho(s,n);++l<a;)n(l);return v}function Gw(a){return a1(a)?_1(a,jt):W0(a)?[a]:V0(Ul(m1(a)))}function Kw(a){var n=++nm;return m1(a)+n}var Xw=Mn(function(a,n){return a+n},0),qw=Po("ceil"),Yw=Mn(function(a,n){return a/n},1),Zw=Po("floor");function Qw(a){return a&&a.length?pn(a,b0,yo):t}function Jw(a,n){return a&&a.length?pn(a,Z(n,2),yo):t}function ty(a){return L6(a,b0)}function ey(a,n){return L6(a,Z(n,2))}function ry(a){return a&&a.length?pn(a,b0,Vo):t}function ay(a,n){return a&&a.length?pn(a,Z(n,2),Vo):t}var ny=Mn(function(a,n){return a*n},1),iy=Po("round"),oy=Mn(function(a,n){return a-n},0);function ly(a){return a&&a.length?so(a,b0):0}function cy(a,n){return a&&a.length?so(a,Z(n,2)):0}return f.after=bB,f.ary=Jl,f.assign=mM,f.assignIn=vc,f.assignInWith=Tn,f.assignWith=xM,f.at=zM,f.before=tc,f.bind=Yo,f.bindAll=Hw,f.bindKey=ec,f.castArray=UB,f.chain=Yl,f.chunk=Zx,f.compact=Qx,f.concat=Jx,f.cond=Sw,f.conforms=Cw,f.constant=a5,f.countBy=lB,f.create=BM,f.curry=rc,f.curryRight=ac,f.debounce=nc,f.defaults=MM,f.defaultsDeep=wM,f.defer=_B,f.delay=RB,f.difference=tz,f.differenceBy=ez,f.differenceWith=rz,f.drop=az,f.dropRight=nz,f.dropRightWhile=iz,f.dropWhile=oz,f.fill=lz,f.filter=uB,f.flatMap=dB,f.flatMapDeep=vB,f.flatMapDepth=pB,f.flatten=Gl,f.flattenDeep=cz,f.flattenDepth=uz,f.flip=EB,f.flow=Lw,f.flowRight=Aw,f.fromPairs=sz,f.functions=AM,f.functionsIn=bM,f.groupBy=fB,f.initial=dz,f.intersection=vz,f.intersectionBy=pz,f.intersectionWith=fz,f.invert=RM,f.invertBy=EM,f.invokeMap=mB,f.iteratee=n5,f.keyBy=xB,f.keys=e0,f.keysIn=A0,f.map=Ln,f.mapKeys=kM,f.mapValues=IM,f.matches=bw,f.matchesProperty=_w,f.memoize=bn,f.merge=NM,f.mergeWith=pc,f.method=Rw,f.methodOf=Ew,f.mixin=i5,f.negate=_n,f.nthArg=kw,f.omit=PM,f.omitBy=FM,f.once=TB,f.orderBy=zB,f.over=Iw,f.overArgs=kB,f.overEvery=Nw,f.overSome=Pw,f.partial=Zo,f.partialRight=ic,f.partition=BB,f.pick=OM,f.pickBy=fc,f.property=wc,f.propertyOf=Fw,f.pull=zz,f.pullAll=Xl,f.pullAllBy=Bz,f.pullAllWith=Mz,f.pullAt=wz,f.range=Ow,f.rangeRight=Dw,f.rearg=IB,f.reject=yB,f.remove=yz,f.rest=NB,f.reverse=Xo,f.sampleSize=SB,f.set=UM,f.setWith=WM,f.shuffle=CB,f.slice=Hz,f.sortBy=AB,f.sortedUniq=_z,f.sortedUniqBy=Rz,f.split=dw,f.spread=PB,f.tail=Ez,f.take=Tz,f.takeRight=kz,f.takeRightWhile=Iz,f.takeWhile=Nz,f.tap=Qz,f.throttle=FB,f.thru=Vn,f.toArray=sc,f.toPairs=gc,f.toPairsIn=mc,f.toPath=Gw,f.toPlainObject=dc,f.transform=$M,f.unary=OB,f.union=Pz,f.unionBy=Fz,f.unionWith=Oz,f.uniq=Dz,f.uniqBy=Uz,f.uniqWith=Wz,f.unset=jM,f.unzip=qo,f.unzipWith=ql,f.update=GM,f.updateWith=KM,f.values=dr,f.valuesIn=XM,f.without=$z,f.words=Bc,f.wrap=DB,f.xor=jz,f.xorBy=Gz,f.xorWith=Kz,f.zip=Xz,f.zipObject=qz,f.zipObjectDeep=Yz,f.zipWith=Zz,f.entries=gc,f.entriesIn=mc,f.extend=vc,f.extendWith=Tn,i5(f,f),f.add=Xw,f.attempt=Mc,f.camelCase=QM,f.capitalize=xc,f.ceil=qw,f.clamp=qM,f.clone=WB,f.cloneDeep=jB,f.cloneDeepWith=GB,f.cloneWith=$B,f.conformsTo=KB,f.deburr=zc,f.defaultTo=Vw,f.divide=Yw,f.endsWith=JM,f.eq=At,f.escape=tw,f.escapeRegExp=ew,f.every=cB,f.find=sB,f.findIndex=$l,f.findKey=yM,f.findLast=hB,f.findLastIndex=jl,f.findLastKey=HM,f.floor=Zw,f.forEach=Zl,f.forEachRight=Ql,f.forIn=SM,f.forInRight=CM,f.forOwn=VM,f.forOwnRight=LM,f.get=t5,f.gt=XB,f.gte=qB,f.has=_M,f.hasIn=e5,f.head=Kl,f.identity=b0,f.includes=gB,f.indexOf=hz,f.inRange=YM,f.invoke=TM,f.isArguments=Be,f.isArray=a1,f.isArrayBuffer=YB,f.isArrayLike=L0,f.isArrayLikeObject=D1,f.isBoolean=ZB,f.isBuffer=k2,f.isDate=QB,f.isElement=JB,f.isEmpty=tM,f.isEqual=eM,f.isEqualWith=rM,f.isError=Qo,f.isFinite=aM,f.isFunction=u2,f.isInteger=oc,f.isLength=Rn,f.isMap=lc,f.isMatch=nM,f.isMatchWith=iM,f.isNaN=oM,f.isNative=lM,f.isNil=uM,f.isNull=cM,f.isNumber=cc,f.isObject=T1,f.isObjectLike=P1,f.isPlainObject=b4,f.isRegExp=Jo,f.isSafeInteger=sM,f.isSet=uc,f.isString=En,f.isSymbol=W0,f.isTypedArray=hr,f.isUndefined=hM,f.isWeakMap=dM,f.isWeakSet=vM,f.join=gz,f.kebabCase=rw,f.last=vt,f.lastIndexOf=mz,f.lowerCase=aw,f.lowerFirst=nw,f.lt=pM,f.lte=fM,f.max=Qw,f.maxBy=Jw,f.mean=ty,f.meanBy=ey,f.min=ry,f.minBy=ay,f.stubArray=l5,f.stubFalse=c5,f.stubObject=Uw,f.stubString=Ww,f.stubTrue=$w,f.multiply=ny,f.nth=xz,f.noConflict=Tw,f.noop=o5,f.now=An,f.pad=iw,f.padEnd=ow,f.padStart=lw,f.parseInt=cw,f.random=ZM,f.reduce=MB,f.reduceRight=wB,f.repeat=uw,f.replace=sw,f.result=DM,f.round=iy,f.runInContext=L,f.sample=HB,f.size=VB,f.snakeCase=hw,f.some=LB,f.sortedIndex=Sz,f.sortedIndexBy=Cz,f.sortedIndexOf=Vz,f.sortedLastIndex=Lz,f.sortedLastIndexBy=Az,f.sortedLastIndexOf=bz,f.startCase=vw,f.startsWith=pw,f.subtract=oy,f.sum=ly,f.sumBy=cy,f.template=fw,f.times=jw,f.toFinite=s2,f.toInteger=n1,f.toLength=hc,f.toLower=gw,f.toNumber=pt,f.toSafeInteger=gM,f.toString=m1,f.toUpper=mw,f.trim=xw,f.trimEnd=zw,f.trimStart=Bw,f.truncate=Mw,f.unescape=ww,f.uniqueId=Kw,f.upperCase=yw,f.upperFirst=r5,f.each=Zl,f.eachRight=Ql,f.first=Kl,i5(f,function(){var a={};return Wt(f,function(n,l){x1.call(f.prototype,l)||(a[l]=n)}),a}(),{chain:!1}),f.VERSION=e,ct(["bind","bindKey","curry","curryRight","partial","partialRight"],function(a){f[a].placeholder=f}),ct(["drop","take"],function(a,n){u1.prototype[a]=function(l){l=l===t?1:X1(n1(l),0);var s=this.__filtered__&&!n?new u1(this):this.clone();return s.__filtered__?s.__takeCount__=s0(l,s.__takeCount__):s.__views__.push({size:s0(l,b1),type:a+(s.__dir__<0?"Right":"")}),s},u1.prototype[a+"Right"]=function(l){return this.reverse()[a](l).reverse()}}),ct(["filter","map","takeWhile"],function(a,n){var l=n+1,s=l==P0||l==Ot;u1.prototype[a]=function(v){var x=this.clone();return x.__iteratees__.push({iteratee:Z(v,3),type:l}),x.__filtered__=x.__filtered__||s,x}}),ct(["head","last"],function(a,n){var l="take"+(n?"Right":"");u1.prototype[a]=function(){return this[l](1).value()[0]}}),ct(["initial","tail"],function(a,n){var l="drop"+(n?"":"Right");u1.prototype[a]=function(){return this.__filtered__?new u1(this):this[l](1)}}),u1.prototype.compact=function(){return this.filter(b0)},u1.prototype.find=function(a){return this.filter(a).head()},u1.prototype.findLast=function(a){return this.reverse().find(a)},u1.prototype.invokeMap=o1(function(a,n){return typeof a=="function"?new u1(this):this.map(function(l){return H4(l,a,n)})}),u1.prototype.reject=function(a){return this.filter(_n(Z(a)))},u1.prototype.slice=function(a,n){a=n1(a);var l=this;return l.__filtered__&&(a>0||n<0)?new u1(l):(a<0?l=l.takeRight(-a):a&&(l=l.drop(a)),n!==t&&(n=n1(n),l=n<0?l.dropRight(-n):l.take(n-a)),l)},u1.prototype.takeRightWhile=function(a){return this.reverse().takeWhile(a).reverse()},u1.prototype.toArray=function(){return this.take(b1)},Wt(u1.prototype,function(a,n){var l=/^(?:filter|find|map|reject)|While$/.test(n),s=/^(?:head|last)$/.test(n),v=f[s?"take"+(n=="last"?"Right":""):n],x=s||/^find/.test(n);v&&(f.prototype[n]=function(){var y=this.__wrapped__,V=s?[1]:arguments,_=y instanceof u1,F=V[0],O=_||a1(y),D=function(c1){var h1=v.apply(f,V2([c1],V));return s&&$?h1[0]:h1};O&&l&&typeof F=="function"&&F.length!=1&&(_=O=!1);var $=this.__chain__,K=!!this.__actions__.length,J=x&&!$,i1=_&&!K;if(!x&&O){y=i1?y:new u1(this);var t1=a.apply(y,V);return t1.__actions__.push({func:Vn,args:[D],thisArg:t}),new st(t1,$)}return J&&i1?a.apply(this,V):(t1=this.thru(D),J?s?t1.value()[0]:t1.value():t1)})}),ct(["pop","push","shift","sort","splice","unshift"],function(a){var n=Qa[a],l=/^(?:push|sort|unshift)$/.test(a)?"tap":"thru",s=/^(?:pop|shift)$/.test(a);f.prototype[a]=function(){var v=arguments;if(s&&!this.__chain__){var x=this.value();return n.apply(a1(x)?x:[],v)}return this[l](function(y){return n.apply(a1(y)?y:[],v)})}}),Wt(u1.prototype,function(a,n){var l=f[n];if(l){var s=l.name+"";x1.call(or,s)||(or[s]=[]),or[s].push({name:n,func:l})}}),or[Bn(t,M).name]=[{name:"wrapper",func:t}],u1.prototype.clone=wm,u1.prototype.reverse=ym,u1.prototype.value=Hm,f.prototype.at=Jz,f.prototype.chain=tB,f.prototype.commit=eB,f.prototype.next=rB,f.prototype.plant=nB,f.prototype.reverse=iB,f.prototype.toJSON=f.prototype.valueOf=f.prototype.value=oB,f.prototype.first=f.prototype.head,m4&&(f.prototype[m4]=aB),f},A2=em();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(t0._=A2,define(function(){return A2})):de?((de.exports=A2)._=A2,ao._=A2):t0._=A2}).call(o4)});var Hf=B(nd());var N0=B(X());var $1=B(X());var l1=B(X());function ya(){return ya=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},ya.apply(this,arguments)}var Qt;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Qt||(Qt={}));var id="popstate";function cd(t){t===void 0&&(t={});function e(i,o){let{pathname:c,search:u,hash:h}=i.location;return b8("",{pathname:c,search:u,hash:h},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(i,o){return typeof o=="string"?o:Ie(o)}return RS(e,r,null,t)}function J0(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function _S(){return Math.random().toString(36).substr(2,8)}function od(t,e){return{usr:t.state,key:t.key,idx:e}}function b8(t,e,r,i){return r===void 0&&(r=null),ya({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?Ne(e):e,{state:r,key:e&&e.key||i||_S()})}function Ie(t){let{pathname:e="/",search:r="",hash:i=""}=t;return r&&r!=="?"&&(e+=r.charAt(0)==="?"?r:"?"+r),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function Ne(t){let e={};if(t){let r=t.indexOf("#");r>=0&&(e.hash=t.substr(r),t=t.substr(0,r));let i=t.indexOf("?");i>=0&&(e.search=t.substr(i),t=t.substr(0,i)),t&&(e.pathname=t)}return e}function RS(t,e,r,i){i===void 0&&(i={});let{window:o=document.defaultView,v5Compat:c=!1}=i,u=o.history,h=Qt.Pop,d=null,p=H();p==null&&(p=0,u.replaceState(ya({},u.state,{idx:p}),""));function H(){return(u.state||{idx:null}).idx}function w(){h=Qt.Pop;let S=H(),g=S==null?null:S-p;p=S,d&&d({action:h,location:M.location,delta:g})}function C(S,g){h=Qt.Push;let m=b8(M.location,S,g);r&&r(m,S),p=H()+1;let z=od(m,p),b=M.createHref(m);try{u.pushState(z,"",b)}catch(I){if(I instanceof DOMException&&I.name==="DataCloneError")throw I;o.location.assign(b)}c&&d&&d({action:h,location:M.location,delta:1})}function A(S,g){h=Qt.Replace;let m=b8(M.location,S,g);r&&r(m,S),p=H();let z=od(m,p),b=M.createHref(m);u.replaceState(z,"",b),c&&d&&d({action:h,location:M.location,delta:0})}function E(S){let g=o.location.origin!=="null"?o.location.origin:o.location.href,m=typeof S=="string"?S:Ie(S);return J0(g,"No window.location.(origin|href) available to create URL for href: "+m),new URL(m,g)}let M={get action(){return h},get location(){return t(o,u)},listen(S){if(d)throw new Error("A history only accepts one active listener");return o.addEventListener(id,w),d=S,()=>{o.removeEventListener(id,w),d=null}},createHref(S){return e(o,S)},createURL:E,encodeLocation(S){let g=E(S);return{pathname:g.pathname,search:g.search,hash:g.hash}},push:C,replace:A,go(S){return u.go(S)}};return M}var ld;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(ld||(ld={}));function ai(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let r=e.endsWith("/")?e.length-1:e.length,i=t.charAt(r);return i&&i!=="/"?null:t.slice(r)||"/"}function _8(t,e){e===void 0&&(e="/");let{pathname:r,search:i="",hash:o=""}=typeof t=="string"?Ne(t):t;return{pathname:r?r.startsWith("/")?r:ES(r,e):e,search:TS(i),hash:kS(o)}}function ES(t,e){let r=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function A8(t,e,r,i){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function R8(t){return t.filter((e,r)=>r===0||e.route.path&&e.route.path.length>0)}function E8(t,e,r,i){i===void 0&&(i=!1);let o;typeof t=="string"?o=Ne(t):(o=ya({},t),J0(!o.pathname||!o.pathname.includes("?"),A8("?","pathname","search",o)),J0(!o.pathname||!o.pathname.includes("#"),A8("#","pathname","hash",o)),J0(!o.search||!o.search.includes("#"),A8("#","search","hash",o)));let c=t===""||o.pathname==="",u=c?"/":o.pathname,h;if(i||u==null)h=r;else{let w=e.length-1;if(u.startsWith("..")){let C=u.split("/");for(;C[0]==="..";)C.shift(),w-=1;o.pathname=C.join("/")}h=w>=0?e[w]:"/"}let d=_8(o,h),p=u&&u!=="/"&&u.endsWith("/"),H=(c||u===".")&&r.endsWith("/");return!d.pathname.endsWith("/")&&(p||H)&&(d.pathname+="/"),d}var ni=t=>t.join("/").replace(/\/\/+/g,"/");var TS=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,kS=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;var ud=["post","put","patch","delete"],LA=new Set(ud),IS=["get",...ud],AA=new Set(IS);var bA=Symbol("deferred");function T8(){return T8=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},T8.apply(this,arguments)}var ii=l1.createContext(null);var Pe=l1.createContext(null),oi=l1.createContext(null),Wr=l1.createContext({outlet:null,matches:[],isDataRoute:!1});function I8(t,e){let{relative:r}=e===void 0?{}:e;Ha()||J0(!1);let{basename:i,navigator:o}=l1.useContext(Pe),{hash:c,pathname:u,search:h}=li(t,{relative:r}),d=u;return i!=="/"&&(d=u==="/"?i:ni([i,u])),o.createHref({pathname:d,search:h,hash:c})}function Ha(){return l1.useContext(oi)!=null}function Fe(){return Ha()||J0(!1),l1.useContext(oi).location}function vd(t){l1.useContext(Pe).static||l1.useLayoutEffect(t)}function N8(){let{isDataRoute:t}=l1.useContext(Wr);return t?KS():WS()}function WS(){Ha()||J0(!1);let t=l1.useContext(ii),{basename:e,navigator:r}=l1.useContext(Pe),{matches:i}=l1.useContext(Wr),{pathname:o}=Fe(),c=JSON.stringify(R8(i).map(d=>d.pathnameBase)),u=l1.useRef(!1);return vd(()=>{u.current=!0}),l1.useCallback(function(d,p){if(p===void 0&&(p={}),!u.current)return;if(typeof d=="number"){r.go(d);return}let H=E8(d,JSON.parse(c),o,p.relative==="path");t==null&&e!=="/"&&(H.pathname=H.pathname==="/"?e:ni([e,H.pathname])),(p.replace?r.replace:r.push)(H,p.state,p)},[e,r,c,o,t])}function li(t,e){let{relative:r}=e===void 0?{}:e,{matches:i}=l1.useContext(Wr),{pathname:o}=Fe(),c=JSON.stringify(R8(i).map(u=>u.pathnameBase));return l1.useMemo(()=>E8(t,JSON.parse(c),o,r==="path"),[t,c,o,r])}var pd=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(pd||{}),fd=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(fd||{});function $S(t){let e=l1.useContext(ii);return e||J0(!1),e}function jS(t){let e=l1.useContext(Wr);return e||J0(!1),e}function GS(t){let e=jS(t),r=e.matches[e.matches.length-1];return r.route.id||J0(!1),r.route.id}function KS(){let{router:t}=$S(pd.UseNavigateStable),e=GS(fd.UseNavigateStable),r=l1.useRef(!1);return vd(()=>{r.current=!0}),l1.useCallback(function(o,c){c===void 0&&(c={}),r.current&&(typeof o=="number"?t.navigate(o):t.navigate(o,T8({fromRouteId:e},c)))},[t,e])}var XS="startTransition",NA=l1[XS];function P8(t){let{basename:e="/",children:r=null,location:i,navigationType:o=Qt.Pop,navigator:c,static:u=!1}=t;Ha()&&J0(!1);let h=e.replace(/^\/*/,"/"),d=l1.useMemo(()=>({basename:h,navigator:c,static:u}),[h,c,u]);typeof i=="string"&&(i=Ne(i));let{pathname:p="/",search:H="",hash:w="",state:C=null,key:A="default"}=i,E=l1.useMemo(()=>{let M=ai(p,h);return M==null?null:{location:{pathname:M,search:H,hash:w,state:C,key:A},navigationType:o}},[h,p,H,w,C,A,o]);return E==null?null:l1.createElement(Pe.Provider,{value:d},l1.createElement(oi.Provider,{children:r,value:E}))}var PA=new Promise(()=>{});function F8(){return F8=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},F8.apply(this,arguments)}function eC(t,e){if(t==null)return{};var r={},i=Object.keys(t),o,c;for(c=0;c<i.length;c++)o=i[c],!(e.indexOf(o)>=0)&&(r[o]=t[o]);return r}function rC(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function aC(t,e){return t.button===0&&(!e||e==="_self")&&!rC(t)}var nC=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"];var iC="startTransition",gd=$1[iC];function zd(t){let{basename:e,children:r,future:i,window:o}=t,c=$1.useRef();c.current==null&&(c.current=cd({window:o,v5Compat:!0}));let u=c.current,[h,d]=$1.useState({action:u.action,location:u.location}),{v7_startTransition:p}=i||{},H=$1.useCallback(w=>{p&&gd?gd(()=>d(w)):d(w)},[d,p]);return $1.useLayoutEffect(()=>u.listen(H),[u,H]),$1.createElement(P8,{basename:e,children:r,location:h.location,navigationType:h.action,navigator:u})}var oC=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",lC=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ae=$1.forwardRef(function(e,r){let{onClick:i,relative:o,reloadDocument:c,replace:u,state:h,target:d,to:p,preventScrollReset:H,unstable_viewTransition:w}=e,C=eC(e,nC),{basename:A}=$1.useContext(Pe),E,M=!1;if(typeof p=="string"&&lC.test(p)&&(E=p,oC))try{let z=new URL(window.location.href),b=p.startsWith("//")?new URL(z.protocol+p):new URL(p),I=ai(b.pathname,A);b.origin===z.origin&&I!=null?p=I+b.search+b.hash:M=!0}catch{}let S=I8(p,{relative:o}),g=cC(p,{replace:u,state:h,target:d,preventScrollReset:H,relative:o,unstable_viewTransition:w});function m(z){i&&i(z),z.defaultPrevented||g(z)}return $1.createElement("a",F8({},C,{href:E||S,onClick:M||c?i:m,ref:r,target:d}))});var md;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(md||(md={}));var xd;(function(t){t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(xd||(xd={}));function cC(t,e){let{target:r,replace:i,state:o,preventScrollReset:c,relative:u,unstable_viewTransition:h}=e===void 0?{}:e,d=N8(),p=Fe(),H=li(t,{relative:u});return $1.useCallback(w=>{if(aC(w,r)){w.preventDefault();let C=i!==void 0?i:Ie(p)===Ie(H);d(t,{replace:C,state:o,preventScrollReset:c,relative:u,unstable_viewTransition:h})}},[p,d,H,i,o,r,t,c,u,h])}var wf=B(yd());var $r=B(X());var U8=B(X()),W8={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Sa=U8.default.createContext&&U8.default.createContext(W8);var ne=function(){return ne=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++){e=arguments[r];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},ne.apply(this,arguments)},CC=function(t,e){var r={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,i=Object.getOwnPropertySymbols(t);o<i.length;o++)e.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(t,i[o])&&(r[i[o]]=t[i[o]]);return r};function Hd(t){return t&&t.map(function(e,r){return $r.default.createElement(e.tag,ne({key:r},e.attr),Hd(e.child))})}function Oe(t){return function(e){return $r.default.createElement(VC,ne({attr:ne({},t.attr)},e),Hd(t.child))}}function VC(t){var e=function(r){var i=t.attr,o=t.size,c=t.title,u=CC(t,["attr","size","title"]),h=o||r.size||"1em",d;return r.className&&(d=r.className),t.className&&(d=(d?d+" ":"")+t.className),$r.default.createElement("svg",ne({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,i,u,{className:d,style:ne(ne({color:t.color||r.color},r.style),t.style),height:h,width:h,xmlns:"http://www.w3.org/2000/svg"}),c&&$r.default.createElement("title",null,c),t.children)};return Sa!==void 0?$r.default.createElement(Sa.Consumer,null,function(r){return e(r)}):e(W8)}function Sd(t){return Oe({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"m11.998 17 7-8h-14z"}}]})(t)}function Cd(t){return Oe({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"}}]})(t)}function Vd(t){return Oe({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"}}]})(t)}function Ld(t){return Oe({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"}}]})(t)}function Ad(t){return Oe({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"}}]})(t)}function ci(t){return Oe({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"}}]})(t)}var Ed=B(Q()),Td=B(R()),TC={baseline:"vuiFlexContainer--alignItemsBaseline",center:"vuiFlexContainer--alignItemsCenter",end:"vuiFlexContainer--alignItemsEnd",start:"vuiFlexContainer--alignItemsStart",stretch:"vuiFlexContainer--alignItemsStretch"},kC={column:"vuiFlexContainer--directionColumn",columnReverse:"vuiFlexContainer--directionColumnReverse",row:"vuiFlexContainer--directionRow",rowReverse:"vuiFlexContainer--directionRowReverse"},IC={center:"vuiFlexContainer--justifyContentCenter",end:"vuiFlexContainer--justifyContentEnd",start:"vuiFlexContainer--justifyContentStart",spaceAround:"vuiFlexContainer--justifyContentSpaceAround",spaceBetween:"vuiFlexContainer--justifyContentSpaceBetween",spaceEvenly:"vuiFlexContainer--justifyContentSpaceEvenly"},NC={none:"vuiFlexContainer--spacingNone",xxs:"vuiFlexContainer--spacingXxs",xs:"vuiFlexContainer--spacingXs",s:"vuiFlexContainer--spacingS",m:"vuiFlexContainer--spacingM",l:"vuiFlexContainer--spacingL",xl:"vuiFlexContainer--spacingXl",xxl:"vuiFlexContainer--spacingXxl"},f1=({children:t,alignItems:e="stretch",direction:r="row",justifyContent:i="start",spacing:o="m",wrap:c,className:u,fullWidth:h,...d})=>{let p=(0,Ed.default)(u,"vuiFlexContainer",TC[e],kC[r],IC[i],NC[o],{"vuiFlexContainer--wrap":c,"vuiFlexContainer--fullWidth":h});return(0,Td.jsx)("div",{className:p,...d,children:t})};var kd=B(Q()),Id=B(R());var PC={baseline:"vuiFlexItem--alignItemsBaseline",center:"vuiFlexItem--alignItemsCenter",end:"vuiFlexItem--alignItemsEnd",start:"vuiFlexItem--alignItemsStart",stretch:"vuiFlexItem--alignItemsStretch"},d1=({children:t,grow:e,shrink:r,basis:i="auto",alignItems:o="stretch",className:c,truncate:u,...h})=>{let d=e===!1,p=r===!1,H=(0,kd.default)("vuiFlexItem",`vuiFlexItem--${i}`,PC[o],{[`vuiFlexItem--flexGrow${e}`]:typeof e=="number","vuiFlexItem--flexGrowNone":d,[`vuiFlexItem--flexShrink${r}`]:typeof r=="number","vuiFlexItem--flexShrinkNone":p,"vuiFlexItem--truncate":u},c);return(0,Id.jsx)("div",{className:H,...h,children:t})};var $8=B(Q()),Nd=B(X());var j8=B(R()),FC={xs:"14",s:"16",m:"20",l:"24",xl:"28",xxl:"46",xxxl:"68"},B1=({children:t,size:e="m",color:r="inherit",className:i,inline:o,...c})=>{let u=(0,$8.default)(i,"vuiIcon__inner",{[`vuiIcon--${r}`]:r}),h=(0,$8.default)("vuiIcon",{"vuiIcon--inline":o}),d=(0,Nd.cloneElement)(t,{size:FC[e]});return(0,j8.jsx)(Sa.Provider,{value:{className:u},children:(0,j8.jsx)("div",{className:h,...c,children:d})})};var G8=B(R());var OC=B(R());var Ti=B(X()),$V=B(Q());var hi=B(X()),Pd=B(V8()),Gr=({children:t})=>{let e=(0,hi.useRef)(null);return(0,hi.useEffect)(()=>(e.current=document.createElement("div"),document.body.appendChild(e.current),()=>{e.current?.parentNode?.removeChild(e.current)}),[]),e.current?(0,Pd.createPortal)(t,e.current):null};var Z1=function(){return Z1=Object.assign||function(e){for(var r,i=1,o=arguments.length;i<o;i++){r=arguments[i];for(var c in r)Object.prototype.hasOwnProperty.call(r,c)&&(e[c]=r[c])}return e},Z1.apply(this,arguments)};function De(t,e){var r={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,i=Object.getOwnPropertySymbols(t);o<i.length;o++)e.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(t,i[o])&&(r[i[o]]=t[i[o]]);return r}function Fd(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var i=Array(t),o=0,e=0;e<r;e++)for(var c=arguments[e],u=0,h=c.length;u<h;u++,o++)i[o]=c[u];return i}function Od(t,e,r){if(r||arguments.length===2)for(var i=0,o=e.length,c;i<o;i++)(c||!(i in e))&&(c||(c=Array.prototype.slice.call(e,0,i)),c[i]=e[i]);return t.concat(c||Array.prototype.slice.call(e))}var ka=B(X());var Jt=B(X());var m0=B(X());var Ue="right-scroll-bar-position",We="width-before-scroll-bar",K8="with-scroll-bars-hidden",X8="--removed-body-scroll-bar-size";function Dd(t,e){return typeof t=="function"?t(e):t&&(t.current=e),t}var Ud=B(X());function Wd(t,e){var r=(0,Ud.useState)(function(){return{value:t,callback:e,facade:{get current(){return r.value},set current(i){var o=r.value;o!==i&&(r.value=i,r.callback(i,o))}}}})[0];return r.callback=e,r.facade}function Ca(t,e){return Wd(e||null,function(r){return t.forEach(function(i){return Dd(i,r)})})}function $d(t){return t}function jd(t,e){e===void 0&&(e=$d);var r=[],i=!1,o={read:function(){if(i)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return r.length?r[r.length-1]:t},useMedium:function(c){var u=e(c,i);return r.push(u),function(){r=r.filter(function(h){return h!==u})}},assignSyncMedium:function(c){for(i=!0;r.length;){var u=r;r=[],u.forEach(c)}r={push:function(h){return c(h)},filter:function(){return r}}},assignMedium:function(c){i=!0;var u=[];if(r.length){var h=r;r=[],h.forEach(c),u=r}var d=function(){var H=u;u=[],H.forEach(c)},p=function(){return Promise.resolve().then(d)};p(),r={push:function(H){u.push(H),p()},filter:function(H){return u=u.filter(H),r}}}};return o}function Va(t,e){return e===void 0&&(e=$d),jd(t,e)}function $e(t){t===void 0&&(t={});var e=jd(null);return e.options=Z1({async:!0,ssr:!1},t),e}var Gd=B(X()),Kd=function(t){var e=t.sideCar,r=De(t,["sideCar"]);if(!e)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var i=e.read();if(!i)throw new Error("Sidecar medium not found");return Gd.createElement(i,Z1({},r))};Kd.isSideCarExport=!0;function je(t,e){return t.useMedium(e),Kd}var di=$e();var q8=function(){},vi=m0.forwardRef(function(t,e){var r=m0.useRef(null),i=m0.useState({onScrollCapture:q8,onWheelCapture:q8,onTouchMoveCapture:q8}),o=i[0],c=i[1],u=t.forwardProps,h=t.children,d=t.className,p=t.removeScrollBar,H=t.enabled,w=t.shards,C=t.sideCar,A=t.noIsolation,E=t.inert,M=t.allowPinchZoom,S=t.as,g=S===void 0?"div":S,m=t.gapMode,z=De(t,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),b=C,I=Ca([r,e]),T=Z1(Z1({},z),o);return m0.createElement(m0.Fragment,null,H&&m0.createElement(b,{sideCar:di,removeScrollBar:p,shards:w,noIsolation:A,inert:E,setCallbacks:c,allowPinchZoom:!!M,lockRef:r,gapMode:m}),u?m0.cloneElement(m0.Children.only(h),Z1(Z1({},T),{ref:I})):m0.createElement(g,Z1({},T,{className:d,ref:I}),h))});vi.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};vi.classNames={fullWidth:We,zeroRight:Ue};function Kr(){return Kr=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},Kr.apply(this,arguments)}var L1=B(X());var La="data-focus-lock",pi="data-focus-lock-disabled",Xd="data-no-focus-lock",qd="data-autofocus-inside",Yd="data-no-autofocus";var Jd=B(X());var Xr=B(X());var qr={width:"1px",height:"0px",padding:0,overflow:"hidden",position:"fixed",top:"1px",left:"1px"},Zd=function(e){var r=e.children;return Xr.createElement(Xr.Fragment,null,Xr.createElement("div",{key:"guard-first","data-focus-guard":!0,"data-focus-auto-guard":!0,style:qr}),r,r&&Xr.createElement("div",{key:"guard-last","data-focus-guard":!0,"data-focus-auto-guard":!0,style:qr}))};Zd.propTypes={};Zd.defaultProps={children:null};var fi=Va({},function(t){var e=t.target,r=t.currentTarget;return{target:e,currentTarget:r}}),gi=Va(),Qd=Va(),mi=$e({async:!0});var UC=[],Y8=L1.forwardRef(function(e,r){var i,o=L1.useState(),c=o[0],u=o[1],h=L1.useRef(),d=L1.useRef(!1),p=L1.useRef(null),H=e.children,w=e.disabled,C=e.noFocusGuards,A=e.persistentFocus,E=e.crossFrame,M=e.autoFocus,S=e.allowTextSelection,g=e.group,m=e.className,z=e.whiteList,b=e.hasPositiveIndices,I=e.shards,T=I===void 0?UC:I,P=e.as,U=P===void 0?"div":P,Y=e.lockProps,r1=Y===void 0?{}:Y,G1=e.sideCar,P0=e.returnFocus,he=e.focusOptions,Ot=e.onActivation,g1=e.onDeactivation,O1=L1.useState({}),Dt=O1[0],wt=L1.useCallback(function(){p.current=p.current||document&&document.activeElement,h.current&&Ot&&Ot(h.current),d.current=!0},[Ot]),b1=L1.useCallback(function(){d.current=!1,g1&&g1(h.current)},[g1]);(0,Jd.useEffect)(function(){w||(p.current=null)},[]);var u4=L1.useCallback(function(C0){var it=p.current;if(it&&it.focus){var ot=typeof P0=="function"?P0(it):P0;if(ot){var s4=typeof ot=="object"?ot:void 0;p.current=null,C0?Promise.resolve().then(function(){return it.focus(s4)}):it.focus(s4)}}},[P0]),nt=L1.useCallback(function(C0){d.current&&fi.useMedium(C0)},[]),e2=gi.useMedium,F0=L1.useCallback(function(C0){h.current!==C0&&(h.current=C0,u(C0))},[]),yt=Kr((i={},i[pi]=w&&"disabled",i[La]=g,i),r1),S2=C!==!0,Ut=S2&&C!=="tail",Ht=Ca([r,F0]);return L1.createElement(L1.Fragment,null,S2&&[L1.createElement("div",{key:"guard-first","data-focus-guard":!0,tabIndex:w?-1:0,style:qr}),b?L1.createElement("div",{key:"guard-nearest","data-focus-guard":!0,tabIndex:w?-1:1,style:qr}):null],!w&&L1.createElement(G1,{id:Dt,sideCar:mi,observed:c,disabled:w,persistentFocus:A,crossFrame:E,autoFocus:M,whiteList:z,shards:T,onActivation:wt,onDeactivation:b1,returnFocus:u4,focusOptions:he}),L1.createElement(U,Kr({ref:Ht},yt,{className:m,onBlur:e2,onFocus:nt}),H),Ut&&L1.createElement("div",{"data-focus-guard":!0,tabIndex:w?-1:0,style:qr}))});Y8.propTypes={};Y8.defaultProps={children:void 0,disabled:!1,returnFocus:!1,focusOptions:void 0,noFocusGuards:!1,autoFocus:!0,persistentFocus:!1,crossFrame:!0,hasPositiveIndices:void 0,allowTextSelection:void 0,group:void 0,className:void 0,whiteList:void 0,shards:void 0,as:"div",lockProps:{},onActivation:void 0,onDeactivation:void 0};var tv=Y8;function xi(t){setTimeout(t,1)}var ev=tv;var zi=$e(),Bi="data-focus-on-hidden";var WC={preventScroll:!0},rv=Jt.forwardRef(function(t,e){var r=Jt.useState(!1),i=r[0],o=r[1],c=t.children,u=t.autoFocus,h=t.shards,d=t.crossFrame,p=t.enabled,H=p===void 0?!0:p,w=t.scrollLock,C=w===void 0?!0:w,A=t.focusLock,E=A===void 0?!0:A,M=t.returnFocus,S=M===void 0?!0:M,g=t.inert,m=t.allowPinchZoom,z=t.sideCar,b=t.className,I=t.shouldIgnore,T=t.preventScrollOnFocus,P=t.style,U=t.as,Y=t.gapMode,r1=De(t,["children","autoFocus","shards","crossFrame","enabled","scrollLock","focusLock","returnFocus","inert","allowPinchZoom","sideCar","className","shouldIgnore","preventScrollOnFocus","style","as","gapMode"]),G1=z,P0=i.onActivation,he=i.onDeactivation,Ot=De(i,["onActivation","onDeactivation"]),g1=Z1(Z1({},Ot),{as:U,style:P,sideCar:z,shards:h,allowPinchZoom:m,gapMode:Y,inert:g,enabled:H&&C});return Jt.createElement(Jt.Fragment,null,Jt.createElement(ev,{ref:e,sideCar:z,disabled:!(i&&H&&E),returnFocus:S,autoFocus:u,shards:h,crossFrame:d,onActivation:P0,onDeactivation:he,className:b,whiteList:I,lockProps:g1,focusOptions:T?WC:void 0,as:vi},c),H&&Jt.createElement(G1,Z1({},r1,{sideCar:zi,setLockProps:o,shards:h})))});var wv=B(X());function Aa(t,e){return Aa=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,o){return i.__proto__=o,i},Aa(t,e)}function Z8(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,Aa(t,e)}function ie(t){"@babel/helpers - typeof";return ie=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ie(t)}function Q8(t,e){if(ie(t)!=="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,e||"default");if(ie(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function J8(t){var e=Q8(t,"string");return ie(e)==="symbol"?e:String(e)}function t7(t,e,r){return e=J8(e),e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var Mi=B(X());function $C(t,e){function r(i){return i.displayName||i.name||"Component"}return function(o){var c=[],u;function h(){u=t(c.map(function(p){return p.props})),e(u)}var d=function(p){Z8(H,p);function H(){return p.apply(this,arguments)||this}H.peek=function(){return u};var w=H.prototype;return w.componentDidMount=function(){c.push(this),h()},w.componentDidUpdate=function(){h()},w.componentWillUnmount=function(){var A=c.indexOf(this);c.splice(A,1),h()},w.render=function(){return Mi.default.createElement(o,this.props)},H}(Mi.PureComponent);return t7(d,"displayName","SideEffect("+r(o)+")"),d}}var av=$C;var x0=function(t){for(var e=Array(t.length),r=0;r<t.length;++r)e[r]=t[r];return e},Ge=function(t){return Array.isArray(t)?t:[t]},wi=function(t){return Array.isArray(t)?t[0]:t};var jC=function(t){if(t.nodeType!==Node.ELEMENT_NODE)return!1;var e=window.getComputedStyle(t,null);return!e||!e.getPropertyValue?!1:e.getPropertyValue("display")==="none"||e.getPropertyValue("visibility")==="hidden"},nv=function(t){return t.parentNode&&t.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE?t.parentNode.host:t.parentNode},iv=function(t){return t===document||t&&t.nodeType===Node.DOCUMENT_NODE},GC=function(t,e){return!t||iv(t)||!jC(t)&&e(nv(t))},e7=function(t,e){var r=t.get(e);if(r!==void 0)return r;var i=GC(e,e7.bind(void 0,t));return t.set(e,i),i},KC=function(t,e){return t&&!iv(t)?qC(t)?e(nv(t)):!1:!0},r7=function(t,e){var r=t.get(e);if(r!==void 0)return r;var i=KC(e,r7.bind(void 0,t));return t.set(e,i),i},a7=function(t){return t.dataset},XC=function(t){return t.tagName==="BUTTON"},ov=function(t){return t.tagName==="INPUT"},n7=function(t){return ov(t)&&t.type==="radio"},lv=function(t){return!((ov(t)||XC(t))&&(t.type==="hidden"||t.disabled))},qC=function(t){var e=t.getAttribute(Yd);return![!0,"true",""].includes(e)},ba=function(t){var e;return!!(t&&(!((e=a7(t))===null||e===void 0)&&e.focusGuard))},Yr=function(t){return!ba(t)},cv=function(t){return!!t};var YC=function(t,e){var r=t.tabIndex-e.tabIndex,i=t.index-e.index;if(r){if(!t.tabIndex)return 1;if(!e.tabIndex)return-1}return r||i},i7=function(t,e,r){return x0(t).map(function(i,o){return{node:i,index:o,tabIndex:r&&i.tabIndex===-1?(i.dataset||{}).focusGuard?0:-1:i.tabIndex}}).filter(function(i){return!e||i.tabIndex>=0}).sort(YC)};var uv=["button:enabled","select:enabled","textarea:enabled","input:enabled","a[href]","area[href]","summary","iframe","object","embed","audio[controls]","video[controls]","[tabindex]","[contenteditable]","[autofocus]"];var o7=uv.join(","),ZC="".concat(o7,", [data-focus-guard]"),sv=function(t,e){return x0((t.shadowRoot||t).children).reduce(function(r,i){return r.concat(i.matches(e?ZC:o7)?[i]:[],sv(i))},[])},QC=function(t,e){var r;return t instanceof HTMLIFrameElement&&(!((r=t.contentDocument)===null||r===void 0)&&r.body)?_a([t.contentDocument.body],e):[t]},_a=function(t,e){return t.reduce(function(r,i){var o,c=sv(i,e),u=(o=[]).concat.apply(o,c.map(function(h){return QC(h,e)}));return r.concat(u,i.parentNode?x0(i.parentNode.querySelectorAll(o7)).filter(function(h){return h===i}):[])},[])},hv=function(t){var e=t.querySelectorAll("[".concat(qd,"]"));return x0(e).map(function(r){return _a([r])}).reduce(function(r,i){return r.concat(i)},[])};var l7=function(t,e){return x0(t).filter(function(r){return e7(e,r)}).filter(function(r){return lv(r)})},c7=function(t,e){return e===void 0&&(e=new Map),x0(t).filter(function(r){return r7(e,r)})},Ra=function(t,e,r){return i7(l7(_a(t,r),e),!0,r)},u7=function(t,e){return i7(l7(_a(t),e),!1)},dv=function(t,e){return l7(hv(t),e)},w2=function(t,e){return t.shadowRoot?w2(t.shadowRoot,e):Object.getPrototypeOf(t).contains!==void 0&&Object.getPrototypeOf(t).contains.call(t,e)?!0:x0(t.children).some(function(r){var i;if(r instanceof HTMLIFrameElement){var o=(i=r.contentDocument)===null||i===void 0?void 0:i.body;return o?w2(o,e):!1}return w2(r,e)})};var JC=function(t){for(var e=new Set,r=t.length,i=0;i<r;i+=1)for(var o=i+1;o<r;o+=1){var c=t[i].compareDocumentPosition(t[o]);(c&Node.DOCUMENT_POSITION_CONTAINED_BY)>0&&e.add(o),(c&Node.DOCUMENT_POSITION_CONTAINS)>0&&e.add(i)}return t.filter(function(u,h){return!e.has(h)})},vv=function(t){return t.parentNode?vv(t.parentNode):t},Zr=function(t){var e=Ge(t);return e.filter(Boolean).reduce(function(r,i){var o=i.getAttribute(La);return r.push.apply(r,o?JC(x0(vv(i).querySelectorAll("[".concat(La,'="').concat(o,'"]:not([').concat(pi,'="disabled"])')))):[i]),r},[])};var pv=function(t){try{return t()}catch{return}};var oe=function(t){if(t===void 0&&(t=document),!(!t||!t.activeElement)){var e=t.activeElement;return e.shadowRoot?oe(e.shadowRoot):e instanceof HTMLIFrameElement&&pv(function(){return e.contentWindow.document})?oe(e.contentWindow.document):e}};var tV=function(t,e){return t===e},eV=function(t,e){return!!x0(t.querySelectorAll("iframe")).some(function(r){return tV(r,e)})},yi=function(t,e){return e===void 0&&(e=oe(wi(t).ownerDocument)),!e||e.dataset&&e.dataset.focusGuard?!1:Zr(t).some(function(r){return w2(r,e)||eV(r,e)})};var s7=function(t){t===void 0&&(t=document);var e=oe(t);return e?x0(t.querySelectorAll("[".concat(Xd,"]"))).some(function(r){return w2(r,e)}):!1};var rV=function(t,e){return e.filter(n7).filter(function(r){return r.name===t.name}).filter(function(r){return r.checked})[0]||t},Hi=function(t,e){return n7(t)&&t.name?rV(t,e):t},fv=function(t){var e=new Set;return t.forEach(function(r){return e.add(Hi(r,t))}),t.filter(function(r){return e.has(r)})};var h7=function(t){return t[0]&&t.length>1?Hi(t[0],t):t[0]},d7=function(t,e){return t.length>1?t.indexOf(Hi(t[e],t)):e};var v7="NEW_FOCUS",gv=function(t,e,r,i){var o=t.length,c=t[0],u=t[o-1],h=ba(r);if(!(r&&t.indexOf(r)>=0)){var d=r!==void 0?e.indexOf(r):-1,p=i?e.indexOf(i):d,H=i?t.indexOf(i):-1,w=d-p,C=e.indexOf(c),A=e.indexOf(u),E=fv(e),M=r!==void 0?E.indexOf(r):-1,S=M-(i?E.indexOf(i):d),g=d7(t,0),m=d7(t,o-1);if(d===-1||H===-1)return v7;if(!w&&H>=0)return H;if(d<=C&&h&&Math.abs(w)>1)return m;if(d>=A&&h&&Math.abs(w)>1)return g;if(w&&Math.abs(S)>1)return H;if(d<=C)return m;if(d>A)return g;if(w)return Math.abs(w)>1?H:(o+H+w)%o}};var aV=function(t){return function(e){var r,i=(r=a7(e))===null||r===void 0?void 0:r.autofocus;return e.autofocus||i!==void 0&&i!=="false"||t.indexOf(e)>=0}},mv=function(t,e,r){var i=t.map(function(c){var u=c.node;return u}),o=c7(i.filter(aV(r)));return o&&o.length?h7(o):h7(c7(e))};var f7=function(t,e){return e===void 0&&(e=[]),e.push(t),t.parentNode&&f7(t.parentNode.host||t.parentNode,e),e},p7=function(t,e){for(var r=f7(t),i=f7(e),o=0;o<r.length;o+=1){var c=r[o];if(i.indexOf(c)>=0)return c}return!1},Si=function(t,e,r){var i=Ge(t),o=Ge(e),c=i[0],u=!1;return o.filter(Boolean).forEach(function(h){u=p7(u||h,h)||u,r.filter(Boolean).forEach(function(d){var p=p7(c,d);p&&(!u||w2(p,u)?u=p:u=p7(p,u))})}),u},xv=function(t,e){return t.reduce(function(r,i){return r.concat(dv(i,e))},[])};var nV=function(t,e){var r=new Map;return e.forEach(function(i){return r.set(i.node,i)}),t.map(function(i){return r.get(i)}).filter(cv)},zv=function(t,e){var r=oe(Ge(t).length>0?document:wi(t).ownerDocument),i=Zr(t).filter(Yr),o=Si(r||t,t,i),c=new Map,u=u7(i,c),h=Ra(i,c).filter(function(A){var E=A.node;return Yr(E)});if(!(!h[0]&&(h=u,!h[0]))){var d=u7([o],c).map(function(A){var E=A.node;return E}),p=nV(d,h),H=p.map(function(A){var E=A.node;return E}),w=gv(H,d,r,e);if(w===v7){var C=mv(u,H,xv(i,c));if(C)return{node:C};console.warn("focus-lock: cannot find any node to move focus into");return}return w===void 0?w:p[w]}};var g7=function(t){var e=Zr(t).filter(Yr),r=Si(t,t,e),i=new Map,o=Ra([r],i,!0),c=Ra(e,i).filter(function(u){var h=u.node;return Yr(h)}).map(function(u){var h=u.node;return h});return o.map(function(u){var h=u.node,d=u.index;return{node:h,index:d,lockItem:c.indexOf(h)>=0,guard:ba(h)}})};var Bv=function(t,e){"focus"in t&&t.focus(e),"contentWindow"in t&&t.contentWindow&&t.contentWindow.focus()};var m7=0,x7=!1,Ci=function(t,e,r){r===void 0&&(r={});var i=zv(t,e);if(!x7&&i){if(m7>2){console.error("FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting"),x7=!0,setTimeout(function(){x7=!1},1);return}m7++,Bv(i.node,r.focusOptions),m7--}};var iV=function(){return document&&document.activeElement===document.body},oV=function(){return iV()||s7()},Jr=null,Qr=null,t4=null,Ea=!1,lV=function(){return!0},cV=function(e){return(Jr.whiteList||lV)(e)},uV=function(e,r){t4={observerNode:e,portaledElement:r}},sV=function(e){return t4&&t4.portaledElement===e};function Mv(t,e,r,i){var o=null,c=t;do{var u=i[c];if(u.guard)u.node.dataset.focusAutoGuard&&(o=u);else if(u.lockItem){if(c!==t)return;o=null}else break}while((c+=r)!==e);o&&(o.node.tabIndex=0)}var hV=function(e){return e&&"current"in e?e.current:e},dV=function(e){return e?!!Ea:Ea==="meanwhile"},vV=function t(e,r,i){return r&&(r.host===e&&(!r.activeElement||i.contains(r.activeElement))||r.parentNode&&t(e,r.parentNode,i))},pV=function(e,r){return r.some(function(i){return vV(e,i,i)})},Vi=function(){var e=!1;if(Jr){var r=Jr,i=r.observed,o=r.persistentFocus,c=r.autoFocus,u=r.shards,h=r.crossFrame,d=r.focusOptions,p=i||t4&&t4.portaledElement,H=document&&document.activeElement;if(p){var w=[p].concat(u.map(hV).filter(Boolean));if((!H||cV(H))&&(o||dV(h)||!oV()||!Qr&&c)&&(p&&!(yi(w)||H&&pV(H,w)||sV(H,p))&&(document&&!Qr&&H&&!c?(H.blur&&H.blur(),document.body.focus()):(e=Ci(w,Qr,{focusOptions:d}),t4={})),Ea=!1,Qr=document&&document.activeElement),document){var C=document&&document.activeElement,A=g7(w),E=A.map(function(M){var S=M.node;return S}).indexOf(C);E>-1&&(A.filter(function(M){var S=M.guard,g=M.node;return S&&g.dataset.focusAutoGuard}).forEach(function(M){var S=M.node;return S.removeAttribute("tabIndex")}),Mv(E,A.length,1,A),Mv(E,-1,-1,A))}}}return e},yv=function(e){Vi()&&e&&(e.stopPropagation(),e.preventDefault())},Li=function(){return xi(Vi)},Hv=function(e){var r=e.target,i=e.currentTarget;i.contains(r)||uV(i,r)},fV=function(){return null},gV=function(e){var r=e.children;return wv.createElement("div",{onBlur:Li,onFocus:Hv},r)};gV.propTypes={};var Sv=function(){Ea="just",xi(function(){Ea="meanwhile"})},mV=function(){document.addEventListener("focusin",yv),document.addEventListener("focusout",Li),window.addEventListener("blur",Sv)},xV=function(){document.removeEventListener("focusin",yv),document.removeEventListener("focusout",Li),window.removeEventListener("blur",Sv)};function zV(t){return t.filter(function(e){var r=e.disabled;return!r})}function BV(t){var e=t.slice(-1)[0];e&&!Jr&&mV();var r=Jr,i=r&&e&&e.id===r.id;Jr=e,r&&!i&&(r.onDeactivation(),t.filter(function(o){var c=o.id;return c===r.id}).length||r.returnFocus(!e)),e?(Qr=null,(!i||r.observed!==e.observed)&&e.onActivation(),Vi(!0),xi(Vi)):(xV(),Qr=null)}fi.assignSyncMedium(Hv);gi.assignMedium(Li);Qd.assignMedium(function(t){return t({moveFocusInside:Ci,focusInside:yi})});var Cv=av(zV,BV)(fV);var xE=je(mi,Cv);var A1=B(X());var Ai=B(X());var Av=B(X());var Vv;var Lv=function(){if(Vv)return Vv;if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function MV(){if(!document)return null;var t=document.createElement("style");t.type="text/css";var e=Lv();return e&&t.setAttribute("nonce",e),t}function wV(t,e){t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}function yV(t){var e=document.head||document.getElementsByTagName("head")[0];e.appendChild(t)}var z7=function(){var t=0,e=null;return{add:function(r){t==0&&(e=MV())&&(wV(e,r),yV(e)),t++},remove:function(){t--,!t&&e&&(e.parentNode&&e.parentNode.removeChild(e),e=null)}}};var B7=function(){var t=z7();return function(e,r){Av.useEffect(function(){return t.add(e),function(){t.remove()}},[e&&r])}};var Ke=function(){var t=B7(),e=function(r){var i=r.styles,o=r.dynamic;return t(i,o),null};return e};var HV={left:0,top:0,right:0,gap:0},M7=function(t){return parseInt(t||"",10)||0},SV=function(t){var e=window.getComputedStyle(document.body),r=e[t==="padding"?"paddingLeft":"marginLeft"],i=e[t==="padding"?"paddingTop":"marginTop"],o=e[t==="padding"?"paddingRight":"marginRight"];return[M7(r),M7(i),M7(o)]},w7=function(t){if(t===void 0&&(t="margin"),typeof window>"u")return HV;var e=SV(t),r=document.documentElement.clientWidth,i=window.innerWidth;return{left:e[0],top:e[1],right:e[2],gap:Math.max(0,i-r+e[2]-e[0])}};var CV=Ke(),VV=function(t,e,r,i){var o=t.left,c=t.top,u=t.right,h=t.gap;return r===void 0&&(r="margin"),`
  .`.concat(K8,` {
   overflow: hidden `).concat(i,`;
   padding-right: `).concat(h,"px ").concat(i,`;
  }
  body {
    overflow: hidden `).concat(i,`;
    overscroll-behavior: contain;
    `).concat([e&&"position: relative ".concat(i,";"),r==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(c,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(h,"px ").concat(i,`;
    `),r==="padding"&&"padding-right: ".concat(h,"px ").concat(i,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Ue,` {
    right: `).concat(h,"px ").concat(i,`;
  }
  
  .`).concat(We,` {
    margin-right: `).concat(h,"px ").concat(i,`;
  }
  
  .`).concat(Ue," .").concat(Ue,` {
    right: 0 `).concat(i,`;
  }
  
  .`).concat(We," .").concat(We,` {
    margin-right: 0 `).concat(i,`;
  }
  
  body {
    `).concat(X8,": ").concat(h,`px;
  }
`)},y7=function(t){var e=t.noRelative,r=t.noImportant,i=t.gapMode,o=i===void 0?"margin":i,c=Ai.useMemo(function(){return w7(o)},[o]);return Ai.createElement(CV,{styles:VV(c,!e,o,r?"":"!important")})};var H7=!1;if(typeof window<"u")try{Ta=Object.defineProperty({},"passive",{get:function(){return H7=!0,!0}}),window.addEventListener("test",Ta,Ta),window.removeEventListener("test",Ta,Ta)}catch{H7=!1}var Ta,Xe=H7?{passive:!1}:!1;var LV=function(t){return t.tagName==="TEXTAREA"},bv=function(t,e){var r=window.getComputedStyle(t);return r[e]!=="hidden"&&!(r.overflowY===r.overflowX&&!LV(t)&&r[e]==="visible")},AV=function(t){return bv(t,"overflowY")},bV=function(t){return bv(t,"overflowX")},S7=function(t,e){var r=e.ownerDocument,i=e;do{typeof ShadowRoot<"u"&&i instanceof ShadowRoot&&(i=i.host);var o=_v(t,i);if(o){var c=Rv(t,i),u=c[1],h=c[2];if(u>h)return!0}i=i.parentNode}while(i&&i!==r.body);return!1},_V=function(t){var e=t.scrollTop,r=t.scrollHeight,i=t.clientHeight;return[e,r,i]},RV=function(t){var e=t.scrollLeft,r=t.scrollWidth,i=t.clientWidth;return[e,r,i]},_v=function(t,e){return t==="v"?AV(e):bV(e)},Rv=function(t,e){return t==="v"?_V(e):RV(e)},EV=function(t,e){return t==="h"&&e==="rtl"?-1:1},Ev=function(t,e,r,i,o){var c=EV(t,window.getComputedStyle(e).direction),u=c*i,h=r.target,d=e.contains(h),p=!1,H=u>0,w=0,C=0;do{var A=Rv(t,h),E=A[0],M=A[1],S=A[2],g=M-S-c*E;(E||g)&&_v(t,h)&&(w+=g,C+=E),h instanceof ShadowRoot?h=h.host:h=h.parentNode}while(!d&&h!==document.body||d&&(e.contains(h)||e===h));return(H&&(o&&Math.abs(w)<1||!o&&u>w)||!H&&(o&&Math.abs(C)<1||!o&&-u>C))&&(p=!0),p};var bi=function(t){return"changedTouches"in t?[t.changedTouches[0].clientX,t.changedTouches[0].clientY]:[0,0]},Tv=function(t){return[t.deltaX,t.deltaY]},kv=function(t){return t&&"current"in t?t.current:t},TV=function(t,e){return t[0]===e[0]&&t[1]===e[1]},kV=function(t){return`
  .block-interactivity-`.concat(t,` {pointer-events: none;}
  .allow-interactivity-`).concat(t,` {pointer-events: all;}
`)},IV=0,e4=[];function Iv(t){var e=A1.useRef([]),r=A1.useRef([0,0]),i=A1.useRef(),o=A1.useState(IV++)[0],c=A1.useState(Ke)[0],u=A1.useRef(t);A1.useEffect(function(){u.current=t},[t]),A1.useEffect(function(){if(t.inert){document.body.classList.add("block-interactivity-".concat(o));var M=Od([t.lockRef.current],(t.shards||[]).map(kv),!0).filter(Boolean);return M.forEach(function(S){return S.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),M.forEach(function(S){return S.classList.remove("allow-interactivity-".concat(o))})}}},[t.inert,t.lockRef.current,t.shards]);var h=A1.useCallback(function(M,S){if("touches"in M&&M.touches.length===2)return!u.current.allowPinchZoom;var g=bi(M),m=r.current,z="deltaX"in M?M.deltaX:m[0]-g[0],b="deltaY"in M?M.deltaY:m[1]-g[1],I,T=M.target,P=Math.abs(z)>Math.abs(b)?"h":"v";if("touches"in M&&P==="h"&&T.type==="range")return!1;var U=S7(P,T);if(!U)return!0;if(U?I=P:(I=P==="v"?"h":"v",U=S7(P,T)),!U)return!1;if(!i.current&&"changedTouches"in M&&(z||b)&&(i.current=I),!I)return!0;var Y=i.current||I;return Ev(Y,S,M,Y==="h"?z:b,!0)},[]),d=A1.useCallback(function(M){var S=M;if(!(!e4.length||e4[e4.length-1]!==c)){var g="deltaY"in S?Tv(S):bi(S),m=e.current.filter(function(I){return I.name===S.type&&(I.target===S.target||S.target===I.shadowParent)&&TV(I.delta,g)})[0];if(m&&m.should){S.cancelable&&S.preventDefault();return}if(!m){var z=(u.current.shards||[]).map(kv).filter(Boolean).filter(function(I){return I.contains(S.target)}),b=z.length>0?h(S,z[0]):!u.current.noIsolation;b&&S.cancelable&&S.preventDefault()}}},[]),p=A1.useCallback(function(M,S,g,m){var z={name:M,delta:S,target:g,should:m,shadowParent:NV(g)};e.current.push(z),setTimeout(function(){e.current=e.current.filter(function(b){return b!==z})},1)},[]),H=A1.useCallback(function(M){r.current=bi(M),i.current=void 0},[]),w=A1.useCallback(function(M){p(M.type,Tv(M),M.target,h(M,t.lockRef.current))},[]),C=A1.useCallback(function(M){p(M.type,bi(M),M.target,h(M,t.lockRef.current))},[]);A1.useEffect(function(){return e4.push(c),t.setCallbacks({onScrollCapture:w,onWheelCapture:w,onTouchMoveCapture:C}),document.addEventListener("wheel",d,Xe),document.addEventListener("touchmove",d,Xe),document.addEventListener("touchstart",H,Xe),function(){e4=e4.filter(function(M){return M!==c}),document.removeEventListener("wheel",d,Xe),document.removeEventListener("touchmove",d,Xe),document.removeEventListener("touchstart",H,Xe)}},[]);var A=t.removeScrollBar,E=t.inert;return A1.createElement(A1.Fragment,null,E?A1.createElement(c,{styles:kV(o)}):null,A?A1.createElement(y7,{gapMode:t.gapMode}):null)}function NV(t){for(var e=null;t!==null;)t instanceof ShadowRoot&&(e=t.host,t=t.host),t=t.parentNode;return e}var ZE=je(di,Iv);var Ei=B(X());var PV=function(t){if(typeof document>"u")return null;var e=Array.isArray(t)?t[0]:t;return e.ownerDocument.body},r4=new WeakMap,_i=new WeakMap,Ri={},C7=0,Nv=function(t){return t&&(t.host||Nv(t.parentNode))},FV=function(t,e){return e.map(function(r){if(t.contains(r))return r;var i=Nv(r);return i&&t.contains(i)?i:(console.error("aria-hidden",r,"in not contained inside",t,". Doing nothing"),null)}).filter(function(r){return!!r})},OV=function(t,e,r,i){var o=FV(e,Array.isArray(t)?t:[t]);Ri[r]||(Ri[r]=new WeakMap);var c=Ri[r],u=[],h=new Set,d=new Set(o),p=function(w){!w||h.has(w)||(h.add(w),p(w.parentNode))};o.forEach(p);var H=function(w){!w||d.has(w)||Array.prototype.forEach.call(w.children,function(C){if(h.has(C))H(C);else{var A=C.getAttribute(i),E=A!==null&&A!=="false",M=(r4.get(C)||0)+1,S=(c.get(C)||0)+1;r4.set(C,M),c.set(C,S),u.push(C),M===1&&E&&_i.set(C,!0),S===1&&C.setAttribute(r,"true"),E||C.setAttribute(i,"true")}})};return H(e),h.clear(),C7++,function(){u.forEach(function(w){var C=r4.get(w)-1,A=c.get(w)-1;r4.set(w,C),c.set(w,A),C||(_i.has(w)||w.removeAttribute(i),_i.delete(w)),A||w.removeAttribute(r)}),C7--,C7||(r4=new WeakMap,r4=new WeakMap,_i=new WeakMap,Ri={})}},Pv=function(t,e,r){r===void 0&&(r="data-aria-hidden");var i=Array.from(Array.isArray(t)?t:[t]),o=e||PV(t);return o?(i.push.apply(i,Array.from(o.querySelectorAll("[aria-live]"))),OV(i,o,r,"aria-hidden")):function(){return null}};var Fv=B(X());var DV=Ke(),UV=`
 [`+Bi+`] {
   pointer-events: none !important;
 }
`,Ov=function(){return Fv.createElement(DV,{styles:UV})};var le=B(X()),Dv=function(t){return"current"in t?t.current:t};function Uv(t){var e=t.setLockProps,r=t.onEscapeKey,i=t.onClickOutside,o=t.shards,c=t.onActivation,u=t.onDeactivation,h=t.noIsolation,d=(0,le.useState)(void 0),p=d[0],H=d[1],w=(0,le.useRef)(null),C=(0,le.useRef)(0);return Ei.useEffect(function(){var A=function(g){g.defaultPrevented||(g.code==="Escape"||g.key==="Escape"||g.keyCode===27)&&r&&r(g)},E=function(g){g.defaultPrevented||g.target===w.current||g instanceof MouseEvent&&g.button!==0||o&&o.map(Dv).some(function(m){return m&&m.contains(g.target)||m===g.target})||i&&i(g)},M=function(g){E(g),C.current=g.touches.length},S=function(g){C.current=g.touches.length};if(p)return document.addEventListener("keydown",A),document.addEventListener("mousedown",E),document.addEventListener("touchstart",M),document.addEventListener("touchend",S),function(){document.removeEventListener("keydown",A),document.removeEventListener("mousedown",E),document.removeEventListener("touchstart",M),document.removeEventListener("touchend",S)}},[p,i,r]),(0,le.useEffect)(function(){if(p)return c&&c(p),function(){u&&u()}},[!!p]),(0,le.useEffect)(function(){var A=function(){return null},E=!1,M=function(g){h||(A=Pv(Fd([g],(o||[]).map(Dv)),document.body,Bi)),H(function(){return g})},S=function(){A(),E||H(null)};return e({onMouseDown:function(g){w.current=g.target},onTouchStart:function(g){w.current=g.target},onActivation:M,onDeactivation:S}),function(){E=!0,e(!1)}},[]),Ei.createElement(Ov,null)}var Wv=je(zi,Uv);var WV=function(t){return ka.createElement(Wv,Z1({},t))},V7=ka.forwardRef(function(t,e){return ka.createElement(rv,Z1({},t,{ref:e,sideCar:WV}))});var L7=B(R());var $v=B(Q()),jv=B(R()),E1=({size:t="m"})=>{let e=(0,$v.default)("vuiSpacer",{[`vuiSpacer--${t}`]:t});return(0,jv.jsx)("div",{className:e})};var A7=B(R());var jV=B(Q()),GV=B(R());var Kv=B(R());var rp=B(X()),ap=B(Q());var se=B(X()),b7=B(Q());var qv=B(Q()),Yv=B(X());var qe=t=>t?{rel:"noopener",referrerpolicy:"no-referrer-when-downgrade"}:{rel:"noopener"};var Xv=B(X()),KV={xs:"xs",s:"xs",m:"s"},XV={accent:"accent",primary:"primary",success:"success",danger:"danger",warning:"warning",neutral:"neutral",subdued:"subdued"},ce=(t,e,r,i=XV)=>t?(0,Xv.cloneElement)(t,{size:e?KV[e]:"s",color:t.props.color==="inherit"?i[r]:t.props.color}):null;var ki=B(R()),tt=(0,Yv.forwardRef)(({className:t,icon:e,color:r="primary",size:i="m",onClick:o,href:c,target:u,track:h,tabIndex:d,...p},H)=>{let w={className:(0,qv.default)("vuiIconButton",t,`vuiIconButton--${r}`,`vuiIconButton--${i}`),onClick:o,tabIndex:d,...p},C=ce(e,i,r);return c?(0,ki.jsx)(ae,{to:c,target:u,...w,...qe(h),children:(0,ki.jsx)("button",{ref:H,children:C})}):(0,ki.jsx)("button",{...w,ref:H,children:C})});var Zv=B(Q());var y2=B(R()),Na=({path:t,name:e,iconBefore:r,iconAfter:i,isActive:o,className:c,...u})=>{let h=Fe(),d=(0,Zv.default)("vuiAppSideNavLink",{"vuiAppSideNavLink--active":o??t===h.pathname},c);return(0,y2.jsx)(ae,{className:d,to:t??"/",...u,children:r||i?(0,y2.jsxs)(f1,{alignItems:"center",spacing:"xxs",children:[r&&(0,y2.jsx)(d1,{grow:!1,shrink:!1,children:(0,y2.jsx)(B1,{size:"s",children:r})}),(0,y2.jsx)(d1,{grow:!1,shrink:!1,children:e}),i&&(0,y2.jsx)(d1,{grow:!1,shrink:!1,children:(0,y2.jsx)(B1,{size:"s",children:i})})]}):e})};var ue=B(R()),Qv=t=>(0,ue.jsx)("div",{className:"vuiAppSideNavSections",children:t.map(({name:e,pages:r})=>{let i=r.map(({name:o,path:c})=>(0,ue.jsx)(Na,{path:c,name:o},c??o));return(0,ue.jsx)(qV,{name:e,children:i},e)})}),qV=({name:t,children:e})=>(0,ue.jsxs)("div",{className:"vuiAppSideNavSection",children:[(0,ue.jsx)("div",{className:"vuiAppSideNavSection__title",children:t}),(0,ue.jsx)("div",{className:"vuiAppSideNavSection__items",children:e})]},t);var Jv=B(X());var et=B(R()),tp=t=>(0,et.jsx)("div",{className:"vuiAppSideNavTree",children:ep(t)}),ep=t=>t.map(({name:e,pages:r,path:i,iconBefore:o,iconAfter:c,isActive:u,...h})=>{if(i){if(r){let d=ep(r);return(0,et.jsx)(YV,{path:i,name:e,iconBefore:o,iconAfter:c,isActive:u,...h,children:d},i??e)}return(0,et.jsx)(Na,{path:i,name:e,iconBefore:o,iconAfter:c,isActive:u,...h},i??e)}return(0,et.jsx)("div",{className:"vuiAppSideNavTreeSection__subTitle",...h,children:e},e)}),YV=({name:t,path:e,children:r,iconBefore:i,iconAfter:o,isActive:c,...u})=>{let[h,d]=(0,Jv.useState)(!0);return(0,et.jsxs)("div",{className:"vuiAppSideNavTreeSection",children:[(0,et.jsx)(Na,{path:e??"/",name:t,iconBefore:i,iconAfter:o,isActive:c,...u}),(0,et.jsx)(tt,{size:"s",className:"vuiAppSideNavTreeToggleButton",onClick:()=>d(!h),color:"neutral",icon:(0,et.jsx)(B1,{children:h?(0,et.jsx)(Ad,{}):(0,et.jsx)(Cd,{})})}),h&&(0,et.jsx)("div",{className:"vuiAppSideNavTreeChildren",children:r})]})};var c0=B(R()),ZV=t=>QV(t)?tp(t):Qv(t),QV=t=>t.findIndex(e=>e.path)!==-1,_7=({items:t=[],content:e})=>{let[r,i]=(0,se.useState)(!1),[o,c]=(0,se.useState)(!1),u=(0,se.useRef)(null),h=(0,se.useRef)(null);(0,se.useEffect)(()=>{r&&(o?h.current?.focus():u.current?.focus())},[r,o]);let d=(0,b7.default)("vuiAppSideNav",{"vuiAppSideNav-isCollapsed":o}),p=(0,b7.default)("vuiAppSideNavContent",{"vuiAppSideNavContent-isHidden":o}),H=ZV(t);return(0,c0.jsx)("div",{className:d,children:(0,c0.jsxs)("div",{className:"vuiAppSideNav__inner",children:[o?(0,c0.jsx)(tt,{ref:h,"aria-label":"Expand nav",onClick:()=>c(!1),className:"vuiAppSideNavExpandButton",color:"neutral",icon:(0,c0.jsx)(B1,{children:(0,c0.jsx)(Ld,{})})}):(0,c0.jsx)(c0.Fragment,{children:(0,c0.jsx)("button",{ref:u,className:"vuiAppSideNavCollapseButton",onClick:()=>{i(!0),c(!0)},children:(0,c0.jsxs)(f1,{alignItems:"center",spacing:"xxs",children:[(0,c0.jsx)(d1,{shrink:!1,grow:!1,children:(0,c0.jsx)(B1,{children:(0,c0.jsx)(Vd,{})})}),(0,c0.jsx)(d1,{shrink:!1,grow:!1,children:"Collapse nav"})]})})}),(0,c0.jsxs)("div",{className:p,inert:o?"":null,children:[H,e]})]})})};var a4=B(R()),JV=(0,rp.forwardRef)(({children:t,navItems:e,navContent:r,full:i},o)=>{let c=(0,ap.default)("vuiAppLayout",{"vuiAppLayout--full":i});return(0,a4.jsxs)("div",{className:c,children:[(e||r)&&(0,a4.jsx)("div",{className:"vuiAppLayout__sideNav",children:(0,a4.jsx)(_7,{items:e,content:r})}),(0,a4.jsx)("div",{className:"vuiAppLayout__content",ref:o,children:t})]})});var tL=B(Q());var eL=B(R());var op=B(X()),lp=B(Q());var np=B(X()),ip=B(Q());var Ye=B(R()),n4=(0,np.forwardRef)(({children:t,icon:e,iconSide:r="left",className:i,size:o,fullWidth:c,onClick:u,tabIndex:h,isInert:d,isDisabled:p,href:H,target:w,track:C,htmlFor:A,...E},M)=>{let S=(0,ip.default)("vuiBaseButton",i,`vuiBaseButton--${o}`,{"vuiBaseButton-isInert":d,"vuiBaseButton-isDisabled":p,"vuiBaseButton--fullWidth":c,[`vuiBaseButton--${r}`]:!!e&&!!t}),g=e?(0,Ye.jsx)("span",{className:"vuiBaseButtonIconContainer",children:e}):null;if(A)return(0,Ye.jsxs)("label",{htmlFor:A,className:S,tabIndex:h,...E,children:[g,t]});if(H)return(0,Ye.jsx)(ae,{className:"vuiBaseButtonLinkWrapper",to:H,onClick:u,target:w,tabIndex:h,...E,...qe(C),children:(0,Ye.jsxs)("button",{className:S,tabIndex:-1,ref:M,children:[g,t]})});let m={onClick:u,tabIndex:h,...E};return(0,Ye.jsxs)("button",{className:S,...m,ref:M,children:[g,t]})});var up=B(R()),rL={accent:"empty",primary:"empty",success:"empty",danger:"empty",warning:"empty",neutral:"neutral",subdued:"subdued"},cp=(0,op.forwardRef)(({children:t,icon:e,color:r,size:i="m",className:o,isSelected:c,isDisabled:u,...h},d)=>{let p=(0,lp.default)(o,"vuiButtonPrimary",`vuiButtonPrimary--${r}`,{"vuiButtonPrimary-isSelected":c}),H=ce(e,i,r,rL);return(0,up.jsx)(n4,{ref:d,className:p,icon:H,size:i,isDisabled:u,...h,children:t})});var sp=B(X()),hp=B(Q());var dp=B(R()),aL={accent:"accent",primary:"primary",success:"success",danger:"danger",warning:"warning",neutral:"neutral",subdued:"subdued"},t2=(0,sp.forwardRef)(({children:t,icon:e,color:r,size:i="m",className:o,isSelected:c,isDisabled:u,solid:h,...d},p)=>{let H=(0,hp.default)(o,"vuiButtonSecondary",`vuiButtonSecondary--${r}`,{"vuiButtonSecondary-isSelected":c,"vuiButtonSecondary--solid":h}),w=ce(e,i,r,aL);return(0,dp.jsx)(n4,{ref:p,className:H,icon:w,size:i,isDisabled:u,...d,children:t})});var vp=B(X()),pp=B(Q());var fp=B(R()),nL={accent:"accent",primary:"primary",success:"success",danger:"danger",warning:"warning",neutral:"neutral",subdued:"subdued"},Pa=(0,vp.forwardRef)(({children:t,icon:e,color:r,size:i="m",className:o,isSelected:c,isDisabled:u,noPadding:h,...d},p)=>{let H=(0,pp.default)(o,"vuiButtonTertiary",`vuiButtonTertiary--${r}`,{"vuiButtonTertiary-isSelected":c,"vuiButtonTertiary-noPadding":h}),w=ce(e,i,r,nL);return(0,fp.jsx)(n4,{ref:p,className:H,icon:w,size:i,isDisabled:u,...d,children:t})});var iL=B(Q());var gp=B(Q()),mp=B(X());var Fa=({children:t,className:e,size:r,align:i,...o})=>(0,mp.cloneElement)(t,{className:(0,gp.default)("vuiTitle",`vuiTitle--${r}`,{[`vuiTitle--${i}`]:i},e,t.props.className),...o});var xp=B(Q()),zp=B(R()),I0=({children:t,color:e,className:r})=>{let i=(0,xp.default)(r,"vuiTextColor",`vuiTextColor--${e}`);return(0,zp.jsx)("span",{className:i,children:t})};var Bp=B(Q()),Mp=B(R());var Q1=({children:t,className:e,id:r,truncate:i,size:o="s",align:c,...u})=>{let h=(0,Bp.default)("vuiText",`vuiText--${o}`,{[`vuiText--${c}`]:c,"vuiText--truncate":i},e);return(0,Mp.jsx)("div",{className:h,id:r,...u,children:t})};var R7=B(R());var oL=B(Q()),wp=B(R());var N7=B(X());var xL=B(Q());var yp=B(R());var lL=B(Q()),cL=B(R());var Hp=B(Q()),Ze=B(X()),Cp=B(R());var Sp=(0,Ze.forwardRef)(({className:t,id:e,max:r,min:i,step:o,value:c,size:u="m",onChange:h,fullWidth:d,isInvalid:p,autoFocus:H,...w},C)=>{let[A,E]=(0,Ze.useState)(c);(0,Ze.useEffect)(()=>{c!==0&&E(c)},[c]),(0,Ze.useEffect)(()=>{h(A??0)},[A]);let M=(0,Hp.default)("vuiInput",`vuiInput--${u}`,{"vuiInput-isInvalid":p,"vuiInput--fullWidth":d},t);return(0,Cp.jsx)("input",{autoFocus:H,ref:C,type:"number",className:M,id:e,max:r,min:i,step:o,value:A??"",onChange:m=>{if(m.target.value==="")return E(void 0);let z=Number(m.target.value);if(isNaN(z))return E(void 0);E(Number(m.target.value))},onBlur:()=>{i!==void 0&&c!==void 0&&c<i&&h(i),r!==void 0&&c!==void 0&&c>r&&h(r)},...w})});var Vp=B(R());var Lp=B(Q());var Ap=B(X()),Qe=B(R()),_p=B(X());var uL={m:"m",l:"l"},bp=(0,Ap.forwardRef)(({className:t,id:e,name:r,options:i,value:o,size:c="m",onChange:u,isInvalid:h,...d},p)=>{let H=(0,Lp.default)("vuiSelect",`vuiSelect--${c}`,{"vuiSelect-isInvalid":h},t),w=i.map((C,A)=>{let{text:E,...M}=C;return(0,_p.createElement)("option",{...M,key:A},E)});return(0,Qe.jsxs)("div",{className:H,children:[(0,Qe.jsx)("select",{ref:p,id:e,name:r,value:o,onChange:u,...d,children:w}),(0,Qe.jsx)("div",{className:"vuiSelect__caret",children:(0,Qe.jsx)(B1,{color:"subdued",size:uL[c],children:(0,Qe.jsx)(Sd,{})})})]})});var E7=B(R());var sL=B(R());var Rp=B(Q()),Ep=B(X()),Tp=B(R());var Oa=(0,Ep.forwardRef)(({className:t,id:e,placeholder:r,value:i,size:o="m",onChange:c,fullWidth:u,onSubmit:h,isInvalid:d,name:p,autoComplete:H,autoFocus:w,...C},A)=>{let E=(0,Rp.default)("vuiInput","vuiInput--text",`vuiInput--${o}`,{"vuiInput-isInvalid":d,"vuiInput--fullWidth":u},t);return(0,Tp.jsx)("input",{autoComplete:H?"on":"off",autoFocus:w,ref:A,type:"text",className:E,id:e,name:p,placeholder:r,value:i,onChange:c,onKeyDown:S=>{S.key==="Enter"&&(S.preventDefault(),S.stopPropagation(),h?.())},...C})});var kp=B(X()),Ip=B(Q()),Pp=B(R()),Np=(0,kp.forwardRef)(({className:t,id:e,placeholder:r,value:i,onChange:o,fullWidth:c,name:u,...h},d)=>{let p=(0,Ip.default)("vuiTextArea",{"vuiTextArea--fullWidth":c},t);return(0,Pp.jsx)("textarea",{ref:d,className:p,id:e,name:u,placeholder:r,value:i,onChange:o,...h})});var Dp=B(R());var Up=B(X()),Wp=B(Q());var T7=B(Q());var Ii=B(R()),Ni=({...t})=>(0,Ii.jsx)(i4,{...t,track:!0}),i4=({children:t,href:e,target:r,onClick:i,className:o,track:c,...u})=>{if(!e)return(0,Ii.jsx)("button",{className:(0,T7.default)("vuiLink","vuiLink--button",o),onClick:i,...u,children:t});let h={...u,...qe(c)};return r==="_blank"&&(h.target=r),(0,Ii.jsx)(ae,{className:(0,T7.default)("vuiLink",o),to:e,onClick:i,...h,children:t})};var Ft=B(R()),vL=(t,e)=>`${t}#:~:text=${e}`,pL=(0,Up.forwardRef)(({result:t,className:e,...r},i)=>{let{title:o,url:c,date:u,snippet:{pre:h,post:d,text:p}}=t,H=(0,Wp.default)("vuiChatSearchResult","fs-mask",e);return(0,Ft.jsxs)("div",{className:H,ref:i,...r,children:[(o||c)&&(0,Ft.jsx)(Q1,{children:c?(0,Ft.jsx)(i4,{href:vL(c,p),target:"_blank",children:(0,Ft.jsx)("p",{children:o??c})}):(0,Ft.jsx)("p",{children:o})}),(0,Ft.jsx)(Q1,{size:"s",children:(0,Ft.jsxs)("p",{children:[u&&(0,Ft.jsxs)(I0,{color:"subdued",children:[u," \u2014 "]}),h," ",(0,Ft.jsx)("strong",{children:p})," ",d]})})]})});var k7=B(R());var mL=B(Q());var $p=B(Q()),rt=B(R()),gL={xs:"vuiSpinner--xs",s:"vuiSpinner--s",m:"vuiSpinner--m",l:"vuiSpinner--l",xl:"vuiSpinner--xl",xxl:"vuiSpinner--xxl",xxxl:"vuiSpinner--xxxl"},Da=({size:t="m"})=>{let e=(0,$p.default)("vuiSpinner",gL[t]);return(0,rt.jsx)("div",{className:e,children:(0,rt.jsxs)("svg",{className:"vuiSpinner__animation",version:"1.0",width:"100px",height:"100px",viewBox:"0 0 128 128",xmlSpace:"preserve",children:[(0,rt.jsxs)("g",{children:[(0,rt.jsx)("path",{fill:"#d7c3fc",d:"M99.359,10.919a60.763,60.763,0,1,0,0,106.162A63.751,63.751,0,1,1,99.359,10.919Z"}),(0,rt.jsx)("animateTransform",{attributeName:"transform",type:"rotate",from:"0 64 64",to:"360 64 64",dur:"960ms",repeatCount:"indefinite"})]}),(0,rt.jsxs)("g",{children:[(0,rt.jsx)("path",{fill:"#ab81fa",d:"M28.641,117.081a60.763,60.763,0,1,0,0-106.162A63.751,63.751,0,1,1,28.641,117.081Z"}),(0,rt.jsx)("animateTransform",{attributeName:"transform",type:"rotate",from:"0 64 64",to:"360 64 64",dur:"1440ms",repeatCount:"indefinite"})]}),(0,rt.jsxs)("g",{children:[(0,rt.jsx)("path",{fill:"#7027f6",d:"M117.081,99.313a60.763,60.763,0,1,0-106.162,0A63.751,63.751,0,1,1,117.081,99.313Z"}),(0,rt.jsx)("animateTransform",{attributeName:"transform",type:"rotate",from:"0 64 64",to:"360 64 64",dur:"2880ms",repeatCount:"indefinite"})]})]})})};var I7=B(R());var P7=B(R());var ML=B(X()),wL=B(jp());var BL=`/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

code[class*="language-"],
pre[class*="language-"] {
	color: black;
	background: none;
	text-shadow: 0 1px white;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 1em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
	text-shadow: none;
	background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
	text-shadow: none;
	background: #b3d4fc;
}

@media print {
	code[class*="language-"],
	pre[class*="language-"] {
		text-shadow: none;
	}
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background: #f5f2f0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	padding: .1em;
	border-radius: .3em;
	white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: slategray;
}

.token.punctuation {
	color: #999;
}

.token.namespace {
	opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
	color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
	color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
	color: #9a6e3a;
	/* This background color was intended by the author of this theme. */
	background: hsla(0, 0%, 100%, .5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
	color: #07a;
}

.token.function,
.token.class-name {
	color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
	color: #e90;
}

.token.important,
.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}
`;document.head.appendChild(document.createElement("style")).appendChild(document.createTextNode(BL));Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(t){t.languages.typescript=t.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),t.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete t.languages.typescript.parameter,delete t.languages.typescript["literal-property"];var e=t.languages.extend("typescript",{});delete e["class-name"],t.languages.typescript["class-name"].inside=e,t.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),t.languages.ts=t.languages.typescript})(Prism);(function(t){var e="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",r={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},i={bash:r,environment:{pattern:RegExp("\\$"+e),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+e),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};t.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+e),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:i},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:r}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:i},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:i.entity}}],environment:{pattern:RegExp("\\$?"+e),alias:"constant"},variable:i.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},r.inside=t.languages.bash;for(var o=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],c=i.variable[1].inside,u=0;u<o.length;u++)c[o[u]]=t.languages.bash[o[u]];t.languages.sh=t.languages.bash,t.languages.shell=t.languages.bash})(Prism);(function(t){var e=t.util.clone(t.languages.javascript),r=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,i=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,o=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function c(d,p){return d=d.replace(/<S>/g,function(){return r}).replace(/<BRACES>/g,function(){return i}).replace(/<SPREAD>/g,function(){return o}),RegExp(d,p)}o=c(o).source,t.languages.jsx=t.languages.extend("markup",e),t.languages.jsx.tag.pattern=c(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=e.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:c(/<SPREAD>/.source),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:c(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx}}},t.languages.jsx.tag);var u=function(d){return d?typeof d=="string"?d:typeof d.content=="string"?d.content:d.content.map(u).join(""):""},h=function(d){for(var p=[],H=0;H<d.length;H++){var w=d[H],C=!1;if(typeof w!="string"&&(w.type==="tag"&&w.content[0]&&w.content[0].type==="tag"?w.content[0].content[0].content==="</"?p.length>0&&p[p.length-1].tagName===u(w.content[0].content[1])&&p.pop():w.content[w.content.length-1].content==="/>"||p.push({tagName:u(w.content[0].content[1]),openedBraces:0}):p.length>0&&w.type==="punctuation"&&w.content==="{"?p[p.length-1].openedBraces++:p.length>0&&p[p.length-1].openedBraces>0&&w.type==="punctuation"&&w.content==="}"?p[p.length-1].openedBraces--:C=!0),(C||typeof w=="string")&&p.length>0&&p[p.length-1].openedBraces===0){var A=u(w);H<d.length-1&&(typeof d[H+1]=="string"||d[H+1].type==="plain-text")&&(A+=u(d[H+1]),d.splice(H+1,1)),H>0&&(typeof d[H-1]=="string"||d[H-1].type==="plain-text")&&(A=u(d[H-1])+A,d.splice(H-1,1),H--),d[H]=new t.Token("plain-text",A,null,A)}w.content&&typeof w.content!="string"&&h(w.content)}};t.hooks.add("after-tokenize",function(d){d.language!=="jsx"&&d.language!=="tsx"||h(d.tokens)})})(Prism);(function(t){var e=t.util.clone(t.languages.typescript);t.languages.tsx=t.languages.extend("jsx",e),delete t.languages.tsx.parameter,delete t.languages.tsx["literal-property"];var r=t.languages.tsx.tag;r.pattern=RegExp(/(^|[^\w$]|(?=<\/))/.source+"(?:"+r.pattern.source+")",r.pattern.flags),r.lookbehind=!0})(Prism);var yL=B(Q());var Gp=B(R());var qp=B(X());var VL=B(Q());var HL=B(X());var SL=B(Q()),Kp=B(R());var LL=B(R());var Xp=B(R());var bL=B(R());var Yp=B(X()),_L=B(Q());var Oi=B(R()),Ua=({onClick:t,children:e})=>(0,Oi.jsxs)("div",{className:"vuiScreenBlock",children:[e,(0,Oi.jsx)("div",{className:"vuiScreenBlock__mask",onClick:t})]});var Zp=B(R());var RL=B(X());var F7=B(R());var EL=B(Q()),Qp=B(R());var TL=B(Q());var kL=B(X()),O7=B(R());var IL=B(R());var NL=B(Q());var D7=B(R());var Jp=B(X()),PL=B(Q());var tf=B(R());var OL=B(Q());var FL=B(Q());var U7=B(R());var ef=B(X());var W7=B(R());var DL=B(Q());var rf=B(R());var UL=B(Q()),WL=B(R());var $L=B(Q());var af=B(R());var nf=B(X()),$7=B(Q());var J1=B(R()),jL=(t,e)=>`${t}#:~:text=${e}`,GL=(0,nf.forwardRef)(({result:t,position:e,isSelected:r,subTitle:i,children:o,className:c,snippetProps:u,...h},d)=>{let{title:p,url:H,date:w,snippet:{pre:C,post:A,text:E}}=t,M=(0,$7.default)("vuiSearchResult","fs-mask",c),S=(0,$7.default)("vuiSearchResultPosition",{"vuiSearchResultPosition--selected":r}),g=p&&p.trim().length>0,m=H&&H.trim().length>0;return(0,J1.jsxs)("div",{className:M,ref:d,...h,children:[(0,J1.jsx)("div",{"data-testid":`searchResultCitation-${e}`,className:S,children:e}),(g||m)&&(0,J1.jsx)(Fa,{size:"s",children:m?(0,J1.jsx)(i4,{href:jL(H,E),target:"_blank",children:(0,J1.jsx)("h3",{children:g?p:H})}):(0,J1.jsx)("h3",{children:p})}),i&&(0,J1.jsxs)(J1.Fragment,{children:[p&&(0,J1.jsx)(E1,{size:"xs"}),i]}),(0,J1.jsx)(Q1,{...u,size:"s",children:(0,J1.jsxs)("p",{children:[w&&(0,J1.jsxs)(I0,{color:"subdued",children:[w," \u2014 "]}),C," ",(0,J1.jsx)("strong",{children:E})," ",A]})}),o&&(0,J1.jsxs)(J1.Fragment,{children:[(0,J1.jsx)(E1,{size:"s"}),o]})]})});var of=B(X());var lf=B(R());var cf=B(R());var j7=B(R());var ZL=B(Q());var qL=B(Q());var YL=B(R());var QL=B(R());var nA=B(X()),iA=B(Q()),oA=B(uf());var JL=B(X());var tA=B(R());var eA=B(R());var sf=B(R());var rA=B(Q()),hf=B(R());var df=B(R());var aA=B(X());var vf=B(R());var pf=B(R());var G7=B(R());var lA=B(Q());var cA=B(R());var uA=B(Q()),ff=B(R());var K7=B(R());var l4=B(X()),dA="https://api.vectara.io/v1/query",xf=(t,e,r,i=dA)=>{let[o,c]=(0,l4.useState)(!1),u=(0,l4.useMemo)(()=>{let p=new Headers;return p.append("customer-id",t),p.append("x-api-key",r),p.append("content-type","application/json"),p},[t,r]),h=(0,l4.useCallback)(p=>JSON.stringify({query:[{query:p,start:0,numResults:20,corpusKey:[{corpusId:e}]}]}),[e]);return{fetchSearchResults:async p=>{c(!0);let H=h(p),C=await(await fetch(i,{headers:u,body:H,method:"POST"})).json();c(!1);let A=fA(C.responseSet?.[0])??[];return mA(A)},isLoading:o}},vA=t=>{let e={};return t.forEach(r=>{e[r.name]=r.value}),e},pA=t=>{let e=vA(t);return{source:e.source,url:e.url,title:e.title||"Untitled",metadata:e}},fA=t=>{if(!t)return;let e=[],{response:r,document:i}=t;return r.forEach(o=>{let{documentIndex:c,text:u}=o,{pre:h,post:d,text:p}=gA(u),H=i[Number(c)],{id:w,metadata:C}=H,{source:A,url:E,title:M,metadata:S}=pA(C);e.push({id:w,snippet:{pre:h,text:p,post:d},source:A,url:E,title:M,metadata:S})}),e},gf="%START_SNIPPET%",mf="%END_SNIPPET%",gA=t=>{let[e,r]=t.indexOf(gf)!==-1?t.split(gf):["",t],[i,o]=r.indexOf(mf)!==-1?r.split(mf):[r,""];return{pre:e,post:o,text:i}},mA=t=>{let e={},r=[];return t.forEach(i=>{e[i.url]||(r.push(i),e[i.url]=!0)}),r};var $a=B(R()),zf=({searchResult:t,isSelected:e=!1,shouldOpenInNewWindow:r=!1})=>{let{title:i,url:o,snippet:{text:c}}=t;return(0,$a.jsxs)("a",{className:`searchResult${e?" isSelected":""}`,href:o,target:r?"_blank":"_self",children:[(0,$a.jsx)("p",{className:"searchResultTitle",children:i}),(0,$a.jsx)("p",{className:"searchResultSnippet",children:c})]})};var c4=B(X());var H2=B(R()),Bf=({value:t,onChange:e,placeholder:r,autoFocus:i,onSubmit:o,isLoading:c,...u})=>(0,H2.jsx)("form",{onSubmit:o,children:(0,H2.jsxs)("div",{className:"searchInput",children:[(0,H2.jsx)("input",{className:"searchInput__input",type:"text",autoComplete:"off",autoCapitalize:"off",spellCheck:"false",autoFocus:i,placeholder:r,value:t,onChange:e,...u}),c?(0,H2.jsx)("div",{className:"searchInput__submitButton",children:(0,H2.jsx)(Da,{size:"xs"})}):(0,H2.jsx)("button",{className:"searchInput__submitButton",onClick:o,children:(0,H2.jsx)(ci,{size:"20px"})})]})});var u0=B(R()),Mf=(0,c4.forwardRef)(({isLoading:t,onChange:e,onKeyDown:r,onClose:i,isOpen:o,resultsList:c},u)=>{let h=(0,c4.useRef)(null);(0,c4.useEffect)(()=>{o?h.current=document.activeElement:(h.current?.focus(),h.current=null)},[o]);let d=()=>{window.setTimeout(()=>{i()},0)};return(0,u0.jsx)(Gr,{children:o&&(0,u0.jsx)(Ua,{children:(0,u0.jsx)(V7,{onEscapeKey:d,onClickOutside:d,returnFocus:!1,autoFocus:o,children:(0,u0.jsx)("div",{className:"searchModalContainer",children:(0,u0.jsxs)("div",{ref:u,className:"searchModal",children:[(0,u0.jsx)(Bf,{isLoading:t,onChange:e,onKeyDown:r,placeholder:"Search docs"}),c&&(0,u0.jsx)("div",{className:"searchModalResults",children:c}),(0,u0.jsxs)("div",{className:"searchModalFooter",children:[(0,u0.jsx)(E1,{size:"xs"}),(0,u0.jsx)(Q1,{size:"s",align:"right",children:(0,u0.jsx)("p",{children:(0,u0.jsxs)("strong",{children:[(0,u0.jsx)(I0,{color:"subdued",children:"Built with"})," ",(0,u0.jsx)(Ni,{href:"https://vectara.com",target:"_blank",children:"Vectara"})]})})}),(0,u0.jsx)(E1,{size:"xs"})]})]})})})})})});var xA=`.vuiAccordionHeader {
  font-size: 14px;
  border-bottom: 1px solid #cbcdde;
  width: 100%;
  padding: 8px 0;
}
.vuiAccordionHeader:hover {
  text-decoration: underline;
  background-color: #f3f7fb;
}

.vuiAccordionHeader__title {
  text-align: left;
}

.vuiAppContent {
  width: 100%;
  max-width: 1200px;
}

.vuiAppContent--fullWidth {
  max-width: 100%;
}

.vuiAppContent--paddingNone {
  padding: 0;
}

.vuiAppContent--paddingXs {
  padding: 8px 10px;
}

.vuiAppContent--paddingS {
  padding: 12px 15px;
}

.vuiAppContent--paddingM {
  padding: 16px 20px;
}

.vuiAppContent--paddingL {
  padding: 24px 30px;
}

.vuiAppContent--paddingXl {
  padding: 32px 40px;
}

.vuiAppHeader {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 46px;
  background-color: #f3f7fb;
  padding: 8px 16px;
  z-index: 8;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.vuiAppHeader__inner {
  flex-grow: 1;
}

.vuiAppLayout {
  display: flex;
  flex-direction: row;
  padding-top: 46px;
  height: 100vh;
}

.vuiAppLayout--full {
  padding-top: 0;
}

.vuiAppLayout__sideNav {
  border-right: 1px solid #cbcdde;
  flex-shrink: 0;
  overflow-y: auto;
}

.vuiAppLayout__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.vuiAppSideNav {
  width: 240px;
  overflow-x: hidden;
  transition: all 0.2s;
  line-height: 1;
}

.vuiAppSideNav__inner {
  width: 240px;
  padding: 28px 32px 32px 33px;
  margin-bottom: 160px;
  transition: all 0.2s;
}

.vuiAppSideNavContent {
  opacity: 1;
  transition: all 0.2s;
}

.vuiAppSideNavContent-isHidden {
  pointer-events: none;
  opacity: 0;
}

.vuiAppSideNav-isCollapsed {
  width: 60px;
  height: 100%;
  overflow-y: hidden;
}
.vuiAppSideNav-isCollapsed .vuiAppSideNav__inner {
  padding-left: 16px;
}

.vuiAppSideNavCollapseButton {
  display: block;
  color: #69707d;
  font-size: 14px;
  text-decoration: none;
  padding: 0 16px;
  margin-left: -40px;
  margin-bottom: 16px;
}
.vuiAppSideNavCollapseButton:hover {
  color: rgb(38, 76, 214);
  text-decoration: underline;
}

.vuiAppSideNavExpandButton {
  margin-top: -4px;
  margin-bottom: 6px;
}

.vuiAppSideNavLink {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  color: #2c313a;
  font-size: 14px;
  padding: 0 16px;
  margin-left: -16px;
  padding-top: 6px;
  padding-bottom: 6px;
  text-decoration: none;
}
.vuiAppSideNavLink * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vuiAppSideNavLink:hover {
  color: rgb(38, 76, 214);
  text-decoration: underline;
}

.vuiAppSideNavLink--active {
  background-color: rgb(217, 226, 255);
  border-radius: 16px;
}

.vuiAppSideNavSections {
  margin-top: 24px;
}

.vuiAppSideNavContent-isHidden .vuiAppSideNavSections {
  margin-top: 8px;
}

.vuiAppSideNavSection + .vuiAppSideNavSection {
  margin-top: 24px;
}

.vuiAppSideNavSection__title {
  color: #2c313a;
  font-weight: 600;
  font-size: 14px;
}

.vuiAppSideNavSection__items {
  margin-top: 12px;
}
.vuiAppSideNavSection__items > .vuiAppSideNavLink:first-child {
  margin-top: -6px;
}
.vuiAppSideNavSection__items > .vuiAppSideNavLink:last-child {
  margin-bottom: -6px;
}

.vuiAppSideNavTree {
  margin-top: -4px;
}

.vuiAppSideNavTreeSection {
  position: relative;
}

.vuiAppSideNavTreeToggleButton {
  position: absolute;
  top: 0;
  right: -30px;
}

.vuiAppSideNavTreeChildren {
  margin-left: 20px;
}

.vuiAppSideNavTreeSection__subTitle {
  display: block;
  color: #2c313a;
  font-size: 14px;
  padding: 0 16px;
  margin-left: -16px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #69707d;
}

.vuiAccountMenu {
  min-width: 260px;
}

.vuiAccounrMenuHeader {
  padding: 12px;
  border-bottom: 1px solid #e3e4f3;
  background-color: #f3f7fb;
}

.vuiAccountMenuHeaderItem__title {
  font-size: 12px;
  font-weight: 600;
  color: #2c313a;
}

.vuiAccountMenuHeaderItem__value {
  font-size: 14px;
  color: #2c313a;
  margin-top: 4px;
}

.vuiBadge {
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 12px;
  font-family: inherit;
  white-space: nowrap;
  text-decoration: none;
}

.vuiBadge--clickable {
  cursor: pointer;
}

.vuiBadge--accent {
  color: #551edf !important;
  background-color: rgba(85, 30, 223, 0.1);
  border: 1px solid rgba(85, 30, 223, 0.1);
  transition: all 0.2s;
}
.vuiBadge--accent.vuiBadge--clickable:hover {
  border-color: #551edf;
  text-decoration: none;
}

.vuiBadge--primary {
  color: rgb(38, 76, 214) !important;
  background-color: rgba(38, 76, 214, 0.1);
  border: 1px solid rgba(38, 76, 214, 0.1);
  transition: all 0.2s;
}
.vuiBadge--primary.vuiBadge--clickable:hover {
  border-color: rgb(38, 76, 214);
  text-decoration: none;
}

.vuiBadge--success {
  color: #04821f !important;
  background-color: rgba(4, 130, 31, 0.1);
  border: 1px solid rgba(4, 130, 31, 0.1);
  transition: all 0.2s;
}
.vuiBadge--success.vuiBadge--clickable:hover {
  border-color: #04821f;
  text-decoration: none;
}

.vuiBadge--warning {
  color: #965a15 !important;
  background-color: rgba(150, 90, 21, 0.1);
  border: 1px solid rgba(150, 90, 21, 0.1);
  transition: all 0.2s;
}
.vuiBadge--warning.vuiBadge--clickable:hover {
  border-color: #965a15;
  text-decoration: none;
}

.vuiBadge--danger {
  color: #c41535 !important;
  background-color: rgba(196, 21, 53, 0.1);
  border: 1px solid rgba(196, 21, 53, 0.1);
  transition: all 0.2s;
}
.vuiBadge--danger.vuiBadge--clickable:hover {
  border-color: #c41535;
  text-decoration: none;
}

.vuiBadge--neutral {
  color: #2c313a !important;
  background-color: #f3f7fb;
  border: 1px solid rgba(44, 49, 58, 0.1);
  transition: all 0.2s;
}
.vuiBadge--neutral.vuiBadge--clickable:hover {
  border-color: #2c313a;
  text-decoration: none;
}

.vuiBaseButtonIconContainer {
  line-height: 0;
}

.vuiBaseButtonLinkWrapper {
  text-decoration: none;
}
.vuiBaseButtonLinkWrapper:hover {
  text-decoration: none;
}

.vuiBaseButton {
  white-space: nowrap;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) 0px 0px 0px 0px;
  transition: all 0.2s;
  line-height: 1;
  cursor: pointer;
}

.vuiBaseButton-isInert,
.vuiBaseButton-isDisabled {
  cursor: default;
  pointer-events: none;
}

.vuiBaseButton-isDisabled {
  opacity: 0.5;
}

.vuiBaseButton--left .vuiBaseButtonIconContainer {
  margin-right: 8px;
}

.vuiBaseButton--right {
  flex-direction: row-reverse;
}
.vuiBaseButton--right .vuiBaseButtonIconContainer {
  margin-left: 8px;
  margin-right: 0;
}

.vuiBaseButton--fullWidth {
  width: 100%;
}

.vuiBaseButton--xs {
  font-size: 14px;
  padding: 4px 8px;
  height: 24px;
}

.vuiBaseButton--s {
  font-size: 14px;
  padding: 6px 8px;
  height: 28px;
}

.vuiBaseButton--m {
  font-size: 16px;
  padding: 8px 16px;
  height: 34px;
}

.vuiButtonPrimary:hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.vuiButtonPrimary--accent {
  color: #ffffff;
  background-color: #551edf;
  border: 1px solid #551edf;
}
.vuiButtonPrimary--accent.vuiButtonPrimary-isSelected {
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 6px 8px -2px, inset rgba(0, 0, 0, 0.3) 0px 3px 4px -3px;
}

.vuiButtonPrimary--primary {
  color: #ffffff;
  background-color: rgb(38, 76, 214);
  border: 1px solid rgb(38, 76, 214);
}
.vuiButtonPrimary--primary.vuiButtonPrimary-isSelected {
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 6px 8px -2px, inset rgba(0, 0, 0, 0.3) 0px 3px 4px -3px;
}

.vuiButtonPrimary--success {
  color: #ffffff;
  background-color: #04821f;
  border: 1px solid #04821f;
}
.vuiButtonPrimary--success.vuiButtonPrimary-isSelected {
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 6px 8px -2px, inset rgba(0, 0, 0, 0.3) 0px 3px 4px -3px;
}

.vuiButtonPrimary--danger {
  color: #ffffff;
  background-color: #c41535;
  border: 1px solid #c41535;
}
.vuiButtonPrimary--danger.vuiButtonPrimary-isSelected {
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 6px 8px -2px, inset rgba(0, 0, 0, 0.3) 0px 3px 4px -3px;
}

.vuiButtonPrimary--warning {
  color: #ffffff;
  background-color: #965a15;
  border: 1px solid #965a15;
}
.vuiButtonPrimary--warning.vuiButtonPrimary-isSelected {
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 6px 8px -2px, inset rgba(0, 0, 0, 0.3) 0px 3px 4px -3px;
}

.vuiButtonPrimary--neutral {
  color: #2c313a;
  background-color: rgba(44, 49, 58, 0.1);
  border: 1px solid rgba(44, 49, 58, 0.1);
}
.vuiButtonPrimary--neutral.vuiButtonPrimary-isSelected {
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 6px 8px -2px, inset rgba(0, 0, 0, 0.3) 0px 3px 4px -3px;
}

.vuiButtonPrimary--subdued {
  color: #69707d;
  background-color: rgba(105, 112, 125, 0.1);
  border: 1px solid rgba(105, 112, 125, 0.1);
}
.vuiButtonPrimary--subdued.vuiButtonPrimary-isSelected {
  box-shadow: inset rgba(50, 50, 93, 0.25) 0px 6px 8px -2px, inset rgba(0, 0, 0, 0.3) 0px 3px 4px -3px;
}

.vuiButtonSecondary:hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.vuiButtonSecondary--solid {
  background-color: #ffffff;
}

.vuiButtonSecondary--accent {
  border: 1px solid rgba(85, 30, 223, 0.5);
  color: #551edf;
}
.vuiButtonSecondary--accent.vuiButtonSecondary-isSelected {
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}

.vuiButtonSecondary--primary {
  border: 1px solid rgba(38, 76, 214, 0.5);
  color: rgb(38, 76, 214);
}
.vuiButtonSecondary--primary.vuiButtonSecondary-isSelected {
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}

.vuiButtonSecondary--success {
  border: 1px solid rgba(4, 130, 31, 0.5);
  color: #04821f;
}
.vuiButtonSecondary--success.vuiButtonSecondary-isSelected {
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}

.vuiButtonSecondary--danger {
  border: 1px solid rgba(196, 21, 53, 0.5);
  color: #c41535;
}
.vuiButtonSecondary--danger.vuiButtonSecondary-isSelected {
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}

.vuiButtonSecondary--warning {
  border: 1px solid rgba(150, 90, 21, 0.5);
  color: #965a15;
}
.vuiButtonSecondary--warning.vuiButtonSecondary-isSelected {
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}

.vuiButtonSecondary--neutral {
  border: 1px solid #cbcdde;
  color: #2c313a;
}
.vuiButtonSecondary--neutral.vuiButtonSecondary-isSelected {
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}

.vuiButtonSecondary--subdued {
  border: 1px solid #e3e4f3;
  color: #69707d;
}
.vuiButtonSecondary--subdued.vuiButtonSecondary-isSelected {
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}

.vuiButtonTertiary {
  padding-left: 8px;
  padding-right: 8px;
}
.vuiButtonTertiary:hover {
  text-decoration: underline;
}

.vuiButtonTertiary-noPadding {
  padding: 0;
}

.vuiButtonTertiary--accent {
  color: #551edf;
}
.vuiButtonTertiary--accent.vuiButtonTertiary-isSelected {
  background-color: rgba(85, 30, 223, 0.1);
}

.vuiButtonTertiary--primary {
  color: rgb(38, 76, 214);
}
.vuiButtonTertiary--primary.vuiButtonTertiary-isSelected {
  background-color: rgba(38, 76, 214, 0.1);
}

.vuiButtonTertiary--success {
  color: #04821f;
}
.vuiButtonTertiary--success.vuiButtonTertiary-isSelected {
  background-color: rgba(4, 130, 31, 0.1);
}

.vuiButtonTertiary--danger {
  color: #c41535;
}
.vuiButtonTertiary--danger.vuiButtonTertiary-isSelected {
  background-color: rgba(196, 21, 53, 0.1);
}

.vuiButtonTertiary--warning {
  color: #965a15;
}
.vuiButtonTertiary--warning.vuiButtonTertiary-isSelected {
  background-color: rgba(150, 90, 21, 0.1);
}

.vuiButtonTertiary--neutral {
  color: #2c313a;
}
.vuiButtonTertiary--neutral.vuiButtonTertiary-isSelected {
  background-color: rgba(44, 49, 58, 0.1);
}

.vuiButtonTertiary--subdued {
  color: #69707d;
}
.vuiButtonTertiary--subdued.vuiButtonTertiary-isSelected {
  background-color: rgba(105, 112, 125, 0.1);
}

.vuiIconButton {
  display: inline-block;
  border-radius: 4px;
  padding: 4px;
  line-height: 1;
}

.vuiIconButton--accent {
  color: #551edf;
  background-color: rgba(85, 30, 223, 0);
  transition: all 0.2s;
}
.vuiIconButton--accent:hover {
  background-color: rgba(85, 30, 223, 0.1);
}

.vuiIconButton--primary {
  color: rgb(38, 76, 214);
  background-color: rgba(38, 76, 214, 0);
  transition: all 0.2s;
}
.vuiIconButton--primary:hover {
  background-color: rgba(38, 76, 214, 0.1);
}

.vuiIconButton--success {
  color: #04821f;
  background-color: rgba(4, 130, 31, 0);
  transition: all 0.2s;
}
.vuiIconButton--success:hover {
  background-color: rgba(4, 130, 31, 0.1);
}

.vuiIconButton--warning {
  color: #965a15;
  background-color: rgba(150, 90, 21, 0);
  transition: all 0.2s;
}
.vuiIconButton--warning:hover {
  background-color: rgba(150, 90, 21, 0.1);
}

.vuiIconButton--danger {
  color: #c41535;
  background-color: rgba(196, 21, 53, 0);
  transition: all 0.2s;
}
.vuiIconButton--danger:hover {
  background-color: rgba(196, 21, 53, 0.1);
}

.vuiIconButton--neutral {
  color: #2c313a;
  background-color: rgba(44, 49, 58, 0);
  transition: all 0.2s;
}
.vuiIconButton--neutral:hover {
  background-color: rgba(44, 49, 58, 0.1);
}

.vuiIconButton--subdued {
  color: #69707d;
  background-color: rgba(105, 112, 125, 0);
  transition: all 0.2s;
}
.vuiIconButton--subdued:hover {
  background-color: rgba(105, 112, 125, 0.1);
}

.vuiIconButton--xs {
  padding: 4px;
  height: 24px;
}

.vuiIconButton--s {
  padding: 6px;
  height: 28px;
}

.vuiIconButton--m {
  padding: 8px;
  height: 34px;
}

.vuiCallout {
  width: 100%;
}

.vuiCallout--m {
  padding: 16px;
}
.vuiCallout--m .vuiCallout__closeButton {
  margin: -8px;
}

.vuiCallout--s {
  padding: 12px;
}
.vuiCallout--s .vuiCallout__closeButton {
  margin: -6px;
}

.vuiCallout--accent {
  background-color: rgba(85, 30, 223, 0.1);
}

.vuiCallout--primary {
  background-color: rgb(217, 226, 255);
}

.vuiCallout--success {
  background-color: rgba(4, 130, 31, 0.1);
}

.vuiCallout--warning {
  background-color: rgba(150, 90, 21, 0.1);
}

.vuiCallout--danger {
  background-color: #fae9eb;
}

.vuiCallout--neutral {
  background-color: #f3f7fb;
}

.vuiCard {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0 0 0, rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 100%;
  height: 100%;
  transition: all 0.2s;
}

.vuiCard--interactive:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  z-index: 1;
}

.vuiCard--center {
  align-items: center;
  text-align: center;
}
.vuiCard--center .vuiCard__content,
.vuiCard--center .vuiCard__footer {
  align-items: center;
  text-align: center;
}

.vuiCard--left {
  align-items: flex-start;
  text-align: left;
}
.vuiCard--left .vuiCard__content,
.vuiCard--left .vuiCard__footer {
  align-items: flex-start;
  text-align: left;
}

.vuiCard__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 24px;
}

.vuiCard__footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #e3e4f3;
  padding: 16px 24px;
}

.vuiCard--s .vuiCard__content,
.vuiCard--s .vuiCard__footer {
  padding: 16px 24px;
}

.vuiCard--m .vuiCard__content,
.vuiCard--m .vuiCard__footer {
  padding: 24px 32px;
}

.vuiCard--l .vuiCard__content,
.vuiCard--l .vuiCard__footer {
  padding: 32px 40px;
}

.vuiChatTurn {
  position: relative;
  left: 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0 0 0, rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #ffffff;
  padding: 24px 12px 24px 24px;
  margin-right: 4px;
  transition: all 0.2s;
}
.vuiChatTurn:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  z-index: 1;
  left: 4px;
}

.vuiChatTurn + .vuiChatTurn {
  margin-top: 1px;
}

.vuiChatQuestion {
  color: #551edf;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.vuiChatQuestion--error {
  color: #c41535;
}

.vuiChat__inspectButton {
  margin-top: -4px;
}

.vuiChatAnswer {
  color: #000;
}

.vuiChatButton,
.vuiChat {
  position: fixed;
  right: 4px;
  bottom: 4px;
  z-index: 9;
}

.vuiChatButton-isHidden,
.vuiChat--closed {
  visibility: hidden;
  opacity: 0;
}

.vuiChatButton {
  padding: 8px 12px;
  font-size: 14px;
  color: #2c313a;
  background-color: rgb(217, 226, 255);
  border: 1px solid #cbcdde;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: all 0.2s;
  animation: popUp 0.4s cubic-bezier(0.5, 0, 0.5, 1) 1;
}
.vuiChatButton:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  translate: translateY(-20px);
}

@keyframes popUp {
  0% {
    transform: translateY(40px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
.vuiChat {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #cbcdde;
  background-color: #f3f7fb;
}
@media screen and (max-height: 600px) {
  .vuiChat {
    bottom: 4px;
    height: calc(100vh - 2 * 4px);
  }
  .vuiChat .vuiChat__conversation {
    max-height: 100%;
  }
}
@media screen and (max-width: 600px) {
  .vuiChat {
    right: 4px;
    width: calc(100vw - 2 * 4px);
    max-width: 100% !important;
  }
}

.vuiChat--tall {
  bottom: 4px;
  height: calc(100vh - 2 * 4px);
}
.vuiChat--tall .vuiChat__conversation {
  max-height: 100%;
}

.vuiChat--fullScreen {
  height: calc(100vh - 2 * 4px);
  width: calc(100vw - 2 * 4px);
  max-width: 100% !important;
}
.vuiChat--fullScreen .vuiChat__conversation {
  max-height: 100%;
}

.vuiChat__header {
  padding: 8px 12px;
  font-size: 14px;
  color: #2c313a;
  background-color: rgb(217, 226, 255);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  z-index: 2;
}

.vuiChat__conversation {
  flex-grow: 1;
  max-height: 400px;
  overflow-y: auto;
}

.vuiChat__introduction {
  padding: 16px 24px 0;
  font-size: 14px;
  color: #000;
}

.vuiChat__turns {
  font-size: 14px;
}

.vuiChat__conversationActions {
  padding: 12px;
}

.vuiChat__input {
  border-top: 1px solid #e3e4f3;
  padding: 8px 12px;
}

.vuiChatPanel {
  position: absolute;
  z-index: 5;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  padding: 4px 12px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #cbcdde;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.vuiCodeContainer {
  position: relative;
  border-left: 4px solid #cbcdde;
  max-height: 480px;
}

.vuiCodeContainer--fullHeight {
  max-height: 100%;
}

.vuiCodeCopyButton {
  position: absolute;
  right: 4px;
  top: 4px;
}

.vuiCodePre {
  padding: 0 !important;
  margin: 0 !important;
  max-height: inherit;
}

.vuiCode {
  display: block;
  width: 100%;
  padding: 16px 24px;
  background-color: #f3f7fb;
  color: #2c313a;
  font-family: "Roboto Mono", monospace;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 12px !important;
}

@keyframes drawerIn {
  0% {
    right: -680px;
  }
  100% {
    right: 0;
  }
}
.vuiDrawer {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 680px;
  background-color: #ffffff;
  border-left: 1px solid #cbcdde;
  z-index: 11;
  animation: drawerIn 0.2s cubic-bezier(0, 1, 0, 1);
}

.vuiDrawerHeader {
  padding: 24px 24px;
}

.vuiDrawerContent {
  overflow-y: auto;
  overscroll-behavior: contain;
}

.vuiDrawerContent__inner {
  padding: 24px 24px;
}

.vuiDrawer--primary .vuiDrawerHeader {
  background-color: rgb(217, 226, 255);
  color: #2c313a;
}

.vuiDrawer--danger .vuiDrawerHeader {
  background-color: #fae9eb;
  color: #c41535;
}

.vuiFlexContainer {
  display: flex;
  align-items: stretch;
}

.vuiFlexContainer--fullWidth {
  width: 100%;
}

.vuiFlexContainer--wrap {
  flex-wrap: wrap;
}

.vuiFlexContainer--alignItemsBaseline {
  align-items: baseline;
}

.vuiFlexContainer--alignItemsCenter {
  align-items: center;
}

.vuiFlexContainer--alignItemsEnd {
  align-items: end;
}

.vuiFlexContainer--alignItemsStart {
  align-items: start;
}

.vuiFlexContainer--alignItemsStretch {
  align-items: stretch;
}

.vuiFlexContainer--directionColumn {
  flex-direction: column;
}

.vuiFlexContainer--directionColumnReverse {
  flex-direction: column-reverse;
}

.vuiFlexContainer--directionRow {
  flex-direction: row;
}

.vuiFlexContainer--directionRowReverse {
  flex-direction: row-reverse;
}

.vuiFlexContainer--justifyContentCenter {
  justify-content: center;
}

.vuiFlexContainer--justifyContentEnd {
  justify-content: end;
}

.vuiFlexContainer--justifyContentStart {
  justify-content: start;
}

.vuiFlexContainer--justifyContentSpaceAround {
  justify-content: space-around;
}

.vuiFlexContainer--justifyContentSpaceBetween {
  justify-content: space-between;
}

.vuiFlexContainer--justifyContentSpaceEvenly {
  justify-content: space-evenly;
}

.vuiFlexContainer--spacingNone {
  margin: 0;
}
.vuiFlexContainer--spacingNone > .vuiFlexItem {
  margin: 0;
}

.vuiFlexContainer--spacingXxs {
  margin: -2px;
}
.vuiFlexContainer--spacingXxs > .vuiFlexItem {
  margin: 2px;
}

.vuiFlexContainer--spacingXs {
  margin: -4px;
}
.vuiFlexContainer--spacingXs > .vuiFlexItem {
  margin: 4px;
}

.vuiFlexContainer--spacingS {
  margin: -6px;
}
.vuiFlexContainer--spacingS > .vuiFlexItem {
  margin: 6px;
}

.vuiFlexContainer--spacingM {
  margin: -8px;
}
.vuiFlexContainer--spacingM > .vuiFlexItem {
  margin: 8px;
}

.vuiFlexContainer--spacingL {
  margin: -12px;
}
.vuiFlexContainer--spacingL > .vuiFlexItem {
  margin: 12px;
}

.vuiFlexContainer--spacingXl {
  margin: -16px;
}
.vuiFlexContainer--spacingXl > .vuiFlexItem {
  margin: 16px;
}

.vuiFlexContainer--spacingXxl {
  margin: -20px;
}
.vuiFlexContainer--spacingXxl > .vuiFlexItem {
  margin: 20px;
}

.vuiFlexItem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.vuiFlexItem--truncate {
  min-width: 40px;
}

.vuiFlexItem--alignItemsBaseline {
  align-items: baseline;
}

.vuiFlexItem--alignItemsCenter {
  align-items: center;
}

.vuiFlexItem--alignItemsEnd {
  align-items: end;
}

.vuiFlexItem--alignItemsStart {
  align-items: start;
}

.vuiFlexItem--alignItemsStretch {
  align-items: stretch;
}

.vuiFlexItem--flexGrow0 {
  flex-grow: 0;
}

.vuiFlexItem--flexGrow1 {
  flex-grow: 1;
}

.vuiFlexItem--flexGrow2 {
  flex-grow: 2;
}

.vuiFlexItem--flexGrow3 {
  flex-grow: 3;
}

.vuiFlexItem--flexGrow4 {
  flex-grow: 4;
}

.vuiFlexItem--flexGrow5 {
  flex-grow: 5;
}

.vuiFlexItem--flexGrow6 {
  flex-grow: 6;
}

.vuiFlexItem--flexGrow7 {
  flex-grow: 7;
}

.vuiFlexItem--flexGrow8 {
  flex-grow: 8;
}

.vuiFlexItem--flexGrow9 {
  flex-grow: 9;
}

.vuiFlexItem--flexGrow10 {
  flex-grow: 10;
}

.vuiFlexItem--flexGrowNone {
  flex-basis: auto;
  flex-grow: 0;
}

.vuiFlexItem--flexShrink0 {
  flex-shrink: 0;
}

.vuiFlexItem--flexShrink1 {
  flex-shrink: 1;
}

.vuiFlexItem--flexShrink2 {
  flex-shrink: 2;
}

.vuiFlexItem--flexShrink3 {
  flex-shrink: 3;
}

.vuiFlexItem--flexShrink4 {
  flex-shrink: 4;
}

.vuiFlexItem--flexShrink5 {
  flex-shrink: 5;
}

.vuiFlexItem--flexShrink6 {
  flex-shrink: 6;
}

.vuiFlexItem--flexShrink7 {
  flex-shrink: 7;
}

.vuiFlexItem--flexShrink8 {
  flex-shrink: 8;
}

.vuiFlexItem--flexShrink9 {
  flex-shrink: 9;
}

.vuiFlexItem--flexShrink10 {
  flex-shrink: 10;
}

.vuiFlexItem--flexShrinkNone {
  flex-basis: auto;
  flex-shrink: 0;
}

.vuiFlexItem--auto {
  flex-basis: auto;
}

.vuiFlexItem--content {
  flex-basis: content;
}

.vuiFlexItem--fill {
  flex-basis: fill;
}

.vuiFlexItem--maxContent {
  flex-basis: max-content;
}

.vuiFlexItem--minContent {
  flex-basis: min-content;
}

.vuiFlexItem--none {
  flex-basis: 0;
}

.vuiCheckboxLabel {
  font-size: 14px;
}

.vuiInput {
  appearance: none;
  border-radius: 4px;
  border: 1px solid #cbcdde;
  background-color: #ffffff;
}

.vuiInput--m {
  padding: 8px 16px;
  font-size: 14px;
}

.vuiInput--l {
  padding: 12px 16px;
  font-size: 18px;
}

.vuiInput--fullWidth {
  width: 100%;
}

.vuiInput-isInvalid {
  border-color: #c41535;
}

.vuiLabel {
  font-size: 14px;
  font-weight: 600;
  color: #2c313a;
}

.vuiRadioButtonLabel {
  font-size: 14px;
}

.vuiSelect {
  position: relative;
  max-width: 240px;
  width: 100%;
}
.vuiSelect select {
  background-color: #ffffff;
  appearance: none;
  border-radius: 4px;
  border: 1px solid #cbcdde;
  color: #000;
  width: 100%;
}

.vuiSelect__caret {
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: auto;
  right: 12px;
}

.vuiSelect--m select {
  padding: 8px 16px;
  font-size: 14px;
  padding-right: 32px;
}
.vuiSelect--m .vuiSelect__caret {
  top: calc(50% - 10px);
}

.vuiSelect--l select {
  padding: 12px 16px;
  font-size: 18px;
  padding-right: 48px;
}
.vuiSelect--l .vuiSelect__caret {
  top: calc(50% - 14px);
}

.vuiSelect-isInvalid select {
  border-color: #c41535;
}

.vuiSuperRadioGroup {
  display: grid;
  gap: 8px;
}

.vuiSuperRadioButton {
  display: block;
  width: 100%;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  text-decoration-color: #2c313a;
  text-align: left;
  background-color: #f3f7fb;
}
.vuiSuperRadioButton:hover {
  text-decoration: underline;
  text-decoration-color: #2c313a;
  background-color: rgb(217, 226, 255);
}

.vuiTextArea {
  appearance: none;
  border-radius: 4px;
  border: 1px solid #cbcdde;
  max-width: 100%;
  resize: none;
  min-height: 80px;
  font-size: 14px;
  padding: 12px;
}

.vuiTextArea--fullWidth {
  width: 100%;
}

.vuiHorizontalRule {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #cbcdde;
  width: 100%;
}

.vuiIcon {
  line-height: 0;
}

.vuiIcon--inline {
  display: inline-block;
}

.vuiIcon--accent {
  color: #551edf !important;
}

.vuiIcon--primary {
  color: rgb(38, 76, 214) !important;
}

.vuiIcon--success {
  color: #04821f !important;
}

.vuiIcon--warning {
  color: #965a15 !important;
}

.vuiIcon--danger {
  color: #c41535 !important;
}

.vuiIcon--subdued {
  color: #69707d !important;
}

.vuiIcon--neutral {
  color: #2c313a !important;
}

.vuiIcon--empty {
  color: #ffffff !important;
}

.vuiInfoTable {
  width: 100%;
  table-layout: fixed;
  border: 1px solid #e3e4f3;
}
.vuiInfoTable thead {
  background-color: #f3f7fb;
  border-bottom: 1px solid #e3e4f3;
}
.vuiInfoTable tbody tr {
  border-bottom: 1px solid #e3e4f3;
}
.vuiInfoTable th {
  font-size: 12px;
  font-weight: 600;
  padding: 8px 12px;
  text-align: left;
}
.vuiInfoTable td {
  font-size: 14px;
  vertical-align: middle;
}

.vuiInfoTable--paddingXxs td {
  padding: 4px 12px;
}

.vuiInfoTable--paddingXs td {
  padding: 8px 12px;
}

.vuiInfoTable--paddingS td {
  padding: 12px 12px;
}

.vuiInfoTableRow--sectionHeader {
  background-color: #f3f7fb;
  border-bottom: none !important;
}

.vuiInfoTableRow--footer {
  background-color: #f3f7fb;
}

.vuiLink {
  color: rgb(38, 76, 214) !important;
  text-decoration: none;
}
.vuiLink:hover {
  text-decoration: underline;
}

.vuiLink--button {
  display: inline;
}

.vuiListNumber {
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  background-color: #f3f7fb;
  color: #69707d;
  font-weight: 600;
  line-height: 0;
  align-items: center;
}

.vuiListNumber--m {
  width: 16px;
  height: 16px;
  padding: 16px;
  font-size: 16px;
}

.vuiListNumber--s {
  width: 12px;
  height: 12px;
  padding: 12px;
  font-size: 12px;
}

.vuiListNumber-isComplete {
  background-color: #eadfff;
  color: #551edf;
}

.vuiMenu {
  border: 1px solid #cbcdde;
  border-radius: 8px;
}

.vuiMenuItem + .vuiMenuItem {
  border-top: 1px solid #cbcdde;
}

.vuiMenuItem {
  display: block;
  width: 100%;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) 0px 0px 0px 0px;
  transition: all 0.2s;
  text-decoration-color: #2c313a;
  text-align: left;
}
.vuiMenuItem:hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  text-decoration: underline;
  text-decoration-color: #2c313a;
}

@keyframes modalIn {
  0% {
    transform: translateX(40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.vuiModalContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: modalIn 0.2s cubic-bezier(0, 1, 1, 1);
  pointer-events: none;
}

.vuiModal {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  max-height: calc(100vh - 200px);
  background-color: #ffffff;
  border: 1px solid #cbcdde;
  z-index: 12;
  pointer-events: all;
}

.vuiModalHeader {
  padding: 16px;
}

.vuiModalContent {
  overflow-y: scroll;
  overscroll-behavior: contain;
}

.vuiModalContent__inner {
  padding: 24px 16px 40px;
}

.vuiModal--primary .vuiModalHeader {
  background-color: rgb(217, 226, 255);
  color: #2c313a;
}

.vuiModal--danger .vuiModalHeader {
  background-color: #fae9eb;
  color: #c41535;
}

.vuiNotificationList {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  animation: popTop 0.4s cubic-bezier(0.5, 0, 0.5, 1) 1;
}

.vuiNotificationList__notifications {
  padding: 4px;
  border-bottom-left-radius: 16px;
  transition: all 0.2s;
}

.vuiNotificationList--hasMany .vuiNotificationList__notifications {
  border-bottom-left-radius: 8px;
}

.vuiNotificationContainer {
  position: relative;
}

.vuiNotification {
  position: relative;
  z-index: 1;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  color: #2c313a;
  width: 420px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0 0 0, rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #ffffff;
}

.vuiNotificationPlaceholder {
  position: absolute;
  z-index: 0;
  bottom: 0;
}

.vuiNotificationPlaceholder1-isVisible {
  bottom: -4px;
  animation: popBottom1 0.2s cubic-bezier(0.5, 0, 0.5, 1) 1;
}

.vuiNotificationPlaceholder2-isVisible {
  bottom: -7px;
  animation: popBottom2 0.2s cubic-bezier(0.5, 0, 0.5, 1) 1;
}

@keyframes popTop {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes popBottom1 {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    transform: translateY(2px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes popBottom2 {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    transform: translateY(8x);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}
.vuiOptionsButtonLeft {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

.vuiOptionsButtonRight {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 1px solid;
}

.vuiButtonPrimary.vuiOptionsButtonRight--accent {
  border-left-color: rgba(255, 255, 255, 0.5);
}

.vuiButtonPrimary.vuiOptionsButtonRight--primary {
  border-left-color: rgba(255, 255, 255, 0.5);
}

.vuiButtonPrimary.vuiOptionsButtonRight--success {
  border-left-color: rgba(255, 255, 255, 0.5);
}

.vuiButtonPrimary.vuiOptionsButtonRight--danger {
  border-left-color: rgba(255, 255, 255, 0.5);
}

.vuiButtonPrimary.vuiOptionsButtonRight--warning {
  border-left-color: rgba(255, 255, 255, 0.5);
}

.vuiButtonPrimary.vuiOptionsButtonRight--neutral {
  border-left-color: rgba(44, 49, 58, 0.2);
}

.vuiButtonSecondary.vuiOptionsButtonRight--accent {
  border-left-color: rgba(85, 30, 223, 0.3);
}

.vuiButtonSecondary.vuiOptionsButtonRight--primary {
  border-left-color: rgba(38, 76, 214, 0.3);
}

.vuiButtonSecondary.vuiOptionsButtonRight--success {
  border-left-color: rgba(4, 130, 31, 0.3);
}

.vuiButtonSecondary.vuiOptionsButtonRight--danger {
  border-left-color: rgba(196, 21, 53, 0.3);
}

.vuiButtonSecondary.vuiOptionsButtonRight--warning {
  border-left-color: rgba(150, 90, 21, 0.3);
}

.vuiButtonSecondary.vuiOptionsButtonRight--neutral {
  border-left-color: rgba(44, 49, 58, 0.2);
}

.vuiOptionsList {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.vuiOptionsList--scrollable {
  max-height: 220px;
  overflow-y: auto;
}

.vuiOptionsList--s .vuiOptionsListItem {
  padding: 5px 8px;
}

.vuiOptionsList--m .vuiOptionsListItem {
  padding: 5px 12px;
}

.vuiOptionsList--l .vuiOptionsListItem {
  padding: 8px 12px;
}

.vuiOptionsListItem {
  background-color: #ffffff;
  text-decoration: none;
}
.vuiOptionsListItem:hover {
  text-decoration: underline;
}

.vuiOptionsListItem--accent {
  color: #551edf;
}
.vuiOptionsListItem--accent:hover {
  color: #551edf;
  background-color: #eadfff;
}

.vuiOptionsListItem--primary {
  color: rgb(38, 76, 214);
}
.vuiOptionsListItem--primary:hover {
  color: rgb(38, 76, 214);
  background-color: rgb(217, 226, 255);
}

.vuiOptionsListItem--success {
  color: #04821f;
}
.vuiOptionsListItem--success:hover {
  color: #04821f;
  background-color: #e9f2e9;
}

.vuiOptionsListItem--danger {
  color: #c41535;
}
.vuiOptionsListItem--danger:hover {
  color: #c41535;
  background-color: #fae9eb;
}

.vuiOptionsListItem--warning {
  color: #965a15;
}
.vuiOptionsListItem--warning:hover {
  color: #965a15;
  background-color: #f4eee8;
}

.vuiOptionsListItem--neutral {
  color: #2c313a;
}
.vuiOptionsListItem--neutral:hover {
  color: #2c313a;
  background-color: #f3f7fb;
}

.vuiPopover {
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #cbcdde;
  z-index: 13;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.vuiOptionsListItem__selected--unselected {
  visibility: hidden;
}

.vuiPopoverTitle {
  padding: 8px 12px;
  border-bottom: 1px solid #cbcdde;
  font-weight: 600;
  font-size: 14px;
  color: #2c313a;
}

.vuiPopoverContent {
  padding: 4px 0;
}

.vuiPopoverContent--padding {
  padding: 12px;
}

.vuiProgressBar {
  position: relative;
  border-radius: 4px;
  height: 12px;
  overflow: hidden;
}

.vuiProgressBar__empty,
.vuiProgressBar__bar,
.vuiProgressBar__outline {
  position: absolute;
  width: 100%;
  height: 100%;
}

.vuiProgressBar__empty {
  z-index: 0;
  background-color: #f3f7fb;
  box-shadow: inset rgba(0, 0, 0, 0.05) 0px 2px 2px;
}

.vuiProgressBar__bar {
  transition: all 0.2s;
  z-index: 1;
}

.vuiProgressBar__outline {
  z-index: 2;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.vuiProgressBar--accent .vuiProgressBar__bar {
  background-color: #551edf;
}

.vuiProgressBar--primary .vuiProgressBar__bar {
  background-color: rgb(38, 76, 214);
}

.vuiProgressBar--success .vuiProgressBar__bar {
  background-color: #04821f;
}

.vuiProgressBar--warning .vuiProgressBar__bar {
  background-color: #965a15;
}

.vuiProgressBar--danger .vuiProgressBar__bar {
  background-color: #c41535;
}

.vuiProgressBar--neutral .vuiProgressBar__bar {
  background-color: #69707d;
}

.vuiPrompt {
  position: relative;
  border-radius: 16px;
  transition: all 0.2s;
  word-wrap: break-word;
}

.vuiPrompt--speechBubble::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  left: 48px;
  border-style: solid;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-width: 20px;
  margin-left: -20px;
  margin-bottom: -20px;
  border-top-color: #f3f7fb;
  border-bottom: 0;
}

.vuiPrompt--interactive:hover {
  background-color: #eadfff;
  color: #551edf;
}

.vuiPrompt--danger {
  color: #c41535;
  background-color: #fae9eb;
}

.vuiPrompt--neutral {
  color: #69707d;
  background-color: #f3f7fb;
}

.vuiPrompt--paddingXs {
  padding: 8px;
}

.vuiPrompt--paddingS {
  padding: 12px;
}

.vuiPrompt--paddingM {
  padding: 16px;
}

.vuiPrompt--paddingL {
  padding: 24px;
}

.vuiPrompt--paddingXl {
  padding: 32px;
}

.vuiPrompt--paddingXxl {
  padding: 64px;
}

.vuiScreenBlock {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vuiScreenBlock__mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.vuiSearchInput {
  position: relative;
  display: flex;
  align-items: center;
}

.vuiSearchInput__input {
  flex-grow: 1;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #cbcdde;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) 0px 0px 0px 0px;
  transition: all 0.2s;
  outline-width: 1px !important;
  outline-style: solid;
  outline-color: transparent;
  outline-offset: -1px !important;
}
.vuiSearchInput__input:focus-visible {
  background-color: #f3f7fb;
  outline-color: #551edf !important;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.vuiSearchInput__submitButton {
  position: absolute;
  right: 12px;
  line-height: 0;
  color: #69707d;
  transition: all 0.2s;
}
.vuiSearchInput__submitButton:hover {
  color: #551edf;
}

.vuiSearchInput--m .vuiSearchInput__input {
  font-size: 14px;
}

.vuiSearchInput--l .vuiSearchInput__input {
  font-size: 18px;
}

.vuiSearchResult {
  position: relative;
}
.vuiSearchResult + .vuiSearchResult {
  margin-top: 24px;
}

.vuiSearchResultPosition {
  position: absolute;
  left: -42px;
  top: 0;
  font-weight: 600;
  padding: 8px;
  color: #69707d;
  padding: 4px 8px;
  width: 30px;
  text-align: center;
  font-size: 12px;
  border-radius: 8px;
  height: 23px;
  transition: all 0.2s;
}

.vuiSearchResultPosition--selected {
  background-color: rgb(38, 76, 214);
  color: #ffffff;
  height: 100%;
}

.vuiSearchSelectHeader {
  background-color: #f3f7fb;
  padding: 16px;
  border-bottom: 1px solid #cbcdde;
  font-weight: 600;
  font-size: 14px;
  color: #2c313a;
}

.vuiSearchSelect__search {
  padding: 4px 8px;
  border-bottom: 1px solid #cbcdde;
}

.vuiSpacer {
  flex-shrink: 0;
}

.vuiSpacer--xxxs {
  height: 2px;
}

.vuiSpacer--xxs {
  height: 4px;
}

.vuiSpacer--xs {
  height: 8px;
}

.vuiSpacer--s {
  height: 12px;
}

.vuiSpacer--m {
  height: 16px;
}

.vuiSpacer--l {
  height: 24px;
}

.vuiSpacer--xl {
  height: 32px;
}

.vuiSpacer--xxl {
  height: 40px;
}

.vuiSpinner--xs {
  width: 16px;
  height: 16px;
}

.vuiSpinner--s {
  width: 24px;
  height: 24px;
}

.vuiSpinner--m {
  width: 32px;
  height: 32px;
}

.vuiSpinner--l {
  width: 48px;
  height: 48px;
}

.vuiSpinner--xl {
  width: 64px;
  height: 64px;
}

.vuiSpinner--xxl {
  width: 80px;
  height: 80px;
}

.vuiSpinner--xxxl {
  width: 100px;
  height: 100px;
}

.vuiSpinner__animation {
  width: 100%;
  height: 100%;
}

.vuiSummary {
  font-size: 16px;
}

.vuiSummaryCitation {
  position: relative;
  top: -2px;
  display: inline-block !important;
}

.vuiSummaryCitation-isSelected {
  background-color: rgb(38, 76, 214);
  color: #ffffff;
}

.vuiTable {
  width: 100%;
  table-layout: fixed;
}
.vuiTable thead {
  border-bottom: 1px solid #cbcdde;
}
.vuiTable tbody tr {
  border-bottom: 1px solid #e3e4f3;
}
.vuiTable tbody tr.vuiTableRow-isBeingActedUpon, .vuiTable tbody tr:not(.vuiTableRow--inert):hover {
  background-color: #f3f7fb;
}
.vuiTable tbody tr:last-child {
  border-bottom: 1px solid #cbcdde;
}
.vuiTable th {
  font-size: 14px;
  font-weight: 600;
  padding: 4px;
}
.vuiTable td {
  font-size: 14px;
  padding: 4px;
  vertical-align: middle;
  word-break: break-word;
}

.vuiTable--fluid {
  table-layout: auto;
}

.vuiTableCell {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.vuiTableActions {
  display: flex;
  justify-content: flex-end;
}

.vuiTableManyPagesToken {
  padding: 0 8px;
}

.vuiTableManyPagesToken-isDisabled {
  opacity: 0.5;
}

.vuiTableHeaderSelect {
  width: 32px;
}

.vuiTableHeaderActions {
  width: 42px;
}

.vuiTableContent {
  height: 80px;
}

.vuiTabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cbcdde;
  justify-content: space-between;
}

.vuiTabs--s .vuiTab {
  padding: 8px 12px;
  font-size: 14px;
}

.vuiTabs--m .vuiTab {
  padding: 8px 16px;
  font-size: 16px;
}

.vuiTabs__tabs {
  display: flex;
  align-items: center;
}

.vuiTabs__appendedContent {
  flex-basis: auto;
  flex-grow: 0;
}

.vuiTab {
  flex-grow: 0;
  flex-shrink: 0;
  color: #69707d;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: transparent 0px 1px 0px;
  cursor: pointer;
}
.vuiTab:hover, .vuiTab:active {
  color: #551edf;
  text-decoration: none;
}
.vuiTab:hover {
  background-color: #f3f7fb;
}
.vuiTab:active {
  background-color: rgba(85, 30, 223, 0.1);
}
.vuiTab.vuiTab-isActive {
  color: #2c313a;
  box-shadow: #551edf 0px 1px 0px;
}

.vuiToggle {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.vuiToggle__input {
  opacity: 0;
  width: 0;
  height: 0;
}
.vuiToggle__input:checked + .vuiToggle__button {
  background-color: rgb(38, 76, 214);
}
.vuiToggle__input:focus-visible + .vuiToggle__button {
  outline: 2px solid rgba(38, 76, 214, 0.75);
  outline-offset: 2px;
}
.vuiToggle__input:checked + .vuiToggle__button:before {
  transform: translateX(16px);
}

.vuiToggle__button {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbcdde;
  transition: 0.2s;
  border-radius: 16px;
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 2px 2px;
}
.vuiToggle__button:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: #ffffff;
  transition: 0.2s;
  border-radius: 50%;
}

.vuiTitle {
  color: #2c313a;
  margin-bottom: 0;
}

.vuiTitle--xxs {
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  color: #2c313a;
}

.vuiTitle--xs {
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #2c313a;
}

.vuiTitle--s {
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
  color: #69707d;
}

.vuiTitle--m {
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
  color: #2c313a;
}

.vuiTitle--l {
  font-size: 30px;
  line-height: 30px;
  font-weight: 400;
  color: #2c313a;
}

.vuiTitle--xl {
  font-size: 40px;
  line-height: 40px;
  font-weight: 400;
  color: #2c313a;
}

.vuiTitle--xxl {
  font-size: 40px;
  line-height: 40px;
  font-weight: 600;
  color: #2c313a;
}

.vuiTitle--left {
  text-align: left;
}

.vuiTitle--center {
  text-align: center;
}

.vuiTitle--right {
  text-align: right;
}

.vuiText {
  overflow-wrap: break-word;
  word-break: break-word;
}
.vuiText ul {
  list-style: disc;
}
.vuiText ol {
  list-style: auto;
}
.vuiText ul,
.vuiText ol {
  margin-left: 16px;
  margin-bottom: 8px;
}
.vuiText ul:last-child,
.vuiText ol:last-child {
  margin-bottom: 0;
}
.vuiText a {
  color: rgb(38, 76, 214);
}

.vuiText--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vuiText--truncate * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vuiText--xs {
  color: #2c313a;
  font-size: 12px;
  line-height: 1.4;
}
.vuiText--xs p {
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 8px;
}
.vuiText--xs p:last-child {
  margin-bottom: 0;
}

.vuiText--s {
  color: #2c313a;
  font-size: 14px;
  line-height: 1.4;
}
.vuiText--s p {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 8px;
}
.vuiText--s p:last-child {
  margin-bottom: 0;
}

.vuiText--m {
  color: #2c313a;
  font-size: 16px;
  line-height: 1.4;
}
.vuiText--m p {
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 8px;
}
.vuiText--m p:last-child {
  margin-bottom: 0;
}

.vuiText--l {
  color: #2c313a;
  font-size: 18px;
  line-height: 1.4;
}
.vuiText--l p {
  font-size: 18px;
  line-height: 1.4;
  margin-bottom: 8px;
}
.vuiText--l p:last-child {
  margin-bottom: 0;
}

.vuiText--left {
  text-align: left;
}

.vuiText--center {
  text-align: center;
}

.vuiText--right {
  text-align: right;
}

.vuiTextColor--accent {
  color: #551edf !important;
}

.vuiTextColor--primary {
  color: rgb(38, 76, 214) !important;
}

.vuiTextColor--success {
  color: #04821f !important;
}

.vuiTextColor--warning {
  color: #965a15 !important;
}

.vuiTextColor--danger {
  color: #c41535 !important;
}

.vuiTextColor--subdued {
  color: #69707d !important;
}

.vuiTextColor--neutral {
  color: #2c313a !important;
}

.searchModalContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  animation: modalIn 0.2s cubic-bezier(0, 1, 1, 1);
  pointer-events: none;
}
.searchModalContainer .searchModal {
  margin-top: 6vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  max-height: 88vh;
  z-index: 12;
  pointer-events: all;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 8px;
  overflow: hidden;
}
.searchModalContainer .searchModalResults {
  border-top: 1px solid #cbcdde;
  overflow-y: auto;
}
.searchModalContainer .searchModalFooter {
  border-top: 1px solid #cbcdde;
  padding: 0 16px;
  background-color: #f3f7fb;
}

@media only screen and (max-width: 600px) {
  .searchModalContainer {
    overflow-y: auto;
  }
  .searchModal {
    margin-top: 0;
    max-width: 100vw;
    max-height: none;
    border-radius: 0;
    overflow: initial;
  }
  .searchModalResults {
    overflow-y: none;
  }
}
/**
 * A one-off reset for the button elements.
 */
button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  border-radius: 0;
  font-size: inherit;
}

.searchButton {
  width: 220px;
  box-shadow: inset rgba(60, 64, 67, 0.3) 0px 1px 2px 0px;
  white-space: nowrap;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  line-height: 1;
  border: 1px solid #cbcdde;
  color: #2c313a;
  background-color: #ffffff;
  font-size: 16px;
  padding: 8px 16px;
  height: 34px;
  cursor: text;
}

.searchModalContainer {
  /* HTML5 display-role reset for older browsers */
}
.searchModalContainer body,
.searchModalContainer textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
.searchModalContainer *,
.searchModalContainer *:before,
.searchModalContainer *:after {
  box-sizing: border-box;
}
.searchModalContainer html,
.searchModalContainer body,
.searchModalContainer div,
.searchModalContainer span,
.searchModalContainer applet,
.searchModalContainer object,
.searchModalContainer iframe,
.searchModalContainer h1,
.searchModalContainer h2,
.searchModalContainer h3,
.searchModalContainer h4,
.searchModalContainer h5,
.searchModalContainer h6,
.searchModalContainer p,
.searchModalContainer blockquote,
.searchModalContainer pre,
.searchModalContainer a,
.searchModalContainer abbr,
.searchModalContainer acronym,
.searchModalContainer address,
.searchModalContainer big,
.searchModalContainer cite,
.searchModalContainer code,
.searchModalContainer del,
.searchModalContainer dfn,
.searchModalContainer em,
.searchModalContainer img,
.searchModalContainer ins,
.searchModalContainer kbd,
.searchModalContainer q,
.searchModalContainer s,
.searchModalContainer samp,
.searchModalContainer small,
.searchModalContainer strike,
.searchModalContainer strong,
.searchModalContainer sub,
.searchModalContainer sup,
.searchModalContainer tt,
.searchModalContainer var,
.searchModalContainer b,
.searchModalContainer u,
.searchModalContainer i,
.searchModalContainer center,
.searchModalContainer dl,
.searchModalContainer dt,
.searchModalContainer dd,
.searchModalContainer ol,
.searchModalContainer ul,
.searchModalContainer li,
.searchModalContainer fieldset,
.searchModalContainer form,
.searchModalContainer label,
.searchModalContainer legend,
.searchModalContainer table,
.searchModalContainer caption,
.searchModalContainer tbody,
.searchModalContainer tfoot,
.searchModalContainer thead,
.searchModalContainer tr,
.searchModalContainer th,
.searchModalContainer td,
.searchModalContainer article,
.searchModalContainer aside,
.searchModalContainer canvas,
.searchModalContainer details,
.searchModalContainer embed,
.searchModalContainer figure,
.searchModalContainer figcaption,
.searchModalContainer footer,
.searchModalContainer header,
.searchModalContainer hgroup,
.searchModalContainer menu,
.searchModalContainer nav,
.searchModalContainer output,
.searchModalContainer ruby,
.searchModalContainer section,
.searchModalContainer summary,
.searchModalContainer time,
.searchModalContainer mark,
.searchModalContainer audio,
.searchModalContainer video {
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: baseline;
}
.searchModalContainer h1,
.searchModalContainer h2,
.searchModalContainer h3,
.searchModalContainer h4,
.searchModalContainer h5,
.searchModalContainer h6,
.searchModalContainer p {
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
}
.searchModalContainer article,
.searchModalContainer aside,
.searchModalContainer details,
.searchModalContainer figcaption,
.searchModalContainer figure,
.searchModalContainer footer,
.searchModalContainer header,
.searchModalContainer hgroup,
.searchModalContainer menu,
.searchModalContainer nav,
.searchModalContainer section {
  display: block;
}
.searchModalContainer a[href],
.searchModalContainer button,
.searchModalContainer [role=button] {
  cursor: pointer;
}
.searchModalContainer button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  border-radius: 0;
  font-size: inherit;
}
.searchModalContainer input {
  margin: 0;
  padding: 0;
}
.searchModalContainer input:disabled {
  opacity: 1; /* required on iOS */
}
.searchModalContainer ol,
.searchModalContainer ul {
  list-style: none;
}
.searchModalContainer blockquote,
.searchModalContainer q {
  quotes: none;
}
.searchModalContainer blockquote:before,
.searchModalContainer blockquote:after,
.searchModalContainer q:before,
.searchModalContainer q:after {
  content: "";
}
.searchModalContainer table {
  border-collapse: collapse;
  border-spacing: 0;
}
.searchModalContainer hr {
  margin: 0;
}
.searchModalContainer fieldset {
  min-inline-size: auto;
}
.searchModalContainer .searchInput {
  position: relative;
  display: flex;
  align-items: center;
}
.searchModalContainer .searchInput__input {
  flex-grow: 1;
  padding: 24px;
  background-color: #ffffff;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) 0px 0px 0px 0px;
  outline-width: 1px;
  outline-style: solid;
  outline-color: transparent;
  outline-offset: -1px;
  font-size: 18px;
  color: #2c313a;
}
.searchModalContainer .searchInput__submitButton {
  position: absolute;
  right: 16px;
  line-height: 0;
  color: #69707d;
  transition: all 0.2s;
}
.searchModalContainer .searchInput__submitButton:hover {
  color: rgb(38, 76, 214);
}
.searchModalContainer .searchResult {
  background-color: #ffffff;
  display: block;
  padding: 12px 24px 12px 16px;
  border-left: 12px solid #ffffff;
  text-decoration: none;
  border-bottom: 1px solid #e3e4f3;
}
.searchModalContainer .searchResult:hover, .searchModalContainer .searchResult.isSelected {
  background-color: #f3f7fb;
  border-left: 12px solid rgb(38, 76, 214);
}
.searchModalContainer .searchResult:hover .searchResultTitle, .searchModalContainer .searchResult.isSelected .searchResultTitle {
  text-decoration: underline;
}
.searchModalContainer .searchResult:last-of-type {
  border-bottom: none;
}
.searchModalContainer .searchResultTitle {
  color: rgb(38, 76, 214);
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  margin-bottom: 4px;
}
.searchModalContainer .searchResultSnippet {
  color: #2c313a;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0;
}`;document.head.appendChild(document.createElement("style")).appendChild(document.createTextNode(xA));var at=B(R()),yf=({customerId:t,apiKey:e,corpusId:r,apiUrl:i})=>{let[o,c]=(0,N0.useState)([]),[u,h]=(0,N0.useState)(null),[d,p]=(0,N0.useState)(!1),H=(0,N0.useRef)(null),w=(0,N0.useRef)(null),C=(0,N0.useRef)(""),A=(0,N0.useRef)(0),{fetchSearchResults:E,isLoading:M}=xf(t,r,e,i),S=async P=>{if(P.length===0)return;let U=++A.current,Y=await E(P);U===A.current&&(c(Y),h(null),w.current=null)},g=(0,wf.default)(P=>S(P),500),m=P=>{let U=P.target.value;C.current=U,U.length===0&&b(),g(U)},z=(0,N0.useCallback)(P=>{let U=P.key;U==="Enter"&&(P.preventDefault(),u!==null?window.open(o[u].url,"_self"):S(C.current)),o.length!==0&&(U==="ArrowDown"&&h(Y=>Y===null||Y===o.length-1?0:Y+1),U==="ArrowUp"&&h(Y=>Y===null||Y===0?o.length-1:Y-1))},[o,u]),b=()=>{c([]),h(null),w.current=null},I=()=>{p(!1),b()},T=o.length===0?null:o.map((P,U)=>{let{snippet:{pre:Y,text:r1,post:G1}}=P;return(0,at.jsx)("div",{ref:u===U?w:void 0,children:(0,at.jsx)(zf,{searchResult:P,isSelected:u===U})},`${Y}${r1}${G1}`)});return(0,N0.useEffect)(()=>{w.current&&w.current.scrollIntoView({behavior:"instant",block:"nearest"})},[w.current]),(0,N0.useEffect)(()=>{let P=U=>{U.key==="k"&&U.ctrlKey&&p(!0)};return document.addEventListener("keyup",P),()=>{document.removeEventListener("keyup",P)}},[]),(0,at.jsxs)(zd,{children:[(0,at.jsx)("div",{ref:H,children:(0,at.jsx)("button",{className:"searchButton",onClick:()=>p(!0),children:(0,at.jsxs)(f1,{alignItems:"center",spacing:"s",children:[(0,at.jsx)(d1,{children:(0,at.jsx)(B1,{children:(0,at.jsx)(ci,{})})}),(0,at.jsx)(d1,{children:"Search"})]})})}),(0,at.jsx)(Mf,{isLoading:M,onChange:m,onKeyDown:z,isOpen:d,resultsList:T,onClose:I})]})};var Sf=B(R());(function(){let e;var r=new MutationObserver(()=>{let o=window.vectara?.plugins?.search;if(!o)return;let{containerId:c,customerId:u,apiKey:h,corpusId:d}=o;if(!u||!h||!d){console.warn("Vectara Search: Customer ID, API key, and Corpus ID are required.");return}let p=document.getElementById(c??"search");p&&p.childNodes.length===0&&(e=(0,Hf.createRoot)(p),e.render((0,Sf.jsx)(yf,{customerId:u,apiKey:h,corpusId:d},u)),r.disconnect())});let i=()=>{e&&e.unmount(),r.observe(document,{attributes:!1,childList:!0,characterData:!1,subtree:!0})};document.addEventListener("onRouteUpdated",i)})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.10.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
