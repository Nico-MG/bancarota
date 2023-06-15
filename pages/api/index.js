import {conn} from '../../database'

// Ejemlo 1
// Este se usa en el ejemplo de uso del fetch en el front
/* export default async function index(req, res) {
    // let {nombre, id} = req.query

    let data = await conn.query('SELECT * FROM cliente')
    res.status(200).json( data.rows )
} */

// Ejemplo 2
/* 
export default async function index(req, res) {
    let {nombre, id} = req.query

    res.status(200).json( {nombre, id} )
} 
*/

export default async function index(req, res) {

    let query_string = query_db(req.query)

    let data = await conn.query(query_string)
    res.status(200).json( data.rows )
}

function query_db(http_query){
    let query = 'SELECT * FROM datos_general '

    if(Object.keys(http_query).length > 0)
        query += add_query_filters(http_query)

    return query
}

function add_query_filters(http_query){
    let {id, run, nombre, apellido, numero, saldo} = http_query

    let query_elements = [(id ? `id=${id}`:''),
    (run ? `run='${run}'`:''),
    (nombre ? `nombre='${nombre}'`:''),
    (apellido ? `apellido='${apellido}'`:''),
    (numero ? `numero='${numero}'`:''),
    (saldo ? `saldo=${saldo}`:'')]
    .filter((elem) => elem !== '')
    .join(" and ")

    return 'WHERE ' + query_elements
}