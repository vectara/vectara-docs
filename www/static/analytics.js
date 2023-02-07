(function () {

  /********CONFIG BEGIN********/
  const opts = {
    apiKey: '2Dotj5QS43qYsyjDaWfccNkjAVB',
    apiUrl: 'https://rd.vectara.com',
    configUrl: 'https://rdapi.vectara.com/',
    application: 'DOCS', //WEBSITE | DISCUSS | CONSOLE | DOCS
  };

  /******* CONFIG END *******/

  function loadLib() {
    const scripts = document.getElementsByTagName("script");
    const cdnLink = "https://console.vectara.com/rd.js";
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === cdnLink) {
        return;
      }
    }
    const tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.async = true;
    tag.src = cdnLink;
    const placement = scripts?.[0] || document.getElementsByTagName("title")?.[0];
    if (placement?.parentNode) {
      placement.parentNode.insertBefore(tag, placement);
    } else {
      console.warn("Can't insert external JavaScript. Analytics will not work")
    }
  }

  function topLevelDomain() {
    const [domain,] = window.location.hostname.split(':');
    const parts = domain.split('.');
    if (parts[parts.length - 1] === "localhost" || parts.length < 2) {
      return parts[parts.length - 1];
    } else {
      return parts[parts.length - 2] + "." + parts[parts.length - 1];
    }
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : undefined;
  }

  function initAnalytics(key, url, configUrl) {
    rudderanalytics = window.rudderanalytics = [];
    var methods = ["load", "page", "track", "identify", "alias", "group", "ready", "reset", "getAnonymousId", "setAnonymousId",];
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i];
      rudderanalytics[method] = (function (methodName) {
        return function () {
          rudderanalytics.push([methodName].concat(Array.prototype.slice.call(arguments)));
        };
      })(method);
    }

    rudderanalytics.load(key, url, {configUrl});
    return rudderanalytics;
  }

  function anonymousId(cookieDomain, cookieName) {
    var anonymousId = getCookie(cookieName);
    if (anonymousId) {
      return anonymousId;
    } else {
      const secure = window.location.protocol === "https:";
      anonymousId = 'ws-' + Math.random().toString(36).substring(2, 15);
      document.cookie = cookieName + "=" + anonymousId + ";domain=" + cookieDomain + ";path=/"
        + ";expires=" + new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 5).toUTCString()
        + ";SameSite=" + (secure ? "None" : "Lax") + (secure ? ";secure" : "")
      return anonymousId;
    }
  }

  window.hsSubmitHook = window.hsSumitHook = function (data) {
    const allFields = data.find("input")
    const fieldMap = {}
    for (let i = 0; i < allFields.length; i++) {
      const field = allFields[i]
      if (field.name && field.name.length > 0) {
        fieldMap[field.name] = field.value
      }
    }
    if (fieldMap["hs_context"]) {
      try {
        fieldMap["hs_context"] = JSON.parse(fieldMap["hs_context"])
      } catch (e) {
      }
    }
    if (fieldMap["email"] && window.rudderanalytics) {
      try {
        window.rudderanalytics.identify({
          email: fieldMap["email"],
          name: [fieldMap["firstname"], fieldMap["lastname"]].filter(a => !!a).join(" "),
        })
      } catch {
      }
    }
    const context = fieldMap["hs_context"]
    const formId = context && context.originalEmbedContext && context.originalEmbedContext.formId ? context.originalEmbedContext.formId : null
    delete fieldMap["hs_context"]
    if (window.rudderanalytics) {
      window.rudderanalytics.track("hubspot_form_submit", {
        "hubspot_form_id": formId,
        "hubspot_fields": fieldMap,
      })
    }
  }

  function trackPageLoad(opts) {
    const rsKey = opts.apiKey;
    const apiUrl = opts.apiUrl;
    const cookieDomain = opts.domain || topLevelDomain();
    const analytics = initAnalytics(rsKey, apiUrl, opts.configUrl || undefined);
    const userId = getCookie('__anon_id_uid');
    const userEmail = getCookie('__anon_id_email');
    analytics.setAnonymousId(anonymousId(cookieDomain, '__anon_id'));
    if (userId) {
      analytics.identify(userId, {email: userEmail})
    }
    analytics.page(opts.application, window.document.title, {application: opts.application, cookieDomain});

  }

  loadLib();
  trackPageLoad(opts);

})();
