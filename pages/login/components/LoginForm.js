export default function LoginForm({ password, setPassword, handleSubmit }) {
    return (
        <form className="login" onSubmit={handleSubmit}>
            <img src="#" alt="logo" className="login__logo" />
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
                    Iniciar sesión
                </button>
            </div>
        </form>
    );
}
