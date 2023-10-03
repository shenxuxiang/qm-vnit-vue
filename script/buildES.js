import fs from 'fs';
import path from 'path';
import { rollup } from 'rollup';
import vue from 'rollup-plugin-vue';
import { fileURLToPath } from 'url';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import imageBase64 from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import typescript2 from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';

const __dirname = fileURLToPath(new URL('./', import.meta.url));

const inputOptions = {
  input: path.resolve(__dirname, '../src/lib/index.ts'),
  external: [ /[\\/]node_modules[\\/]/, /\.less/, /\.css/, /\.scss/ ],
  makeAbsoluteExternalsRelative: false,
  plugins: [
    nodeResolve(), 
    commonjs(),
    alias({ entries: { '@': path.resolve('src') } }),
    vue(), 
    typescript2({ check: false }),
    babel({
      babelHelpers: 'runtime',
      exclude: /[\//]node_modules[\//]/,
      extensions: [ '.tsx', '.ts', '.jsx', '.js', '.cjs', '.mjs', '.vue' ],
    }),
    divideAntDesignIcons(),
    transformLessToCss(),
    imageBase64(),
  ]
};

const outputOptions = {
  dir: path.resolve(__dirname, '../es'),
  format: 'es',
  preserveModules: true,
  preserveModulesRoot: 'src/lib',
};

export default async function bundleEs() {
  let fail = null;
  let bundle = null;

  // fs.rmSync(outputOptions.dir, { force: true, recursive: true });

  try {
    bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
  } catch(error) {
    fail = true;
    console.log(error.stack.replace(/^\b/mg, '   '));
    throw error;
  }

  if (!fail) await bundle.close();
  // process.exit(fail ? 1 : 0);
}

// bundleEs();

function divideAntDesignIcons() {
  const regexpFilter = /import\s+{(.*)}\s+from\s+(['"])@ant-design\/icons-vue\2/;
  
  const contextFilter = /\b(\w+)\b/g;
  
  return {
    name: 'rollup-plugin-divide-ant-design-icons-vue',
    version: '1.0.0',
    transform: {
      async: true,
      sequential: true,
      handler (code, id) {
        if (!/\.(tsx|ts|jsx|js|vue)$/.test(id)) return;

        if (!/@ant-design\/icons-vue/.test(code)) return;

        const matched = regexpFilter.exec(code);
        const values = matched[1];

        const items = [];

        while (contextFilter.exec(values)) {
          items.push(RegExp.$1);
        }

        let context = '';

        items.forEach(item => {
          context += `import ${item} from '@ant-design/icons-vue/${item}';\n`;
        });

        return code.replace(regexpFilter, context);
      }
    }
  }
}

function transformLessToCss() {
  return {
    name: 'rollup-plugin-less-to-css',
    version: '1.0.0',
    transform: {
      async: true,
      sequential: true,
      handler(code, id) {
        if (!/\.(tsx?|jsx?|vue)/.test(id)) return;
        if (!/\.less/.test(code)) return;

        return code.replace(/\.less/g, '.css');
      }
    }
  }
}
