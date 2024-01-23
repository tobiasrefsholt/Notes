import { ReactEventHandler, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

type RegisterFormProps = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm({ setShowLogin }: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const { error, isPending, data, doFetch } = useFetch<boolean | null>("/register", [], "Registration failed");

    const handleRegister = () => {
        doFetch("POST", [], { email, password }, false);
    }

    useEffect(() => {
        if (data !== true) return;
        console.log("Registerd successfully");
        setIsRegistered(true);
    }, [data])

    return (
        <>
            <h2 className="card-header">Register new account</h2>
            {
                !isPending &&
                !isRegistered &&
                <>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoFocus={true} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                    </div>
                    <button onClick={handleRegister}>Register</button>
                </>
            }
            {
                isPending &&
                <p>Logging in...</p>
            }
            {
                error &&
                <p>{error}</p>
            }
            {
                isRegistered &&
                <>
                    <p>Account was created successfully</p>
                    <button onClick={() => setShowLogin(true)}>Login</button>
                </>
            }
        </>
    )
}