import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
import { name } from './package.json';

const elPlugin = styleImport({
  libs: [{
    libraryName: 'element-plus',
    esModule: true,
    ensureStyleFile: true,
    resolveStyle: (name) => `element-plus/packages/theme-chalk/src/${name.slice(3)}.scss`,
    resolveComponent: (name) => `element-plus/lib/${name}`,
  }],
});
// https://vitejs.dev/config/
export default defineConfig({
  base: name,
  server: {
    port: 8000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/style/index.scss" as *;',
      },
    },
  },
  plugins: [vue(), elPlugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
})
