import InformationTable from "./InformationTable";
import Nav from "./Nav";

export default function Main({ data }) {
    return (
        <main className="main">
            <Nav />
            <InformationTable data={data} />
        </main>
    );
}
