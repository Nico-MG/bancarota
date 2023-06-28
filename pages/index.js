import { useEffect, useState } from "react";
import Protegido from "./components/Protegido";
import Header from "./components/Header";
import Main from "./components/Main";
import Head from "next/head";
import { Notification } from "./components/Notification";

export default function IndexPage() {
    const [datos, setDatos] = useState(null);
    const [pagerData, setPagerData] = useState(null)
    const [urlFetch, setUrlFetch] = useState("http://localhost:3000/api/");

    useEffect(() => {
        fetch(urlFetch)
            .then((response) => response.json())
            .then((data) => {
                setDatos(data);
                setPagerData({
                    "previousPage": data.previousPage,
                    "nextPage": data.nextPage,
                    "filters": data.filters,
                    "totalPages": data.totalPages,
                    "page": data.page,
                });
            });
    }, [urlFetch]);

    return (
        <Protegido>
            <Head>
                <title>BancaRota</title>
            </Head>
            <Header />
            <Main data={datos?.data} changeUrlFetch={setUrlFetch} pager={pagerData} />
            <Notification />
        </Protegido>
    );
}
