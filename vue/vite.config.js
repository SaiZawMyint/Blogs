import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@img' : path.resolve(__dirname, './src/assets/img')
    },
  },
  plugins: [vue()]
})
