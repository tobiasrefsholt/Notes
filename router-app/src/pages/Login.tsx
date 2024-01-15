import React, { useState, SetStateAction, Dispatch } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

type loginProps = {
    setToken: Dispatch<SetStateAction<string | null>>;
}

async function loginUser(email: string, password: string) {

    console.log("Logging in...");

    const response = await fetch("http://localhost:5214/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();

    console.log(response);

    if (!response.ok) return null;
    const token = data?.accessToken;
    if (token === null) Cookies.remove('token');

    Cookies.set('token', token, { secure: false, expires: 1});
    return token;
}

export default function Login({ setToken }: loginProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await loginUser(email, password);
        setToken(token);
    }

    return (
        <div className="page">
            <h1>Login Page</h1>
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
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}