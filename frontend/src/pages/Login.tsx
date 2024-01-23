import './Login.css';
import LoginForm from '../Components/Login/LoginForm';
import RegisterForm from '../Components/Login/RegisterForm';

type LoginProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
    return (
        <div className="login-page">
            <h1>Markdown Notes</h1>
            <p>Login or register an account to get access</p>
            <main>
                <section className='card'>
                    <LoginForm setIsLoggedIn={setIsLoggedIn} />
                </section>
                <section className='card'>
                    <RegisterForm setIsLoggedIn={setIsLoggedIn} />
                </section>
            </main>
        </div>
    )
}