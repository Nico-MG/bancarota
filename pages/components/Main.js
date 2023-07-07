import { useEffect, useState } from "react";
import InformationTable from "./InformationTable";
import Nav from "./Nav";
import Image from "next/image";

export default function Main({ data, changeUrl, pager, orderData }) {
    const [results, setResults] = useState(true);

    useEffect(() => {
        if (data) {
            setResults(data.length > 0);
        }
    }, [data]);

    return (
        <main className="main">
            <Nav changeUrl={changeUrl} />

            {results ? (
                <InformationTable
                    data={data}
                    pager={pager}
                    changeUrl={changeUrl}
                    orderData={orderData}
                />
            ) : (
                <div className="search__result_message">
                    <Image
                        src="/desert.svg"
                        priority={false}
                        width={300}
                        height={300}
                        style={{ borderRadius: "100%", opacity: 0.9 }}
                        alt="No results"
                        draggable="false"
                    />
                    No hay resultados para esta busqueda...
                </div>
            )}
        </main>
    );
}
