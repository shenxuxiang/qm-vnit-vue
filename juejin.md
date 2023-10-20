# 前端 UI 组件库打包和发布（VUE）

前段时间写了一个关于 React UI 组件库的打包详解，同时也发布了一个 [qm-vnit](http://aitweb.top/qm-vnit) 组件库。好巧不巧的是，组件库刚搞完不到一个星期，就开始了新需求要求使用 Vue 3 进行开发，基于这个契机我就又搞了一个 [qm-vnit-vue](http://aitweb.top/qm-vnit-vue) Vue Ui 组件库。接下来我就开始介绍 Vue Ui 组件库的打包步骤。

## 组件库开发注意事项

### 提供组件全局注册的方法
> 根据 Vue.use(myPlugin) 使用插件的逻辑，myPlugin 应该有一个 install 的方法，在 install 方法中你可以对组件进行全局的注册；

> 所以每个组件上都应该绑定一个 install()，并且每个组件都应该添加 name 属性，你可以使用 defineOptions({ name: 'xxx' }) 添加 name。

```js
  Comp.install = (app: App) => {
    app.component(Comp.name, Comp);
    return app;
  }
```


### 样式
> 样式应该从 SFC 文件中分离出来，通过 `import` 的形式引入；

> 不使用 CssModule，开发者可以通过类名对样式进行二次修改；



### 按需引入
> 目前 webpack2+ 和 vite 都支持 Treehaking，只要我们的代码写的没有问题即可；

> 需要提供一个统一的入口文件，并使用 `export { default as xxx } from 'xxx'` 的形式将所有的组件挨个导出即可。

> 在库的 package.json 文件中添加 main、module、sideEffects 以及 types 字段。

```json
{
  "main": "./lib/index.js",   // 表示 commonjs 文件入口
  "module": "./es/index.js",  // 表示 es 文件入口
  "types": "./es/index.d.ts", // 表示 typescript 声明文件入口
  "sideEffects": false        // 表示是否有副作用
}
```


### 依赖第三方库
> 就拿我自己的组件库来说，我自己的组件是依赖 ant-design-vue，@ant-design/icons-vue 这两个库。

> 在打包构建时需要对这些库进行按需引入，这对于打包生成 es 模块是没有问题的，但对于 commonjs 模式来说，就存在问题了。

```js
import { Button, Spin, Select } from 'ant-design-vue';
import { UploadOutlined, PlusOutlined } '@ant-design/icons-vue';
```
> 对于上面的两行代码，如果打包模式为 commonjs 时，生成的代码如下：

```js
const antd = require('ant-design-vue');
const antDesign = require('@ant-design/icons-vue');
```
> 对于这种情况，当别人使用了你的库后进行生产构建时就会将 ant-design-vue，@ant-design/icons-vue 所有的内容都打包到 bundle 中。

> 此时我们需要借助 babel-plugin-import 插件，并将其添加至 babel 配置文件中即可解决 ant-design-vue 的按需引入问题。

> 但对于 @ant-design/icons-vue 来说，该插件就无能为力了，但是这也难不倒我们，后面我们可以通过自定义 rollup、或 gulp 插件来解决这个问题。



### 静态文件资源要求

> 对于一些静态的的资源文件，我推荐将这些资源存放在一个公共目录下，不建议放在每个组件内部。这些文件应该尽可能的被压缩。

> 在构建库时，使用 rollup 构建 js 部分以及依赖的静态资源文件；

> 使用 gulp 对 css 部分以及被引入的静态资源文件进行打包构建，并将静态资源全部全部打包成 base64。

**以上便是我开发组件库时的一些心得，有些还是蛮重要的。现在我们开始第二部分**

## 组件库打包流程
构建流程我大概的分为以下几个步骤：
* 构建 ES 模块

* 基于已经构建完成的 ES 模块来构建 CJS 模块

* 构建样式以及样式中引入的静态资源

* 构建 `.d.ts` 声明文件


### 构建 ES 模块
> 构建 ES 模块我们使用 rollup 工具以及相关的插件来帮我完成

#### install dependencies
```shell
    yarn add --dev rollup 

    yarn add --dev rollup-plugin-vue rollup-plugin-typescript2
    
    yarn add --dev @rollup/plugin-babel @rollup/plugin-image @rollup/plugin-alias @rollup/plugin-commonjs @rollup/plugin-node-resolve 
```
> 注意，安装 `rollup-plugin-vue` 插件时，必须要要状态 6.0 以上的版本才能支持 vue3。

> 对于 typescript 中支持，必须安装 `rollup-plugin-typescript2` 插件，其他的如 `@rollup/plugin-typescript` 是不行的。


#### 代码和注释

```js
import path from 'path';
import chalk from 'chalk';
import process from 'process';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import vuePlugin from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import less2css from './rollup-plugin-less2css.js';
import imageToBase64 from '@rollup/plugin-image';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import importAntDesignIconsVue from './rollup-plugin-import-ant-design-icons-vue.js';

// 该方法用于获取当前文件的目录
const __dirname = fileURLToPath(new URL('./', import.meta.url));

const inputOptions = {
  // 入口文件
  input: path.resolve(__dirname, '../src/library/index.ts'),
  // 指定外部依赖，他们将不会被打包到 bundle 中
  external: [ /[\\/]node_modules[\\/]/, /\.less/, /\.css/, /\.scss/ ],
  plugins: [
    // rollup 无法直接对 node_modules 中的第三方库进行加载，必须依赖 @rollup/plugin-node-resolve 插件
    nodeResolve(),
    // 如果依赖项是 commonjs 模块，必须要依赖 @rollup/plugin-commonjs 插件才能完成加载
    commonjs(),
    // 指定路径别名，与 webpack 或者 vite 中一样即可
    alias({ entries: { '@': path.resolve('src') } }),
    // 对 Vue 文件进行解析和转换，从而得到你想要的 JS 文件
    vuePlugin(),
    // 处理 ts
    typescript({ check: false }),
    // 对于转换后的 JS 文件，再使用 babel 进行转换，babel 的配置文件建议使用 babel.config.js
    babel({
      // 对于打包库来说，babelHelpers 必须为 runtime
      babelHelpers: 'runtime',
      exclude: /[\\/]node_modules[\\/]/,
      extensions: [ '.tsx', '.ts', '.jsx', '.js', '.cjs', '.mjs' ],
    }),
    // 将所有的被 js 引入的图片资源全部打包成 base64
    imageToBase64(),
    // 将文件中的所有引入 '.less' 全部转换成 '.css'
    // less2css(),
    // 将文件中引入的 @ant-design/icons-vue 进行拆分
    // importAntDesignIconsVue(),
  ],
  // 对于所有的外部资源，全部采用绝对路径
  makeAbsoluteExternalsRelative: false,
};

const outputOptions = {
  format: 'es',
  // 保持原有的目录结构
  preserveModules: true,
  // 库的代码是存在 src/library 目录下的。
  // 如果要保持原有的目录结构输出到 es 目录下，就需要将 src/library 这个路径去掉。
  // 否则打包生成的文件路径就包含 /library，例如 src/library/a.tsx => es/library/a.js
  // 这与我们的预期不一致，我们希望的结果应该是 es/a.js。
  preserveModulesRoot: 'src/library',
  dir: path.resolve(__dirname, '../es'),
};

async function buildES() {
  let bundle = null;
  try {
    // 开始构建
    bundle = await rollup(inputOptions);
    // 写入到本地文件系统（如果你是写入到内存中，则调用 bundle.generate(outputOptions)）
    await bundle.write(outputOptions);
  } catch(error) {
    // 如果打包过程出现异常了，则打印异常信息并终止程序。
    const msg = error.stack.replace(/^\b/gm, '   ');
    process.stdout.write(chalk.hex('#ff0000')(msg));
    // 关闭进程
    process.exit(1);
  }

  if (bundle) bundle.close();
}

// 如果你希望单独执行 ES 代码构建，可以将下面一行代码注释放开，并执行 node ./buildES 命令。
// buildES()

export default buildES;
```


#### babel.config.js 
```js
module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        // false 表示使用 ES Module 进行构建，默认为 true，表示使用 commonjs
        modules: false,
        debug: false,
        // "usage" 表示将根据您的上下文来引入需要的 polyfill。
        // 如果你使用 "entry"，则将从入口文件处引入所有的 polyfill。
        useBuiltIns: 'usage', 
        // 这里的 version 请保持与您安装的 core-js 的版本一致 
        corejs: { version: "3.33", proposals: true } 
      }],
    '@babel/preset-typescript'
  ],
  plugins: [
    // 如果你使用了 jsx 语法，请配置该插件
    '@vue/babel-plugin-jsx',
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    // @babel/preset-env 只对新的语法进行转换，对于新的API（内置类的静态方法，全局方法以及实例方法）不进行转换
    // 所以这里引入 transform-runtime 插件，将所有新语法经过 preset-env 转换后的辅助函数全部使用 runtime-corejs/helpers 替换；
    // 同时对于 preset-env 转换后产生的全局引入，替换成模块引入的方法，避免了全局污染；
    // 最后一点就是通过模块引入的方式按需引入 polyfill 来支持 ES6+ 新增的内置类的静态方法，全局方法以及实例方法
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ]
}
```

> 执行 node node ./buildES 命令；

> 你会发现在项目根目录下会生成一个 es 的目录，并与 src/library 目录中的结构是一样的；

> 到这里，ES 模块的打包还没有完，因为我们还需要将 `import './index.less'` 替换成 `import './index.css'`；

> 以及对 `import { ... } from '@ant-design/icons-vue'` 内容进行拆分。

> 此时我们要通过自定义 rollup 插件帮我们来完成这两个任务。


#### rollup-plugin-less2css
```js
export default function() {
  return {
    name: 'rollup-plugin-less2css',
    version: '1.0.0',
    transform: {
      // 这是一个异步的钩子
      async: true,
      // 如果此配置项为 true，则 rollup 中出现多个相同异步钩子时，这些异步钩子将按照书写的先后顺序依次执行
      sequential: true,
      // 钩子函数
      handler(code, id) {
        // id 表示即将进行编译的资源的绝对路径
        if (!/\.(vue|tsx?|jsx?)$/.test(id)) return;
        if (!/\.less/.test(code)) return;
        return code.replace(/\.less/g, '.css');
      }
    }
  };
}
```

#### rollup-plugin-import-ant-design-icons-vue
```js
// 过滤条件，它将匹配 import { ... } from '@ant-design/icons-vue'
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
        // 注意这里的 $1 表示的是 filterRegexp 匹配的第一个子模式的内容
        const matched = RegExp.$1;
        const result = [];

        // contextRegExp 是一个全局匹配模式，需要匹配多次才能将所有的内容找出
        while (contextRegExp.test(matched)) {
          result.push(RegExp.$1);
        }

        // 最后进行拼接
        const text = result.reduce((memo, item) => {
          memo += `import ${item} from '@ant-design/icons-vue/${item}';`;
          return memo;
        }, '');

        return code.replace(filterRegexp, text);
      }
    }
  }
}
```

**将以上两个插件添加到 inputOptions.plugins 中去，至此一个完整的 ES 模块就打包成功了**




### 构建 CJS 模块
> 对于 CJS 模块的构建我使用的是 gulp 打包工具，并配合 babel 以及相关的插件来帮我们完成打包工作。


#### install dependencies

```shell
  yarn add --dev gulp gulp-cli gulp-babel gulp-base64 gulp-less gulp-postcss
```

#### 创建 gulpfile.js
> 在项目根目录下，创建一个名为 `gulpfile.js` 的文件。此时我们再文件中引入 buildES.

```js
import buildES from './buildES/index.js';

export default buildES;
```

> 此时你可以试试使用 gulp 工具来调用 rollup 进行打包操作。执行 `npx gulp` 命令。该命令执行的结果与我们单独执行 `node ./buildES` 是一样的。


#### 创建一个清理文件夹的任务
```js
import gulp from 'gulp';
// 清理匹配的文件和目录
import clean from 'gulp-clean'; 
import buildES from './buildES/index.js';

function cleanDir() {
  // 读取根目录下的 es、lib 目录，
  // read: false 表示不读取文件内容，这样设置可以使程序执行更快
  // allowEmpty: true 表示如果文件目录不存在时，gulp 不会抛出异常。
  return gulp.src([ './es', './lib' ], { read: false, allowEmpty: true })
    .pipe(clean({force: true}));
}

// gulp.series 可以将多个任务组成一个合成任务，原先的任务将按照传递的先后顺序依次执行
export default gulp.series(cleanDir, buildES);
```
> 此时，你可以试试执行 `npx gulp`。



#### 你是否发现 ./es/index.js 文件中会全局引入组件？？?
为了解决这个问题，我们需要对 `./src/library/index.ts` 进行重新编译，并将编译后的内容覆盖 `./es/index.js`；
```js
function rewriteBuildES() {
  return gulp.src('./src/library/index.ts')
  .pipe(babel({ configFile: './babel.config.cjs' }))
  .pipe(gulp.dest('./es'));
}

export default gulp.series(cleanDir, buildES, rewriteBuildES);
```
> 现在你再执行一次 gulp 命令，现在的结果才算是真正的满足我们的需求了。



#### 创建构建 CJS 模块任务

```js
import gulp from 'gulp';
import babel from 'gulp-babel';
import buildES from './buildES/index.js';

// 代码省略。。。

function buildCJS() {
  // CJS 的构建时依赖 ES 模块的，所以我们需要先构建 ES 模块，然后再构建 CJS
  // 这里我们通过 gulp.src() 去读 ./es 目录下的全部 JS 文件，然后将它们交给 babel 再进行 commonjs 的转译。
  return gulp.src('./es/**/*.js')
    // 这里我们制定了 babel 的配置文件
    .pipe(babel({ configFile: './babel.config.lib.cjs' }))
    // gulp.dest() 会见上面的转译后的内容全部输出到指定的文件目录中。并保持原有的目录结构
    .pipe(gulp.dest('./lib'));
}

export default gulp.series(cleanDir, buildES, rewriteBuildES, buildCJS);
```

#### babel.config.lib.cjs

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        // 使用 commonjs
        modules: 'commonjs', 
        debug: false, 
        useBuiltIns: 'usage', 
        corejs: { version: "3.33", proposals: true } 
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    // babel-plugin-import 对 ant-design-vue 库进行按需引入
    ['babel-plugin-import', { libraryName: 'ant-design-vue', libraryDirectory: 'lib', style: false }],
  ]
}
```

### 样式构建
> 到目前为止，我们已经将 library 全部转换成了 CJS、ES 模块。接下来我们将对样式部分进行构建。 我们继续在 gulpfile.js 文件中添加任务

```js
import gulp from 'gulp';
import less from 'gulp-less';
import base64 from 'gulp-base64';
import postcss from 'gulp-postcss';

