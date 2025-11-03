"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var google_tag_manager_1 = require("@analytics/google-tag-manager");
(function () {
    function loadLib() {
        var _a;
        var scripts = document.getElementsByTagName("script");
        var cdnLink = "https://console.vectara.com/ua.js";
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src === cdnLink) {
                return;
            }
        }
        var tag = document.createElement("script");
        tag.type = "text/javascript";
        tag.async = true;
        tag.src = cdnLink;
        var placement = (scripts === null || scripts === void 0 ? void 0 : scripts[0]) || ((_a = document.getElementsByTagName("title")) === null || _a === void 0 ? void 0 : _a[0]);
        if (placement === null || placement === void 0 ? void 0 : placement.parentNode) {
            placement.parentNode.insertBefore(tag, placement);
        }
        else {
            console.warn("Can't insert external JavaScript. Analytics will not work");
        }
    }
    var getCookie = function (name) { var _a; return ((_a = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")) === null || _a === void 0 ? void 0 : _a.pop()) || ""; };
    // This function converts Payload into a format that Snow expects for Page events.
    function payloadToPageObject(payload) {
        var _a, _b;
        var userData = {
            userSub: null,
            email: getCookie("__anon_id_email") || null,
            customerId: getCookie("__anon_id_uid") || null,
        };
        var url = new URL((_a = payload.properties.url) !== null && _a !== void 0 ? _a : null);
        var utm = {
            name: (url === null || url === void 0 ? void 0 : url.searchParams.get("utm_campaign")) || null,
            medium: (url === null || url === void 0 ? void 0 : url.searchParams.get("utm_medium")) || null,
            source: (url === null || url === void 0 ? void 0 : url.searchParams.get("utm_source")) || null,
            term: (url === null || url === void 0 ? void 0 : url.searchParams.get("utm_term")) || null,
            content: (url === null || url === void 0 ? void 0 : url.searchParams.get("utm_content")) || null,
        };
        var anonymousId = payload.anonymousId;
        var ANONYMOUS_ID_COOKIE_NAME = "vectaraAnonymousId";
        var persistedAnonymousId = getCookie(ANONYMOUS_ID_COOKIE_NAME);
        var domain = window.location.hostname === "localhost" ? "localhost" : "vectara.com";
        if (!persistedAnonymousId) {
            // Expire the cookie in 1 year.
            document.cookie = "".concat(ANONYMOUS_ID_COOKIE_NAME, "=").concat(anonymousId, "; path=/; max-age=31536000; domain=").concat(domain);
        }
        var identity = {
            anonymousId: (_b = persistedAnonymousId !== null && persistedAnonymousId !== void 0 ? persistedAnonymousId : anonymousId) !== null && _b !== void 0 ? _b : null,
            timestamp: payload.meta.ts,
            utm: utm,
            userData: userData,
        };
        return {
            identity: identity,
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
            type: "PAGE",
        };
    }
    function whenAvailable(name, callback) {
        var interval = 3000; // ms
        window.setTimeout(function () {
            if (window[name]) {
                callback(window[name]);
            }
            else {
                whenAvailable(name, callback);
            }
        }, interval);
    }
    loadLib();
    whenAvailable("_analytics", function (_analytics) {
        var snowApp = {
            name: "snow-plugin",
            campaign: function (_a) {
                var payload = _a.payload;
                // Store utm in localstorage
                console.log("payload", payload);
            },
            page: function (_a) {
                var payload = _a.payload;
                // Send data to snow endpoint
                var pageObject = payloadToPageObject(payload);
                var pageJSON = JSON.stringify(pageObject);
                var url = "https://snow.vectara.io/ui_event";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: pageJSON,
                }).catch(function (e) {
                    console.log("Could not send analytics request.", e);
                });
            },
        };
        // Storing in window so we can access it from the routeUpdateModule
        // @ts-expect-error window.analytics is not defined
        var Analytics = (window.analytics = _analytics.init({
            app: "analytics-html-demo",
            debug: true,
            plugins: [
                snowApp,
                (0, google_tag_manager_1.default)({
                    containerId: "GTM-N9LHSN3",
                }),
            ],
        }));
        Analytics.page();
    });
})();
