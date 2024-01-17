import { Outlet } from "react-router-dom";
import Navigaton from "../Components/Shared/Navigation";
import Sidebar from "../Components/Dashboard/Sidebar";
import Login from "./Login";
import './Dashboard.css';
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log("Checking if logged inn");
        setIsLoggedIn(localStorage.getItem("accessToken") !== null);
    }, [])

    return (
        <>
            {
                isLoggedIn &&
                <div className="dashboard">
                    <Navigaton />
                    <Sidebar />
                    <Outlet />
                </div>
            }
            {
                !isLoggedIn &&
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }

        </>
    )
}