import { useEffect, useState } from "react";
import Protegido from "./components/Protegido";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

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
            <Header />
            <Main data={datos?.data} changeUrlFetch={setUrlFetch} />
            <Footer />
        </Protegido>
    );
}
