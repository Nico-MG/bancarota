import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LoginForm({ password, setPassword, handleSubmit }) {
    const inputLogin = useRef();

    useEffect(() => {
        inputLogin.current.focus();
    }, []);

    return (
        <form className="login" onSubmit={handleSubmit}>
            <Image
                width={100}
                height={100}
                alt="Logo BancaRota"
                src="/logo.svg"
                draggable="false"
                className="login__logo"
                priority={true}
            />
            <h2 className="login__nombre">Ingreso Gerente</h2>
            <div className="login__form">
                <div className="input__container">
                    <input
                        className="login__pwd"
                        type="password"
                        id="pwd"
                        name="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        placeholder="Contraseña"
                        ref={inputLogin}
                    />
                    <label className="login__label" htmlFor="pwd">
                        Contraseña
                    </label>
                </div>
                <button className="login__button" type="submit">
                    INGRESAR
                </button>
            </div>
        </form>
    );
}
