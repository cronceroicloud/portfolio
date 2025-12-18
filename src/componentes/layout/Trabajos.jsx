import './Trabajos.css';
import trabajos from '../data/trabajos.jsx';
//Debemos usar estados para saber qué botón marcamos, para eso debemos
//importar el hook useState
import { useState } from 'react';
//Importamos el componente Modal
import Modal from '../Modal';

const Trabajos = () => {
    //Ahora quiero una variable para saber qué botón marcamos
    //categoría por defecto seleccionada todos
    //función para cambiar el estado es: setCategoriaSeleccionada
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');

    //lo que hago es tener siempre guardado este array en esta variable
    const [trabajosFiltrados, setTrabajosFiltrados]=useState(trabajos);

    //Modales
    //Lo usamos para guardar el estado del modal de true a false. False se cierra.
    const [estadoModal, setEstadoModal] = useState(false);
    //Aquí mostramos la info del trabajo pinchado o seleccionado, por defecto el primero
    const [trabajoSelecionado, setTrabajoSelecionado] = useState(trabajos[0]);
    //Fin Modales


    //Esta función sirve para cambiar el valor de estado de la categoría
    //cuandos se pulse el botón pues cambia el estado del filtro
    //el target te da la información del botón, el id (categoria), type y name
    const handleChange = (e) => {
        const categoria = e.target.id;
        setCategoriaSelecionada(categoria);

        //Aquí hacemos el filtrado del mapa de trabajos cuando seleccionamos un botón
        //Creamos una nueva variable y cogemos el array y usamos la función filter,
        //que permite filtrar automáticamente dentro de ese array por una condición
        //en este caso dentro de info->categoria
        //En filter le debo decir dónde accedo que dentro de trabajos, trabajo a trabajo

        if (categoria === 'todos') {
            setTrabajosFiltrados(trabajos);
        } else {
            const nuevosTrabajos = trabajos.filter((trabajo) => {
                if (trabajo.categoria === categoria) {
                    return true;
                }
            });
            //Para poner los nuevos trabajos
            setTrabajosFiltrados(nuevosTrabajos);
        }
    };

    //Modales
    //Función Modal con dos parámetros, estados y el id. T
    //Se pone el estado a true del modal porque se muestra.
    const openModal = (e, id) => {
        e.preventDefault();
        setEstadoModal(true);
        //Busca dentro del vector el trabajo que coincida con el id, para mostrar la info
        const trabajo = trabajos.find((trabajo) => {
            if (trabajo.id === id) {
                return true;
            }
        });
        //Ya tenemos en la variable tabrajo, el trabajo que vamos a mostrar
        setTrabajoSelecionado(trabajo);
    };

    //Esta función se la pasaremos al Modal, es necesario para cerrar
    const closeModal = () => {
        setEstadoModal(false);
    };

  //Fin Modales

  return (
    <>
      <section className="trabajos" id="trabajos">
          <div className="encabezado">
              <h3 className="titulo">Mis Trabajos</h3>
              <p className="subtitulo>">Estos son mis trabajos</p>
          </div>
          <div className="filtros">
              <label htmlFor="todos">

                <input type="radio" name="categoria" id="todos" onChange={handleChange} checked={categoriaSelecionada==='todos'}/>
                <span className="opcion">Todos</span>
              </label>
              <label htmlFor="diseño-web">
                  <input type="radio" name="categoria" id="diseño-web" onChange={handleChange} checked={categoriaSelecionada==='diseño-web'}/>
                  <span className="opcion">Diseño Web</span>
              </label>
              <label htmlFor="desarrollo-web">
                  <input type="radio" name="categoria" id="desarrollo-web" onChange={handleChange} checked={categoriaSelecionada==='desarrollo-web'}/>
                  <span className="opcion">Desarrollo Web</span>
              </label>
              <label htmlFor="aplicaciones-moviles">
                  <input type="radio" name="categoria" id="aplicaciones-moviles" onChange={handleChange} checked={categoriaSelecionada==='aplicaciones-moviles'}/>
                  <span className="opcion">Aplicaciones Móviles</span>
              </label>
              <label htmlFor="desarrollo-software">
                  <input type="radio" name="categoria" id="desarrollo-software" onChange={handleChange} checked={categoriaSelecionada==='desarrollo-software'}/>
                  <span className="opcion">Desarrollo Software</span>
              </label>
          </div>
          <div className="grid">
              {trabajosFiltrados.map((trabajo ) => {
                  return(
                      <div className="trabajo" key={trabajo.id}>
                          <a href="#" className="thumb" onClick={(e) => openModal(e, trabajo.id)}>
                              <img loading="lazy" src={trabajo.thumb.url} alt={trabajo.thumb.alt}/>
                          </a>
                          <div className="info">
                              <div className="textos">
                                  <a href="#" className="nombre" onClick={(e) => openModal(e, trabajo.id)}>
                                      {trabajo.info.nombre}
                                  </a>
                                  <p className="categoria">{trabajo.info.categoria}</p>
                              </div>
                              <a href="#" className="btn-ir" onClick={(e) => openModal(e, trabajo.id)}>
                              <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                  >
                                      <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z" />
                                  </svg>
                              </a>
                          </div>
                      </div>
                  );
              })}
          </div>
      </section>
      {estadoModal && <Modal closeModal={closeModal} trabajo={trabajoSelecionado} />}
    </>
  );
};

export default Trabajos;