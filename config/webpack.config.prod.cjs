const fs = require('fs');
const path = require('path');
const env = require('../env.json');
const { DefinePlugin } = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

if (fs.existsSync(path.resolve('env.production.json'))) Object.assign(env, require('../env.development.json'));
const { PUBLIC_PATH } = env;

module.exports = {
  cache: true,
  mode: 'production',
  bail: true,
  devtool: false,
  entry: path.resolve('src/main.ts'),
  output: {
    path: path.resolve('build'),
    publicPath: PUBLIC_PATH,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    clean: true,
  },
  resolve: {
    extensions: [ '.vue', '.tsx', '.ts', '.jsx', '.js' ],
    modules: [ path.resolve('node_modules') ],
    alias: {
      '@': path.resolve('src'),
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
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
          cacheCompression: true,
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new ProgressBarPlugin(),
  ],
} 

