const fs = require('fs');
const path = require('path');
const env = require('../env.json');
const { DefinePlugin } = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

if (fs.existsSync(path.resolve('env.development.json'))) Object.assign(env, require('../env.development.json'));
const { PUBLIC_PATH } = env;

module.exports = {
  cache: true,
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve('src/main.ts'),
  output: {
    path: path.resolve('build'),
    publicPath: PUBLIC_PATH,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js', '.vue' ],
    modules: [ path.resolve('node_modules') ],
    alias: {
      '@': path.resolve('src'),
    }
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      minRemainingSize: 25 * 1024,
      enforceSizeThreshold: 1024 * 244, 
    }
  },
  module: {
    rules: [
      // {
      //   oneOf: [
          {
            test: /\.(vue)$/,
            loader: 'vue-loader',
          },
          {
            test: /\.(tsx?|jsx?)$/,
            loader: 'babel-loader',
            exclude: path.resolve('node_modules'),
            options: {
              babelrc: false,
              compact: false,
              configFile: true,
              cacheDirectory: true,
              cacheCompression: false,
            }
          },
          {
            test: /\.(png|jpe?g|gif|bmp|webp|svg)$/,
            include: path.resolve('src'),
            type: 'asset',
            generator: {
              emit: true,
              publicPath: PUBLIC_PATH,
              filename: 'static/images/[name].[hash:8][ext]',
            },
            parser: {
              dataUrlCondition: { maxSize: 10 * 1024 }
            },
          },
          {
            test: /\.(woff2|woff|ttf|eot)$/,
            include: path.resolve('src'),
            type: 'asset',
            generator: {
              emit: true,
              publicPath: PUBLIC_PATH,
              filename: 'static/font/[name].[hash:8][ext]',
            },
            parser: {
              dataUrlCondition: { maxSize: 10 * 1024 }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)$/,
            include: path.resolve('src'),
            type: 'asset',
            generator: {
              emit: true,
              publicPath: PUBLIC_PATH,
              filename: 'static/media/[name].[hash:8][ext]',
            },
            parser: {
              dataUrlCondition: { maxSize: 10 * 1024 }
            },
          },
          {
            test: /\.module\.css$/,
            include: path.resolve('src'),
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  importLoaders: 1,
                  modules: {
                    auto: true,
                    mode: 'local',
                    localIdentName: '[path][name]-[local]-[hash:base64:5]',
                  }
                }
              },
              require.resolve('postcss-loader'),
            ]
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  modules: false,
                  importLoaders: 1,
                }
              },
              require.resolve('postcss-loader'),
            ]
          },
          {
            test: /\.module\.less$/,
            include: path.resolve('src'),
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  importLoaders: 2,
                  modules: {
                    auto: true,
                    mode: 'local',
                    localIdentName: '[path][name]-[local]-[hash:base64:5]',
                  }
                }
              },
              require.resolve('postcss-loader'),
              {
                loader: require.resolve('less-loader'),
                options: {
                  lessOptions: {
                    modifyVars: {},
                    globalVars: {},
                    javascriptEnable: true,
                  },
                  additionalData: '',
                }
              }
            ]
          },
          {
            test: /\.less$/,
            exclude: /\.module\.less$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  modules: false,
                  importLoaders: 2,
                }
              },
              require.resolve('postcss-loader'),
              {
                loader: require.resolve('less-loader'),
                options: {
                  lessOptions: {
                    modifyVars: {},
                    globalVars: {},
                    javascriptEnable: true,
                  },
                  additionalData: '',
                }
              }
            ]
          },
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlPlugin({
      inject: true,
      filename: 'index.html',
      scriptLoading: 'blocking',
      template: path.resolve('public/index.html'),
      meta: {
        viewport: {
          name: 'width=device-width',
          content: 'initial-scale=1.0, user-scalable: no, maximum-scale=1.0, minimum-scale=no'
        }
      }
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      'process.env': Object.keys(env).reduce((memo, key) => {
        memo[key] = JSON.stringify(env[key]);
        return memo;
      }, {}),
    }),
    // new InterpolateHtmlPlugin(HtmlPlugin, env),
    // new CaseSensitivePathsPlugin(),
    new ProgressBarPlugin(),
  ],
  devServer: {
    hot: true,
    port: 8888,
    open: true,
    compress: true,
    host: 'localhost',
    historyApiFallback: true,
    client: {
      progress: true,
      logging: 'none',
      overlay: { errors: true, warnings: false }
    },
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
  }
} 