// 代码省略。。。

function buildStyle() {
  // 先读取 src/library 目录下的所有 less 文件，然后对 less 文件进行编译，编译后会转成 css 文件保存在内存中。
  return gulp.src('./src/library/**/*.less')
    .pipe(less())
    // 紧接着继续读取 src/library 目录下的所有 css 文件
    .pipe(gulp.src('./src/library/**/*.css'))
    // 然后将以上步骤中所有的 css 文件都交由 postcss 进行处理
    // 如果项目根目录下已经存在 postcss.config.cjs 文件，这里可以不用配置 options
    .pipe(postcss())
    // 最后是将 css 文件中所有依赖的静态资源全部打包成 base64 内嵌在 css 文件中
    .pipe(base64())
    // 写入到 es 目录下
    .pipe(gulp.dest('./es'))
    // 写入到 lib 目录下
    .pipe(gulp.dest('./lib'));
}

export default gulp.series(cleanDir, buildES, rewriteBuildES, buildCJS, buildStyle);
```


### 生成 TS 声明文件
> 这是打包的最后一步了，我们只需要将生成 ts 声明文件输出到 lib、es 目录结构中就可以了。

> 但是，我发现单单使用 tsc 命令生成声明文件，还是借助 rollup/gulp 工具，都无法直接满足我们需求，

> 因为以上两种方法，在打包后的产物中，会有一个 library 这个前置目录存在。这与我们的期望有所不同。

> 最终，我的解决办法时先使用 tsc 生成 .d.ts 文件，然后借助 gulp 再进行处理。

```js
import path from 'path';
import gulp from 'gulp';
import clean from 'gulp-clean';
import through2 from 'through2';
import child_process from 'child_process';

