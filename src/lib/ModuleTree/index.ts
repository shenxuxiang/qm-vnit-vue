import type { App } from 'vue';
import ModuleTree from "./ModuleTree.vue";
export type { TreeData } from "./ModuleTree.vue";

ModuleTree.install = (app: App) => app.component(ModuleTree.name, ModuleTree);

export default ModuleTree;
