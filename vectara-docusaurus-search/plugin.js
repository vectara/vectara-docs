// The following is a way to circumvent
// Docusaurus forcibly SSR'ing our client modules.
if (typeof document !== "undefined") {
  require("./dist/widget");
}
