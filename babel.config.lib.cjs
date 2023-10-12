module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', debug: false, modules: 'commonjs', corejs: '3.30' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['babel-plugin-import', { libraryName: 'ant-design-vue', libraryDirectory: 'lib', style: false }],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
  ]
}
