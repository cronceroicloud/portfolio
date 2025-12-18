/**
 * PRUEBAS DE INTEGRACIÓN - App completa
 *
 * ¿Qué estamos probando?
 * - Que App monta todos los componentes correctamente
 * - Que los componentes se comunican entre sí
 * - Que la estructura general funciona
 */

import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "../../App"

describe("App - Pruebas de Integración", () => {
  test("App renderiza todos los componentes principales", () => {
    render(<App />)

    // Verifica que Header existe
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument()

    // Verifica que navegación existe
    // Verifica que hay al menos uno (o exactamente 2 si cuentas el del footer)
    const links = screen.getAllByRole("link", { name: /Trabajos/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toBeInTheDocument()

    // Verifica que secciones existen y pueden estar repetidas.
    const elementos = screen.getAllByText(/Mis Trabajos/i)
    expect(elementos.length).toBeGreaterThan(0)

    const elementos2 = screen.getAllByText(/Hagamos tu idea una realidad/i)
    expect(elementos2.length).toBeGreaterThan(0)

  })

  test("Header integra correctamente DarkModeSwitch", () => {
    render(<App />)

    // Verifica que el switch de dark mode está presente
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeInTheDocument()
  })

  test("todas las secciones son visibles en el DOM", () => {
    render(<App />)

    // Verifica que existen múltiples secciones
    const secciones = document.querySelectorAll("section")
    expect(secciones.length).toBeGreaterThan(3)
  })

  test("la estructura del contenedor principal es correcta", () => {
    render(<App />)

    const contenedor = document.querySelector(".contenedor")
    expect(contenedor).toBeInTheDocument()
    expect(contenedor.children.length).toBeGreaterThan(5)
  })
})
