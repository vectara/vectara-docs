// node_modules/@analytics/google-tag-manager/lib/analytics-plugin-google-tag-manager.browser.es.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var config = {
  debug: false,
  containerId: null,
  dataLayerName: "dataLayer",
  dataLayer: void 0,
  preview: void 0,
  auth: void 0,
  execution: "async"
  // assumesPageview: true,
};
var initializedDataLayerName;
function googleTagManager() {
  var pluginConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var defaultScriptSrc = "https://www.googletagmanager.com/gtm.js";
  return {
    name: "google-tag-manager",
    config: _objectSpread(_objectSpread({}, config), pluginConfig),
    initialize: function initialize(_ref) {
      var config2 = _ref.config;
      var containerId = config2.containerId, dataLayerName = config2.dataLayerName, customScriptSrc = config2.customScriptSrc, preview = config2.preview, auth = config2.auth, execution = config2.execution;
      if (!containerId) {
        throw new Error("No google tag manager containerId defined");
      }
      if (preview && !auth) {
        throw new Error("When enabling preview mode, both preview and auth parameters must be defined");
      }
      var scriptSrc = customScriptSrc || defaultScriptSrc;
      if (!scriptLoaded(containerId, scriptSrc)) {
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": (/* @__PURE__ */ new Date()).getTime(),
            event: "gtm.js"
          });
          var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "", p = preview ? "&gtm_preview=" + preview + "&gtm_auth=" + auth + "&gtm_cookies_win=x" : "";
          if (execution) {
            j[execution] = true;
          }
          j.src = "".concat(scriptSrc, "?id=") + i + dl + p;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", dataLayerName, containerId);
        initializedDataLayerName = dataLayerName;
        config2.dataLayer = window[dataLayerName];
      }
    },
    page: function page(_ref2) {
      var payload = _ref2.payload;
      _ref2.options;
      _ref2.instance;
      var config2 = _ref2.config;
      if (typeof config2.dataLayer !== "undefined") {
        config2.dataLayer.push(payload.properties);
      }
    },
    track: function track(_ref3) {
      var payload = _ref3.payload;
      _ref3.options;
      var config2 = _ref3.config;
      if (typeof config2.dataLayer !== "undefined") {
        var anonymousId = payload.anonymousId, userId = payload.userId, properties = payload.properties;
        var formattedPayload = properties;
        if (userId) {
          formattedPayload.userId = userId;
        }
        if (anonymousId) {
          formattedPayload.anonymousId = anonymousId;
        }
        if (!properties.category) {
          formattedPayload.category = "All";
        }
        if (config2.debug) {
          console.log("dataLayer push", _objectSpread({
            event: payload.event
          }, formattedPayload));
        }
        config2.dataLayer.push(_objectSpread({
          event: payload.event
        }, formattedPayload));
      }
    },
    loaded: function loaded() {
      var hasDataLayer = !!initializedDataLayerName && !!(window[initializedDataLayerName] && Array.prototype.push !== window[initializedDataLayerName].push);
      return scriptLoaded(pluginConfig.containerId, pluginConfig.customScriptSrc || defaultScriptSrc) && hasDataLayer;
    }
  };
}
var regexCache = {};
function scriptLoaded(containerId, scriptSrc) {
  var regex = regexCache[containerId];
  if (!regex) {
    var scriptSrcEscaped = scriptSrc.replace(/^https?:\/\//, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    regex = new RegExp(scriptSrcEscaped + ".*[?&]id=" + containerId);
    regexCache[containerId] = regex;
  }
  var scripts = document.querySelectorAll("script[src]");
  return !!Object.keys(scripts).filter(function(key) {
    return (scripts[key].src || "").match(regex);
  }).length;
}
var index = googleTagManager;

// src/static/analytics.ts
(function() {
  function loadLib() {
    var _a;
    const scripts = document.getElementsByTagName("script");
    const cdnLink = "https://console.vectara.com/ua.js";
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === cdnLink) {
        return;
      }
    }
    const tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.async = true;
    tag.src = cdnLink;
    const placement = (scripts == null ? void 0 : scripts[0]) || ((_a = document.getElementsByTagName("title")) == null ? void 0 : _a[0]);
    if (placement == null ? void 0 : placement.parentNode) {
      placement.parentNode.insertBefore(tag, placement);
    } else {
      console.warn("Can't insert external JavaScript. Analytics will not work");
    }
  }
  const getCookie = (name) => {
    var _a;
    return ((_a = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")) == null ? void 0 : _a.pop()) || "";
  };
  function payloadToPageObject(payload) {
    var _a, _b;
    const userData = {
      userSub: null,
      email: getCookie("__anon_id_email") || null,
      customerId: getCookie("__anon_id_uid") || null
    };
    const url = new URL((_a = payload.properties.url) != null ? _a : null);
    const utm = {
      name: (url == null ? void 0 : url.searchParams.get("utm_campaign")) || null,
      medium: (url == null ? void 0 : url.searchParams.get("utm_medium")) || null,
      source: (url == null ? void 0 : url.searchParams.get("utm_source")) || null,
      term: (url == null ? void 0 : url.searchParams.get("utm_term")) || null,
      content: (url == null ? void 0 : url.searchParams.get("utm_content")) || null
    };
    const { anonymousId } = payload;
    const ANONYMOUS_ID_COOKIE_NAME = "vectaraAnonymousId";
    const persistedAnonymousId = getCookie(ANONYMOUS_ID_COOKIE_NAME);
    const domain = window.location.hostname === "localhost" ? "localhost" : "vectara.com";
    if (!persistedAnonymousId) {
      document.cookie = `${ANONYMOUS_ID_COOKIE_NAME}=${anonymousId}; path=/; max-age=31536000; domain=${domain}`;
    }
    const identity = {
      anonymousId: (_b = persistedAnonymousId != null ? persistedAnonymousId : anonymousId) != null ? _b : null,
      timestamp: payload.meta.ts,
      utm,
      userData
    };
    return {
      identity,
      path: payload.properties.path,
      title: payload.properties.title,
      referrer: document.referrer,
      search: payload.properties.search,
      url: payload.properties.url,
      width: payload.properties.width,
      height: payload.properties.height,
      application: "DOCS",
      locale: navigator.language,
      agent: navigator.userAgent,
      type: "PAGE"
    };
  }
  function whenAvailable(name, callback) {
    var interval = 3e3;
    window.setTimeout(function() {
      if (window[name]) {
        callback(window[name]);
      } else {
        whenAvailable(name, callback);
      }
    }, interval);
  }
  loadLib();
  whenAvailable("_analytics", function(_analytics) {
    const snowApp = {
      name: "snow-plugin",
      campaign: ({ payload }) => {
        console.log("payload", payload);
      },
      page: ({ payload }) => {
        const pageObject = payloadToPageObject(payload);
        const pageJSON = JSON.stringify(pageObject);
        const url = "https://snow.vectara.io/ui_event";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: pageJSON
        }).catch((e) => {
          console.log("Could not send analytics request.", e);
        });
      }
    };
    var Analytics = window.analytics = _analytics.init({
      app: "analytics-html-demo",
      debug: true,
      plugins: [
        snowApp,
        index({
          containerId: "GTM-N9LHSN3"
        })
      ]
    });
    Analytics.page();
  });
})();
