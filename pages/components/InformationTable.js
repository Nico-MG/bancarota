export default function InformationTable({ data }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>nombre</th>
                    <th>run</th>
                    <th>numero de cuenta</th>
                    <th>saldo</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((client) => {
                    return (
                        <tr key={client.run}>
                            <td>
                                {client.nombre} {client.apellido}
                            </td>
                            <td>{client.run}</td>
                            <td>{client.numero}</td>
                            <td>${client.saldo}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
