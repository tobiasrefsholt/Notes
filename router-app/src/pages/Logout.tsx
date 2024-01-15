import { Link, redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from "react";

type loginProps = {
    setToken: Dispatch<SetStateAction<string | null>>;
}

export default function Logout({setToken}: loginProps) {
    setToken(null);
    Cookies.remove('token');
    redirect("/");
    return (
        <div className="page">
            <h1>You have been logged out.</h1>
            <Link to="/">Log in again</Link>
        </div>
    )
}