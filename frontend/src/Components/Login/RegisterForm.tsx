import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

type RegisterFormProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterResponse = {
    "type": string;
    "title": string;
    "status": 0,
    "detail": string;
    "instance": string;
    "errors": {
        "additionalProp1": [
            "string"
        ],
        "additionalProp2": [
            "string"
        ],
        "additionalProp3": [
            "string"
        ]
    },
}

export default function RegisterForm({ setIsLoggedIn }: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, isPending, data, doFetch} = useFetch<RegisterResponse>("/register", [], "Registration failed");

    const handleRegister = () => {
        doFetch("POST", [], { email, password }, false);
    }

    useEffect(() => {
        if (!data) return;
        if (!("tokenType" in data)) return;

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setIsLoggedIn(true);
    }, [data]);

    return (
        <>
            <h1>Register new account</h1>
            {
                !isPending &&
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Repeat password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Register</button>
                </form>
            }
            {
                isPending &&
                <p>Logging in...</p>
            }
            {
                error &&
                <p>{error}</p>
            }
        </>
    )
}