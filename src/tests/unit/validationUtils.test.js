/**
 * PRUEBAS UNITARIAS - Funciones de Validación
 *
 * ¿Qué estamos probando?
 * - Funciones puras de validación
 * - Lógica aislada sin componentes React
 *
 * Este es el ejemplo más puro de prueba unitaria:
 * entrada → función → salida esperada
 */
import { describe, test, expect } from "vitest";
// Importamos las 3 funciones reales desde tu archivo de utilidades
// Asegúrate de que la ruta "../../utils/validaciones" sea la correcta en tu proyecto
import { validarNombre, validarCorreo, validarMensaje } from "../../utils/validaciones";

describe("Funciones de Validación - Pruebas Unitarias", () => {

  // 1. PRUEBAS DE NOMBRE
  describe("validarNombre", () => {
    test("acepta nombres válidos (incluyendo tildes y ñ)", () => {
      expect(validarNombre("Juan")).toBe(true);
      expect(validarNombre("María García")).toBe(true); // Prueba espacio y tilde
      expect(validarNombre("José-Luis")).toBe(true);    // Prueba guion y tilde
      expect(validarNombre("Ana Belén")).toBe(true);
      expect(validarNombre("Begoña")).toBe(true);       // Prueba la Ñ
    });

    test("rechaza nombres inválidos", () => {
      expect(validarNombre("J")).toBe(false);       // Muy corto (< 2)
      expect(validarNombre("123")).toBe(false);     // Números
      expect(validarNombre("Juan@")).toBe(false);   // Caracteres especiales no permitidos
      expect(validarNombre("")).toBe(false);        // Vacío
      expect(validarNombre(null)).toBe(false);      // Control de nulos
    });
  });

  // 2. PRUEBAS DE CORREO
  describe("validarCorreo", () => {
    test("acepta correos válidos", () => {
      expect(validarCorreo("test@example.com")).toBe(true);
      expect(validarCorreo("user.name@domain.co")).toBe(true);
      expect(validarCorreo("info@mi-empresa.es")).toBe(true);
    });

    test("rechaza correos inválidos", () => {
      expect(validarCorreo("invalido")).toBe(false);          // Sin @ ni dominio
      expect(validarCorreo("@example.com")).toBe(false);      // Sin usuario
      expect(validarCorreo("test@")).toBe(false);             // Sin dominio
      expect(validarCorreo("test @example.com")).toBe(false); // Espacios intermedios
      expect(validarCorreo("juan.perez@dominio")).toBe(false);// Falta la extensión (.com, .es)
      expect(validarCorreo("")).toBe(false);                  // Vacío
    });
  });

  // 3. PRUEBAS DE MENSAJE
  describe("validarMensaje", () => {
    test("acepta mensajes con contenido real", () => {
      expect(validarMensaje("Hola")).toBe(true);
      expect(validarMensaje("Este es un mensaje largo")).toBe(true);
      expect(validarMensaje("Mensaje\ncon\nsaltos")).toBe(true);
    });

    test("rechaza mensajes vacíos o solo espacios", () => {
      expect(validarMensaje("")).toBe(false);
      expect(validarMensaje("   ")).toBe(false); // Gracias al .trim() esto dará false
      expect(validarMensaje(null)).toBe(false);
    });
  });
});