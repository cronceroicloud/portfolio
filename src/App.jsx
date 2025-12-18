//import { useState } from 'react'
import Header from "./componentes/layout/Header.jsx";
import Hero from "./componentes/layout/Hero.jsx";
import Clientes from "./componentes/layout/Clientes.jsx";
import Trabajos from "./componentes/layout/Trabajos.jsx";
import './normalize.css'
import AcercaDe from "./componentes/layout/AcercaDe.jsx";
import Contacto from "./componentes/layout/Contacto.jsx";
import Footer from "./componentes/layout/Footer.jsx";

// Estas importaciones es para el ejemplo, como los estados, imágenes y el css. Lo lógico es dejarlo limpio para empezar de cero
//Borramos el app.css ya que no lo usaremos
//El index.css lo vamos a modificar para poner el que queramos.
//El main.jsx es correcto para trabajar con React y ponemos los componentes de inicio.
//El index.html podemos cambiar títulos y los datos inicialmente en el tittle. Cambiar idioma. Quitar el icono.
//Los package explicar la parte de developer a producción
//El vite.config.js carga componentes de react, obligatorio.

//Paso 1: instalar normalize.css que me permite que todos los navegadores usen este css normalizado y se vea igual. npm install normalize.css
//También por tenerlo mejor ordenado tan facil que crear el normalize.css dentro de css y pegar el contenidode la web: https://necolas.github.io/normalize.css/
//Luego dentro del main.jsx debes hacer un import de normalize.css

//Paso 2: Carga tipografías por ejemplo de google fonts: Merriweather y inter (Get Font) Get embebed code, Tamaño variable en Inter. En Merri poner solo la de 700 y 400.
//Web embebed, copias el codigo y lo pegas en el index.html.

//Paso 3: Cambiar el icono: Ir a mis carpetas  - copiar public y assets.
//index.html - agregar <link rel="icon" href="./favicon.png" type ="image/png">
//




function App() {
    return (
        <>
            <div className="contenedor">
                <Header/>
                <Hero/>
                <Clientes/>
                <Trabajos/>
                <AcercaDe/>
                <Contacto/>
                <Footer/>
            </div>
        </>
    )
}

export default App
