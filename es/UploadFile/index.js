import 'core-js/modules/es.function.name.js';
import './UploadFile.vue2.js';
import script from './UploadFile.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
