import type { App } from 'vue';
import UploadImage from './UploadImage.vue';
export type { FileList } from './UploadImage.vue';

UploadImage.install = (app: App) => app.component(UploadImage.name, UploadImage);

export default UploadImage;
