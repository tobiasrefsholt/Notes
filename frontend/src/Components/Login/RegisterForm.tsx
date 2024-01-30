import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

type RegisterFormProps = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterResponse = true | {
    type: string;
    title: string;
    status: number;
    errors: {
        InvalidEmail?: string[];
        DuplicateEmail?: string[];
        DuplicateUserName?: string[];
        PasswordTooShort?: string[];
        PasswordRequiresNonAlphanumeric?: string[];
        PasswordRequiresDigit?: string[];
        PasswordRequiresLower?: string[];
        PasswordRequiresUpper?: string[];
        PasswordRequiresUniqueChars?: string[];
    }
}

export default function RegisterForm({ setShowLogin }: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const { error, isPending, data, doFetch } = useFetch<RegisterResponse | null>("/register", [], "Registration failed");

    const handleRegister = () => {
        doFetch("POST", [], { email, password }, false);
    }

    useEffect(() => {
        if (data !== true) return;
        console.log("Registerd successfully");
        setIsRegistered(true);
    }, [data])

    function EmailError() {
        if (data === true || data === null)
            return "";

        if (data?.errors.InvalidEmail?.length)
            return (<p>{data.errors.InvalidEmail[0]}</p>)

        if (data?.errors.DuplicateEmail?.length)
            return (<p>{data.errors.DuplicateEmail[0]}</p>)

        if (data?.errors.DuplicateUserName?.length)
            return (<p>{data.errors.DuplicateUserName[0]}</p>)
    }

    function PasswordError() {
        if (data === true || data === null)
            return "";

        if (data.errors.PasswordTooShort?.length)
            return (<p>{data.errors.PasswordTooShort[0]}</p>);

        if (data.errors.PasswordRequiresNonAlphanumeric?.length)
            return (<p>{data.errors.PasswordRequiresNonAlphanumeric[0]}</p>);

        if (data.errors.PasswordRequiresDigit?.length)
            return (<p>{data.errors.PasswordRequiresDigit[0]}</p>);

        if (data.errors.PasswordRequiresLower)
            return (<p>{data.errors.PasswordRequiresLower[0]}</p>);

        if (data.errors.PasswordRequiresUpper)
            return (<p>{data.errors.PasswordRequiresUpper[0]}</p>);

        if (data.errors.PasswordRequiresUniqueChars)
            return (<p>{data.errors.PasswordRequiresUniqueChars[0]}</p>);
    }

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
                        <EmailError />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                        <PasswordError />
                    </div>
                    <button onClick={handleRegister}>Register</button>
                </>
            }
            {
                isPending &&
                <p>Creating account...</p>
            }
            {
                error &&
                <p>{error}</p>
            }
            {
                isRegistered &&
                <>
                    <p>Account was created successfully! Please check your email to verfy you account.</p>
                    <button onClick={() => setShowLogin(true)}>Login</button>
                </>
            }
        </>
    )
}