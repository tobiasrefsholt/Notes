import useFetch from "../../hooks/useFetch";
import { useDashboardContext } from "../../pages/Dashboard";
import { NoteCompact } from "../../types";
import NoteTable from "./NoteTable";
import { useEffect } from "react";
import NoteSidebarNewNote from "./NoteSidebarNewNote";

export default function CategoryBrowser() {
    const { selectedCategory, categoriesFetch } = useDashboardContext();
    const { data, isPending, error, doFetch } = useFetch<NoteCompact[]>("/GetNotesByCategory", []);

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
    }, [selectedCategory])

    const headerText = selectedCategory !== null ? `${data?.length} Note(s) with category "${selectedCategory.name}"` : `${data?.length} Uncategorized note(s)`;

    return (
        <main className="category-browser">
            <h1>
                {data && headerText}
                {isPending && <>Loading notes...</>}
                {error && <>{error}</>}
            </h1>
            <ul className="category-browser-toolbar">
                <NoteSidebarNewNote selectedCategory={selectedCategory} categoriesFetch={categoriesFetch} />
            </ul>
            <section className="notelist-details">
                {data && <NoteTable data={data} />}
            </section>
        </main>
    )
}