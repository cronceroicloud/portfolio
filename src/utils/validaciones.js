//Validaciones de nombres válidos para las pruebas

export const validarNombre = (nombre) => {
    // Esta regex admite:
    // - Letras mayúsculas y minúsculas
    // - Tildes y diéresis (Á-ÿ)
    // - La ñ (\u00f1 y \u00d1)
    // - Espacios y guiones
    // - Mínimo 2 caracteres
    const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s-]{2,}$/;

    // Si es null, undefined o vacío devolvemos false
    if (!nombre) return false;

    return regex.test(nombre);
};

export const validarCorreo = (correo) => {
    // Regex estándar de HTML5 para emails
    // No permite espacios, exige una @ y un punto después
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo) return false;
    return regex.test(correo);
};

export const validarMensaje = (mensaje) => {
    // Para el mensaje, en vez de Regex, es más eficiente y legible
    // usar .trim() para asegurar que no nos mandan solo espacios en blanco.
    if (!mensaje) return false;

    // Devuelve true si la longitud (sin espacios sobrantes) es mayor que 0
    return mensaje.trim().length > 0;
};