import './Login.css';
import LoginForm from '../Components/Login/LoginForm';
import RegisterForm from '../Components/Login/RegisterForm';
import { useState } from 'react';

type LoginProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div className="login-page">
            <h1># Markdown Notes</h1>
            <p className='select-login-or-register'>
                <span onClick={() => setShowLogin(true)}>[Login]</span>
                &nbsp;or&nbsp;
                <span onClick={() => setShowLogin(false)}>[register an account]</span>
                &nbsp;to get access
            </p>
            <main>
                <section className='card'>
                    {
                        showLogin
                            ? <LoginForm setIsLoggedIn={setIsLoggedIn} />
                            : <RegisterForm setIsLoggedIn={setIsLoggedIn} />
                    }
                </section>
                <section className='card'>
                    {
                        showLogin ?
                        <>
                            <h2 className='card-header'>What is Markdown Notes?</h2>
                            <p>Markdown notes in an application where you can write notes (in markdown), and organize them into categories and store it safely.</p>
                            <p>Read more on the project's <a target='_blank' href='https://github.com/tobiasrefsholt/Notes'>Github page</a>.</p>
                        </>
                        :
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
                    }
                </section>
            </main>
        </div>
    )
}