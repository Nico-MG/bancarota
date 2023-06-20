import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function IndexPage() {
    const { data: session, status } = useSession();
    const [datos, setDatos] = useState(null);
    const [urlFetch, setUrlFetch] = useState("http://localhost:3000/api/");
    const router = useRouter();

    useEffect(() => {
        fetch(urlFetch)
            .then((response) => response.json())
            .then((data) => {
                setDatos(data);
            });
    }, [urlFetch]);

    // Vista mistras carga la pagina (se puede hacer una animacion de carga)
    if (status === "loading") {
        return <>Cargando...</>;
    }

    // Comprobacion si estamos logeados, si no lo estamos vamos al login
    if (status === "unauthenticated") {
        router.push("/login");
    } else {
        return (
            <div className="container">
                <header className="header">
                    <img src="#" alt="logo" className="header__logo" />
                    <h1 className="header__titulo">BANCAROTA</h1>
                    <div className="header__datos">
                        <h3 className="header__nombre">
                            {session.user.name} {session.user.lastname}
                        </h3>
                        <h4 className="header__rol">{session.user.role}</h4>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="header__cerrar"
                    >
                        Cerrar Sesión
                    </button>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>run</th>
                            <th>numero de cuenta</th>
                            <th>saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos?.data.map((client) => {
                            return (
                                <tr key={client.run}>
                                    <td width={"25%"}>
                                        {client.nombre} {client.apellido}
                                    </td>
                                    <td width={"25%"}>{client.run}</td>
                                    <td width={"25%"}>{client.numero}</td>
                                    <td width={"25%"}>${client.saldo}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
