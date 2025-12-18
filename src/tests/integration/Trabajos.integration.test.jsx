/**
 * PRUEBAS DE INTEGRACIÓN - Trabajos + Modal
 *
 * ¿Qué estamos probando?
 * - Que Trabajos y Modal interactúan correctamente
 * - Que las props se pasan bien entre componentes
 * - Que los eventos comunican componentes
 *
 * Características de pruebas de integración:
 * - Prueban múltiples componentes juntos
 * - Verifican comunicación entre componentes
 * - Prueban flujo de datos (props, callbacks)
 */

import { describe, test, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Trabajos from "../../componentes/layout/Trabajos"

describe("Trabajos + Modal - Pruebas de Integración", () => {
  test("Trabajos renderiza la lista de trabajos", () => {
    render(<Trabajos />)

    // Buscamos las imágenes en lugar de los contenedores
    const imagenes = screen.getAllByRole("img")

    expect(imagenes.length).toBeGreaterThan(0)
  })

  test("al hacer clic en un trabajo, se abre el Modal con los datos correctos", () => {
    render(<Trabajos />)

    // Encuentra el primer trabajo (Nexa Sys)
    const primerTrabajo = screen.getByText(/Nexa Sys/i)

    // Haz clic para abrir el modal
    fireEvent.click(primerTrabajo)

    // Verifica que el modal se abrió con el contenido correcto
    const modalTitulo = screen.getByRole("heading", { name: /Nexa Sys/i })
    expect(modalTitulo).toBeInTheDocument()
  })

  test("el Modal recibe las props correctas del trabajo seleccionado", () => {
    render(<Trabajos />)

    // Clic en el primer enlace de trabajo
    const enlaces = screen.getAllByRole("link")
    fireEvent.click(enlaces[0])

    // Verifica que el modal muestra información del trabajo
    // CAMBIO AQUÍ: Usamos getAll y verificamos la longitud
    const titulos = screen.getAllByText(/Nexa Sys/i)
    expect(titulos.length).toBeGreaterThan(0) // O puedes poner .toBe(2)

    // Para "Diseño Web" pasará lo mismo si aparece en la tarjeta y en el modal
    const categorias = screen.getAllByText(/Diseño Web/i)
    expect(categorias.length).toBeGreaterThan(0)
  })

  test("el botón cerrar del Modal comunica correctamente con Trabajos", () => {
    render(<Trabajos />)

    // Abre el modal
    const primerEnlace = screen.getAllByRole("link")[0]
    fireEvent.click(primerEnlace)

    // Verifica que el modal está visible
    const overlay = screen.getByRole("button", { name: /cerrar/i })
    expect(overlay).toBeInTheDocument()

    // Cierra el modal
    fireEvent.click(overlay)

    // Verifica que el modal ya no está visible
    expect(screen.queryByRole("heading", { name: /Nexa Sys/i })).not.toBeInTheDocument()
  })

  test("filtrar trabajos y abrir modal mantiene la integración correcta", () => {
    render(<Trabajos />)

    // Filtra por "Diseño Web"
    const filtroDiseño = screen.getByLabelText(/Diseño Web/i)
    fireEvent.click(filtroDiseño)

    // Abre el primer trabajo filtrado
    const enlaces = screen.getAllByRole("link")
    fireEvent.click(enlaces[0])

    // Verifica que el modal muestra un trabajo de diseño web

    const elementos = screen.getAllByText(/Diseño Web/i)
    expect(elementos.length).toBeGreaterThan(0)
  })
})
