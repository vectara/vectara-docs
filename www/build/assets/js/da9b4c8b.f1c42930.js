"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[1885],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>_});var n=t(67294);function s(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){s(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,n,s=function(e,r){if(null==e)return{};var t,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(s[t]=e[t]);return s}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var p=n.createContext({}),u=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},c=function(e){var r=u(e.components);return n.createElement(p.Provider,{value:r},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,s=e.mdxType,a=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),l=u(t),y=s,_=l["".concat(p,".").concat(y)]||l[y]||d[y]||a;return t?n.createElement(_,i(i({ref:r},c),{},{components:t})):n.createElement(_,i({ref:r},c))}));function _(e,r){var t=arguments,s=r&&r.mdxType;if("string"==typeof e||s){var a=t.length,i=new Array(a);i[0]=y;var o={};for(var p in r)hasOwnProperty.call(r,p)&&(o[p]=r[p]);o.originalType=e,o[l]="string"==typeof e?e:s,i[1]=o;for(var u=2;u<a;u++)i[u]=t[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},87531:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>u});var n=t(87462),s=(t(67294),t(3905));const a={id:"rest_api_key_queries.py",title:"rest_api_key_queries.py",sidebar_label:"Python"},i=void 0,o={unversionedId:"getting-started-samples/rest_api_key_queries.py",id:"getting-started-samples/rest_api_key_queries.py",title:"rest_api_key_queries.py",description:"This is a complete example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at python/vectara-rest/restapikey_queries.py",source:"@site/docs/getting-started-samples/rest_api_key_queries.py.md",sourceDirName:"getting-started-samples",slug:"/getting-started-samples/rest_api_key_queries.py",permalink:"/docs/getting-started-samples/rest_api_key_queries.py",draft:!1,editUrl:"https://github.com/vectara/vectara-docs/tree/master/www/docs/getting-started-samples/rest_api_key_queries.py.md",tags:[],version:"current",frontMatter:{id:"rest_api_key_queries.py",title:"rest_api_key_queries.py",sidebar_label:"Python"},sidebar:"someSidebar",previous:{title:"PHP",permalink:"/docs/getting-started-samples/queryDataApiKey.php"},next:{title:"NodeJS",permalink:"/docs/getting-started-samples/app.js"}},p={},u=[],c={toc:u};function l(e){let{components:r,...t}=e;return(0,s.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"This is a complete example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at ",(0,s.kt)("a",{href:"https://github.com/vectara/getting-started/tree/main/language-examples/python/vectara-rest/rest_api_key_queries.py"},"python/vectara-rest/rest_api_key_queries.py")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-py",metastring:'title="python/vectara-rest/rest_api_key_queries.py"',title:'"python/vectara-rest/rest_api_key_queries.py"'},'""" This is an example of calling Vectara API via python using http/rest as communication protocol.\n"""\n\nimport argparse\nimport json\nimport logging\nimport requests\n\n\ndef _get_query_json(customer_id: int, corpus_id: int, query_value: str):\n    """ Returns a query json. """\n    query = {}\n    query_obj = {}\n\n    query_obj["query"] = query_value\n    query_obj["num_results"] = 10\n\n    corpus_key = {}\n    corpus_key["customer_id"] = customer_id\n    corpus_key["corpus_id"] = corpus_id\n\n    query_obj["corpus_key"] = [ corpus_key ]\n    query["query"] = [ query_obj ]\n    return json.dumps(query)\n\n\ndef query(customer_id: int, corpus_id: int, query_address: str, api_key: str, query: str):\n    """This method queries the data.\n    Args:\n        customer_id: Unique customer ID in vectara platform.\n        corpus_id: ID of the corpus to which data needs to be indexed.\n        query_address: Address of the querying server. e.g., api.vectara.io\n        api_key: A valid API key with query access on the corpus.\n\n    Returns:\n        (response, True) in case of success and returns (error, False) in case of failure.\n\n    """\n    post_headers = {\n        "customer-id": f"{customer_id}",\n        "x-api-key": api_key\n    }\n\n    response = requests.post(\n        f"https://{query_address}/v1/query",\n        data=_get_query_json(customer_id, corpus_id, query),\n        verify=True,\n        headers=post_headers)\n\n    if response.status_code != 200:\n        logging.error("Query failed with code %d, reason %s, text %s",\n                       response.status_code,\n                       response.reason,\n                       response.text)\n        return response, False\n    return response, True\n\n\n\nif __name__ == "__main__":\n    logging.basicConfig(\n        format="%(asctime)s %(levelname)-8s %(message)s", level=logging.INFO)\n\n    parser = argparse.ArgumentParser(\n                description="Vectara rest example (With API Key authentication.")\n\n    parser.add_argument("--customer-id", type=int, help="Unique customer ID in Vectara platform.")\n    parser.add_argument("--corpus-id",\n                        type=int,\n                        help="Corpus ID to which data will be indexed and queried from.")\n\n    parser.add_argument("--serving-endpoint", help="The endpoint of querying server.",\n                        default="api.vectara.io")\n    parser.add_argument("--api-key", help="API key retrieved from Vectara console.")\n    parser.add_argument("--query", help="Query to run against the corpus.", default="Test query")\n\n    args = parser.parse_args()\n\n    if args:\n        error, status = query(args.customer_id,\n                              args.corpus_id,\n                              args.serving_endpoint,\n                              args.api_key,\n                              args.query)\n\n')))}l.isMDXComponent=!0}}]);