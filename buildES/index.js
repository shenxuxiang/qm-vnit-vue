import path from 'path';
import chalk from 'chalk';
import process from 'process';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import vuePlugin from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import less2css from './rollup-plugin-less2css.js';
import imageToBase64 from '@rollup/plugin-image';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import importAntDesignIconsVue from './rollup-plugin-import-ant-design-icons-vue.js';

const __dirname = fileURLToPath(new URL('./', import.meta.url));
const inputOptions = {
  input: path.resolve(__dirname, '../src/library/index.ts'),
  external: [ /[\\/]node_modules[\\/]/, /\.less/, /\.css/, /\.scss/ ],
  plugins: [
    nodeResolve(),
    commonjs(),
    alias({ entries: { '@': path.resolve('src') } }),
    vuePlugin(),
    typescript({ check: false }),
    babel({
      babelHelpers: 'runtime',
      exclude: /[\\/]node_modules[\\/]/,
      extensions: [ '.tsx', '.ts', '.jsx', '.js', '.cjs', '.mjs' ],
    }),
    imageToBase64(),
    less2css(),
    importAntDesignIconsVue(),
  ],
  makeAbsoluteExternalsRelative: false,
};

const outputOptions = {
  format: 'es',
  preserveModules: true,
  preserveModulesRoot: 'src/library',
  dir: path.resolve(__dirname, '../es'),
};

async function buildES() {
  let bundle = null;
  try {
    bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
  } catch(error) {
    const msg = error.stack.replace(/^\b/gm, '   ');
    process.stdout.write(chalk.hex('#ff0000')(msg));
    // 关闭进程
    process.exit(1);
  }

  if (bundle) bundle.close();
}

export default buildES;
