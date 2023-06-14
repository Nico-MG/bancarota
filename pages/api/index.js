import {conn} from '../../database'

// Ejemlo 1
// Este se usa en el ejemplo de uso del fetch en el front
export default async function index(req, res) {
    // let {nombre, id} = req.query

    let data = await conn.query('SELECT * FROM cliente')
    res.status(200).json( data.rows )
}

// Ejemplo 2
/* 
export default async function index(req, res) {
    let {nombre, id} = req.query

    res.status(200).json( {nombre, id} )
} 
*/