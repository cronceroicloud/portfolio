import './Clientes.css';

const Clientes = () => {
	return (
		<>
			<section className="clientes">
				<div className="encabezado">
					<h3 className="titulo">Mis clientes</h3>
					<p className="subtitulo">He trabajado para estas empresas.</p>
				</div>
				<div className="logos">
					<img src="/assets/logos/Recharge.svg" className="logo" alt="Logo de Recharge" />
					<img src="/assets/logos/Volume.svg" className="logo" alt="Logo de Volume" />
					<img src="/assets/logos/Umbrella.svg" className="logo" alt="Logo de Umbrella" />
					<img src="/assets/logos/Waveless.svg" className="logo" alt="Logo de Waveless" />
					<img src="/assets/logos/Vision.svg" className="logo" alt="Logo de Vision" />
				</div>
			</section>
		</>
	);
};

export default Clientes;
