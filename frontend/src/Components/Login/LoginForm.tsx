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
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const loginFetch = useFetch<LoginResponse>("/login", [], "Wrong username or password");
    const confirmationEmailFetch = useFetch<boolean>("/resendConfirmationEmail", [], "Failed sending email");

    const handleLogin = () => {
        loginFetch.doFetch("POST", [], { email, password, twoFactorCode }, false);
    }

    useEffect(() => {
        if (!loginFetch.data) return;
        if (!("tokenType" in loginFetch.data)) return;

        localStorage.setItem('accessToken', loginFetch.data.accessToken);
        localStorage.setItem('refreshToken', loginFetch.data.refreshToken);
        setIsLoggedIn(true);
    }, [loginFetch.data]);

    function resendVerificationEmail() {
        confirmationEmailFetch.doFetch("POST", [], {email}, false);
    }

    function LoginError() {
        if (!(loginFetch.data && "detail" in loginFetch.data))
            return "";

        if (loginFetch.data.detail === "NotAllowed")
            return (
                <div>
                    <p>Email is not verified, please check your email or requset a new code.</p>
                    <button onClick={resendVerificationEmail}>Send verification email</button>
                </div>
            )

        if (loginFetch.data.detail === "RequiresTwoFactor")
            return (<p>Account requiers two factor</p>)

        if (loginFetch.data.detail === "LockedOut")
            return (<p>Account locked. Wait a few minutes and try again.</p>)

        return (<p>Wrong username or password</p>)
    }

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
                    <div>
                        <label>Two factor code (if enabled):</label>
                        <input type="nubmer" value={twoFactorCode} onChange={e => setTwoFactorCode(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            }
            {loginFetch.error && <LoginError />}
            {
                loginFetch.isPending &&
                <p>Logging in...</p>
            }
            {confirmationEmailFetch.isPending && <p>Sending email</p>}
            {confirmationEmailFetch.data === true && <p>Email sent successfully</p>}
            {confirmationEmailFetch.error && <p>{confirmationEmailFetch.error}</p>}

        </>
    )
}