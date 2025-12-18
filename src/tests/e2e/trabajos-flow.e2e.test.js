/**
 * PRUEBAS E2E - Flujo Completo de Trabajos
 *
 * Simula el flujo real de un usuario explorando trabajos:
 * 1. Filtrar por categoría
 * 2. Abrir detalles de un trabajo
 * 3. Cerrar el modal
 * 4. Probar con diferentes categorías
 */

import { test, expect } from "@playwright/test"

test.describe("Trabajos - Flujo E2E Completo", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // 1. Navegación robusta (evitando footer)
    await page.locator("nav").getByRole("link", { name: "Trabajos" }).click();

    // 2. Espera explícita: Esperamos a que el título de la sección exista
    // Esto sustituye al waitForTimeout(500)
    await expect(page.getByRole("heading", { name: "Mis Trabajos" })).toBeVisible();
  })

  test("usuario filtra trabajos y ve solo la categoría seleccionada", async ({ page }) => {
    // Esperar a que haya trabajos (evita race conditions)
    await expect(page.locator(".trabajo").first()).toBeVisible();
    const trabajosIniciales = await page.locator(".trabajo").count();

    // CORRECCIÓN: Acotamos la búsqueda a la sección de filtros (.filtros)
    // Así ignoramos el texto que aparece dentro de las tarjetas
    await page.locator(".filtros").getByText("Diseño Web").click();

    // Verificación
    await expect(page.locator(".trabajo .categoria").first()).toContainText("Diseño Web");
    const trabajosFiltrados = await page.locator(".trabajo").count();
    expect(trabajosFiltrados).toBeLessThan(trabajosIniciales);
  })

  test("usuario abre modal de un trabajo y ve los detalles", async ({ page }) => {
    // CORRECCIÓN: Hacemos click en .thumb (la imagen), que es quien tiene el onClick
    await page.locator(".trabajo").first().locator(".thumb").click();

    // Verificaciones
    await expect(page.locator(".overlay")).toBeVisible();
    await expect(page.locator(".modal")).toBeVisible();
    await expect(page.locator(".modal .titulo")).toBeVisible();
    // Verificamos que la imagen del modal ha cargado
    await expect(page.locator(".modal img").first()).toBeVisible();
  })

  test("usuario cierra modal con el botón cerrar", async ({ page }) => {
    await page.locator(".trabajo").first().locator(".thumb").click();
    await expect(page.locator(".modal")).toBeVisible();

    // Es buena práctica acotar la búsqueda del botón DENTRO del modal
    await page.locator(".modal .boton-cerrar").click();

    // El expect not.toBeVisible espera automáticamente a que la animación de cierre termine
    await expect(page.locator(".modal")).not.toBeVisible();
  })

  test("usuario cierra modal haciendo clic en el overlay", async ({ page }) => {
    await page.locator(".trabajo").first().locator(".thumb").click();
    await expect(page.locator(".modal")).toBeVisible();

    // Forzamos el click en una esquina del overlay para no dar al modal por error
    await page.locator(".overlay").click({ position: { x: 10, y: 10 }, force: true });

    await expect(page.locator(".modal")).not.toBeVisible();
  })

  test("flujo completo: filtrar, abrir varios trabajos, cambiar filtro", async ({ page }) => {
    // Paso 1: Filtrar (CORREGIDO)
    await page.locator(".filtros").getByText("Diseño Web").click();

    // Esperamos cambios
    await expect(page.locator(".trabajo .categoria").first()).toContainText("Diseño Web");

    // Paso 2: Abrir trabajo (Click en la imagen .thumb)
    await page.locator(".trabajo").first().locator(".thumb").click();
    await expect(page.locator(".modal")).toBeVisible();

    // Paso 3: Cerrar modal
    await page.locator(".modal .boton-cerrar").click();
    await expect(page.locator(".modal")).not.toBeVisible();

    // Paso 4: Cambiar a Desarrollo Web (CORREGIDO)
    await page.locator(".filtros").getByText("Desarrollo Web").click();

    // Verificar cambio
    await expect(page.locator(".trabajo .categoria").first()).toContainText("Desarrollo Web");
  })

  test("usuario prueba todos los filtros secuencialmente", async ({ page }) => {
    // Asegúrate de que estos textos coinciden EXACTAMENTE con lo que pone en los <span> de tus filtros
    const filtros = ["Diseño Web", "Desarrollo Web", "Aplicaciones Móviles", "Desarrollo Software"];

    for (const filtro of filtros) {
      // CORRECCIÓN dentro del bucle
      await page.locator(".filtros").getByText(filtro, { exact: true }).click();

      // Esperamos a ver resultados
      const primerTrabajo = page.locator(".trabajo").first();
      await expect(primerTrabajo).toBeVisible();

      // Verificamos categoría (Ojo: asegúrate que tienes trabajos de todas las categorías en tu DB local)
      await expect(primerTrabajo.locator(".categoria")).toContainText(filtro);
    }
  })
})