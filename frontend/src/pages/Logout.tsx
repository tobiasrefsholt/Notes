import { Link } from "react-router-dom";

export default function Logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return (
        <div className="page">
            <h1>You have been logged out.</h1>
            <Link to="/">Log in again</Link>
        </div>
    )
}