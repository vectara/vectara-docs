const { build } = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json')

const sharedConfig = {
  entryPoints: ["src/index.tsx"],
  bundle: true,
  minify: false,
  //external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: "index.js",
});