import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

const __dirname = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig({
  title: 'qm-vnit-vue',
  description: 'This is a vue ui library',
  // 设置访问的路由前缀
  base: '/qm-vnit-vue',
  // 可调节夜间模式、白昼模式
  appearance: false,
  markdown: {
    // 高亮
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }, // 是否显示对应的行数
    lineNumbers: true,
  },
  // 是否显示最近一次的更新时间
  lastUpdated: true,
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
      },
    },
    build: {
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
      open: true,
      proxy: {
        '/v1.0': {
          target: 'http://192.168.5.2:20021',
          changeOrigin: true,
        },
        '/group1': {
          // 测试
          target: 'http://192.168.5.2:20011',
          changeOrigin: true,
        },
      },
    },
  },
  // 站点的构建输出位置，相对于项目根目录
  outDir: path.resolve(__dirname, '../../build'),
  // 定义引入 markdown 时的路径别名，例如： <<< @/demo/Image/demo.vue
  srcDir: path.resolve(__dirname, '../../src'),
  lang: 'zh_CN',
  head: [['link', { rel: 'icon', href: '/vue.svg' }]],
  themeConfig: {
    // 网站标题
    siteTitle: 'qm-vnit-vue',
    // 网站logo
    logo: '/vue.svg',
    lastUpdatedText: '更新时间',
    // 可以定义此选项以在导航中展示带有图标的社交帐户链接
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/shenxuxiang?tab=repositories',
      },
    ],
    // 定义页面的查询功能
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
    // 导航栏
    nav: [
      { text: '介绍', link: '/' },
      { text: '安装', link: '/install' },
      { text: '组件', link: '/docs/image' },
    ],
    // 侧边栏
    sidebar: {
      '/docs/': [
        {
          text: '图像展示',
          items: [
            { text: 'Image 图片', link: '/docs/image' },
            {
              text: 'ImagePreviewGroup 图片展示',
              link: '/docs/imagePreviewGroup',
            },
            { text: 'PreviewImage 图片预览', link: '/docs/previewImage' },
          ],
        },
        {
          text: '表格相关',
          items: [
            {
              text: 'ContentFormHeader 表单查询',
              link: '/docs/contentFormHeader',
            },
            {
              text: 'ContentFormTable 表格展示',
              link: '/docs/contentFormTable',
            },
          ],
        },
        {
          text: '上传功能',
          items: [
            { text: 'UploadFile 文件上传', link: '/docs/uploadFile' },
            { text: 'UploadImage 图像上传', link: '/docs/uploadImage' },
            { text: 'UploadVideo 视频上传', link: '/docs/uploadVideo' },
          ],
        },
        {
          text: 'Icon图标',
          items: [{ text: 'Icon 图标', link: '/docs/icon' }],
        },
        {
          text: '数据选项',
          items: [{ text: 'ModelTree 模型树', link: '/docs/modelTree' }],
        },
      ],
      '/preview/': [
        {
          text: 'ContentFormTable',
          items: [
            { text: 'demo1', link: '/preview/contentFormTable/demo1.md' },
            { text: 'demo2', link: '/preview/contentFormTable/demo2.md' },
            { text: 'demo3', link: '/preview/contentFormTable/demo3.md' },
            { text: 'demo4', link: '/preview/contentFormTable/demo4.md' },
          ],
        },
      ],
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You',
    },
  },
});
