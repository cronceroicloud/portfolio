import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    css: true,
    // CAMBIO AQUI: Quitamos 'src/tests/' y ponemos '**' al principio.
    // Esto asegura que coincida siempre, independientemente de la ruta base.
    exclude: [...configDefaults.exclude, '**/e2e/**'],
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
