import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  publicDir: 'public',
  base: '/',
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg'][4],
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return `assets/${assetInfo.name}`;
        },
      },
    },
    assetsInlineLimit: 0 // Deaktiviere Inline-Base64 für Assets
  }
})
