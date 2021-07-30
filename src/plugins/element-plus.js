import {
  ElButton,
  ElInput,
  ElSlider,
  ElIcon,
} from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';

const components = [
  ElButton,
  ElInput,
  ElSlider,
  ElIcon,
];

export default {
  install(app) {
    app.config.globalProperties.$ELEMENT = {
      size: 'small',
    };
    components.forEach((component) => {
      app.use(component);
    });
  },
};
