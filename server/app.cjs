const fs = require('fs');
const path = require('path');
const Koa = require('./koa/index.cjs');
const Router = require('./koa-router/index.cjs');
const renderStatic = require('./koa-static/index.cjs');
const chalk = require('chalk');

const router = new Router();

router.get(['/qm-vnit-vue/:id+'], function(ctx) {
  console.log(ctx.url);
  ctx.redirect(ctx.url.slice(12));
});

// router.get('/static/:id+', function(ctx) {
//   const url = ctx.url;
//   console.log(url);
//   ctx.redirect(url.slice('8'));
// });

const app = new Koa();

app.use(renderStatic(path.resolve(__dirname, '../dist')));

app.use(router.routes());

app.listen(3333, function() {
  process.stdout.write(chalk.keyword('green')('   Local Server Successfully Started\n'));
  process.stdout.write(chalk.keyword('green')('   http://localhost:3333/\n'));
});
