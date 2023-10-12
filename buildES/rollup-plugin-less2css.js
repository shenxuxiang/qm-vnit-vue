export default function() {
  return {
    name: 'rollup-plugin-less2css',
    version: '1.0.0',
    transform: {
      async: true,
      sequential: true,
      handler(code, id) {
        if (!/\.(vue|tsx?|jsx?)$/.test(id)) return;
        if (!/\.less/.test(code)) return;
        return code.replace(/\.less/g, '.css');
      }
    }
  };
}
