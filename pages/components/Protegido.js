import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Protegido({ children }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    if (status === "loading") {
        return <></>;
    }

    return (
        <div className="container">
            {status === "authenticated" ? children : ""}
        </div>
    );
}
