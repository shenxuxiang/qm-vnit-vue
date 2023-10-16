import type { App } from 'vue';
import Image from './Image.vue';

Image.install = (app: App) => {
  console.log(1111);
  app.component(Image.name, Image);
  return app;
};

export { Image as default };