const buildDTS = gulp.series(
  function () {
    // vue 项目中必须使用 vue-tsc 才能执行 tsc，否则无法对 vue 文件进行编译
    // 注意，这里我们指定了 vue-tsc 的配置文件为 ./tsconfig.lib.json
    // 建议在你的控制台中单独执行 `npx vue-tsc -p tsconfig.lib.json` 命令，并查看生成的内容。便于下文的展开 
    return child_process.exec('npx vue-tsc -p tsconfig.lib.json');
  },
  function () {
    return gulp.src('./dts/**/*.d.ts')
      .pipe(through2(
        { objectMode: true },
        function(chunk, _, callback) {
          const newBase = path.join(chunk.base, './library');
          // gulp.dest() 在输出时将每个资源的 chunk.base 路径全部截取掉。
          // 例如，当前的情况 base 就是 "/qm-vnit-vue/dts"，这取决于 gulp.src(pattern) 的参数 pattern
          // 这里我们将 library 目录下的文件的 base 修改为 base = base + '/library'，
          // 这样在输出文件时就会将 base + '/library' 路径全部截取掉。
          // 例如：/qm-vnit-vue/dts/library/index.d.ts ===> /index.d.ts
          // 这样通过 gulp.dest('es') 写入文件系统时就变成了 /qm-vnit-vue/es/index.d.ts 
          if (chunk.path.startsWith(newBase)) chunk.base = newBase;

          return callback(null, chunk);
        },
      ))
      // 最终，文件将输出到 es，lib 目录中，
      .pipe(gulp.dest('es'))
      .pipe(gulp.dest('lib'))
  },
  function () {
    // 上面的任务完成后，将 dts 目录删除
    return gulp.src([ './dts'], { read: false, allowEmpty: true })
      .pipe(clean());
  }
);

