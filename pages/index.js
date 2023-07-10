import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Protegido from "./components/Protegido";
import Header from "./components/Header";
import Main from "./components/Main";
import Head from "next/head";

export default function IndexPage() {
    const [datos, setDatos] = useState(null);
    const [pagerData, setPagerData] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [urlFetch, setUrlFetch] = useState("http://localhost:3000/api/?");
    const [query, setQuery] = useState("page=1&order=id&order_type=ASC");
    const [filters, setFilters] = useState("");

    const changeQueryValue = (query, varName, newValue) => {
        const scapedVarName = encodeURIComponent(varName);
        const scapedNewValue = encodeURIComponent(newValue);

        const regex = new RegExp(`(${scapedVarName}=)([^&]+)`, "g");
        const newQuery = query.replace(regex, `$1${scapedNewValue}`);

        console.log(newQuery);

        return newQuery;
    };

    const changeURL = ({
        page = null,
        queryFilters = null,
        orderBy = null,
        orderType = null,
    }) => {
        let newQuery = query;

        if (page) newQuery = changeQueryValue(query, "page", page);
        if (orderBy) newQuery = changeQueryValue(newQuery, "order", orderBy);
        if (orderType)
            newQuery = changeQueryValue(newQuery, "order_type", orderType);

        setQuery(newQuery);
        if (queryFilters !== null) setFilters("&" + queryFilters);
    };

    const currencyFormatter = ({ currency, value }) => {
        const formatter = new Intl.NumberFormat("es-CL", {
            style: "currency",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            currency,
        });
        return formatter.format(value);
    };

    const formatRUN = (run) => {
        // 11111111-1 (10)
        // 1111111-1 (9)
        if (run.length === 9) {
            return run.replace(
                /^(\d{1})(\d{3})(\d{3})-(\d{1})$/,
                "$1.$2.$3-$4"
            );
        } else if (run.length === 10) {
            return run.replace(
                /^(\d{2})(\d{3})(\d{3})-(\d{1})$/,
                "$1.$2.$3-$4"
            );
        }
    };

    const formatDate = (fecha) => {
        const fecha_original = new Date(fecha);

        const opcionesFormato = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };

        const fechaFormateada = fecha_original.toLocaleDateString(
            "es-CL",
            opcionesFormato
        );

        return fechaFormateada;
    };

    useEffect(() => {
        const url = "http://localhost:3000/api/?";
        setUrlFetch(url + query + filters);
        console.log("URL: " + url + query + filters);
    }, [query, filters]);

    useEffect(() => {
        fetch(urlFetch)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }

                return response.json();
            })
            .then((data) => {
                data.data = data.data.map((client) => {
                    client.saldo = currencyFormatter({
                        currency: "CLP",
                        value: client.saldo,
                    });
                    client.run = formatRUN(client.run);
                    client.fecha_nacimiento = formatDate(
                        client.fecha_nacimiento
                    );

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

                setOrderData(data.order);
            })
            .catch((err) => err);
    }, [urlFetch]);

    return (
        <Protegido>
            <Head>
                <title>BancaRota</title>
            </Head>
            <Header />
            <Main
                data={datos?.data}
                changeUrl={changeURL}
                pager={pagerData}
                orderData={orderData}
            />
            <Notification />
        </Protegido>
    );
}
