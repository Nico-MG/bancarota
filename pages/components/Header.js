import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="header">
            <img src="#" alt="logo" className="header__logo" />
            <h1 className="header__titulo">BANCAROTA</h1>
            <div className="header__datos">
                <h3 className="header__nombre">
                    {session?.user.name} {session?.user.lastname}
                </h3>
                <h4 className="header__rol">Gerente</h4>
            </div>
            <button onClick={() => signOut()} className="header__cerrar">
                Cerrar Sesión
            </button>
        </header>
    );
}
