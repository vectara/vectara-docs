const { build } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const cssPlugin = require("esbuild-css-modules-plugin");

const sharedConfig = {
  bundle: true,
  minify: false,
  platform: "browser",
};

// test page JS
// This is for viewing/making changes via the test_page.html file
build({
  ...sharedConfig,
  entryPoints: ["src/index.tsx"],
  outfile: "dist/testpage/index.js",
  plugins: [cssPlugin(), sassPlugin({ type: "style" })],
});

// plugin widget JS
// This builds the script to load the component into the
// Docusaurus page
build({
  ...sharedConfig,
  entryPoints: ["src/plugin/index.tsx"],
  outfile: "dist/widget/index.js",
  format: "esm",
  plugins: [cssPlugin(), sassPlugin({ type: "style" })],
});
