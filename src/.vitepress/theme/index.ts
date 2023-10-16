import DefaultTheme from 'vitepress/theme';
import Layout from '../../components/Layout.vue';
// import * as vnit from '../../../es';
import './style/var.css';

export default {
  ...DefaultTheme,
  Layout,
  // enhanceApp({ app }) {
  //   Object.keys(vnit).forEach(key => {
  //     if (typeof vnit[key].install === 'function') app.use(vnit[key]);
  //   });
  // }
};
