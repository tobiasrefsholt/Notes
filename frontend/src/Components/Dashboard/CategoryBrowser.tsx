import { useDashboardContext } from "../../pages/Dashboard";
import NoteTable from "./NoteTable";
import { useEffect } from "react";
import NoteSidebarNewNote from "./NoteSidebarNewNote";

export default function CategoryBrowser() {
    const { selectedCategory, notesByCategoryFetch } = useDashboardContext();
    const { data, isPending, error, doFetch } = notesByCategoryFetch;

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
    }, [selectedCategory])

    const headerText = selectedCategory !== null ? `${data?.length} Note(s) in category "${selectedCategory.name}"` : `${data?.length} Uncategorized note(s)`;

    return (
        <main className="category-browser">
            <h1>
                {data && headerText}
                {isPending && <>Loading notes...</>}
                {error && <>{error}</>}
            </h1>
            <ul className="category-browser-toolbar">
                <NoteSidebarNewNote selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} />
            </ul>
            <section className="notelist-details">
                {data && <NoteTable data={data} />}
            </section>
        </main>
    )
}