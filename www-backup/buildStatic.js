const { build } = require("esbuild");

build({
  bundle: true,
  entryPoints: ["src/static/analytics.ts"],
  logLevel: "info",
  treeShaking: true,
  minify: false,
  sourcemap: false,
  target: ["es6"],
  outdir: "./static",
  outbase: "./src/static",
  format: "esm",
});
