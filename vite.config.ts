import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background.ts'),
        content: resolve(__dirname, 'src/content.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') return 'background.js'
          return '[name].js'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext'
  }
})
