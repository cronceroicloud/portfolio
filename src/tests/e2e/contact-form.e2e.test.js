/**
 * PRUEBAS E2E - Formulario de Contacto
 *
 * Prueba el flujo completo del formulario en navegador real:
 * - Validaciones
 * - Mensajes de error
 * - Envío correcto
 */

import { test, expect } from "@playwright/test"

test.describe("Formulario de Contacto - Flujo E2E", () => {

  test.beforeEach(async ({ page }) => {
    // 1. Interceptamos la llamada a Formspree para que no envíe correos reales
    // Cuando el navegador intente ir a formspree, Playwright le dirá "¡Todo ok!" y abortará el envío real.
    await page.route('https://formspree.io/**', async route => {
      await route.fulfill({ status: 200, body: 'Formulario recibido (Mock)' });
    });

    await page.goto("http://localhost:5173/");

    // Navegar al formulario haciendo clic
    await page.getByRole("link", { name: "Contacto" }).click()

    // 2. MEJORA: En vez de waitForTimeout, esperamos a que el título sea visible
    // Esto asegura que el scroll ha terminado y el usuario ve la sección
    await expect(page.getByRole("heading", { name: "Hagamos tu idea una realidad" })).toBeVisible()
  })

  // ... tus tests de validación visual están perfectos ...
  test("formulario muestra todos los campos requeridos", async ({ page }) => {
    await expect(page.getByLabel("Nombre")).toBeVisible()
    await expect(page.getByLabel("Correo")).toBeVisible()
    await expect(page.getByLabel("Mensaje")).toBeVisible()
    await expect(page.getByRole("button", { name: /Mandar mensaje/i })).toBeVisible()
  })

  test("muestra error cuando el nombre es muy corto", async ({ page }) => {
    await page.getByLabel("Nombre").fill("J")
    await page.getByRole("button", { name: /Mandar mensaje/i }).click()
    // Asegúrate que en React pone "valido" (sin tilde) o corrige ambos
    await expect(page.locator("text=Por favor ingresa un nombre valido")).toBeVisible()
  })

  // ... resto de tests de error igual que los tuyos ...

  test("usuario llena el formulario correctamente paso a paso", async ({ page }) => {
    // Llenamos todo correcto
    await page.getByLabel("Nombre").fill("Juan Pérez")
    await page.getByLabel("Correo").fill("juan@example.com")
    await page.getByLabel("Mensaje").fill("Test E2E")

    // Escuchamos si se dispara el evento de navegación (el submit)
    // Esto verifica que el formulario NO fue bloqueado por preventDefault
    const requestPromise = page.waitForRequest(request =>
        request.url().includes('formspree.io') && request.method() === 'POST'
    );

    await page.getByRole("button", { name: /Mandar mensaje/i }).click()

    // Verificamos que se intentó enviar (aunque lo interceptamos arriba)
    const request = await requestPromise;
    expect(request).toBeTruthy();

    // Y verificamos que los errores NO están
    await expect(page.locator("text=Por favor ingresa")).not.toBeVisible()
  })
})
