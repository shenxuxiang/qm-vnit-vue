import ImagePreviewGroup from './ImagePreviewGroup';
import ContentFormHead from './ContentFormHeader';
import ContentFormTable from './ContentFormTable';
import PreviewImage from './PreviewImage';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';
import ModuleTree from './ModuleTree';
import UploadFile from './UploadFile';
import Image from './Image';
import Icon from './Icon';
import type { App } from 'vue';

const components = [
  Icon,
  Image,
  ModuleTree,
  UploadFile,
  UploadImage,
  UploadVideo,
  PreviewImage,
  ContentFormHead,
  ContentFormTable,
  ImagePreviewGroup,
];

// 全局注册
const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

// 局部注册
export {
  install,
  Icon,
  Image,
  ModuleTree,
  UploadFile,
  UploadImage,
  UploadVideo,
  PreviewImage,
  ContentFormHead,
  ContentFormTable,
  ImagePreviewGroup,
}

export default { install };
