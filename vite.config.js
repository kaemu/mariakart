import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/kart/play': {
        target: 'https://bind.bunex-industries.com/',
        ws: true,
        secure: false,
        changeOrigin: true
      }
    }
  }
})
