import { Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router-dom";
import Navigaton from "../Components/Shared/Navigation";
import Sidebar from "../Components/Dashboard/Sidebar";
import Login from "./Login";
import './Dashboard.css';

type dashboardProps = {
    setToken: Dispatch<SetStateAction<string | null>>;
    token: string | null;
}

export default function Dashboard({ token, setToken }: dashboardProps) {
    if (!token) return (<Login setToken={setToken} />);

    return (
        <div className="dashboard">
            <Navigaton />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}