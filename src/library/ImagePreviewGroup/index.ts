import type { App } from 'vue';
import ImagePreviewGroup from './ImagePreviewGroup.vue';

ImagePreviewGroup.install = (app: App) => {
  app.component(ImagePreviewGroup.name, ImagePreviewGroup);
  return app;
};

export default ImagePreviewGroup;
