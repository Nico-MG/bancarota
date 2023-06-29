export default function Modal({ isVisible, close, client }) {
    if (!isVisible) return <></>;

    return (
        <div id="modal">
            <div className="modal__content">
                <header className="modal__header">
                    <div className="modal__header--uno">
                        <h4 className="modal__texto--saldo">Saldo Total:</h4>
                        <h2 className="modal__saldo">{client.saldo}</h2>
                    </div>
                    <div className="modal__header--dos">
                        <h4 className="modal__tipo">
                            Cuenta {client.tipo.toLowerCase()}
                        </h4>
                        <div className="modal__header--tres">
                            <h4 className="modal__texto--numero">N° Cuenta:</h4>
                            <h2 className="modal__numero">{client.numero}</h2>
                        </div>
                    </div>
                </header>
                <main className="modal__main">
                    <p className="modal__texto--nombre">
                        {" "}
                        <b>Nombre: </b> {client.nombre} {client.apellido}
                    </p>
                    <p className="modal__texto--run">
                        <b>Run: </b>
                        {client.run}
                    </p>
                    <p className="modal__texto--fecha">
                        <b>Fecha de Nacimiento: </b>
                        {client.fecha_nacimiento}
                    </p>
                    <p className="modal__texto--edad">
                        <b>Edad: </b>
                        {client.edad}
                    </p>
                </main>
                <button className="modal__close" onClick={close}>
                    Cerrar ×
                </button>
            </div>
        </div>
    );
}
