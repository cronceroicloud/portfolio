import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';  // <-- IMPORTAR test y expect
import Header from '../componentes/layout/Header.jsx';

test('muestra el título del portfolio', () => {
    render(<Header />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
});

test('muestra el nombre del autor', () => {
    render(<Header />);
    expect(screen.getByText('Carlos Roncero')).toBeInTheDocument();
});

/*
1. import { render, screen } from "@testing-library/react";

render() → monta el componente en un DOM de mentira.

screen → te permite buscar elementos en ese DOM (como si fuera el navegador real).

2. describe("Header", () => { ... })

Sirve para agrupar las pruebas relacionadas con el componente Header.
Es simplemente organización. No afecta a la ejecución.

Primer test:

Renderiza <Header />

Busca un texto EXACTO que diga "Portfolio"

Comprueba que existe en el DOM.

Si tengo <h2 class="titulo">Portfolio</h2> pasa el test



 */
