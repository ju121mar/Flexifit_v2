import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Entferne den Hash aus dem Dateinamen
          return `assets/${assetInfo.name}`;
        },
      },
    },
    assetsInlineLimit: 0 // Deaktiviere Inline-Base64 für Assets
  }
})
