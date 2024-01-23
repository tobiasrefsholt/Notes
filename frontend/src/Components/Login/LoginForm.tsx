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
    const loginFetch = useFetch<LoginResponse>("/login", [], "Wrong username or password");

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
            <h2 className="card-header">Login</h2>
            {
                !loginFetch.isPending &&
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoFocus={true} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    {loginFetch.error && <p>{loginFetch.error}</p>}
                    <button type="submit">Login</button>
                </form>
            }
            {
                loginFetch.isPending &&
                <p>Logging in...</p>
            }

        </>
    )
}