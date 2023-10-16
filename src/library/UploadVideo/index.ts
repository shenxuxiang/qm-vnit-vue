import type { App } from 'vue';
import UploadVideo from './UploadVideo.vue';
export type { FileList } from './UploadVideo.vue';

UploadVideo.install = (app: App) => {
  app.component(UploadVideo.name, UploadVideo);
  return app;
};

export { UploadVideo as default };
