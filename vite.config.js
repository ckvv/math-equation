import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { name } from './package.json';

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
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
})
