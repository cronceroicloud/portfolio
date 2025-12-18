import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',   // necesario para testear React
    setupFiles: './src/setupTests.js',  // opcional, pero recomendado
  },
})

/*

Debes poner esto
  test: {
    globals: true,
    environment: 'jsdom',   // necesario para testear React
    setupFiles: './src/setupTests.js',  // opcional, pero recomendado
  },

 */
