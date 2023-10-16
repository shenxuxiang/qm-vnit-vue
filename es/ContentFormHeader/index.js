import 'core-js/modules/es.function.name.js';
import './ContentFormHeader.vue2.js';
import script from './ContentFormHeader.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
