import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { conn } from "../../../database";
import bcrypt from "bcrypt";

const secret = process.env.NEXTAUTH_SECRET;

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                password: { label: "pwd", type: "password" },
            },
            async authorize(credentials) {
                // const { username, password } = credentials;
                const { password } = credentials;
                const user = await validatePassword(password);

                // Aquí se debe comprobar que las credenciales son correctas
                if (password === "") {
                    throw new Error("Debe escribir una contraseña");
                }

                if (!user.status) {
                    throw new Error("Contraseña incorrecta");
                }

                // Si las credenciales son correctas, devolvemos el usuario
                return {
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    role: "Gerente",
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    jwt: {
        secret,
    },
    callbacks: {
        // Añadir el objeto de usuario al token JWT
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        // Añadir el objeto de usuario a la sesión
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
});

async function validatePassword(password) {
    // Aquí deberías buscar el usuario en tu base de datos por el nombre de usuario
    // y devolver un objeto que contenga al menos el ID del usuario y su contraseña
    // $2b$10$VGmsnepPXARjBlXwUESBre5LNdDRMbKZ.AQOahFPBWbdTx2.Q8BMO

    const data = await conn.query(
        "SELECT * FROM gerente WHERE correo='gerencia@bancarota.cl'"
    );

    if (data.rowCount === 0) {
        return {
            status: false,
        };
    }

    /* const hash = bcrypt.hashSync("9999", bcrypt.genSaltSync(10));
    console.log(hash);
    console.log(bcrypt.compare("9999", hash)); */

    const valid = await bcrypt.compare(password, data.rows[0].password);

    return {
        status: valid,
        name: data.rows[0].nombre,
        lastname: data.rows[0].apellido,
        email: data.rows[0].correo,
    };
}
