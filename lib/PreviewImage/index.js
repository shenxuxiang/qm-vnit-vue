import "core-js/modules/es.function.name.js";
import 'core-js/modules/es.function.name.js';
import './SuperPreviewImage.vue.js';
import './PreviewImage.vue2.js';
import script from './PreviewImage.vue.js';
import script$1 from './SuperPreviewImage.vue2.js';
script.SuperPreviewImage = script$1;
script.install = function (app) {
  app.component(script.name, script);
  app.component(script$1.name, script$1);
  return app;
};
export { script$1 as SuperPreviewImage, script as default };