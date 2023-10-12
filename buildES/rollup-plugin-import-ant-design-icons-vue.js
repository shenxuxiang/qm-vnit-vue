const filterRegexp = /import\s+\{(.*)\}\s+from\s+(['"])@ant-design\/icons-vue\2/;
const contextRegExp = /([0-9a-zA-Z&]+)/g;

export default function() {
  return {
    name: 'rollup-plugin-import-ant-design-icons-vue',
    version: '1.0.0',
    transform: {
      async: true,
      quential: true,
      handler(code, id) {
        if (!/\.(vue|tsx?|jsx?)$/.test(id)) return;
        if (!filterRegexp.test(code)) return;
        const matched = RegExp.$1;
        const result = [];

        while (contextRegExp.test(matched)) {
          result.push(RegExp.$1);
        }

        const text = result.reduce((memo, item) => {
          memo += `import ${item} from '@ant-design/icons-vue/${item}';`;
          return memo;
        }, '');

        return code.replace(filterRegexp, text);
      }
    }
  }
}
