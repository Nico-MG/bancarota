import * as dotenv from 'dotenv'
dotenv.config()
import {Pool} from 'pg'

let conn = new Pool({
    user: process.env.PG_NAME,
    password: process.env.PG_KEY,
    host: 'localhost',
    port: '5432',
    database: 'bancadb'
})

export {conn}