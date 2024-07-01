import type { App } from 'vue';
import ContentFormTable from './ContentFormTable.vue';

ContentFormTable.install = (app: App) => {
  app.component(ContentFormTable.name!, ContentFormTable);
  return app;
};

export { ContentFormTable as default };
