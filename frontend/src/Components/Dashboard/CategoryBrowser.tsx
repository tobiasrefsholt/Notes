import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDashboardContext } from "../../pages/Dashboard";
import { NoteCompact } from "../../types";
import NoteTable from "./NoteTable";
import { useEffect } from "react";

export default function CategoryBrowser() {
    const { selectedCategory } = useDashboardContext();
    const { data, isPending, error, doFetch } = useFetch<NoteCompact[]>("/GetNotesByCategory", []);
    const navigate = useNavigate();

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
    }, [selectedCategory])

    const headerText = selectedCategory !== null ? `${data?.length} Note(s) with category "${selectedCategory.name}"` : `${data?.length} Uncategorized note(s)`;

    const handleEdit = () => {
        navigate("/edit-category");
    }

    return (
        <main className="category-browser">
            <div className="browser-toolbar">
                <h1>
                    {data && headerText}
                    {isPending && <>Loading notes...</>}
                    {error && <>{error}</>}
                </h1>
                {selectedCategory?.guid && <button onClick={handleEdit}>Edit category</button>}
            </div>
            <section className="notelist-details">
                {data && <NoteTable data={data} />}
            </section>
        </main>
    )
}