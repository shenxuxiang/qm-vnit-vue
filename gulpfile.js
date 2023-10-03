import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import through from 'through2';
import clean from 'gulp-clean';
import base64 from 'gulp-base64';
import postcss from 'gulp-postcss';
import { fileURLToPath } from 'url';
import child_process from 'child_process';
import buildRollup from './script/buildES.js';

const __dirname = fileURLToPath(new URL('./', import.meta.url));

function cleanOutputDir(cb) {
  try {
    fs.rmSync(path.resolve(__dirname, 'lib'), { force: true, recursive: true });
    fs.rmSync(path.resolve(__dirname, 'es'), { force: true, recursive: true });
    cb();
  } catch(error) {
    cb(error);
  }
}

// 打包构建 ESM 模块，这里使用的 rollup 工具进行构建
async function buildEs() {
  await buildRollup();
}

// 打包构建 commonjs 模块
function buildCjs() {
  return gulp.src([ './es/**/*.js' ])
      .pipe(babel({ configFile: './babel.config.lib.cjs' }))
      .pipe(gulp.dest('./lib'));
}

// 执行有关生成 .d.ts 文件相关的任务
const tscTask = gulp.series(
  function () {
    return child_process.exec('npx vue-tsc -p tsconfig.lib.json');
  },
  function () {
    return gulp.src([ 'dts/**/*.d.ts' ])
      .pipe(through(
        { objectMode: true },
        function(chunk, encode, callback) {
          const newBase = path.join(chunk.base, 'lib');
          if (chunk.path.startsWith(newBase)) chunk.base = newBase;

          return callback(null, chunk);
        }
      ))
      .pipe(gulp.dest('lib'))
      .pipe(gulp.dest('es'));
  },
  function (cb) {
    fs.rmSync(path.resolve(__dirname, 'dts'), { force: true, recursive: true });
    cb();
  }
);

// 生成样式、以及相关的资源
function buildStyleSteet() {
  return gulp.src([ 'src/lib/**/*less' ])
    .pipe(less())
    .pipe(gulp.src([ 'src/lib/**/*.css' ]))
    .pipe(postcss())
    .pipe(base64())
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
}

export default gulp.series(cleanOutputDir, buildEs, buildCjs, tscTask, buildStyleSteet);

