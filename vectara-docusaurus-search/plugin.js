const ExecutionEnvironment =
  require("@docusaurus/ExecutionEnvironment").default;

// The following is a way to circumvent
// Docusaurus forcibly SSR'ing our client modules.
if (typeof document !== "undefined") {
  require("./dist/widget");
}

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }
  const event = new Event("onRouteUpdated");
  return {
    onRouteDidUpdate() {
      document.dispatchEvent(event);
    },
  };
})();
