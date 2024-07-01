import type { App } from 'vue';
import ModelTree from './ModelTree.vue';
export type { TreeData } from './ModelTree.vue';

ModelTree.install = (app: App) => {
  app.component(ModelTree.name!, ModelTree);
  return app;
};

export { ModelTree as default };
