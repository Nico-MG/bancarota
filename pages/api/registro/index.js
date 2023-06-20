import { conn } from "../../../database";
import bcrypt from "bcrypt";

export default async function index(req, res) {
    if (Object.keys(req.query).length > 0) {
        const { correo, nombre, apellido, password } = req.query;
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        try {
            await conn.query(
                `INSERT INTO gerente VALUES ('${correo}', '${nombre}', '${apellido}', '${hash}')`
            );
            console.log("Nuevo usuario gerente creado!");
            res.status(200).json({
                result: "Cuenta creada con exito!",
                status: "ok",
            });
        } catch (err) {
            console.log(err.message);
            res.status(409).json({
                result: err.message,
                status: "error",
            });
        }
    }
}
