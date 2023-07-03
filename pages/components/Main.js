import { useEffect, useState } from "react";
import InformationTable from "./InformationTable";
import Nav from "./Nav";
import Image from "next/image";

export default function Main({ data, changeUrlFetch, pager }) {
    const [results, setResults] = useState(true);

    useEffect(() => {
        if (data) {
            setResults(data.length > 0);
        }
    }, [data]);

    return (
        <main className="main">
            <Nav changeUrlFetch={changeUrlFetch} />

            {results ? (
                <InformationTable
                    data={data}
                    pager={pager}
                    changeUrlFetch={changeUrlFetch}
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
                    />
                    No hay resultados para esta busqueda...
                </div>
            )}
        </main>
    );
}
