import "core-js/modules/es.function.name.js";
import 'core-js/modules/es.function.name.js';
import './UploadVideo.vue.js';
import script from './UploadVideo.vue2.js';
script.install = function (app) {
  app.component(script.name, script);
  return app;
};
export { script as default };