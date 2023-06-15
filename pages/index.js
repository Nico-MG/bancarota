import { useEffect, useState } from "react"


export default function IndexPage() {

    const [datos, setDatos] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/api/")
        .then(response => response.json())
        .then(data => {
            setDatos(data)
        })
    }, []);

    return (
        <>
        <h1>Banca Rota</h1>
            <table>
                <thead>
                    <tr>
                       <th>nombre</th> 
                       <th>run</th> 
                       <th>numero de cuenta</th> 
                       <th>saldo</th>
                    </tr>
                </thead>
                <tbody>
                {datos?.map(client => {
                    return <tr key={client.run}>
                        <td width={'25%'}>{client.nombre} {client.apellido}</td>
                        <td width={'25%'}>{client.run}</td>
                        <td width={'25%'}>{client.numero}</td>
                        <td width={'25%'}>${client.saldo}</td>
                    </tr>
                })}
                </tbody>
            </table>
        
        
        </>
        
    )
}