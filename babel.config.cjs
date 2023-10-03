module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', debug: false, modules: false, corejs: '3.30' }],
    ['@babel/preset-typescript', { allExtensions: true }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@vue/babel-plugin-jsx'
  ]
}
