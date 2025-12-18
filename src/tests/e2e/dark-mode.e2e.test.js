/**
 * PRUEBAS E2E - Modo Oscuro en Navegador Real
 *
 * Prueba que el modo oscuro funciona correctamente
 * en un navegador real con localStorage persistente
 */

import { test, expect } from "@playwright/test"

test.describe("Modo Oscuro - Persistencia E2E", () => {
  test("modo oscuro se activa y persiste después de recargar", async ({ page }) => {
    await page.goto("http://localhost:5173/"); // Recuerda configurar baseURL si puedes

    const body = page.locator("body")
    // Localizador del componente visible (el label)
    const darkModeToggle = page.locator("label.dark-mode")

    // 1. Verificar modo inicial (claro)
    await expect(body).not.toHaveClass(/dark/)

    // 2. Activar modo oscuro (Hacemos clic en el label, no en el input oculto)
    await darkModeToggle.click()

    // 3. Verificar que cambió
    await expect(body).toHaveClass(/dark/)

    // 4. Recargar la página
    await page.reload()

    // 5. Verificar que persiste el modo oscuro
    await expect(body).toHaveClass(/dark/)
  })

  test("modo oscuro se mantiene al navegar entre secciones", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const body = page.locator("body");
    const darkModeToggle = page.locator("label.dark-mode"); // Tu selector arreglado

    // 1. Activar modo oscuro
    await darkModeToggle.click();
    await expect(body).toHaveClass(/dark/);

    // 2. Navegar a Trabajos
    // CORRECCIÓN: Acotamos la búsqueda al menú de navegación para evitar duplicados del footer
    await page.locator('nav').getByRole("link", { name: "Trabajos" }).click();

    // Verificación extra (opcional pero recomendada):
    // Aseguramos que la sección Trabajos ha aparecido antes de mirar el modo oscuro
    await expect(page.locator('#trabajos')).toBeVisible();

    // Ahora sí, verificamos que el modo oscuro sigue ahí
    await expect(body).toHaveClass(/dark/);

    // 3. Navegar a Contacto
    // Hacemos lo mismo aquí por seguridad
    await page.locator('nav').getByRole("link", { name: "Contacto" }).click();
    await expect(body).toHaveClass(/dark/);
  });

  test("usuario puede alternar modo oscuro múltiples veces", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Definimos los elementos al principio
    const darkModeToggle = page.locator("label.dark-mode");
    const body = page.locator("body");

    // Ciclo: encender -> apagar (3 veces)
    for (let i = 0; i < 3; i++) {
      // 1. Activar (Click para encender)
      await darkModeToggle.click();
      // Esperamos explícitamente a que el cambio ocurra antes de seguir
      await expect(body).toHaveClass(/dark/);

      // 2. Desactivar (Click para apagar)
      // Nota: Al ser un label, usamos click() de nuevo para revertir el estado
      await darkModeToggle.click();
      await expect(body).not.toHaveClass(/dark/);
    }
  })
})
