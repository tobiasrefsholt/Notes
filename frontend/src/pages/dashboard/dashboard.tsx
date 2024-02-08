import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import Login from "../login/login";
import './dashboard.css';
import { useContext, useEffect, useState } from "react";
import useFetch, { ApiEndpoint } from "../../hooks/useFetch";
import { DashboardContext, NoteCompact, category } from "../../types";
import GlobalStateContext from "../../context/globalStateContext";

export default function Dashboard() {
    const { globalState } = useContext(GlobalStateContext)!;
    const { isLoggedIn } = globalState;
    const categoriesFetch = useFetch<category[]>(ApiEndpoint.GetCategories, []);
    const notesByCategoryFetch = useFetch<NoteCompact[]>(ApiEndpoint.GetNotesByCategory, []);
    const [includeSubcategories, setIncludeSubcategories] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] = useState<category | null>(null);

    const dashboardContext: DashboardContext = {
        categoriesFetch, notesByCategoryFetch, includeSubcategories, setIncludeSubcategories, selectedCategory, setSelectedCategory
    }

    useEffect(() => {
        if (isLoggedIn)
            categoriesFetch.doFetch("GET");
    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn)
            notesByCategoryFetch.doFetch("POST", [], { guid: selectedCategory?.guid || null, includeSubcategories });
    }, [isLoggedIn, selectedCategory?.guid, includeSubcategories]);

    return (
        <>
            {
                isLoggedIn &&
                <div className="dashboard">
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