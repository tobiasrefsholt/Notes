import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

type loginProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type loginSuccessfulResponse = {
    tokenType: string;
    accessToken: string;
    expiresIn: string;
    refreshToken: string;
}

type loginFailedResponse = {
    type: string;
    title: string;
    status: number;
    detail: string;
}

export default function Login({ isLoggedIn, setIsLoggedIn }: loginProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                console.log(res);
                if (!res.ok) {
                    throw Error("Could not fetch resource");
                }
                return res.json();
            }).then((data: loginSuccessfulResponse | loginFailedResponse) => {
                if ("tokenType" in data) {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    setIsPending(false);
                    setIsLoggedIn(true);
                    navigate("/");
                } else {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setIsPending(false);
                    setIsLoggedIn(false);
                }
            }).catch((err): void => {
                setError(err.message)
            })
    }

    return (
        <div className="login-page">
            <h1>Login Page</h1>
            {
                !isPending &&
                !isLoggedIn &&
                <form onSubmit={handleSubmit}>
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
                isPending &&
                !isLoggedIn &&
                <p>Logging in...</p>
            }
            {
                error &&
                <p>{error}</p>
            }
        </div>
    )
}