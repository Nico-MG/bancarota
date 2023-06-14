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
                       <th>run</th> 
                       <th>nombre</th> 
                       <th>fecha de nacimiento</th> 
                    </tr>
                </thead>
                <tbody>
                {datos?.map((client, idx) => {
                    return <tr key={idx}>
                        <td>{client.run}</td>
                        <td>{client.nombre} {client.apellido}</td>
                        <td>{client.fecha_nacimiento}</td>
                    </tr>
                })}
                </tbody>
            </table>
        
        
        </>
        
    )
}