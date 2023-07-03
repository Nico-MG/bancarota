import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="header">
            <Image
                src="/logo_br_header.svg"
                priority={true}
                width={225}
                height={102}
                alt="Logo"
                className="header__logo"
            />
            <Image
                src="/BancaRota.svg"
                priority={true}
                width={267}
                height={37}
                alt="Logo BancaRota"
                className="header__logoName"
            />
            <div className="header__datos">
                <h4 className="header__nombre">
                    Bienvenido, {session?.user.name} {session?.user.lastname}
                </h4>
                <button onClick={() => signOut()} className="header__cerrar">
                    Cerrar Sesión
                </button>
            </div>
        </header>
    );
}
