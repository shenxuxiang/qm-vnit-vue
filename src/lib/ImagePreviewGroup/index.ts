import type { App } from 'vue';
import ImageGroup from "./ImageGroup.vue";

ImageGroup.install = (app: App) => app.component(Image.name, Image);

export default ImageGroup;
