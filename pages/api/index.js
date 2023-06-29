import { conn } from "../../database";

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
    const http_query = req.query;
    http_query.pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize)
        : 12;
    http_query.page = req.query.page ? parseInt(req.query.page) : 1;

    const query_string = query_db(http_query);

    const data = await conn.query(query_string[1]);
    const count = await conn.query(query_string[0]);

    const totalPages = Math.ceil(count.rows[0].count / http_query.pageSize);

    const { page, pageSize, ...filters } = req.query;

    const query_filter_prev = Object.entries(filters)
        .map((filter) => {
            return `&${filter[0]}=${filter[1]}`;
        })
        .join("");

    const previousPage = http_query.page > 1 ? http_query.page - 1 : "";
    const nextPage = http_query.page === totalPages ? "" : http_query.page + 1;

    res.status(200).json({
        page: http_query.page,
        pageSize: http_query.pageSize,
        data: data.rows,
        previousPage,
        nextPage,
        filters: query_filter_prev,
        totalPages,
    });
}

function query_db(http_query) {
    const query = "SELECT * FROM clients_data" + add_query_filters(http_query);
    const query_count =
        "SELECT count(*) FROM clients_data" + add_query_filters(http_query);

    const offset = (http_query.page - 1) * http_query.pageSize;

    return [
        query_count,
        query + ` ORDER BY id LIMIT ${http_query.pageSize} OFFSET ${offset}`,
    ];
}

function add_query_filters(http_query) {
    const {
        id,
        run,
        nombre,
        apellido,
        fecha_nacimiento,
        edad,
        numero,
        saldo,
        criterio,
        tipo,
    } = http_query;

    const query_elements = [
        id ? `id=${id}` : "",
        run ? `run='${run}'` : "",
        nombre ? `LOWER(nombre) = '${nombre}'` : "",
        apellido ? `LOWER(apellido) = '${apellido}'` : "",
        fecha_nacimiento ? `fecha_nacimiento BETWEEN ${fecha_nacimiento}` : "",
        edad ? `edad=${edad}` : "",
        numero ? `numero='${numero}'` : "",
        saldo ? `saldo ${criterio} ${saldo}` : "",
        tipo ? `tipo='${tipo}'` : "",
    ]
        .filter((elem) => elem !== "")
        .join(" and ");

    return query_elements.length > 0 ? " WHERE " + query_elements : "";
}
