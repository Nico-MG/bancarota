import { useState } from "react";
import Modal from "./Modal";
import Pager from "./Pager";

export default function InformationTable({ data, pager, changeUrlFetch }) {
    const [modal, setModal] = useState(false);
    const [clientInfo, setClientInfo] = useState("");

    const changeVisibility = () => {
        setModal(!modal);
    };

    const prepareInformation = (client) => {
        return () => {
            setClientInfo(client);
            changeVisibility();
        };
    };

    return (
        <div className="table_container">
            <table className="table">
                <thead id="first_element">
                    <tr>
                        <th>Nombre</th>
                        <th>RUN</th>
                        <th>Tipo de cuenta</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody id="tbody__table">
                    {data?.map((client) => {
                        return (
                            <tr
                                key={client.run}
                                onClick={prepareInformation(client)}
                            >
                                <td>
                                    {client.nombre} {client.apellido}
                                </td>
                                <td>{client.run}</td>
                                <td>{client.tipo}</td>
                                <td>{client.saldo}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pager pager={pager} changeUrlFetch={changeUrlFetch} />
            <Modal
                isVisible={modal}
                close={changeVisibility}
                client={clientInfo}
            />
        </div>
    );
}
