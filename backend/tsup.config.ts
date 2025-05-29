import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['app/**/*.ts'],
    outDir: 'build',
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: false,
    target: 'node18',
    shims: true,
    minify: false,
  },
]);
