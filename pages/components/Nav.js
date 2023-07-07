import { useState } from "react";
import Select from "./Select";
import { ShowError } from "./Notification";

const options_numero_cuenta = [
    { id: 0, label: "000-" },
    { id: 1, label: "111-" },
    { id: 2, label: "222-" },
];

const options_anyo_nacimiento = [
    { id: 0, label: "Todos" },
    { id: 1, label: "1921-1930", value: "'1921-01-01' AND '1930-12-31'" },
    { id: 2, label: "1931-1940", value: "'1931-01-01' AND '1940-12-31'" },
    { id: 3, label: "1941-1950", value: "'1941-01-01' AND '1950-12-31'" },
    { id: 4, label: "1951-1960", value: "'1951-01-01' AND '1960-12-31'" },
    { id: 5, label: "1961-1970", value: "'1961-01-01' AND '1970-12-31'" },
    { id: 6, label: "1971-1980", value: "'1971-01-01' AND '1980-12-31'" },
    { id: 7, label: "1981-1990", value: "'1981-01-01' AND '1990-12-31'" },
    { id: 8, label: "1991-2000", value: "'1991-01-01' AND '2000-12-31'" },
    { id: 9, label: "2001-2010", value: "'2001-01-01' AND '2010-12-31'" },
    { id: 10, label: "2011-2020", value: "'2011-01-01' AND '2020-12-31'" },
    { id: 11, label: "2021-2030", value: "'2021-01-01' AND '2030-12-31'" },
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

export default function Nav({ changeUrl }) {
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

    const handleFilters = (event) => {
        event.preventDefault();

        let query = [];

        if (nombre !== "") query.push("nombre=" + nombre.toLowerCase());
        if (apellido !== "") query.push("apellido=" + apellido.toLowerCase());
        if (run !== "")
            query.push(
                "run=" + (run.includes(".") ? run.split(".").join("") : run)
            );
        if (numero !== "") query.push("numero=" + numeroTipo + numero);
        if (edad !== 0) query.push("edad=" + edad);
        if (anyoNacimiento !== "" && anyoNacimiento !== "Todos")
            query.push("fecha_nacimiento=" + anyoNacimiento);
        if (tipoCuenta !== "" && tipoCuenta !== "Todas")
            query.push("tipo=" + tipoCuenta);
        if (saldo !== 0)
            query.push("saldo=" + saldo + "&criterio=" + saldoCriterio);

        if (query.length === 0) {
            ShowError("Ingrese información para buscar");
            return 0;
        }

        changeUrl({ queryFilters: query.join("&"), page: 1 });
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
        changeUrl({ queryFilters: "" });
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
                        placeholder="12345678-9"
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
                        onChange={(e) =>
                            setEdad(
                                e.target.value === ""
                                    ? 0
                                    : parseInt(e.target.value)
                            )
                        }
                        placeholder="edad"
                    />
                </label>

                <div className="form_group_select">
                    <label htmlFor="filtro__anyo_nacimiento">
                        Años de nacimiento:
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
                        value={saldoCriterio}
                    />
                    <input
                        type="number"
                        name="saldo"
                        id="filtro__saldo"
                        value={saldo > 0 ? saldo : ""}
                        onChange={(e) =>
                            setSaldo(
                                e.target.value === ""
                                    ? 0
                                    : parseInt(e.target.value)
                            )
                        }
                        placeholder="monto"
                    />
                </div>
                <button type="submit" className="filtros__button">
                    Buscar
                </button>
                {filterActive ? (
                    <button
                        className="remove_filters__btn"
                        onClick={removeFilters}
                    >
                        Quitar filtros ×
                    </button>
                ) : (
                    ""
                )}
            </form>
        </nav>
    );
}
