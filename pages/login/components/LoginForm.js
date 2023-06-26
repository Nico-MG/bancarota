import Image from "next/image";

export default function LoginForm({ password, setPassword, handleSubmit }) {
    return (
        <form className="login" onSubmit={handleSubmit}>
            <Image
                width={110}
                height={110}
                alt="Logo BancaRota"
                src="/logo.svg"
                draggable="false"
                className="login__logo"
                priority={true}
            />
            <h2 className="login__nombre">Ingreso Gerente</h2>
            <div className="login__form">
                <label className="login__label" htmlFor="pwd">
                    Contraseña:
                </label>
                <input
                    className="login__pwd"
                    type="password"
                    id="pwd"
                    name="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                />
                <button className="login__button" type="submit">
                    INGRESAR
                </button>
            </div>
        </form>
    );
}
