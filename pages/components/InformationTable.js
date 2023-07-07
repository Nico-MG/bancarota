import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Pager from "./Pager";

export default function InformationTable({
    data,
    pager,
    changeUrl,
    orderData,
}) {
    const [modal, setModal] = useState(false);
    const [clientInfo, setClientInfo] = useState("");
    const [inOrder, setInOrder] = useState(false);
    const [order, setOrder] = useState({
        orderBy: "id",
        type: "ASC",
    });

    const [sortedColumn, setSortedColumn] = useState(null);

    const order_type_position = useRef({
        nombre: 0,
        saldo: 0,
    });

    const order_type = ["default", "ASC", "DESC"];
    const unicode_indicator = ["▴", "▾"];

    const changeVisibility = () => {
        setModal(!modal);
    };

    const prepareInformation = (client) => {
        return () => {
            setClientInfo(client);
            changeVisibility();
        };
    };

    const orderByHandler = (column) => {
        return () => {
            setSortedColumn(column);
            setInOrder(true);
            order_type_position.current[column] += 1;

            const order__type =
                order_type[
                    order_type_position.current[column] % order_type.length
                ];
            if (order__type === "default") {
                setOrder({
                    orderBy: "id",
                    type: "ASC",
                });
            } else {
                setOrder({
                    orderBy: column,
                    type: order__type,
                });
            }
        };
    };

    const orderIndicator = (column) => {
        let order_pos = order_type_position.current[column] % order_type.length;

        if (order_type[order_pos] !== "default" && sortedColumn === column) {
            return unicode_indicator[order_pos - 1];
        } else {
            order_type_position.current[column] = 0;
        }

        return "";
    };

    useEffect(() => {
        if (inOrder) {
            changeUrl({ orderBy: order.orderBy, orderType: order.type });
        }
    }, [order]);

    return (
        <div className="table_container">
            <table className="table">
                <thead id="first_element">
                    <tr>
                        <th className="table__order_col">
                            <span onClick={orderByHandler("nombre")}>
                                Nombre
                            </span>
                            <span>{" " + orderIndicator("nombre")}</span>
                        </th>
                        <th>RUN</th>
                        <th>Tipo de cuenta</th>
                        <th className="table__order_col">
                            <span onClick={orderByHandler("saldo")}>Saldo</span>
                            <span>{" " + orderIndicator("saldo")}</span>
                        </th>
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
            <Pager pager={pager} changeUrl={changeUrl} orderData={orderData} />
            <Modal
                isVisible={modal}
                close={changeVisibility}
                client={clientInfo}
            />
        </div>
    );
}
