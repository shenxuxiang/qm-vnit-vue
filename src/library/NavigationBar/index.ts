import type { App } from 'vue';
import NavigationBar from './NavigationBar.vue';
export type { NavBarList } from './NavigationBar.vue';

NavigationBar.install = (app: App) => {
  app.component(NavigationBar.name!, NavigationBar);
  return app;
};

export { NavigationBar as default };
