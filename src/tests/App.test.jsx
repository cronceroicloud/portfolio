import { render, screen } from "@testing-library/react";
import { test, expect } from 'vitest';  // <-- IMPORTAR test y expect
import App from "../App.jsx";


    test("renderiza el Header dentro de App", () => {
        render(<App />);
        expect(screen.getByText("Portfolio")).toBeInTheDocument();
    });
