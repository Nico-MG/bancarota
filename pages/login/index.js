import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "./components/LoginForm";

export default function Login() {
    const { status } = useSession();
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

    if (status === "loading") {
        return <></>;
    }

    if (status === "authenticated") {
        router.push("/");
    } else {
        return (
            <div className="login_container">
                <LoginForm
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                />
            </div>
        );
    }
}
