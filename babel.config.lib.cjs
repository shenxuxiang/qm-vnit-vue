module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false, debug: false, useBuiltIns: 'usage', corejs: { version: "3.33", proposals: true } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['babel-plugin-import', { libraryName: 'ant-design-vue', libraryDirectory: 'lib', style: false }],
  ]
}
