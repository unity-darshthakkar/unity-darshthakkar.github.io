import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// If deploying to a project page (https://<user>.github.io/<repo>/), set base to '/<repo>/'.
// For a user site (https://unity-darshthakkar.github.io/) keep base as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
