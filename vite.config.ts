import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig, loadEnv } from 'vite';

const __dirname = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const define = Object.keys(env).reduce((memo: any, key: string) => {
    memo[key] = JSON.stringify(env[key]);
  }, {});

  return {
    mode,
    define: define,
    publicDir: path.resolve(__dirname, 'public'),
    plugins: [
      vue(),
      vueJsx(),
      legacy(),
    ],
    resolve: {
      extensions: [ '.vue', '.tsx', '.jsx', '.ts', '.js' ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          globalVars: {},
          modifyVars: {},
          additionalData: '',
          javascriptEnable: true,
        }
      },
    },
    clearScreen: false,
    build: {
      outDir: path.resolve(__dirname, 'build'),
      copyPublicDir: true,
      cssMinify: true,
      minify: 'terser',
      terserOptions: { compress: { drop_console: true, drop_debugger: true } },
      cssCodeSplit: true,
      emptyOutDir: true,
      assetsInlineLimit: 14 * 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            'vender-vue': [ 'vue' ],
          },
          enterFileNames: 'static/js/[name].[hash].js',
          chunkFileNames: 'static/js/[name].[hash].chunk.js',
          assetFileNames: (chunkInfo: any) => {
            const { name } = chunkInfo;
            if (/\.(jpg|jpeg|png|webp|bmp|gif|svg)$/.test(name)) {
              return 'static/image/[name].[hash][extname]';
            } else if (/\.(woff2|woff|ttf|eot)$/.test(name)) {
              return 'static/font/[name].[hash][extname]';
            } else if (/\.css$/.test(name)) {
              return 'static/css/[name].[hash].css';
            } else {
              return 'static/[ext]/[name].[hash][extname]';
            }
          },
        }
      }
    },
    server: {
      port: 8888,
      host: '0.0.0.0',
      strictPort: true,
      open: true,
      proxy: {
        '/v1.0': {
          target: 'http://192.168.5.2:20021',
          changeOrigin: true,
        },
        '/group1': {
          // target: 'http://192.168.5.120:2005',
          // 测试
          target: 'http://192.168.5.2:20011',
          changeOrigin: true,
        },
        '/tileserver': {
          // 测试
          target: 'http://192.168.5.2:20000',
          changeOrigin: true,
        },
      }
    },
  };
})
