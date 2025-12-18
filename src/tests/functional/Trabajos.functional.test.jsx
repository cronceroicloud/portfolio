/**
 * PRUEBAS FUNCIONALES/UI - Sistema de Trabajos
 *
 * ¿Qué estamos probando?
 * - Filtrado de trabajos (interacción completa)
 * - Apertura y cierre de modales
 * - Flujo completo del usuario navegando trabajos
 *
 * render(<Trabajos />)	"Robot, carga la página." (Es como abrir el navegador).
 * screen	"Los ojos del robot." (Lo que el robot puede ver en ese momento).
 * getByRole('button')	"Busca por función." (Busca algo que funcione como botón, no un div).
 * getByText('Hola')	"Busca por texto." (Busca algo que se lea 'Hola').
 * user.click(...)	"Robot, haz clic ahí."
 * expect(...).toBe(...)	"El Examen." (Comprueba si pasa lo que yo espero).
 */

import { describe, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Trabajos from "../../componentes/layout/Trabajos"

describe("Trabajos - Pruebas Funcionales", () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  test("usuario puede filtrar trabajos por categoría", async () => {
    // 1. Extraemos 'container' para poder buscar por clases CSS
    const { container } = render(<Trabajos />)

    // CAMBIO: Buscamos por la clase .trabajo en lugar de por rol
    const todosIniciales = container.querySelectorAll(".trabajo")
    const countInicial = todosIniciales.length

    // Usuario filtra por "Diseño Web"
    await user.click(screen.getByLabelText(/Diseño Web/i))

    // Verificamos de nuevo buscando por clase
    const trabajosFiltrados = container.querySelectorAll(".trabajo")

    expect(trabajosFiltrados.length).toBeLessThan(countInicial)

    // Verifica que todos los visibles son de Diseño Web
    trabajosFiltrados.forEach((trabajo) => {
      expect(trabajo.textContent).toMatch(/Diseño Web/i)
    })
  })

  test("usuario puede volver a ver todos los trabajos después de filtrar", async () => {
    const { container } = render(<Trabajos />)

    const todosIniciales = container.querySelectorAll(".trabajo")
    const countInicial = todosIniciales.length

    // Filtra por una categoría
    await user.click(screen.getByLabelText(/Diseño Web/i))

    // Vuelve a "Todos"
    await user.click(screen.getByLabelText(/Todos/i))

    // Verifica que se muestran todos de nuevo
    const todosFinales = container.querySelectorAll(".trabajo")
    expect(todosFinales.length).toBe(countInicial)
  })

  test("usuario abre un modal haciendo clic en un trabajo", async () => {
    render(<Trabajos />)

    // Aquí usamos getAllByRole('link') porque tus trabajos tienen <a> dentro
    // y eso SÍ tiene rol semántico. Esto debería funcionar bien.
    const primerTrabajo = screen.getAllByRole("link")[0]
    await user.click(primerTrabajo)

    // Verifica que el modal se abrió
    const modalOverlay = document.querySelector(".overlay")
    expect(modalOverlay).toBeInTheDocument()
  })

  test("usuario cierra el modal haciendo clic en el botón cerrar", async () => {
    render(<Trabajos />)

    const primerTrabajo = screen.getAllByRole("link")[0]
    await user.click(primerTrabajo)

    // Cierra el modal con el botón
    const botonCerrar = screen.getByRole("button")
    await user.click(botonCerrar)

    const modalOverlay = document.querySelector(".overlay")
    expect(modalOverlay).not.toBeInTheDocument()
  })

  test("flujo completo: filtrar, abrir modal, cerrar, cambiar filtro", async () => {
    // 1. Usamos container para poder seleccionar por clase .trabajo
    const { container } = render(<Trabajos />)

    // Paso 1: Filtrar por Diseño Web
    await user.click(screen.getByLabelText(/Diseño Web/i))

    // Guardamos referencia a los trabajos de diseño
    const trabajosDiseño = container.querySelectorAll(".trabajo")

    // Paso 2: Abrir primer trabajo filtrado
    // (Buscamos el link DENTRO del primer resultado para no fallar si cambia el orden)
    const linkPrimerTrabajo = trabajosDiseño[0].querySelector("a")
    await user.click(linkPrimerTrabajo)

    expect(document.querySelector(".overlay")).toBeInTheDocument()

    // Paso 3: Cerrar modal
    // Asegúrate de que tu Modal tiene un botón real (<button> o role="button")
    await user.click(screen.getByRole("button"))
    expect(document.querySelector(".overlay")).not.toBeInTheDocument()

    // Paso 4: Cambiar a Desarrollo Web
    await user.click(screen.getByLabelText(/Desarrollo Web/i))

    const trabajosDesarrollo = container.querySelectorAll(".trabajo")


    // Verificamos simplemente que lo que se ve es correcto:
    trabajosDesarrollo.forEach((trabajo) => {
      expect(trabajo.textContent).toMatch(/Desarrollo Web/i)
    })
  })

  test("las categorías se mantienen seleccionadas visualmente", async () => {
    render(<Trabajos />)

    const radioTodos = screen.getByRole("radio", { name: /Todos/i })
    const radioDiseño = screen.getByRole("radio", { name: /Diseño Web/i })

    expect(radioTodos).toBeChecked()
    expect(radioDiseño).not.toBeChecked()

    await user.click(screen.getByLabelText(/Diseño Web/i))

    expect(radioTodos).not.toBeChecked()
    expect(radioDiseño).toBeChecked()
  })
})
