/**
 * PRUEBAS UNITARIAS - DarkModeSwitch
 *
 * ¿Qué estamos probando?
 * - El componente DarkModeSwitch de forma aislada
 * - Su renderizado básico
 * - Su lógica interna sin dependencias externas
 *
 * Características de pruebas unitarias:
 * - Rápidas de ejecutar
 * - Prueban una sola unidad (componente/función)
 * - No dependen de otros componentes
 */

import { describe, test, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import DarkModeSwitch from "../../componentes/DarkModeSwitch"

describe("DarkModeSwitch - Pruebas Unitarias", () => {
  // Limpiamos localStorage antes de cada prueba
  beforeEach(() => {
    localStorage.clear()
    document.body.classList.remove("dark")
  })

  test("renderiza el componente correctamente", () => {
    render(<DarkModeSwitch />)

    // Verifica que el checkbox existe
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeInTheDocument()
  })

  test("muestra los iconos de sol y luna", () => {
    render(<DarkModeSwitch />)

    // Verifica que ambos iconos SVG están presentes
    const svgs = screen.getAllByRole("img", { hidden: true })
    expect(svgs).toHaveLength(2)
  })

  test("el modo claro está activo por defecto", () => {
    render(<DarkModeSwitch />)

    const solIcon = document.querySelector(".sol")
    const lunaIcon = document.querySelector(".luna")

    expect(solIcon).toHaveClass("active")
    expect(lunaIcon).not.toHaveClass("active")
  })

  test("cambia a modo oscuro al hacer clic", () => {
    render(<DarkModeSwitch />)

    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)

    // Verifica que el body tiene la clase 'dark'
    expect(document.body).toHaveClass("dark")
  })

  test("guarda la preferencia en localStorage", () => {
    render(<DarkModeSwitch />)

    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)

    // Verifica que se guardó en localStorage
    const savedValue = localStorage.getItem("dark-mode")
    expect(savedValue).toBe("true")
  })

  test("restaura la preferencia desde localStorage", () => {
    // Configuramos localStorage antes de renderizar
    localStorage.setItem("dark-mode", "true")

    render(<DarkModeSwitch />)

    // Verifica que el body inicia con modo oscuro
    expect(document.body).toHaveClass("dark")
  })

  test("alterna entre modo claro y oscuro múltiples veces", () => {
    render(<DarkModeSwitch />)

    const checkbox = screen.getByRole("checkbox")

    // Primer clic: oscuro
    fireEvent.click(checkbox)
    expect(document.body).toHaveClass("dark")

    // Segundo clic: claro
    fireEvent.click(checkbox)
    expect(document.body).not.toHaveClass("dark")

    // Tercer clic: oscuro de nuevo
    fireEvent.click(checkbox)
    expect(document.body).toHaveClass("dark")
  })
})
