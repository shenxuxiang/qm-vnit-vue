import type { App } from 'vue';
import ContentFormHeader from './ContentFormHeader.vue';
export type { QueryList, Cols } from './ContentFormHeader.vue';

ContentFormHeader.install = (app: App) => {
  app.component(ContentFormHeader.name, ContentFormHeader);
  return app;
};

export { ContentFormHeader as default };
