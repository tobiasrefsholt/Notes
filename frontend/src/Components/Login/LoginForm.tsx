import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

type LoginFormProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export type LoginResponse = {
    tokenType: string;
    accessToken: string;
    expiresIn: string;
    refreshToken: string;
} | {
    type: string;
    title: string;
    status: number;
    detail: string;
}

export default function LoginForm({ setIsLoggedIn }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginFetch = useFetch<LoginResponse>("/login", [], "Login failed");

    const handleLogin = () => {
        loginFetch.doFetch("POST", [], { email, password }, false);
    }

    useEffect(() => {
        if (!loginFetch.data) return;
        if (!("tokenType" in loginFetch.data)) return;

        localStorage.setItem('accessToken', loginFetch.data.accessToken);
        localStorage.setItem('refreshToken', loginFetch.data.refreshToken);
        setIsLoggedIn(true);
    }, [loginFetch.data]);

    return (
        <>
            <h1>Login</h1>
            {
                !loginFetch.isPending &&
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            }
            {
                loginFetch.isPending &&
                <p>Logging in...</p>
            }
            {
                loginFetch.error &&
                <p>{loginFetch.error}</p>
            }
        </>
    )
}