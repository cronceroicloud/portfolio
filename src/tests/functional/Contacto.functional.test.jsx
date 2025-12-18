/**
 * PRUEBAS FUNCIONALES/UI - Formulario de Contacto
 *
 * ¿Qué estamos probando?
 * - Comportamiento completo del formulario
 * - Interacciones reales del usuario
 * - Validaciones y mensajes de error
 * - Flujo completo de uso
 *
 * Características de pruebas funcionales:
 * - Simulan uso real del usuario
 * - Prueban flujos completos
 * - Verifican cambios en la UI
 *
 *
 * render(<Trabajos />)	"Robot, carga la página." (Es como abrir el navegador).
 * screen	"Los ojos del robot." (Lo que el robot puede ver en ese momento).
 * getByRole('button')	"Busca por función." (Busca algo que funcione como botón, no un div).
 * getByText('Hola')	"Busca por texto." (Busca algo que se lea 'Hola').
 * user.click(...)	"Robot, haz clic ahí."
 * expect(...).toBe(...)	"El Examen." (Comprueba si pasa lo que yo espero).
 *
 */

/**
 * PRUEBAS FUNCIONALES / UI - Formulario de Contacto
 */

import { describe, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Contacto from "../../componentes/layout/Contacto"

describe("Contacto - Pruebas Funcionales", () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  test("el usuario puede escribir en todos los campos del formulario", async () => {
    render(<Contacto />)

    const inputNombre = screen.getByLabelText(/Nombre/i)
    const inputCorreo = screen.getByLabelText(/Correo/i)
    const inputMensaje = screen.getByLabelText(/Mensaje/i)

    await user.type(inputNombre, "Juan Pérez")
    await user.type(inputCorreo, "juan@example.com")
    await user.type(inputMensaje, "Este es mi mensaje de prueba")

    expect(inputNombre).toHaveValue("Juan Pérez")
    expect(inputCorreo).toHaveValue("juan@example.com")
    expect(inputMensaje).toHaveValue("Este es mi mensaje de prueba")
  })

  test("muestra error cuando el nombre es inválido", async () => {
    render(<Contacto />)

    const inputNombre = screen.getByLabelText(/Nombre/i)
    const botonEnviar = screen.getByRole("button", { name: /Mandar mensaje/i })

    await user.type(inputNombre, "J")
    await user.click(botonEnviar)

    expect(
        screen.getByText(/Por favor ingresa un nombre valido/i)
    ).toBeInTheDocument()
  })

  test("muestra error cuando el correo es inválido", async () => {
    render(<Contacto />)

    const inputNombre = screen.getByLabelText(/Nombre/i)
    const inputCorreo = screen.getByLabelText(/Correo/i)
    const botonEnviar = screen.getByRole("button", { name: /Mandar mensaje/i })

    await user.type(inputNombre, "Juan Pérez")
    await user.type(inputCorreo, "correo-invalido")
    await user.click(botonEnviar)

    expect(
        screen.getByText(/Por favor ingresa un correo valido/i)
    ).toBeInTheDocument()
  })

  test("muestra error cuando el mensaje está vacío", async () => {
    render(<Contacto />)

    const inputNombre = screen.getByLabelText(/Nombre/i)
    const inputCorreo = screen.getByLabelText(/Correo/i)
    const botonEnviar = screen.getByRole("button", { name: /Mandar mensaje/i })

    await user.type(inputNombre, "Juan Pérez")
    await user.type(inputCorreo, "juan@example.com")
    await user.click(botonEnviar)

    expect(
        screen.getByText(/Por favor ingresa un mensaje valido/i)
    ).toBeInTheDocument()
  })

  test("no muestra errores cuando todos los campos son válidos", async () => {
    render(<Contacto />)

    const inputNombre = screen.getByLabelText(/Nombre/i)
    const inputCorreo = screen.getByLabelText(/Correo/i)
    const inputMensaje = screen.getByLabelText(/Mensaje/i)
    const botonEnviar = screen.getByRole("button", { name: /Mandar mensaje/i })

    await user.type(inputNombre, "Juan Pérez")
    await user.type(inputCorreo, "juan@example.com")
    await user.type(inputMensaje, "Este es un mensaje válido")
    await user.click(botonEnviar)

    expect(
        screen.queryByText(/Por favor ingresa/i)
    ).not.toBeInTheDocument()
  })

  // Contacto.test.jsx

  test('Flujo completo: usuario corrige errores y completa el formulario', async () => {
    // 1. Renderizamos el componente y capturamos el contenedor
    const { container } = render(<Contacto />)
    const user = userEvent.setup()

    // --- TRUCO ---
    // Buscamos el formulario y le añadimos un "freno" manual solo para el test.
    // Esto evita que JSDOM intente navegar a Formspree y rompa el test,
    // pero permite que tu lógica de React (limpiar errores) se ejecute primero.
    const formulario = container.querySelector('form');
    formulario.addEventListener('submit', (e) => e.preventDefault());
    // ----------------------

    const inputNombre = screen.getByLabelText(/nombre/i)
    const boton = screen.getByRole('button', { name: /mandar mensaje/i })

    // PASO 1: Provocar el error
    await user.type(inputNombre, 'A') // Nombre inválido
    await user.click(boton)

    // Comprobamos que sale el error
    expect(screen.getByText(/por favor ingresa un nombre valido/i)).toBeInTheDocument()

    // PASO 2: Corregir el error y rellenar TODO
    await user.clear(inputNombre)
    await user.type(inputNombre, 'Carlos Roncero') // Nombre corregido

    // ¡IMPORTANTE! Para que el flujo sea exitoso, debemos rellenar
    // TAMBIÉN el correo y el mensaje, si no, saltará el siguiente error.
    const inputCorreo = screen.getByLabelText(/correo/i)
    const inputMensaje = screen.getByLabelText(/mensaje/i)

    await user.type(inputCorreo, 'carlos@fp.com')
    await user.type(inputMensaje, 'Este es un mensaje de prueba válido')

    // PASO 3: Enviar de nuevo
    await user.click(boton)

    // PASO 4: Verificar éxito
    // Como tu código hace `setError(null)` si todo va bien,
    // verificamos que el mensaje de error del nombre YA NO existe.
    expect(screen.queryByText(/por favor ingresa un nombre valido/i)).not.toBeInTheDocument()

    // También verificamos que no haya saltado el error de correo ni mensaje
    expect(screen.queryByText(/por favor ingresa un correo valido/i)).not.toBeInTheDocument()
  })

  test("los placeholders ayudan al usuario a saber qué escribir", () => {
    render(<Contacto />)

    expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/john@correo.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Escribe tu mensaje/i)).toBeInTheDocument()
  })
})
