import 'core-js/modules/es.function.name.js';
import './ImagePreviewGroup.vue.js';
import script from './ImagePreviewGroup.vue2.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