export default gulp.series(cleanDir, buildES, rewriteBuildES, buildCJS, buildStyle, buildDTS);
```

> 注意，我是单独指定一个 tsconfig.lib.json 文件来生成 .d.ts 文件，

> 这是因为默认的 tsconfig.json 是不会输出内容的，而我们指定的 tsconfig.lib.json 只需要输出声明文件即可；

> tsconfig.lib.json 和 tsconfig.json 不同之处看下面

```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationonly": true,
    // 指定声明文件的输出目录
    "declarationDir": "dts",
    // "noEmit": true
  },
  // src/library 是我库所在的目录，src/vite-env.d.ts 时全局声明文件
  "include": [ "src/library", "src/vite-env.d.ts" ]
}
```
> 好了，到这里我们所有的打包都已经完成了，剩下的就是如何发布 npm 包了。


### npm publish
> 在发布之前我们应该做一下几件事情

- 1、添加 readme
- 2、修改 version、name 字段
- 3、修改 main、module、types 等字段
- 4、修改 files 字段
- 5、将一些公共依赖项从 dependencies中移动到 peerDependencies 中
- 6、添加 keywords 和 description
- 7、添加 contributes 和 respository

```json
{
  "name": "qm-vnit-vue",
  "version": "0.0.0",
  "main": "./lib/index.js",
  "module": "./es/index.js",
  "types": "./lib/index.d.ts",
  "files": [ "lib", "es" ],
  "keywords": [
    "Qm-Vnit-Vue",
    "And-Design-Vue",
    "Vue Ui Library"
  ],
  "description": "Vue Ui Library",
  "contributes": [ "https://github.com/shenxuxiang/" ],
  "respository": "https://github.com/shenxuxiang/qm-vnit-vue"
}
```
> 🆗 大功告成。

## 总结
> Vue 组件的打包方式与 React 组件的打包方式大体上基本一样，不同点我例举一下：
- rollup 在构建 ES Module 时，需要配合 `rollup-plugin-vue` 插件完成对 Vue 文件的编译和转换；

- tsc 无法完成 Vue 文件中 ts 语法的转换，需要使用 `vue-tsc` 工具帮忙；

- 如果你使用了 jsx 语法，在编译时请安装 `@vue/babel-plugin-jsx` 插件；

> 总的来说，Vue 和 React 打包流程基本一致，会了一个，另一个自然就会了。
