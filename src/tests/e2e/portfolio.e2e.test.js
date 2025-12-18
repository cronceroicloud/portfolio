/**
 * PRUEBAS END-TO-END (E2E) - Navegación del Portfolio
 *
 * ¿Qué estamos probando?
 * - Flujo completo de usuario en navegador REAL
 * - Navegación entre secciones
 * - Interacción con toda la aplicación integrada
 * - Comportamiento real en diferentes navegadores
 *
 * Características de pruebas E2E:
 * - Usa navegador real (Chromium, Firefox, WebKit)
 * - Prueba toda la app como un usuario real
 * - Detecta problemas que solo aparecen en producción
 * - Son las más lentas pero las más completas
 */
import { test, expect } from "@playwright/test"

test.describe("Portfolio - Flujo de Navegación Completo", () => {

  test("la página carga correctamente con todos los elementos visibles", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // MEJORA: Es mejor buscar por encabezado que por texto genérico
    // Si falla, usa: await expect(page.getByText("Portfolio")).toBeVisible()
    await expect(page.getByRole("heading", { name: "Portfolio", level: 1 }).or(page.getByText("Portfolio"))).toBeVisible()

    // Acotamos la búsqueda al <nav> para evitar conflictos con el footer
    const navigation = page.locator("nav");

    await expect(navigation).toBeVisible()
    await expect(navigation.getByRole("link", { name: "Trabajos" })).toBeVisible()
    await expect(navigation.getByRole("link", { name: "Acerca de" })).toBeVisible()
    await expect(navigation.getByRole("link", { name: "Contacto" })).toBeVisible()
  })

  test("usuario navega a sección Trabajos usando el menú", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Usamos .first() o el contenedor 'nav' por si hay otro link igual en el footer
    await page.locator("nav").getByRole("link", { name: "Trabajos" }).click()

    // ELIMINADO: await page.waitForTimeout(500)
    // EXPLICACIÓN: El expect de abajo ya espera automáticamente a que el elemento aparezca.

    // Esto asegura que es el título principal y no un párrafo cualquiera.
    await expect(page.getByRole("heading", { name: "Mis Trabajos" })).toBeVisible();
  })

  test("usuario navega a sección Contacto y ve el formulario", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.locator("nav").getByRole("link", { name: "Contacto" }).click()

    // ELIMINADO: await page.waitForTimeout(500) -> No es necesario

    // Verifica elementos del formulario
    await expect(page.locator("text=Hagamos tu idea una realidad")).toBeVisible()
    await expect(page.getByLabel("Nombre")).toBeVisible()
    await expect(page.getByLabel("Correo")).toBeVisible()
    await expect(page.getByLabel("Mensaje")).toBeVisible()
  })

  test("usuario activa y desactiva el modo oscuro", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const body = page.locator("body")
    // CORRECCIÓN CRÍTICA: Apuntamos al label visible, no al checkbox oculto
    const darkModeBtn = page.locator("label.dark-mode")

    // Estado inicial
    await expect(body).not.toHaveClass(/dark/)

    // Activar (Click en label)
    await darkModeBtn.click()
    // ELIMINADO: timeout. La aserción espera el cambio de clase.
    await expect(body).toHaveClass(/dark/)

    // Desactivar (Click en label de nuevo)
    await darkModeBtn.click()
    await expect(body).not.toHaveClass(/dark/)
  })

  test("modo oscuro persiste después de recargar la página", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const body = page.locator("body")
    const darkModeBtn = page.locator("label.dark-mode")

    // Activar
    await darkModeBtn.click()
    await expect(body).toHaveClass(/dark/)

    // Recarga la página
    await page.reload()

    // Playwright espera automáticamente a que la página recargue y el body esté listo
    await expect(body).toHaveClass(/dark/)
  })

  test("todas las secciones principales son accesibles", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Estas clases (.header, .trabajos) dependen de tu CSS.
    // Si cambias el nombre de la clase, el test fallará.
    // Para alumnos avanzados, sugerir usar getByRole("main"), getByRole("contentinfo") (footer), etc.
    await expect(page.locator(".header")).toBeVisible()
    await expect(page.locator(".trabajos")).toBeVisible()
    await expect(page.locator(".contacto")).toBeVisible()

    // El footer suele tener un rol implícito, es más robusto buscarlo así:
    await expect(page.getByRole("contentinfo").or(page.locator("footer"))).toBeVisible()
  })
})
