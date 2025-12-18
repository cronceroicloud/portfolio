# Portfolio de Carlos Roncero

Un portfolio web moderno y responsive desarrollado con React y Vite. Incluye secciones para mostrar trabajos, información personal, clientes y formulario de contacto. Este proyecto destaca por una robusta implementación de pruebas de software (Unitarias, Integración, Funcionales y E2E).

## Características

- **Diseño Responsive**: Adaptado para dispositivos móviles, tablets y escritorio
- **Modo Oscuro**: Interruptor para cambiar entre tema claro y oscuro
- **Portfolio de Trabajos**: Galería filtrable con categorías (Diseño Web, Desarrollo Web, Aplicaciones Móviles, Desarrollo de Software)
- **Modal de Detalles**: Vista detallada de cada proyecto con imágenes y descripción
- **Formulario de Contacto**: Sección funcional con validaciones
- **Optimización de Imágenes**: Carga diferida (lazy loading) para mejor rendimiento
- **Calidad de Código**: Validaciones centralizadas y arquitectura modular
- **Testing Exhaustivo**: Cobertura completa con Vitest y Playwright

## Tecnologías Utilizadas

- **React 19.2**: Framework de JavaScript para la interfaz de usuario
- **Vite 7**: Herramienta de construcción rápida y servidor de desarrollo
- **Sass**: Preprocesador CSS para estilos avanzados
- **Normalize.css**: Normalización de estilos entre navegadores
- **Vitest**: Framework de testing unitario y de integración
- **Playwright**: Framework para pruebas End-to-End (E2E)
- **React Testing Library**: Utilidades para probar componentes de React
- **ESLint**: Linter para mantener calidad del código

## Estructura del Proyecto

```text
src/
├── componentes/
│   ├── layout/
│   │   ├── Header.jsx          # Barra de navegación
│   │   ├── Hero.jsx            # Sección hero principal
│   │   ├── Clientes.jsx        # Sección de clientes
│   │   ├── Trabajos.jsx        # Galería de proyectos
│   │   ├── AcercaDe.jsx        # Sección sobre mí
│   │   ├── Contacto.jsx        # Formulario de contacto
│   │   └── Footer.jsx          # Pie de página
│   ├── data/
│   │   └── trabajos.jsx        # Datos de los proyectos
│   ├── Modal.jsx               # Componente modal para detalles
│   └── DarkModeSwitch.jsx      # Interruptor de modo oscuro
├── utils/
│   └── validaciones.js         # Lógica reutilizable y validaciones
├── tests/                      # Suite de pruebas
│   ├── unit/                   # Pruebas unitarias (lógica aislada)
│   ├── integration/            # Pruebas de integración (comunicación entre componentes)
│   ├── functional/             # Pruebas funcionales/UI (interacción de usuario)
│   ├── e2e/                    # Pruebas End-to-End (flujos completos)
│   └── README.md               # Guía detallada de testing
├── App.jsx                     # Componente principal
├── main.jsx                    # Punto de entrada
├── index.css                   # Estilos globales
└── normalize.css               # Reset CSS

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd portfolio
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`
## Tests
Ver README.MD dentro de la carpeta test del proyecto

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run test` - Ejecuta las pruebas unitarias
- `npm run lint` - Ejecuta el linter para verificar el código
- `npx playwright install`- Instala playwright para ejercutar modo gráfico pruebas

## Personalización

### Añadir Nuevos Trabajos

Edita el archivo `src/componentes/data/trabajos.jsx` y añade nuevos objetos al array con la siguiente estructura:

```javascript
{
  id: 13,
  categoria: 'diseño-web', // diseño-web | desarrollo-web | aplicaciones-moviles | desarrollo-software
  thumb: {
    url: './assets/trabajos/mi-imagen.png',
    alt: 'Descripción del trabajo',
  },
  info: {
    nombre: 'Nombre del Proyecto',
    categoria: 'Categoría del Proyecto',
    contenido: (
      <>
        <p>Descripción del proyecto...</p>
        <img loading="lazy" src="./assets/trabajos/detalle.png" alt="" />
      </>
    ),
  },
}
```

### Personalizar Colores y Estilos

Los estilos están organizados por componente. Cada componente tiene su propio archivo CSS asociado en el mismo directorio.

## Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/` listos para ser desplegados en cualquier servidor web estático.

### Opciones de Hosting

- **Vercel**: `vercel deploy`
- **Netlify**: Conecta tu repositorio o arrastra la carpeta `dist/`
- **GitHub Pages**: Configura el workflow de GitHub Actions
- **Servidor Propio**: Sube el contenido de `dist/` a tu servidor

## Licencia

Este proyecto es privado y de uso personal.

## Autor

**Carlos Roncero**

---

Desarrollado con React + Vite
