import { Outlet, useOutletContext } from "react-router-dom";
import Navigaton from "../Components/Shared/Navigation";
import Sidebar from "../Components/Dashboard/Sidebar";
import Login from "./Login";
import './Dashboard.css';
import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { DashboardContext, category } from "../types";
import GlobalStateContext from "../context/GlobalStateContext";

export default function Dashboard() {
    const {globalState, setGlobalState} = useContext(GlobalStateContext)!;
    const categoriesFetch = useFetch<category[]>("/GetCategories", []);
    const {isLoggedIn} = globalState;

    const [selectedCategory, setSelectedCategory] = useState<category | null>(null);

    const dashboardContext: DashboardContext = {
        categoriesFetch, selectedCategory, setSelectedCategory
    }

    useEffect(() => {
        if (isLoggedIn)
            categoriesFetch.doFetch("GET");
    }, [isLoggedIn])

    return (
        <>
            {
                isLoggedIn &&
                <div className="dashboard">
                    <Navigaton />
                    <Sidebar dashboardContext={dashboardContext} />
                    <Outlet context={dashboardContext} />
                </div>
            }
            {
                !isLoggedIn &&
                <Login />
            }
        </>
    )
}

export function useDashboardContext() {
    return useOutletContext<DashboardContext>();
}