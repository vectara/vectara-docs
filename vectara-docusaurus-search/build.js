const { build } = require("esbuild");
const { sassPlugin } = require('esbuild-sass-plugin');
const { dependencies, peerDependencies } = require('./package.json')
const cssPlugin = require('esbuild-css-modules-plugin');

const sharedConfig = {
  bundle: true,
  minify: false,
  platform: 'browser'
};

build({
  ...sharedConfig,
  entryPoints: ["src/index.tsx"],
  outfile: "dist/index.js",
  plugins: [
    cssPlugin(),
    sassPlugin({type: 'style'})
  ]
});
