import { useEffect, useState } from "react";
import Protegido from "./components/Protegido";
import Header from "./components/Header";
import Main from "./components/Main";
import Head from "next/head";

export default function IndexPage() {
    const [datos, setDatos] = useState(null);
    const [urlFetch, setUrlFetch] = useState("http://localhost:3000/api/");

    useEffect(() => {
        fetch(urlFetch)
            .then((response) => response.json())
            .then((data) => {
                setDatos(data);
            });
    }, [urlFetch]);

    return (
        <Protegido>
            <Head>
                <title>BancaRota</title>
            </Head>
            <Header />
            <Main data={datos?.data} changeUrlFetch={setUrlFetch} />
        </Protegido>
    );
}
