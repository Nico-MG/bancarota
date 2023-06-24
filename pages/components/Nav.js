import { useEffect, useState } from "react";
import Select from "./Select";

const options_numero_cuenta = [
    { id: 0, label: "000-" },
    { id: 1, label: "111-" },
    { id: 2, label: "222-" },
];

const options_anyo_nacimiento = [
    { id: 0, label: "1920-1930" },
    { id: 1, label: "1930-1940" },
    { id: 2, label: "1940-1950" },
    { id: 3, label: "1950-1960" },
    { id: 4, label: "1960-1970" },
    { id: 5, label: "1970-1980" },
    { id: 6, label: "1980-1990" },
    { id: 7, label: "1990-2000" },
    { id: 8, label: "2000-2010" },
    { id: 9, label: "2010-2020" },
    { id: 10, label: "2020-2030" },
];

const options_tipo_cuenta = [
    { id: 0, label: "Todas" },
    { id: 1, label: "Corriente" },
    { id: 2, label: "Ahorro" },
    { id: 3, label: "Vista" },
];

const options_saldo = [
    { id: 0, label: "Montos superiores a:", value: ">" },
    { id: 1, label: "Montos iguales a:", value: "=" },
    { id: 2, label: "Montos inferiores a:", value: "<" },
];

export default function Nav({ changeUrlFetch }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [run, setRun] = useState("");
    const [numero, setNumero] = useState("");
    const [numeroTipo, setNumeroTipo] = useState("");
    const [edad, setEdad] = useState(0);
    const [anyoNacimiento, setAnyoNacimiento] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [saldo, setSaldo] = useState(0);
    const [saldoCriterio, setSaldoCriterio] = useState("");

    const [filterActive, setFilterActive] = useState(false);
    const [infoFilter, setInfoFilter] = useState("");

    useEffect(() => {
        console.log(numeroTipo);
    }, [numeroTipo]);

    const handleFilters = (event) => {
        event.preventDefault();

        let url = "http://localhost:3000/api/?";

        let query = [];

        if (nombre !== "") query.push("nombre=" + nombre);
        if (apellido !== "") query.push("apellido=" + apellido);
        if (run !== "") query.push("run=" + run);
        if (numero !== "") query.push("numero=" + numeroTipo + numero);

        // Falta edad, rango de años de nacimiento
        if (edad !== 0) query.push("fecha_nacimiento=" + edad);

        if (tipoCuenta !== "" && tipoCuenta !== "Todas") query.push("tipo=" + tipoCuenta);

        // Falta alguna forma de definir la busqueda en base a 'saldoCriterio'
        if (saldo !== 0) query.push("saldo=" + saldo);

        if (query.length === 0 && (!filterActive || tipoCuenta !== "Todas")) {
            console.log("No se ha ingresado informacion para filtrar");
            setInfoFilter("Ingrese información para buscar");
            return 0;
        }

        url += query.join("&");

        changeUrlFetch(url);
        setFilterActive(true);
    };

    const resetStates = () => {
        setNombre("");
        setApellido("");
        setRun("");
        setNumero("");
        setNumeroTipo("");
        setEdad(0);
        setAnyoNacimiento("");
        setTipoCuenta("");
        setSaldo(0);
        setSaldoCriterio("");
    };

    const removeFilters = () => {
        setFilterActive(false);
        resetStates();
        changeUrlFetch("http://localhost:3000/api/");
    };

    const setNumeroDecorado = (event) => {
        if (event.key !== "Backspace" && numero.length <= 8) {
            let num = numero.replaceAll("-", "");
            let newNum = "";

            for (let n in num) {
                newNum += num[n];
                if ((n + 1) % 3 === 0) {
                    newNum += "-";
                }
            }
            setNumero(newNum);
        }
    };

    return (
        <nav className="nav">
            <h4>Busqueda</h4>
            
            <form action="" className="form_filtros" onSubmit={handleFilters}>
                <label htmlFor="filtro__nombre">
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        id="filtro__nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="nombre"
                    />
                </label>

                <label htmlFor="filtro__apellido">
                    Apellido:
                    <input
                        type="text"
                        name="apellido"
                        id="filtro__apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="apellido"
                    />
                </label>

                <label htmlFor="filtro__run">
                    RUN:
                    <input
                        type="text"
                        name="run"
                        id="filtro__run"
                        value={run}
                        onChange={(e) => setRun(e.target.value)}
                        placeholder="run"
                    />
                </label>

                <div className="form_group_select">
                    <label htmlFor="filtro__numero_cuenta">
                        Número de cuenta:
                    </label>
                    <div>
                        <Select
                            options={options_numero_cuenta}
                            width={80}
                            changeSelection={setNumeroTipo}
                            value={numeroTipo}
                        />
                        <input
                            type="text"
                            name="nombre"
                            id="filtro__numero_cuenta"
                            value={numero}
                            onChange={(e) =>
                                e.target.value.length <= 11
                                    ? setNumero(e.target.value)
                                    : setNumero(numero)
                            }
                            onKeyDown={setNumeroDecorado}
                            placeholder="123-456-789"
                        />
                    </div>
                </div>

                <label htmlFor="filtro__edad">
                    Edad:
                    <input
                        type="number"
                        name="edad"
                        id="filtro__edad"
                        value={edad > 0 ? edad : ""}
                        onChange={(e) => setEdad(parseInt(e.target.value))}
                        placeholder="edad"
                    />
                </label>

                <div className="form_group_select">
                    <label htmlFor="filtro__anyo_nacimiento">
                        Año de nacimiento:
                    </label>
                    <Select
                        options={options_anyo_nacimiento}
                        width="100%"
                        directionShow="top"
                        changeSelection={setAnyoNacimiento}
                        value={anyoNacimiento}
                    />
                </div>

                <div className="form_group_select">
                    <label htmlFor="filtro__tipo_cuenta">Tipo de cuenta:</label>
                    <Select
                        options={options_tipo_cuenta}
                        width="100%"
                        changeSelection={setTipoCuenta}
                        value={tipoCuenta}
                    />
                </div>

                <div className="form_group_select">
                    <label htmlFor="filtro__saldo">Saldo:</label>
                    <Select
                        options={options_saldo}
                        width="100%"
                        changeSelection={setSaldoCriterio}
                        onChange={() => console.log("cambioooo")}
                        value={saldoCriterio}
                    />
                    <input
                        type="number"
                        name="saldo"
                        id="filtro__saldo"
                        value={saldo > 0 ? saldo : ""}
                        onChange={(e) => setSaldo(parseInt(e.target.value))}
                        placeholder="monto"
                    />
                </div>
                {infoFilter === "" ? (
                    ""
                ) : (
                    <div className="information_filter">{infoFilter}</div>
                )}
                <button type="submit" className="filtros__button">
                    Buscar
                </button>
                {filterActive ? (
                <button id="remove_filters__btn" onClick={removeFilters}>
                    Quitar filtros ×
                </button>
            ) : (
                ""
            )}
            </form>
        </nav>
    );
}
