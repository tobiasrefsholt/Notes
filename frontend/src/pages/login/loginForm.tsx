import { useContext, useEffect, useState } from "react";
import useFetch, { ApiEndpoint } from "../../hooks/useFetch";
import { LoginPageView } from "../../types";
import GlobalStateContext from "../../context/globalStateContext";
import { Link } from "react-router-dom";

type LoginFormProps = {
    setLoginState: React.Dispatch<React.SetStateAction<LoginPageView>>
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
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

export default function LoginForm({ email, setEmail, setLoginState }: LoginFormProps) {
    const { globalState, setGlobalState } = useContext(GlobalStateContext)!;
    const [password, setPassword] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const loginFetch = useFetch<LoginResponse>(ApiEndpoint.Login, [], "Wrong username or password");
    const confirmationEmailFetch = useFetch<boolean>(ApiEndpoint.ResendConfirmationEmail, [], "Failed sending email");

    const handleLogin = () => {
        loginFetch.doFetch("POST", [], { email, password, twoFactorCode }, false);
    }

    useEffect(() => {
        if (!loginFetch.data) return;
        if (!("tokenType" in loginFetch.data)) return;

        localStorage.setItem('accessToken', loginFetch.data.accessToken);
        localStorage.setItem('refreshToken', loginFetch.data.refreshToken);
        setGlobalState({ ...globalState, isLoggedIn: true });
    }, [loginFetch.data]);

    function resendVerificationEmail() {
        confirmationEmailFetch.doFetch("POST", [], { email }, false);
    }

    function LoginError() {
        if (!(loginFetch.data && "detail" in loginFetch.data))
            return (<p>Network error</p>)

        switch (loginFetch.data.detail) {
            case "NotAllowed":
                return (
                    <div>
                        <p>Email is not verified, please check your email or requset a new code.</p>
                        <button onClick={resendVerificationEmail}>Send verification email</button>
                    </div>
                );
            case "RequiresTwoFactor":
                return (<p>Account requiers two factor</p>);
            case "LockedOut":
                return (<p>Account locked. Wait a few minutes and try again.</p>);
            default:
                return (<p>Wrong username or password</p>);
        }
    }

    function showPasswordReset(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        setLoginState("getResetCode");
    }

    function showRegister(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setLoginState("register");
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
                    <div className="buttons" style={{marginTop: "1rem"}}>
                        <button className="button button-primary" type="submit">Login</button>
                        <button className="button button-secondary" onClick={(e) => showRegister(e)}>Register</button>
                        <Link style={{ marginLeft: ".5rem", color: "#ffffffcc", textDecoration: "none" }} to={"/"} onClick={(e) => showPasswordReset(e)}>Forgot password</Link>
                    </div>
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