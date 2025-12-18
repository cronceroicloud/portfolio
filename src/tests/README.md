# Guía Completa de Pruebas - Portfolio React

Esta guía explica los 4 tipos de pruebas implementadas en este proyecto y cómo ejecutarlas.

---

## Índice

1. [Configuración Inicial](#configuración-inicial)
2. [Tipos de Pruebas](#tipos-de-pruebas)
3. [Comandos de Ejecución](#comandos-de-ejecución)
4. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Configuración Inicial

### Dependencias Instaladas

```bash
# Testing Library para React
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Playwright para E2E
npm install -D @playwright/test
npx playwright install

# UI y Coverage (opcional pero recomendado)
npm install -D @vitest/ui @vitest/coverage-v8
```

---

## Tipos de Pruebas

### 1️⃣ Pruebas Unitarias

**¿Qué son?**
Prueban funciones o componentes aislados, verificando su lógica interna sin dependencias externas.

**Características:**
- Son las más rápidas
- Se enfocan en una sola unidad de código
- Prueban lógica, renderizado básico, props

**Ejemplo en este proyecto:**
- `DarkModeSwitch.test.jsx`: Prueba el componente de modo oscuro aislado
- `validationUtils.test.js`: Prueba funciones de validación puras

**Cuándo usar:**
- Para probar funciones auxiliares (utils)
- Para probar componentes simples sin dependencias
- Para verificar lógica de negocio aislada

---

### 2️⃣ Pruebas de Integración

**¿Qué son?**
Aseguran que componentes interactúan correctamente entre sí (props, eventos, estado compartido).

**Características:**
- Prueban la comunicación entre componentes
- Verifican que props se pasen correctamente
- Comprueban eventos y callbacks

**Ejemplo en este proyecto:**
- `Trabajos.integration.test.jsx`: Prueba que Trabajos y Modal interactúan correctamente
- `App.integration.test.jsx`: Prueba que App monta todos los componentes

**Cuándo usar:**
- Para probar componentes padres con sus hijos
- Para verificar flujo de datos entre componentes
- Para probar eventos que afectan múltiples componentes

---

### 3️⃣ Pruebas Funcionales/UI

**¿Qué son?**
Verifican que la interfaz se comporte como debe ante eventos del usuario, simulando uso real.

**Características:**
- Simulan interacciones de usuario (clicks, escribir, etc.)
- Prueban flujos completos dentro de un componente
- Verifican cambios en la UI

**Ejemplo en este proyecto:**
- `Contacto.functional.test.jsx`: Simula llenar y enviar formulario
- `Trabajos.functional.test.jsx`: Simula filtrar trabajos y abrir modales

**Cuándo usar:**
- Para probar formularios completos
- Para probar interacciones complejas de usuario
- Para verificar cambios de estado visibles en UI

---

### 4️⃣ Pruebas End-to-End (E2E)

**¿Qué son?**
Simulan flujos completos de usuario en el navegador real para validar toda la aplicación.

**Características:**
- Usan navegador real (Chromium, Firefox, WebKit)
- Prueban toda la aplicación junta
- Son las más lentas pero más completas
- Detectan problemas de integración real

**Ejemplo en este proyecto:**
- `portfolio.e2e.test.js`: Prueba navegación completa del portfolio
- `contact-form.e2e.test.js`: Prueba flujo completo de contacto

**Cuándo usar:**
- Para probar flujos críticos del usuario
- Para probar navegación entre páginas
- Para validar la aplicación completa antes de producción

---

## Comandos de Ejecución

```bash
# Pruebas Unitarias, Integración y Funcionales (Vitest)
npm test                    # Ejecuta todas las pruebas una vez
npm run test:ui            # Abre interfaz visual de Vitest
npm run test:coverage      # Genera reporte de cobertura

# Pruebas E2E (Playwright)
npx playwright test contact-form.e2e.test.js --ui #así prueba a prueba
npm run test:e2e           # Ejecuta pruebas E2E
npm run test:e2e:ui        # Abre interfaz visual de Playwright
npx playwright test --headed  # Ejecuta E2E con navegador visible
npx playwright test --debug   # Ejecuta E2E en modo debug
```

---

## Estructura de Archivos

```
src/tests/
├── README.md                           # Esta guía
├── unit/                               # Pruebas Unitarias
│   ├── DarkModeSwitch.test.jsx
│   └── validationUtils.test.js
├── integration/                        # Pruebas de Integración
│   ├── Trabajos.integration.test.jsx
│   └── App.integration.test.jsx
├── functional/                         # Pruebas Funcionales/UI
│   ├── Contacto.functional.test.jsx
│   └── Trabajos.functional.test.jsx
└── e2e/                                # Pruebas E2E
    ├── portfolio.e2e.test.js
    └── contact-form.e2e.test.js
```

---

## Ejemplos Prácticos

### Ejemplo: Prueba Unitaria

```javascript
// Prueba un componente aislado
test('DarkModeSwitch renderiza correctamente', () => {
  render(<DarkModeSwitch />);
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});
```

### Ejemplo: Prueba de Integración

```javascript
// Prueba interacción entre componentes
test('Trabajos pasa props correctamente a Modal', () => {
  render(<Trabajos />);
  fireEvent.click(screen.getAllByRole('link')[0]);
  expect(screen.getByText(/Nexa Sys/i)).toBeInTheDocument();
});
```

### Ejemplo: Prueba Funcional

```javascript
// Simula uso real del usuario
test('Usuario puede filtrar trabajos', async () => {
  const user = userEvent.setup();
  render(<Trabajos />);
  await user.click(screen.getByLabelText(/Diseño Web/i));
  expect(screen.getAllByRole('article')).toHaveLength(3);
});
```

### Ejemplo: Prueba E2E

```javascript
// Prueba flujo completo en navegador
test('Usuario puede enviar formulario de contacto', async ({ page }) => {
  await page.goto('/');
  await page.fill('#nombre', 'Juan');
  await page.fill('#correo', 'juan@test.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/success/);
});
```

---

## Buenas Prácticas

1. **Escribe pruebas mientras desarrollas**, no después
2. **Comienza con unitarias**, luego integración, funcionales y E2E
3. **Las E2E deben ser pocas** (solo flujos críticos)
4. **Usa nombres descriptivos** en tus pruebas
5. **Mantén las pruebas simples** y fáciles de entender
6. **Ejecuta pruebas antes de hacer commit**

---

## Recursos

- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Docs](https://playwright.dev/)
