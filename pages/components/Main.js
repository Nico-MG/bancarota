import InformationTable from "./InformationTable";
import Nav from "./Nav";

export default function Main({ data, changeUrlFetch }) {
    return (
        <main className="main">
            <Nav changeUrlFetch={changeUrlFetch} />
            <InformationTable data={data} />
        </main>
    );
}
