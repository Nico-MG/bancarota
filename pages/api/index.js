import {conn} from '../../database'

export default async function index(req, res) {
    let {nombre, id} = req.query
    let data = await conn.query('SELECT * FROM cliente WHERE id=1')

    res.status(200).json( {nombre, id} )
}