import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Logout() {
    Cookies.remove('token');
    return (
        <div className="page">
            <h1>You have been logged out.</h1>
            <Link to="/login">Log in again</Link>
        </div>
    )
}