import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,             // Activa las funciones globales como "test"
        environment: 'jsdom',      // Simula el DOM del navegador
        setupFiles: './src/setupTests.js', // Carga jest-dom
    },
})

/*
1. Pruebas unitarias

Prueban una parte muy pequeña: una función, un hook, o un componente aislado.

Son rápidas.

Se centran en lógica, props, renderizado básico.

Ejemplo:
Comprobar que Header muestra el título “Portfolio”.

2. Pruebas de integración

Combinan varios componentes o partes del sistema.

Verifican que interactúan correctamente.

Por ejemplo: App.jsx monta Header y queremos comprobar que el texto se ve allí.

3. Pruebas end-to-end (E2E)

Simulan a un usuario real.

Usan herramientas como Playwright o Cypress.

Prueban formularios, navegación, clicks reales.
 */

/*
Instalar Vitest

1.- npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

2.- Crear vite.config.js como este ejemplo

3.- crea src/setupTests.js
import '@testing-library/jest-dom';

4.- en vite.config añadir
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/setupTests.js'
}

5.- en package.json añadir
"test": "vitest --watch false"

6.-npm run test

Antes debes crear los testo dentro de la carpeta test
Header.test.jsx


 */