import SuperPreviewImage from "./SuperPreviewImage.vue";
import PreviewImage from "./PreviewImage.vue";
import type { App } from 'vue';

const _default = PreviewImage as typeof PreviewImage & { SuperPreviewImage: typeof SuperPreviewImage };

_default.SuperPreviewImage = SuperPreviewImage;

_default.install = (app: App) => {
  app.component(PreviewImage.name, PreviewImage);
  app.component(SuperPreviewImage.name, SuperPreviewImage);
};

export default _default;

export { SuperPreviewImage };
