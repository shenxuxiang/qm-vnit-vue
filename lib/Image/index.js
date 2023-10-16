import "core-js/modules/es.function.name.js";
import 'core-js/modules/es.function.name.js';
import './Image.vue2.js';
import script from './Image.vue.js';
script.install = function (app) {
  console.log(1111);
  app.component(script.name, script);
  return app;
};
export { script as default };