import { Outlet, useOutletContext } from "react-router-dom";
import Navigaton from "../Components/Shared/Navigation";
import Sidebar from "../Components/Dashboard/Sidebar";
import Login from "./Login";
import './Dashboard.css';
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FetchResponse, category } from "../types";
import useBearerToken from "../hooks/useBearerToken";

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const categoriesResponse = useFetch<category[]>("/GetCategories", []);

    useEffect(() => {
        if(!isLoggedIn) {
            setIsLoggedIn(useBearerToken() !== null);
        };
        console.log("Checking if logged inn");
        setIsLoggedIn(localStorage.getItem("accessToken") !== null);
        categoriesResponse.doFetch("GET");
        console.log("Fetching categories: ");
    }, [isLoggedIn])

    return (
        <>
            {
                isLoggedIn &&
                <div className="dashboard">
                    <Navigaton />
                    <Sidebar />
                    <Outlet context={categoriesResponse}/>
                </div>
            }
            {
                !isLoggedIn &&
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
        </>
    )
}

export function useCategoriesContext() {
    return useOutletContext<FetchResponse<category[]>>();
  }