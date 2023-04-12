/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('esbuild').build;
const sync = require('glob').sync;
const entryPoints = sync('./src/**/*.ts');

// "glob": "^10.0.0"
// "esbuild": "^0.17.16",

build({
  entryPoints,
  outdir: './dist',
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'node',
  target: 'es2017',
  format: 'cjs',
  external: ['node_modules'],
  tsconfig: 'tsconfig.build.json',
  logLevel: 'info',
})
  .then(() => {
    console.log('Build successful');
  })
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
