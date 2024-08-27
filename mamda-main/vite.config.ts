import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import VueDevTools from 'vite-plugin-vue-devtools';
import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
  plugins: [
    VueDevTools(),
    vue(),
    vuetify({
      autoImport: true
    }),
    DefineOptions()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  server: {
    host: true,
    port: 9527
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./src/**/*.vue']
  },
  assetsInclude: ['**/*.png', '**/*.PNG']
});
