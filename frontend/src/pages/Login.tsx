import './Login.css';
import LoginForm from '../Components/Login/LoginForm';
import RegisterForm from '../Components/Login/RegisterForm';
import { useState } from 'react';
import BackgroundImage from '../images/LoginPageBG.jpg';
import { LoginPageView } from '../types';
import RequestResetCodeForm from '../Components/Login/RequestResetCodeForm';
import ResetPasswordForm from '../Components/Login/ResetPasswordForm';

export default function Login() {
    const [loginState, setLoginState] = useState<LoginPageView>("login");
    const [email, setEmail] = useState("");

    return (
        <div className="login-page" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${BackgroundImage})` }}>
            <h1># Markdown Notes</h1>
            <main>
                <section className='card'>
                    {loginState === "login" && <LoginForm email={email} setEmail={setEmail} setLoginState={setLoginState} />}
                    {loginState === "register" && <RegisterForm email={email} setEmail={setEmail} setLoginState={setLoginState} />}
                    {loginState === "getResetCode" && <RequestResetCodeForm email={email} setEmail={setEmail} setLoginState={setLoginState} />}
                    {loginState === "resetPassword" && <ResetPasswordForm email={email} setEmail={setEmail} setLoginState={setLoginState} />}
                </section>
                <section className='card'>
                    {
                        loginState === "login" &&
                        <>
                            <h2 className='card-header'>What is Markdown Notes?</h2>
                            <p>Markdown notes in an application where you can write notes (in markdown), and organize them into categories and store it safely.</p>
                            <p>Read more on the project's <a target='_blank' href='https://github.com/tobiasrefsholt/Notes'>Github page</a>.</p>
                        </>
                    }
                    {
                        loginState === "register" && <PasswordRequirementsText />
                    }
                    {
                        loginState === "getResetCode" &&
                        <>
                            <p>Request a password reset token. Submit your email address, and receive a code if the email is registered.</p>
                        </>
                    }
                    {
                        loginState === "resetPassword" &&
                        <>
                            <p>Paste the reset code you received and create a new password.</p>
                            <PasswordRequirementsText />
                        </>
                    }
                </section>
            </main>
        </div>
    )
}

function PasswordRequirementsText() {
    return (
        <>
            <h2 className="card-header">Password requirements</h2>
            <ul>
                <li>Uppercase character</li>
                <li>Lowercase character</li>
                <li>A digit</li>
                <li>Non-alphanumeric character</li>
                <li>At least six characters long</li>
            </ul>
        </>
    )
}