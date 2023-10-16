import SuperPreviewImage from './SuperPreviewImage.vue';
import PreviewImage from './PreviewImage.vue';
import type { App } from 'vue';

PreviewImage.SuperPreviewImage = SuperPreviewImage;

PreviewImage.install = (app: App) => {
  app.component(PreviewImage.name, PreviewImage);
  app.component(SuperPreviewImage.name, SuperPreviewImage);
  return app;
};

export default PreviewImage;

export { SuperPreviewImage };
