import path from 'path';
import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import through2 from 'through2';
import base64 from 'gulp-base64';
import postcss from 'gulp-postcss';
import buildES from './buildES/index.js';
import child_process from 'child_process';

function cleanDir() {
  return gulp.src([ './es', './lib' ], { read: false, allowEmpty: true })
    .pipe(clean({force: true}));
}

function rewriteBuildES() {
  return gulp.src('./src/library/index.ts')
  .pipe(babel({ configFile: './babel.config.cjs' }))
  .pipe(gulp.dest('./es'));
}

function buildCJS() {
  return gulp.src('./es/**/*.js')
    .pipe(babel({ configFile: './babel.config.lib.cjs' }))
    .pipe(gulp.dest('./lib'));
}

function buildStyle() {
  return gulp.src('./src/library/**/*.less')
    .pipe(less())
    .pipe(gulp.src('./src/library/**/*.css'))
    .pipe(postcss())
    .pipe(base64())
    .pipe(gulp.dest('./es'))
    .pipe(gulp.dest('./lib'));
}

const buildDTS = gulp.series(
  function () {
    // vue 项目中必须使用 vue-tsc 才能执行 tsc，否则无法对 vue 文件进行编译
    return child_process.exec('npx vue-tsc -p tsconfig.lib.json');
  },
  function () {
    return gulp.src('./dts/**/*.d.ts')
      .pipe(through2(
        { objectMode: true },
        function(chunk, _, callback) {
          const newBase = path.join(chunk.base, './library');
          if (chunk.path.startsWith(newBase)) chunk.base = newBase;

          return callback(null, chunk);
        },
      ))
      .pipe(gulp.dest('es'))
      .pipe(gulp.dest('lib'))
  },
  function () {
    return gulp.src([ './dts'], { read: false, allowEmpty: true })
      .pipe(clean());
  }
);

export default gulp.series(cleanDir, buildES, rewriteBuildES, buildCJS, buildStyle, buildDTS);
