import styles from "./login.module.css";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await signIn("credentials", {
            password,
            redirect: false,
        });

        if (result.ok) {
            router.push("/");
        }
    }

    return (
        <div className={styles.login_container}>
            <form className={styles.login} onSubmit={handleSubmit}>
                <img src="#" alt="logo" className={styles.login__logo} />
                <h2 className={styles.login__nombre}>
                    Ingreso Gerente (pass 9999)
                </h2>
                <div className={styles.login__form}>
                    <label className={styles.login__label} htmlFor="pwd">
                        Contraseña:{" "}
                    </label>
                    <input
                        className={styles.login__pwd}
                        type="password"
                        id="pwd"
                        name="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className={styles.login__button}
                        type="submit"
                        value="Iniciar Sesión"
                    />
                </div>
            </form>
        </div>
    );
}
