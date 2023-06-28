import InformationTable from "./InformationTable";
import Nav from "./Nav";

export default function Main({ data, changeUrlFetch, pager }) {
    return (
        <main className="main">
            <Nav changeUrlFetch={changeUrlFetch} />
            <InformationTable data={data} pager={pager} changeUrlFetch={changeUrlFetch} />
        </main>
    );
}
