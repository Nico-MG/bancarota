import { useEffect, useState } from "react";
import { Notification } from "./components/Notification";
import Protegido from "./components/Protegido";
import Header from "./components/Header";
import Main from "./components/Main";
import Head from "next/head";

export default function IndexPage() {
    const [datos, setDatos] = useState(null);
    const [pagerData, setPagerData] = useState(null);
    const [urlFetch, setUrlFetch] = useState("http://localhost:3000/api/");

    const currencyFormatter = ({ currency, value }) => {
        const formatter = new Intl.NumberFormat("es-CL", {
            style: "currency",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            currency,
        });
        return formatter.format(value);
    };

    useEffect(() => {
        fetch(urlFetch)
            .then((response) => response.json())
            .then((data) => {
                data.data = data.data.map((client) => {
                    client.saldo = currencyFormatter({
                        currency: "CLP",
                        value: client.saldo,
                    });

                    return client;
                });

                setDatos(data);

                setPagerData({
                    previousPage: data.previousPage,
                    nextPage: data.nextPage,
                    filters: data.filters,
                    totalPages: data.totalPages,
                    page: data.page,
                });
            });
    }, [urlFetch]);

    return (
        <Protegido>
            <Head>
                <title>BancaRota</title>
            </Head>
            <Header />
            <Main
                data={datos?.data}
                changeUrlFetch={setUrlFetch}
                pager={pagerData}
            />
            <Notification />
        </Protegido>
    );
}
