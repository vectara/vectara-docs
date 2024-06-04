import googleTagManager from "@analytics/google-tag-manager";

(function () {
  function loadLib() {
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
    const placement =
      scripts?.[0] || document.getElementsByTagName("title")?.[0];
    if (placement?.parentNode) {
      placement.parentNode.insertBefore(tag, placement);
    } else {
      console.warn("Can't insert external JavaScript. Analytics will not work");
    }
  }

  const getCookie = (name: string) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  // This function converts Payload into a format that Snow expects for Page events.
  function payloadToPageObject(payload: any) {
    const userData = {
      userSub: null,
      email: getCookie("__anon_id_email") || null,
      customerId: getCookie("__anon_id_uid") || null,
    };

    const url = new URL(payload.properties.url ?? null);

    const utm = {
      name: url?.searchParams.get("utm_campaign") || null,
      medium: url?.searchParams.get("utm_medium") || null,
      source: url?.searchParams.get("utm_source") || null,
      term: url?.searchParams.get("utm_term") || null,
      content: url?.searchParams.get("utm_content") || null,
    };

    const { anonymousId } = payload;
    const ANONYMOUS_ID_COOKIE_NAME = "vectaraAnonymousId";
    const persistedAnonymousId = getCookie(ANONYMOUS_ID_COOKIE_NAME);

    const domain =
      window.location.hostname === "localhost" ? "localhost" : "vectara.com";

    if (!persistedAnonymousId) {
      // Expire the cookie in 1 year.
      document.cookie = `${ANONYMOUS_ID_COOKIE_NAME}=${anonymousId}; path=/; max-age=31536000; domain=${domain}`;
    }

    const identity = {
      anonymousId: persistedAnonymousId ?? anonymousId ?? null,
      timestamp: payload.meta.ts,
      utm,
      userData,
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

  function whenAvailable(name: any, callback: (arg: any) => void) {
    var interval = 3000; // ms
    window.setTimeout(function () {
      if (window[name]) {
        callback(window[name]);
      } else {
        whenAvailable(name, callback);
      }
    }, interval);
  }

  loadLib();

  whenAvailable("_analytics", function (_analytics) {
    const snowApp = {
      name: "snow-plugin",
      campaign: ({ payload }: any) => {
        // Store utm in localstorage
        console.log("payload", payload);
      },
      page: ({ payload }: any) => {
        // Send data to snow endpoint
        const pageObject = payloadToPageObject(payload);
        const pageJSON = JSON.stringify(pageObject);
        const url = "https://snow.vectara.io/ui_event";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: pageJSON,
        }).catch((e) => {
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
        googleTagManager({
          containerId: "GTM-N9LHSN3",
        }),
      ],
    }));
    Analytics.page();
  });
})();
