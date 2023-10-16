import type { App } from 'vue';
import UploadFile from './UploadFile.vue';

UploadFile.install = (app: App) => {
  app.component(UploadFile.name, UploadFile);
  return app;
};

export default UploadFile;
