import "core-js/modules/es.function.name.js";
import 'core-js/modules/es.function.name.js';
import './UploadImage.vue2.js';
import script from './UploadImage.vue.js';
script.install = function (app) {
  app.component(script.name, script);
  return app;
};
export { script as default };