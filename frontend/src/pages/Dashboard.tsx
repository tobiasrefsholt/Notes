import { Outlet, useOutletContext } from "react-router-dom";
import Navigaton from "../Components/Shared/Navigation";
import Sidebar from "../Components/Dashboard/Sidebar";
import Login from "./Login";
import './Dashboard.css';
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { DashboardContext, category } from "../types";
import useBearerToken from "../hooks/useBearerToken";

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const categoriesFetch = useFetch<category[]>("/GetCategories", []);

    const [selectedCategory, setSelectedCategory] = useState<category | null>(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);

    const dashboardContext:DashboardContext = {
        categoriesFetch, selectedCategory, setSelectedCategory, showAddCategory, setShowAddCategory, showEditCategory, setShowEditCategory
    }

    useEffect(() => {
        if (!isLoggedIn) {
            setIsLoggedIn(useBearerToken() !== null);
        };
        console.log("Checking if logged inn");
        setIsLoggedIn(localStorage.getItem("accessToken") !== null);
        categoriesFetch.doFetch("GET");
        console.log("Fetching categories: ");
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
                <Login setIsLoggedIn={setIsLoggedIn} />
            }
        </>
    )
}

export function useDashboardContext() {
    return useOutletContext<DashboardContext>();
}