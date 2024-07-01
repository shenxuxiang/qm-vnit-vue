import chalk from 'chalk';
import * as fs from 'node:fs/promises';
import { optimize as optimizeSvg } from 'svgo';
import { compileTemplate } from 'vue/compiler-sfc';

export default function(options = {}) {
  const { svgoConfig = {}, defaultImport } = options;

  const svgReg = /\.svg(\?(raw|skipsvgo|url))?$/;
  return {
    name: 'rollup-plugin-svg',
    version: '1.0.0',
    load: {
      order: 'pre',
      async: true,
      async handler (id) {
        if (!svgReg.test(id)) return null;

        const [ path, query ] = id.split('?');
        const importType = query || defaultImport;

        // 当 svg 作为 url 时插件不处理，此时应该由 @rollup/plugin-url 返回静态文件的 url。
        if (importType === 'url') return null;

        let svg;

        try {
          // 读取 svg 内容
          svg = await fs.readFile(path, 'utf-8');
        } catch (error) {
          // 文件读取失败，此时交由其他插件处理。
          const msg = '\n' + error.stack.toString().replace(/^\b/mg, '   ') + '\n';
          process.stdout.write(chalk.cyanBright(msg));

          process.stdout.write(chalk.cyanBright(`   ${id} couldn't be loaded by rollup-plugin-svg, fallback to default loader\n\n`));

          return null;
        }

        // raw 表示返回源文件。
        if (importType === 'raw') return `export default ${JSON.stringify(svg)}`;

        // skipsvgo 表示跳过 svgo，不对 svg 进行压缩。
        if (importType !== 'skipsvgo') {
          svg = optimizeSvg(svg, { ...svgoConfig, path }).data;
        }

        // vue 组件替换
        svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, '</component');

        // 将 svg 打包成一个
        const { code } = compileTemplate({
          source: svg,
          filename: path,
          id: JSON.stringify(id),
          transformAssetUrls: false,
        });

        return `${code}\nexport default { render: render }`;
      }
    }
  };
}
