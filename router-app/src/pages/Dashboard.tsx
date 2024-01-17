import { Dispatch, SetStateAction, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Navigaton from "../Components/Shared/Navigation";
import Sidebar from "../Components/Dashboard/Sidebar";
import Login from "./Login";
import './Dashboard.css';

type dashboardProps = {
    setToken: Dispatch<SetStateAction<string | null>>;
    token: string | null;
}

type ContextType = {
    selectedNote: string | null;
    setSelectedNote: Dispatch<SetStateAction<string | null>>;
};

export default function Dashboard({ token, setToken }: dashboardProps) {
    if (!token) return (<Login setToken={setToken} />);

    const [selectedNote, setSelectedNote] = useState<string | null>("");

    return (
        <div className="dashboard">
            <Navigaton />
            <Sidebar />
            <Outlet context={[selectedNote, setSelectedNote]} />
        </div>
    )
}

export function useSelectedNote() {
    return useOutletContext<ContextType>();
}